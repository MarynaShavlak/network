# Documentation for 'scrollSlice'

## Overview
The `scrollSlice` is a part of the Redux state management designed to handle the UI scroll positions for different paths in an application.
It leverages Redux Toolkit and a custom `buildSlice` function to create a slice with an initial state and reducers.

## Import Statements
```typescript
import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { UIScrollSchema } from '../types/ScrollSchema';
```
- `PayloadAction`: A type from Redux Toolkit used to define the shape of action payloads.
- `buildSlice`: A custom utility function for creating Redux slices.
- `UIScrollSchema`: A TypeScript type that defines the schema for the scroll state.

## Initial State
```typescript
const initialState: UIScrollSchema = {
    scroll: {},
};
```

The initial state of the slice is defined using the `UIScrollSchema` type. It contains a single property `scroll`, which is an empty object. This object will hold the scroll positions keyed by path.

## Slice Definition
```typescript
export const scrollSlice = buildSlice({
    name: 'scroll',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            { payload }: PayloadAction<{ path: string; position: number }>,
        ) => {
            state.scroll[payload.path] = payload.position;
        },
    },
});
```
- **name**: The name of the slice, which is 'scroll'.
- **initialState**: The initial state defined earlier.
- **reducers**: An object containing reducer functions.

### Reducer: setScrollPosition
```typescript
setScrollPosition: (
    state,
    { payload }: PayloadAction<{ path: string; position: number }>,
) => {
    state.scroll[payload.path] = payload.position;
}
```
- **state**: The current state of the slice.
- **payload**: An object containing:
  - **path**: A string representing the path for which the scroll position is being set.
  - **position**: A number representing the scroll position.
  This reducer updates the scroll object in the state, setting the scroll position for the specified path.

## Exports
```typescript
export const {
    actions: scrollActions,
    reducer: scrollReducer,
    useActions: useScrollActions,
} = scrollSlice;
```
- **scrollActions**: An object containing the action creators generated by the slice.
- **scrollReducer**: The reducer function to be used in the Redux store.
- **useScrollActions**: A custom hook to use the actions in a React component.


## Usage Example
```typescript
import { scrollActions, scrollReducer } from '@/path/to/scrollSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        scroll: scrollReducer,
    },
});

// Dispatching an action to set scroll position

const { setScrollPosition } = useScrollActions();
setScrollPosition({ path: '/home', position: 100 });
```


## Conclusion 
The `scrollSlice` is a robust solution for managing UI scroll positions in a Redux-based application. 
By encapsulating scroll state and providing a clear mechanism for setting scroll positions by path, it simplifies state management and enhances the user experience.
Utilizing `buildSlice` function ensures the slice is both scalable and maintainable.
Integrating `scrollSlice` into your Redux store and leveraging its actions can significantly improve the handling of scroll positions, providing a smoother navigation experience for users.
