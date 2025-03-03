import { useMemo } from 'react';
import { useCommentsByArticleIdsList } from '@/features/ArticleComments';
import { useRatingsByArticleIdsList } from '@/features/ArticleRating';
import { useUserAuthData } from '@/entities/User';
import { Article, useArticlesByUserId } from '@/entities/Article';

interface ArticleStats {
    commentsQuantity: number;
    averageRating: number | '-';
}

interface UseArticleStatsResult {
    stats: Record<string, ArticleStats>;
    isLoading: boolean;
    isError: boolean;
    articles: Article[];
}

export const useGetArticleStats = (): UseArticleStatsResult => {
    const currentUserdata = useUserAuthData();

    const authedUserId = currentUserdata?.id || '';

    const {
        data: articles,
        isLoading: isArticlesLoading,
        error: isArticlesError,
    } = useArticlesByUserId(authedUserId);
    const articlesIdArray = articles?.map((article) => article.id);
    console.log('articles', articlesIdArray);
    const {
        data: ratings,
        isLoading: isRatingsLoading,
        error: isRatingsError,
    } = useRatingsByArticleIdsList(articlesIdArray || []);
    const {
        data: comments,
        isLoading: isCommentsLoading,
        error: isCommentsError,
    } = useCommentsByArticleIdsList(articlesIdArray || []);
    console.log('comments', comments);
    console.log('articles', articles);
    console.log('ratings', ratings);
    const isLoading =
        isArticlesLoading || isRatingsLoading || isCommentsLoading;
    const isError = Boolean(
        isArticlesError || isRatingsError || isCommentsError,
    );

    const stats = useMemo(() => {
        const articleStats: Record<string, ArticleStats> = {};

        articlesIdArray?.forEach((articleId) => {
            const articleComments = comments?.filter(
                (comment) => comment.articleId === articleId,
            );

            const articleRatings = ratings?.filter(
                (rating) => rating.articleId === articleId,
            );

            const averageRating = articleRatings?.length
                ? Number(
                      (
                          articleRatings.reduce(
                              (acc, { rate }) => acc + rate,
                              0,
                          ) / articleRatings.length
                      ).toFixed(1),
                  )
                : '-';

            articleStats[articleId] = {
                commentsQuantity: articleComments?.length || 3000,
                averageRating,
            };
        });

        return articleStats;
    }, [articlesIdArray, comments, ratings]);

    return {
        stats,
        articles: articles || [],
        isLoading,
        isError,
    };
};

// ___________________________________________________________
// import { useMemo, useEffect } from 'react';
// import { useCommentsByArticleIdsList } from '@/features/ArticleComments';
// import { useRatingsByArticleIdsList } from '@/features/ArticleRating';
// import { useUserAuthData } from '@/entities/User';
// import { Article, useArticlesByUserId } from '@/entities/Article';
//
// interface ArticleStats {
//     commentsQuantity: number;
//     averageRating: number | '-';
// }
//
// interface UseArticleStatsResult {
//     stats: Record<string, ArticleStats>;
//     isLoading: boolean;
//     isError: boolean;
//     articles: Article[];
// }
//
// export const useGetArticleStats = (): UseArticleStatsResult => {
//     const currentUserdata = useUserAuthData();
//     const authedUserId = currentUserdata?.id || '';
//
//     const {
//         data: articles,
//         isLoading: isArticlesLoading,
//         error: isArticlesError,
//     } = useArticlesByUserId(authedUserId);
//
//     // Only create articlesIdArray when articles are available
//     const articlesIdArray = useMemo(
//         () => (articles ? articles.map((article) => article.id) : []),
//         [articles],
//     );
//
//     // Only fetch ratings and comments when we have article IDs
//     const {
//         data: ratings,
//         isLoading: isRatingsLoading,
//         error: isRatingsError,
//     } = useRatingsByArticleIdsList(
//         articlesIdArray.length > 0 ? articlesIdArray : [],
//     );
//
//     const {
//         data: comments,
//         isLoading: isCommentsLoading,
//         error: isCommentsError,
//     } = useCommentsByArticleIdsList(
//         articlesIdArray.length > 0 ? articlesIdArray : [],
//     );
//
//     const isLoading =
//         isArticlesLoading ||
//         (articlesIdArray.length > 0 && (isRatingsLoading || isCommentsLoading));
//
//     const isError = Boolean(
//         isArticlesError || isRatingsError || isCommentsError,
//     );
//
//     // Calculate stats only when all data is available
//     const stats = useMemo(() => {
//         const articleStats: Record<string, ArticleStats> = {};
//
//         // Only process if we have all necessary data
//         if (!articles || !articlesIdArray.length || !comments || !ratings) {
//             return articleStats;
//         }
//
//         articlesIdArray.forEach((articleId) => {
//             const articleComments = comments.filter(
//                 (comment) => comment.articleId === articleId,
//             );
//
//             const articleRatings = ratings.filter(
//                 (rating) => rating.articleId === articleId,
//             );
//
//             const averageRating = articleRatings.length
//                 ? Number(
//                       (
//                           articleRatings.reduce(
//                               (acc, { rate }) => acc + rate,
//                               0,
//                           ) / articleRatings.length
//                       ).toFixed(1),
//                   )
//                 : '-';
//
//             articleStats[articleId] = {
//                 commentsQuantity: articleComments.length || 0, // Changed from 3000 to 0 as default
//                 averageRating,
//             };
//         });
//
//         return articleStats;
//     }, [articles, articlesIdArray, comments, ratings]);
//
//     // Optional debugging
//     useEffect(() => {
//         if (articles && comments && ratings) {
//             console.log('All data loaded:', {
//                 articlesCount: articles.length,
//                 commentsCount: comments.length,
//                 ratingsCount: ratings.length,
//             });
//         }
//     }, [articles, comments, ratings]);
//
//     return {
//         stats,
//         articles: articles || [],
//         isLoading,
//         isError,
//     };
// };
