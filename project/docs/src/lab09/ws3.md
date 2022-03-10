# Workshop 3. Automate Deploy

[[toc]]

## Planning

Before we jump right into the **Automate Deploy**, we have to figure out how you want to deploy (if not, there is nothing to automate).

Deploying is a step near the end of the software life cycle. Once you have a working software, we want to launch it for the user to use. Surely, different type of project/framework has different procedure. Deploying firmware of the hardware would be different from deploying web application.

For our project, it is a web application develop from Django framework and using gunicorn as a web server. Later on, all of this might change but for now, this is what we are using. In addition, our developing stage using Docker to control the environment.

### Attempt 1

We can go to our server and clone/copy the project. Install `python` and assosiated library. To control the environment, we can use `python-venv` or `pipenv`. Is this way fancy? no. Does it work? yes.

### Attempt 2

Since we already have docker, we could use docker to control the environment. For Docker, you can build the image (with the code inside the docker not mapping volume), push built image to registry (kind of GitHub for Docker Image), and Docker run on your server. This way, both environment in Production and Development stage are the same.

## My Attempt

In CSIM server context, our servers live behind the firewall/proxy. Therefore, the Docker image can not simply share between different stages. Therefore, I am going with following deploying procedure. (which you can argue that it is not the best way) 

### Prerequisite setup

There are three times we will need to get an information from the internet.

1. Git clone/fetch/pull
2. Docker pull image
3. pip install during Docker build

We have to configuring our server to use proxy server when internet connection is needed. Unfortunately, there is no one shot configuring for all services. We have to configuring this when needed.

1. Add `export http_proxy='http://192.41.170.23:3128'` and `export https_proxy='http://192.41.170.23:3128'` in the `.bashrc` of your account. This enable internet connection for the majority of services.
2. Following [Configuring Docker Proxy](https://docs.docker.com/config/daemon/systemd/). This will enable internet connection for Docker to pulling an image.
3. Adding `ENV http_proxy 'http://192.41.170.23:3128'` and `ENV https_proxy 'http://192.41.170.23:3128'` in the Dockerfile. This will enable internet connection during docker build.

We have to perform 1.) and 2.). The third one will be done below.
### Continue with the deploy

Here is my deploy procedure.

1. Clone/fetch/pull latest code from the GitHub reposistory
2. Use Docker compose to build and run docker image(s)

From this, I can modify my Compose script to pass environment variable `http_proxy` and `https_proxy` as needed. Luckily, we can have different `.env` file on each stages. (Don't forget to ignore the `.env` from Git)

.env in development stage (my local machine)
```sh
http_proxy=
https_proxy=
```

.env in production stage (my server)
```sh
http_proxy="http://192.41.170.23:3128"
https_proxy="http://192.41.170.23:3128"
```

docker-compose.yml
```yml
version: '3.4'

services:
  django:
    image: django-sad
    build:
      context: .
      dockerfile: ./Dockerfile
    #   this will pass through ARGS in Dockerfile
      args:
    #   This will read from .env
        http_proxy: $http_proxy
        https_proxy: $https_proxy
    ports:
      - 8000:8000
    volumes:
      - ./docs:/root/docs
    command: python3 manage.py runserver 0.0.0.0:8000
```

Dockerfile
```dockerfile
FROM python:3.10.2-bullseye

# Here is the ARGS parameter
ARG http_proxy
ARG https_proxy

# Assign environment variable to container base on value fron ARGS
ENV http_proxy ${http_proxy}
ENV https_proxy ${https_proxy}
# This disallowed python to create complited code (byte code)
# It causes less disk usage with sacrifice of performace
# ENV PYTHONDONTWRITEBYTECODE=1

# This asks python to not buffer the stdout
ENV PYTHONUNBUFFERED=1

WORKDIR /root/docs

RUN apt update && apt upgrade -y
RUN pip3 install django==4.0.2
RUN pip3 install gunicorn==20.1.0
```

## Automate Deploy with GitHub Action

Because our servers are behind a proxy, if we want to write a script that perform our deploying procedure then we have to `ssh` into our server first. Therefore, we have to `ssh` through a proxy server. We can achive that to but we can also take the advantage of [self-hosted runner](https://docs.github.com/en/actions/hosting-your-own-runners/adding-self-hosted-runners).

The `self-hosted runner`, once install, it will listen for a trigger from GitHub. This remove the headache of configuring *ssh keys*. (This might not be the best practice and could lead to security concern)

With that said, I can have my deploy script as below.

```yml
name: 6-simpleDeploy
on: [push]
jobs:
  deploy:
    runs-on: self-hosted
    steps:
      - name: Clone Reposistory
        uses: actions/checkout@v2
        with: 
          clean: false
      - name: compose down
        run: sudo docker-compose down
      - name: compose up
        run: sudo docker-compose up --build -d 
```

<div class="page-nav"><p class="inner">
    <span class="prev"> 
        ←
        <a href="./ws2.html" class="">Workshop 2 - Continuous Testing and Integration</a>
    </span> 
    <span class="next">
        <!-- <a href="./ws2.html" class="">Workshop 2 - Continuous Testing and Integration</a>
        → -->
    </span></p>
</div>