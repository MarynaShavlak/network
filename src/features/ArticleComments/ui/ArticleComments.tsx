import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { AddCommentForm, CommentList } from '@/entities/Comment';
import { VStack } from '@/shared/ui/common/Stack';

import { addCommentForArticleThunk } from '../model/services/addCommentForArticleThunk/addCommentForArticleThunk';

import { useCommentsByArticleId } from '../api/articleCommentsApi';

export interface ArticleCommentsProps {
    className?: string;
    id: string;
}

const ArticleComments = memo((props: ArticleCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation('articleDetails');

    const dispatch = useAppDispatch();
    const sectionTitleText = t('Коментарі');

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticleThunk({ text, articleId: id }));
        },
        [dispatch],
    );

    const {
        data: comments,
        isLoading: commentsIsLoading,
        error,
    } = useCommentsByArticleId(id);

    return (
        <VStack
            gap="16"
            max
            className={className}
            data-testid="article-comments"
        >
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text size="l" title={sectionTitleText} />}
                off={
                    <TextDeprecated
                        size={TextSize.L}
                        title={sectionTitleText}
                    />
                }
            />
            <AddCommentForm onSendComment={onSendComment} />
            <CommentList
                isLoading={commentsIsLoading}
                comments={comments}
                error={error as string}
            />
        </VStack>
    );
});

export default ArticleComments;
