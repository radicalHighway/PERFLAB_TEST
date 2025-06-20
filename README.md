# PERFLAB_FOR_MENTOR

A modern e-commerce application built with React, TypeScript, Redux Toolkit, Express, Sequelize, Node.JS.

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
- EXPRESS + SEQUELIZE Server 

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
└── src/
    ├── app/           # Инициализация приложения (App.tsx, роутинг, провайдеры, глобальные стили)
    ├── entities/      # Базовые бизнес-сущности (например: user, product, cart), минимальная логика, типы, слайсы
    ├── features/      # Фичи — законченное поведение (например: фильтрация, добавление в корзину)
    ├── pages/         # Страницы, собирающие фичи/виджеты (например: HomePage, ProductPage)
    ├── widgets/       # Готовые UI-блоки/контейнеры с логикой (например: Header, CartSidebar)
    ├── shared/        # Переиспользуемые компоненты, хуки, типы, стили и т.д.
    ├── utils/         # Вспомогательные функции (например: formatPrice, parseQuery)
```

```
server/
└── src/
    ├── config/        # Конфигурации приложения (настройки базы, порты, переменные окружения и т.п.)
    ├── db/            # Работа с базой данных: модели, инициализация (или mock-файлы, если без настоящей БД)
    ├── middleware/    # Пользовательские middleware (логирование, обработка ошибок, auth и т.п.)
    ├── public/        # Статические файлы, которые Express отдаёт напрямую (например, изображения, фронт билд)
    ├── routes/        # Определение маршрутов (например, product.routes.js, cart.routes.js)
    ├── controllers/   # Обработка логики запросов — "мост" между route и service
    ├── services/      # Бизнес-логика, работа с БД и данными
    └── utils/         # Утилиты и вспомогательные функции (валидация, генераторы ID и т.д.)
```
## Example flow
[Client] → [Route] → [Controller] → [Service] → [DB/Utils] → [Ответ клиенту]

## Development
- The mock server runs on port 3000
- The development server runs on port 5173
- Filter state is persisted in URL query parameters
- Components are memoized to prevent unnecessary re-renders
