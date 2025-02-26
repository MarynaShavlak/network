import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { dismissNotificationMutation } from '../../../api/notificationApi';
import { auth } from '../../../../../../json-server/firebase';

type DeleteNotificationArgs = {
    notificationId: string;
    type: 'general' | 'personal_comment';
};

export const deleteNotificationThunk = createAsyncThunk<
    string, // Return type: deleted notification ID
    DeleteNotificationArgs,
    ThunkConfig<string> // Thunk configuration type
>(
    'notification/deleteNotification',
    async ({ notificationId, type }, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;
        const user = auth.currentUser;
        // const authData = getUserAuthData(getState());
        if (!user) {
            return rejectWithValue('No user data found.');
        }
        // const userId = authData.id;

        if (!notificationId) {
            return rejectWithValue('Notification ID is required.');
        }

        try {
            await dispatch(
                dismissNotificationMutation({
                    notificationId,
                    userId: user.uid,
                }),
            );

            return notificationId;
        } catch (error) {
            return rejectWithValue(
                `Failed to dismiss for current user notification with id ${notificationId}`,
            );
        }
    },
);
