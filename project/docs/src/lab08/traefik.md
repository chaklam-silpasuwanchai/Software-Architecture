# Workshop: Traefik Reverse Proxy Server

::: warning
- **Please copy previous workshop (Nginx Reverse Proxy Server) and rename for this Workshop**
:::

## Discussion

Basically, NGINX is a good example about how proxy works. However, NGINX could not support **Dynamic Configuration** (NGINX Plus can do but they are not free). Moreover, Traefik can do, it's free!, and easy to configure it. Moreover, Traefik can do [auto TLS](https://doc.traefik.io/traefik/https/overview/) which is great and looks like a magic!

**Dynamic Configuration**: what if we want to add more container(s)/service(s) and want to hide them inside the proxy. Do we need to create new config file or reload config file? Let say YES! Therefore, we needs to restart a proxy. BOOM! Whole system is gone for a few second.

**Dynamic Configuration** means they can change configuration without restart itself.

## Traefik Configuration

There are 2 types of Traefik Configuration: [Dynamic Configuration](https://doc.traefik.io/traefik/getting-started/configuration-overview/#the-dynamic-configuration) and [Static Configuration](https://doc.traefik.io/traefik/getting-started/configuration-overview/#the-static-configuration).

To sum up, **Static Configuration** we can specify how many ENTRYPOINTS (port) do you want to have, LOG level, TLS certificates, etc. In this example we will configure it through **Environment variable**.

For **Dynamic Configuration** we can add [labels](https://docs.docker.com/config/labels-custom-metadata/) in each container and Traefik can notice by themselve.

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

<<< @/src/.vuepress/public/traefik-reverse-proxy/docker-compose.yml{14-25,35-38,48-51}

### Static Configuration

- TRAEFIK_PROVIDERS_DOCKER=true
  - providers is Docker.
- TRAEFIK_ENTRYPOINTS_{NAME}=true
  - creates an entrypoint which name is {NAME}.
- TRAEFIK_ENTRYPOINTS_{NAME}_ADDRESS=:{PORT NUMBER}
  - specifies port of {NAME} entrypoint.
- TRAEFIK_API_INSECURE=true
  - enables dashboard and Traefik API in insecure mode which are not recommended for production mode [Insecure Mode](https://doc.traefik.io/traefik/operations/dashboard/#insecure-mode).

### Dynamic Configuration

- "traefik.http.routers.{NAME}.rule={[RULE](https://doc.traefik.io/traefik/routing/routers/#rule)}"
- "traefik.http.routers.{NAME}.entrypoints={ENTRYPOINTS NAME}"
- "traefik.http.services.{NAME}.loadbalancer.server.port={PORT}"
  - Exposed container port number


## Up

```sh
docker-compose up --build -d
```

- Go to [http://localhost](http://localhost)
- Go to [http://localhost:8080](http://localhost:8080)


## Down and finish this workshop

```sh
docker-compose down
```


