# Workshop: Nginx Reverse Proxy Server

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
+-- nginx
|    +-- Dockerfile 
|    +-- nginx.conf
+-- docker-compose.yml
```

./docker-compose.yml

<<< @/src/.vuepress/public/nginx-reverse-proxy/docker-compose.yml

### Backend

./backend/Dockerfile.dev

<<< @/src/.vuepress/public/nginx-reverse-proxy/backend/Dockerfile.dev

./backend/src/main.py

<<< @/src/.vuepress/public/nginx-reverse-proxy/backend/src/main.py{8}

### Frontend

./frontend/Dockerfile

<<< @/src/.vuepress/public/nginx-reverse-proxy/frontend/Dockerfile

./frontend/src/app.js

<<< @/src/.vuepress/public/nginx-reverse-proxy/frontend/src/app.js{4,11}

./frontend/src/index.html

<<< @/src/.vuepress/public/nginx-reverse-proxy/frontend/src/index.html


### Nginx Configuration

./nginx/Dockerfile

<<< @/src/.vuepress/public/nginx-reverse-proxy/nginx/Dockerfile

./nginx/nginx.conf

<<< @/src/.vuepress/public/nginx-reverse-proxy/nginx/nginx.conf


## Up

```sh
docker-compose up --build -d
```

- Go to [http://localhost](http://localhost)


## Down and finish this workshop

```sh
docker-compose down
```








