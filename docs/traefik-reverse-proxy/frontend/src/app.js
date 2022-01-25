const outputDom = document.getElementById("output-dom")

const getData = async() => {
    const response = await fetch("/api")
    const jsonText = await response.json()

    outputDom.innerHTML = JSON.stringify(jsonText)
}

const addCount = async() => {
    const response = await fetch("/api/count")
}