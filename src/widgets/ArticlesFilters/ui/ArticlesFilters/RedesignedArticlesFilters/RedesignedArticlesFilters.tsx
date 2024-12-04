import { useTranslation } from 'react-i18next';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import React, { useState } from 'react';
import {
    ClearRefinements,
    MenuProps,
    RefinementList,
    SearchBox,
} from 'react-instantsearch';

import { InstantSearch, Configure } from 'react-instantsearch-core';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticlesFiltersProps } from '../ArticlesFilters';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/common/Stack';
import SearchIcon from '@/shared/assets/icons/search.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';

const searchClient = algoliasearch(
    '6L3XOJ5FZ8',
    '5fac3ea964aecac5d90374450bd541ab',
);

const transformItems: MenuProps['transformItems'] = (items) => {
    // return items.map((item) => ({
    //     ...item,
    //     label: `${item.label} `,
    // }));
    // console.log('items in transform', items);
    return [
        // {
        //     label: 'All items',
        //     value: '',
        //     count: items.reduce((total, item) => total + item.count, 0),
        //     isRefined: items.every((item) => !item.isRefined),
        // },
        ...items.map((item) => ({
            ...item,
            label: `${item.label}`,
        })),
    ];
};

export const RedesignedArticlesFilters = (props: ArticlesFiltersProps) => {
    const {
        className,
        onChangeCategory,
        onChangeSearch,
        search,
        onChangeSort,
        sort,
        onChangeOrder,
        order,
        category,
    } = props;
    const { t } = useTranslation();

    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    const allCategories = [
        { label: 'React', value: 'React' },
        { label: 'HTML', value: 'HTML' },
        { label: 'CSS', value: 'CSS' },
        { label: 'IT', value: 'IT' },
        { label: 'TypeScript', value: 'TypeScript' },
        { label: 'JavaScript', value: 'JavaScript' },
    ];

    console.log('sorttttt:', sort);
    return (
        <Card
            className={classNames(cls.ArticlesFilters, {}, [className])}
            padding="24"
        >
            <VStack gap="32">
                <InstantSearch
                    searchClient={searchClient}
                    indexName={sort}
                    future={{ preserveSharedStateOnUnmount: false }}
                >
                    <Configure
                        filters={
                            selectedCategory
                                ? `category:"${selectedCategory}"`
                                : ''
                        }
                        hitsPerPage={200}
                    />
                    <SearchBox
                        // onChange={onChangeSearch}
                        // value={search}
                        placeholder={t('Пошук')}
                        resetIconComponent={() => (
                            <Icon Svg={CloseIcon} className={cls.ResetIcon} />
                        )}
                        submitIconComponent={() => <Icon Svg={SearchIcon} />}
                        data-testid="ArticlesPage.SearchInput"
                        classNames={{
                            submit: cls.SubmitSearchBtn,
                            reset: cls.ResetSearchBtn,
                            form: cls.SubmitInputWrapper,
                            input: cls.SearchInput,
                        }}
                    />

                    <VStack gap="8">
                        <ClearRefinements
                            translations={{
                                resetButtonText: t('Вcі статті'),
                            }}
                            classNames={{
                                button: cls.AllItemsBtn,
                                disabledButton: cls.AllItemsBtnNotSelected,
                            }}
                        />

                        <RefinementList
                            attribute="category"
                            // transformItems={(items) =>
                            //     items.sort((a, b) =>
                            //         a.label.localeCompare(b.label),
                            //     )
                            // }
                            transformItems={(items) => {
                                const mergedItems = allCategories.map(
                                    (category) => {
                                        const matchingItem = items.find(
                                            (item) =>
                                                item.label === category.label,
                                        );
                                        return (
                                            matchingItem || {
                                                ...category,
                                                count: 0,
                                                isRefined: false,
                                            }
                                        );
                                    },
                                );
                                return mergedItems;
                            }}
                            classNames={{
                                count: cls.categoryCount,
                                list: cls.MenuList,
                                label: cls.MenuLabel,
                                item: cls.MenuItem,
                                selectedItem: cls.SelectedMenuItem,
                                checkbox: cls.MenuCheckbox,
                            }}
                        />
                    </VStack>
                    <ArticleSortSelector
                        order={order}
                        sort={sort}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                </InstantSearch>
            </VStack>
        </Card>
    );
};

{
    /* <Input */
}
{
    /*    onChange={onChangeSearch} */
}
{
    /*    value={search} */
}
{
    /*    placeholder={t('Пошук')} */
}
{
    /*    addonLeft={<Icon Svg={SearchIcon} />} */
}
{
    /*    data-testid="ArticlesPage.SearchInput" */
}
{
    /* /> */
}
{
    /* <ArticleCategoryTabs */
}
{
    /*    value={category} */
}
{
    /*    onChangeCategory={onChangeCategory} */
}
{
    /*    className={cls.tabs} */
}
{
    /* /> */
}
{
    /* <ArticleSortSelector */
}
{
    /*    order={order} */
}
{
    /*    sort={sort} */
}
{
    /*    onChangeOrder={toggleOrder} */
}
{
    /*    onChangeSort={onChangeSort} */
}
{
    /* /> */
}

// const AlgoliaSearch = ({ order }: AlgoliaSearchProps) => {
//     const { t } = useTranslation();
//     const [selectedCategory, setSelectedCategory] = useState<string | null>(
//         null,
//     );
//
//     const handleCategoryChange = (category: string) => {
//         // Update selected category; 'null' or empty string for "All items"
//         setSelectedCategory(category);
//     };
//     const getSortItems = (order: SortOrder) => {
//         if (order === 'asc') {
//             return [
//                 { label: 'Views (asc)', value: 'articles_views_asc' },
//                 {
//                     label: 'Creation date (asc)',
//                     value: 'articles_createdAt_asc',
//                 },
//                 { label: 'Title (asc)', value: 'articles_title_asc' },
//             ];
//         }
//         return [
//             { label: 'Views (desc)', value: 'articles_views_desc' },
//             {
//                 label: 'Creation date (desc)',
//                 value: 'articles_createdAt_desc',
//             },
//
//             { label: 'Title (desc)', value: 'articles_title_desc' },
//         ];
//     };
//
//     const items = getSortItems(order);
//     console.log('itesm', items);
//
//     const sortByApi = useSortBy({
//         items,
//     });
//
//     return (
//         <InstantSearch searchClient={searchClient} indexName="articles">
//             <Configure
//                 filters={
//                     selectedCategory ? `category:"${selectedCategory}"` : ''
//                 }
//                 hitsPerPage={200}
//             />
//             <SearchBox
//                 // onChange={onChangeSearch}
//                 // value={search}
//                 placeholder={t('Пошук')}
//                 resetIconComponent={() => (
//                     <Icon Svg={CloseIcon} className={cls.ResetIcon} />
//                 )}
//                 submitIconComponent={() => <Icon Svg={SearchIcon} />}
//                 data-testid="ArticlesPage.SearchInput"
//                 classNames={{
//                     submit: cls.SubmitSearchBtn,
//                     reset: cls.ResetSearchBtn,
//                     form: cls.SubmitInputWrapper,
//                     input: cls.SearchInput,
//                 }}
//             />
//
//             <VStack gap="8">
//                 <ClearRefinements
//                     translations={{
//                         resetButtonText: t('Вcі статті'),
//                     }}
//                     classNames={{
//                         button: cls.AllItemsBtn,
//                         disabledButton: cls.AllItemsBtnNotSelected,
//                     }}
//                 />
//                 <Menu
//                     attribute="category"
//                     // limit={250}
//                     transformItems={transformItems}
//                     classNames={{
//                         link: cls.MenuLink,
//                         count: cls.categoryCount,
//                         list: cls.MenuList,
//                         item: cls.MenuItem,
//                         selectedItem: cls.SelectedMenuItem,
//                     }}
//                 />
//             </VStack>
//
//             <SortBy items={items} />
//             <ArticleSortSelector
//                 order={order}
//                 sort={ArticleSortField.TITLE}
//                 onChangeOrder={toggleOrder}
//                 onChangeSort={onChangeSort}
//             />
//         </InstantSearch>
//     );
// };

// const SortBy: React.FC = () => {
//     const { refine, currentRefinement, options } = useSortBy({
//         items: [
//             { value: 'instant_search', label: 'Default' },
//             { value: 'instant_search_price_asc', label: 'Price Ascending' },
//             { value: 'instant_search_price_desc', label: 'Price Descending' },
//         ],
//     });
//
//     const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const selectedValue = event.target.value;
//         refine(selectedValue);
//         console.log(`Sorting changed to: ${selectedValue}`); // Custom callback
//     };
//
//     return (
//         <select value={currentRefinement} onChange={handleChange}>
//             {options.map((item) => (
//                 <option key={item.value} value={item.value}>
//                     {item.label}
//                 </option>
//             ))}
//         </select>
//     );
// };
