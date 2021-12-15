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

```text
total 0
-rw-rw-r-- 1 {your_name} {your_name} 0 Dec  9 22:39 paper
```

Now, we are going to manually write current date and time into our paper.

```sh
date >> paper # ask date time from system and route the output to 'paper'
cat paper # print content in 'paper'
```

**Output**:

```Text
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

```Text
Thu 09 Dec 2021 10:45:06 PM +07
Thu 09 Dec 2021 10:48:25 PM +07
Thu 09 Dec 2021 10:48:25 PM +07
Thu 09 Dec 2021 10:48:25 PM +07
```

Now, instead of we write this ourselve, we ask cron to do this every minute.

```sh
crontab -e # this will enter your default crontab file.
```

**Output**: if you have never use crontab before, this is what you should see

```Text
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
>```Text
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

```Text{24}
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

```Text {5-9}
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

### 2. wc

`wc` command will count number of lines, words, and bytes of interested file.

```sh
cd ~/playGrd
printf "word1 word2 word3\nword4\nword5\nword6" > doc
cat doc
```

**Output**:

```text
word1 word2 word3
word4
word5
word6{your_name}@{machine_name}:~/playGrd$ 
```

Let's ask `wc` how many lines, and words in this *doc* file.

```sh
wc doc
```

**Output**:

```text
 3  6 35 doc
```

`wc` tells that there are `3 lines`, `6 words`, and `35 bytes` in *doc* file.

### 3. sed

Download [10-audio.csv](/sample-data/10-audio.csv) file.

```sh
mv ~/Downloads/10-audio.csv ~/playGrd/
cd ~/playGrd
head 10-audio.csv
```

**Output**:

```Text
timestamps,e1,e2,e3,e4,e5,e6,e7,e8,Marker
461.662,15891.174,4424.394,-10929.892,-35342.266,8432.173,-33484.656,-26816.104,-35684.516,0
461.663,15852.706,4367.218,-10978.551,-35400.895,8377.434,-33542.637,-26873.033,-35742.383,0
461.663,15793.318,4297.369,-11044.467,-35470.742,8309.351,-33611.055,-26941.475,-35811.832,0
461.663,15790.927,4305.080,-11047.238,-35466.297,8313.799,-33606.652,-26936.176,-35808.145,0
461.663,15862.273,4387.737,-10966.504,-35377.535,8400.702,-33519.055,-26845.697,-35719.520,0
461.663,15921.572,4446.678,-10906.534,-35320.852,8458.615,-33460.383,-26789.438,-35663.125,0
461.663,15880.557,4393.772,-10954.277,-35379.660,8401.663,-33519.391,-26847.418,-35720.523,0
461.663,15816.229,4320.659,-11021.824,-35452.348,8332.328,-33593.242,-26918.027,-35791.379,0
461.663,15804.024,4318.826,-11030.161,-35455.367,8328.640,-33594.984,-26922.162,-35795.445,0
```

```sh
wc 10-audio.csv
```

**Output**:

```Text
  113941   113941 10619374 10-audio.csv
```

In brief, this is a recorded EEG data in csv (comma-separated values). It has 113941 lines of data. Interestingly, `wc` also reports number of words to be the same as number of lines. Now, I want to change the delimiter from `,` to `SEP`.

```sh
sed 's/,/SEP/g' 10-audio.csv | head
```

**Output**:

```Text
timestampsSEPe1SEPe2SEPe3SEPe4SEPe5SEPe6SEPe7SEPe8SEPMarker
461.662SEP15891.174SEP4424.394SEP-10929.892SEP-35342.266SEP8432.173SEP-33484.656SEP-26816.104SEP-35684.516SEP0
461.663SEP15852.706SEP4367.218SEP-10978.551SEP-35400.895SEP8377.434SEP-33542.637SEP-26873.033SEP-35742.383SEP0
461.663SEP15793.318SEP4297.369SEP-11044.467SEP-35470.742SEP8309.351SEP-33611.055SEP-26941.475SEP-35811.832SEP0
461.663SEP15790.927SEP4305.080SEP-11047.238SEP-35466.297SEP8313.799SEP-33606.652SEP-26936.176SEP-35808.145SEP0
461.663SEP15862.273SEP4387.737SEP-10966.504SEP-35377.535SEP8400.702SEP-33519.055SEP-26845.697SEP-35719.520SEP0
461.663SEP15921.572SEP4446.678SEP-10906.534SEP-35320.852SEP8458.615SEP-33460.383SEP-26789.438SEP-35663.125SEP0
461.663SEP15880.557SEP4393.772SEP-10954.277SEP-35379.660SEP8401.663SEP-33519.391SEP-26847.418SEP-35720.523SEP0
461.663SEP15816.229SEP4320.659SEP-11021.824SEP-35452.348SEP8332.328SEP-33593.242SEP-26918.027SEP-35791.379SEP0
461.663SEP15804.024SEP4318.826SEP-11030.161SEP-35455.367SEP8328.640SEP-33594.984SEP-26922.162SEP-35795.445SEP0
```

The first argument of `sed` is a regular expression `'s/{match_pattern}/{replace_pattern}/g'`. Now, let's change the delimiter from `,` to ` ` and count the number of words again.

```sh
sed 's/,/ /g' 10-audio.csv | wc
```

**Output**:

```Text
 113941 1139410 10619374
```

Now, the number of words is ten time greater the the number of lines.

### 4. awk

Finally, we will play around with `awk`. Before we start, the summary of `awk` is it is a programming language.

```sh
awk '{}' 10-audio.csv
```

**Output**:

```Text
```

The output is empty because we did not tell `awk` what to do.

```sh
awk '{print}' 10-audio.csv | head
```

**Output**:

```Text
timestamps,e1,e2,e3,e4,e5,e6,e7,e8,Marker
461.662,15891.174,4424.394,-10929.892,-35342.266,8432.173,-33484.656,-26816.104,-35684.516,0
461.663,15852.706,4367.218,-10978.551,-35400.895,8377.434,-33542.637,-26873.033,-35742.383,0
461.663,15793.318,4297.369,-11044.467,-35470.742,8309.351,-33611.055,-26941.475,-35811.832,0
461.663,15790.927,4305.080,-11047.238,-35466.297,8313.799,-33606.652,-26936.176,-35808.145,0
461.663,15862.273,4387.737,-10966.504,-35377.535,8400.702,-33519.055,-26845.697,-35719.520,0
461.663,15921.572,4446.678,-10906.534,-35320.852,8458.615,-33460.383,-26789.438,-35663.125,0
461.663,15880.557,4393.772,-10954.277,-35379.660,8401.663,-33519.391,-26847.418,-35720.523,0
461.663,15816.229,4320.659,-11021.824,-35452.348,8332.328,-33593.242,-26918.027,-35791.379,0
461.663,15804.024,4318.826,-11030.161,-35455.367,8328.640,-33594.984,-26922.162,-35795.445,0
```

Now, we tell `awk` to just `print`

```sh
awk '{print $0 "|---|" $1 "|==|" $2}' 10-audio.csv | head
```

**Output**:

```Text
timestamps,e1,e2,e3,e4,e5,e6,e7,e8,Marker|---|timestamps,e1,e2,e3,e4,e5,e6,e7,e8,Marker|==|
461.662,15891.174,4424.394,-10929.892,-35342.266,8432.173,-33484.656,-26816.104,-35684.516,0|---|461.662,15891.174,4424.394,-10929.892,-35342.266,8432.173,-33484.656,-26816.104,-35684.516,0|==|
461.663,15852.706,4367.218,-10978.551,-35400.895,8377.434,-33542.637,-26873.033,-35742.383,0|---|461.663,15852.706,4367.218,-10978.551,-35400.895,8377.434,-33542.637,-26873.033,-35742.383,0|==|
461.663,15793.318,4297.369,-11044.467,-35470.742,8309.351,-33611.055,-26941.475,-35811.832,0|---|461.663,15793.318,4297.369,-11044.467,-35470.742,8309.351,-33611.055,-26941.475,-35811.832,0|==|
461.663,15790.927,4305.080,-11047.238,-35466.297,8313.799,-33606.652,-26936.176,-35808.145,0|---|461.663,15790.927,4305.080,-11047.238,-35466.297,8313.799,-33606.652,-26936.176,-35808.145,0|==|
461.663,15862.273,4387.737,-10966.504,-35377.535,8400.702,-33519.055,-26845.697,-35719.520,0|---|461.663,15862.273,4387.737,-10966.504,-35377.535,8400.702,-33519.055,-26845.697,-35719.520,0|==|
461.663,15921.572,4446.678,-10906.534,-35320.852,8458.615,-33460.383,-26789.438,-35663.125,0|---|461.663,15921.572,4446.678,-10906.534,-35320.852,8458.615,-33460.383,-26789.438,-35663.125,0|==|
461.663,15880.557,4393.772,-10954.277,-35379.660,8401.663,-33519.391,-26847.418,-35720.523,0|---|461.663,15880.557,4393.772,-10954.277,-35379.660,8401.663,-33519.391,-26847.418,-35720.523,0|==|
461.663,15816.229,4320.659,-11021.824,-35452.348,8332.328,-33593.242,-26918.027,-35791.379,0|---|461.663,15816.229,4320.659,-11021.824,-35452.348,8332.328,-33593.242,-26918.027,-35791.379,0|==|
461.663,15804.024,4318.826,-11030.161,-35455.367,8328.640,-33594.984,-26922.162,-35795.445,0|---|461.663,15804.024,4318.826,-11030.161,-35455.367,8328.640,-33594.984,-26922.162,-35795.445,0|==|
```

What just happened??? First, remember that `awk` is a language itself. The `print` is actually a function that takes some argument, in this case, four arguments (`$0`, `"|---|"`, `$1`, `"|==|"`, `$2`).

Let's observe the following example.

```sh
awk -F , '{print $0 "|---|" $1 "|==|" $2}' 10-audio.csv | head
```

**Output**:

```Text
timestamps,e1,e2,e3,e4,e5,e6,e7,e8,Marker|---|timestamps|==|e1
461.662,15891.174,4424.394,-10929.892,-35342.266,8432.173,-33484.656,-26816.104,-35684.516,0|---|461.662|==|15891.174
461.663,15852.706,4367.218,-10978.551,-35400.895,8377.434,-33542.637,-26873.033,-35742.383,0|---|461.663|==|15852.706
461.663,15793.318,4297.369,-11044.467,-35470.742,8309.351,-33611.055,-26941.475,-35811.832,0|---|461.663|==|15793.318
461.663,15790.927,4305.080,-11047.238,-35466.297,8313.799,-33606.652,-26936.176,-35808.145,0|---|461.663|==|15790.927
461.663,15862.273,4387.737,-10966.504,-35377.535,8400.702,-33519.055,-26845.697,-35719.520,0|---|461.663|==|15862.273
461.663,15921.572,4446.678,-10906.534,-35320.852,8458.615,-33460.383,-26789.438,-35663.125,0|---|461.663|==|15921.572
461.663,15880.557,4393.772,-10954.277,-35379.660,8401.663,-33519.391,-26847.418,-35720.523,0|---|461.663|==|15880.557
461.663,15816.229,4320.659,-11021.824,-35452.348,8332.328,-33593.242,-26918.027,-35791.379,0|---|461.663|==|15816.229
461.663,15804.024,4318.826,-11030.161,-35455.367,8328.640,-33594.984,-26922.162,-35795.445,0|---|461.663|==|15804.024
```

Explanation time: `awk` loops through lines of `10-audio.csv`. It seperates each line into column with ` ` as a default delimiter. `$1`,`$2`,... refers to colums in order from left to right with `$0` refers to the entire line. In the previous example, option `-F` overrides the defult delimiter to a comma (`,`).

Now, `10-audio.csv` has 10 columns. I want to have this data but only colums `e1,e3,e4,e8,Marker`. For extra fun, I will add a new index in the first column.

```sh
awk -F , 'BEGIN {cnt="index"} {print cnt "," $2 "," $4 "," $5 "," $9 "," $10; ++cnt}' 10-audio.csv | head
```

**Output**:

```Text
index,e1,e3,e4,e8,Marker
1,15891.174,-10929.892,-35342.266,-35684.516,0
2,15852.706,-10978.551,-35400.895,-35742.383,0
3,15793.318,-11044.467,-35470.742,-35811.832,0
4,15790.927,-11047.238,-35466.297,-35808.145,0
5,15862.273,-10966.504,-35377.535,-35719.520,0
6,15921.572,-10906.534,-35320.852,-35663.125,0
7,15880.557,-10954.277,-35379.660,-35720.523,0
8,15816.229,-11021.824,-35452.348,-35791.379,0
9,15804.024,-11030.161,-35455.367,-35795.445,0
```

Now, I will go fully `awk` programming approach.

```sh
awk 'BEGIN {FS=",";OFS="||"; cnt="index"} NR%2==1 {print cnt,$2,$4,$5,$9,$10;} {++cnt}' 10-audio.csv | head
```

**Output**:

```Text
index||e1||e3||e4||e8||Marker
2||15852.706||-10978.551||-35400.895||-35742.383||0
4||15790.927||-11047.238||-35466.297||-35808.145||0
6||15921.572||-10906.534||-35320.852||-35663.125||0
8||15816.229||-11021.824||-35452.348||-35791.379||0
10||15877.651||-10948.466||-35365.758||-35706.176||0
12||15878.210||-10954.635||-35383.078||-35723.945||0
14||15804.739||-11035.771||-35459.547||-35804.680||0
16||15927.473||-10900.767||-35317.434||-35664.242||0
18||15821.771||-11020.103||-35448.793||-35792.629||0
```

Here I can find the line in which the marker is not `0`

```sh
awk 'BEGIN {FS=",";OFS="||"; cnt="index"} $10!=0 {print cnt,$2,$4,$5,$9,$10;} {++cnt}' 10-audio.csv | head
```

**Output**:

```Text
index||e1||e3||e4||e8||Marker
933||15942.024||-10896.453||-35300.199||-35606.016||5_2_1
2390||15727.045||-11126.296||-35432.230||-35774.371||5_2_2
3893||15738.646||-11260.384||-35524.590||-35879.043||5_2_3
5396||15749.620||-11334.815||-35571.059||-35904.926||5_2_4
6900||15760.617||-11384.593||-35561.426||-35892.430||5_2_5
8417||15753.599||-11470.021||-35595.465||-35926.449||-1
12190||15708.202||-11558.064||-35561.492||-35884.250||1_1_1
13618||15756.907||-11589.000||-35489.406||-35832.395||1_1_2
15136||15861.379||-11521.854||-35394.031||-35729.711||1_1_3
```

And I can also count how many markers that is not 0 and -1 do I have in the file.

```sh
awk 'BEGIN {FS=",";OFS="||"; cnt="index"} $10!=0&&$10!=-1 {print cnt,$2,$4,$5,$9,$10;} {++cnt}' 10-audio.csv | wc -l
```

**Output**:

```Text
51
```

It is actually has 50 markers. The output is 51 because the first line is a header.

Another approach to this task

```sh
awk '$10!=0&&$10!=-1 {print $10}' <(sed 's/,/ /g' 10-audio.csv) | wc -l
```

`<()` is a syntax for [process substitution](http://mywiki.wooledge.org/ProcessSubstitution).

### 5. Environment Variable

In developer realm, we often hear **Environment** but what is it exactly? I'm glad you ask (if you did not, it is ok.).

> [Tutorialspoint](https://www.tutorialspoint.com/unix/unix-environment.htm)
>
> An important Unix concept is the environment, which is defined by environment variables. Some are set by the system, others by you, yet others by the shell, or any program that loads another program.
>
> A variable is a character string to which we assign a value. The value assigned could be a number, text, filename, device, or any other type of data.

The meaning from the dictionary.

> [Oxford Languages](https://www.oxfordlearnersdictionaries.com/definition/english/environment)
>
> Environment (noun): the conditions in which a person, animal or plant lives or operates or in which an activity takes place

In my words, **Environment** is the thing that defined why two rooms are different. Why would you choose to work at Library over your bedroom (or someone might choose otherwise). Why is your phone different from another phone. In UNIX, it is the same concept. Start from what package is installed, which version?. These are a part of **Environment**.

**Environment Variable** is a variable (just like in your programming language) in that environment. Before we understand why we need this, let's play around with this concept.

Open your terminal and type `echo $PATH`

```sh
echo $PATH
```

**Output**: (Your output will be different from mine)

```Text
/usr/bin:/usr/local/freesurfer/7.2.0//bin:/usr/local/freesurfer/7.2.0//fsfast/bin:/usr/local/freesurfer/7.2.0//tktools:/usr/local/freesurfer/7.2.0//mni/bin:/home/{your_name}/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/usr/local/freesurfer/7.2.0/bin
```

`$PATH` is one of the variable in your environment and it uses to define where the commands are located. Let's create our own command for fun.

```sh
cd ~/.local/bin
echo 'echo "Hello "`whoami`", welcome to SAD."' > greeting
chmod +x greeting 
greeting 
```

**Output**:

```Text
Hello {your_name}, welcome to SAD.
```

What we just did is create a script named *greeting*, tell the system that it is executable, and call the script. You can call this *greeting* script from anywhere in your system as long as `~/.local/bin` is in the `$PATH`.

#### Variable vs Environment Variable

To make thing even more confuse, there are **variable** and **Environment variable**. While the usage is the same, the effect of both is a bit different.

```sh
VAR_A=10        # This is Variable
export VAR_B=20 # This is Environment Variable
expr $VAR_A + $VAR_B # Calculate plus on $VAR_A and $VAR_B
```

**Output**:

```Text
30
```

The `export` command tells the inherit/child process to declare this variable. Confuse?

```sh
cd ~/playGrd
touch var_vs_varEn
echo 'echo $VAR_A' >> var_vs_varEn
echo 'echo $VAR_B' >> var_vs_varEn
chmod +x var_vs_varEn
./var_vs_varEn
```

**Output**:

```Text

20
```

The first line is supposed to print *10* but it is blank. Because when you call your script, it forks a new child and runs it. The forking process includes `export` script in the beginning. Therefore, there is variable `$VAR_B` and not `$VAR_A`

```sh
export
```

**Output**:(Your output will be different from mine)

```Text
declare -x COLORTERM="truecolor"
declare -x DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/1000/bus"
declare -x DESKTOP_SESSION="ubuntu"
declare -x DISPLAY=":0"
declare -x DOCKER_HOST="unix:///run/user/1000/docker.sock"
declare -x FIX_VERTEX_AREA=""
declare -x FMRI_ANALYSIS_DIR="/usr/local/freesurfer/7.2.0//fsfast"
...
```

```sh
export | grep VAR_B
```

**Output**:

```Text
declare -x VAR_B="20"
```

#### But Why?

There are many use cases for **Environment Variable**. One easy use case is when you are developing your application. You will often write the code in your personal laptop. Once you done with developing, the app needs to be deployed on server. This two stages deploying scheme (Laptop = Dev stage, Server = Production Stage) is a common workflow. One problem is the configuration in your app might need to be changed according to each stage ([Configuration Management](https://www.atlassian.com/continuous-delivery/principles/configuration-management)).

1. **Manual**: of course, the most basic way is to change the configuration manually everytime you deploy.
2. **Seperate Stage Configuration**: You write two configuration files and everytime you deploy, you simply change the name of the configuration file. (maybe, dev-config, prod-config, and config)
3. **Environment Variable**: The first two ways still require some level of human work. This way, your app will automatically aware of the stage. You might `export STAGE="dev"` on your local and `export STAGE="prod"` on the server. The app (depen on programming language) can check these `export` list and write a basic `if` statement and load the intened configuration file.

<div class="page-nav"><p class="inner">
    <span class="prev"> 
        ←
        <a href="./setup-linux.html" class="">Workshop 2 - Have accessible Linux environment</a>
    </span> 
    <span class="next">
        <a href="./home-work-1.html" class="">Home Work</a>
        →
    </span></p>
</div>
