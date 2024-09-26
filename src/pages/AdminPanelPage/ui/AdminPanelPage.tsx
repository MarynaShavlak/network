import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { UsersInfoTable } from '@/features/UsersInfoTable';

const AdminPanelPage = () => {
    const { t } = useTranslation('about');

    return (
        <Page data-testid="AdminPanelPage">
            {t('Адмін панель')}
            <UsersInfoTable />
        </Page>
    );
};

export default AdminPanelPage;
