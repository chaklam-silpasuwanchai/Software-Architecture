# Lab 6: Docker Compose

Hiiiiiii guys, This lab we would learn what is Docker Compose and why do we need to use it. Basically, [Docker compose](https://docs.docker.com/compose/) is a configuation file for **container**. It helps you manage more than one **container**s. Even though, you have only one **container**, **Docker compose** would be still useful.


## Why is Docker-compose useful?

- Basically, **Docker-compose** has 2 mains command.

### docker-compose up

- **docker-compose up** does a lot of steps for you in single command.
    1. **docker build**
    2. **docker run**
    3. create local private network 
    4. join all **container**(s) into that local private network
    5. set **Hostname** for each container

Example output
```{1,20-23}
[+] Building 2.2s (12/12) FINISHED
 => [internal] load build definition from Dockerfile                                                                                                                                     0.0s
 => => transferring dockerfile: 32B                                                                                                                                                      0.0s
 => [internal] load .dockerignore                                                                                                                                                        0.0s
 => => transferring context: 2B                                                                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/python:3.9.7-buster                                                                                                                   1.9s
 => [1/7] FROM docker.io/library/python:3.9.7-buster@sha256:2ea1c4a9d762bb318f11cc6c7d9ce3fc71b928f5c70bbbcb02ece7c859a9b972                                                             0.0s
 => [internal] load build context                                                                                                                                                        0.0s
 => => transferring context: 542B                                                                                                                                                        0.0s
 => CACHED [2/7] WORKDIR /home/src                                                                                                                                                       0.0s
 => CACHED [3/7] RUN pip install "fastapi==0.70.0"                                                                                                                                       0.0s
 => CACHED [4/7] RUN pip install uvicorn[standard]                                                                                                                                       0.0s
 => CACHED [5/7] RUN pip install "pymongo==3.12.0"                                                                                                                                       0.0s
 => CACHED [6/7] RUN pip install "mypy==0.910"                                                                                                                                           0.0s
 => [7/7] COPY ./src /home/src/                                                                                                                                                          0.1s
 => exporting to image                                                                                                                                                                   0.1s
 => => exporting layers                                                                                                                                                                  0.0s
 => => writing image sha256:90812bc9df6d29e4cf901e0b8150ea476daa30950cf2a7346542c8e5761939fe                                                                                             0.0s
 => => naming to docker.io/library/006-counter_api                                                                                                                                       0.0s
[+] Running 3/3
 - Network 006-counter_default    Created                                                                                                                                                0.0s
 - Container 006-counter_mongo_1  Started                                                                                                                                                0.9s
 - Container 006-counter_api_1    Started
```

### docker-compose down

- **docker-compose down** sames as **docker-compose up**
    1. **docker stop**
    2. **docker rm**
    3. remove network

Example output
```
[+] Running 3/3
 - Container 006-counter_mongo_1  Removed                                                                                                                                                1.8s
 - Container 006-counter_api_1    Removed                                                                                                                                               11.3s
 - Network 006-counter_default    Removed
```
## Workshop

### [Counter](./counter.md)