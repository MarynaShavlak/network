import React, { ReactNode } from 'react';
import { toggleFeatures } from '@/shared/lib/features';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { classNames, Mods } from '@/shared/lib/classes/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, lazy } = props;
    const { isClosing, isMounted, close } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    });
    const { theme } = useTheme();

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    const classes = [
        className,
        theme,
        'app_modal',
        toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.modalRedesigned,
            off: () => cls.modalDeprecated,
        }),
    ];
    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={classNames(cls.Modal, mods, [...classes])}>
                <Overlay onClick={close} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
};
