const app = document.getElementById('root')
let request = new XMLHttpRequest()
let request2 = new XMLHttpRequest()
let request3 = new XMLHttpRequest()
let request4 = new XMLHttpRequest()
const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(container)
const select1 = document.getElementById('ingredient1');
const select2 = document.getElementById('ingredient2');
const select3 = document.getElementById('ingredient3');
const categorySelect = document.getElementById('categorySelect');
const mealList = document.getElementById('mealList');
const get_meal_btn = document.getElementById('gobtn');
const get_category_btn = document.getElementById('goCategoryBtn');
const chooseRecipeText = document.getElementById('h3');
const noRecipesAlert = document.getElementById('norecipes');




/// Ingredient fetch and create ingredient list ///
request.open('GET', 'https://www.themealdb.com/api/json/v1/1/list.php?i=list', true)
request.onload = function () {
  var data = JSON.parse(this.response);
  let options = [];
  if (request.status >= 200 && request.status < 400) {
    for (let i=0; i<data.meals.length; i++) {
		options.push(`<option value='${data.meals[i].strIngredient}'>${data.meals[i].strIngredient}</option>`)
	}
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
  options.unshift('<option value="">Select an ingredient...</option>')
  select1.innerHTML = options;
  select3.innerHTML = options;
  select2.innerHTML = options;
}
request.send()


/// Category fetch and create Category list ///
request3.open('GET', 'https://www.themealdb.com/api/json/v1/1/list.php?c=list', true)
request3.onload = function () {
	var data = JSON.parse(this.response);
	let categoryOptions = [];
	if (request3.status >= 200 && request3.status < 400) {
	  for (let i=0; i<data.meals.length; i++) {
		categoryOptions.push(`<option value='${data.meals[i].strCategory}'>${data.meals[i].strCategory}</option>`)
	  }
	} else {
	  const errorMessage = document.createElement('marquee')
	  errorMessage.textContent = `Gah, it's not working!`
	  app.appendChild(errorMessage)
	}
	categoryOptions.unshift('<option value="">Select a category...</option>')
	categorySelect.innerHTML = categoryOptions ;
  }
request3.send()
  



// Ingredients to Meal fetch and meal list creation // fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealRequest}`)


get_meal_btn.addEventListener('click', () => {
  const ingredient1 = document.querySelector('#ingredient1').value.replace(/ /g,"_");
  const ingredient2 = document.querySelector('#ingredient2').value.replace(/ /g,"_");
  const ingredient3 = document.querySelector('#ingredient3').value.replace(/ /g,"_");
  let combinedIngredients = [];
  	if (ingredient1 !== "") {combinedIngredients.push(ingredient1)}
	if (ingredient2 !== "") {combinedIngredients.push(ingredient2)}
	if (ingredient3 !== "") {combinedIngredients.push(ingredient3)}

  const uniqueIngredients = new Set(combinedIngredients)
  const mealOptions = [];

  request2.open('GET', `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${[...uniqueIngredients].join(',')}`, true)
  request2.send()
  request2.onload = function () {
    var data = JSON.parse(this.response);
    
    if (request2.status >= 200 && request2.status < 400) {
	  chooseRecipeText.style.display = 'flex';
	  if (data.meals == null) {
		noRecipesAlert.style.display = 'flex';
		mealList.style.display = 'none';
		container.style.display = 'none';
		container.innerHTML = '';
	  }
	  if (data.meals) {
		noRecipesAlert.style.display = 'none';
		mealList.style.display = 'block'
		container.style.display = 'flex'
	  }
      for (let i=0; i<data.meals.length; i++) {
        mealOptions.push(`<button class="button-54" onclick="createMeal(${data.meals[i].idMeal})">${data.meals[i].strMeal}</button>`)
    }
    } else {
      const errorMessage = document.createElement('marquee')
      errorMessage.textContent = `Gah, it's not working!`
      app.appendChild(errorMessage)
    }
    mealList.innerHTML = mealOptions.join( "" );
  }
  
});



// Category to Meal fetch and meal list creation // 


get_category_btn.addEventListener('click', () => {
	const selectedCategory = document.querySelector('#categorySelect').value.replace(/ /g,"_");
    const mealOptions = [];
	request4.open('GET', `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`, true)
	request4.send()
	request4.onload = function () {
	  var data = JSON.parse(this.response);
	  
	  if (request4.status >= 200 && request4.status < 400) {
		chooseRecipeText.style.display = 'flex';
		if (data.meals == null) {
		  noRecipesAlert.style.display = 'flex';
		  mealList.style.display = 'none';
		  container.style.display = 'none';
		  container.innerHTML = '';
		}
		if (data.meals) {
		  noRecipesAlert.style.display = 'none';
		  mealList.style.display = 'block'
		  container.style.display = 'none'
		}
		for (let i=0; i<data.meals.length; i++) {
		  mealOptions.push(`<button class="button-54" onclick="createMeal(${data.meals[i].idMeal})">${data.meals[i].strMeal}</button>`)
	  }
	  } else {
		const errorMessage = document.createElement('marquee')
		errorMessage.textContent = `Gah, it's not working!`
		app.appendChild(errorMessage)
	  }
	  mealList.innerHTML = mealOptions.join( "" );
	  document.getElementById('mealList').scrollIntoView();
	}
	
  });




// Display selected meal instructions and picture // 

async function createMeal(qmeal) {

	const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${qmeal}`);
	const data = await response.json();
	const meal = data.meals[0]
	container.style.display = 'flex'
	const ingredients = [];
	for(let i=1; i<=20; i++) {
		if(meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			break;
		}
	}
	
	const newInnerHTML = `
		<div class="row">
			<div class="columns five">
        <h1>${meal.strMeal}</h1>
				<img src="${meal.strMealThumb}" alt="Meal Image">
				<div class='pwrapper'>
				${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
				</div>
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<div class="columns seven">
			<h5>Instructions:</h5>
				<p>${meal.strInstructions}</p>
			</div>
		</div>
		${meal.strYoutube ? `
		<div class="row2">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>` : ''}
	`;
	
	container.innerHTML = newInnerHTML;
	await document.getElementById('root').scrollIntoView();
}


