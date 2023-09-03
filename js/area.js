export class Area{ 
    constructor(){ 
        $("#areaSection").fadeIn(500);
        this.displayAreas()

        
        $("#AreaRegions").click((e) => {
            let strArea = e.target.getAttribute("value");
            this.displayAreaMeals(strArea);
        })


    }

    async fetchAreaAPI(){ 
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        let result = await response.json();
        return result.meals;
    }

    async displayAreas() {
        let responseFromAPI = await this.fetchAreaAPI();
        let temp = ``;
        for (let i = 0; i < responseFromAPI.length; i++) {
            temp += ` 
            <div class="col-md-3" >
            <div class="city py-4 border  shadow text-center" style="background-color: #0D0D0D;cursor:pointer;" value="${responseFromAPI[i].strArea}"  >
            <i class="fa-solid fa-city fa-4x" style="color:red" value="${responseFromAPI[i].strArea}"></i>
                <h4 class="text-white" value="${responseFromAPI[i].strArea}">${responseFromAPI[i].strArea}</h4>
            </div> 
         </div>
            `
        }
        $("#AreaRegions").html(temp);
    }


    async fetchAreaMealsAPI(region) {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${region}`)
        let result = await response.json();
        return result.meals;
    }

    async displayAreaMeals(region) {
        let responseFromAPI = await this.fetchAreaMealsAPI(region);
        let temp = ``;
        for (let i = 0; i < responseFromAPI.length; i++) {
            temp += ` 
            <div class="col-md-3" style="cursor:pointer;">
            <div class="category-content text-center" >
                <img src="${responseFromAPI[i].strMealThumb}" class="w-100" alt="">
                <div class="image-overlay-Category" value="${responseFromAPI[i].strMeal}" >
                    <h3 class="px-2" value="${responseFromAPI[i].strMeal}">${responseFromAPI[i].strMeal}</h3>
                </div>
            </div> 
         </div>
            `

        }
        $("#AreaRegions").html(temp);

        $("#AreaRegions").click((e) => {
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
        $("#AreaRegions").html(temp);

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