# Entity Article Documentation

## Overview

The `Article` module is responsible for managing all article-related functionalities within the React application. This module adheres to the Feature-Sliced Design (FSD) architecture, which promotes modularity, scalability, and maintainability. The following documentation provides a comprehensive overview of each component of the `Article` module.

## Module Structure

The `Article` module is organized into several directories, each serving a distinct purpose:
```text
Article/
├── model/
│   ├── consts/
│   │   └── articleConsts.ts
│   ├── selectors/
│   │   └── articleDetails.ts
│   ├── services/
│   │   └── fetchArticleByIdThunk/
│   │       └── fetchArticleByIdThunk.ts
│   ├── slices/
│   │   └── articleDetailsSlice.ts
│   └── types/
│       ├── article.ts
│       └── articleDetailsSchema.ts
├── ui/
│   ├── ArticleCard/
│   │   ├── GridViewCard/
│   │   │   ├── GridViewCardDeprecated/
│   │   │   │   └── GridViewCardDeprecated.tsx
│   │   │   └── GridViewCardRedesigned/
│   │   │       └── GridViewCardRedesigned.tsx
│   │   ├── ListViewCard/
│   │   │   ├── ListViewCardDeprecated/
│   │   │   │   └── ListViewCardDeprecated.tsx
│   │   │   └── ListViewCardRedesigned/
│   │   │       └── ListViewCardRedesigned.tsx
│   │   ├── ArticleCard.tsx
│   │   └── ArticleCard.module.scss
│   ├── ArticleCardSkeleton/
│   │   ├── GridViewCardSkeleton/
│   │   │   └── GridViewCardSkeleton.tsx
│   │   ├── ListViewCardSkeleton/
│   │   │   └── ListViewCardSkeleton.tsx
│   │   └── ArticleCardSkeleton.tsx
│   ├── ArticleCategories/
│   │   ├── ArticleCategories.tsx
│   │   └── ArticleCategories.module.scss
│   ├── ArticleViews/
│   │   └── ArticleViews.tsx
│   ├── ArticleTextBlockComponent/
│   │   ├── ArticleTextBlockComponent.tsx
│   │   └── ArticleTextBlockComponent.module.scss
│   ├── ArticleCodeBlockComponent/
│   │   ├── ArticleCodeBlockComponent.tsx
│   │   └── ArticleCodeBlockComponent.module.scss
│   ├── ArticleImageBlockComponent/
│   │   ├── ArticleImageBlockComponent.tsx
│   │   └── ArticleImageBlockComponent.module.scss
│   ├── ArticleDetails/
│   │   ├── ArticleDetailsError/
│   │   │   └── ArticleDetailsError.tsx
│   │   ├── ArticleDetailsSkeleton/
│   │   │   └── ArticleDetailsSkeleton.tsx
│   │   ├── ArticleDetailsDeprecated/
│   │   │   └── ArticleDetailsDeprecated.tsx
│   │   ├── ArticleDetailsRedesigned/
│   │   │   └── ArticleDetailsRedesigned.tsx
│   │   ├── ArticleDetails.tsx
│   │   ├── ArticleDetails.module.scss
│   │   └── renderArticleBlock.tsx
│   ├── ArticleList/
│   │   ├── ArticleListSkeleton/
│   │   │   └── ArticleListSkeleton.tsx
│   │   ├── NoArticleFound/
│   │   │   └── NoArticleFound.tsx
│   │   ├── ArticleList.tsx
│   │   └── ArticleList.module.scss
├── index.ts
└── testing.ts
```

## Detailed Description

### 1. `model/`: Core logic and data structures

- **`consts/`**
  - [**articleConsts.ts**](./model/consts/articleConsts.ts): Defines constants for article states and configurations.

- **`selectors/`**
  - [**articleDetails.ts**](./model/selectors/README.md): Contains selector functions to retrieve article-related data from the Redux store.

- **`services/`**
  - **`fetchArticleByIdThunk/`**
    - [**fetchArticleByIdThunk.ts**](model/services/__fetchArticleByIdThunk/README.md): Fetches article data by ID from the API.

- **`slices/`**
  - [**articleDetailsSlice.ts**](model/slices/README.md): Manages article-related state in Redux, including actions and reducers.

- **`types/`**
  - [**article.ts**](./model/types/article.ts): TypeScript types for article objects.
  - [**articleDetailsSchema.ts**](./model/types/articleDetailsSchema.ts): Schema for article details.

### 2. `ui/`: UI components 

- **`ArticleCard/`**
  - [**ArticleCard.tsx**](./ui/ArticleCard/README.md): Main component for displaying an article in card format.
  - **ArticleCard.module.scss**: Styles for the `ArticleCard` component.
  - **`GridViewCard/`**
    - **`GridViewCardDeprecated/`**
      - [**GridViewCardDeprecated.tsx**](ui/ArticleCard/GridViewCard/GridViewCardDeprecated/README.md): Legacy card component for grid view.
    - **`GridViewCardRedesigned/`**
      - [**GridViewCardRedesigned.tsx**](ui/ArticleCard/GridViewCard/GridViewCardRedesigned/README.md): Updated card component for grid view.
  - **`ListViewCard/`**
    - **`ListViewCardDeprecated/`**
      - [**ListViewCardDeprecated.tsx**](ui/ArticleCard/ListViewCard/ListViewCardDeprecated/README.md): Legacy card component for list view.
    - **`ListViewCardRedesigned/`**
      - [**ListViewCardRedesigned.tsx**](ui/ArticleCard/ListViewCard/ListViewCardRedesigned/README.md): Updated card component for list view.

- **`ArticleCardSkeleton/`**
  - [**ArticleCardSkeleton.tsx**](./ui/ArticleCardSkeleton/README.md): Skeleton component for the loading state of article cards.
  - **`GridViewSkeleton/`**
    - [**GridViewSkeleton.tsx**](./ui/ArticleCardSkeleton/GridViewSkeleton/README.md): Skeleton component for grid view card loading state.
  - **`ListViewSkeleton/`**
    - [**ListViewSkeleton.tsx**](./ui/ArticleCardSkeleton/ListViewSkeleton/README.md): Skeleton component for list view card loading state.

- **`ArticleCategories/`**
  - [**ArticleCategories.tsx**](./ui/ArticleCategories/README.md): Component for displaying article categories.
  - **ArticleCategories.module.scss**: Styles for the `ArticleCategories` component.

- **`ArticleViews/`**
  - [**ArticleViews.tsx**](./ui/ArticleViews/README.md): Component for displaying article view counts.

- **`ArticleTextBlockComponent/`**
  - [**ArticleTextBlockComponent.tsx**](./ui/ArticleTextBlockComponent/README.md): Component for rendering text blocks within articles.
  - **ArticleTextBlockComponent.module.scss**: Styles for the `ArticleTextBlockComponent`.

- **`ArticleCodeBlockComponent/`**
  - [**ArticleCodeBlockComponent.tsx**](./ui/ArticleCodeBlockComponent/README.md): Component for displaying code blocks within articles.
  - [**ArticleCodeBlockComponent.module.scss**: Styles for the `ArticleCodeBlockComponent`.

- **`ArticleImageBlockComponent/`**
  - [**ArticleImageBlockComponent.tsx**](./ui/ArticleImageBlockComponent/README.md): Component for displaying images within articles.
  - **ArticleImageBlockComponent.module.scss**: Styles for the `ArticleImageBlockComponent`.

- **`ArticleDetails/`**
  - [**ArticleDetails.tsx**](./ui/ArticleDetails/README.md): Main component for displaying detailed article information.
  - **ArticleDetails.module.scss**: Styles for the `ArticleDetails` component.
  - **`ArticleDetailsError/`**
    - [**ArticleDetailsError.tsx**](./ui/ArticleDetails/ArticleDetailsError/ArticleDetailsError.tsx): Component for displaying error states in article details.
  - **`ArticleDetailsSkeleton/`**
    - [**ArticleDetailsSkeleton.tsx**](./ui/ArticleDetails/ArticleDetailsSkeleton/README.md): Skeleton component for loading states in article details.
  - **`ArticleDetailsDeprecated/`**
    - [**ArticleDetailsDeprecated.tsx**](ui/ArticleDetails/ArticleDetailsDeprecated/README.md): Legacy component for displaying article details.
  - **`ArticleDetailsRedesigned/`**
    - [**ArticleDetailsRedesigned.tsx**](ui/ArticleDetails/ArticleDetailsRedesigned/README.md): Updated component for displaying article details.
  - [**renderArticleBlock.tsx**](./ui/ArticleDetails/renderArticleBlock.tsx): Utility component for rendering different blocks within article details.

- **`ArticleList/`**
  - [**ArticleList.tsx**](./ui/ArticleList/README.md): Component for displaying a list of articles.
  - **ArticleList.module.scss**: Styles for the `ArticleList` component.
  - **`ArticleListSkeleton/`**
    - [**ArticleListSkeleton.tsx**](./ui/ArticleList/ArticleListSkeleton/README.md): Skeleton component for loading states in article lists.
  - **`NoArticleFound/`**
    - [**NoArticleFound.tsx**](./ui/ArticleList/NoArticlesFound/README.md): Component for displaying a message when no articles are found.


### 3. `index.ts`
- Entry point for the Article module, exporting components, functions, and types.

### 4. `testing.ts`

Entry point for testing-related functionalities within the Article module. It is used primarily for development purposes, such as testing data, reducers, and integrating with tools like Storybook. This file is not included in the production code but is essential for ensuring the module's functionality during development.

## Public API

- **Types**:
  - `Article`: Interface defining the structure of an article object.
  - `ArticleDetailsSchema`: Schema defining the structure for article details.

- **Constants**:
  - `ArticleView`, `ArticleSortField`, `ArticleCategory`: Enums related to article views, sorting fields, and categories.

- **Selectors**:
  - `getArticleDetailsData`, `useArticleDetailsData`: Selectors for retrieving detailed article data.
  - `useArticleDetailsIsLoading`, `useArticleDetailsError`: Selectors for checking the loading state and errors related to article details.

- **Components**:
  - `ArticleList`: Component for displaying a list of articles.
  - `NoArticlesFound`: Component shown when no articles are available.
  - `ArticleCard`: Component for displaying individual articles in card format.
  - `ArticleCardSkeleton`: Component for the loading state of an article card.
  - `ArticleListSkeleton`: Component for the loading state of an article list.
  - `ArticleDetails`: Component for displaying detailed information about an article.

## Public Testing API
- **Testing Exports**:
  - `articleDetailsReducer` - Reducer for article details state management for use in testing scenarios and development tools.
  - `testArticleData` -  is a mock object representing article data, designed for use in testing scenarios and development tools.
  - `testArticlesListData` -  is a mock array of objects representing articles data, designed for use in testing scenarios and development tools.
  - `articlesNormalizedData` -  - A utility object that normalizes testArticlesListData for easier manipulation in testing. It converts the array of articles into an object format with:
    - `ids`: An array of article IDs generated by mapping over `testArticlesListData`.
    - `entities`: An object where the keys are article IDs, and the values are the corresponding article objects, created using reduce to transform the array into an object. This is useful for scenarios requiring normalized data structures, such as testing with Redux stores or other state management tools.


## Conclusion

The `Article` module is designed to manage article-related functionalities in a structured and maintainable manner. By adhering to the FSD architecture, it ensures scalability and seamless integration within the application. The clear separation of concerns, alongside well-defined components, services, and state management practices, contributes to a robust and efficient article management system.

For more details on each part of the module, please refer to the README.md files in each directory.
