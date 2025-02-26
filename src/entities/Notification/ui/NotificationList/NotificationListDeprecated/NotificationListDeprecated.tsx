import React, { memo } from 'react';
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

export const NotificationListDeprecated = memo(
    (props: NotificationListProps) => {
        const { className } = props;
        const listClass = classNames(cls.NotificationList, {}, [className]);

        const { t } = useTranslation();
        const { data: allNotifications, isLoading } = useAllNotifications();
        const titleText = t('Сповіщення');

        if (isLoading) {
            return <NotificationListSkeleton className={className} />;
        }
        if (allNotifications?.length === 0) {
            return <EmptyNotificationsList className={className} />;
        }

        return (
            <VStack gap="16" max className={listClass}>
                <HStack gap="16" max justify="between">
                    <TextDeprecated text={titleText} size={TextSize.L} />
                    <ButtonDeprecated onClick={() => console.log('delete all')}>
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
