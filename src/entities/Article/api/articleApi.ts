import {
    getDocs,
    limit,
    query,
    startAt,
    where,
    orderBy,
} from 'firebase/firestore';

import { firestoreApi } from '@/shared/api/rtkApi';
import { Article } from '../model/types/article';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import {
    ArticleCategory,
    ArticleSortField,
} from '../model/consts/articleConsts';
import { SortOrder } from '@/shared/types/sortOrder';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { fetchDocumentByRef } from '@/shared/lib/firestore/fetchDocumentByRef/fetchDocumentByRef';

export const articleFirebaseApi = firestoreApi.injectEndpoints({
    endpoints: (build) => ({
        getArticles: build.query<
            Article[],
            {
                sort?: ArticleSortField;
                order?: SortOrder;
                search?: string;
                category?: ArticleCategory;
                limit?: number;
                page?: number;
            }
        >({
            async queryFn({ sort, order, search, category, limit: max, page }) {
                try {
                    const articlesCollection = dataPoint<Article>('articles');
                    let queryRef = query(articlesCollection);

                    if (sort) {
                        queryRef = query(
                            queryRef,
                            orderBy(sort, order || 'asc'),
                        );
                    }

                    if (category && category !== ArticleCategory.ALL) {
                        queryRef = query(
                            queryRef,
                            where('category', 'array-contains', category),
                        );
                    }

                    if (max) {
                        queryRef = query(queryRef, limit(max));
                        if (page && page > 1) {
                            const skip = (page - 1) * max;
                            const snapshots = await getDocs(queryRef);
                            const lastVisible = snapshots.docs[skip - 1];
                            if (lastVisible) {
                                queryRef = query(
                                    queryRef,
                                    startAt(lastVisible),
                                );
                            }
                        }
                    }

                    const querySnapshot = await getDocs(queryRef);
                    const articles: Article[] = [];

                    if (!querySnapshot.empty) {
                        querySnapshot?.forEach((doc) => {
                            articles.push({ ...doc.data() });
                        });

                        return { data: articles };
                    }

                    return {
                        error: {
                            name: 'NotFound',
                            message: 'Articles not found',
                        },
                    };
                } catch (error) {
                    return { error };
                }
            },
        }),
        getArticleDataById: build.query<Article, string>({
            async queryFn(articleId) {
                try {
                    const articleDocRef = await getDocRefByField<Article>(
                        'articles',
                        'id',
                        articleId,
                    );

                    const articleData =
                        await fetchDocumentByRef<Article>(articleDocRef);
                    return { data: articleData };
                } catch (error) {
                    return { error };
                }
            },
        }),
    }),
});

// export const useArticles = articleApi.useGetArticlesQuery;
export const useArticles = articleFirebaseApi.useGetArticlesQuery;
export const getArticlesQuery =
    articleFirebaseApi.endpoints.getArticles.initiate;

export const getArticleDataByIdQuery =
    articleFirebaseApi.endpoints.getArticleDataById.initiate;
const useArticleDataById = articleFirebaseApi.useGetArticleDataByIdQuery;

// export const articleApi = rtkApi.injectEndpoints({
//     endpoints: (build) => ({
//         getArticles: build.query<Article[], null>({
//             query: () => ({
//                 url: '/articles',
//                 params: {
//                     _expand: 'user',
//                 },
//             }),
//         }),
//     }),
// });

// const filteredArticles = querySnapshot.docs
//     .map((doc) => doc.data())
//     .filter((article) => article.title.includes('DOM'));
// console.log('filteredArticles', filteredArticles);

// queryRef = query(
//     articlesCollection,
//     orderBy('views', 'asc'),
//     // limit(10),
// );

// ___________Category______________
// if (category && category !== ArticleCategory.ALL) {
//     queryRef = query(queryRef, where('category', '==', category));
// }
// __________________________________________________-

// queryRef = query(
//     queryRef,
//     where('category', 'array-contains', 'React'),
// );

// queryRef = query(
//     queryRef,
//     where('title', '<=', 'DOM'),
//     // where('title', '<=', `React`),
// );
