import React, { InputHTMLAttributes, memo, ReactNode } from 'react';
import { useInput } from '@/shared/lib/hooks/useInput/useInput';
import { HStack } from '../../common/Stack';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
import { Text } from '../Text';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface InputProps extends HTMLInputProps {
    className?: string;
    label?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    size?: InputSize;
    digitsOnly?: boolean;
    border?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        label,
        value,
        size = 'm',
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        digitsOnly = false,
        border = true,
        ...otherProps
    } = props;
    const { ref, isFocused, onChangeHandler, onBlurHandler, onFocus } =
        useInput({ autofocus, digitsOnly, onChange });
    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
        [cls.noBorder]: !border,
    };

    const input = (
        <div
            className={classNames(cls.InputWrapper, mods, [
                className,
                cls[size],
            ])}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                onFocus={onFocus}
                onBlur={onBlurHandler}
                readOnly={readonly}
                placeholder={placeholder}
                {...otherProps}
            />
            <div className={cls.addonRight}>{addonRight}</div>
        </div>
    );

    if (label) {
        return (
            <HStack max gap="8">
                <Text text={label} />
                {input}
            </HStack>
        );
    }

    return input;
});
