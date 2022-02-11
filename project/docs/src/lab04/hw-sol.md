# Solution

::: warning
- **Please prepare one folder for this Workshop**
:::


## Discussion #0

There are two ways to **dockerize** (Dockerizing is the process of packing, deploying, and running applications using Docker containers. [ref](https://developerexperience.io/practices/dockerizing#:~:text=Is%20a%20Dockerizing-,Dockerizing%20is%20the%20process%20of%20packing%2C%20deploying%2C%20and,running%20applications%20using%20Docker%20containers.&text=You%20can%20use%20Docker%20to,as%20one%20package%20%2D%20a%20container.)) your HelloWorld Webapp by Django.

1. Create Django porject on your Host OS first, then **dockerize** it.
2. Create **Container** first, then create Django project later.

There is no right or wrong way (depend on your situations). However, We will show the second way in this solution.

## 0. project structure
```
+-- Dockerfile
```
## 1. Get started with Dockerfile

```Dockerfile
FROM python:3.10.2-buster

WORKDIR /home/app

RUN pip install "Django==4.0.2"

# To make container does not stop (return exits code) itself
CMD tail -f /dev/null
```

```sh
docker build . -t django-helloworld
```

```sh
docker image ls
```

output
```
REPOSITORY                       TAG             IMAGE ID       CREATED         SIZE
...
django-helloworld                latest          ba5fca860623   8 hours ago     930MB
```

## 2. Run

```sh
docker run -d -p 8000:8000 -v "{FULL_PATH}/app:/home/app" django-helloworld
```

output
```
e8de0639113077547cb517718966b3cc2e0d832a6852cca2eaa79a370820a97f
```

## 3. exec
```sh
docker exec -it e8d bash
```
output
```
root@e8de06391130:/home/app# |
```

```sh
django-admin startproject helloworld
```

```sh
cd helloworld
```

## 4. project structure
```
+-- app
|    +-- helloworld 
|    |    +-- helloworld 
|    |    |    +-- __init__.py
|    |    |    +-- asgi.py
|    |    |    +-- settings.py
|    |    |    +-- urls.py
|    |    |    +-- wsgi.py
|    |    +-- manage.py
+-- Dockerfile
```

## 5. Coding

```{8}
+-- app
|    +-- helloworld 
|    |    +-- helloworld 
|    |    |    +-- __init__.py
|    |    |    +-- asgi.py
|    |    |    +-- settings.py
|    |    |    +-- urls.py
|    |    |    +-- views.py
|    |    |    +-- wsgi.py
|    |    +-- manage.py
+-- Dockerfile
```

view.py
```py
from django.http import HttpResponse


def index(request):
    return HttpResponse("<h1>HelloWorld!</h1>")
```

urls.py
```py{21}
"""helloworld URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from helloworld_page import views as helloworld_page_view

urlpatterns = [
    path('', helloworld_page_view.index,name='index'),
    path('admin/', admin.site.urls),
]
```

## 6. Exit, rebuild and rerun

```sh
exit
docker rm e8d -f
```

Dockerfile
```Dockerfile{8}
FROM python:3.10.2-buster

WORKDIR /home/app

RUN pip install "Django==4.0.2"


CMD python ./helloworld/manage.py runserver 0.0.0.0:8000
```

```sh
docker build . -t django-helloworld
docker run -d -p 8000:8000 -v "{FULL_PATH}/app:/home/app" django-helloworld
```

[localhost:8000](http://localhost:8000)


## Discussion #1 

### (Pipfile or requirement.txt) VS (pip in Dockerfile)

There is no right or wrong way to use **requirement.txt** or **pip in Dockerfile**. You can use requirement.txt (or Pipfile+Pipfile.lock) to create Python project. Your Dockerfile could be like this.

requirement.txt
```
Django==4.0.2
```

Dockerfile
```Dockerfile
FROM python:3.10.2-buster

WORKDIR /home/app

COPY ./requirement.txt .
RUN pip install -r requirement.txt


CMD python ./helloworld/manage.py runserver 0.0.0.0:8000
```

### What if we want to install more libs ?

#### Round 1: pip in Dockerfile

Dockerfile
```Dockerfile{6}
FROM python:3.10.2-buster

WORKDIR /home/app

RUN pip install "Django==4.0.2"
RUN pip install numpy


CMD python ./helloworld/manage.py runserver 0.0.0.0:8000
```
output
```{1,12,13}
[+] Building 17.3s (11/11) FINISHED
 => [internal] load build definition from Dockerfile                                                  0.0s
 => => transferring dockerfile: 221B                                                                  0.0s 
 => [internal] load .dockerignore                                                                     0.0s 
 => => transferring context: 2B                                                                       0.0s 
 => [internal] load metadata for docker.io/library/python:3.10.2-buster                               3.6s 
 => [auth] library/python:pull token for registry-1.docker.io                                         0.0s
 => [1/5] FROM docker.io/library/python:3.10.2-buster@sha256:b3f80ba3e5419f4abc96738cc6ff413cdda68e8  0.0s
 => [internal] load build context                                                                     0.0s 
 => => transferring context: 11.04kB                                                                  0.0s 
 => CACHED [2/5] WORKDIR /home/app                                                                    0.0s 
 => CACHED [3/5] RUN pip install "Django==4.0.2"                                                      0.0s 
 => [4/5] RUN pip install numpy                                                                      12.9s 
 => [5/5] COPY ./app .                                                                                0.1s
 => exporting to image                                                                                0.6s
 => => exporting layers                                                                               0.5s
 => => writing image sha256:7c2d581b9adb1ac485a476ff3355c695a642eaeeec9089c920dcb5bbadc54f5a          0.0s
 => => naming to docker.io/library/django-helloworld:pip                                              0.0s
```

#### Round 2: requirement.txt

requirement.txt
```
Django==4.0.2
numpy
```

output
```{1,12}
[+] Building 24.2s (9/9) FINISHED
 => [internal] load build definition from r.Dockerfile                                                0.0s
 => => transferring dockerfile: 213B                                                                  0.0s 
 => [internal] load .dockerignore                                                                     0.0s 
 => => transferring context: 2B                                                                       0.0s 
 => [internal] load metadata for docker.io/library/python:3.10.2-buster                               2.0s 
 => [1/4] FROM docker.io/library/python:3.10.2-buster@sha256:b3f80ba3e5419f4abc96738cc6ff413cdda68e8  0.0s
 => [internal] load build context                                                                     0.1s 
 => => transferring context: 62B                                                                      0.0s 
 => CACHED [2/4] WORKDIR /home/app                                                                    0.0s 
 => [3/4] COPY ./requirement.txt .                                                                    0.1s 
 => [4/4] RUN pip install -r requirement.txt                                                         20.7s
 => exporting to image                                                                                1.3s
 => => exporting layers                                                                               1.2s
 => => writing image sha256:302860f409e36f0dd733d4216723d01de0b1b5e2eb76d8243ad711a4a9c34018          0.0s
 => => naming to docker.io/library/django-helloworld:txt                                              0.0s
```