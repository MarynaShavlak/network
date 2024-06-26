import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

export type CardGap = '0' | '8' | '16' | '24' | '32';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
    fullWidth?: boolean;
    vStack?: boolean;
    hStack?: boolean;
    gap?: CardGap;
}
const mapGapToClass: Record<CardGap, string> = {
    '0': 'gap_0',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
    '32': 'gap_32',
};

/**
 * Deprecated, use new component from directory redesigned
 * @deprecated
 */
export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        theme = CardTheme.NORMAL,
        fullWidth,
        vStack,
        hStack,
        gap = '0',
        ...otherProps
    } = props;
    const gapClass = mapGapToClass[gap];
    return (
        <div
            className={classNames(
                cls.Card,
                {
                    [cls.fullWidth]: fullWidth,
                    [cls.vStack]: vStack,
                    [cls.hStack]: hStack,
                },
                [className, cls[theme], cls[gapClass]],
            )}
            {...otherProps}
        >
            {children}
        </div>
    );
});
