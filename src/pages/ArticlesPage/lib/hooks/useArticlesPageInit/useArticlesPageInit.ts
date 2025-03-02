import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlesPage } from '../../../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPageThunk } from '../../../model/services/fetchNextArticlesPageThunk/fetchNextArticlesPageThunk';

/**
 * Custom hook for managing the initialization and loading of articles on a page.
 *
 * @returns {{
 *    onLoadNextPart: () => void;
 *    searchParams: URLSearchParams;
 *  }} An object with the following properties:
 *  * `onLoadNextPart`: Function to load the next page of articles when the user scrolls to the end.
 *  * `searchParams`: The current URL search parameters used for initializing the articles page or filtering articles.
 *
 */

export const useArticlesPageInit = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const onLoadNextPart = useCallback(() => {
        console.log('load next part');
        dispatch(fetchNextArticlesPageThunk());
    }, [dispatch]);

    return {
        onLoadNextPart,
    };
};
