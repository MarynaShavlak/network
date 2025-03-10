import { Query, query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { ArticleRatingType } from '../../../model/types/articleRatingType';

/**
 * Creates a Firestore query for fetching article ratings by article ID and user ID.
 * @param articleId - The ID of the article to fetch ratings for.
 * @param userId - The ID of the user to fetch ratings for.
 * @returns A Firestore Query instance configured for the article's ratings by user ID.
 */

export const createArticleRatingQuery = (
    articleId: string,
    userId: string,
): Query<ArticleRatingType> => {
    const ratingsCollection = dataPoint<ArticleRatingType>('ratings');
    return query(
        ratingsCollection,
        where('articleId', '==', articleId),
        where('user.id', '==', userId),
    );
};
