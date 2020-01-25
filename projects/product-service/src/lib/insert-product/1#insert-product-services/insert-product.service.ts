import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// 1. Our defined form models
interface FavoriteAnimals {
    favoriteCat: string;
    favoriteDog: string;
}
interface MyFormModel {
    firstName: string;
    lastName: string;
    email: string;
    favoriteAnimals: FavoriteAnimals;
}

export type FormModel<T> = { [P in keyof T]: [T[P], any?] };

@Injectable({
    providedIn: 'root'
})
export class InsertProductService {

    form: FormModel<MyFormModel> = this.initForm();

    constructor(
        private formBuilder: FormBuilder
    ) { }

    private initForm(): FormModel<MyFormModel> {

        // 3. define the form and its components
        const subForm: FormModel<FavoriteAnimals> = {
            favoriteCat: [''],
            favoriteDog: [''],
        };
        const form: FormModel<MyFormModel> = {
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            favoriteAnimals: this.formBuilder.group(subForm)
        };

        // 4. return the form with the defintion intiialised
        return this.formBuilder.group(form);
    }
}
