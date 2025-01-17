// __________________________
import { EntityState } from '@reduxjs/toolkit';
import { getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { algoliasearch } from 'algoliasearch';
import { firestoreApi } from '@/shared/api/rtkApi';
import { Article } from '../model/types/article';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { articlesAdapter, initialState } from '../model/slices/articleSlice';
import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
import { deleteDocFromFirestore } from '@/shared/lib/firestore/deleteDocFromFirestore/deleteDocFromFirestore';
import { fetchDocumentByRef } from '@/shared/lib/firestore/fetchDocumentByRef/fetchDocumentByRef';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';

const writeClient = algoliasearch(
    '6L3XOJ5FZ8',
    'b6d387ae3f217cffac3f075dbdbb46d2',
);

export const articleFirebaseApi = firestoreApi
    .enhanceEndpoints({
        addTagTypes: ['Articles'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getArticles: build.query<EntityState<Article>, void>({
                providesTags: ['Articles'],
                async queryFn() {
                    try {
                        const collectionRef = dataPoint<Article>('articles');
                        const snapshot = await getDocs(collectionRef);

                        const articles = snapshot.docs.map((doc) => ({
                            ...doc.data(),
                            id: doc.id,
                        })) as Article[];

                        return {
                            data: articlesAdapter.setAll(
                                articlesAdapter.getInitialState(),
                                articles,
                            ),
                        };
                    } catch (error) {
                        return { error: error as unknown };
                    }
                },
            }),
            getArticleDataById: build.query<Article, string>({
                // providesTags: (result, error, articleId) => [
                //     { type: 'Articles', id: articleId },
                // ],
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
                        console.error('Error fetching article data:', error);
                        return { error: { message: 'Article not found' } };
                    }
                },
                async onCacheEntryAdded(
                    articleId,
                    { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
                ) {
                    await cacheDataLoaded;
                    let unsubscribe;
                    try {
                        const articleDocRef = await getDocRefByField<Article>(
                            'articles',
                            'id',
                            articleId,
                        );

                        unsubscribe = articleDocRef
                            ? onSnapshot(articleDocRef, (doc) => {
                                  if (doc.exists()) {
                                      updateCachedData(
                                          () => doc.data() as Article,
                                      );
                                  } else {
                                      console.log(
                                          'Article not found in snapshot',
                                      );
                                  }
                              })
                            : null;
                    } catch (error) {
                        console.error('Error in article data snapshot:', error);
                    }

                    await cacheEntryRemoved;
                    if (unsubscribe) {
                        unsubscribe();
                    }
                },
            }),
            addArticle: build.mutation<Article, Article>({
                invalidatesTags: ['Articles'],
                async queryFn(newArticle) {
                    try {
                        const docRef = await addDocToFirestore<Article>(
                            'articles',
                            newArticle,
                        );

                        const createdDocSnapshot = await getDoc(docRef);

                        if (!createdDocSnapshot.exists()) {
                            throw new Error(
                                'Failed to retrieve created article.',
                            );
                        }
                        return {
                            data: createdDocSnapshot.data() as Article,
                        };
                    } catch (error) {
                        return { error };
                    }
                },
            }),
            deleteArticle: build.mutation<string, Article>({
                invalidatesTags: ['Articles'],
                async queryFn(articleToDelete) {
                    try {
                        await deleteDocFromFirestore<Article>(
                            'articles',
                            articleToDelete,
                        );
                        return { data: articleToDelete.id };
                    } catch (error) {
                        return { error };
                    }
                },
            }),
            updateArticle: build.mutation<
                Article,
                { articleId: string; updates: Partial<Article> }
            >({
                invalidatesTags: ['Articles'],
                async queryFn({ articleId, updates }) {
                    try {
                        const articleDocRef = await getDocRefByField<Article>(
                            'articles',
                            'id',
                            articleId,
                        );

                        if (articleDocRef) {
                            await updateDoc(articleDocRef, updates);
                            const updatedDoc = await getDoc(articleDocRef);
                            const updatedData = updatedDoc.data();

                            if (updatedData) {
                                return {
                                    data: { ...updatedData } as Article,
                                };
                            }
                        }

                        return {
                            error: {
                                name: 'NotFound',
                                message: 'Article not found',
                            },
                        };
                    } catch (error) {
                        console.error('Error updating article:', error);
                        return { error };
                    }
                },
            }),
        }),
    });

export const getArticleDataByIdQuery =
    articleFirebaseApi.endpoints.getArticleDataById.initiate;
export const useArticleDataById = articleFirebaseApi.useGetArticleDataByIdQuery;

export const useGetArticles = articleFirebaseApi.useGetArticlesQuery;
export const getArticlesQuery =
    articleFirebaseApi.endpoints.getArticles.initiate;

export const addArticleMutation =
    articleFirebaseApi.endpoints.addArticle.initiate;

export const deleteArticleMutation =
    articleFirebaseApi.endpoints.deleteArticle.initiate;
export const updateArticleMutation =
    articleFirebaseApi.endpoints.updateArticle.initiate;

type RootState = {
    [articleFirebaseApi.reducerPath]: ReturnType<
        typeof articleFirebaseApi.reducer
    >;
};

export const selectEntryResult = (state: RootState) =>
    articleFirebaseApi.endpoints.getArticles.select()(state).data;

const entrySelectors = articlesAdapter.getSelectors(
    (state: RootState) => selectEntryResult(state) ?? initialState,
);
export const selectAllArticles = entrySelectors.selectAll;

// import { EntityState } from '@reduxjs/toolkit';
// import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
// import { getDoc, getDocs, onSnapshot, query } from 'firebase/firestore';
// import { algoliasearch } from 'algoliasearch';
// import { firestoreApi } from '@/shared/api/rtkApi';
// import { Article } from '../model/types/article';
//
// import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
// import { fetchDocumentByRef } from '@/shared/lib/firestore/fetchDocumentByRef/fetchDocumentByRef';
//
// import { dataPoint } from '@/shared/lib/firestore/firestore';
// import { articlesAdapter, initialState } from '../model/slices/articleSlice';
// import { addDocToFirestore } from '@/shared/lib/firestore/addDocToFirestore/addDocToFirestore';
// import { deleteDocFromFirestore } from '@/shared/lib/firestore/deleteDocFromFirestore/deleteDocFromFirestore';
//
// const writeClient = algoliasearch(
//     '6L3XOJ5FZ8',
//     'b6d387ae3f217cffac3f075dbdbb46d2',
// );
//
// export const articleFirebaseApi = firestoreApi
//     .enhanceEndpoints({
//         addTagTypes: ['Articles'],
//     })
//
//     .injectEndpoints({
//         endpoints: (build) => ({
//             getArticles: build.query<EntityState<Article>, void>({
//                 providesTags: ['Articles'],
//                 async queryFn(): Promise<
//                     QueryReturnValue<EntityState<Article>, unknown, unknown>
//                 > {
//                     // try {
//                     //     const initialData: EntityState<Article> =
//                     //         articlesAdapter.getInitialState();
//                     //     return { data: initialData };
//                     // } catch (error) {
//                     //     return { error: error as unknown };
//                     // }
//                     try {
//                         const collectionRef = dataPoint<Article>('articles');
//                         const queryRef = query(collectionRef);
//                         const snapshot = await getDocs(queryRef);
//
//                         const articles = snapshot.docs.map((doc) => doc.data());
//                         const initialData = articlesAdapter.setAll(
//                             articlesAdapter.getInitialState(),
//                             articles,
//                         );
//
//                         return { data: initialData };
//                     } catch (error) {
//                         return { error: error as unknown };
//                     }
//                 },
//                 async onCacheEntryAdded(
//                     _,
//                     { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
//                 ) {
//                     await cacheDataLoaded;
//                     let unsubscribe;
//                     try {
//                         const collectionRef = dataPoint<Article>('articles');
//                         const queryRef = query(collectionRef);
//                         unsubscribe = onSnapshot(queryRef, (snapshot) => {
//                             updateCachedData((draft) => {
//                                 articlesAdapter.setAll(
//                                     draft,
//                                     snapshot.docs.map((doc) => doc.data()),
//                                 );
//                             });
//                         });
//                     } catch (error) {
//                         console.log('error in articles!', error);
//                         throw new Error('Something went wrong with articles.');
//                     }
//                     await cacheEntryRemoved;
//                     if (unsubscribe) {
//                         unsubscribe();
//                     }
//                 },
//             }),
//             getArticleDataById: build.query<Article, string>({
//                 // providesTags: (result, error, articleId) => [
//                 //     { type: 'Articles', id: articleId },
//                 // ],
//                 async queryFn(articleId) {
//                     try {
//                         const articleDocRef = await getDocRefByField<Article>(
//                             'articles',
//                             'id',
//                             articleId,
//                         );
//
//                         const articleData =
//                             await fetchDocumentByRef<Article>(articleDocRef);
//                         return { data: articleData };
//                     } catch (error) {
//                         console.error('Error fetching article data:', error);
//                         return { error: { message: 'Article not found' } };
//                     }
//                 },
//                 async onCacheEntryAdded(
//                     articleId,
//                     { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
//                 ) {
//                     await cacheDataLoaded;
//                     let unsubscribe;
//                     try {
//                         const articleDocRef = await getDocRefByField<Article>(
//                             'articles',
//                             'id',
//                             articleId,
//                         );
//
//                         unsubscribe = articleDocRef
//                             ? onSnapshot(articleDocRef, (doc) => {
//                                   if (doc.exists()) {
//                                       updateCachedData(
//                                           () => doc.data() as Article,
//                                       );
//                                   } else {
//                                       console.log(
//                                           'Article not found in snapshot',
//                                       );
//                                   }
//                               })
//                             : null;
//                     } catch (error) {
//                         console.error('Error in article data snapshot:', error);
//                     }
//
//                     await cacheEntryRemoved;
//                     if (unsubscribe) {
//                         unsubscribe();
//                     }
//                 },
//             }),
//             addArticle: build.mutation<Article, Article>({
//                 invalidatesTags: ['Articles'],
//                 async queryFn(newArticle) {
//                     try {
//                         const docRef = await addDocToFirestore<Article>(
//                             'articles',
//                             newArticle,
//                         );
//
//                         const createdDocSnapshot = await getDoc(docRef);
//
//                         if (!createdDocSnapshot.exists()) {
//                             throw new Error(
//                                 'Failed to retrieve created article.',
//                             );
//                         }
//                         await writeClient.saveObject({
//                             indexName: 'articles',
//                             body: { ...newArticle },
//                         });
//                         return {
//                             data: {
//                                 ...createdDocSnapshot.data(),
//                             } as Article,
//                         };
//                     } catch (error) {
//                         console.error('Error adding new article:', error);
//                         return { error };
//                     }
//                 },
//             }),
//             deleteArticle: build.mutation<void, Article>({
//                 invalidatesTags: ['Articles'],
//                 async queryFn(articleToDelete) {
//                     try {
//                         await deleteDocFromFirestore<Article>(
//                             'articles',
//                             articleToDelete,
//                         );
//                         return { data: undefined }; // Return an empty response to signify success
//                     } catch (error) {
//                         console.error(
//                             `Error deleting article with id "${articleToDelete.id}":`,
//                             error,
//                         );
//                         return { error };
//                     }
//                 },
//             }),
//         }),
//     });
//
// export const getArticleDataByIdQuery =
//     articleFirebaseApi.endpoints.getArticleDataById.initiate;
// export const useArticleDataById = articleFirebaseApi.useGetArticleDataByIdQuery;
//
// export const useGetArticles = articleFirebaseApi.useGetArticlesQuery;
// export const getArticlesQuery =
//     articleFirebaseApi.endpoints.getArticles.initiate;
//
// export const addArticleMutation =
//     articleFirebaseApi.endpoints.addArticle.initiate;
//
// export const deleteArticleMutation =
//     articleFirebaseApi.endpoints.deleteArticle.initiate;
//
// type RootState = {
//     [articleFirebaseApi.reducerPath]: ReturnType<
//         typeof articleFirebaseApi.reducer
//     >;
// };
//
// export const selectEntryResult = (state: RootState) =>
//     articleFirebaseApi.endpoints.getArticles.select()(state).data;
//
// const entrySelectors = articlesAdapter.getSelectors(
//     (state: RootState) => selectEntryResult(state) ?? initialState,
// );
// export const selectAllArticles = entrySelectors.selectAll;
//
// // ____________________________________________
// // getArticleDataById: build.query<Article, string>({
// //     async queryFn(articleId) {
// //         try {
// //             const articleDocRef = await getDocRefByField<Article>(
// //                 'articles',
// //                 'id',
// //                 articleId,
// //             );
// //
// //             const articleData =
// //                 await fetchDocumentByRef<Article>(articleDocRef);
// //             return { data: articleData };
// //         } catch (error) {
// //             return { error };
// //         }
// //     },
// // }),
