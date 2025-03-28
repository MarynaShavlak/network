import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { VStack } from '@/shared/ui/common/Stack';
import { AppLogo } from '@/shared/ui/common/AppLogo';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './SidebarRedesigned.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Text } from '@/shared/ui/redesigned/Text';
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';
import ArrowRightIcon from '@/shared/assets/icons/arrow-right.svg';
import { Each } from '@/shared/lib/components/Each/Each';
import { SidebarItem } from '../../SidebarItem/SidebarItem';
import { useSidebarItems } from '../../../lib/hooks/useSidebarItems/useSidebarItems';
import { useSidebarCollapse } from '../../../lib/hooks/useSidebarCollapse/useSidebarCollapse';

interface SidebarRedesignedProps {
    className?: string;
}

export const SidebarRedesigned = memo((props: SidebarRedesignedProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { collapsed, toggleCollapse } = useSidebarCollapse();
    const sidebarItemsList = useSidebarItems();
    const classes = classNames(
        cls.SidebarRedesigned,
        { [cls.collapsedRedesigned]: collapsed },
        [className],
    );
    const iconProps = {
        onClick: toggleCollapse,
        className: cls.collapseBtn,
        Svg: collapsed ? ArrowRightIcon : ArrowLeftIcon,
        clickable: true,
    };
    return (
        <aside data-testid="sidebar" className={classes}>
            <VStack align="center" gap="8" className={cls.appLogoWrapper}>
                <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
                {!collapsed && (
                    <Text
                        className={cls.appName}
                        title={t('DEV INTERVIEW HUB')}
                        align="center"
                        size="s"
                    />
                )}
            </VStack>

            <VStack role="navigation" gap="8" className={cls.items}>
                <Each
                    of={sidebarItemsList}
                    render={(item) => {
                        return (
                            <SidebarItem
                                item={item}
                                collapsed={collapsed}
                                key={item.path}
                            />
                        );
                    }}
                />
            </VStack>

            <Icon data-testid="sidebar-toggle" {...iconProps} />

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </aside>
    );
});
