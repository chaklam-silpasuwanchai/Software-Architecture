# Workshop 3. Learn basic Terminal command

For all Padawans, you must know how to use terminal. To use the terminal, you need to know how to use Terminal command.

We can not go through all the command (even all of the basic commands) because there are tonsssss of them. Below is link to Cheat Sheet for essential terminal commands.

[Resource 1](https://www.git-tower.com/blog/command-line-cheat-sheet/)

<!-- <img src="https://www.git-tower.com/blog/media/pages/posts/command-line-cheat-sheet/1073300074-1638870828/command-line-cheat-sheet-large01.png">

<img src="https://www.git-tower.com/blog/media/pages/posts/command-line-cheat-sheet/2019113146-1638870828/command-line-cheat-sheet-large02.png"> -->

[Resource 2](https://cheatography.com/davechild/cheat-sheets/linux-command-line/)

[Resource 3](https://www.guru99.com/linux-commands-cheat-sheet.html)

## Bonus: The nice to know command

[[toc]]

Aside from the basic commands we learnt earlier, there are a bunch of out-of-the-box commands/tools/utilities in Ubuntu and many other Linux.

### 1. crontab

Cron is a job scheduler. That is it. done. move along..... Okay okay, I will explain more.

> [Wiki](https://en.wikipedia.org/wiki/Job_scheduler)
>
> A job scheduler is a computer application for controlling unattended background program execution of jobs. This is commonly called batch scheduling, as execution of non-interactive jobs is often called batch processing, though traditional job and batch are distinguished and contrasted; see that page for details. Other synonyms include batch system, distributed resource management system (DRMS), distributed resource manager (DRM), and, commonly today, workload automation (WLA). The data structure of jobs to run is known as the job queue.

TL;DR, If you want to set an alarm clock, you can ask cron to wake you up at every certain time. Every OS has its own cron variant.

Okay, let's play with cron

```sh
cd ~ # go to your home directory
mkdir playGrd # create new directory named 'playGrd'
cd playGrd # go to playGrd
touch paper # create new empty file called 'paper'
ls -l # list all files in current directory with -l:use a long listing format
```

**Output**:

```terminal
total 0
-rw-rw-r-- 1 {your_name} {your_name} 0 Dec  9 22:39 paper
```

Now, we going to manually write current date and time into our paper.

```sh
date >> paper # ask date time from system and route the output to 'paper'
cat paper # print content in 'paper'
```

**Output**:

```Terminal
Thu 09 Dec 2021 10:45:06 PM +07
```

You can do this multiple time to see what will happend.

```sh
date >> paper
date >> paper
date >> paper
cat paper
```

**Output**:

```Terminal
Thu 09 Dec 2021 10:45:06 PM +07
Thu 09 Dec 2021 10:48:25 PM +07
Thu 09 Dec 2021 10:48:25 PM +07
Thu 09 Dec 2021 10:48:25 PM +07
```

Now, instead of we write this ourselve, we ask cron to do it every minute.

```sh
crontab -e # this will enter your default crontab file.
```

**Output**: if you have never use crontab before, this is what you should see

```Terminal
# Edit this file to introduce tasks to be run by cron.
# 
# Each task to run has to be defined through a single line
# indicating with different fields when the task will be run
# and what command to run for the task
# 
# To define the time you can provide concrete values for
# minute (m), hour (h), day of month (dom), month (mon),
# and day of week (dow) or use '*' in these fields (for 'any').
# 
# Notice that tasks will be started based on the cron's system
# daemon's notion of time and timezones.
# 
# Output of the crontab jobs (including errors) is sent through
# email to the user the crontab file belongs to (unless redirected).
# 
# For example, you can run a backup of all your user accounts
# at 5 a.m every week with:
# 0 5 * * 1 tar -zcf /var/backups/home.tgz /home/
# 
# For more information see the manual pages of crontab(5) and cron(8)
# 
# m h  dom mon dow   command

```

Now, the syntax of cron consisting of 6 parameters as followed.

> [Wiki](https://en.wikipedia.org/wiki/Cron)
>
>```Terminal
># ┌───────────── minute (0 - 59)
># │ ┌───────────── hour (0 - 23)
># │ │ ┌───────────── day of the month (1 - 31)
># │ │ │ ┌───────────── month (1 - 12)
># │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
># │ │ │ │ │                                   7 is also Sunday on some systems)
># │ │ │ │ │
># │ │ │ │ │
># * * * * * <command to execute>
>```

The `*` is not a placeholder but it is a regular expression means *any*. Thus, this `* * * * *` means any minute, any hour, any day, any month, and any week day.

Let's ask crontab to write date every minute. Go to the bottom of the your default crontab file and put `* * * * * date >> ~/playGrd/paper`

**Output**:

```Terminal{24}
# Edit this file to introduce tasks to be run by cron.
# 
# Each task to run has to be defined through a single line
# indicating with different fields when the task will be run
# and what command to run for the task
# 
# To define the time you can provide concrete values for
# minute (m), hour (h), day of month (dom), month (mon),
# and day of week (dow) or use '*' in these fields (for 'any').
# 
# Notice that tasks will be started based on the cron's system
# daemon's notion of time and timezones.
# 
# Output of the crontab jobs (including errors) is sent through
# email to the user the crontab file belongs to (unless redirected).
# 
# For example, you can run a backup of all your user accounts
# at 5 a.m every week with:
# 0 5 * * 1 tar -zcf /var/backups/home.tgz /home/
# 
# For more information see the manual pages of crontab(5) and cron(8)
# 
# m h  dom mon dow   command
* * * * * date >> ~/playGrd/paper
```

save your crontab files and exceute `crontab -l` to see the current crontab jobs. (Lol, its just print the crontab file for you).

Now, let's observe the `paper` that cron actually write `date` for us every minute.

```sh
tail -f ~/playGrd/paper # print the last 5 lines and constantly printing the update
```

**Output**:

```Terminal {5-9}
Thu 09 Dec 2021 10:45:06 PM +07 
Thu 09 Dec 2021 10:48:25 PM +07 
Thu 09 Dec 2021 10:48:25 PM +07 
Thu 09 Dec 2021 10:48:25 PM +07 
Thu 09 Dec 2021 11:03:01 PM +07
Thu 09 Dec 2021 11:04:01 PM +07
Thu 09 Dec 2021 11:05:01 PM +07
Thu 09 Dec 2021 11:06:01 PM +07
Thu 09 Dec 2021 11:07:01 PM +07
```

As we can observe, cron did write the `date` every minute but it is late by 1 second.

### 2. awk & sed

<div class="page-nav"><p class="inner">
    <span class="prev"> 
        ←
        <a href="./setup-linux.html" class="">Workshop 2 - Have accessible Linux environment</a>
    </span> 
    <span class="next">
        <a href="./setup-linux.html" class=""></a>
        <!-- → -->
    </span></p>
</div>
