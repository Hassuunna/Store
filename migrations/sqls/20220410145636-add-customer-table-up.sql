create table customers (
    id SERIAL PRIMARY KEY,
    email varchar(100) UNIQUE NOT NULL,
    firstName varchar(100) NOT NULL,
    lastName varchar(100),
    password varchar(100)
);