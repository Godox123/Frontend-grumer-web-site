import { ErrorStateMatcher } from '@angular/material';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup
} from '@angular/forms';

export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  public isErrorState(
    control: FormControl | null,
    resetForm: FormGroupDirective | NgForm | null
  ): boolean {
    return (
      control &&
      control.parent.get('password').value !==
        control.parent.get('passwordAgain').value &&
      control.dirty
    );
  }
}
export function RepeatPasswordValidator(
  group: FormGroup
): { passwordsNotEqual: boolean } {
  const password = group.controls.password.value;
  const passwordConfirmation = group.controls.passwordAgain.value;

  return password === passwordConfirmation ? null : { passwordsNotEqual: true };
}
