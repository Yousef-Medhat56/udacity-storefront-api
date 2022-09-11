# Storefront Backend Project

## Overview

A project for the Advanced Full-Stack Web Development Nanodegree Program offered by EgFWD initiative and Udacity. The goal of the project is building a RESTful API for a mock online store.

## Table of contents
1. [Technologies](#technologies)
2. [Installation and Usage](#installation-and-usage)
3. [Scripts](#scripts)
4. [API Documentation](#api-documentation)
     * [Users](#users)
     * [Products](#products)
     * [Orders](#orders)

## Technologies
- Postgres for the database
- Node/Express for the application logic
- db-migrate for migrations
- jsonwebtoken for working with JWTs
- jasmine for testing

## Installation and Usage
You can clone the repo then install the dependencies using npm:
```
$ git clone https://github.com/Yousef-Medhat56/udacity-storefront-api.git
$ cd udacity-storefront-api
$ npm install
```

The app requires a number of environment variables for runtime configration. The following example demonstrates how to set them in your `.env` file.
```
DEV_DB = development_database_name  
TEST_DB = test_database_name 
DB_USER = foo # database username
DB_PASSWORD = bar 
ENV = dev | test # development environment or test environment
PASSOWRD_PEPPER = a password pepper example
SALT_ROUNDS = 9 
TOKEN_SECRET = a token secret example
```
Start the development server. The server will run on port 3000.
```
$ npm run dev
```

## Scripts
`npm start` <br> 

Build the app to the `dist` directory and run the production server.

`npm run build` <br>

Build the app to the `dist` directory.

`npm run dev` <br>

Excute the up migrations in the development database and run the development server.

`npm run migrate-up` <br>

Excute the up migrations in the development database.

`npm run migrate-down` <br>

Excute all the down migrations in the development database.

`npm run test` <br>

Set the test environment, excute the up migrations in the test database, run the unit tests then excute the down migrations in the test database.

`npm run prettier`  <br>

Format code.

`npm run lint`  <br>

Lint code.


## API Documentation

#### Authentication Requirments
In order to access the **private endpoints**, you must send the request with your access token in the authentication header.
```
Authentication: Bearer {token}
```
You can get your token from the response body of [POST /users](#post-users).

### Users
#### GET /users [Private]
return a list of users.
##### Response example
```
{
  "data": [
    {
      "id": 1,
      "first_name": "foo1",
      "last_name": "bar1"
    },
    {
      "id": 2,
      "first_name": "foo2",
      "last_name": "bar2"
    },
    {
      "id": 3,
      "first_name": "foo3",
      "last_name": "bar3"
    }
  ]
}
```
#### <a name="post-users">POST /users</a>
create a new user. <br>
**note:** after creating a new user, a new order will be created for him automatically.
##### Request example
```
{
  "first_name": "foo",
  "last_name": "bar",
  "password": "password123"
}
```
##### Response example
```
{
  "data": {
    "id": 1,
    "first_name": "foo",
    "last_name": "bar"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyODgwNjc0fQ.6LPvbTb0dAfE-CD-Z6KB5XZaQCcSAWn8DaWkFNlhdk4"
}
```
#### GET /users/{user_id} [Private]
return the user with the provided `user_id` if exists.
##### Response example
```
{
  "data": {
    "id": 1,
    "first_name": "foo",
    "last_name": "bar"
  }
}
```
### Products
#### GET /products
return a list of products.
##### Query parameters
`category` (optional) : product category (e.g. "food","fishing") <br>
return products of the given category only.
##### Response example
```
{
  "data": [
    {
      "id": 1,
      "name": "fishing rod",
      "price": 10,
      "category": "fishing"
    },
    {
      "id": 2,
      "name": "noodles",
      "price": 5,
      "category": "food"
    },
    {
      "id": 3,
      "name": "drawing pencil",
      "price": 3,
      "category": "art"
    }
  ]
}
```
#### POST /products [Private]
create a new product.
##### Request example
```
{
  "name": "fishing rod",
  "price": "10",
  "category": "fishing"
}
```
##### Response example
```
{
  "data": {
    "id": 1,
    "name": "fishing rod",
    "price": 10,
    "category": "fishing"
  }
}
```
#### GET /products/{product_id} 
return the product with the provided `product_id` if exists.
##### Response example
```
{
  "data": {
    "id": 1,
    "name": "fishing rod",
    "price": 100,
    "category": "fishing"
  }
}
```
#### GET /products/top
return a list of the top 5 most popular products.
##### Response example
```
{
  "data": [
    {
      "product_id": 2,
      "name": "noodles",
      "category": "food",
      "price": 5,
      "sold_quantity": 13
    },
    {
      "product_id": 1,
      "name": "fishing rod",
      "category": "fishing",
      "price": 10,
      "sold_quantity": 8
    },
    {
      "product_id": 3,
      "name": "drawing pencil",
      "category": "art",
      "price": 3,
      "sold_quantity": 5
    }
  ]
}
```
### Orders
#### GET /orders [Private]
return a list of all orders made by the user.
##### Query parameters
`status` (optional) : order status ("completed" or "active")<br>
**completed** to return the completed orders only. <br>
**active** to return the current (active) order.
##### Response example
```
{
  "data": [
    {
      "order_id": 3,
      "status": "active",
      "products": [
        {
          "product_id": 2,
          "product_name": "noodles",
          "product_category": "food",
          "product_price": 5,
          "quantity": 2
        }
      ]
    },{
      "order_id": 1,
      "status": "completed",
      "products": [
        {
          "product_id": 1,
          "product_name": "fishing rod",
          "product_category": "fishing",
          "product_price": 10,
          "quantity": 1
        }
      ]
    }
  ]
}
```

#### POST /orders/products [Private]
add a product to your current order.
##### Request example
```
{
  "product_id": "1",
  "quantity": "2"
}
```
##### Response example
```
{
  "data": {
    "order_id": 3,
    "products": [
      {
        "product_id": 1,
        "product_name": "fishing rod",
        "product_category": "fishing",
        "product_price": 10,
        "quantity": 2
      }
    ]
  }
}
```
#### PATCH /orders/complete [Private]
change the order status from active to completed. <br>
**note:** after completing the order, a new active order will be created automatically.
##### Response example
```
{
  "data": {
    "order_id": 3,
    "status": "completed",
    "products": [
      {
        "product_id": 1,
        "product_name": "fishing rod",
        "product_category": "fishing",
        "product_price": 10,
        "quantity": 2
      }
    ]
  }
}
```
