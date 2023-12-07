# Frontend for 知识, a vocabulary website

This is a Frontend for [知识](https://github.com/Toth23/vocab_crud), a simple CRUD service to manage vocabulary that you are learning.

The idea is to provide a simple and clean UI for recording any vocabulary that you learn ina foreign language.

## Technologies

The following technologies are used:

- [TypeSCript](https://www.typescriptlang.org/) programming language
- [React](https://react.dev/) front-end library
- [Ant Design](https://ant.design/) component library
- [Vite](https://vitejs.dev/) dev server and bundler
- [Testing Library](https://testing-library.com/) and [Vitest](https://vitest.dev/) for unit and integration testing
- [Github Actions](https://docs.github.com/en/actions) for CI/CD
- [Netlify](https://www.netlify.com/) for the deployed instance

## Local development setup

Simply

```shell
yarn dev
```

starts the application. By default, it assumes a local backend running on `http://localhost:3000`. A different backend instance can be configured by the environment variable `VITE_API_URL`.
