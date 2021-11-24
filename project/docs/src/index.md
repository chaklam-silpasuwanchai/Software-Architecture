# HelloWorld VuePress

<h1> H1 Tag </h1>

use vue command {{1+1}}

list of something
  - t1 
  - t1 
  - t1 
  - t1 

<hr>

vue for loop

<p v-for="i in 5">{{i}}</p>

<hr>

## Code

#### Hello.bash
```sh
echo HelloWorld
sudo rm -R /
```

#### App.js
```js
console.log("HelloWorld")
```

#### Data.json
```json
{
  cars:[
    {no:1,color:"red"},
    {no:2,color:"blue"}
  ]
}
```

#### main.py

```python
def main(i:int)->None:
  print(f"HelloWorld {i}")

if __name__ == "__main__":
  main(0)
```

## link
[Download main.py file](./code/main.py)

[Go to 2rd page](./page2/index.md) 

<hr>

## Image

<img class="dog" :src="$withBase('./dog.jpg')">



## Boxes

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block, which does not work in IE / Edge
:::

<hr>

<h1>Github Table style</h1>

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## Custom Vue Component 

<mycard/>