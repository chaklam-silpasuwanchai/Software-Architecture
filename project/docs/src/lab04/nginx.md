# Workshop: Nginx

::: warning
- **Please prepare one folder for this Workshop**
:::

## Step 1: Create files

index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h1>Hi Hello SAD Class</h1>
</body>

</html>
```

Dockerfile
```Dockerfile
FROM nginx:stable-alpine

COPY ./index.html /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
```
- **COPY**: copy files from host to Image


## Step 2: From Dockerfile to create Docker Image
```bash
docker build . -t my-web:v1 
```

## Step 3: Run Docker Container from your Image

- check your Image
```bash
docker image ls
```


output
```
REPOSITORY                 TAG             IMAGE ID       CREATED         SIZE
my-web                     v1              9a6a38822c69   7 minutes ago   23.2MB
```

- run

```bash
docker run -d -p 80:80  my-web:v1 
```
- **-d** [Detached](https://docs.docker.com/engine/reference/run/#detached--d)
- **-p** publish: map **{host port}:{container port}**

- Finally, open browser and go to [http://localhost](http://localhost)

## Step 4: Stop and remove container
```bash
docker container stop {container_id}
docker container rm {container_id}
```
or
```bash
docker stop {container_id}
docker rm {container_id}
```
or
```bash
docker container rm {container_id} -f
```
or
```bash
docker rm {container_id} -f
```
***
- find the container id
```bash
docker ps
```
or
```bash
docker container ls
```

output

```
CONTAINER ID   IMAGE                      COMMAND                  CREATED              STATUS              PORTS                    NAMES
084e8bd8e49d   my-web:v1                  "/docker-entrypoint.…"   About a minute ago   Up About a minute   0.0.0.0:80->80/tcp       clever_lalande
```
```bash
docker rm 084 -f
```
- PS. you can use the short id.

## Step 5-0: Discussion
- Next, we will proof if the container changes the **state** (ex. add more files, file changing or something which makes your container isn't same as original Image) and you might remove it (**docker rm**). Then, you create the container again (**docker run**). What you have changed before would be gone too.
- In another word, it looks like you have VM. You have code in it. You have data. Then, you delete it. If you create a new VM, you would get new VM. However, please keep it in your mind, container isn't VM. Container is a **process**.

## Step 5: Create a new Container

```bash
docker run -d -p 80:80  my-web:v1 
```

## Step 6: Go inside Container

### Discussion
> [Dockerize an SSH service](https://docs.docker.com/samples/running_ssh_service/)
> 
>Running sshd inside a container is discouraged, however, it might be still useful for certain use cases such as port forwarding.
>
>See https://github.com/linuxserver/docker-openssh-server for an example of Dockerized SSH service.

- Basically, we don't need to use ssh to go inside Docker container. What we can do is **Run a shell command** to our container.

```bash
docker exec -it {container_id/NAME} {command}
```
- [docker exec](https://docs.docker.com/engine/reference/commandline/exec/)
- **-it** for interactive shell
- There are many shell commands. For example, **bash**, **sh**, **zsh**, and more depend on **Base Image**.
- **nginx container** does not have **bash** but it has **sh**

1. find ID
```bash
docker ps
```
output
```
CONTAINER ID   IMAGE                      COMMAND                  CREATED          STATUS          PORTS                    NAMES
19c5def99721   my-web:v1                  "/docker-entrypoint.…"   11 minutes ago   Up 11 minutes   0.0.0.0:80->80/tcp       keen_wiles
```

2. run **shell** command

```bash
docker exec -it 19c sh
```
output
```
/ # |
```
- Now, we are in nginx container.

3. make some states change (we will add some files)

```bash
echo HelloSADClass > hello.txt
ls
```
output
```{3}
bin                   docker-entrypoint.sh  home                  mnt                   root                  srv                   usr
dev                   etc                   lib                   opt                   run                   sys                   var
docker-entrypoint.d   hello.txt             media                 proc                  sbin                  tmp
```
- saw **hello.txt**

4. exit from this container
```
exit
```

## Step 7: remove old container and create a new one.

1. rm and run
```bash
docker rm 19c -f
docker run -d -p 80:80  my-web:v1 
docker ps
```
output
```
CONTAINER ID   IMAGE                      COMMAND                  CREATED          STATUS          PORTS                    NAMES
c20808a474ac   my-web:v1                  "/docker-entrypoint.…"   4 seconds ago    Up 2 seconds    0.0.0.0:80->80/tcp       jolly_colden
```
- new ID new Container
2. make sure that hello.txt is not here
```bash
docker exec -it c20 sh
```
```bash
ls
```
output
```
bin                   docker-entrypoint.sh  lib                   opt                   run                   sys                   var
dev                   etc                   media                 proc                  sbin                  tmp
docker-entrypoint.d   home                  mnt                   root                  srv                   usr
```
3. exit from container
```
exit
```

4. **rm** container and finish this lab


```bash
docker rm c20 -f
```