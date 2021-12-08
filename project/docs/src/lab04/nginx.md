# Workshop: Nginx

- **Please prepare one folder for this Workshop**

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