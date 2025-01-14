import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from './CodeEditorForm.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
// import AddIcon from '@/shared/assets/icons/plus.svg';
// import { ActionButtonList } from '@/shared/ui/redesigned/ActionButtonList';
// import { CodeEditor } from '@/shared/ui/redesigned/CodeEditor';
// import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { CodeEditor } from '@/shared/ui/redesigned/CodeEditor';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ActionButtonList } from '@/shared/ui/redesigned/ActionButtonList';
import AddIcon from '@/shared/assets/icons/plus.svg';

export interface CodeEditorFormProps {
    title: string;
    handleTitleChange: (title: string) => void;
    code: string;
    onCodeChange: (code: string) => void;
    onSave: () => void;
    onDelete: () => void;
    hasContent: boolean;
}

export const CodeEditorForm = memo((props: CodeEditorFormProps) => {
    const {
        title,
        handleTitleChange,
        code,
        onCodeChange,
        onSave,
        onDelete,
        hasContent,
    } = props;
    const { t } = useTranslation('articleDetails');
    const validConfig = useInputValidationConfig();
    const { blockTitleErrors } = useFormValidation(
        {
            blockTitle: title,
        },
        validConfig,
        'article',
    );
    const hasInputError = Object.values(blockTitleErrors).some(
        (error) => error,
    );

    return (
        <VStack gap="16" max>
            <Input
                value={title}
                label={t('Опис коду')}
                labelBold
                gap="16"
                maxWidth={false}
                className={cls.titleInput}
                onChange={handleTitleChange}
                validations={validConfig.blockTitle}
                maxLengthIndicator
                errors={blockTitleErrors}
            />
            <HStack gap="16" align="end" justify="between" max>
                <CodeEditor
                    height="200px"
                    width="600px"
                    loader={<Skeleton width="100%" height="200px" />}
                    onChangeCode={onCodeChange}
                    initialCode={code}
                />

                <ActionButtonList
                    successAction={{
                        label: t('Зберегти'),
                        onClick: onSave,
                        icon: AddIcon,
                        disabled: hasContent || hasInputError,
                    }}
                    cancelAction={{
                        label: t('Видалити'),
                        onClick: onDelete,
                    }}
                />
            </HStack>
        </VStack>
    );
});