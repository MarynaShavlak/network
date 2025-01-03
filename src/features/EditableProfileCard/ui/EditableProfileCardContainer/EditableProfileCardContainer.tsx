import { memo } from 'react';
import { useProfile } from '../../lib/hooks/useProfile';
import { UserCard } from '@/entities/Profile';

export const EditableProfileCardContainer = memo(() => {
    const {
        formData,
        error,
        isLoading,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeUsername,
        onChangeAvatar,
        onChangeCountry,
        onChangeCurrency,
        onChangeAge,
        onChangeCity,
        onFileUpload,
    } = useProfile();

    return (
        <UserCard
            data={formData}
            isLoading={isLoading}
            error={error}
            readonly={readonly}
            onChangeFirstname={onChangeFirstname}
            onChangeLastname={onChangeLastname}
            onChangeAge={onChangeAge}
            onChangeCity={onChangeCity}
            onChangeUsername={onChangeUsername}
            onChangeAvatar={onChangeAvatar}
            onChangeCurrency={onChangeCurrency}
            onChangeCountry={onChangeCountry}
            onFileUpload={onFileUpload}
        />
    );
});
