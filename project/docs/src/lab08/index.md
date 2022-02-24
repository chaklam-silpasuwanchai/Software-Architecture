# Docker Swarm

## Creates Swarm Cluster Nodes

In this example, we decided to create two nodes (VM) for Swarm Cluster. 

- hostname: swarm-1 for **MANAGER** and being **Leader**
- hostname: swarm-2 for **WORKER**


swarm-1

```sh
ssh swarm-1
```

```sh
docker swarm init --advertise-addr xxx.xxx.xxx.xxx
```
output
```{5}
Swarm initialized: current node (xxxxxxxxxxxxx) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token {token} xxx.xxx.xxx.xxx:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

swarm-2

```sh
ssh swarm-2
```
```
docker swarm join --token {token} xxx.xxx.xxx.xxx:2377
```



## Deploys Counter WebApp

### Create the context in our own machine

```sh
docker context create lab-swarm --docker "host=ssh://swarm-1"
```

```sh
docker context use lab-swarm
```

### Check the nodes

```sh
docker node ls
```
output
```
ID                            HOSTNAME   STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
hfi81meua03hj7q2g8llgwe8m *   swarm-1    Ready     Active         Leader           20.10.12
a84z576oiihy4d1qd5zojxu0a     swarm-2    Ready     Active                          20.10.12
```

<br>
<StaticLink :href="$withBase('/Swarm-Counter.zip')"> Click here for Swarm-Counter.zip</StaticLink>

## project structure

```
+-- backend
|    +-- ...
+-- frontend
|    +-- ...
+-- docker-compose.yml
+-- docker-compose-prod.yml
```

docker-compose-prod.yml

<<< @/src/.vuepress/public/Swarm/docker-compose-prod.yml

```{5-8}
+-- backend
|    +-- ...
+-- frontend
|    +-- ...
+-- stack
|    +-- stack-app.yml
|    +-- stack-proxy-registry.yml
+-- compose-build.yml
+-- docker-compose.yml
+-- docker-compose-prod.yml
```

./stack/stack-proxy-registry.yml

<<< @/src/.vuepress/public/Swarm/stack/stack-proxy-registry.yml

```sh
docker stack deploy -c ./stack/stack-proxy-registry.yml swarm-lab
```

```sh
docker stack ls
```
output
```
NAME        SERVICES   ORCHESTRATOR
swarm-lab   2          Swarm
```

```sh
docker stack ps swarm-lab
```
output
```
ID             NAME                   IMAGE          NODE      DESIRED STATE   CURRENT STATE           ERROR     PORTS
9j4gec2pm7mz   swarm-lab_registry.1   registry:2.8   swarm-1   Running         Running 4 minutes ago             
aq84g2l8k0vb   swarm-lab_traefik.1    traefik:v2.3   swarm-1   Running         Running 4 minutes ago   
```

./stack/stack-app.yml

<<< @/src/.vuepress/public/Swarm/stack/stack-app.yml

```sh
docker stack deploy -c ./stack/stack-app.yml swarm-lab
```

```sh
docker stack ps swarm-lab
```
output
```
ID             NAME                       IMAGE                        NODE      DESIRED STATE   CURRENT STATE                 ERROR                              PORTS
br61dz9j40kl   swarm-lab_backend.1        localhost:5000/backend:v1    swarm-1   Running         Preparing 20 seconds ago
s60zw79fwytu    \_ swarm-lab_backend.1    localhost:5000/backend:v1    swarm-1   Shutdown        Rejected 21 seconds ago       "No such image: localhost:5000…"
h9r12432c6b6    \_ swarm-lab_backend.1    localhost:5000/backend:v1    swarm-1   Shutdown        Rejected 46 seconds ago       "No such image: localhost:5000…"
otfqcn395lpb   swarm-lab_frontend.1       localhost:5000/frontend:v1   swarm-2   Running         Preparing 20 seconds ago
vsk23lbdycwt    \_ swarm-lab_frontend.1   localhost:5000/frontend:v1   swarm-2   Shutdown        Rejected 21 seconds ago       "No such image: localhost:5000…"
tkkrfp8vecbi    \_ swarm-lab_frontend.1   localhost:5000/frontend:v1   swarm-2   Shutdown        Rejected 46 seconds ago       "No such image: localhost:5000…"
f5c9rulewb0x    \_ swarm-lab_frontend.1   localhost:5000/frontend:v1   swarm-2   Shutdown        Rejected about a minute ago   "No such image: localhost:5000…"
s3170w3pegsu   swarm-lab_mongo.1          mongo:3.6.22-xenial          swarm-2   Running         Running about a minute ago
9j4gec2pm7mz   swarm-lab_registry.1       registry:2.8                 swarm-1   Running         Running 7 minutes ago
aq84g2l8k0vb   swarm-lab_traefik.1        traefik:v2.3                 swarm-1   Running         Running 7 minutes ago
```

compose-build.yml

<<< @/src/.vuepress/public/Swarm/compose-build.yml

```sh
docker-compose -f compose-build.yml build
docker-compose -f compose-build.yml push
```

```sh
docker stack ps swarm-lab -f "desired-state=running"
```
output
```
ID             NAME                   IMAGE                        NODE      DESIRED STATE   CURRENT STATE              ERROR     PORTS
y301np733hxc   swarm-lab_backend.1    127.0.0.1:5000/backend:v1    swarm-2   Running         Preparing 13 seconds ago
vblajukllq6d   swarm-lab_frontend.1   127.0.0.1:5000/frontend:v1   swarm-2   Running         Preparing 13 seconds ago
99s3abfr0yqn   swarm-lab_frontend.2   127.0.0.1:5000/frontend:v1   swarm-2   Running         Preparing 13 seconds ago
g0n3higyop1s   swarm-lab_frontend.3   127.0.0.1:5000/frontend:v1   swarm-1   Running         Running 13 seconds ago
ffxtzsf21za9   swarm-lab_mongo.1      mongo:3.6.22-xenial          swarm-2   Running         Running 8 seconds ago
1zi8gs7nars8   swarm-lab_registry.1   registry:2.8                 swarm-1   Running         Running 22 seconds ago
4c9u38jg5kqf   swarm-lab_traefik.1    traefik:v2.3                 swarm-1   Running         Running 19 seconds ago
```

