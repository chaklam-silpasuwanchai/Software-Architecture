# Workshop: FastAPI

- **Please prepare one folder for this Workshop**

## Step 0: Discussion
- As you can see on previous workshop [Nginx](./nginx.md). If you change the content of **index.html**, you would need to build an Image again.
- However, this workshop, we will use the [volume](https://docs.docker.com/storage/volumes/) to create a reference from host to container. Therefore we can update our websites more easier when you are developing. However, If we want to deploy for **stateless** container. Please use **COPY** (like we already done this job, have not anything been changed more). 
- Volumes can be used for **Database container** to store the data. Because if you container is gone, your data too.
- In this workshop, we will use FastAPI Python Framework for creating the REST API
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
CMD ["nginx", "-g", "daemon off;"]
```


## Step 2: From Dockerfile to create Docker Image
```bash
docker build . -t my-web:v2
```

## Step 3: Run Docker Container from your Image

- run

```bash
docker run -d -p 80:80 -v ./index.html:/usr/share/nginx/html/index.html my-web:v2
```
- **-d** [Detached](https://docs.docker.com/engine/reference/run/#detached--d)
- **-p** publish: map **{host port}:{container port}**

- Finally, open browser and go to [http://localhost](http://localhost)