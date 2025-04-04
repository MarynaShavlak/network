import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Table,
    useReactTable,
} from '@tanstack/react-table';
import { UsersTableInfo } from '../../../model/types/usersTableInfo';
import { useUsersFullInfoTableColumns } from '../useUsersFullInfoTableColumns/useUsersFullInfoTableColumns';
import { CommonFilterType } from '@/features/Table';
import { DEFAULT_PAGE_SIZE } from '../../../model/consts/pagination';

interface UseTableConfigParams {
    data: UsersTableInfo[];
    columns: ReturnType<typeof useUsersFullInfoTableColumns>;
    globalFilter: string;
    columnFilters: CommonFilterType;
    // updateTableRow: (rowIndex: number, columnId: string, value: any) => void;
}

export const useUsersFullInfoTableConfig = (
    params: UseTableConfigParams,
): Table<UsersTableInfo> => {
    const {
        data,
        columns,
        globalFilter,
        columnFilters,
        // updateTableRow: updateData,
    } = params;

    const table = useReactTable<UsersTableInfo>({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: DEFAULT_PAGE_SIZE,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: 'includesString',
        columnResizeMode: 'onChange',
        // meta: { updateData },
    });

    return table;
};
