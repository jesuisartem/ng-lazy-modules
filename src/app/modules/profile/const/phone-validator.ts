import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = control.value.length === 12;
    return valid ? null : { invalidPhone: { value: control.value } };
  };
}
