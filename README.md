# Exam User Sync

This is a **take-home assessment** for a **Full Stack Developer role** that I am interested **in**.

---

## Local Setup

1. Clone the repository here: `https://github.com/markcruz389/exam-user-sync`.
2. In the project's root directory, run `pnpm install`. Make sure you have **pnpm** installed on your system.
3. In the project's root directory, create a `.env.local` file. Copy the variables needed from the `env-example` file included in **the repo**. Note that some variables are secrets, so I'll provide **them** in a separate file that will be shared only for people that have permissions.

---

## Run Locally

1. In the project's root directory, run `pnpm run dev`.
2. Open a browser and navigate to `http://localhost:3000`. You should be navigated to the `/sync-dashboard` page.

---

## Technologies Used and Architectural Choices

### 1. Supabase _(Database)_ with Supabase JS _(Query Builder)_

- I decided to use this for efficiency and development speed since I am used to using this whenever I need to work on something fast, like creating an **MVP** or **Proof of Concept**. Also, since **Supabase** is an all-in-one backend solution, it's easy to create future features that can be added **to** this app, such as _(Authentication, Realtime Updates, Cloud Storage, and Database Migrations)_.
- I made sure to generate the database types using **Supabase CLI** to have type checking for each **Supabase** query I create **with** Supabase JS.
- I also enabled **RLS** _(Row Level Security)_ in the `users` table for an added layer of security. For this to work, I used a **service role key** instead of an anonymous key when creating the **Supabase JS** query client. This way I can enable **RLS** and disable any access for anonymous users. I just need to make sure that I only create the **Supabase** client in a server environment, such as **Server Actions** and **Route Handlers**, so that my **service role key** won't be exposed **on** the client side.

| Pros                            | Cons                        |
| :------------------------------ | :-------------------------- |
| **Faster development**          | **Possible vendor lock-in** |
| **All-in-one backend provider** |                             |

### 2. TanStack Query _(Data fetching & State management)_

- I decided to use this for simple handling of cache and query state. I know that there's another recommended way to do data fetching in **Next.js**, which uses **React's `use` hook**. I'm still new to that, so I opted to use what I'm most comfortable with.

| Pros                                               | Cons                      |
| :------------------------------------------------- | :------------------------ |
| **Simplified data fetching and state management.** | **Additional dependency** |
| **Automatic caching and deduplication.**           |                           |

### 3. ShadcnUI _(Headless Components)_ & TailwindCSS _(Styling)_

- **This** choice I made **because** it's what I'm most comfortable working with. Also, these are popular choices when creating a **web app** nowadays.

| Pros                           | Cons                   |
| :----------------------------- | :--------------------- |
| **No vendor lock-in**          | **Maintenance burden** |
| **Improves development speed** |                        |

### 4. Zod _(Validation Library)_

- I decided to use **Zod** for validating **API** payloads and responses for **an** added layer of runtime checking.

| Pros                      | Cons                      |
| :------------------------ | :------------------------ |
| **Runtime type checking** | **Additional dependency** |

---

## Notes

- **Anti-pattern**: using server actions with route handlers. Ideally, we can just use server actions, but in this case, we are demonstrating hitting an **API** endpoint.
