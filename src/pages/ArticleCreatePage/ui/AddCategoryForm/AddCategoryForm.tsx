import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from '@/shared/ui/redesigned/Tabs';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleCategory } from '@/entities/Article';
import { useCreateArticle } from '../../lib/hooks/useCreateArticle/useCreateArticle';
import { useCategoryTabs } from '@/features/ArticleCategoryTabs';

interface AddCategoryFormProps {
    index: number;
}

export const AddCategoryForm = (props: AddCategoryFormProps) => {
    const { t } = useTranslation('articleDetails');
    const { index } = props;
    const { formData, onChangeCategory } = useCreateArticle();
    const rawCategoryTabs = useCategoryTabs();
    const categoryTabs = useMemo(() => rawCategoryTabs, [rawCategoryTabs]);
    return (
        <HStack gap="16" align="start" max>
            <OrderCard index={index} />
            <VStack gap="16">
                <Text text={t('Категорії статей')} bold />
                <Tabs
                    tabs={categoryTabs}
                    value={formData?.category as ArticleCategory[]}
                    onTabClick={(tab) => {
                        onChangeCategory(tab.value);
                    }}
                />
            </VStack>
        </HStack>
    );
};
