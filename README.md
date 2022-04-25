# Store

## how to setup and connect to the database?
* Follow ENV_EXAMPLE to make .env file with right parameters
* Create Database for development and test in CMD using following commands
  
  `psql -U [yourUserName]`

  `CREATE DATABASE [DevelopmentDatabase]`
  
  `CREATE DATABASE [TestDatabase]`

## what ports the backend and database are running on
  backend in ENV_EXAMPLE
  
  database: 5432

## package installation instructions
  `npm i`

## correct RESTful routes for the required endpoints

| Method | Route                 | Function     | Params | Body                                 | Return           |
|--------:|---------------------:|-------------:|-------:|-------------------------------------:|------------------|
| get    | /customers            | index        |        |                                      | all customers    |
| get    | /customers/id         | show         | id     |                                      | current customer |
| post   | /customers            | create       |        | email, firstName, lastName, password | token            |
| post   | /customers/login      | authenticate |        | email, password                      | token            |
| put    | /customers            | update       |        | id, password                         | updated customer |
| delete | /customers            | destroy      |        | id                                   | deleted customer |
| get    | /products             | index        |        |                                      | all products     |
| get    | /products/id          | show         | id     |                                      | current product  |
| post   | /products             | create       |        | name, price                          | token            |
| put    | /products             | update       |        | id, price                            | updated product  |
| delete | /products             | destroy      |        | id                                   | deleted product  |
| get    | /orders               | index        |        |                                      | all orders       |
| get    | /orders/id            | show         | id     |                                      | current order    |
| post   | /orders               | create       |        |                                      | order created    |
| post   | /orders/addProduct/id | addProduct   | id     | product_id, quantity                 | token            |
| put    | /orders               | update       |        | id, status                           | updated order    |
| delete | /orders               | destroy      |        | id                                   | deleted order    |
________________________________________________________________________________________________________________________
## DATA SHAPES

### PRODUCTS
| Field | DateType     | Notes       |
|-------|--------------|-------------|
| id    | SERIAL       | PRIMARY KEY |
| name  | varchar(100) | NOT NULL    |
| price | float        | NOT NULL    |

________________________________________________________________________________________________________________________
### Customers

| Field     | DateType     | Notes           |
|-----------|--------------|-----------------|
| id        | SERIAL       | PRIMARY KEY     |
| email     | varchar(100) | UNIQUE NOT NULL |
| firstName | varchar(100) | NOT NULL        |
| lastName  | varchar(100) |                 |
| password  | varchar(100) | NOT NULL        |

________________________________________________________________________________________________________________________
### orders
| Field       | DateType     | Notes       | Default          |
|-------------|--------------|-------------|------------------|
| id          | SERIAL       | PRIMARY KEY |                  |
| customer_id | INTEGER      | REFERENCES  | customers(id)    |
| status      | varchar(100) | NOT NULL    | DEFAULT 'active' |