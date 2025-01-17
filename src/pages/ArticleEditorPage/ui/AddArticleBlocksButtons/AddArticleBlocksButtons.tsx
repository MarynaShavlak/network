import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import cls from './AddArticleBlocksButtons.module.scss';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { FlexDirection } from '@/shared/types/flexTypes';

interface AddArticleBlocksButtonsProps {
    onAddTextBlockBtnClick: () => void;
    onAddCodeBlockBtnClick: () => void;
    onAddImageBlockBtnClick?: () => void;
    direction: FlexDirection;
    className?: string;
    deleteAllBlocks: () => void;
    isSomeBlockAdded: boolean;
}

export const AddArticleBlocksButtons = memo(
    (props: AddArticleBlocksButtonsProps) => {
        const {
            onAddTextBlockBtnClick,
            onAddImageBlockBtnClick,
            onAddCodeBlockBtnClick,
            direction,
            className,
            deleteAllBlocks,
            isSomeBlockAdded,
        } = props;
        const { t } = useTranslation('articleDetails');
        const Wrapper = direction === 'row' ? HStack : VStack;

        return (
            <>
                <Button
                    variant="filled"
                    addonLeft={<Icon Svg={AddIcon} width={16} height={16} />}
                    className={cls.addButton}
                    onClick={onAddTextBlockBtnClick}
                >
                    <span>
                        {t('блок')}
                        &nbsp;
                        <b>{t('тексту')}</b>
                    </span>
                </Button>
                <Button
                    variant="filled"
                    addonLeft={<Icon Svg={AddIcon} width={16} height={16} />}
                    className={cls.addButton}
                    onClick={onAddCodeBlockBtnClick}
                >
                    <span>
                        {t('блок')}
                        &nbsp;
                        <b>{t('коду')}</b>
                    </span>
                </Button>
                <Button
                    variant="filled"
                    addonLeft={<Icon Svg={AddIcon} width={16} height={16} />}
                    className={cls.addButton}
                    onClick={onAddImageBlockBtnClick}
                >
                    <span>
                        {t('блок')}
                        &nbsp;
                        <b>{t('зображення')}</b>
                    </span>
                </Button>
                <Button
                    variant="cancel"
                    className={cls.deleteBtn}
                    onClick={deleteAllBlocks}
                    disabled={!isSomeBlockAdded}
                >
                    {t('Видалити всі')}
                </Button>
            </>
        );
    },
);
