# todo-app

https://react-todo-web-app.herokuapp.com/

## API

`POST /api/users` --> sign-up

`POST /api/users/login` --> login

---

`GET /api/todos` --> Get all todo's

`GET /api/todos/:id` --> Get todo with id

`PATCH /api/todos/:id` --> Modify todo with id

`DELETE /api/todos/:id` --> GDelete todo with id

Note: All API's with todos need JSON web token as a header 'x-auth'
