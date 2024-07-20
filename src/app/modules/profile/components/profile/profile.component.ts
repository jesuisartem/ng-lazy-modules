import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../services/profile.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter, first} from "rxjs";
import {Profile, ProfileFormModel} from "../../const/profile.interface";

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
    phone_number: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.pattern("^[0-9+]+$"),]),
    url: new FormControl(''),
  });

  private profileService = inject(ProfileService);
  private destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.getProfileData();

    this.profileForm.controls.phone_number
      .valueChanges
      .pipe(
        filter(value => !!value.length && !value.includes('+')),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(value => {
        const modifiedValue = `+7${value}`
        this.profileForm.controls.phone_number.patchValue(modifiedValue, { emitEvent: false });
      })
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
    this.profileService.getProfileData()
      .pipe(
        first(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(profile => this.patchForm(profile));
  }

  private patchForm(profile: Profile): void {
    this.profileForm.patchValue({
      ...profile,
    });
  }

}
