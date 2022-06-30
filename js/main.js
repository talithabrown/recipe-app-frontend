
async function getAllRecipes () {

    let response = await fetch('https://recipe-application-group.herokuapp.com/recipes', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => createRecipeDiv(data, "all-recipes-div"))
}

async function getRecipesByKeyWords () {
    let inputElement = document.getElementById('search-input');
    let keywords = inputElement.value;
    inputElement.value = "";
    let keywordsArray = keywords.split(" ");
    var query = "?"
    for (let i = 0; i < keywordsArray.length; i++) {
        if (i == keywordsArray.length - 1) {
            query += `keywords[]=${keywordsArray[i]}`
        } else {
            query += `keywords[]=${keywordsArray[i]}&`
        }
    }
    let response = await fetch(`https://recipe-application-group.herokuapp.com/recipes/keywords/${query}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => createRecipeDiv(data, "all-recipes-div"))
}

function createRecipeDiv (data, htmlElementId) {
    let main = document.getElementById(htmlElementId);
    main.innerHTML = ""
    for (let i = 0; i < data.length; i++){

        let recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe-divs")

        let h2 = document.createElement("h2");
        h2.textContent = data[i].name;
        recipeDiv.appendChild(h2)

        if (data[i].date) {
            let date = document.createElement("p")
            date.textContent = formatDate(data[i].date)
            recipeDiv.appendChild(date);
        }

        let author = document.createElement("p");
        author.textContent = data[i].userPosted;
        recipeDiv.appendChild(author);

        let ingredientsDiv = createDivWithH3AndUl('Ingredients', data[i].ingredients)
        recipeDiv.appendChild(ingredientsDiv);

        let instructionsDiv = createDivWithH3AndUl('Instructions', data[i].instructions )
        recipeDiv.appendChild(instructionsDiv);

        main.appendChild(recipeDiv);
    }
}

function createDivWithH3AndUl(heading, list) {
    let div = document.createElement("div");

    let h3 = document.createElement("h3");
    h3.textContent = heading;
    div.appendChild(h3);

    let ul = document.createElement("ul");
    for (let i = 0; i < list.length; i++) {
        let li = document.createElement("li")
        li.textContent = list[i]
        ul.appendChild(li)
    }
    div.appendChild(ul);
    return div
}

function formatDate(date) {
    let year = date.substring(0, 4)
    let month = date.substring(5, 7)
    let day = date.substring(8, 10)
    return `${month}-${day}-${year}`;
}

let getAllRecipesButton = document.getElementById('get-all-recipes')
getAllRecipesButton.addEventListener("click", getAllRecipes)

let searchButton = document.getElementById('search')
searchButton.addEventListener("click", getRecipesByKeyWords)
