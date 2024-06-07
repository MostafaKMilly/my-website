---
title: 'Next.js Fetching Strategies'
description: 'Delve into the efficient data-fetching strategies in Next.js that can enhance performance and user experience. Learn about parallel and sequential data fetching, preloading data, and how to implement these techniques with practical examples.'
heroImage: '/images/nextjs-datafetching.webp'
categories: ['Frontend']
tags: ['Webdev', 'React', 'Next.js', 'Data Fetching', 'Frontend']
pubDate: '2024-06-07T15:46:22.382Z'
---

# Next.js Fetching Strategies

Data fetching is essential in any Next.js project. When you start a new Next.js project, you should consider how to implement your data-fetching logic. Should you fetch data from the server or the client side?

In this blog post, I will explain how you can implement data fetching inside your Next.js project effectively.

## Fetching Data from the Server

Fetching data from the server has many benefits, and the [Next.js official documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#fetching-data-on-the-server) recommends fetching data from the server whenever possible.

The primary benefits of fetching data from the server include:

- **Security**: Sensitive information, like API keys, is not exposed to the client.
- **Performance**: Multiple requests can be handled in a single roundtrip, preventing users from seeing loaders and avoiding layout shifts due to client-side data fetching.

Now that we've discussed the benefits of server-side data fetching, let's explore how you can implement it.

## Parallel and Sequential Data Fetching

In web applications, data fetching can be done either sequentially or in parallel. Understanding the difference between these approaches and when to use each is crucial for optimizing performance.

### Sequential Data Fetching

Sequential data fetching involves making multiple data requests one after another. This approach ensures that each request is completed before the next one begins. While this guarantees data dependencies are resolved correctly, it can result in slower load times due to the waiting periods between requests.

You can mitigate this issue by using Next.js's [loader.tsx](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) or [React Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) to show instant loaders while your data is loading.

**Example: Sequential Data Fetching in Next.js**

```typescript
import UsersToolbar from "@/components/UsersToolbar";
import UserCard from "@/components/UserCard";
import { getPhotos, getUsers } from "@/lib/helpers";

export default async function UsersPage() {
  const users = await getUsers();
  const photos = await getPhotos();

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Users</h1>
      <UsersToolbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} photos={photos} />
        ))}
      </div>
    </div>
  );
}

import { getComments } from "@/lib/helpers";
import { Photo, User } from "@/lib/types";
import Image from "next/image";

interface UserCardProps {
  user: User;
  photos: Photo[];
}

const UserCard = async ({ user, photos }: UserCardProps) => {
  const comments = await getComments();
  return (...);
};

export default UserCard;
```

In this example, the user won't see anything until the last fetch (comments) is completed. Be cautious when fetching your data sequentially like this.

### Parallel Data Fetching

Parallel data fetching allows you to send multiple requests simultaneously without waiting for one to finish before starting the next. This can significantly improve your application's performance by reducing the total time needed to fetch all necessary data.

**Example: Parallel Data Fetching in Next.js**

```typescript
import UsersToolbar from "@/components/UsersToolbar";
import UserCard from "@/components/UserCard";
import { getPhotos, getUsers } from "@/lib/helpers";
import { Suspense } from "react";

export default async function UsersPage() {
  const [users, photos] = await Promise.all([getUsers(), getPhotos()]);

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Users</h1>
      <UsersToolbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<p>Loading...</p>}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} photos={photos} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}

import { getComments } from "@/lib/helpers";
import { Photo, User } from "@/lib/types";
import Image from "next/image";

interface UserCardProps {
  user: User;
  photos: Photo[];
}

const UserCard = async ({ user, photos }: UserCardProps) => {
  const comments = await getComments();
  return (...);
};

export default UserCard;
```

In this example, user and photo data are fetched simultaneously using `Promise.all`, reducing the total waiting time. The `UsersPage` component fetches both users and photos concurrently and uses the data to render a toolbar and a grid of user cards. The `UserCard` component fetches comments for each user when displayed, showing the user’s photo, name, and comments.

The `Suspense` component displays a loading message while the data is being fetched, providing immediate feedback to the user and improving the user experience. This combination of parallel data fetching and `Suspense` enhances the application’s efficiency and responsiveness, making it faster and more user-friendly.

## Client Data Fetching

When starting a new project with Next.js, avoid using third-party libraries for data fetching until it's absolutely necessary.

Take this advice from the [React Query official documentation](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr):

> It's hard to give general advice on when it makes sense to pair React Query with Server Components and not. If you are just starting out with a new Server Components app, we suggest you start out with any tools for data fetching your framework provides you with and avoid bringing in React Query until you actually need it. This might be never, and that's fine, use the right tool for the job!

In summary, stick with the built-in data fetching tools provided by Next.js until you identify a clear need for a third-party library.

## Conclusion

In this blog post, we explored various data-fetching strategies in Next.js, including both server-side and client-side approaches. Understanding when and how to use these techniques can significantly enhance the performance and user experience of your application.

Key takeaways:

1. **Server-Side Data Fetching**: Utilize server-side data fetching whenever possible to improve security and performance. This approach prevents the exposure of sensitive information and reduces the number of client-side requests.

2. **Sequential vs. Parallel Data Fetching**: Sequential data fetching ensures correct resolution of data dependencies but can result in slower load times. Parallel data fetching, on the other hand, can significantly speed up data retrieval by handling multiple requests simultaneously.

3. **Client-Side Data Fetching**: Start with the built-in data-fetching tools provided by Next.js. Avoid introducing third-party libraries like React Query until you have a clear need for them, following the principle of using the right tool for the job.

By thoughtfully implementing these strategies, you can create efficient, performant, and user-friendly Next.js applications. Happy coding!

For a practical implementation of these strategies, check out the accompanying GitHub repository: [Next.js Data Fetching Strategies](https://github.com/MostafaKMilly/nextjs-fetching-strategies).
