import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    removeAllGeneralNotificationsForUserMutation,
    removeAllPersonalNotificationsMutation,
} from '../../../api/notificationApi';
import { handleThunkErrorMessage } from '@/shared/lib/firestore';
import { ERROR_NOTIFICATION_MESSAGES } from '../../consts/errorNotificationMessages';

export const deleteAllNotificationsThunk = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('notification/deleteAllNotifications', async (_, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;
    const { auth } = extra;
    const user = auth.currentUser;

    if (!user) {
        return rejectWithValue(ERROR_NOTIFICATION_MESSAGES.USER_NOT_AUTHORIZED);
    }

    try {
        const [personalResult, generalResult] = await Promise.allSettled([
            dispatch(
                removeAllPersonalNotificationsMutation({
                    userId: user.uid,
                }),
            ).unwrap(),
            dispatch(
                removeAllGeneralNotificationsForUserMutation({
                    userId: user.uid,
                }),
            ).unwrap(),
        ]);

        return undefined;
    } catch (error) {
        return rejectWithValue(
            handleThunkErrorMessage(
                error,
                ERROR_NOTIFICATION_MESSAGES.DELETE_NOTIFICATIONS_FAIL,
            ),
        );
    }
});
