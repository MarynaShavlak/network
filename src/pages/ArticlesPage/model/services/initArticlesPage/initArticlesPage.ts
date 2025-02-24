import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleView } from '@/entities/Article';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
// import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { shouldDoActionForRedesignUi } from '@/shared/lib/features';

import { parseSearchParams } from '../../../lib/utilities/parseSearchParams/parseSearchParams';

/**
 * Thunk to initialize the articles page with settings based on URL search parameters.
 *
 * This thunk is responsible for setting the initial state of the articles page based on
 * query parameters from the URL. It updates the Redux store with values for sorting, ordering,
 * search terms, and categories if they are present in the search parameters. It also dispatches
 * an action to initialize the state and then fetches the articles list.
 *
 * @param {URLSearchParams} searchParams - The URL search parameters to initialize the page settings.
 * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing
 *        dispatch, getState, extra, and more.
 * @returns {Promise<void>} A promise that resolves when the page is initialized and the articles list is fetched.
 */

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
    try {
        const { getState, dispatch } = thunkApi;
        const inited = getArticlesPageInited(getState());
        // console.log('inited', inited);

        if (!inited) {
            const parsedParams = parseSearchParams(searchParams);
            const { order, sort, search, category } = parsedParams;

            if (order) dispatch(articlesPageActions.setOrder(order));
            if (sort) dispatch(articlesPageActions.setSort(sort));
            if (search) dispatch(articlesPageActions.setSearch(search));
            if (category) dispatch(articlesPageActions.setCategory(category));

            // const orderFromUrl = searchParams.get('order') as SortOrder;
            //
            // const sortFromUrl = searchParams.get('sort') as ArticleSortType;
            //
            // const searchFromUrl = searchParams.get('query');
            // const categoryFromUrl = searchParams.get(
            //     'category',
            // ) as ArticleCategory;
            // console.log('orderFromUrl', orderFromUrl);
            // console.log('sortFromUrl', sortFromUrl);
            // if (orderFromUrl) {
            //     dispatch(articlesPageActions.setOrder(orderFromUrl));
            // }
            // if (!orderFromUrl && sortFromUrl) {
            //     const order = sortFromUrl?.split('_')[2] as SortOrder;
            //     dispatch(articlesPageActions.setOrder(order));
            // }
            //
            // if (sortFromUrl?.includes('_')) {
            //     const sort = sortFromUrl?.split('_')[1] as ArticleSortType;
            //     dispatch(articlesPageActions.setSort(sort));
            // }
            //
            // if (sortFromUrl && !sortFromUrl?.includes('_')) {
            //     dispatch(articlesPageActions.setSort(sortFromUrl));
            // }
            //
            // if (searchFromUrl) {
            //     dispatch(articlesPageActions.setSearch(searchFromUrl));
            // }
            // if (categoryFromUrl?.includes('-')) {
            //     const category = categoryFromUrl.split(
            //         '-',
            //     )[0] as ArticleCategory;
            //     dispatch(articlesPageActions.setCategory(category));
            // }
            // if (categoryFromUrl && !categoryFromUrl?.includes('-')) {
            //     dispatch(articlesPageActions.setCategory(categoryFromUrl));
            // }

            const view = localStorage.getItem(
                ARTICLES_VIEW_LOCALSTORAGE_KEY,
            ) as ArticleView;

            dispatch(articlesPageActions.initState(view));

            const shouldFetchData = shouldDoActionForRedesignUi();

            if (shouldFetchData) {
                dispatch(fetchArticlesList({}));
            }
        }
    } catch (error) {
        console.error('Error in initArticlesPage:', error);
    }
});
