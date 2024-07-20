import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../services/profile.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter, finalize, first} from "rxjs";
import {Profile, ProfileFormModel} from "../../const/profile.interface";
import {LoadingService} from "../../../loading/loading.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  public profileForm = new FormGroup<ProfileFormModel>(<ProfileFormModel>{
    first_name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    last_name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    email: new FormControl('', [Validators.email]),
    phone_number: new FormControl('', [Validators.pattern("^[0-9+]+$"), Validators.required, Validators.maxLength(12)]),
    url: new FormControl(''),
  });

  private profileService = inject(ProfileService);
  private loadingService = inject(LoadingService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.getProfileData();
    this.setPhonePrefixOnInputChange();
  }

  public ngAfterViewInit() {
    this.cdr.markForCheck();
  }

  public saveChanges(): void {
    this.profileService.saveProfileData()
      .pipe(
        first(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe()
  }

  private getProfileData(): void {
    this.loadingService.setLoadingStatus(true);
    this.cdr.markForCheck();
    this.profileService.getProfileData()
      .pipe(
        first(),
        finalize(() => this.loadingService.setLoadingStatus(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(profile => this.patchForm(profile));
  }

  private patchForm(profile: Profile): void {
    this.profileForm.patchValue({
      ...profile,
    });
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
