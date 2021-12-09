# Workshop 2. Have accessible Linux environment

Linux is an Operating System (OS) just like your Windows 7/8/10/11 and MacOS X. In fact, your MacOS X is one of the UNIX family. If we need to talk about operating system, we will spend hours and hours debating why which one is better than the other one (just like iPhone vs Andriod). One thing I am sure of is the maturity of linux in developer community is high. Therefore, we will use Linux environment in this class.

Our Linux of choice is [Ubuntu](https://ubuntu.com/) because of it popularity and user friendly (in some level).

Now, we must dicsuss your options on how can you have an access to Ubuntu.

[[toc]]

## Option 1: Install directly on your machine

Well, as mentioned above, Ubuntu is an OS just like your Windows and MacOS X. Thereforem you can install it and use it just like any OS. The installtion guide can be found [here](https://ubuntu.com/tutorials/install-ubuntu-desktop#1-overview).

::: tip The Good
Chossing this way will allowed your Ubuntu to have an access to all resources (CPU,RAM,GPU). Your Ubuntu experience will be fast and smooth (if thing goes well).
:::

::: danger The Bad

1. Installing any OS might cause you to lose all of your data. You may need an expericed person to help you on this.
2. Many application you need might not be there for you (Adobe suite, Microsoft Office suite). However, there are alternatives and mostly free.

:::

## Option 2: Virtualization

> [Cambridge](https://dictionary.cambridge.org/dictionary/english/virtual)
>
> Virtual (adjective): created by computer technology and appearing to exist but not existing in the physical world

Virtual Machine (VM) is a technology where we emulate a machine. In a very non technical words, you run windows on your windows (WindowsCeption!!!!!). A truly technical information of this technology can be found internet which you should read. For now, we focus on your Ubuntu.

To have this technology, you will need a software that handling this emulating. In Windows, you can use [Oracle VirtualBox](https://www.virtualbox.org/) (Free) or [VMware Workstation Pro](https://www.vmware.com/products/workstation-pro.html) (Fortune). There are other alternatives. In this workshop, we focus on a free Oracle VirtualBox because it supports both Windows and MacOS X.

::: tip The Good

1. Now that your entire machine is a bunch of files, you can backup and migrate extremely easy.
2. It is just a software, installing and playing around with your OS can be done safely.
3. You are now fully taking adventage of your powerful machine. For thoes who does not have a powerful machine, now you have an excute to buy one.

:::

::: danger The Bad

1. It taking your resources. A LOT.
2. It is slow and not smooth comparing to other alternatives.

:::

### Task 2-2-A. Download VirtualBox and install it

1. Just download it according to your host OS. [link](https://www.virtualbox.org/wiki/Downloads)
2. Install the downloaded file.
3. While you are waiting, download an ISO of Ubuntu 20.04.3 LTS. [link](https://ubuntu.com/download/desktop)

TODO: Continue this VirtualBox Guide

## Option 3. For Windows user only: WSL

Recently, Microsoft introduced Windows Subsystem for Linux (WSL) [link](https://docs.microsoft.com/en-us/windows/wsl/). This allows you to have Linux Terminal on your Windows 10/11 environment. The only downside of this option is there is no GUI. But who needs Ubuntu GUI?

The insturction to install WSL is [here](https://docs.microsoft.com/en-us/windows/wsl/install)

::: tip The Good

1. Fully access to your resources, fast, and smooth.
2. No dual-boot. Run your Windows apps while you coding on Ubuntu.

:::

::: danger The Bad

1. Not mature but quickly growning.
2. Some processes might run in the background forever.

:::

<div class="page-nav"><p class="inner">
    <span class="prev"> 
        ←
        <a href="./setup-github.html" class="prev">Workshop 1 - Setup your GitHub</a>
    </span> 
    <span class="next">
        <a href="./basic-terminal.html" class="">Workshop 3 - Learn basic Terminal command</a>
        →
    </span></p>
</div>