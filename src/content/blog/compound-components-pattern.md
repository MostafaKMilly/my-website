---
title: 'Compound Components Pattern in React'
description: 'Delve into the Compound Components pattern in React, a paradigm that enhances component flexibility and encapsulation.'
pubDate: '2023-10-25T21:30:28.431Z'
heroImage: '/images/compound-pattern.png'
categories: ['Design Patterns']
tags: ['Compound Components', 'ReactJS', 'Component Encapsulation', 'Modularity']
---

`Compound Components` is a design pattern in React that allow you to create a set of components that work together to achieve a common goal. These components share state and functionality, and they are usually composed in a parent component that controls their behavior.

![Image](https://res.cloudinary.com/ddxwdqwkr/image/upload/f_auto/v1614961725/patterns.dev/compound-pattern.jpg)

One way to implement Compound Components in React is by using the Context API. The Context API provides a way to pass data down the component tree without having to pass props through every level of the tree. It allows you to create a "global" data store that can be accessed by any component in the tree, regardless of its position.

### Basic example

Here's an example of how to use the Context API to implement Compound Components in React:

```jsx
import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  const value = { activeTab, setActiveTab };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

function TabButton({ index, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button onClick={() => setActiveTab(index)} className={activeTab === index ? 'active' : ''}>
      {children}
    </button>
  );
}

function TabContent({ index, children }) {
  const { activeTab } = useContext(TabsContext);

  return <div style={{ background: activeTab === index ? 'red' : 'inherit' }}>{children}</div>;
}

// compound our Tabs components because it share the same state and logic
Tabs.TabButton = TabButton;
Tabs.TabContent = TabContent;

function TabsComponent() {
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'];

  return (
    <Tabs>
      {tabs.map((tab, index) => (
        <Tabs.TabButton index={index} key={tab}>
          <Tabs.TabContent index={index}>{tab}</Tabs.TabContent>
        </Tabs.TabButton>
      ))}
    </Tabs>
  );
}

export default TabsComponent;
```
