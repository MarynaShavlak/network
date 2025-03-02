import { memo, useCallback } from 'react';
import { Button, ButtonTheme } from '../Button';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <div className={cls.codeWrap}>
            <pre className={classNames(cls.Code, {}, [className])}>
                <code>{text}</code>
            </pre>
            <Button
                onClick={onCopy}
                className={cls.copyBtn}
                theme={ButtonTheme.CLEAR}
            >
                <CopyIcon className={cls.copyIcon} />
            </Button>
        </div>
    );
});
