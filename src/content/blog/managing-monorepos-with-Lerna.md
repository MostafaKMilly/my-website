---
title: 'Managing Monorepos with Lerna v7'
description: 'Discover the power and nuances of Lerna v7 for managing monorepos, streamlining workflows, and boosting development efficiency.'
pubDate: '2023-10-25T05:31:43.654Z'
heroImage: '/images/htb8pvkxqtzc62ohlgv6.jpg'
categories: ['Monorepo Management']
tags: ['Lerna', 'Monorepos', 'Version Control', 'Software Tooling']
---

Hello! Today, we're diving into the world of monorepos and how to manage them using Lerna. If you've ever wanted to manage multiple packages within a single repository, then this tutorial is for you.

## What is a Monorepo?

A monorepo (monolithic repository) is a software development strategy where code for many projects is stored in a single repository. This approach can simplify dependency management, streamline code sharing, and improve collaboration.


## Why Lerna?

[Lerna](https://lerna.js.org/) is a popular tool for managing JavaScript projects with multiple packages. It optimizes the workflow around managing multi-package repositories with git and npm.

## Lerna v7: New Features and Improvements

With the release of Lerna v7, several significant changes and improvements have been introduced. Here's a breakdown of the new features:

### 1. **Legacy Package Management Commands Removed**

Lerna has decided to move away from its own package management commands. The `bootstrap`, `add`, and `link` commands are no longer included by default. Instead, it's recommended to use your package manager (npm, yarn, pnpm) for these tasks. This change emphasizes the importance of native package managers and reduces redundancy.

### 2. **Workspaces by Default**

Lerna v7 uses your package manager's workspaces configuration by default. The `useWorkspaces` flag has been removed, simplifying the setup. If you're using pnpm, ensure to set `"npmClient": "pnpm"` in your `lerna.json`.

### 3. **Initialization Changes**

The `lerna init` command has been modified. It can no longer be run on an existing Lerna repo. If you need to update your configuration, the `lerna repair` command is your go-to solution.

### 4. **Deprecated Options Removed**

Several long-deprecated options have been removed in v7. If you've been using any of these, it's essential to be aware and adjust your configurations. Running `lerna repair` can help migrate your configuration to the modern equivalents.

### 5. **Additional Features**

- **Schema Migration**: Lerna added migration for adding `$schema` and increased some strictness.
- **Custom Directory for `publish`**: The `publish` command now supports a custom directory per-package.
- **Dry Run for `init`**: The `init` command now supports a `--dryRun` flag, allowing you to preview file system changes before committing.

## Getting Started with Lerna

### 1. Installation

First, you need to install Lerna globally:

```bash
npm install -g lerna
```

### 2. Setting Up a New Lerna Repo

To initialize a new Lerna repo:

```bash
mkdir my-monorepo
cd my-monorepo
lerna init
```

This will create a `lerna.json` and `packages` directory in your project.

### 3. Adding Packages

Navigate to the `packages` directory and create your individual projects/packages:

```bash
cd packages
mkdir package-1 package-2
```

You can also use Lerna to create new packages:

```bash
lerna create package-name
```

### 4. Adding Dependencies

To add a dependency to a specific package:

```bash
lerna add module-name --scope=package-name
```

### 5. Install Your Packages

Lerna can link dependencies in the repo together:

```bash
npm install
```

This command will install all of the external dependencies in each package, and then it will symlink any cross-dependencies.

### 6. Running Scripts Across Packages

You can run npm scripts across all packages:

```bash
lerna run test
```

This will run the `test` npm script in each package that has it.

## Versioning with Lerna

Lerna offers two main modes of versioning:

1. **Fixed/Locked mode** (default): All packages will be versioned with the same version number.
2. **Independent mode**: Allows you to increment package versions independently.

To initialize a repo in independent mode:

```bash
lerna init --independent
```

or if you already create project just set the version key in lerna.json to independent to run in independent mode.

When you're ready to publish your packages:

```bash
lerna publish
```

In independent mode, Lerna will prompt you for the version number for each package that has changed.

## Benefits of Using Lerna with a Monorepo

1. **Simplified Management**: Manage multiple packages with a single `lerna.json` configuration.
2. **Atomic Changes**: Changes across multiple packages can be committed together, ensuring consistency.
3. **Shared Dependencies**: Common dependencies can be hoisted, reducing duplication and speeding up installs.
4. **Streamlined Development**: Easily test changes across dependent packages.

## Conclusion

Lerna is a powerful tool for managing monorepos, especially in the JavaScript ecosystem. It simplifies many of the challenges associated with managing multiple packages, making it easier to develop, test, and publish interdependent projects.

If you're considering a monorepo for your next project, give Lerna a try and see how it can streamline your development process!

Happy coding! 🚀