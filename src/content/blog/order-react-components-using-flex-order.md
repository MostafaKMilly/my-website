---
title: 'Order React components using flex order'
description: 'Discover how to effectively utilize the CSS Flexbox order property within React components to control their visual sequence. This guide will walk you through the nuances of reordering React components on-the-fly, ensuring a responsive and intuitive layout without altering the underlying DOM structure.'
pubDate: '2023-10-24T21:29:20.007Z'
heroImage: '/images/order-components.png'
categories: ['Frontend']
tags: ['React', 'CSS', 'flexbox']
---

In my first post here, I will share with you guys how we can reorder any react component using [CSS flex order] (https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Ordering_Flex_Items) and make orders persist by storing them in localStroage.

### Create new react project

First create empty react typescript project using [vite](https://vitejs.dev/) by executing this command

`yarn create vite simple-app --template react-ts`

After remove unnecessary files and create some empty files the folder structure will be look like

![Folder structure](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u7fko0ou8l28aaifyotk.png)

### 1. Implement Orderable Context

First, we will implement React context to pass correct order value and manage order functionality between all children respectively.

#### **`context\OrderableContext.tsx`**

```typescript
import React from 'react';

export const OrderableContext = React.createContext<OrderableContextValue>({
  changeOrder: (id, direction) => undefined,
  canMoveDown: (_) => false,
  canMoveUp: (_) => false,
  getCurrnetIndex: (_) => -1,
});

export type OrderableContextValue = {
  /** Change order callback */
  changeOrder: (id: string, direction: 'UP' | 'DOWN') => void;
  /** Check if we can move component down */
  canMoveDown: (id: string) => boolean;
  /** Check if we can move component up */
  canMoveUp: (id: string) => boolean;
  /** Get current component index */
  getCurrnetIndex: (id: string) => number;
};
```

Here I create new React context which has the functionalities I need to implement the order functionality.
Also, we need custom hook to consume our context value

#### **`hooks\useOrderable.ts`**

```typescript
import { useContext } from 'react';
import { OrderableContext } from '../context/OrderableContext';

export const useOrderable = () => {
  const value = useContext(OrderableContext);
  return value;
};
```

### 2. Implement Orderable Layout

Second, we need high order component (aka HOC) to wrap all components which have the order functionality

#### **`components\OrderableLayout.tsx`**

```jsx
import { OrderableContext } from "../context/OrderableContext";

export const OrderableLayout = <
  T extends { id: string; disableOrder?: boolean }
>({
  children,
  localStorageKey,
}: OrderableLayoutProps<T>) => {
  const componentsIds = children
    .filter((child) => Boolean(child.props.disableOrder) === false)
    .map((child) => child.props.id);

  const value = useOrderableLayout(componentsIds, localStorageKey);

  return (
    <div style={{ display: "flex" , flexDirection: "column"}}>
      <OrderableContext.Provider value={value}>
        {children}
      </OrderableContext.Provider>
    </div>
  );
};

type OrderableLayoutProps<T> = {
  localStorageKey?: string;
  children: React.ReactElement<T>[];
};
```

I ensure that each child will have unique id which will pass as prop to it and I take these ids and pass them to `useOrderableLayout` hook which will manage all the order functionality inside it and pass the result to all children.

#### **`hooks\useOrderableLayout.ts`**

```typescript
import { useLocalStorage } from './useLocalStorage';

export const useOrderableLayout = (ids: string[], key: string = 'KEY') => {
  const [state, setState] = useLocalStorage(key, ids);

  const changeOrder = (id: string, direction: 'UP' | 'DOWN') => {
    const index = state.indexOf(id);
    const newIndex = direction === 'UP' ? index - 1 : index + 1;
    const newState = [...state];
    newState.splice(index, 1);
    newState.splice(newIndex, 0, id);
    setState(newState);
  };

  const canMoveUp = (id: string) => {
    return state.indexOf(id) !== 0;
  };

  const canMoveDown = (id: string) => {
    return state[state.length - 1] !== id;
  };

  const getCurrnetIndex = (id: string) => {
    return state.indexOf(id);
  };

  return {
    changeOrder,
    canMoveDown,
    canMoveUp,
    getCurrnetIndex,
  };
};
```

First Inside this hook I use `useLocalStorage` custom hook to manage to store children's orders inside localStorage and update the localStorage when we call `changeOrder` function, I think everything is clear so let's go further.

### 3. Implement Orderable Item

Now we going to finish by consuming out `useOrderable` inside OrderableItem component which will has order functioanlty

#### **`components\OrderableItem.tsx`**

```jsx
import { useOrderable } from "../hooks/useOrderable";

export const OrderableItem = ({
  content,
  id,
  disableOrder,
}: OrderableItemProps) => {
  const { canMoveDown, canMoveUp, changeOrder, getCurrnetIndex } =
    useOrderable();
  return (
    <div className="flex-item" style={{ order: getCurrnetIndex(id) }}>
      {content}
      <div className="flex-item">
        <button
          disabled={disableOrder || !canMoveUp(id)}
          onClick={() => {
            changeOrder(id, "UP");
          }}
        >
          Up
        </button>
        <button
          disabled={disableOrder || !canMoveDown(id)}
          onClick={() => {
            changeOrder(id, "DOWN");
          }}
        >
          Down
        </button>
      </div>
    </div>
  );
};

type OrderableItemProps = {
  id: string;
  content: string;
  disableOrder?: Boolean;
};
```

In this component we use `useOrderable` custom hook which we implement it earlier and implement order functionality inside this component.

In the end we will modify `App.tsx` file and use OrderableItem , OrderableLayout components.

#### **`App.tsx`**

```jsx
import { OrderableItem } from './components/OrderableItem';
import { OrderableLayout } from './components/OrderableLayout';

function App() {
  return (
    <OrderableLayout>
      <OrderableItem id="ITEM_1" content="This is item one" />
      <OrderableItem id="ITEM_2" content="This is item two" />
      <OrderableItem id="ITEM_3" content="This is item three" />
    </OrderableLayout>
  );
}

export default App;
```

Here is the final result:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u21c9gpk6jfhpnafw4y0.png)

GitHub repo : [link](https://github.com/MostafaKMilly/order-react-components)

Thank you for reading and see you soon with another post 😊
