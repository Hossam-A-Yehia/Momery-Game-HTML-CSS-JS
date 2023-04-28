let flashScreen = document.querySelector(".overflow-game span")
flashScreen.onclick = function () {
    let yourName = prompt("What iS Name")
    if (yourName == null || yourName == "") {
        document.querySelector(".info-container .name span").innerHTML = "No One"
    }else {
        document.querySelector(".info-container .name span").innerHTML = yourName
    }
    document.querySelector(".overflow-game").remove()
    document.getElementById("start").play()

}

let duration = 1000

let blockContainer = document.querySelector(".memory-game-blocks")
let blocks = Array.from(blockContainer.children)
let orderRange = [...Array(blocks.length).keys()]

blocks.forEach((block) => {
    block.style.order = orderRange[Math.floor(Math.random() * orderRange.length)]
    block.addEventListener("click", function () {
        flipBlock(block) 
    })
})

function flipBlock (block) {
    block.classList.add("is-flipped")
    let allFlippedBlock = blocks.filter(flipBlock => flipBlock.classList.contains("is-flipped"))
    if(allFlippedBlock.length === 2) {
        stopClick()
        checkMatchBlock(allFlippedBlock[0], allFlippedBlock[1])
    }
}
function stopClick() {
    blockContainer.classList.add("no-clicked")
    setTimeout(() => {
        blockContainer.classList.remove("no-clicked")
    }, duration)
}
function checkMatchBlock (firstElement, secElement) {
    let triesElement = document.querySelector(".tries span")

    if (firstElement.dataset.technology === secElement.dataset.technology) {
        firstElement.classList.remove("is-flipped")
        secElement.classList.remove("is-flipped")

        firstElement.classList.add("has-match")
        secElement.classList.add("has-match")
        document.getElementById("succ").play()
    }else {
        triesElement.innerHTML = parseInt((triesElement.innerHTML)) + 1
        
        setTimeout(() => {
            firstElement.classList.remove("is-flipped")
            secElement.classList.remove("is-flipped")
            
        }, duration)
        document.getElementById("fail").play()
    }
}