import { articleCommentsReducer } from './articleCommentsSlice';
import { ArticleCommentsSchema } from '../types/ArticleCommentsSchema';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { testCommentsData } from '@/entities/Comment/testing';
import { Comment } from '@/entities/Comment';

describe('articleCommentsSlice tests', () => {
    const initialState: ArticleCommentsSchema = {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    };

    test('should return the initial state', () => {
        expect(articleCommentsReducer(undefined, { type: '' })).toEqual(
            initialState,
        );
    });

    test('should handle fetchCommentsByArticleId.pending', () => {
        const expectedState: ArticleCommentsSchema = {
            ...initialState,
            isLoading: true,
            error: undefined,
        };

        expect(
            articleCommentsReducer(
                initialState,
                fetchCommentsByArticleId.pending,
            ),
        ).toEqual(expectedState);
    });

    test('should handle fetchCommentsByArticleId.fulfilled', () => {
        const comments: Comment[] = testCommentsData;

        const expectedState: ArticleCommentsSchema = {
            isLoading: false,
            error: undefined,
            ids: ['1', '2'],
            entities: {
                '1': comments[0],
                '2': comments[1],
            },
        };

        expect(
            articleCommentsReducer(
                initialState,
                fetchCommentsByArticleId.fulfilled(comments, '123', ''),
            ),
        ).toEqual(expectedState);
    });

    test('should handle fetchCommentsByArticleId.rejected', () => {
        const error = 'Failed to fetch comments';
        const expectedState: ArticleCommentsSchema = {
            ...initialState,
            isLoading: false,
            error,
        };

        expect(
            articleCommentsReducer(
                initialState,
                fetchCommentsByArticleId.rejected(
                    new Error(error),
                    '',
                    undefined,
                    error,
                ),
            ),
        ).toEqual(expectedState);
    });

    test('should handle fetchCommentsByArticleId.fulfilled with empty array', () => {
        const comments: Comment[] = [];

        const expectedState: ArticleCommentsSchema = {
            isLoading: false,
            error: undefined,
            ids: [],
            entities: {},
        };

        expect(
            articleCommentsReducer(
                initialState,
                fetchCommentsByArticleId.fulfilled(comments, '123', ''),
            ),
        ).toEqual(expectedState);
    });

    test('should handle fetchCommentsByArticleId.fulfilled with duplicate comments', () => {
        const comments: Comment[] = [
            { ...testCommentsData[0] },
            { ...testCommentsData[0] },
        ];

        const expectedState: ArticleCommentsSchema = {
            isLoading: false,
            error: undefined,
            ids: ['1'],
            entities: {
                '1': comments[0],
            },
        };

        expect(
            articleCommentsReducer(
                initialState,
                fetchCommentsByArticleId.fulfilled(comments, '123', ''),
            ),
        ).toEqual(expectedState);
    });
});
