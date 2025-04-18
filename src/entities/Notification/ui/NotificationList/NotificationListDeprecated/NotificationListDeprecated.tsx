import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../NotificationList.module.scss';
import { NotificationListProps } from '../NotificationList';
import { useAllNotifications } from '../../../api/notificationApi';
import { EmptyNotificationsList } from '../../EmptyNotificationsList/EmptyNotificationsList';
import { NotificationItem } from '../../NotificationItem/NotificationItem';
import { NotificationListSkeleton } from '../../NotificationListSkeleton/NotificationListSkeleton';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { ErrorNotificationsList } from '../../ErrorNotificationsList/ErrorNotificationsList';
import { deleteAllNotificationsThunk } from '../../../model/services/deleteAllNotificationsThunk/deleteAllNotificationsThunk';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const NotificationListDeprecated = memo(
    (props: NotificationListProps) => {
        const { className, userId } = props;
        const dispatch = useAppDispatch();
        const listClass = classNames(cls.NotificationListDeprecated, {}, [
            className,
        ]);

        const { t } = useTranslation();
        const {
            data: allNotifications,
            isLoading,
            error,
        } = useAllNotifications(userId || '');
        const titleText = t('Сповіщення');

        const handleDeleteAllNotifications = useCallback(async () => {
            try {
                await dispatch(deleteAllNotificationsThunk());
            } catch (error) {
                console.error('Failed to dismiss notification:', error);
            }
        }, [dispatch]);

        if (isLoading) {
            return <NotificationListSkeleton className={className} />;
        }
        if (allNotifications?.length === 0) {
            return <EmptyNotificationsList className={className} />;
        }
        if (error) {
            return <ErrorNotificationsList className={className} />;
        }

        return (
            <VStack gap="16" max className={listClass}>
                <HStack
                    gap="16"
                    max
                    justify="between"
                    className={cls.headerDeprecated}
                >
                    <HStack gap="16">
                        <TextDeprecated text={titleText} size={TextSize.L} />
                        <span className={cls.notificationsCountDeprecated}>
                            {allNotifications?.length}
                        </span>
                    </HStack>

                    <ButtonDeprecated onClick={handleDeleteAllNotifications}>
                        {t('Видалити всі')}
                    </ButtonDeprecated>
                </HStack>
                {allNotifications && (
                    <Each
                        of={allNotifications}
                        render={(item) => (
                            <NotificationItem key={item.id} item={item} />
                        )}
                    />
                )}
            </VStack>
        );
    },
);
