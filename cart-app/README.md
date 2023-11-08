# Bike24 Frontend Challenge Readme

## Introduction

This readme provides information on how to set up and use the app, as well as important details about the implementation.
Important details:

- Fully mobile responsive.
- Deployed via Vercel: bike24-frontend.vercel.app

## Table of Contents

- [Getting Started](#getting-started)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Libraries](#libraries)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Requirements

To run the Bike24 Frontend Challenge app, you need the following:

- Node.js ( v18.15.0 was used , shouldn't have any compatibility issues)
- npm (Node Package Manager)
- Git

### Installation

Follow these steps to set up and run the app locally:

1. Clone the GitHub repository to your local machine:

   ```bash
   git clone https://github.com/Libertex13/Bike24-Frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cart-app
   ```

3. Install the project dependencies using npm:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your web browser and access the app at [http://localhost:3000](http://localhost:3000).

## Usage

Here's how to use the Bike24 Frontend Challenge app:

- Select products from the dropdown list.
- Determine the quantity of the product using a slider.
- Be informed when exceeding the maximum number of products.
- View all selected products in the shopping cart.
- See the unit price in the shopping cart .
- View the total price of the shopping cart.
- Remove products from the shopping cart individually or all at once using the "Clear Cart" or "Delete All" button.
- Monitor the number of different product types that can be added using the progress bar.
- e informed when exceeding the maximum number of product types.
- See a graphical overlay confirmation "checkout" when confirming the purchase.

## Testing

Unit and integration tests have been implemented to ensure code quality and functionality. To run the tests, use the following command:

```bash
npm test
```

or:

```bash
npm run test:addToCart
npm run test:productTable
npm run test:buy
npm run test:integration
```

For specific tests

## Deployment

This app is already deployed at bike24-frontend.vercel.app to showcase.

If it weren't deployed already, to deploy the Bike24 Frontend Challenge app with a cloud provider, it should be quite a simple task with Vercel, since it's a Next js project:

- Add your repository to Vercel projects in your Dashboard, make sure you give the rigt permissions.
- Start the first build.
- Every push to that repository will get automatically deployed to production.
- Deploying early is a good practice to ensure what works in the dev environment works in production also from the start.

## Libraries

The following libraries and technologies have been used in this project:

- React: A JavaScript library for building user interfaces. React Context is used for most if the test management. Even the data fetching id done through the single CArtContext.tsx file.
- Next JS: a React framework for full-stack apps --> decided to simulate a backend to showcase use of the api route,
- TypeScript: A statically-typed superset of JavaScript.
- Jest and React Testing Library for unit and integration tests.
- Tailwind CSS for styling , with headlessUI library.

## Contributing

Contributions to this project are welcome. If you have improvements or bug fixes to suggest, please create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
