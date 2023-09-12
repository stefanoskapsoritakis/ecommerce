# Front-end Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)

# Introduction

This repository contains the code for Stefanos Kapsoritakis' assignment. Link: [Frontend Project](https://stefanosfrontendproject.netlify.app/)

## Table of content

- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)

## Technologies

- TypeScript
- React
- MaterialUI
- React Router Dom
- Redux toolkit

##  Project Structure
````
.src
│   App.tsx
│   index.css
│   index.tsx
│   react-app-env.d.ts
│   reportWebVitals.ts
│   setupTests.ts
│
├───components
│       CartList.tsx
│       CreateProduct.tsx
│       NavBar.tsx
│       ProductDetails.tsx
│       ProductsList.tsx
│       RemoveProduct.tsx
│       SignIn.tsx
│       SignUp.tsx
│       UpdateProduct.tsx
│       withLoading.tsx
│
├───hooks
│       useAppDispatch.ts
│       useAppSelector.ts
│
├───pages
│       Cart.tsx
│       DeleteProduct.tsx
│       EditProduct.tsx
│       Home.tsx
│       Login.tsx
│       NewProduct.tsx
│       NotFound.tsx
│       Products.tsx
│       Profile.tsx
│       Register.tsx
│       SingleProduct.tsx
│       UsersList.tsx
│
├───redux
│   │   store.ts
│   │
│   ├───common
│   │       imageUpload.ts
│   │
│   └───reducers
│           cartReducer.ts
│           productsReducer.ts
│           usersReducer.ts
│
├───routes
│       Routes.tsx
│
├───tests
│   ├───components
│   │       SignUp.test.tsx
│   │
│   ├───data
│   │       categories.ts
│   │       products.ts
│   │       users.ts
│   │
│   ├───reducers
│   │       productsReducer.test.ts
│   │       usersReducer.test.ts
│   │
│   ├───servers
│   │       productServer.ts
│   │       userServer.ts
│   │
│   └───shared
│           store.ts
│
└───types
        Cart.ts
        Category.ts
        NewProduct.ts
        NewUser.ts
        Product.ts
        ProductUpdate.ts
        User.ts
        UserCredential.ts
        UserUpdate.ts
````
    