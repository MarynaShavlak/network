import React, { memo } from 'react';

import { HStack } from '@/shared/ui/common/Stack';
import { ArticleCreateNavigationButton } from '@/features/ArticleCreateNavigationButton';
import { SearchInput } from '@/features/Table';

interface TableActionBarProps {
    globalFilter: string;
    setGlobalFilter: (filterValue: string) => void;
}

export const TableActionBar = memo((props: TableActionBarProps) => {
    return (
        <HStack justify="between" max>
            <SearchInput {...props} />
            <ArticleCreateNavigationButton />
        </HStack>
    );
});
