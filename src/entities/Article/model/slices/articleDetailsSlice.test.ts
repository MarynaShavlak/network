import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { articleDetailsReducer } from './articleDetailsSlice';
import { testArticleData } from '../../testing';

describe('articleDetailsSlice tests', () => {
    const initialState: ArticleDetailsSchema = {
        isLoading: false,
        error: undefined,
        data: undefined,
    };

    test('should return the initial state', () => {
        expect(articleDetailsReducer(undefined, { type: '' })).toEqual(
            initialState,
        );
    });

    test('should handle fetchArticleById.pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: false,
            error: 'Some error',
        };

        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.pending,
            ),
        ).toEqual({
            isLoading: true,
            error: undefined,
        });
    });

    test('should handle fetchArticleById.fulfilled with data', () => {
        const state: DeepPartial<ArticleDetailsSchema> = { isLoading: true };

        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.fulfilled(testArticleData, 'requestId', ''),
            ),
        ).toEqual({
            isLoading: false,
            data: testArticleData,
            error: undefined,
        });
    });

    test('should handle fetchArticleById.fulfilled with no data', () => {
        const state: DeepPartial<ArticleDetailsSchema> = { isLoading: true };

        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.fulfilled(null as any, 'requestId', ''),
            ),
        ).toEqual({
            isLoading: false,
            data: null,
        });
    });

    test('should handle fetchArticleById.rejected with specific error message', () => {
        const state: DeepPartial<ArticleDetailsSchema> = { isLoading: true };

        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.rejected(
                    new Error('Fetch failed'),
                    '',
                    undefined,
                    'Fetch failed',
                ),
            ),
        ).toEqual({
            isLoading: false,
            error: 'Fetch failed',
            data: undefined,
        });
    });
});
