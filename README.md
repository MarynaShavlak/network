## Запуск проєкту

```
npm install - встановлення залежностей
npm run start:dev или npm run start:dev:vite - запуск сервера + frontend проєкту в dev режимі
```

----

## Скрипты

- `npm run start` - Запуск frontend проєкту на webpack dev server
- `npm run start:vite` - Запуск frontend проєкту на vite
- `npm run start:dev` - Запуск frontend проєкту на webpack dev server + backend
- `npm run start:dev:vite` - Запуск frontend проєкту на vite + backend
- `npm run start:dev:server` - Запуск backend сервера
- `npm run build:prod` - Збірка в prod режимі
- `npm run build:dev` - Збірка в dev режимі (не мінімізований)
- `npm run lint:ts` - Перевірка ts файлів лінтером
- `npm run lint:ts:fix` - Виправлення ts файлів лінтером
- `npm run lint:scss` - Перевірка scss файлів style лінтером
- `npm run lint:scss:fix` - Виправлення scss файлів style лінтером
- `npm run test:unit` - Запуск unit тестів з jest
- `npm run test:ui` - Запуск скріншотних тестів з loki
- `npm run test:ui:ok` - Підтвердження нових скріншотів
- `npm run test:ui:ci` - Запуск скріншотних тестів в CI
- `npm run test:ui:report` - Генерація повного звіту для скріншотних тестів
- `npm run test:ui:json` - Генерація json звіту для скріншотних тестів
- `npm run test:ui:html` - Генерація HTML звіту для скріншотних тестів
- `npm run storybook` - запуск Storybook
- `npm run storybook:build` - Збірка storybook білда
- `npm run prepare` - прекоміт хуки
- `npm run generate:slice` - Скрипт для генерації FSD слайсів

----

## Архітектура проєкту

Проєкт написаний відповідно до методології Feature sliced design

Посилання на документацію - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Робота з перекладами

У проєкті використовується бібліотека i18next для роботи з перекладами.
Файли з перекладами зберігаються в public/locales.

Для комфортної роботи рекомендовано встановити плагін для webstorm/vscode

Документація i18nex - [https://react.i18next.com/](https://react.i18next.com/)

----

## Тести

У проєкті використовуються 4 види тестів:
1) Звичайні unit тести на jest - `npm run test:unit`
2) Тести на компоненти з React testing library -`npm run test:unit`
3) Скріншотне тестування з loki `npm run test:ui`
4) e2e тестування з Cypress `npm run test:e2e`

Докладніше про тести - [документація тестування](/docs/tests.md)

----

## Лінтинг

У проєкті використовується eslint для перевірки typescript коду і stylelint для перевірки файлів зі стилями.

Також для строгого контролю основних архітектурних принципів
використовується власний eslint plugin *ms-production-project-plugin*,
який містить 3 правила
1) path-checker - забороняє використовувати абсолютні імпорти в рамках одного модуля
2) layer-imports - перевіряє коректність використання шарів з точки зору FSD
   (наприклад widgets не можна використовувати в features і entities)
3) public-api-imports - дозволяє імпорт з інших модулів тільки з public api. Має auto fix

##### Запуск лінтерів
- `npm run lint:ts` - Перевірка ts файлів лінтером
- `npm run lint:ts:fix` - Виправлення ts файлів лінтером
- `npm run lint:scss` - Перевірка scss файлів style лінтером
- `npm run lint:scss:fix` - Виправлення scss файлів style лінтером

----
## Storybook

У проєкті для кожного компонента описуються сторі-кейси.
Запити на сервер мокаються за допомогою storybook-addon-mock.

Файл зі сторі-кейсами створює поруч з компонентом з розширенням .stories.tsx

Запустити сторібук можна командою:
- `npm run storybook`

Докладніше про [Storybook](/docs/storybook.md)

Приклад:

```typescript jsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR,
};
```


----

## Конфігурація проєкту

Для розробки проєкт містить 2 конфіги:
1. Webpack - ./config/build
2. vite - vite.config.ts

Обидва збирачі адаптовані під основні фічі застосунку.

Вся конфігурація зберігається в /config
- /config/babel - babel
- /config/build - конфігурація webpack
- /config/jest - конфігурація тестового середовища
- /config/storybook - конфігурація сторібука

У папці scripts знаходяться різні скрипти для рефакторингу\спрощення написання коду\генерації звітів тощо.

----

## CI pipeline та pre commit хуки

Конфігурація github actions знаходиться в /.github/workflows.
В CI проганяються всі види тестів, збірка проєкту і сторібука, лінтинг.

У прекоміт хуках перевіряємо проєкт лінтерами, конфіг в /.husky

----

### Робота з даними

Взаємодія з даними здійснюється за допомогою redux toolkit.
По можливості повторно використовувані сутності необхідно нормалізувати за допомогою EntityAdapter

Запити на сервер відправляються за допомогою [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного підключення редюсерів (щоб не тягнути їх у загальний бандл) використовується
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

----
## Робота із feature-flags
Дозволено використання feature flags тільки за допомогою хелпера toggleFeatures

В нього передається об'єкт з опціями: 

{
name: назва фіча-прапора,
on: функція, яка відпрацює після Увімкнення фічі
of: функція, яка відпрацює після Вимкнення фічі
}

Для автоматичного видалення фічі використовувати скрипт remove-feature.ts,
який приймає 2 аргументи
1. Назва фіча-прапора, що видаляється
2. Стан (on\off)

## Сутності (entities)

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Фічі (features)

- [addCommentForm](/src/features/addCommentForm)
- [articleRating](/src/features/articleRating)
- [articleRecommendationsList](/src/features/articleRecommendationsList)
- [AuthByUsername](/src/features/AuthByUsername)
- [avatarDropdown](/src/features/avatarDropdown)
- [editableProfileCard](/src/features/editableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [notificationButton](/src/features/notificationButton)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
- [ScrollRestoration](/src/features/UI)
