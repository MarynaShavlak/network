export {};

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ThunkConfig } from '@/app/providers/StoreProvider';
// import { Article, ArticleCategory } from '@/entities/Article';
// import {
//     getArticlesPageLimit,
//     getArticlesPageNum,
//     getArticlesPageOrder,
//     getArticlesPageSearch,
//     getArticlesPageSort,
//     getArticlesPageCategory,
// } from '../../selectors/articlesPageSelectors';
//
// interface FetchArticlesListProps {
//     replace?: boolean;
// }
//
// /**
//  * Thunk to fetch a list of articles based on current page settings and filters.
//  *
//  * This thunk performs an API call to retrieve articles with parameters based on the current
//  * settings in the Redux store. It handles scenarios where the API response is invalid or
//  * if an error occurs during the API call. If the API call fails or returns an error, it
//  * handles the error appropriately.
//  *
//  * @param {FetchArticlesListProps} props - Optional properties to customize the request.
//  *        - `replace` (boolean) - If true, it replaces the existing articles list.
//  * @param {ThunkAPI} thunkAPI - The thunkAPI object provided by Redux Toolkit, containing
//  *        dispatch, getState, extra, and more.
//  * @returns {Promise<Article[]>} A promise that resolves to an array of articles or
//  *        rejects with an error message.
//  */
//
// export const fetchArticlesList = createAsyncThunk<
//     Article[],
//     FetchArticlesListProps,
//     ThunkConfig<string>
// >('articlesPage/fetchArticlesList', async (props, thunkApi) => {
//     const { extra, rejectWithValue, getState, dispatch } = thunkApi;
//     const limit = getArticlesPageLimit(getState());
//     // console.log('Articles Page Limit:', limit);
//
//     const sort = getArticlesPageSort(getState());
//     // console.log('Articles Page Sort:', sort);
//
//     const order = getArticlesPageOrder(getState());
//     // console.log('Articles Page Order:', order);
//
//     const search = getArticlesPageSearch(getState());
//     // console.log('Articles Page Search:', search);
//
//     const page = getArticlesPageNum(getState());
//     // console.log('Articles Page Number:', page);
//
//     const category = getArticlesPageCategory(getState());
//     // console.log('Articles Page Category:', category);
//
//     try {
//         // addQueryParams({
//         //     sort,
//         //     order,
//         //     search,
//         //     category,
//         // });
//         const objectsLimit =
//             category === ArticleCategory.ALL ? limit : undefined;
//         const pageLimit = category === ArticleCategory.ALL ? page : undefined;
//         // console.log('objectsLimit', objectsLimit);
//         // console.log('page', page);
//         // console.log('pageLimit', pageLimit);
//
//         // const articlesResponse = await dispatch(
//         //     getArticlesQuery({
//         //         // sort: ArticleSortField.CREATED_DESC,
//         //         order,
//         //         search,
//         //         category:
//         //             category === ArticleCategory.ALL ? undefined : category,
//         //         limit,
//         //         page,
//         //     }),
//         // ).unwrap();
//
//         // console.log('firebase articles response', articlesResponse);
//
//         // return articlesResponse;
//         return null;
//     } catch (error) {
//         console.error('Error fetching articles list:', error);
//         return rejectWithValue('Failed to fetch articles.');
//     }
// });
