# E-Commerce Store

A modern e-commerce application built with React, TypeScript, Redux Toolkit, and Tailwind CSS.

## Features

- Product filtering by categories (food, clothing, electronics)
- Product sorting by name and price
- Persistent filter state in URL query parameters
- Shopping cart with quantity management
- Memoized components for better performance
- Responsive design

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit for state management
- React Router for routing
- Tailwind CSS for styling
- JSON Server for mock API

## Setup

1. Install dependencies:

```bash
cd client
npm install
cd ../server
npm install
```

2. Start the mock server:

```bash
cd server
npm start
```

3. Start the development server:

```bash
cd client
npm run dev
```

The application will be available at http://localhost:5173

## Project Structure

```
client/
  ├── src/
  │   ├── components/     # React components
  │   ├── store/         # Redux store and slices
  │   ├── types/         # TypeScript types
  │   ├── App.tsx        # Main application component
  │   └── main.tsx       # Application entry point
  └── server/
      └── db.json        # Mock data
```

## Development

- The mock server runs on port 3001
- The development server runs on port 5173
- Filter state is persisted in URL query parameters
- Components are memoized to prevent unnecessary re-renders
