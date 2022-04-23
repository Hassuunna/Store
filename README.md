# Store 

## how to setup and connect to the database?
Follow ENV_EXAMPLE to make .env file with right parameters

## what ports the backend and database are running on
  backend in ENV_EXAMPLE
  database: 5432

## package installation instructions
  `npm i`

## correct RESTful routes for the required endpoints

``` 
  app.get('/customers', index);
  app.get('/customers/:id', show);
  app.post('/customers', create);
  app.post('/customers/login', authenticate);
  app.put('/customers', update);
  app.delete('/customers', destroy);
```

```
  app.get('/orders/:id', show);
  app.get('/orders', index);
  app.post('/orders', create);
  app.post('/orders/addProduct/:id', addProduct);
  app.put('/orders', update);
  app.delete('/orders', destroy);
```
```  
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
  app.put('/products', update);
  app.delete('/products', destroy);
```


## DATA SHAPES

### PRODUCTS
|       |              |             |
|-------|--------------|-------------|
| id    | SERIAL       | PRIMARY KEY |
| name  | varchar(100) | NOT NULL    |
| price | floar        | NOT NULL    |

### Customers

|           |              |                 |
|-----------|--------------|-----------------|
| id        | SERIAL       | PRIMARY KEY     |
| email     | varchar(100) | UNIQUE NOT NULL |
| firstName | varchar(100) | NOT NULL        |
| lastName  | varchar(100) |                 |
| password  | varchar(100) | NOT NULL        |

### orders
|             |              |             |                  |
|-------------|--------------|-------------|------------------|
| id          | SERIAL       | PRIMARY KEY |                  |
| customer_id | INTEGER      | REFERENCES  | customers(id)    |
| status      | varchar(100) | NOT NULL    | DEFAULT 'active' |


## Endpoints