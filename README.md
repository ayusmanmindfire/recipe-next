# Recipe Frontend

This repository contains the frontend of the Recipe App, built using NextJs with Tailwind CSS and materialUI for styling. The application provides an intuitive interface for managing and discovering recipes, handling user ratings, and offering personalized content based on user preferences.

## Technologies Used
- Next.js
- Tailwind CSS
- Axios
- Material-UI
- React Cookie
- React-redux

## Features

### User-Friendly Recipe Management
- **Recipe List and Details**: View all available recipes and explore detailed instructions, ingredients, and other recipe information.
- **Recipe Creation and Editing**: Easily add new recipes or modify existing ones with a clear and interactive interface.

### Ratings and Feedback
- **Rating System**: Allows users to rate recipes, helping others discover highly-rated recipes.
- **User Feedback Display**: Displays a recipe's rating to provide insight into its popularity and quality.

### API Integration
- **Real-Time Data**: Integrated with backend APIs to retrieve, add, update, and delete recipes and ratings, ensuring data is always up-to-date.
- **Standardized API Responses**: Built to handle standardized API responses, providing consistent feedback through properties like `success`, `message`, `data`, `createdAt`, and `updatedAt`.

### Responsive Design with Tailwind CSS
- **Modern Styling**: Styled with Tailwind CSS, providing a clean and responsive user interface.
- **Cross-Device Compatibility**: Optimized for both desktop and mobile, allowing users to access the app seamlessly across devices.

- **Dark mode**: You can toggle between dark and light mode with a button

## Prerequisites

Ensure you have the following installed:
- **Node.js**: Required to run and build the project.
- **npm**: Comes with Node.js, needed for managing project dependencies

## Getting Started

Follow the steps below to set up the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/ayusmanmindfire/recipe-next.git
```

### 2. Install dependencies

```cmd
cd recipe-next
npm install
```

### 3. Set environment file
Create a file named "next.config.mjs" in the root directory and setup as follows:

```cmd
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: <URL for backend apis> //e.g. http://localhost:5000
      },
};

export default nextConfig;
```

### 4. Start the project in development environment
```cmd
npm run dev
```

### 4. To start project in production environment
Build the project
```cmd
npm run build
```
Run the project
```cmd
npm start
```

