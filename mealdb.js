document.getElementById('searchButton').addEventListener('click', function() {
    var searchText = document.getElementById('searchBox').value;
    fetchMeals(searchText);
});

function fetchMeals(searchText) {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchText)
        .then(response => response.json())
        .then(data => displayMeals(data.meals));
}

function displayMeals(meals) {
    var resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ''; // Clear previous content

    if (meals === null) {
        resultContainer.innerHTML = '<p>Meal not found. Try a different search.</p>';
        return;
    }

    meals.slice(0, 5).forEach(meal => {
        var mealDiv = document.createElement('div');
        mealDiv.classList.add('meal');
        mealDiv.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:100%;border-radius: 5px;">
            <p>${meal.strInstructions.substring(0, 150)}...</p>
        `;
        resultContainer.appendChild(mealDiv);
    });
}
