import React, { memo } from 'react';

import { ArticleCodeBlock, ArticleSection } from '@/entities/Article';
import { useCodeBlockState } from '../../lib/hooks/useCodeBlockState/useCodeBlockState';

import { useCodeBlockOperations } from '../../lib/hooks/useCodeBlockOperations/useCodeBlockOperations';
import { CodeBlockDisplay } from '../CodeBlockDisplay/CodeBlockDisplay';

export interface CodeBlockEditorProps {
    block: ArticleCodeBlock;
    addBlockInArticle: (block: ArticleCodeBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleCodeBlock) => void;
}

export const CodeBlockEditor = memo((props: CodeBlockEditorProps) => {
    const { addBlockInArticle, deleteBlockFromArticle, block, onEditBlock } =
        props;

    const initialTitle = block.title || '';
    const initialCode = block.code || '';
    const isEditArticlePage = Boolean(initialTitle && initialCode);

    const {
        title,
        handleTitleChange,
        code,
        handleCodeChange,
        isEmptyContent: hasNoContent,
    } = useCodeBlockState({
        initialTitle,
        initialCode,
    });

    const {
        isEditModeActive,
        toggleEditMode,
        activateEditMode,
        handleSaveCodeBlock,
        handleDeleteCodeBlock,
    } = useCodeBlockOperations({
        blockId: block.id,
        title,
        code,
        addBlockInArticle,
        deleteBlockFromArticle,
        onEditBlock,
    });

    const currentBlockData: ArticleCodeBlock = isEditArticlePage
        ? block
        : {
              id: block.id,
              type: ArticleSection.CODE,
              code,
              title,
          };

    const formProps = {
        title,
        handleTitleChange,
        code,
        onCodeChange: handleCodeChange,
        hasNoContent,
        onSave: handleSaveCodeBlock,
    };

    const viewerProps = {
        editBlock: isEditArticlePage ? activateEditMode : toggleEditMode,
        block: currentBlockData,
    };

    return (
        <CodeBlockDisplay
            isEditArticlePage={isEditArticlePage}
            isEditing={isEditModeActive}
            formProps={formProps}
            onDelete={handleDeleteCodeBlock}
            viewerProps={viewerProps}
        />
    );
});
