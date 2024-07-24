import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import {
    AppLink as AppLinkDeprecated,
    AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { useUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed?: boolean;
}

const DeprecatedSidebarItem = ({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();

    return (
        <AppLinkDeprecated
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(cls.item, {
                [cls.collapsed]: collapsed,
            })}
        >
            <item.Icon className={cls.icon} />
            <span className={cls.link}>{t(item.text)}</span>
        </AppLinkDeprecated>
    );
};

const RedesignedSidebarItem = ({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();

    return (
        <AppLink
            to={item.path}
            className={classNames(cls.itemRedesigned, {
                [cls.collapsedRedesigned]: collapsed,
            })}
            activeClassName={cls.active}
        >
            <Icon Svg={item.Icon} />
            <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
    );
};

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();
    const isAuth = useUserAuthData();

    if (item.authOnly && !isAuth) {
        return null;
    }
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<RedesignedSidebarItem item={item} collapsed={collapsed} />}
            off={<DeprecatedSidebarItem item={item} collapsed={collapsed} />}
        />
    );
});
