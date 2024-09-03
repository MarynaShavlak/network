import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearUserDataFromStorage } from '../../../lib/userUtils/userUtils';
import { userActions } from '../../../model/slice/userSlice';
import { ThunkConfig } from '@/app/providers/StoreProvider';

/**
 * Thunk to log out the user.
 *
 * This thunk clears the user's session both from the Redux store and any persistent storage.
 * It also handles any potential errors during the logout process.
 *
 * @param {void} _ - This thunk does not use any arguments.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing
 *        dispatch, getState, extra, and more.
 * @returns {Promise<void>} A promise that resolves when the user is logged out.
 */

export const logoutUser = createAsyncThunk<void, void, ThunkConfig<string>>(
    'user/logout',
    async (_, thunkApi) => {
        const { dispatch } = thunkApi;

        try {
            dispatch(userActions.logout());
            clearUserDataFromStorage();
        } catch (error) {
            console.error('Failed to logout user:', error);

            return thunkApi.rejectWithValue('Logout failed');
        }
        return undefined;
    },
);