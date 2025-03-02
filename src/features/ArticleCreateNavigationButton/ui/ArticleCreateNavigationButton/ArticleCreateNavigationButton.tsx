import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
// import { useArticleDetailsData } from '@/entities/Article';
import { getRouteArticleCreate } from '@/shared/const/router/router';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';

import cls from './ArticleCreateNavigationButton.module.scss';

interface ArticleCreateNavigationButtonProps {
    max?: boolean;
}

export const ArticleCreateNavigationButton = memo(
    ({ max = false }: ArticleCreateNavigationButtonProps) => {
        const { t } = useTranslation('articles');

        const navigate = useNavigate();

        const onCreateArticle = useCallback(() => {
            navigate(getRouteArticleCreate());
        }, [navigate]);
        const buttonText = t('Створити статтю');

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Button
                        size="m"
                        onClick={onCreateArticle}
                        className={cls.addButton}
                        variant="save"
                        max={max}
                    >
                        {buttonText}
                    </Button>
                }
                off={
                    <ButtonDeprecated
                        theme={ButtonTheme.OUTLINE}
                        onClick={onCreateArticle}
                    >
                        {buttonText}
                    </ButtonDeprecated>
                }
            />
        );
    },
);
