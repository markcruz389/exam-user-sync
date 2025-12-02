# Exam User Sync

This is a **take-home assessment** for a **Full Stack Developer role** that I am interested **in**.

---

## Local Setup

1. Clone the repository here: `https://github.com/markcruz389/exam-user-sync`.
2. In the project's root directory, run `pnpm install`. Make sure you have **pnpm** installed on your system.
3. In the project's root directory, create a `.env.local` file. Copy the variables needed from the `env-example` file included in **the repo**. _Note that some variables are secrets, so I'll provide **them** in a separate file that will be shared only for people that have permissions._

---

## Run Locally

1. In the project's root directory, run `pnpm run dev`.
2. Open a browser and navigate to `http://localhost:3000`. You should be navigated to the `/sync-dashboard` page.

---

## Technologies Used and Architectural Choices

### 1. PNPM _(Package Manager)_

- I decided to use **PNPM** since it's faster and more efficient compared to **NPM**. I also like that it has excellent monorepo support.

| Pros                     | Cons                  |
| :----------------------- | :-------------------- |
| **Faster installations** | **Smaller ecosystem** |
| **Efficient disk space** |                       |

### 2. Supabase _(Database)_ with Supabase JS _(Query Builder)_

- I decided to use this for efficiency and development speed since I am used to using this whenever I need to work on something fast, like creating an **MVP** or **Proof of Concept**. Also, since **Supabase** is an all-in-one backend solution, it's easy to create future features that can be added **to** this app, such as _(Authentication, Realtime Updates, Cloud Storage, and Database Migrations)_.
- I made sure to generate the database types using **Supabase CLI** to have type checking for each **Supabase** query I create **with** Supabase JS.
- I also enabled **RLS** _(Row Level Security)_ in the `users` table for an added layer of security. For this to work, I used a **service role key** instead of an anonymous key when creating the **Supabase JS** query client. This way I can enable **RLS** and disable any access for anonymous users. I just need to make sure that I only create the **Supabase** client in a server environment, such as **Server Actions** and **Route Handlers**, so that my **service role key** won't be exposed **on** the client side.

| Pros                            | Cons                        |
| :------------------------------ | :-------------------------- |
| **Faster development**          | **Possible vendor lock-in** |
| **All-in-one backend provider** |                             |

### 3. TanStack Query _(Data fetching & State management)_

- I decided to use this for simple handling of cache and query state. I know that there's another recommended way to do data fetching in **Next.js**, which uses **React's `use` hook**. I'm still new to that, so I opted to use what I'm most comfortable with.

| Pros                                               | Cons                      |
| :------------------------------------------------- | :------------------------ |
| **Simplified data fetching and state management.** | **Additional dependency** |
| **Automatic caching and deduplication.**           |                           |

### 4. ShadcnUI _(Headless Components)_ & TailwindCSS _(Styling)_

- **This** choice I made **because** it's what I'm most comfortable working with. Also, these are popular choices when creating a **web app** nowadays.

| Pros                           | Cons                   |
| :----------------------------- | :--------------------- |
| **No vendor lock-in**          | **Maintenance burden** |
| **Improves development speed** |                        |

### 5. Zod _(Validation Library)_

- I decided to use **Zod** for validating **API** payloads and responses for **an** added layer of runtime checking.

| Pros                      | Cons                      |
| :------------------------ | :------------------------ |
| **Runtime type checking** | **Additional dependency** |

---

## Notes

- **Anti-pattern**: using server actions with route handlers. Ideally, we can just use server actions, but in this case, we are demonstrating hitting an **API** endpoint.

## AI Usage

- I used **Cursor** while working on this project and switched between **Gemini 3** and **Composer 1** models. I did not **"vibe code"** this project; instead, I used an **AI-Assisted** approach. I only used AI for things that I think I already know how to implement but would take more time if I did it myself, since it's no secret that **LLMs** are way faster when it comes to creating and generating code. For example, when creating the functionality for fetching and displaying the users, I already had in my mind what the pieces needed to implement it were _(table component, API route, custom hook for data fetching, state management, loading and error states, etc...)_. So I just instructed the **LLM** to create the pieces needed to implement the feature. After it generated the code, I made sure to check that it aligned with what I had in my mind. I then tested it to ensure that it worked. Whenever there was something that the **LLM** generated or implemented that was unfamiliar to me, I did my own research to understand why it was used and learn from it.

- Aside from generating code, I also heavily use AI in creating documentations. I usually ask for an example on how to document or a template.

- In my opinion, every developer should be able to leverage the use of AI tools when working on a project. If used in the right way _(not just "vibe coding")_, the speed of development as well as learning will be boosted multiple times.
