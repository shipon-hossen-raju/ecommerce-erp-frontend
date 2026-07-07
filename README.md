# Mini ERP – Frontend

React + TypeScript + Vite single-page application for the Mini ERP (Inventory & Sales Management System). Talks to the [backend API](../backend/README.md) via Redux Toolkit Query.

## Tech Stack

- React 19 + TypeScript
- Vite (build tool & dev server)
- React Router v7 (routing)
- Redux Toolkit + RTK Query (state management & API calls)
- Ant Design + Tailwind CSS (UI)
- React Hook Form + Zod (forms & validation)

## Prerequisites

- Node.js v18 or later
- npm
- The [backend API](../backend/README.md) running (locally or deployed)

## Setup

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Configuring the Backend URL

The API base URL is set in [`src/config/index.config.ts`](src/config/index.config.ts):

```ts
const config = {
  backendUrl: "https://ecommerce-erp-backend.vercel.app",
  // backendUrl: "http://localhost:5005",
};
```

Uncomment/edit the value to point at your local backend (default `http://localhost:5005`) or a deployed instance. All API calls are made to `${backendUrl}/api/v1`.

## Available Scripts

| Command           | Description                                      |
| ------------------ | ------------------------------------------------- |
| `npm run dev`      | Start the Vite dev server with HMR                |
| `npm run build`    | Type-check (`tsc -b`) and build for production    |
| `npm run preview`  | Preview the production build locally              |
| `npm run lint`     | Run ESLint over the project                        |

## Project Structure

```
src/
├── assets/            # Images and icons
├── components/        # Reusable UI components, grouped by feature
│   ├── AuthLayout/     # Layout wrapper for auth pages
│   ├── DashboardLayout/# App shell (Sidebar, Header) for authenticated pages
│   ├── auth/           # Login form
│   ├── dashboard/      # Dashboard charts & widgets
│   ├── product/        # Product create/edit/delete modals
│   ├── sale/           # Sale creation modal
│   ├── user/           # User create/edit/delete modals
│   ├── form/           # Generic form controls (input, select, checkbox, image upload, etc.)
│   ├── card/, loader/, ui/, validation/  # Shared UI primitives
├── config/            # Runtime configuration (backend URL)
├── constant/          # Shared constants (e.g. RTK Query tag types)
├── data/              # Static config data (e.g. sidebar links)
├── helper/            # Session/auth and validation helpers
├── pages/             # Route-level pages
│   ├── auth/           # LoginPage
│   ├── dashboard/      # DashboardPage
│   ├── products/       # ProductsPage
│   ├── sales/          # SalesPage
│   └── users/          # UsersPage
├── redux/
│   ├── store/          # Redux store setup
│   ├── hooks/          # Typed `useAppSelector` / `useAppDispatch` hooks
│   ├── utils/          # Query params generator for list endpoints
│   └── features/       # RTK Query API slices and feature state
│       ├── api/         # Base `apiSlice` (auth header, 401 handling)
│       ├── auth/        # Login API + auth state slice
│       ├── product/     # Product CRUD API
│       ├── sale/        # Sales API
│       ├── user/        # User management API
│       └── dashboard/   # Dashboard statistics API
├── routes/             # Route guards and router configuration
│   ├── routes.tsx       # `createBrowserRouter` route tree
│   ├── PrivateRoute.tsx # Redirects to /auth if not logged in
│   ├── PublicRoute.tsx  # Redirects to / if already logged in
│   └── NotFoundRoute.tsx
├── App.tsx
└── main.tsx
```

## Routing

| Path             | Access         | Page            |
| ---------------- | -------------- | --------------- |
| `/auth/signin`    | Public only     | Login           |
| `/`               | Authenticated   | Dashboard        |
| `/products`       | Authenticated   | Products         |
| `/sales`          | Authenticated   | Sales            |
| `/users`          | Authenticated   | User management  |
| `*`               | Any             | 404 Not Found    |

`PrivateRoute` and `PublicRoute` guard access based on whether a valid session token is present (see [`src/helper/SessionHelper.ts`](src/helper/SessionHelper.ts)).

## Authentication

- Login submits `{ email, password }` to the backend and stores the returned JWT.
- The JWT is attached as a `Bearer` token to every request via `apiSlice`'s `prepareHeaders`.
- On a `401` response, the session is cleared and the user is redirected to the login page.

## Roles

The UI adapts to the logged-in user's role, matching the backend's permission model:

| Role     | Access                                |
| -------- | --------------------------------------- |
| Admin    | Full access, including user management  |
| Manager  | Manage products, create sales           |
| Employee | View products, create sales             |

## Linting

ESLint is configured with `typescript-eslint`. To enable stricter, type-aware rules, update `eslint.config.js`:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    // or ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also add [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules.
