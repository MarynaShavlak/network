import { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { VStack } from '@/shared/ui/common/Stack';
import cls from './SidebarDeprecated.module.scss';
import { useSidebarItems } from '../../../lib/hooks/useSidebarItems/useSidebarItems';
import { SidebarItem } from '../../SidebarItem/SidebarItem';
import { Each } from '@/shared/lib/components/Each/Each';
import { useSidebarCollapse } from '../../../lib/hooks/useSidebarCollapse/useSidebarCollapse';

interface SidebarDeprecatedProps {
    className?: string;
}

export const SidebarDeprecated = memo((props: SidebarDeprecatedProps) => {
    const { className } = props;
    const sidebarItemsList = useSidebarItems();
    const { collapsed, toggleCollapse } = useSidebarCollapse();
    const classes = classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
    ]);
    return (
        <aside data-testid="sidebar" className={classes}>
            <Button
                data-testid="sidebar-toggle"
                onClick={toggleCollapse}
                className={cls.collapseBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>
            <VStack role="navigation" gap="16" className={cls.items}>
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
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </aside>
    );
});
