import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../services/profile.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter, finalize, first, switchMap, tap} from "rxjs";
import {Profile, ProfileFormModel} from "../../const/profile.interface";
import {LoadingService} from "../../../loading/loading.service";
import {MessageService} from "primeng/api";
import {ERROR_MESSAGE, SUCCESS_MESSAGE} from "../../const/MESSAGES";
import {MainService} from "../../../main/services/main.service";
import {phoneValidator} from "../../const/phone-validator";
import {urlValidator} from "../../const/url-validator";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profileForm = new FormGroup<ProfileFormModel>(<ProfileFormModel>{
    first_name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    last_name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    email: new FormControl('', [Validators.email]),
    phone_number: new FormControl('', [Validators.pattern("^[0-9+]+$"), Validators.required, phoneValidator()]),
    url: new FormControl('', [urlValidator()]),
  });

  private profileService = inject(ProfileService);
  private loadingService = inject(LoadingService);
  private messageService = inject(MessageService);
  private mainService = inject(MainService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.setPhonePrefixOnInputChange();
    this.getProfileData();
  }

  public saveChanges(): void {
    this.setFormAsDirty(this.profileForm);
    if (!this.profileForm.valid) return;
    const formData: Profile = {
      first_name: this.profileForm.controls.first_name.value,
      last_name: this.profileForm.controls.last_name.value,
      email: this.profileForm.controls.email.value,
      url: this.profileForm.controls.url.value,
      phone_number: this.profileForm.controls.phone_number.value,
    };
    this.loadingService.setLoadingStatus(true)
    this.profileService.saveProfileData(formData)
      .pipe(
        finalize(() => this.loadingService.setLoadingStatus(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => this.messageService.add(SUCCESS_MESSAGE),
        error: () => this.messageService.add(ERROR_MESSAGE),
      })
  }

  private getProfileData(): void {
    this.loadingService.setLoadingStatus(true);
    this.mainService.selectedProfile$
      .pipe(
        switchMap(profile => {
          if (profile) return this.mainService.selectedProfile$;
          else return this.profileService.getProfileData()
        }),
        first(),
        finalize(() => this.loadingService.setLoadingStatus(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(profile => {
        if (!profile) return;
        this.patchForm(profile);
        this.cdr.markForCheck()
      });
  }

  private patchForm(profile: Profile): void {
    this.profileForm.patchValue({
      ...profile,
    });
  }

  private setFormAsDirty(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].markAsDirty();
    })
  }

  private setPhonePrefixOnInputChange(): void {
    this.profileForm.controls.phone_number
      .valueChanges
      .pipe(
        filter(value => !!value.length && !value.includes('+')),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(value => {
        const modifiedValue = `+7${value}`
        this.profileForm.controls.phone_number.patchValue(modifiedValue, { emitEvent: false });
      });
  };
}
