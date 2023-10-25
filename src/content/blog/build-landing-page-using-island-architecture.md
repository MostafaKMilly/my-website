---
title: 'Build landing page using Island Architecture'
description: 'Delve into the innovative world of Island Architecture as we guide you step-by-step through the process of creating an effective and responsive landing page. Discover the principles and best practices of this modern design methodology, ensuring an optimized user experience and streamlined performance. Perfect for both beginners and seasoned developers looking to stay ahead in the ever-evolving landscape of web design.'
heroImage: '/images/island-architecture.png'
categories: ['Frontend']
tags: ['Webdev', 'Architecture', 'Frontend', 'Astro']
pubDate: '2023-10-24T21:51:52.477Z'
---

`Island architecture` is a software architecture pattern that involves creating small, isolated, and self-contained modules, or "islands," that can communicate with each other through well-defined interfaces. Each island is designed to perform a specific function or set of related functions, and can be developed and maintained independently of the other islands. This makes it easier to build complex systems that are flexible, scalable, and maintainable over time.

### What is Astro

Astro is a static site generator that is designed to help developers build modern, performant websites using a component-based architecture. It uses a combination of HTML, CSS, and JavaScript to generate static pages that can be hosted on a server or served from a content delivery network (CDN).

To use Astro with the island architecture pattern, you can break your website or web application into a set of islands, with each island representing a distinct feature or set of features. You can then use Astro to generate static pages for each island, along with the necessary JavaScript and CSS files, and deploy them to a CDN or server.

![Island](https://blog.logrocket.com/wp-content/uploads/2022/12/Astro-islands-architecture.png)

### Getting started

In this tutorial, you will learn how to create simple Astro page which contains multiple islands.

The target of this tutorial to build a simple landing page using Reactjs,Solidjs,Svelete and Vuejs.

#### Step 1: Set up the project

First, create a new Astro project using the following command:

```bash
npm create astro@latest
```

For React Integration you can use the following command:

```bash
npx Astro add react
```

For Solidjs integration you can use the following command:

```bash
npx Astro add solid
```

For Vuejs integration you can use the following command:

```bash
npx Astro add vue
```

Last for Svelete integration you can use the following command:

```bash
npx Astro add svelte
```

#### Step 2: building layout component in Svelte

- First create file under `src/layouts` and name it as `Layout.svelte`

**layouts/Layout.svelte**

```html
<div class="container">
  <slot />
</div>

<style>
  .container {
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: 100%;
  }
</style>
```

In this component we create wrapper component for all our components.

By using `<slot />` I can inject the children's components into the Layout Svelete component (It's kind of children prop inside Reactjs)

After creating the layout component, we can import it into our index.astro page under pages folder:

**pages/index.astro**

```markdown
---
import Layout from "../layouts/Layout.svelte";
---

<Layout client:load>
</Layout>
```

- `client:load` directive enables to load and hydrate our layout component immediately as soon as possible.

> You can learn more about client directives in this [link](https://docs.astro.build/en/reference/directives-reference/#client-directives)

#### Step 3: Create a header component using Vuejs

- First create file under `src/components` and name it as `Header.vue`

**components/Header.vue**

```html
<template>
  <header>
    <h1>{{ title }}</h1>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
    color: #262525;
  }

  h1 {
    margin: 0;
    font-size: 2rem;
  }

  nav ul {
    list-style: none;
    display: flex;
  }

  nav li {
    margin-right: 1rem;
  }

  nav a {
    color: #262525;
    text-decoration: none;
    font-weight: bold;
  }
</style>
```

After that we can import our `Header` Vuejs component into our Astro page:

**pages/index.astro**

```markdown
---
import Layout from "../layouts/Layout.svelte";
import Header from "../components/Header.vue";
---

<Layout client:load>
  <Header title="Astro Islands" client:visible />
</Layout>
```

As you can see, I can pass props to vue Header component.

`client:visible is also client directive to load the component only if its visible on the user viewport`

#### Step 4: Create hero section using Solidjs

- First create file under `src/components` and name it as `Hero.tsx`

**components/Hero.tsx**

```tsx
import { createSignal } from 'solid-js';

function Hero() {
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  return (
    <div class="hero" style="padding: 3rem;">
      <div
        class="hero-content"
        style="background-color: #fff; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); margin-top: -4rem; z-index: 1;"
      >
        <div style="display : flex; column-gap:20px; margin-top : 8px">
          <img src="./hero.svg" alt="Hero image" style="max-width: 200px; height: auto; border-radius: 8px;" />
          <div>
            <h1 style="font-size: 3rem; margin-bottom: 1rem;">Welcome to our website</h1>
            <p style="font-size: 1.5rem; margin-bottom: 2rem;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            {!isLoggedIn() && (
              <button
                onClick={handleLogin}
                style="background-color: #007bff; color: #fff; padding: 1rem 2rem; border: none; border-radius: 4px; font-size: 1.2rem; cursor: pointer;"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
```

After that we can import our `Hero` Solidjs component into our Astro page:

**pages/index.astro**

```markdown
---
import Layout from "../layouts/Layout.svelte";
import Header from "../components/Header.vue";
import Hero from "../components/Hero.tsx";
---

<Layout client:load>
  <Header title="Astro Islands" client: visible />
  <Hero client:visible />
</Layout>
```

#### Step 5: Create contact us form using Reactjs

- First create file under `src/components` and name it as `ContactForm.tsx`

**components/ContactForm.tsx**

```tsx
import React, { useState } from 'react';
import './ContactForm.css';

type ContactFormProps = {
  onSubmit?: (name: string, email: string, message: string) => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(name, email, message);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__field">
        <label className="contact-form__label">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          required
          className="contact-form__input"
        />
      </div>
      <div className="contact-form__field">
        <label className="contact-form__label">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
          className="contact-form__input"
        />
      </div>
      <div className="contact-form__field">
        <label className="contact-form__label">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          required
          className="contact-form__textarea"
        ></textarea>
      </div>
      <button type="submit" className="contact-form__submit">
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
```

After that we can import our `ContactForm` Reactjs component into our Astro page:

```markdown
---
import Layout from "../layouts/Layout.svelte";
import Header from "../components/Header.vue";
import Hero from "../components/Hero.tsx";
import ContactForm from "../components/ContactForm.tsx";
---

<Layout client:load>
  <Header title="Astro Islands" client:visible />
  <Hero client:visible />
  <ContactForm client:visible />
</Layout>
```

#### Step 6: Create footer component using Svelte

Last thing we want to create a footer component using Svelte so we will create our footer component file:

**components/Footer.svelte**

```html
<footer class="footer">
  <nav class="footer__nav">
    <a href="#" class="footer__link">Home</a>
    <a href="#" class="footer__link">About</a>
    <a href="#" class="footer__link">Contact</a>
  </nav>
  <p class="footer__text">&copy; 2023 Astro Islands. All rights reserved.</p>
</footer>

<style>
  .footer {
    background-color: #f8f8f8;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer__nav {
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
  }

  .footer__link {
    color: #333;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.2rem;
    transition: color 0.2s ease-in-out;
  }

  .footer__link: hover {
    color: #007bff;
  }

  .footer__text {
    font-size: 0.9rem;
    color: #333;
    margin-top: 10px;
  }
</style>
```

Last thing we should modify our Astro page to include our Svelte Footer:

```markdown
---
import Layout from "../layouts/Layout.svelte";
import Header from "../components/Header.vue";
import Hero from "../components/Hero.tsx";
import ContactForm from "../components/ContactForm.tsx";
import Footer from "../components/Footer.svelte";
---

<Layout client: load>
  <Header title="Astro Islands" client:visible />
  <Hero client:visible />
  <ContactForm client:visible />
  <Footer client:visible />
</Layout>
```

In this way you create simple landing page using Reactjs, Vuejs , Solidjs and Svelte.

This is repository link: [Link](https://github.com/MostafaKMilly/Astro-Islands)

Thank you for reading, and see you soon with another post ❤️
