---
title: 'Storybook Component Story Format 3: A Side-By-Side Comparison'
description: 'Uncover the nuances of Storybook Component Story Format (CSF) 3. Dive deep into its features, benefits, and contrasts with its predecessors.'
pubDate: '2023-10-25T05:38:10.606Z'
heroImage: '/images/storybook.png'
categories: ['Documentation']
tags: ['Storybook', 'Component Design', 'UI Development', 'CSF 3']
---

Storybook has recently released a new story format, Component Story Format 3 (CSF3), which promises to be a game-changer in terms of developer productivity and code maintainability. If you're still using CSF2 and curious about what's new in CSF3, then you're in the right place!

In this article, we will explore the new features offered by CSF3 and compare them side-by-side with the older CSF2 format.

## The Context

Before diving into the code, let's briefly discuss why CSF3 is a significant milestone. According to Michael Shilman, the developer advocate at Storybook, the new format offers:

- Spreadable story objects for easy extensibility
- Default render functions for brevity
- Automatic titles for convenience
- Play functions for scripted interactions and tests

And more importantly, CSF3 is 100% backwards compatible with CSF2.

## Example: A Simple Button Component

Let's say we have a Button component that we're showcasing using Storybook. Below are examples in both CSF2 and CSF3.

### CSF2 Version

```javascript
// Button.stories.js (CSF2)
import React from 'react';
import { Button } from './Button';

export default {
  title: 'components/Button',
  component: Button,
};

export const DefaultButton = () => <Button label="Click Me" />;
export const DisabledButton = () => <Button label="Click Me" disabled />;
```

### CSF3 Version

```javascript
// Button.stories.js (CSF3)
import { Button } from './Button';

export default {
  component: Button,
};

export const DefaultButton = {
  args: {
    label: 'Click Me',
  },
};
export const DisabledButton = {
  args: {
    label: 'Click Me',
    disabled: true,
  },
};
```

## Notable Differences

### Boilerplate Reduction

CSF3 reduces the amount of boilerplate code by using story objects and default render functions. As you can see in the example, you don't have to manually write the render function in CSF3 if it's straightforward.

### Spreadable Story Objects

With CSF3, it's easy to extend existing stories, which is a blessing for DRY (Don't Repeat Yourself) lovers. Let's consider an example:

#### CSF2 Version

```javascript
export const PrimaryButton = () => <Button label="Primary" variant="primary" />;
export const SecondaryButton = () => <Button label="Secondary" variant="secondary" />;
```

#### CSF3 Version

```javascript
export const PrimaryButton = {
  args: {
    label: 'Primary',
    variant: 'primary',
  },
};
export const SecondaryButton = {
  ...PrimaryButton,
  args: {
    ...PrimaryButton.args,
    label: 'Secondary',
    variant: 'secondary',
  },
};
```

### Play Functions for Scripted Interactions

One of the significant enhancements in CSF3 is the ability to simulate user interactions using play functions.

```javascript
// CSF3
export const PlayButton = {
  args: { label: 'Play' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText('Play');
    await userEvent.click(button);
  },
};
```

## Upgrading to CSF3

The good news is, upgrading is relatively straightforward. If you're on Storybook 7, you can run the codemod to migrate automatically:

```bash
npx storybook@next migrate csf-2-to-3 --glob="**/*.stories.js"
```

## Conclusion

CSF3 offers a series of improvements over CSF2 that promise better ergonomics and maintainability. So why wait? Upgrade your stories today and enjoy a more streamlined development experience!

For more details, refer to the official [Storybook documentation](https://storybook.js.org/).
