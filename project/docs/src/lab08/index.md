# Docker Swarm

## What is Orchestration?
- To make it short, it means how we can manage our containers on multiple hosts.

### Main Feature Hightlights
- Cluster management
- Scaling
- Secure by default
- Rolling updates

[ref](https://docs.docker.com/engine/swarm/#feature-highlights)

## Understanding Workflow of Orchestration

1. There is no build **Docker Image** concept in Orchestration
2. Therefore, we need **Docker Registry** for storing the Images because all node in cluster needs to pull from Docker Registry.
    - There are many ways to store you Image(s).
        - [Docker Hub](https://hub.docker.com/)
        - [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
        - [Google Cloud Container Registry (GCR)](https://cloud.google.com/container-registry) (If you want to use K8s (Kubernetes) in GCP you might need this)
        - [create your own local Registry](https://hub.docker.com/_/registry) We will use this for workshop.
        - and more ...
3. Orchestration will do their jobs (pull, run container(s), manage).

## Docker tag and how to push them [link](https://docs.docker.com/engine/reference/commandline/tag/)

```
{registry host}/{username}/{repositories of Image name}:{version}
```

### Docker hub

```
docker build . -t raknatee/my-image:v1
docker push raknatee/my-image:v1
```

### GCR

```
docker build . -t gcr.io/{PROJECT-ID}/my-image:v1
docker push gcr.io/{PROJECT-ID}/my-image:v1
```

### Local

```
docker build . -t localhost:5000/raknatee/my-image:v1
docker push localhost:5000/raknatee/my-image:v1
```

## Understanding Docker Swarm

### Node(s) [link](https://docs.docker.com/engine/swarm/key-concepts/#nodes)

- There are two types of node in Swarm
    - Manager node(s): used for cluster management, we can have multi-manager nodes but only one will be **Leader of Manager node**.
    - Worker node(s): used for running container(s)

### Overlay Networks [link](https://docs.docker.com/network/overlay/)
- To make it short, it looks like merge every IP address into one cluster. Therefore, you can access the cluster by using any IP address of hosts.
### Manager nodes for fault tolerance [link](https://docs.docker.com/engine/swarm/admin_guide/)

| Swarm Size	| Majority |	Fault Tolerance |
|---|---|---|
1 |	1 |	0
2	|2	|0
3	|2	|1
4	|3	|1
5	|3	|2
6	|4	|2
7	|4	|3
8	|5	|3
9	|5	|4

## Creates Swarm Cluster Nodes

In this example, we decided to create two nodes (VM) for Swarm Cluster. 

- hostname: swarm-1 for **MANAGER** and being **Leader**
- hostname: swarm-2 for **WORKER**

::: warning
Please make sure that the following ports are available

TCP port 2377 for cluster management communications

TCP and UDP port 7946 for communication among nodes

UDP port 4789 for overlay network traffic
:::

swarm-1

```sh
ssh swarm-1
```

```sh
docker swarm init --advertise-addr xxx.xxx.xxx.xxx
```
- xxx.xxx.xxx.xxx is IP address of swarm-1 machine.

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

## Workshop

### [Counter](./deploy.md)