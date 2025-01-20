import React, { memo } from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { ArticleEditorPageHeader } from '../ArticleEditorPageHeader/ArticleEditorPageHeader';
import { useArticleEditor } from '../../lib/hooks/useArticleEditor/useArticleEditor';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { SaveArticleError } from '../SaveArticleError/SaveArticleError';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { createArticleReducer } from '../../model/slices/createArticleSlice';
import { ArticleEditorPageContent } from '../ArticleEditorPageContent/ArticleEditorPageContent';

const reducers: ReducersList = {
    createArticle: createArticleReducer,
};

export const ArticleEditorPageContainer = memo(() => {
    const {
        metadata,
        validation,
        heroImage,
        formActions: { onSave, onClear, onCancelChanges, onDelete, onUpdate },
        blockActions,
    } = useArticleEditor();
    const { isEditArticlePage, saveError, isLoading } = metadata;

    if (isLoading) {
        return <Skeleton width="100%" height="100vh" border="40px" />;
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap="24" max>
                <ArticleEditorPageHeader
                    hasErrors={validation.hasInputErrors}
                    onActions={{
                        clear: onClear,
                        save: onSave,
                        cancel: onCancelChanges,
                        delete: onDelete,
                        update: onUpdate,
                    }}
                    isEditArticlePage={isEditArticlePage}
                    isLoading={isLoading}
                />
                <ArticleEditorPageContent
                    blockActions={blockActions}
                    metadata={metadata}
                    validation={validation}
                    heroImage={heroImage}
                />

                {saveError && <SaveArticleError />}
            </VStack>
        </DynamicModuleLoader>
    );
});