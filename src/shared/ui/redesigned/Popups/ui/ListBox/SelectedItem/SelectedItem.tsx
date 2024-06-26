import { Listbox as HListBox } from '@headlessui/react';
import { Button } from '../../../../Button';
import { Icon } from '../../../../Icon';
import { ListBoxItem } from '../OptionItem/OptionItem';
import cls from './SelectedItem.module.scss';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

interface SelectedItemProps<T extends string> {
    selectedItem: ListBoxItem<T> | undefined;
    defaultValue?: string;
    readonly?: boolean;
}

export function SelectedItem<T extends string>(props: SelectedItemProps<T>) {
    const { selectedItem, defaultValue, readonly } = props;

    return (
        <HListBox.Button className={cls.trigger} as="div">
            <Button
                variant="filled"
                disabled={readonly}
                addonRight={<Icon Svg={ArrowIcon} />}
            >
                {selectedItem?.content ?? defaultValue}
            </Button>
        </HListBox.Button>
    );
}
