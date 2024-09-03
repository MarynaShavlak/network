import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../../api/userApi';
import { User } from '../../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { initializeUserFeatures } from '../../../lib/userUtils/userUtils';

/**
 * Thunk to initialize authentication data based on user ID stored in local storage.
 *
 * This thunk fetches the user data by ID from the API and updates the local storage
 * with the appropriate design preference. It handles scenarios where the user ID is
 * not found in local storage and manages errors that may occur during the process.
 *
 * @param {void} _ - This thunk does not require any parameters.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing dispatch, getState, extra, and more.
 * @returns {Promise<User>} The user data retrieved from the API or an error message.
 */

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (newJsonSettings, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        const userData = JSON.parse(
            localStorage.getItem(USER_LOCALSTORAGE_KEY) as string,
        );
        const userId = userData?.id;

        if (!userId) {
            return rejectWithValue('No user ID found in local storage.');
        }

        try {
            const response = await dispatch(
                getUserDataByIdQuery(userId),
            ).unwrap();

            initializeUserFeatures(response);

            return response;
        } catch (error) {
            console.error('Error during auth initialization:', error);
            return rejectWithValue('Failed to initialize auth data.');
        }
    },
);
