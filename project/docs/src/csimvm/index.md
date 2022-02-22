# Getting start with CSIM VM

*If you have been using CSIM VM before, this will not benefit you.*

To set up your VMs, you have to do it on VMware ESXi which you can access it via `https://virtual3.cs.ait.ac.th`. However, the `virtual3.cs.ait.ac.th` server lives under CSIM network.

## Are you under CSIM network?

CSIM has its own network. The network has a single public IP. This means, most of the server under CSIM network must use CSIM private IP. The reason why we can connect to CSIM server from anywhere in the world is because Olivier set DNS and NAT. blah blah blah network boring stuff.

In summary, `virtual3.cs.ait.ac.th` is not set any of that. Therefore, accessing this server requires a bit of trick (given that you are not in CSIM).

The trick we are going to do has a name `ssh tunneling`. Luckily, it is not something difficult to do.

The idea is as follows;

1. CSIM has a server named `bazooka`. This server can be accessed from anywhere in the world and you already have an account (which is your CSIM account).
2. We ask `bazooka` to send/fetch an information of `virtual3.cs.ait.ac.th` for us. This is easily can be seee as one variant of proxy.

The command we ase using is `ssh <stxxxx>@bazooka.cs.ait.ac.th -L 8000:virtual3.cs.ait.ac.th:443`.
There are three arguments and one option.
- `ssh` is the command for secure shell protocol.
- `<stxxxx>@bazooka.cs.ait.ac.th` is the destination of the ssh. `<stxxxxxx>` is the user of that server and `bazooka.cs.ait.ac.th` is the server url.
- `-L` is an option for tunnelling
- `8000:virtual3.cs.ait.ac.th:443:` is the argument of the tunnelling. The template is `<source port>:<tunnel to server>:<destination port>`. In our case, I want to access `virtual3.cs.ait.ac.th` port `443` and I will go to that port on my machine using `8000`.

Once you run the command, you will have to enter the CSIM password and just leave the ssh session online. Then you can access the `https://virtual3.cs.ait.ac.th/` using `https://localhost:8000` on your machine.


## VMs information
```txt
netmask: 255.255.255.0
DNS: 192.41.170.15
gateway: 192.41.170.23
proxy: http://192.41.170.23:3128/

ta-a   : 192.41.170.112
ta-b   : 192.41.170.113
-- Permission: st121413, st121723

sad1-a : 192.41.170.114
sad1-b : 192.41.170.115
-- Permission: st122797,st122038,st122037,st121410

sad2-a : 192.41.170.116
sad2-b : 192.41.170.117
-- Permission: st122283,st122331,st122050

sad3-a : 192.41.170.118
sad3-b : 192.41.170.119
-- Permission: st122895,st122032,st122928

sad4-a : 192.41.170.120
sad4-b : 192.41.170.121
-- Permission: st122561,st122322,st122825
```

## Configuring SSH

In order for our server to serve `ssh`, we have to install `openssh`

```sh
$ sudo apt install openssh-server
```

Now, we will ask the `openssh-server` to run on boot (it would be unfortunate if you can not access your server once it is rebooted).
```sh
$ sudo systemctl enable ssh
```

## Configuring internet proxy

Remember, the IPs is only allowed in-coming 80,443,8000-8010. This means we can not ssh (22) to our server directly. Even worst, the server is not allowed to go out of CSIM network. Unless, we set the internet proxy on our server.

The first two proxies we have to set is for the (1) bash session and (2) apt service. There are no gurantee that all service will use the proxy so good luck.

### 1. bash proxy

This is easy, we set this as environment variable in the account we are using.

```sh
$ echo 'export http_proxy="http://192.41.170.23:3128"' >> ~/.bashrc
$ echo 'export https_proxy="http://192.41.170.23:3128"' >> ~/.bashrc
$ source ~/.bashrc
```

Verify that you are now able to use internet by using `wget`

```sh
$ wget www.google.com
--2022-02-22 15:01:12--  http://www.google.com/
Connecting to 192.41.170.23:3128... connected.
Proxy request sent, awaiting response... 200 OK
Length: unspecified [text/html]
Saving to: ‘index.html’

index.html             [ <=>                 ]  16.91K  87.7KB/s    in 0.2s    

2022-02-22 15:01:12 (87.7 KB/s) - ‘index.html.1’ saved [17319]
```

### 2. apt proxy


This is also not difficult. Just add the proxy [ref](https://www.serverlab.ca/tutorials/linux/administration-linux/how-to-set-the-proxy-for-apt-for-ubuntu-18-04/
)

```sh
$ sudo touch /etc/apt/apt.conf.d/proxy.conf
$ sudo echo 'Acquire::http::Proxy "http://192.41.170.23:3128";' >> /etc/apt/apt.conf.d/proxy.conf
$ sudo echo 'Acquire::https::Proxy "http://192.41.170.23:3128";' >> /etc/apt/apt.conf.d/proxy.conf
```

----------

Now, you are set to go dev.