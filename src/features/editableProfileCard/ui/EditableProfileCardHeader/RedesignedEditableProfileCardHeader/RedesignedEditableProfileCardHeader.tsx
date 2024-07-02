import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import cls from '../EditableProfileCardHeader.module.scss';

interface RedesignedEditableProfileCardHeaderProps {
    className?: string;
    onEdit: () => void;
    onCancelEdit: () => void;
    onSave: () => void;
    canEdit: boolean;
    readonly: boolean | undefined;
}

export const RedesignedEditableProfileCardHeader = memo(
    (props: RedesignedEditableProfileCardHeaderProps) => {
        const { className, onEdit, onCancelEdit, onSave, readonly, canEdit } =
            props;
        const { t } = useTranslation('profile');

        return (
            <HStack
                max
                justify="between"
                className={classNames('', {}, [className, cls.header])}
            >
                {canEdit && (
                    <HStack className={cls.wrap} justify="end" max>
                        {readonly ? (
                            <Button
                                variant="outline"
                                onClick={onEdit}
                                data-testid="EditableProfileCardHeader.EditButton"
                            >
                                {t('Редагувати профіль')}
                            </Button>
                        ) : (
                            <HStack gap="8" justify="between" max>
                                <Button
                                    variant="cancel"
                                    onClick={onCancelEdit}
                                    data-testid="EditableProfileCardHeader.CancelButton"
                                >
                                    {t('Відмінити')}
                                </Button>
                                <Button
                                    variant="save"
                                    onClick={onSave}
                                    data-testid="EditableProfileCardHeader.SaveButton"
                                >
                                    {t('Зберегти')}
                                </Button>
                            </HStack>
                        )}
                    </HStack>
                )}
            </HStack>
        );
    },
);
