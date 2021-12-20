console.log("Hi")

let count = 0;
let h1 = document.getElementById("time")

let func = setInterval(() => {
    h1.innerHTML = count.toString()
    count++;
}, 1000)

setTimeout(() => {
    clearInterval(func)
}, 1000 * 10)