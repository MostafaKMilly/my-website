---
title: 'Pipelining and composition'
description: 'Delve into the foundational principles of functional programming, examining the integral roles of pipelining and composition in crafting efficient and readable code.'
pubDate: '2023-10-25T05:27:49.923Z'
heroImage: '/images/8pezq0q11awpr62ll023.jpg'
categories: ['Functional Programming']
tags: ['Pipelining', 'Composition', 'Functional Paradigm', 'Code Efficiency']
---

Pipelining and Composition are two fundamental concepts in software development that allow developers to build complex and scalable systems by breaking them down into smaller, modular parts.

### Pipelining

Pipelining is the process of chaining together multiple functions or operations so that the output of one function becomes the input of the next. This approach is commonly used in data processing and transformation, where large volumes of data are processed in a series of steps.

#### Basic example

Let's say we have a dataset containing information about books, and we want to filter the books by author, sort them by publication date, and select only the title and publication date fields. We could write a single function to perform all of these operations, but this would make the code difficult to read and maintain.

Instead, we can use a pipeline to break the task down into smaller steps and apply each step in sequence. Here's an example:

```js
import _ from 'lodash';

const data = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J.K. Rowling',
    publicationDate: '1997-06-26',
  },
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    publicationDate: '1998-07-02',
  },
  {
    title: 'Harry Potter and the Prisoner of Azkaban',
    author: 'J.K. Rowling',
    publicationDate: '1999-07-08',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    publicationDate: '1937-09-21',
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    publicationDate: '1954-07-29',
  },
];

const pipeline = _.flow(
  // Step 1: Filter books by author
  (books) => books.filter((book) => book.author === 'J.K. Rowling'),

  // Step 2: Sort books by publication date
  (books) => _.sortBy(books, 'publicationDate'),

  // Step 3: Select title and publication date fields
  (books) =>
    books.map((book) => ({
      title: book.title,
      publicationDate: book.publicationDate,
    }))
);

const filteredBooks = pipeline(data);
```

As you can see by breaking the task down into smaller steps and using a pipeline to process the data, we can make the code easier to read and maintain. Each step in the pipeline is self-contained and can be tested and modified independently, which makes the code more modular and flexible. Additionally, using pipelines **allows us to easily add or remove steps as needed**, without having to modify a monolithic function.

### Composing

Composing is quite similar to pipelining, but has its roots in mathematical theory.
The concept of composition is simply—a sequence of function calls, in which the output of one
function is the input for the next one—but the order is reversed from the one in pipelining.

So, if you have a series of functions, from left to right, when pipelining, the first function of
the series to be applied is the leftmost one, but when you use composition, you start with
the rightmost one

#### Reimplemention of pipelining example

You can transform our example to compostion by using `flowRight` method instead of `flow` and change the order of the functions

```js
import _ from 'lodash';

const data = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J.K. Rowling',
    publicationDate: '1997-06-26',
  },
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    publicationDate: '1998-07-02',
  },
  {
    title: 'Harry Potter and the Prisoner of Azkaban',
    author: 'J.K. Rowling',
    publicationDate: '1999-07-08',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    publicationDate: '1937-09-21',
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    publicationDate: '1954-07-29',
  },
];

const compose = _.flowRight(
  // Step 3: Select title and publication date fields
  (books) =>
    books.map((book) => ({
      title: book.title,
      publicationDate: book.publicationDate,
    })),
  // Step 2: Sort books by publication date
  (books) => _.sortBy(books, 'publicationDate'),

  // Step 1: Filter books by author
  (books) => books.filter((book) => book.author === 'J.K. Rowling')
);

const filteredBooks = compose(data);
```

As you can see using pipelines allows us to easily add or remove steps as needed, without having to modify a monolithic function. Composing is quite similar to pipelining, but has its roots in mathematical theory. The concept of composition is simply a sequence of function calls in which the output of one function is the input for the next one, but the order is reversed from the one in pipelining.
