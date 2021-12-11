# Workshop: Hello SAD Class

::: warning
- **Please prepare one folder for this Workshop**
:::

## Step 1: Create Dockerfile

Dockerfile
```Dockerfile
FROM ubuntu:20.04
CMD echo "Hello SAD Class"
```
- **FROM**: fill your base Image >> **{Image Name}:{Version}**
- **CMD**: What should the container do when it is created.

## Step 2: From Dockerfile to create Docker Image
```bash
docker build . -t my-image:v1 
```
- dot means where is your Dockerfile ( . == current directory )
- **-t** = tag, it looks like a name. You should fill version too.(default is latest)
  - [Tag command and syntax of tag](https://docs.docker.com/engine/reference/commandline/tag/)

## Step 3: Run Docker Container from your Image

- check your Image [Image command](https://docs.docker.com/engine/reference/commandline/images/)
```bash
docker image ls
```


output
```
REPOSITORY                 TAG             IMAGE ID       CREATED        SIZE
my-image                   v1              7f86f670d418   7 weeks ago    72.8MB
```

- run

```bash
docker run my-image:v1
```
output
```
Hello SAD Class
```