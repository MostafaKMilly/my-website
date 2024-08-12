---
title: 'Transitioning from React.js to React Native'
description: 'This in-depth guide is designed for React.js developers who are interested in exploring mobile app development with React Native. Learn about the similarities, differences, and best practices, and see practical examples to help you get started.'
heroImage: '/images/react-native.webp'
categories: ['Mobile Development', 'Frontend']
tags: ['React Native', 'React.js', 'Mobile Development', 'Frontend']
pubDate: '2024-08-13T15:46:22.382Z'
---

# Transitioning from React.js to React Native

As a React.js developer, you already have a powerful toolkit for building user interfaces. After working with React.js for a while, I decided to explore React Native to expand my skillset into mobile development. The journey has been both challenging and rewarding, and I’m excited to share what I’ve learned so far.

## The shared things between React.js and React Native

Both React.js and React Native are based on the same core principles:

- **Component-Based Architecture**: Components are the building blocks of both React.js and React Native. You’ll continue to build UIs using components, with props to pass data and state to manage internal component data.
- **JSX**: JSX, a syntax extension that allows you to write HTML-like code in JavaScript, is used in both React.js and React Native. This familiarity will make your transition smoother.

- **State and Props**: The concepts of state and props remain consistent between React.js and React Native. You’ll manage the data flow in your app the same way you do in React.js.

## Key Differences Between React.js and React Native

While there are many similarities, React Native introduces new concepts and components that are specific to mobile development. Understanding these differences is crucial to effectively building mobile applications.

### 1. **No DOM, No HTML Elements**

In React.js, you work with HTML elements like `<div>`, `<span>`, and `<button>`. However, React Native uses different components that are designed for mobile platforms:

- **`<View>`**: This is the most common container component in React Native, analogous to a `<div>` in React.js.
- **`<Text>`**: Used for displaying text, similar to `<p>` or `<span>`. In React Native, all text must be wrapped in a `<Text>` component.

- **`<TouchableOpacity>`**: This component is used for creating clickable elements, similar to `<button>` in React.js, but with the added feature of opacity changes on press to provide feedback.

#### Example: Converting a Web Component to React Native

**React.js Component:**

```javascript
import React from 'react';

const WebComponent = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f2f2f2' }}>
      <h1>Hello, World!</h1>
      <button onClick={() => alert('Button Clicked!')}>Click Me</button>
    </div>
  );
};

export default WebComponent;
```

**React Native Equivalent:**

```javascript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MobileComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello, World!</Text>
      <TouchableOpacity onPress={() => alert('Button Clicked!')} style={styles.button}>
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MobileComponent;
```

### 2. **Styling**

In React.js, you typically use CSS or CSS-in-JS libraries for styling. React Native, on the other hand, uses a JavaScript object for styling through the `StyleSheet` API. The styling is similar but has its own set of properties tailored to mobile devices.

#### Example: Styling in React Native

**React.js CSS:**

```css
.container {
  padding: 20px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.heading {
  font-size: 24px;
  margin-bottom: 20px;
}

.button {
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
  color: white;
}
```

**React Native StyleSheet:**

```javascript
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});
```

### 3. **Handling User Input**

In React.js, you handle user input through elements like `<input>`, `<textarea>`, and event handlers like `onChange`. In React Native, these are replaced with components like `<TextInput>`, and you handle events through props like `onChangeText`.

#### Example: Handling User Input

**React.js Input Example:**

```javascript
import React, { useState } from 'react';

const WebForm = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <p>You typed: {inputValue}</p>
    </div>
  );
};

export default WebForm;
```

**React Native Equivalent:**

```javascript
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const MobileForm = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={inputValue} onChangeText={setInputValue} placeholder="Type here..." />
      <Text>You typed: {inputValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default MobileForm;
```

### 4. **Navigation**

In web development with React.js, you might use React Router for navigation. In React Native, navigation is handled by libraries like React Navigation, which provides a stack, tab, and drawer navigations to mimic the native behavior of mobile apps.

#### Example: Setting Up Basic Navigation

**Installing React Navigation:**

```bash
npm install @react-navigation/native
npm install @react-navigation/stack
```

**Basic Navigation Example:**

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
};

const DetailsScreen = () => {
  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
```

## Tools to Explore in React Native

### **Expo**

Expo is a powerful toolchain built around React Native that helps you start and develop your React Native projects quickly. It comes with a set of tools and services designed to simplify development and testing.

**Benefits of Expo:**

- **No Need for Xcode or Android Studio**: With Expo, you can run your app on your device or in the Expo Go app without needing native development tools.
- **Easy Testing**: Share your project with others by just sharing a URL. They can open it in their Expo Go app.
- **Built-in Components and APIs**: Expo provides access to a wide range of native APIs and components without needing to write native code.

### **React Native CLI**

For developers who want more control over their React Native projects, the React Native CLI is a great alternative to Expo. The CLI allows you to directly interact with native code and gives you the flexibility to include custom native modules.

**Benefits of React Native CLI:**

- **Full Native Module Support**: Unlike Expo, which has limitations on using custom native modules, the React Native CLI allows you to integrate any native module, providing complete control over your project's native code.
- **Direct Access to Native Projects**: When using the React Native CLI, you get direct access to the iOS and Android project files, enabling you to make platform-specific customizations.

- **Greater Flexibility**: If your project requires custom native code or you need to integrate third-party native libraries, the React Native CLI is the preferred choice.

### **Choosing Between Expo and React Native CLI**

- **Use Expo** if you want to get started quickly, don’t need custom native modules, and prefer a simplified development process.
- **Use React Native CLI** if you need full access to native code, plan to integrate custom native modules, or want to build a production-level app with more flexibility.

## Conclusion

Transitioning from React.js to React Native is a rewarding journey that allows you to expand your development skills into the mobile domain. By leveraging the knowledge you already have, understanding the key differences, and using the right tools and libraries, you can create high-quality, cross-platform mobile apps that feel native on both iOS and Android.

For further reading, check out the [React Native documentation](https://reactnative.dev/docs/getting-started) and start experimenting with these concepts.
