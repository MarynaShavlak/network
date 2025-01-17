// useStatisticsData.ts

import { useSelector } from 'react-redux';
import { useUsers } from '@/entities/User';

import { useArticlesRatings } from '../../api/articlesRatingsApi';
import { useArticlesComments } from '@/features/ArticleComments';
import { useGetArticles, selectAllArticles } from '@/entities/Article';

export const useStatisticsData = () => {
    const {
        data: users,
        isLoading: isUsersLoading,
        error: isUsersError,
    } = useUsers();
    const { isLoading: isArticlesLoading, error: isArticlesError } =
        useGetArticles();
    const articles = useSelector(selectAllArticles);
    // console.log('entries', articles);
    // const articles = useSelector(getArticles.selectAll);
    // console.log('articles', articles);

    const {
        data: ratings = [],
        isLoading: isRatingsLoading,
        error: isRatingsError,
    } = useArticlesRatings();
    const {
        data: comments = [],
        isLoading: isCommentsLoading,
        error: isCommentsError,
    } = useArticlesComments();

    const isLoading =
        isUsersLoading ||
        isArticlesLoading ||
        isRatingsLoading ||
        isCommentsLoading;

    const isError =
        isUsersError || isArticlesError || isRatingsError || isCommentsError;

    return { users, articles, ratings, comments, isLoading, isError };
};

// export const useStatisticsData = () => {
//     const articles = useSelector(getArticles.selectAll);
//     console.log('articles', articles);
//
//     return { articles };
// };
