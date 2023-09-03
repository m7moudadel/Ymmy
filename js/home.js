export class Home{ 
    constructor(){ 
         
        this.displayHomeMeals()

        $("#homeRandomMeals").click((e)=>{ 
            let temp = e.target.getAttribute("value");
            console.log( e.target.getAttribute("value"));
            this.displaySingleMeal(temp);
        })
    }

    async fetchHomeMealsAPI(){ 
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        let result = await response.json();
        return result.meals;

    }

    
    async displayHomeMeals() {
        let temp = ``;
        for (let i = 0; i < 20; i++) {
            let responseFromAPI = await this.fetchHomeMealsAPI();
            temp += ` 
            <div class="col-md-3">
            <div class="category-content">
                <img src="${responseFromAPI[0].strMealThumb}" class="w-100" alt="">
                <div class="image-overlay-Category" value="${responseFromAPI[0].strMeal}" style="cursor:pointer;">
                    <h3 class="px-2 fw-bold" value="${responseFromAPI[0].strMeal}">${responseFromAPI[0].strMeal}</h3>                    
                </div>
            </div> 
         </div>
            `
        }
        $("#homeRandomMeals").html(temp);
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
        <div class="col-md-3 text-center"> 
        <div class="innerImage text-center"> 
            <img src="${responseFromApi.strMealThumb}" class="w-100" alt="">
            <h2 class="fw-bold pt-3">${responseFromApi.strMeal}</h2>
        </div>
    </div>
    <div class="col-md-9"> 
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
        $("#homeRandomMeals").html(temp);

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
        $("#recipesDetails").html(reciepeTemp)

        console.log(ingredientsArr);
        console.log(measureArr);

        let tagsArr = [];
        for(let i in responseFromApi){ 
            if(i.startsWith("strTags")){ 
             if(responseFromApi[i] != "" &&  responseFromApi[i] != null && responseFromApi[i] != " "){ 
                tagsArr.push(responseFromApi[i].split(",")[0])
             }
            }
         }
         console.log(tagsArr);

        let tagTemp =``;
        for(let i= 0 ; i<tagsArr.length;i++){ 
            tagTemp+=` 
            <li class="my-2 mx-1 p-2 alert alert-danger rounded">${tagsArr[i]}</li>
            `
        }
        $("#tags").html(tagTemp);
       
    }
}