# Workshop: WebSocket

::: warning
- **Please prepare one folder for this Workshop**
:::

## Start Coding (Dev environment)

### project structure
```
+-- backend
|    +-- src 
|    |   +-- main.py
|    +-- Dockerfile.dev
+-- frontend
|    +-- src 
|    |   +-- app.js
|    |   +-- index.html
|    +-- Dockerfile 
+-- docker-compose.yml
```

./docker-compose.yml

<<< @/src/.vuepress/public/websocket-workshop/docker-compose.yml{10-11,21-22}

### Backend
./backend/Dockerfile.dev

<<< @/src/.vuepress/public/websocket-workshop/backend/Dockerfile.dev{8}

./backend/src/main.py

<<< @/src/.vuepress/public/websocket-workshop/backend/src/main.py

### Frontend

./frontend/Dockerfile

<<< @/src/.vuepress/public/websocket-workshop/frontend/Dockerfile

./frontend/src/app.js

<<< @/src/.vuepress/public/websocket-workshop/frontend/src/app.js{12}

./frontend/src/index.html

<<< @/src/.vuepress/public/websocket-workshop/frontend/src/index.html

### Run containers

```sh
docker-compose up --build -d
```

### Remove containers

```sh
docker-compose down
```

- go to [localhost](http://localhost)

## Start Coding (Production Ready)

### project structure
```{5,12}
+-- backend
|    +-- src 
|    |   +-- main.py
|    +-- Dockerfile.dev
|    +-- Dockerfile.prod
+-- frontend
|    +-- src 
|    |   +-- app.js
|    |   +-- index.html
|    +-- Dockerfile 
+-- docker-compose.yml
+-- docker-compose-prod.yml
```

./docker-compose-prod.yml

<<< @/src/.vuepress/public/websocket-workshop/docker-compose-prod.yml

- To make our container(s) is production ready, we want it to be **stateless** as possible.
- Therefore, we would remove the **volume**(s).

./backend/Dockerfile.prod

<<< @/src/.vuepress/public/websocket-workshop/backend/Dockerfile.prod{8}

- FastAPI would be production ready if we remove **--reload**.

### Run containers

```sh
docker-compose -f ./docker-compose-prod.yml up --build -d
```

- go to [localhost](http://localhost)


### Remove containers

```sh
docker-compose -f ./docker-compose-prod.yml down
```

::: warning

As you can see in **app.js**, localhost is not working if you have a domain name (when you deploy it). 
```js
wsConnection = new WebSocket("ws://localhost:8000")
```

You can change it to this. **location.hostname** returns the current hostname.
```js
wsConnection = new WebSocket(`ws://${location.hostname}:8000`)
```



:::