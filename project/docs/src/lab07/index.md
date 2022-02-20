# Lab 7: Proxy server and Production Ready

Hi guys, This lab we would learn about Proxy Server for your mini-microservice app(s) and how to make our Image and Container to be **Production Ready**. 

- Q: What is production ready? 
- A: [stackexchange](https://softwareengineering.stackexchange.com/questions/61726/define-production-ready)

To make our container(s) is production ready, we want it to be **stateless** as possible. Therefore, we would remove the **volume**(s).


## Workshops

<!-- ### [Websocket](./websocket.md) -->

### [Nginx Reverse Proxy Server](./nginx.md)

### [Traefik Reverse Proxy Server](./traefik.md)

# Lab 7 (Continue): [Docker context](https://docs.docker.com/engine/context/working-with-contexts/)

- **Docker context** make it easy for a single Docker CLI to manage multiple Swarm clusters, multiple Kubernetes clusters, and multiple individual Docker nodes.
- To make it short, **Docker context** allows you to manipulate the Docker Node remotely. Therefore, you can use this method to deploy your container (app) easier.

## 1. Make sure you can SSH to remote machine

```config
...
Host lab-sad-ssh
  HostName XXX.XXX.XXX.XXX (or hostname)
  User {username}
  IdentityFile {path of private key}
...
```

## 2. Create the context

```sh
docker context create lab-sad-context --docker host=ssh://lab-sad-ssh
```

```sh
docker context ls
```

output
```
NAME                                TYPE                DESCRIPTION                               DOCKER ENDPOINT                                KUBERNETES ENDPOINT   ORCHESTRATOR
default *                           moby                Current DOCKER_HOST based configuration   npipe:////./pipe/docker_engine                                       swarm
lab-sad-context                     moby                                                          ssh://lab-sad-ssh
```

## 3. Switch Context

```sh
docker context use lab-sad-context
```
```sh
docker context ls
```

output
```
NAME                                TYPE                DESCRIPTION                               DOCKER ENDPOINT                                KUBERNETES ENDPOINT   ORCHESTRATOR
default                             moby                Current DOCKER_HOST based configuration   npipe:////./pipe/docker_engine                                       swarm
lab-sad-context *                   moby                                                          ssh://lab-sad-ssh
```

## 4. Compose up

::: tip
Used [Nginx Reverse Proxy Server](./nginx.md)
:::

```sh
docker-compose -f ./docker-compose-prod.yml up --build -d
```