import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';

export const DisabledRatingBlock = memo(() => {
    const { t } = useTranslation();
    const text = t("Оцінка статей скоро з'явиться");

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Card max border="round" vStack gap="8" padding="24">
                    <StarRating size={20} disabled />
                    <Text text={text} />
                </Card>
            }
            off={
                <CardDeprecated fullWidth vStack gap="8">
                    <StarRating size={20} disabled />
                    <TextDeprecated text={text} />
                </CardDeprecated>
            }
        />
    );
});
