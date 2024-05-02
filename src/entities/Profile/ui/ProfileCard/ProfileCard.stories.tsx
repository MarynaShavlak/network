import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileCard } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/tests/storybook.jpg';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        username: 'admin',
        age: 29,
        country: Country.Ukraine,
        lastname: 'Shavlak',
        first: 'Maryna',
        city: 'Kharkiv',
        currency: Currency.UAH,
        avatar,
    },
    readonly: true,
};

export const isEddited = Template.bind({});
isEddited.args = {
    data: {
        username: 'admin',
        age: 29,
        country: Country.Ukraine,
        lastname: 'Shavlak',
        first: 'Maryna',
        city: 'Kharkiv',
        currency: Currency.UAH,
        avatar,
    },
    readonly: false,
};

export const withError = Template.bind({});
withError.args = {
    error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};