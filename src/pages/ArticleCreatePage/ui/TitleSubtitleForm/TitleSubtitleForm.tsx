import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import AddIcon from '@/shared/assets/icons/plus.svg';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useCreateArticle } from '../../lib/hooks/useCreateArticle/useCreateArticle';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';

interface TitleSubtitleFormProps {
    titleIndex: number;
    subtitleIndex: number;
}

export const TitleSubtitleForm = (props: TitleSubtitleFormProps) => {
    const { titleIndex, subtitleIndex } = props;
    const { t } = useTranslation('articleDetails');
    const validConfig = useInputValidationConfig();
    const { isVisible: isLinkInputAdded, toggleVisibility: toggleLinkInput } =
        useToggleVisibility();

    const {
        formData,
        onChangeTitle,
        onChangeSubtitleText,
        onChangeSubtitleLink,
    } = useCreateArticle();

    const deleteSubtitleLink = useCallback(() => {
        onChangeSubtitleLink('');
        toggleLinkInput();
    }, [onChangeSubtitleLink, toggleLinkInput]);

    const linkButtonText = isLinkInputAdded
        ? t('Видалити посилання')
        : t('Додати посилання');

    return (
        <VStack gap="24">
            <HStack gap="16" align="start" max>
                <OrderCard index={titleIndex} />

                <Input
                    value={formData?.title || ''}
                    label={t('Заголовок статті')}
                    labelBold
                    gap="16"
                    maxWidth={false}
                    className={cls.InputName}
                    onChange={onChangeTitle}
                    validations={validConfig.title}
                    maxLengthIndicator
                    // errors={usernameErrors}
                />
            </HStack>
            <HStack gap="16" align="start" max>
                <OrderCard index={subtitleIndex} />
                <VStack gap="16">
                    <Input
                        value={formData?.subtitle.text || ''}
                        label={t('Підзаголовок статті')}
                        labelBold
                        gap="16"
                        maxWidth={false}
                        className={cls.InputName}
                        onChange={onChangeSubtitleText}
                        validations={validConfig.subtitle}
                        maxLengthIndicator
                    />
                    {isLinkInputAdded && (
                        <Input
                            value={formData?.subtitle.link || ''}
                            label={t('Посилання')}
                            labelBold
                            gap="16"
                            maxWidth={false}
                            className={cls.InputName}
                            onChange={onChangeSubtitleLink}
                            validations={validConfig.subtitle}
                            maxLengthIndicator
                        />
                    )}
                </VStack>

                <Button
                    variant="filled"
                    addonLeft={
                        !isLinkInputAdded && (
                            <Icon Svg={AddIcon} width={16} height={16} />
                        )
                    }
                    className={cls.addLinkButton}
                    onClick={deleteSubtitleLink}
                >
                    {linkButtonText}
                </Button>
            </HStack>
        </VStack>
    );
};
