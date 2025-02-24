import { arrayUnion, onSnapshot, updateDoc } from 'firebase/firestore';
import { firestoreApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { createUserNotificationQuery } from '../lib/utilities/createUserNotificationsQuery/createUserNotificationsQuery';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';

const notificationApi = firestoreApi
    .enhanceEndpoints({ addTagTypes: ['Notifications'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getNotifications: build.query<Notification[], string>({
                providesTags: ['Notifications'],
                keepUnusedDataFor: 3600,

                async queryFn(userId) {
                    try {
                        const notificationsQuery =
                            createUserNotificationQuery();

                        const notifications =
                            await fetchQueryResults<Notification>(
                                notificationsQuery,
                            );
                        const filteredNotifications = notifications.filter(
                            (notification) =>
                                !notification.dismissedBy?.includes(userId),
                        );

                        return { data: filteredNotifications };
                    } catch (error) {
                        console.error('Error fetching notifications:', error);
                        return { error };
                    }
                },

                async onCacheEntryAdded(
                    userId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;
                    let unsubscribe;

                    try {
                        const notificationsQuery =
                            createUserNotificationQuery();

                        unsubscribe = onSnapshot(
                            notificationsQuery,
                            (snapshot) => {
                                updateCachedData((draft) => {
                                    const notifications = snapshot?.docs?.map(
                                        (doc) => doc.data(),
                                    ) as Notification[];

                                    return notifications.filter(
                                        (notification) =>
                                            !notification.dismissedBy?.includes(
                                                userId,
                                            ),
                                    );
                                });
                            },
                        );
                    } catch (error) {
                        console.error(
                            'Error in notifications subscription:',
                            error,
                        );
                    }

                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                },
            }),
            dismissNotification: build.mutation<
                void,
                { notificationId: string; userId: string }
            >({
                async queryFn({ notificationId, userId }) {
                    try {
                        const notificationDocRef =
                            await getDocRefByField<Notification>(
                                'notifications',
                                'id',
                                notificationId,
                            );

                        if (!notificationDocRef) {
                            return { error: 'Notification not found' };
                        }

                        if (notificationDocRef) {
                            await updateDoc(notificationDocRef, {
                                dismissedBy: arrayUnion(userId),
                            });
                        }

                        return { data: undefined };
                    } catch (error) {
                        console.error('Error dismissing notification:', error);
                        return { error };
                    }
                },
                invalidatesTags: ['Notifications'],
            }),
        }),
    });

export const useNotifications = notificationApi.useGetNotificationsQuery;
export const dismissNotificationMutation =
    notificationApi.endpoints.dismissNotification.initiate;

// async queryFn() {
//     try {
//         const notifications =
//             await fetchCollection<Notification>(
//                 'notifications',
//             );
//         return { data: notifications };
//     } catch (error) {
//         console.error('Error fetching notifications:', error);
//         return { error };
//     }
// },
//
// async onCacheEntryAdded(
//     _,
//     { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
// ) {
//     await cacheDataLoaded;
//     let unsubscribe;
//
//     try {
//         const collectionRef =
//             dataPoint<Notification>('notifications');
//         const queryRef = query(collectionRef);
//
//         unsubscribe = onSnapshot(queryRef, (snapshot) => {
//             updateCachedData((draft) => {
//                 const notifications = snapshot.docs.map((doc) =>
//                     doc.data(),
//                 ) as Notification[];
//
//                 return notifications;
//             });
//         });
//     } catch (error) {
//         console.error(
//             'Error in notifications subscription:',
//             error,
//         );
//     }
//
//     await cacheEntryRemoved;
//     if (unsubscribe) {
//         unsubscribe();
//     }
// },
