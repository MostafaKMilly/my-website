---
title: 'Composition desgin pattern'
description: 'Explore the power of the Composition design pattern in ReactJS, a technique that promotes modular component architecture and enhances reusability.'
heroImage: '/images/composition-desgin-pattern.png'
categories: ['Design Patterns']
tags: ['Composition Pattern', 'ReactJS', 'Component Composition', 'Modularity']
pubDate: '2023-10-25T21:43:53.410Z'
---

Composition design pattern is a common pattern used in React to create reusable and flexible components. This pattern involves building a component by combining several smaller components or "composing" them together to create a more complex one.

<video style="aspect-ratio: 16/9" muted="" playsinline="" src="/videos/composition.mp4" autoplay="" loop="" __idm_id__="16990209" width="100%"></video>

In this pattern, each smaller component is responsible for a specific feature or aspect of the overall component. These smaller components are then combined together to create a larger component that provides all the desired functionality.

Composition allows for better code reuse and maintainability because it promotes modularity and separation of concerns. Instead of having one large component that does everything, you can break down the functionality into smaller, more focused components, and then compose them together.

### Composition and props drilling

Composition is a technique in React that can help solve the problem of props drilling. Props drilling occurs when data needs to be passed down through multiple layers of components in order to reach a child component that needs it. This can lead to code that is hard to read, maintain, and debug.

Instead of passing down data through multiple layers of components, you can pass data and behavior down through props to the smaller, more focused components that need it. This allows for better code reuse and maintainability because you can easily replace or modify the smaller components without affecting the larger component.

> Note: to solve props drilling you can use context to pass your data through many layers of components.
> But as I said in useContext in hooks section, React docs dosent recommend to use context directly instead you can use composition pattern because is often simpler solution. See here: [Link](https://reactjs.org/docs/context.html#before-you-use-context)

> Props drilling is not a big issue to consider but if you pass props to up 4 levels your code will be hard to mantain and debug

#### Example

Let's say we have this components:

```jsx
function App() {
  const data = { name: 'John', age: 30 };

  return <Parent data={data} />;
}

function Parent({ data }) {
  return (
    <div>
      <h3>Parent component</h3>
      <Child data={data} />
    </div>
  );
}

function Child({ data }) {
  return (
    <div>
      <h3>Child component</h3>
      <p>
        Name: {data.name}, Age: {data.age}
      </p>
    </div>
  );
}
```

As you can see we are passing data object to Child component through passing props to Parent component even if the parent component it is not intersted in this data and it don't use it anyways.

The composition design pattern is exists to solve that kind of problem by move the children which intersted to this props above the parent component using `children` prop.

So our App component will became like this:

```jsx
function App() {
  const data = { name: 'John', age: 30 };

  return (
    <Parent>
      <Child data={data} />
    </Parent>
  );
}

function Parent({ children }) {
  return (
    <div>
      <h3>Parent component</h3>
      {children}
    </div>
  );
}

function Child({ data }) {
  return (
    <div>
      <h3>Child component</h3>
      <p>
        Name: {data.name}, Age: {data.age}
      </p>
    </div>
  );
}
```

As we can see above we pass the data object directly to the intersted component and we don't have props drilling issue.

`Note : We don't solve the props drilling issue only, but we inhance our application performance because if Parent rerender the children of the component won't be rendered`

As you see in the example below:

<iframe src="https://codesandbox.io/s/quirky-wozniak-0xtol3?file=/src/App.js" 
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Composition design pattern">
</iframe>
