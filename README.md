# Recipe Frontend

This is the Frontend for the Recipe app, built using NextJS.

## Prerequisites

- NextJS
- tailwind css

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
Create a file named "next.config.mjs" and setup as follows:

```cmd
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: <URL for backend apis> //e.g. http://localhost:5000
      },
};

export default nextConfig;
```

### 4. Start the project
```cmd
npm run dev
```

