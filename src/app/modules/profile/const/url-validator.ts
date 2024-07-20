import { AbstractControl, ValidatorFn } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const urlPattern = /^(https?:\/\/)?([a-z0-9]+([\-\.][a-z0-9]+)*\.[a-z]{2,})/i;
    const valid = urlPattern.test(control.value);
    return valid || !control.value.length ? null : { invalidUrl: { value: control.value } };
  };
}
