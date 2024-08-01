import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FeedbackProps } from '../../FeedbackContainer/FeedbackContainer';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';

export const RedesignedFeedbackDrawerContent = memo(
    (props: Partial<FeedbackProps>) => {
        const { t } = useTranslation();
        const { feedbackTitle, setFeedback, feedback, onSubmitFeedback } =
            props;

        return (
            <>
                <Text title={feedbackTitle} />
                <Input
                    value={feedback}
                    onChange={setFeedback}
                    placeholder={t('Ваш відгук')}
                />
                <Button max onClick={onSubmitFeedback} size="l">
                    {t('Відправити')}
                </Button>
            </>
        );
    },
);
