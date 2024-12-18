import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { v4 } from 'uuid';
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
import { Article, ArticleTextBlock } from '@/entities/Article';
import { TextBlockEditor } from '../TextBlockEditor/TextBlockEditor';

interface ArticleCreatePageProps {
    className?: string;
}

const reducers: ReducersList = {
    createArticle: createArticleReducer,
};

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props;
    const { t } = useTranslation('articleDetails');
    // const validConfig = useInputValidationConfig();
    const [textBlocks, setTextBlocks] = useState<Array<{ id: string }>>([]);
    const [allBlocks, setAllBlocks] = useState<Article['blocks']>([]);
    // const [value, setValue] = useState('');
    // console.log('textBlocks', textBlocks);
    console.log('allBlocks', allBlocks);
    // const { isVisible: isTextBlockAdded, showElement: showTextBlock } =
    //     useToggleVisibility();

    const onAddTextBlockBtnClick = useCallback(() => {
        setTextBlocks((prev) => [...prev, { id: v4() }]);
    }, []);

    // const { formData } = useCreateArticle();

    const addBlockInArticle = useCallback((newBlock: ArticleTextBlock) => {
        // console.log('ArticleBlock', newBlock);
        setAllBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    }, []);

    const updateBlockInArticle = useCallback(
        (updatedBlock: ArticleTextBlock) => {
            setAllBlocks((prevBlocks) =>
                prevBlocks.map((block) =>
                    block.id === updatedBlock.id ? updatedBlock : block,
                ),
            );
        },
        [],
    );

    const onDeleteTextBlock = useCallback((id: string) => {
        setTextBlocks((prev) => prev.filter((block) => block.id !== id));
        setAllBlocks((prevBlocks) =>
            prevBlocks.filter((block) => block.id !== id),
        );
    }, []);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
                <VStack gap="24">
                    <Text title={t('Створення нової статті')} size="l" />
                    <TitleSubtitleForm />
                    <AddCategoryForm />
                    <HStack gap="16" align="start" max>
                        <OrderCard index={4} />
                        <VStack gap="16">
                            <Text text={t('Блоки статті')} bold />
                            <AddArticleBlocksButtons
                                onAddTextBlockBtnClick={onAddTextBlockBtnClick}
                            />
                            {textBlocks.map((block) => (
                                <TextBlockEditor
                                    key={block.id}
                                    blockId={block.id}
                                    addBlockInArticle={addBlockInArticle}
                                    onDeleteTextBlock={onDeleteTextBlock}
                                    onEditBlock={updateBlockInArticle}
                                />
                            ))}
                        </VStack>
                    </HStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticleCreatePage;
