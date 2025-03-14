# Modal

## Overview
The **`Modal`** component is a versatile and customizable modal dialog implementation for React applications. It provides an interface for displaying content in an overlay that can be opened and closed, with additional features for lazy rendering and theme support.

## Type Definition 
```typescript
interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}
```

## Props
The `Modal` interface extends `TestProps` to include the optional `data-testid` property, allowing for easier identification and testing of the component in various testing environments

The **`Modal`** component accepts the following props:

| Prop       | Type       | Required / Optional | Description                                          |
|------------|------------|----------------------|------------------------------------------------------|
| `className` | `string`   | Optional             | Custom class name for additional styling.           |
| `children`  | `ReactNode` | Optional             | The content to be displayed inside the modal.       |
| `isOpen`    | `boolean`  | Optional             | Controls whether the modal is open or closed.       |
| `lazy`      | `boolean`  | Optional             | If true, the modal will not mount in DOM until it is opened. |
| `onClose`   | `() => void` | Optional             | Callback function to handle modal close actions.    |



## Features
1.**Conditional Rendering**: The modal supports lazy rendering, meaning it will only be mounted in the DOM when needed. This helps to reduce the initial bundle size, especially useful when the modal includes asynchronous components that should only be loaded when the modal is opened.
This is controlled through the **`useModal`** hook, which manages the modal's state and lifecycle.


2.**Theming**: The component integrates with a theming system, allowing it to adapt its styles based on the current theme.

3.**Class Management**: Utilizes a dynamic class management system to handle different states such as when the modal is open or closing. This ensures smooth animations and transitions.

4.**Overlay Click Handling**: Includes an overlay that captures click events to close the modal, enhancing the user experience by allowing easy dismissal of the modal.

5.**Portal Usage**: The modal is rendered using a Portal, attaching it to the DOM outside the normal React component tree. This ensures it appears above other content and avoids z-index issues.

6.**Feature Toggles**: Supports feature toggling to conditionally apply different styles or behaviors based on feature flags.


## Usage Example
Here's an example of using the Modal component with lazy loading:
```typescript jsx
import { memo, Suspense } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { AuthFormAsync } from '../AuthForm/AuthForm.async';
import { Loader } from '@/shared/ui/deprecated/Loader';

interface AuthModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = memo(
    ({ className, isOpen, onClose }: AuthModalProps) => (
        <Modal
            className="AuthModal"
            isOpen={isOpen}
            onClose={onClose}
            lazy // Enables lazy loading for the modal content
        >
            <Suspense fallback={<Loader />}>
                <LoginFormAsync onSuccess={onClose} />
                {/* Lazy loaded component within the modal */}
            </Suspense>
        </Modal>
    ),
);
```
## Conclusion
The **`Modal`** component is a versatile and customizable solution for modal dialogs in React applications. It offers features like lazy rendering, theming support, dynamic class management, overlay click handling, and portal usage. These capabilities make it efficient and user-friendly, enhancing the overall user experience while ensuring a clean and performant codebase.
