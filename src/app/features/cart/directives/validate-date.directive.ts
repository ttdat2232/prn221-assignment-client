import { AbstractControl, ValidatorFn } from "@angular/forms";

export function DateValicator() : ValidatorFn {
    return (control: AbstractControl) : {[key: string]: boolean } | null => {
        if(control.value && new Date(control.value).getDate() <= new Date().getDate())
            return {['DateNotAllowed']: true};
        return null;
    }
}