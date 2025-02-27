import { collection, deleteDoc, getDocs } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/rtkApi';
import {
    GeneralNotification,
    PersonalNotification,
} from '../model/types/notification';

import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { auth, firestore } from '../../../../json-server/firebase';
import { fetchAllNotifications } from '../lib/utilities/fetchAllNotifications/fetchAllNotifications';
import { subscribeToNotifications } from '../lib/utilities/subscribeToNotifications/subscribeToNotifications';
import { fetchCollection } from '@/shared/lib/firestore/fetchCollection/fetchCollection';
import { filterDismissedNotifications } from '../lib/utilities/filterDismissedNotifications/filterDismissedNotifications';
import { deleteOneGeneralNotificationForUser } from '../lib/utilities/deleteOneGeneralNotificationForUser/deleteOneGeneralNotificationForUser';
import { updateNotificationsDismissedByUser } from '../lib/utilities/updateNotificationsDismissedByUser/updateNotificationsDismissedByUser';

const notificationApi = firestoreApi
    .enhanceEndpoints({
        addTagTypes: ['Notifications', 'PersonalNotifications'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getAllNotifications: build.query<
                (GeneralNotification | PersonalNotification)[],
                void
            >({
                providesTags: ['Notifications', 'PersonalNotifications'],
                keepUnusedDataFor: 3600,
                async queryFn() {
                    try {
                        const user = auth.currentUser;
                        if (!user) return { data: undefined };
                        const data = await fetchAllNotifications(user.uid);
                        return { data };
                    } catch (error) {
                        console.error(
                            'Error fetching all notifications:',
                            error,
                        );
                        return { error };
                    }
                },

                async onCacheEntryAdded(
                    _,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;

                    const user = auth.currentUser;
                    if (!user) return;

                    const unsubscribe = subscribeToNotifications(
                        updateCachedData,
                        user.uid,
                    );

                    if (unsubscribe) {
                        const { unsubscribeGeneral, unsubscribePersonal } =
                            unsubscribe;
                        await cacheEntryRemoved;
                        if (unsubscribeGeneral) unsubscribeGeneral();
                        if (unsubscribePersonal) unsubscribePersonal();
                    }
                },
            }),
            dismissGeneralNotification: build.mutation<
                void,
                { notificationId: string; userId: string }
            >({
                async queryFn({ notificationId, userId }) {
                    try {
                        const notificationDocRef =
                            await getDocRefByField<GeneralNotification>(
                                'notifications/general/messages',
                                'id',
                                notificationId,
                            );

                        if (!notificationDocRef) {
                            return { error: 'Notification not found' };
                        }

                        if (notificationDocRef) {
                            await deleteOneGeneralNotificationForUser(
                                notificationDocRef,
                                userId,
                            );
                        }

                        return { data: undefined };
                    } catch (error) {
                        console.error('Error dismissing notification:', error);
                        return { error };
                    }
                },
                invalidatesTags: ['Notifications'],
            }),

            deleteAllGeneralNotificationsForUser: build.mutation<
                void,
                { userId: string }
            >({
                async queryFn({ userId }) {
                    try {
                        const allGeneralNotifications =
                            await fetchCollection<GeneralNotification>(
                                'notifications/general/messages',
                            );

                        const notificationsToUpdate =
                            filterDismissedNotifications(
                                allGeneralNotifications,
                                userId,
                            );

                        if (notificationsToUpdate.length === 0) {
                            return { data: undefined };
                        }

                        await updateNotificationsDismissedByUser(
                            notificationsToUpdate,
                            userId,
                        );

                        return { data: undefined };
                    } catch (error) {
                        console.error(
                            'Error dismissing all general notifications:',
                            error,
                        );
                        return {
                            error: 'Failed to dismiss all general notifications',
                        };
                    }
                },
                invalidatesTags: ['Notifications'],
            }),

            dismissPersonalNotification: build.mutation<
                void,
                { notificationId: string; userId: string }
            >({
                async queryFn({ notificationId, userId }) {
                    try {
                        const notificationDocRef =
                            await getDocRefByField<PersonalNotification>(
                                `notifications/personal/${userId}`,
                                'id',
                                notificationId,
                            );

                        if (!notificationDocRef) {
                            return { error: 'Personal notification not found' };
                        }

                        if (notificationDocRef) {
                            await deleteDoc(notificationDocRef);
                        }

                        return { data: undefined };
                    } catch (error) {
                        console.error(
                            'Error dismissing personal notification:',
                            error,
                        );
                        return { error };
                    }
                },
                invalidatesTags: ['PersonalNotifications'],
            }),
            deleteAllPersonalNotifications: build.mutation<
                void,
                { userId: string }
            >({
                async queryFn({ userId }) {
                    try {
                        const userNotificationsRef = collection(
                            firestore,
                            'notifications',
                            'personal',
                            userId,
                        );

                        const querySnapshot =
                            await getDocs(userNotificationsRef);

                        if (querySnapshot.empty) {
                            return {
                                error: 'No personal notifications found for the user.',
                            };
                        }

                        const deletePromises = querySnapshot.docs.map((doc) =>
                            deleteDoc(doc.ref),
                        );

                        await Promise.allSettled(deletePromises);

                        return { data: undefined };
                    } catch (error) {
                        console.error(
                            'Error deleting personal notifications:',
                            error,
                        );
                        return {
                            error: 'Failed to delete all personal notifications.',
                        };
                    }
                },
                invalidatesTags: ['PersonalNotifications'],
            }),
        }),
    });

export const useAllNotifications = notificationApi.useGetAllNotificationsQuery;
export const dismissGeneralNotificationMutation =
    notificationApi.endpoints.dismissGeneralNotification.initiate;

export const dismissPersonalNotificationMutation =
    notificationApi.endpoints.dismissPersonalNotification.initiate;

export const deleteAllPersonalNotificationsMutation =
    notificationApi.endpoints.deleteAllPersonalNotifications.initiate;

export const deleteAllGeneralNotificationsForUserMutation =
    notificationApi.endpoints.deleteAllGeneralNotificationsForUser.initiate;
