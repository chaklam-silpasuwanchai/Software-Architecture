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


### Get Information about Service and Stack

```sh
docker stack ps swarm-lab -f "desired-state=running"
```
output
```
ID             NAME                   IMAGE                                    NODE      DESIRED STATE   CURRENT STATE            ERROR     PORTS
m0xgkn321212   swarm-lab_backend.1    localhost:5000/raknatee/backend:1.0.0    swarm-2   Running         Running 5 minutes ago
9sq0whxgju55   swarm-lab_backend.2    localhost:5000/raknatee/backend:1.0.0    swarm-2   Running         Running 5 minutes ago
ir33prxah830   swarm-lab_backend.3    localhost:5000/raknatee/backend:1.0.0    swarm-2   Running         Running 5 minutes ago
6d69kzj05tjw   swarm-lab_frontend.1   localhost:5000/raknatee/frontend:1.0.0   swarm-1   Running         Running 53 seconds ago
kzqwjugh0wxf   swarm-lab_frontend.2   localhost:5000/raknatee/frontend:1.0.0   swarm-1   Running         Running 44 seconds ago
e1efxbaw988o   swarm-lab_frontend.3   localhost:5000/raknatee/frontend:1.0.0   swarm-1   Running         Running 49 seconds ago
t8afz5b9gnbg   swarm-lab_mongo.1      mongo:3.6.22-xenial                      swarm-2   Running         Running 25 minutes ago
s4hkjlsbhw7m   swarm-lab_registry.1   registry:2.8.0                           swarm-1   Running         Running 26 minutes ago
qgc47qsxy64r   swarm-lab_traefik.1    traefik:v2.3                             swarm-1   Running         Running 26 minutes ago
```

<hr>

```sh
docker stack services swarm-lab
```
output
```
ID             NAME                 MODE         REPLICAS   IMAGE                                    PORTS
r49y6f1d9xs6   swarm-lab_backend    replicated   3/3        localhost:5000/raknatee/backend:1.0.0
uydnut9cr45m   swarm-lab_frontend   replicated   3/3        localhost:5000/raknatee/frontend:1.0.0
7774gahqhky8   swarm-lab_mongo      replicated   1/1        mongo:3.6.22-xenial
1e0fufzxkxo9   swarm-lab_registry   replicated   1/1        registry:2.8.0                           *:5000->5000/tcp
bi3ue7hnih50   swarm-lab_traefik    replicated   1/1        traefik:v2.3                             *:80->80/tcp, *:443->443/tcp
```

<hr>

```sh
docker service ls
```
output
```
ID             NAME                 MODE         REPLICAS   IMAGE                                    PORTS
r49y6f1d9xs6   swarm-lab_backend    replicated   3/3        localhost:5000/raknatee/backend:1.0.0
uydnut9cr45m   swarm-lab_frontend   replicated   3/3        localhost:5000/raknatee/frontend:1.0.0
7774gahqhky8   swarm-lab_mongo      replicated   1/1        mongo:3.6.22-xenial
1e0fufzxkxo9   swarm-lab_registry   replicated   1/1        registry:2.8.0                           *:5000->5000/tcp
bi3ue7hnih50   swarm-lab_traefik    replicated   1/1        traefik:v2.3                             *:80->80/tcp, *:443->443/tcp
```
