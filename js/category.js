export class Category {
    constructor() {

        $("#categorySection").fadeIn(500);
        this.displayCategories()


        $("#categoryItems").click((e) => {
            let strCtegory = e.target.getAttribute("value");
            this.displayCategoryMeals(strCtegory);
        })

    }

    async fetchCategoryAPI() {
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        let result = await response.json();
        return result.categories
    }

    async displayCategories() {
        let responseFromAPI = await this.fetchCategoryAPI();
        let temp = ``;
        for (let i = 0; i < responseFromAPI.length; i++) {
            temp += ` 
            <div class="col-md-3">
            <div class="category-content" style="cursor:pointer;">
                <img src="${responseFromAPI[i].strCategoryThumb}" class="w-100" alt="">
                <div class="image-overlay-Category" value=${responseFromAPI[i].strCategory}>
                    <h3 class="px-2">${responseFromAPI[i].strCategory}</h3>
                </div>
            </div> 
         </div>
            `
        }
        $("#categoryItems").html(temp);
    }

    async fetchCategoryMealsAPI(categoryVal) {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryVal}`)
        let result = await response.json();
        return result.meals;
    }

    async displayCategoryMeals(categoryVal) {
        let responseFromAPI = await this.fetchCategoryMealsAPI(categoryVal);
        let temp = ``;
        for (let i = 0; i <responseFromAPI.length; i++) {
            temp += ` 
            <div class="col-md-3" value="${responseFromAPI[i].strCategory}" data-meal-type="${responseFromAPI[i].strMeal}">
            <div class="category-content" style="cursor:pointer;" data-meal-type="${responseFromAPI[i].strMeal}" value="${responseFromAPI[i].strCategory}">
                <img src="${responseFromAPI[i].strMealThumb}" class="w-100" alt="">
                <div class="image-overlay-Category" data-meal-type="${responseFromAPI[i].strMeal}" value="${responseFromAPI[i].strCategory}">
                    <h3 class="px-2" data-meal-type="${responseFromAPI[i].strMeal}" value="${responseFromAPI[i].strCategory}">${responseFromAPI[i].strMeal}</h3>
                </div>
            </div> 
         </div>
            `
        }
        $("#categoryItems").html(temp);

        $("#categoryItems").click((e) => {
            let strCtegory = e.target.getAttribute("data-meal-type");
            this.displaySingleMeal(strCtegory);
        })
    }


    async fetchMealDetails(mealName) {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        let result = await response.json();
        return result.meals[0];
    }
    async displaySingleMeal(mealName){ 
        let responseFromApi = await this.fetchMealDetails(mealName);
        let temp = ``;
        temp=` 
        <div class="col-md-3 text-center text-white"> 
        <div class="innerImage text-center"> 
            <img src="${responseFromApi.strMealThumb}" class="w-100" alt="">
            <h2 class="fw-bold pt-3">${responseFromApi.strMeal}</h2>
        </div>
    </div>
    <div class="col-md-9 text-white"> 
        <div class="innerContent"> 
            <h2>Instructions</h2>
            <p>${responseFromApi.strInstructions}</p>
            <p><span class="fw-bold" >Area:</span> ${responseFromApi.strArea}</p>
            <p><span class="fw-bold" >Category:</span> ${responseFromApi.strCategory}</p>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex" id="recipesDetails">
                
            </ul>
            <h3>Tags :</h3>

            <ul class="list-unstyled d-flex" id="tags">

            </ul>
            <button type="button" class="btn btn-success me-1"><a href="${responseFromApi.strSource}">Source</a></button>
            <button type="button" class="btn btn-danger"><a href="${responseFromApi.strYoutube}">Youtube</a></button>
        </div>
        `
        $("#categoryItems").html(temp);

        let ingredientsArr = [];
        let measureArr = []
        for(let i in responseFromApi){ 
           if(i.startsWith("strIngredient")){ 
            if(responseFromApi[i] != "" &&  responseFromApi[i] != null && responseFromApi[i] != " " ){ 
                ingredientsArr.push(responseFromApi[i])
            }
           }
        }
        for(let i in responseFromApi){ 
           if(i.startsWith("strMeasure")){ 
            if(responseFromApi[i] != "" &&  responseFromApi[i] != null && responseFromApi[i] != " "){ 
                measureArr.push(responseFromApi[i])
            }
           }
        }

        let reciepeTemp = ``;
        for(let i=0; i<ingredientsArr.length ; i++){ 
            reciepeTemp += ` 
            <li class="my-2 mx-1 p-2 alert alert-success rounded">${measureArr[i]} of ${ingredientsArr[i]}</li>
            `
        }
        $("#recipesDetails").html(reciepeTemp);

        let tagsArr = [];
        for(let i in responseFromApi){ 
            if(i.startsWith("strTags")){ 
             if(responseFromApi[i] != "" &&  responseFromApi[i] != null && responseFromApi[i] != " "){ 
                tagsArr.push(responseFromApi[i].split(",")[0])
             }
            }
         }
        //  console.log(tagsArr);

        let tagTemp =``;
        for(let i= 0 ; i<tagsArr.length;i++){ 
            tagTemp+=` 
            <li class="my-2 mx-1 p-2 alert alert-danger rounded">${tagsArr[i]}</li>
            `
        }
        $("#tags").html(tagTemp);
       
    }




}