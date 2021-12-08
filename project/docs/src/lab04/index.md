# Lab 4: Docker

Hello guys, Today we will learn everything that you need to know about to be the Docker master.

Firstly, we will be focusing on how to create a container without using Docker-compose which we will talk about it later.

## Objective
1. To learn how to create a Docker Image with 

## What is Docker?
- Basically, it looks like VM but it is **NOT** VM.
- for more information please read here [Docker](https://docs.docker.com/get-started/overview/)


## Install Docker

### Windows User
- Download Docker Desktop [link](https://www.docker.com/products/docker-desktop)
- You need to install WSL2 for Docker Engine. (Please follow the guide)

### Mac OS User
- Download Docker Desktop [link](https://www.docker.com/products/docker-desktop)

### Ubuntu User
```bash
wget get.docker.com -O docker.sh
```
```bash
sudo sh docker.sh
```


## Docker Image
- To make it short, Docker Image looks like you are writing a Class (like programming) with has attribute, command and etc.
- There are many Docker image that you can use it. For example, nginx, MySQL, MongoDB and more.

## Docker Container
- It looks like you are creating object from your class (Docker Image)