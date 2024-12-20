import { useCallback } from 'react';
import { ArticleSection, ArticleTextBlock } from '@/entities/Article';

export const useTextBlockActions = (
    blockId: string,
    title: string,
    paragraphs: string[],
    addBlockInArticle: (block: ArticleTextBlock) => void,
    onEditBlock?: (block: ArticleTextBlock) => void,
    onDeleteTextBlock?: (id: string) => void,
) => {
    const saveBlock = useCallback(() => {
        const updatedTextBlock: ArticleTextBlock = {
            id: blockId,
            type: ArticleSection.TEXT,
            paragraphs,
            title,
        };

        if (onEditBlock) {
            onEditBlock(updatedTextBlock);
        } else {
            addBlockInArticle(updatedTextBlock);
        }
    }, [addBlockInArticle, blockId, onEditBlock, paragraphs, title]);

    const deleteBlock = useCallback(() => {
        if (onDeleteTextBlock) {
            onDeleteTextBlock(blockId);
        }
    }, [onDeleteTextBlock, blockId]);

    return { saveTextBlock: saveBlock, deleteTextBlock: deleteBlock };
};
