import { AbstractControl, ValidatorFn } from "@angular/forms";

export function DateValicator() : ValidatorFn {
    return (control: AbstractControl) : {[key: string]: boolean } | null => {
        if(control.value && control.value <= new Date().getTime())
            return {['DateNotAllowed']: true};
        return null;
    }
}