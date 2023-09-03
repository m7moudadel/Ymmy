export class Ingriedents{ 
    constructor(){ 
        $("#ingredientsSection").fadeIn(500)
       this.displayIngredients();

       $("#ingredients").click((e) => {
        let strIngredient = e.target.getAttribute("value");
        this.displayMealsByIngredients(strIngredient);
    })


    }

    async fetchIngredientAPI(){ 
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
        let result = await response.json();
        return result.meals;

    }

    
    async displayIngredients() {
        let responseFromAPI = await this.fetchIngredientAPI();
        let temp = ``;
        for (let i = 0; i < 20; i++) {
            temp += ` 
            <div class="col-md-3" >
            <div class="ingredientItem py-4 border shadow text-center" style="background-color: #0D0D0D;cursor:pointer;" value="${responseFromAPI[i].strIngredient}"  >
            <i class="fa-solid fa-bowl-food fa-4x" style="color:green"></i>
                <h5 class="text-white" value="${responseFromAPI[i].strIngredient}">${responseFromAPI[i].strIngredient}</h5>
                
            </div> 
         </div>
            `
        }
        $("#ingredients").html(temp);
    }

    async fetchMealsIngredinetsAPI(ingredient) {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        let result = await response.json();
        // console.log(result);
        return result.meals;
    }

    async displayMealsByIngredients(ingredient) {
        let responseFromAPI = await this.fetchMealsIngredinetsAPI(ingredient);
        let temp = ``;
        for (let i = 0; i < responseFromAPI.length; i++) {
            temp += ` 
            <div class="col-md-3">
            <div class="category-content" style="cursor:pointer;" value="${responseFromAPI[i].strMeal}">
                <img src="${responseFromAPI[i].strMealThumb}" class="w-100" alt="">
                <div class="image-overlay-Category" value="${responseFromAPI[i].strMeal}" >
                    <h3 class="px-2" value="${responseFromAPI[i].strMeal}">${responseFromAPI[i].strMeal}</h3>
                </div>
            </div> 
         </div>
            `

        }
        $("#ingredients").html(temp);

        $("#ingredients").click((e) => {
            let strMeal = e.target.getAttribute("value");
            this.displaySingleMeal(strMeal);
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
        $("#ingredients").html(temp);

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