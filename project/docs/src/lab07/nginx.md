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
|    +-- dev.Dockerfile
+-- frontend
|    +-- src 
|    |   +-- app.js
|    |   +-- index.html
|    +-- dev.Dockerfile
+-- nginx
|    +-- Dockerfile 
|    +-- nginx.conf
+-- docker-compose.yml
```

./docker-compose.yml

<<< @/src/.vuepress/public/nginx-reverse-proxy/docker-compose.yml

### Backend

./backend/dev.Dockerfile

<<< @/src/.vuepress/public/nginx-reverse-proxy/backend/dev.Dockerfile{7,10}

./backend/src/main.py

<<< @/src/.vuepress/public/nginx-reverse-proxy/backend/src/main.py{8}

### Frontend

./frontend/dev.Dockerfile

<<< @/src/.vuepress/public/nginx-reverse-proxy/frontend/dev.Dockerfile

./frontend/src/app.js

<<< @/src/.vuepress/public/nginx-reverse-proxy/frontend/src/app.js{4,11}

./frontend/src/index.html

<<< @/src/.vuepress/public/nginx-reverse-proxy/frontend/src/index.html


### Nginx Configuration

./nginx/Dockerfile

<<< @/src/.vuepress/public/nginx-reverse-proxy/nginx/Dockerfile

./nginx/nginx.conf

<<< @/src/.vuepress/public/nginx-reverse-proxy/nginx/nginx.conf


### Up

```sh
docker-compose up --build -d
```

- Go to [http://localhost](http://localhost)


### Down and finish this session

```sh
docker-compose down
```

## Start Coding (Production)

```{5,11,16}
+-- backend
|    +-- src 
|    |   +-- main.py
|    +-- dev.Dockerfile
|    +-- prod.Dockerfile
+-- frontend
|    +-- src 
|    |   +-- app.js
|    |   +-- index.html
|    +-- dev.Dockerfile
|    +-- prod.Dockerfile
+-- nginx
|    +-- Dockerfile 
|    +-- nginx.conf
+-- docker-compose.yml
+-- docker-compose-prod.yml
```

./docker-compose-prod.yml

<<< @/src/.vuepress/public/nginx-reverse-proxy/docker-compose-prod.yml

### Backend

./backend/prod.Dockerfile

<<< @/src/.vuepress/public/nginx-reverse-proxy/backend/prod.Dockerfile{7,9-11}

### Frontend

./frontend/prod.Dockerfile

<<< @/src/.vuepress/public/nginx-reverse-proxy/frontend/prod.Dockerfile{3}

### Up

```sh
docker-compose -f ./docker-compose-prod.yml up --build -d
```

### Down and finish this lab

```sh
docker-compose -f ./docker-compose-prod.yml down
```




