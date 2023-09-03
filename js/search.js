export class Search{ 
    constructor(){ 
        $("#searchSection").fadeIn(400);
        this.searchByNameInput = document.getElementById("searchByName");
        this.searchByFirstLetterInput = document.getElementById("searchByFirstLetter");


        $("#searchByName").keyup(()=>{ 
        this.displayMealsByName($("#searchByName")[0].value);
        })
        $("#searchByFirstLetter").keyup(()=>{ 
        this.displayMealsByFirstLetter($("#searchByFirstLetter")[0].value);
        })

       
    }
    async fetchMealbyName_Api(mealName){ 
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        let result = await response.json()
        return result.meals;
    }

    async displayMealsByName(mealName){ 
        let resopnseFromAPI = await this.fetchMealbyName_Api(mealName) 
        let temp = ``;
        
        for(let i=0 ; i<resopnseFromAPI.length;i++){ 
            if(resopnseFromAPI[i].strMeal.toLowerCase().includes(mealName))
            { 
                temp+=` 
             <div class="col-md-3">
                <div class="search-content">
                    <img src="${resopnseFromAPI[i].strMealThumb}" class="w-100" alt="">
                    <div class="image-overlay">
                        <h3 class="px-2">${resopnseFromAPI[i].strMeal}</h3>
                    </div>
                </div> 
             </div>
                `
            }
        }
        $("#mealsByNameShow").html(temp);

    }

    async fetchMealbyFirstLetter_Api(letter){ 
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        let result = await response.json()
        return result.meals;
    }

    async displayMealsByFirstLetter(letter){ 
        let resopnseFromAPI = await this.fetchMealbyFirstLetter_Api(letter) 
        let temp = ``;
        
        for(let i=0 ; i<resopnseFromAPI.length;i++){ 
            if(resopnseFromAPI[i].strMeal[0].toLowerCase().includes(letter))
            { 
                temp+=` 
             <div class="col-md-3">
                <div class="search-content">
                    <img src="${resopnseFromAPI[i].strMealThumb}" class="w-100" alt="">
                    <div class="image-overlay">
                        <h3 class="px-2">${resopnseFromAPI[i].strMeal}</h3>
                    </div>
                </div> 
             </div>
                `
            }
        }
        $("#mealsByNameShow").html(temp);
    }
} 


