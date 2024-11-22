import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';

export const RedesignedProfileCard = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props;
    const { t } = useTranslation('profile');
    const additionalClasses = getFlexClasses({ vStack: true, gap: '32' });
    const validConfig = useInputValidationConfig();
    const { username = '', firstname = '', lastname = '' } = data || {};

    const { hasErrors, lastnameErrors, usernameErrors, firstnameErrors } =
        useFormValidation(
            { username, firstname, lastname },
            validConfig,
            'profile',
        );

    return (
        <Card
            padding="24"
            max
            className={classNames(className ?? '', {}, additionalClasses)}
        >
            <HStack justify="center" max>
                <Avatar
                    size={128}
                    src={data?.avatar}
                    alt={t('Аватар користувача')}
                />
            </HStack>
            <HStack gap="24" max align="start">
                <VStack gap="16" max>
                    <Input
                        value={data?.email}
                        label={`${t('Email')}:`}
                        readonly
                        disabled
                        data-testid="ProfileCard.email"
                    />
                    <Input
                        value={data?.firstname}
                        label={`${t("Ім'я")}:`}
                        onChange={onChangeFirstname}
                        readonly={readonly}
                        disabled={readonly}
                        data-testid="ProfileCard.firstname"
                        validations={validConfig.firstname}
                        errors={firstnameErrors}
                    />
                    <Input
                        value={data?.lastname}
                        label={`${t('Прізвище')}:`}
                        onChange={onChangeLastname}
                        readonly={readonly}
                        disabled={readonly}
                        data-testid="ProfileCard.lastname"
                        validations={validConfig.lastname}
                        errors={lastnameErrors}
                    />

                    <Input
                        value={data?.age || ''}
                        label={`${t('Вік')}:`}
                        onChange={onChangeAge}
                        readonly={readonly}
                        disabled={readonly}
                        digitsOnly
                        data-testid="ProfileCard.age"
                    />
                </VStack>
                <VStack gap="16" max>
                    <Input
                        value={data?.username}
                        label={`${t("Ім'я користувача")}:`}
                        onChange={onChangeUsername}
                        readonly={readonly}
                        disabled={readonly}
                        data-testid="ProfileCard.username"
                        validations={validConfig.lastname}
                        errors={usernameErrors}
                    />
                    {/* <Input */}
                    {/*    value={data?.avatar} */}
                    {/*    label={`${t('Посилання на аватар')}:`} */}
                    {/*    onChange={onChangeAvatar} */}
                    {/*    readonly={readonly} */}
                    {/*    disabled={readonly} */}
                    {/*    data-testid="ProfileCard.avatar" */}
                    {/* /> */}
                    <CurrencySelect
                        value={data?.currency}
                        onChange={onChangeCurrency}
                        readonly={readonly}
                    />
                    <CountrySelect
                        value={data?.country}
                        onChange={onChangeCountry}
                        readonly={readonly}
                    />
                    <Input
                        value={data?.city || ''}
                        label={`${t('Місто')}:`}
                        onChange={onChangeCity}
                        readonly={readonly}
                        disabled={readonly}
                        data-testid="ProfileCard.city"
                    />
                </VStack>
            </HStack>
        </Card>
    );
});
