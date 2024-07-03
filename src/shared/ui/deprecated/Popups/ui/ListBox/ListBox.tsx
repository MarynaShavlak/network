import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';
import { Each } from '@/shared/lib/components/Each/Each';
import CheckedIcon from '@/shared/assets/icons/done-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { Button } from '../../../Button/Button';
import { Icon } from '../../../Icon/Icon';
import { HStack } from '../../../../redesigned/Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import cls from './ListBox.module.scss';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

/**
 * Deprecated, use new component from directory redesigned
 * @deprecated
 */
export function ListBox(props: ListBoxProps) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom right',
        label,
    } = props;
    console.log(value);
    console.log(items);

    const optionsClasses = [mapDirectionClass[direction]];

    const selectedItem = useMemo(() => {
        return items?.find((item) => item.value === value);
    }, [items, value]);

    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                className={classNames(cls.ListBox, {}, [
                    className,
                    popupCls.popup,
                ])}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button className={cls.trigger} as="div">
                    <Button disabled={readonly}>
                        {selectedItem?.content ?? defaultValue}
                    </Button>
                </HListBox.Button>
                {items && (
                    <HListBox.Options
                        className={classNames(cls.options, {}, optionsClasses)}
                    >
                        <Each
                            of={items}
                            render={(item) => (
                                <HListBox.Option
                                    key={item.value}
                                    value={item.value}
                                    disabled={item.disabled}
                                    as={Fragment}
                                >
                                    {({ active, selected }) => (
                                        <li
                                            className={classNames(cls.item, {
                                                [popupCls.active]: active,
                                                [popupCls.disabled]:
                                                    item.disabled,
                                            })}
                                        >
                                            <HStack gap="8">
                                                {item.content}
                                                {selected && (
                                                    <Icon Svg={CheckedIcon} />
                                                )}
                                            </HStack>
                                        </li>
                                    )}
                                </HListBox.Option>
                            )}
                        />
                    </HListBox.Options>
                )}
            </HListBox>
        </HStack>
    );
}
