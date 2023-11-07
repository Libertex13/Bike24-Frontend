# Bike24 Frontend Challenge Readme

## Introduction

Welcome to the Bike24 Frontend Challenge! In this challenge, you are tasked with improving the shopping experience for Bike24 customers by creating a web application that allows customers to select products, determine quantities, manage their shopping cart, and view pricing information. This readme provides information on how to set up and use the app, as well as important details about the implementation.

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

- Node.js (version compatibility may vary, follow the setup for the chosen cloud provider)
- npm (Node Package Manager)
- Git

### Installation

Follow these steps to set up and run the app locally:

1. Clone the GitHub repository to your local machine:

   ```bash
   git clone https://github.com/your-username/bike24-frontend-challenge.git
   ```

2. Navigate to the project directory:

   ```bash
   cd bike24-frontend-challenge
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
- See the unit price in the shopping cart (optional: gross price using the provided "taxRate").
- View the total price of the shopping cart.
- Remove products from the shopping cart individually or all at once using the "Clear Cart" button.
- Monitor the number of different product types that can be added using the progress bar.
- See a graphical overlay confirmation when confirming the purchase.

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

If it weren't deployed already, to deploy the Bike24 Frontend Challenge app with a cloud provider, it should be quite a simple task, since it's a Next js project:

- Add your repository to Vercel projects in your Dashboard.
- Start the first build.
- Every push to that repository will get automatically deployed to production.

## Libraries

The following libraries and technologies have been used in this project:

- React: A JavaScript library for building user interfaces.
- Next JS: a React framework for full-stack apps --> decided to simulate a backend to showcase use of the api route,
- TypeScript: A statically-typed superset of JavaScript.
- Jest for unit and integration tests.
- Tailwind CSS for styling , with headlessUI

## Contributing

Contributions to this project are welcome. If you have improvements or bug fixes to suggest, please create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

