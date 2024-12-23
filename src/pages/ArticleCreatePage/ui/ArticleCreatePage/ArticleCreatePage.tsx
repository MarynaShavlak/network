import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './ArticleCreatePage.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { createArticleReducer } from '../../model/slices/createArticleSlice';
import { TitleSubtitleForm } from '../TitleSubtitleForm/TitleSubtitleForm';
import { AddCategoryForm } from '../AddCategoryForm/AddCategoryForm';
import { AddArticleBlocksButtons } from '../AddArticleBlocksButtons/AddArticleBlocksButtons';
import { TextBlockEditor } from '../TextBlockEditor/TextBlockEditor';
import { useArticleBlocks } from '../../lib/hooks/useArticleBlocks/useArticleBlocks';
import { Each } from '@/shared/lib/components/Each/Each';
import { CodeBlockEditor } from '../CodeBlockEditor/CodeBlockEditor';
import { ArticleSection } from '@/entities/Article';

interface ArticleCreatePageProps {
    className?: string;
}

const reducers: ReducersList = {
    createArticle: createArticleReducer,
};

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props;
    const { t } = useTranslation('articleDetails');
    const {
        blocks: allBlocks,
        createEmptyTextBlock,
        createEmptyCodeBlock,
        addBlock,
        updateBlock,
        deleteBlock,
    } = useArticleBlocks();
    // const [allBlocks, setAllBlocks] = useState<Article['blocks']>([]);
    console.log('allBlocks', allBlocks);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(cls.ArticleCreatePage, {}, [className])}
            >
                <VStack gap="24">
                    <Text title={t('Створення нової статті')} size="l" />
                    <TitleSubtitleForm />
                    <AddCategoryForm />
                    <HStack gap="16" align="start" max>
                        <OrderCard index={4} />
                        <VStack gap="16">
                            <Text text={t('Блоки статті')} bold />
                            <AddArticleBlocksButtons
                                onAddTextBlockBtnClick={createEmptyTextBlock}
                                onAddCodeBlockBtnClick={createEmptyCodeBlock}
                            />

                            <Each
                                of={allBlocks}
                                render={(block, index) => {
                                    const blockType = block.type;
                                    if (blockType === ArticleSection.TEXT) {
                                        return (
                                            <TextBlockEditor
                                                key={block.id}
                                                blockId={block.id}
                                                addBlockInArticle={addBlock}
                                                onDeleteTextBlock={deleteBlock}
                                                onEditBlock={updateBlock}
                                            />
                                        );
                                    }
                                    if (blockType === ArticleSection.CODE) {
                                        return (
                                            <CodeBlockEditor
                                                key={block.id}
                                                blockId={block.id}
                                                addBlockInArticle={addBlock}
                                                onDeleteTextBlock={deleteBlock}
                                                onEditBlock={updateBlock}
                                            />
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </VStack>
                    </HStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticleCreatePage;
