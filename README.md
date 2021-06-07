# hold-my-csv

> Hold my CSV - Tabular Data with Bulk Upload.

This is a full stack [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

• [MongoDB](https://www.mongodb.com).

-   MongoDB needs to be installed and MongoDB server needs to be running while running the app.
    Installation instructions can be found [here](https://docs.mongodb.com/manual/installation).

## Getting Started

• Clone the repo.

• Create an `.env.local` file at the root of the project that looks like this.

```.env
DATABASE_URI=mongodb://localhost/HoldMyCSV
```

You may need to change the value of `DATABASE_URI` depending if you changed certain defaults while installing MongoDB.
Alternatively, you can set the value of this environment variable manually in your shell before staring the app. The `.env.local` is auto read (if present).

• Install all packages using `yarn`.

• To start the app. Simply do `yarn dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the home page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api](http://localhost:3000/api). This endpoint can be edited in `pages/api/countries/index.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Bonus

### Docker Support

Docker support added that will allow you to quickly start the app or deploy it to a cloud server with all its dependencies with just one command.
`docker-compose up`

### Code linting & Formatting

Support for linting via Eslint and formatting via Prettier added with sensible defaults. (If you use VSCode just need to install Eslint and Prettier extensions the linting and formatting will start happening automatically)

### Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FMustansirZia%2Fhold-my-csv&env=DATABASE_URI&envDescription=Database%20connection%20string%20for%20mongodb.)

### Running Tests

To run unit tests run `yarn test`. For now, test cases for the UI have only been added.
