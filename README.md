# Challenge ShieldPay

## Description
This project is a challenge for ShieldPay. It involves creating a web application that demonstrates proficiency in modern web development practices. 
The application should be built using Node.js and Docker, and it should include features such as user authentication, data persistence. 
The goal is to showcase the ability to build a scalable and maintainable application from scratch.

To ensure a clean, maintainable, and scalable codebase, we will use DDD (Domain-Driven Design) along with a hexagonal architecture. 
These methodologies will help us separate concerns, improve testability, and align the development process with the business domain.

## How to Run 

Must configurate .env 

```
PORT=3000
NODE_ENV=development
ACCESS_TOKEN_SECRET="secret"
DB_PORT=5432
DB_NAME=wallet_db
DB_USERNAME=postgres
DB_PASSWORD=secret
DB_HOST=localhost
```

To run locally

Can create a dockerfile for postgres like this
```
FROM postgres:15-alpine

ENV POSTGRES_DB=wallet_db
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=secret

EXPOSE 5432

CMD ["postgres"]
```

And run

```
    npm install 
    npm run build
    npm run start 
    
    #for develop 
    npm run start:dev
```


## Considerations

* Monitoring tools can be added.
* I missed unit tests and e2e tests.
* It can be improved to comply with OpenApi.
* Another module can be added for the chains.

## Features and endpoints


### Auth

Sign In: Login to app
```
   POST /api/v1/signin  

   BODY {
    email:""
    password: ""
   }
```


Sign Up: Create and account and return token.
```
   POST /api/v1/signup  
   
   BODY {
    email:""
    password: ""
   }
```


Sign out: Logout app
```
   POST /api/v1/signout 
   Authorization Bearer TOKEN
```


### Wallet

Retrieve all wallets associated with the authenticated user.

```
GET /api/v1/wallets
Authorization: Bearer token (JWT)
```

Retrieve the details of a specific wallet by its ID.

```
GET /api/v1/wallets/:id
Authorization: Bearer token (JWT)
```

Create a new wallet for the authenticated user

```
POST /api/v1/wallets

Authorization: Bearer token (JWT)
Body
{
    "tag": "My Wallet",       // Optional: Wallet label
    "chain": "Ethereum",      // Required: Blockchain chain
    "address": "0x123..."     // Required: Wallet address
}
```

Update the details of an existing wallet of the user

```
PUT /api/v1/wallets/:id
Authorization: Bearer token (JWT)
Body
{
    "tag": "Updated Wallet",  // Optional: Updated wallet label
    "chain": "Ethereum",     // Required: Blockchain chain
    "address": "0x123..."    // Required: Updated wallet address
}
```

Delete a specific wallet of the user

```
DELETE /api/v1/wallets/:id
Authorization: Bearer token (JWT)
```