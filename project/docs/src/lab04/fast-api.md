# Workshop: FastAPI

- **Please prepare one folder for this Workshop**

## Step 0: Discussion
- As you can see on previous workshop [Nginx](./nginx.md). If you change the content of **index.html**, you would need to build an Image again.
- However, this workshop, we will use the [volume](https://docs.docker.com/storage/volumes/) to create a reference from host to container. Therefore we can update our websites more easier when you are developing. However, If we want to deploy for **stateless** container. Please use only **COPY** (like we already finalize in this job, nothing has been changed any more). 
- Volumes can be used for **Database container** to store the data. Because if you container is gone, your data too.
- In this workshop, we will use FastAPI Python Framework for creating the REST API, and shows how to use Docker container for **dev env** without recreate (builds the new Image (**docker build**) and create container (**docker run**)) again and again.
## Step 1: Coding

### project structure
```
+-- src
|   +-- main.py
+-- Dockerfile
```

main.py
```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}
```

Dockerfile
```Dockerfile
FROM python:3.9.7-buster
WORKDIR /home/src

RUN pip install "fastapi==0.68.1"
RUN pip install uvicorn[standard]

COPY ./src /home/src/
CMD uvicorn --host 0.0.0.0 main:app --forwarded-allow-ips '*' --reload 
```

## Step 2: From Dockerfile to create Docker Image
```bash
docker build . -t my-fastapi:v1
```

## Step 3: Run Docker Container from your Image

- run

```bash
docker run -d -p 8000:8000 -v "{FULL path to current folder}/src:/home/src" my-fastapi:v1
```
- **-v** [Volume](https://docs.docker.com/storage/volumes/)


- Finally, open browser and go to [http://localhost:8000](http://localhost:8000)

output
```json
{
    "Hello": "World"
}
```
## Step 4: Change the code.

main.py
```python{8}
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World2"}
```
- Reload (F5)
  
output
```json
{
    "Hello": "World2"
}
```
## Step 5: Stop and remove container
- find my container id
```bash
docker ps
```

output
```
CONTAINER ID   IMAGE                      COMMAND                  CREATED         STATUS         PORTS                    NAMES
e11d2a5662a8   my-fastapi:v1              "/bin/sh -c 'uvicorn…"   3 minutes ago   Up 3 minutes   0.0.0.0:8000->8000/tcp   unruffled_noether
```
- remove the container
```bash
docker rm e11d -f
```