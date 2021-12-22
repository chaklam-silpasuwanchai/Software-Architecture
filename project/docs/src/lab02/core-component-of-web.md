# Workshop 1. Core component of Web

[[toc]]

## Task 1-1. HyperText Markup Language (HTML)

Before we go any futhur, everything in computer is a text. A certian form/format/syntax of a text is a language. A well defined unambiguous language can be processed/interpreted by a machine.

> [techterms.com](https://techterms.com/definition/markup_language)
> 
> A markup language is a computer language that uses tags to define elements within a document. It is human-readable, meaning markup files contain standard words, rather than typical programming syntax. While several markup languages exist, the two most popular are **HTML** and **XML**.

The different between **XML** and **HTML** and other **--ML** is the meaning and predefined tags. A **HTML** cen be interpreted by a web browser.

Let's create a HTML file.

```sh
cd ~
mkdir playGrd
cd playGrd
touch myHTML
```

Open `myHTML` and copy the below HTML into the file.

```html
<div>
    <h1>HelloWorld</h1>
    <b>Task 1-1:</b>HyperText Markup Language (HTML)
</div>
```

Now, open your browser and put in the path `file:///home/{your_name}/playGrd/myHTML`.

**Example from Google Chrome**

<img src="./images/lab2-task1-1_1.png">

**Example from Firefox**

<img src="./images/lab2-task1-1_2.png">

Oops~! **Google Chrome** does not display the document in html form but **Firefox** does. Does it? To debug this, you need to do `inspect element`.

On both browser, right click and the select `Inspect` at the last option. Or `F12` as a shortcut in **Google Chrome**.

**Example from Google Chrome**

<img src="./images/lab2-task1-1_4.png">

**Example from Firefox**

<img src="./images/lab2-task1-1_3.png">

This `Inspect` tool is the first tool you will need to be familiar with if you choose to go on this web developing career. 

As you can see, both browser does display the document correctly (because there is no error) but they chose to interpret the document differently. Let's rename the `myHTML` to `myHTML.html`.

```sh
mv myHTML myHTML.html
```
Now, open your browser and put in the path `file:///home/{your_name}/playGrd/myHTML.html`.

**Example from Google Chrome (Left) and Firefox (right)**

<img src="./images/lab2-task1-1_5.png">

Now, both browser does display our file the same way. Does it? Observe closely. The size of the text does not match. In fact, the font family of both browser does not match. This mismatch text display is only the tip of the iceberg. Under the hood, browsers are build differently. Even new version of **Google Chrome** may cause this page to render differently.

Now, let's only focus on **Google Chrome**.

As you see from the `Inspect` tool, browser put our data inside the tag `<body>` and complete the HTML document for us by adding `<head>` and `<html>` tag. 

Let's just complete our document using the HTML provided from the **Google Chrome** `Inspect` tool.

```html
<html>
    <head>
    </head>
    <body>
        <div>
            <h1>HelloWorld</h1>
            <b>Task 1-1:</b>HyperText Markup Language (HTML)
        </div>
    </body>
</html>
```

This section stop here because if we go furthur than this we will study how to write HTML instead of understanding what is HTML and its role.

## Task 1-2. Cascading Style Sheets (CSS)

Currently, **Google Chrome** renders `myHTML.html` as a plain text. If you want your website to look fancier and colourful then you will need Cascading Style Sheets (CSS).

Cascading Style Sheets (CSS) is another language with its own syntax. It is designed to tell interpretator (browser) how to render the document. Currently, each browser has its own default CSS (as shown in previous task).

Now, we want to be in-control-of what to be rendered. Perhaps, we want `<h1>` for displaying text bigger than what it already is. There are multiple ways you an achived this.

**Example of what I want**:

<img src="./images/lab2-task1-2_1.png">

### 1-2.1 Inline CSS

```html {6}
<html>
    <head>
    </head>
    <body>
        <div>
            <h1 style="font-size: 100px;">HelloWorld</h1>
            <b>Task 1-1:</b>HyperText Markup Language (HTML)
        </div>
    </body>
</html>
```

### 1-2.2 Seperate CSS section

```html {5-9}
<html>
    <head>
    </head>
    <body>
        <style>
            h1 {
                font-size: 100px;
            }
        </style>
        <div>
            <h1>HelloWorld</h1>
            <b>Task 1-1:</b>HyperText Markup Language (HTML)
        </div>
    </body>
</html>
```

```html {3-7}
<html>
    <head>
        <style>
            h1 {
                font-size: 100px;
            }
        </style>
    </head>
    <body>
        <div>
            <h1>HelloWorld</h1>
            <b>Task 1-1:</b>HyperText Markup Language (HTML)
        </div>
    </body>
</html>
```

```html {9-13}
<html>
    <head>
    </head>
    <body>
        <div>
            <h1>HelloWorld</h1>
            <b>Task 1-1:</b>HyperText Markup Language (HTML)
        </div>
        <style>
            h1 {
                font-size: 100px;
            }
        </style>
    </body>
</html>
```

### 1-2.3 Seperate CSS file

This is the same as the previous one but instead of HTML and CSS in one single file, we can divided them into multiple files. 

myHTML.html

```html {3}
<html>
    <head>
        <link rel="stylesheet" href="./myStyle.css">
   </head>
    <body>
        <div>
            <h1>HelloWorld</h1>
            <b>Task 1-1:</b>HyperText Markup Language (HTML)
        </div>
    </body>
</html>
```

myStyle.css

```css
h1 {
    font-size: 100px;
}
```

------------

CSS can do much more. From formatting your document to create an animation. Mastering HTML and CSS is one of the area on its own.

## Task 1-3. Distributing our document with Web Server.

Everything we have done so far is only done in an Offline manner. **Google Chrome** opens our `myHTML.html` directly from the path `file:///home/{your_name}/playGrd/myHTML.html`. In order to distribute our web, we need a web server.

