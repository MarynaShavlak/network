import { Menu } from '@headlessui/react';
import { Fragment, memo, ReactNode } from 'react';
import { AppLink } from '../../../../AppLink';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

import cls from '../Dropdown.module.scss';
import popupCls from '../../../styles/popup.module.scss';

export interface DropdownOption {
    disabled?: boolean;
    label?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownItemInterface {
    item: DropdownOption;
}

interface ContentProps {
    active: boolean;
}

export const DropdownItem = memo(({ item }: DropdownItemInterface) => {
    const content = ({ active }: ContentProps) => (
        <button
            type="button"
            disabled={item.disabled}
            onClick={item.onClick}
            className={classNames(cls.item, {
                [popupCls.active]: active,
            })}
        >
            {item.label}
        </button>
    );

    if (item.href) {
        return (
            <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
            </Menu.Item>
        );
    }

    return (
        <Menu.Item as={Fragment} disabled={item.disabled}>
            {content}
        </Menu.Item>
    );
});
