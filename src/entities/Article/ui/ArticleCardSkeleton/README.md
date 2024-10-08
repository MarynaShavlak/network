# ArticleCardSkeleton

## Overview
The **`ArticleCardSkeleton`** component dynamically switches between `ListViewSkeleton` and `GridViewSkeleton` based on the specified `view` prop. This approach ensures that a skeleton placeholder is displayed in either a list or grid layout, providing a consistent loading experience for users while content is being fetched. By accommodating different view types, the component maintains visual consistency and engagement during loading phases.

## Type Definition
```typescript
export interface ArticleCardSkeletonProps {
    view: ArticleView;
}
```

## Props
The **`ArticleCardSkeleton`** component accepts the following props:

| Prop        | Type       | Required / Optional | Description                                                               |
|-------------|------------|----------------------|---------------------------------------------------------------------------|
| `view`      | `ArticleView`   | Required             | Specifies the layout view for the article (list or grid). |

## Features
1. **Dynamic View Switching**: The component adapts between list and grid skeletons based on the `view` prop, allowing for flexible placeholder presentation that matches the layout of the content being loaded.
2. **Consistent Loading Experience**: Ensures that loading placeholders are displayed consistently across both list and grid layouts, maintaining a uniform user experience while content is being fetched.

## Usage Example
```typescript jsx
import { ArticleCardSkeleton } from '@/entities/Article';
import { ArticleView } from '../../../../model/consts/articleConsts';

const App = () => (
    <>
        <ArticleCardSkeleton view={ArticleView.LIST} />
        <ArticleCardSkeleton view={ArticleView.GRID} />
    </>
);
```
## Conclusion
The `ArticleCardSkeleton` component is essential for rendering placeholder skeletons in both list and grid layouts, offering a flexible and adaptive interface that caters to various presentation needs. 
By leveraging the `view` prop, the component seamlessly transitions between the `ListViewSkeleton` and `GridViewSkeleton` components, ensuring users receive a consistent and visually appealing loading experience irrespective of the chosen layout. 
This adaptability enhances user experience and supports the application's evolution, allowing for smooth transitions between different view types without disrupting the user interface. 
The `ArticleCardSkeleton` component thus plays a pivotal role in maintaining engagement and visual consistency during loading phases, supporting both current and future design paradigms.
