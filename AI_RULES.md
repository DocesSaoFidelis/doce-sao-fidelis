# AI Rules for Doces São Fidélis Application

This document outlines the technical stack and specific library usage rules to ensure consistency, maintainability, and best practices when developing this application.

## Tech Stack

*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and developer experience.
*   **Vite**: A fast build tool that provides an instant development server and bundles code for production.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
*   **shadcn/ui**: A collection of reusable components built with Radix UI and styled with Tailwind CSS.
*   **React Router**: A standard library for routing in React applications.
*   **TanStack Query**: A powerful library for data fetching, caching, and synchronization.
*   **Lucide React**: A library providing a set of beautiful and customizable SVG icons.
*   **React Hook Form & Zod**: Libraries for efficient form management and schema-based validation.
*   **Sonner**: A modern toast component for displaying notifications.
*   **Supabase**: An open-source Firebase alternative for backend services, including database and authentication.

## Library Usage Rules

To maintain a consistent and high-quality codebase, please adhere to the following rules for library usage:

*   **UI Components**: Always prioritize `shadcn/ui` components for building the user interface. If a specific component is not available or requires significant customization, create a new component in `src/components/` and style it using Tailwind CSS. **Do not modify files within `src/components/ui`**.
*   **Styling**: All styling must be done using **Tailwind CSS** utility classes. Avoid inline styles or custom CSS files (beyond `src/index.css` for global styles). Ensure designs are responsive by default.
*   **Routing**: Use `react-router-dom` for all client-side navigation. All main application routes should be defined within `src/App.tsx`.
*   **Data Fetching & State Management**: For server state management and data fetching, use **TanStack Query**.
*   **Icons**: Use icons from the **`lucide-react`** library.
*   **Forms & Validation**: Implement forms using **`react-hook-form`** for state management and validation. Use **`zod`** for defining form schemas and validation rules, integrating it with `react-hook-form` via `@hookform/resolvers`.
*   **Notifications**: For displaying user feedback and notifications, use the **`sonner`** toast component.
*   **Supabase Integration**: Interact with Supabase services using the client provided in `src/integrations/supabase/client.ts`.
*   **Component Structure**: Create a new file for every new component or hook, no matter how small. Aim for components that are concise and focused on a single responsibility.
*   **File Paths**: Adhere to the established directory structure: `src/pages/` for pages, `src/components/` for reusable components, `src/hooks/` for custom hooks, and `src/lib/` for utility functions.