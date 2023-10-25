---
title: 'Render props pattern'
description: 'Dive deep into the Render Props design pattern in React and understand its significance in component composition and reusability.'
pubDate: '2023-10-25T21:29:28.431Z'
heroImage: '/images/renderprops.png'
categories: ['Design Patterns']
tags: ['Render Props', 'ReactJS', 'Component Composition', 'Reusability']
---

React render props is a technique used to share code between components, where a component accepts a function as a prop and calls that function to render its output. The function passed as a prop can be used to encapsulate complex logic, state, or functionality and provide it to child components.

![Image](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1614961728%2Fpatterns.dev%2Frender-props.jpg&w=3840&q=75)

### Basic Example

To write a render prop, you need to create a component that takes a function as a prop and passes it any necessary data. The function can then use that data to render the desired output. Here's an example:

```jsx
import "./styles.css";
import React, { useState } from "react";

const Mouse = ({
  render,
}: {
  render: (position: Position) => React.ReactElement,
}) => {
  const [position, setPosition] = useState < Position > { x: 0, y: 0 };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="mouse" onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  );
};

const App = () => (
  <div className="app">
    <Mouse
      render={(mouse) => (
        <div className="output">
          <h1>
            The mouse position is ({mouse.x}, {mouse.y})
          </h1>
        </div>
      )}
    />
  </div>
);

type Position = {
  x: number,
  y: number,
};

export default App;
```

As you can see I can change the render prop Inside Mouse component to whatever I like, In this I offer more flexibility on the rendering

<iframe src="https://codesandbox.io/s/little-resonance-ms31si?file=/src/App.tsx" 
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Render props design pattern">
</iframe>

### Render props and other libraries

It worth to mention that `render props` is pretty common design pattern between React developers and here are some common libraries that use `render props` pattern.

For example [Formik](https://formik.org/) is one of the most common form libraries that uses `render props` pattern

```jsx
import React from 'react';
import { Formik } from 'formik';

const App = () => {
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" onChange={handleChange} value={values.email} />
            <input type="password" name="password" onChange={handleChange} value={values.password} />
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default App;
```

As you can see we render our children as function (like we did on render prop on Mouse component) and get the props from Formik component which contains all the relevant form state and helper methods (such as values, handleChange, handleSubmit). Then render our form elements using these props.

And also [MUI](https://mui.com/) supports this pattern by providing `slots` prop to its DataGrid's and other components.

```jsx
<DataGrid
  rows={rows}
  columns={columns}
  slots={{
    columnMenu: MyCustomColumnMenu,
  }}
/>
```
