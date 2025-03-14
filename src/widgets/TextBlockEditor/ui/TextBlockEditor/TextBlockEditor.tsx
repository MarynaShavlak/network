import React, { memo, useMemo } from 'react';
import { ArticleSection, ArticleTextBlock } from '@/entities/Article';
import { useTextBlockState } from '../../lib/hooks/useTextBlockState/useTextBlockState';
import { useTextBlockOperations } from '../../lib/hooks/useTextBlockOperations/useTextBlockOperations';
import { TextBlockDisplay } from '../TextBlockDisplay/TextBlockDisplay';
import { useIsEditArticlePage } from '@/shared/lib/hooks/useIsEditArticlePage/useIsEditArticlePage';

export interface TextBlockEditorProps {
    block: ArticleTextBlock;
    addBlockInArticle: (block: ArticleTextBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleTextBlock) => void;
}

export const TextBlockEditor = memo((props: TextBlockEditorProps) => {
    const { addBlockInArticle, deleteBlockFromArticle, block, onEditBlock } =
        props;
    const initialTitle = block.title || '';
    const initialParagraphs = block.paragraphs || [];
    const isEmptyInfo = !initialTitle && initialParagraphs.length === 0;
    const isEditArticlePage = useIsEditArticlePage();

    const {
        title,
        handleTitleChange,
        editorState,
        paragraphs,
        onEditorStateChange,
        isEmptyContent: hasNoContent,
    } = useTextBlockState({
        initialTitle,
        initialParagraphs,
    });

    const {
        isEditModeActive,
        toggleEditMode,
        enterEditMode,

        handleSaveTextBlock,
        handleDeleteTextBlock,
    } = useTextBlockOperations({
        blockId: block.id,
        title: title || '',
        paragraphs,
        addBlockInArticle,
        deleteBlockFromArticle,
        onEditBlock,
    });

    const currentBlockData: ArticleTextBlock = useMemo(
        () =>
            isEditArticlePage
                ? block
                : {
                      id: block.id,
                      type: ArticleSection.TEXT,
                      paragraphs,
                      title: title || '',
                  },
        [block, isEditArticlePage, paragraphs, title],
    );

    const formProps = {
        title,
        editorState,
        hasNoContent,
        handleTitleChange,
        onEditorStateChange,
        onSave: handleSaveTextBlock,
    };

    const viewerProps = {
        editBlock: isEditArticlePage ? enterEditMode : toggleEditMode,
        block: currentBlockData,
    };

    return (
        <TextBlockDisplay
            isEditArticlePage={isEditArticlePage}
            isEditing={isEditModeActive}
            formProps={formProps}
            onDelete={handleDeleteTextBlock}
            viewerProps={viewerProps}
            isEmptyInfo={isEmptyInfo}
        />
    );
});
