# Workshop: Postgres

- [postgres Docker Hub](https://hub.docker.com/_/postgres)
## Situation 1: without volume


- create **Postgres container**
```bash
docker run -d -e POSTGRES_PASSWORD=1234 postgres:14.1
```

- go inside **container**
```bash
docker ps
```
output

```
CONTAINER ID   IMAGE                      COMMAND                  CREATED          STATUS          PORTS                    NAMES
407e03ea3d60   postgres:14.1              "docker-entrypoint.s…"   6 seconds ago    Up 2 seconds    5432/tcp                 youthful_driscoll
```

```bash
docker exec -it 407 bash
```

- connect to **Postgres** (for Postgres container **postgres** is default user. For more information please read [postgres Docker Hub](https://hub.docker.com/_/postgres))
```bash
psql -U postgres
```

- create db
```sql
CREATE DATABASE mydb;
```
- list db
```bash
\l
```
output
```{4}
                                 List of databases
   Name    |  Owner   | Encoding |  Collate   |   Ctype    |   Access privileges
-----------+----------+----------+------------+------------+-----------------------
 mydb      | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
 postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
 template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
           |          |          |            |            | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
           |          |          |            |            | postgres=CTc/postgres
(4 rows)
```

- use db
```bash
\c mydb
```

- create table
```sql
CREATE TABLE users(
    name VARCHAR(50) PRIMARY KEY,
    age INT NOT NULL
);
```



```bash
\dt
```
output
```{4}
         List of relations
 Schema | Name  | Type  |  Owner
--------+-------+-------+----------
 public | users | table | postgres
(1 row)
```

- insert a user
```sql
INSERT INTO users (name, age)
VALUES ('Chaky', 22);
```

```sql
SELECT * FROM users;
```
output
```{3}
 name  | age
-------+-----
 Chaky |  22
(1 row)
```

- exit from **psql**

```
exit
```

- exit from **container**

```
exit
```

- remove **container**
```bash
docker rm 407 -f
```

- make sure that our data already gone
```bash
docker run -d -e POSTGRES_PASSWORD=1234 postgres:14.1
```
output
```
95036a5a81525b5bab2feb5aec44dff76b936af20094d835c675b873272c3fbb
```
- next
```bash
docker exec -it 950 bash
```

```bash
psql -U postgres
```
- list databases
```bash
\l
```
output
```
                                 List of databases
   Name    |  Owner   | Encoding |  Collate   |   Ctype    |   Access privileges
-----------+----------+----------+------------+------------+-----------------------
 postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
 template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
           |          |          |            |            | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
           |          |          |            |            | postgres=CTc/postgres
(3 rows)
```
- exit and remove **container**
```bash
exit
exit
docker rm 950 -f
```

## Situation 2: with volume

- create **Postgres container**
```bash
docker run -d -e POSTGRES_PASSWORD=1234 -v postgres-volume:/var/lib/postgresql/data postgres:14.1
```
output
```
e2d46d3faafe2790f5db67335d8566e153ffca857d667a5513b53271adc844de
```

- list volume
```bash
docker volume ls
```
output
```
DRIVER    VOLUME NAME
local     postgres-volume
```

- create database, table and insert data
```bash
docker exec -it e2d bash
```
```bash
psql -U postgres
```
```sql
CREATE DATABASE mydb;
```

```bash
\c mydb
```

```sql
CREATE TABLE users(
    name VARCHAR(50) PRIMARY KEY,
    age INT NOT NULL
);
```

```sql
INSERT INTO users (name, age)
VALUES ('Chaky', 22);
```

```sql
SELECT * FROM users;
```
output
```{3}
 name  | age
-------+-----
 Chaky |  22
(1 row)
```

- remove **container** and create again
```bash
exit
exit
docker rm e2d -f
docker run -d -e POSTGRES_PASSWORD=1234 -v postgres-volume:/var/lib/postgresql/data postgres:14.1
```
output
```
d556ada570b54aec1de343b04ff762104c7cda82aee2da6f1dd840274d5a7d4f
```
- go inside **container**
```bash
docker exec -it d55 bash
psql -U postgres
\c mydb
```

```sql
SELECT * FROM users;
```
output
```{3}
 name  | age
-------+-----
 Chaky |  22
(1 row)
```

- remove **container**, **volume**, and finish this lab

```bash
exit
exit
docker rm d55 -f
```
```bash
docker volume rm postgres-volume
```