

function addInputField(event) {
    let parentDiv = event.target.parentElement.parentElement;
    let div = document.createElement("div")

    let input = document.createElement("input")
    input.classList.add(event.target.parentElement.id)
    input.value = event.target.parentElement.children[0].value
    event.target.parentElement.children[0].value = ''
    div.appendChild(input)

    let button = document.createElement("button")
    button.textContent = "remove"
    button.classList.add("remove-button")
    button.addEventListener("click", removeItem)

    div.appendChild(button)
    parentDiv.insertBefore(div, parentDiv.lastElementChild)
}

function removeItem(event) {
    event.target.parentElement.remove()
}

async function postNewRecipe () {
    let name = document.getElementById("name").value

    let ingredients = document.querySelectorAll(".ingredients-div")
    ingredients = Array.from(ingredients)
    ingredientList = []
    ingredients.forEach((ingredient) => {if (ingredient.value !== '') {ingredientList.push(ingredient.value)}})
    
    let instructions = document.querySelectorAll(".instructions-div")
    instructions = Array.from(instructions)
    instructionList = []
    instructions.forEach((instruction) => {if (instruction.value !== '') {instructionList.push(instruction.value)}})
    
    let imageLink = document.getElementById("imageLink").value

    let keywords = document.querySelectorAll(".keywords-div")
    keywords = Array.from(keywords)
    keywordList = []
    keywords.forEach((keyword) => {if (keyword.value !== '') {keywordList.push(keyword.value)}})

    // console.log(`${ingredientList} --- ${instructionList} --- ${keywordList}`)
    // console.log(Array.isArray(ingredientList))
    // console.log(ingredientList)
    // console.log(instructionList)
    // console.log(keywordList)

    let postBody = {
        user: "me",
        name: name,
        ingredients: ingredientList,
        instructions: instructionList,
        imageLink: imageLink,
        userPosted: "1234",
        keyWords: keywordList
    }

    let response = await fetch('https://recipe-application-group.herokuapp.com/recipes', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody),
        user: "talitha"
    })
    // .then(response => response.json())
    // .then(data => alert(data))
    .then(response => console.log(response))
    .then(data => console.log(data))
}

 let addButtons = document.querySelectorAll('.add-button')
 addButtons.forEach(button => button.addEventListener("click", addInputField))

 let saveButton = document.getElementById("save-button")
 saveButton.addEventListener("click", postNewRecipe)