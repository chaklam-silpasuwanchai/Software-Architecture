# Workshop 1. Django Unit Test

[[toc]]

> [Django - Part 5: Testing](https://docs.djangoproject.com/en/4.0/intro/tutorial05/)
> 
> **What are automated tests?**
> 
> Tests are routines that check the operation of your code.
> 
> Testing operates at different levels. Some tests might apply to a tiny detail (does a particular model method return values as expected?) while others examine the overall operation of the software (does a sequence of user inputs on the site produce the desired result?). That’s no different from the kind of testing you did earlier in *Tutorial 2*, using the `shell` to examine the behavior of a method, or running the application and entering data to check how it behaves.
> 
> What's different in automated tests is that the testing work is done for you by the system. You create a set of tests once, and then as you make changes to your app, you can check that your code still works as you originally intended, without having to perform time consuming manual testing.

The Django developer takes on **Testing**.

> **Why you need to create tests**
> 
> - Tests will save you time
> - Tests don't just identify problems, they prevent them
> - Tests make your code more attractive
> - Tests help teams work together

For a complete information, read [Django - Part 5: Testing](https://docs.djangoproject.com/en/4.0/intro/tutorial05/).

In short, Testing is cool and should be done.

In my opinion, testing might not guarantee the success of the project (that is also depens on the business stuff) but it ensures the longevity of the project (given a good test script).  

----

## Task 1-1. Create a new Django Project

You have done this a dozen times and many ways. This time, I will do it in a docker way.

1. Create Dockerfil, docker-compose.yml, and an empty folder name `docs`

[What Python Image should I use?](https://pythonspeed.com/articles/base-image-python-docker-images/)

Note that we are using `python version 3.10.2`.

Dockerfile
```docker
FROM python:3.10.2-bullseye

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

docker-compose.yml
```yml
version: '3.4'

services:
  django:
    image: django-4.0.2
    build:
      context: .
      dockerfile: ./Dockerfile
    ports:
      - 8000:8000
    volumes:
      - ./docs:/root/docs
    # For Dev
    command: tail -f /dev/null
    # For Test
    # command: python3 manage.py runserver 0.0.0.0:8000
```

Current project tree
```txt
.
|--docs/
|--Dockerfile
|--docker-compose.yml
```

2. compose the docker and setup the developing environment.
3. `bash` into your container or In VScode, attach vscode to the container
4. `cd` to `/root/docs` and execute `django-admin startproject tempProject .`

*Note: the `.` at the end will create a project using the current path as a root directory*

Current project tree
```txt
.
|--docs/
    |--tempProject/
        |--<main site code>
    |--manage.py
|--Dockerfile
|--docker-compose.yml
```

5. Execute `python3 manage.py runserver 0.0.0.0:8000` to run the server and check that your project can run

## Task 1-2. Create a new app

1. Create an app `python3 manage.py startapp cicdapp`
2. Edit 'cicdapp/tests.py' as following

cicdapp/tests.py
```python
from django.test import TestCase

class TestSet_A(TestCase):
    def this_test_will_be_ignored(self):
        # print("---- This won't run")
        self.assertIs(True, True)

    def test_that_run(self):
        # print("---- TestSet_A.test_that_run")
        self.assertIs(True, True)
        # print("---- This will be execute")
        self.assertIs(True, False)
        # print("---- This will not")

class TestSet_B(TestCase):
    def test_2(self):
        # print('---- test_2')
        self.assertIs(True, True)
    def test_1(self):
        # print('---- test_1')
        self.assertIs(True, True)

class TestSet_C(TestCase):
    value = "A"
    def test_1(self):
        # print(f"---- test_1:{self.value}")
        self.value = 'B'
        self.test_2()
        # print("---- End test_1")

    def test_2(self):
        # print(f"---- test_2:{self.value}")
        pass
```

3. To run test, execute `python3 manage.py test`

```sh
root@5406e6253b3f:~/docs$ python3 manage.py test
Found 5 test(s).
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
F....
======================================================================
FAIL: test_that_run (cicdapp.tests.TestSet_A)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/root/docs/cicdapp/tests.py", line 12, in test_that_run
    self.assertIs(True, False)
AssertionError: True is not False

----------------------------------------------------------------------
Ran 5 tests in 0.006s

FAILED (failures=1)
Destroying test database for alias 'default'...
```

4. Explain how the test script works.

<div class="page-nav"><p class="inner">
    <span class="prev"> 
        ←
        <a href="./index.html" class="">Lab9 - Main page</a>
    </span> 
    <span class="next">
        <a href="./ws2.html" class="">Workshop 2 - Continuous Testing and Integration</a>
        →
    </span></p>
</div>