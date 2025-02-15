import { ValidateProfileError } from '../consts/consts';
import { User } from '@/entities/User';

// /**
//  * Interface representing the state of the profile form.
//  *
//  * @property {Profile} [data] - The profile data object. Optional.
//  * @property {Profile} [form] - The profile form data object. Optional.
//  * @property {boolean} isLoading - Indicates whether the profile data is currently being loaded.
//  * @property {string} [error] - An error message related to the profile form. Optional.
//  * @property {boolean} readonly - Indicates whether the profile form is in read-only mode.
//  * @property {ValidateProfileError[]} [validateErrors] - An array of validation errors related to the profile form. Optional.
//  */

export interface ProfileSchema {
    data?: User;
    form?: User;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateProfileError[];
    uploadedProfilePhoto?: null | File;
}
