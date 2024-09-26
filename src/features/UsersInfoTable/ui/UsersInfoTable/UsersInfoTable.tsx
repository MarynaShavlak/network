import React from 'react';
import { UserRole, useUsers } from '@/entities/User';
import { Profile, useProfiles } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import cls from './UsersInfoTable.module.scss';
import { Each } from '@/shared/lib/components/Each/Each';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { capitalizeFirstLetter } from '@/shared/lib/text/capitalizeFirstLetter/capitalizeFirstLetter';
import { useArticles } from '@/entities/Article';

interface UserFullInfo extends Profile {
    roles: string;
    fullName: string;
    features: string;
    articlesQuantity: number;
}

interface Column<T> {
    Header: string;
    accessor: keyof T;
}

interface TableProps<T> {
    className?: string;
    data: T[];
    columns: Column<T>[];
}

interface TableHeaderProps<T> extends Pick<TableProps<T>, 'columns'> {}
interface TableBodyProps<T> extends Omit<TableProps<T>, 'className'> {}

const TableHeader = <T,>(props: TableHeaderProps<T>) => {
    const { columns } = props;
    return (
        <thead>
            <tr>
                <Each
                    of={columns}
                    render={(column, index) => (
                        <th key={index}>{column.Header}</th>
                    )}
                />
            </tr>
        </thead>
    );
};

const TableBody = <T,>(props: TableBodyProps<T>) => {
    const { data, columns } = props;
    return (
        <tbody>
            <Each
                of={data}
                render={(row, rowIndex) => (
                    <tr key={rowIndex}>
                        <Each
                            of={columns}
                            render={(column, colIndex) => (
                                <td key={colIndex}>
                                    {column.accessor === 'avatar' ? (
                                        <Avatar
                                            src={row[column.accessor] as string}
                                            size={40}
                                        />
                                    ) : (
                                        String(row[column.accessor])
                                    )}
                                </td>
                            )}
                        />
                    </tr>
                )}
            />
        </tbody>
    );
};

export const Table = <T,>(props: TableProps<T>) => {
    const { data, columns, className } = props;
    if (!data.length) return null;

    return (
        <table className={`${cls.Table} ${className || ''}`}>
            <TableHeader columns={columns} />
            <TableBody data={data} columns={columns} />
        </table>
    );
};

export const UsersInfoTable = () => {
    const { data: users } = useUsers(null);
    const { data: profiles } = useProfiles(null);
    const { data: articles } = useArticles(null);

    if (!users || !profiles || !articles) return null;
    console.log('articles', articles);
    const partialUsersData = users.map(({ id, roles, features, username }) => {
        if (!id || !roles || !features) return null;
        const trueFeatures = (
            Object.keys(features) as Array<keyof typeof features>
        )
            .filter((key) => features[key])
            .map((key) =>
                key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/is\s|enabled/gi, '')
                    .trim(),
            )
            .join(', ');

        return {
            id,
            username,
            roles: roles?.map((role) => role.toLowerCase()).join(', '),
            features: trueFeatures || 'None',
        };
    });
    const partialProfilesData = profiles.map((profile) => {
        const {
            id,
            username,
            firstname,
            lastname,
            age,
            currency,
            country,
            city,
        } = profile;
        if (!id || !firstname || !lastname) return null;

        return {
            id,
            username,
            age,
            city,
            country,
            currency,
            fullName: `${capitalizeFirstLetter(firstname)} ${capitalizeFirstLetter(lastname)}`,
        };
    });

    console.log('partialUsersData:', partialUsersData);
    console.log('partialProfilesData:', partialProfilesData);
    const articlesByUserData: { [key: string]: number } = {};
    articles.forEach((article) => {
        const { user } = article;
        const userId: string = user.id;

        if (articlesByUserData[userId]) {
            articlesByUserData[userId] += 1;
        } else {
            articlesByUserData[userId] = 1;
        }
    });

    console.log(articlesByUserData);

    const combineUserData = partialUsersData.map((user) => {
        if (!user) return null;
        const profile = partialProfilesData.find(
            (profile) => profile?.id === user.id,
        );
        const articlesQuantity = articlesByUserData[user.id] || 0;

        return {
            ...user,
            ...profile,
            articlesQuantity,
        };
    });
    console.log('combineUserData', combineUserData);

    const info: UserFullInfo[] = [
        {
            id: '1',
            username: 'admin',
            roles: [UserRole.ADMIN, UserRole.USER].join(', '),
            avatar:
                'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_13782' +
                '5710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
            firstname: 'test',
            lastname: 'user',
            age: 30,
            currency: Currency.EUR,
            country: Country.Ukraine,
            city: 'Kharkiv',
            fullName: 'test user',
            features: 'None',
            articlesQuantity: 23,
        },
        {
            id: '2',
            username: 'user',
            roles: [UserRole.ADMIN].join(', '),
            avatar:
                'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825' +
                '710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
            firstname: 'Максим',
            lastname: 'Shavlak',
            age: 27,
            currency: Currency.EUR,
            country: Country.Ukraine,
            city: 'Zagreb',
            fullName: 'Максим Shavlak',
            features: 'Article Rating, App Redesigned',
            articlesQuantity: 10,
        },
    ];

    const columns = [
        { Header: 'ID', accessor: 'id' as keyof UserFullInfo },
        { Header: 'Avatar', accessor: 'avatar' as keyof UserFullInfo },
        { Header: 'Username', accessor: 'username' as keyof UserFullInfo },
        { Header: 'Full Name', accessor: 'fullName' as keyof UserFullInfo },
        { Header: 'Role', accessor: 'roles' as keyof UserFullInfo },
        { Header: 'Age', accessor: 'age' as keyof UserFullInfo },
        { Header: 'Currency', accessor: 'currency' as keyof UserFullInfo },
        { Header: 'Country', accessor: 'country' as keyof UserFullInfo },
        { Header: 'City', accessor: 'city' as keyof UserFullInfo },
        {
            Header: 'Features Enabled',
            accessor: 'features' as keyof UserFullInfo,
        },
        {
            Header: 'Articles Quantity',
            accessor: 'articlesQuantity' as keyof UserFullInfo,
        },
    ];

    return <Table data={info} columns={columns} />;
};
