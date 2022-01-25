# Workshop: Counter WebApp

::: warning
- **Please prepare one folder for this Workshop**
:::

## Start Coding

### project structure
```
+-- webapp
|    +-- src 
|    |   +-- mongo_connector.py
|    |   +-- main.py
|    +-- Dockerfile
+-- docker-compose.yml
```
- It is possible for one project would have more than one **container**. Therefore, I decided to create a new folder for WebApp **container**. Moverover, I decided to have another folder (**src**) for source code in WebApp **container**.
- However, you can define your own project structure by yourself. This is what I want to recommand this style for you.

Dockerfile
```Dockerfile
FROM python:3.9.7-buster
WORKDIR /home/src

RUN pip install "fastapi==0.70.0"
RUN pip install uvicorn[standard]
RUN pip install "pymongo==3.12.0"
RUN pip install "mypy==0.910"

COPY ./src /home/src/
EXPOSE 8000

CMD uvicorn --host 0.0.0.0 main:app --forwarded-allow-ips '*' --reload 
```
- **CMD** command from [FastAPI](https://fastapi.tiangolo.com/)

docker-compose.yml
```yml{19,20}
version: "3"
services: 
   
    api:
        build:
            context: ./webapp
            dockerfile: Dockerfile
  
        ports:
            - "8000:8000"
        volumes:
            - ./webapp/src:/home/src
     

    mongo:
        image: mongo:3.6.22-xenial

        environment:
          MONGO_INITDB_ROOT_USERNAME: root
          MONGO_INITDB_ROOT_PASSWORD: 1234

        volumes: 
            - mongo-sad-lab6:/data/db
volumes: 
  mongo-sad-lab6:
```
- **version**: It is version of **Docker-compose**, not **Docker engine**. Please do not be confused. You can check this [link](https://docs.docker.com/compose/compose-file/).
- **services**: We will define our container(s) here.
  - **api**: This is **HOSTNAME** / **SERVICE NAME** for this container. You can name it anything.
    - **build**: To tell **docker-compose** how to build this container.
      - **context**: Where is your Dockerfile?
      - **dockerfile**: What is your Dockerfile name?
        - PS. Actually you can name your own Dockerfile. For example,
          - Dockerfile.dev for **dev env**
          - Dockerfile.prod for **production env**
          - Dockerfile.{something}
          - {NAME} or uses another name that you want but it would be quite weird.

    - **ports**: **-p** in **docker run**
    - **volumes**: **-v** in **docker run**
  - **mongo**: This is **HOSTNAME** for my MongoDB.
    - **image**: Since we can use their image. No need to build, just **docker pull** and **docker run**
    - **environment**: **-e** in **docker run**. They are [environment variable](https://en.wikipedia.org/wiki/Environment_variable).It likes **export** in some labs.
        ```bash
        export VARIABLE=value 
        ```
- **volumes**: If you have **volume** object please define it too. **Docker compose** will show error if they cannot find **volume** object.

mongo_connector.py [pymongo](https://pymongo.readthedocs.io/en/stable/)
```python{6-8}
import pymongo #type:ignore
from pymongo.mongo_client import MongoClient #type:ignore
import os

class Mongo:
    username="root"
    password=1234
    hostname="mongo"
    uri=f"mongodb://{username}:{password}@{hostname}:27017"
    client:MongoClient

    @staticmethod
    def init():
        if('MONGO_STRING_OPTIONS' in os.environ):
            Mongo.uri+=os.environ['MONGO_STRING_OPTIONS']
        temp=pymongo.MongoClient(Mongo.uri)
        Mongo.client=temp

    @staticmethod
    def get_instance():
        if not hasattr(Mongo,'client'):
            Mongo.init()

        return Mongo.client
```
- When we use **Docker compose**, you can use their **HOSTNAME/SERVICE NAME** for connecting with database instead of using IP address.
- PS. If you do not use **Docker compose** (ex. **docker run** for each **container**), you need to join them by yourself.
- PS2. You might see that we put secret password in our code and **docker-compose.yml** which are not good right? Hacker loves it. However, I will show a better way about how to keep our secret at the end of this lab.

main.py [FastAPI](https://fastapi.tiangolo.com/)
```python
from fastapi import FastAPI

from mongo_connector import Mongo

app = FastAPI()


@app.get("/")
def read_root():
    data = Mongo.get_instance()['my-db']['my-collection'].find_one({"name":"counter"},{'_id':0})
    return data

@app.get("/count")
def add_count():
    data = Mongo.get_instance()['my-db']['my-collection'].update_one({"name":"counter"},{"$inc":{"value":1}})
    return {"result":data.modified_count}

def init_obj():
    data = [ d for d in Mongo.get_instance()['my-db']['my-collection'].find({"name":"counter"})]
    if(not data):
        new_data = {
            "name":"counter",
            "value": 0
        }
        Mongo.get_instance()['my-db']['my-collection'].insert_one(new_data)
init_obj()
```

## It's time! Let's create our containers.

[docker-compose CLI](https://docs.docker.com/compose/reference/)

```bash
docker-compose up --build -d
```
- **--build**: make sure that **docker-compose** will build image again (before starts **container**(s) ).
- **-d**:  Detached mode: Run containers in the background

## Let's see the result

```bash
docker ps
```
output
```
CONTAINER ID   IMAGE                      COMMAND                  CREATED         STATUS         PORTS                    NAMES
ba881e4f4208   mongo:3.6.22-xenial        "docker-entrypoint.s…"   7 seconds ago   Up 5 seconds   27017/tcp                006-counter_mongo_1
a987ca89fea0   006-counter_api            "/bin/sh -c 'uvicorn…"   7 seconds ago   Up 5 seconds   0.0.0.0:8000->8000/tcp   006-counter_api_1
```
<hr>

```bash
docker-compose ps
```
output
```
NAME                  COMMAND                  SERVICE             STATUS              PORTS
006-counter_api_1     "/bin/sh -c 'uvicorn…"   api                 running             0.0.0.0:8000->8000/tcp
006-counter_mongo_1   "docker-entrypoint.s…"   mongo               running             27017/tcp
```

* If you use **docker-compose ps**, it would filter only containers for this project. However, if you use **docker ps**, you might see other container which is outside your project too.

* go [http://localhost:8000](http://localhost:8000) to see the result

output
```json
{
  "name": "counter",
  "value": 0
}
```
* go [http://localhost:8000/count](http://localhost:8000/count)

output
```json
{
  "result": 1
}
```
* go back [http://localhost:8000](http://localhost:8000) to see the result

output
```json
{
  "name": "counter",
  "value": 1
}
```

## Optional command
- Basically, you can use another commands of **docker** via **docker-compose**

### Get inside container
```bash
docker-compose exec api bash
```
* If you use **docker-compose** not need **-it**.
```bash
ls
```

output
```
__pycache__  main.py  mongo_connector.py
```

* don't forget to exit from **container**
```bash
exit
```

### looks at Logs

```bash
docker-compose logs -f api
```
output
```
api_1  | INFO:     Will watch for changes in these directories: ['/home/src']
api_1  | INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
api_1  | INFO:     Started reloader process [8] using watchgod
api_1  | INFO:     Started server process [10]
api_1  | INFO:     Waiting for application startup.
api_1  | INFO:     Application startup complete.
api_1  | INFO:     172.28.0.1:39842 - "GET / HTTP/1.1" 200 OK
api_1  | INFO:     172.28.0.1:39862 - "GET /count HTTP/1.1" 200 OK
api_1  | INFO:     172.28.0.1:39870 - "GET / HTTP/1.1" 200 OK
```
* ctrl+c for exit from **logs -f**

## Remove container and finish this lab

```bash
docker-compose down
```
output
```
[+] Running 3/3
 - Container 006-counter_mongo_1  Removed       0.6s 
 - Container 006-counter_api_1    Removed       11.3s 
 - Network 006-counter_default    Removed       0.2s
 ```

## How to manage secret

::: warning
- **You should copy/paste previous workshop and refactor it with this tutorial.**
:::


### First way: ENV file

* Idea: Basically, we put it into another file and do not put it into your Git!
* However, **.env** is not the best solution because Docker does not do anything about encryption.
* Use case of **env** file 
  * configurate, setting, change some variables without re-build **Image** again.

#### project structure
```{7}
+-- webapp
|    +-- src 
|    |   +-- mongo_connector.py
|    |   +-- main.py
|    +-- Dockerfile
+-- docker-compose.yml
+-- secret.env
```

secret.env

```
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=1234
```

docker-compose.yml
```yml{13,14,20,21}
version: "3"
services: 
   
    api:
        build:
            context: ./webapp
            dockerfile: Dockerfile
  
        ports:
            - "8000:8000"
        volumes:
            - ./webapp/src:/home/src
        env_file:
            - ./secret.env
     

    mongo:
        image: mongo:3.6.22-xenial

        env_file:
            - ./secret.env
        

        volumes: 
            - mongo-sad-lab6:/data/db
volumes: 
  mongo-sad-lab6:
```

mongo_connector.py
```python{8,9}
import pymongo #type:ignore
from pymongo.mongo_client import MongoClient #type:ignore
import os



class Mongo:
    username=os.environ['MONGO_INITDB_ROOT_USERNAME']
    password=os.environ['MONGO_INITDB_ROOT_PASSWORD']
    hostname="mongo"
    uri=f"mongodb://{username}:{password}@{hostname}:27017"
    client:MongoClient
    @staticmethod
    def init():
        if('MONGO_STRING_OPTIONS' in os.environ):
            Mongo.uri+=os.environ['MONGO_STRING_OPTIONS']
        temp=pymongo.MongoClient(Mongo.uri)
        Mongo.client=temp

    @staticmethod
    def get_instance():
        if not hasattr(Mongo,'client'):
            Mongo.init()

        return Mongo.client
```

### Second way: [Docker Secrets](https://docs.docker.com/engine/swarm/secrets/)

::: warning
- **You should copy/paste previous workshop and refactor it with this tutorial AGAIN.**
:::

* Docker Secrets: Your secret(s) will be encrypted and sent to **/run/secrets/{secret_name}** in **container**(s).

#### project structure
```{7,8}
+-- webapp
|    +-- src 
|    |   +-- mongo_connector.py
|    |   +-- main.py
|    +-- Dockerfile
+-- docker-compose.yml
+-- mongo_user.txt
+-- mongo_password.txt
```

mongo_user.txt
```
root
```

mongo_password.txt
```
1234
```

docker-compose.yml
```yml{13-15,21-26,33-37}
version: "3"
services: 
   
    api:
        build:
            context: ./webapp
            dockerfile: Dockerfile
  
        ports:
            - "8000:8000"
        volumes:
            - ./webapp/src:/home/src
        secrets:
            - mongo_user
            - mongo_password
     

    mongo:
        image: mongo:3.6.22-xenial

        secrets:
          - mongo_user
          - mongo_password
        environment:
          - MONGO_INITDB_ROOT_USERNAME_FILE=/run/secrets/mongo_user
          - MONGO_INITDB_ROOT_PASSWORD_FILE=/run/secrets/mongo_password

        volumes: 
            - mongo-sad-lab6:/data/db
volumes: 
  mongo-sad-lab6:

secrets:
  mongo_user:
    file: mongo_user.txt
  mongo_password:
    file: mongo_password.txt
```

mongo_connector.py
```python{5-7,9-11,14-15}
import pymongo #type:ignore
from pymongo.mongo_client import MongoClient #type:ignore
import os

def read_mongo_user()->str:
    with open("/run/secrets/mongo_user") as read_file:
        return read_file.read()

def read_mongo_password()->str:
    with open("/run/secrets/mongo_password") as read_file:
        return read_file.read()

class Mongo:
    username=read_mongo_user()
    password=read_mongo_password()
    hostname="mongo"
    uri=f"mongodb://{username}:{password}@{hostname}:27017"
    client:MongoClient
    @staticmethod
    def init():
        if('MONGO_STRING_OPTIONS' in os.environ):
            Mongo.uri+=os.environ['MONGO_STRING_OPTIONS']
        temp=pymongo.MongoClient(Mongo.uri)
        Mongo.client=temp

    @staticmethod
    def get_instance():
        if not hasattr(Mongo,'client'):
            Mongo.init()

        return Mongo.client
```