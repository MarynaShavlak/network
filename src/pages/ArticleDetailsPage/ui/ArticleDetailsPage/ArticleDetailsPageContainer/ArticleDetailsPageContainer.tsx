import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/ui/common/Stack';
import {
    ArticleDetails,
    useArticleDetailsData,
    useArticleDetailsError,
} from '@/entities/Article';
import { ArticleComments } from '@/features/ArticleComments';
import { ArticleRating } from '@/features/ArticleRating';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleDetailsPageHeader } from '../DeprecatedArticleDetailsPage/ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { useUserAuthData } from '@/entities/User';

export const ArticleDetailsPageContainer = memo(() => {
    const { id } = useParams<{ id: string }>();
    const error = useArticleDetailsError();
    const article = useArticleDetailsData();
    const currentUserdata = useUserAuthData();
    const articleAuthorId = article?.user.id;
    const authedUserId = currentUserdata?.id;

    return (
        <VStack gap="16" max>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Card max fullHeight border="round" padding="24">
                        <ArticleDetails id={id} />
                    </Card>
                }
                off={
                    <>
                        <ArticleDetailsPageHeader />
                        <ArticleDetails id={id} />
                    </>
                }
            />
            {article && !error && (
                <>
                    {articleAuthorId !== authedUserId && (
                        <ArticleRating articleId={id} />
                    )}

                    <ArticleRecommendationsList />
                    <ArticleComments id={id} />
                </>
            )}
        </VStack>
    );
});
