
import { Home } from './home.js';
import { Search } from './search.js';
import { Category } from './category.js';
import { Area } from './area.js';
import { Ingriedents } from './ingredients.js';
import { Contact } from './contact.js';


$("#homeSection").ready(function(){ 
    $("#loadingScreen").fadeOut(4000);
    $("body").css("overflow","visible");
    let homeObj = new Home();
})

 
let internalNavWidth = $(".internalNav").innerWidth();
let sideNav = $(".sideNav").css("left");

$("#toggleIcon").click(function(){ 
    if(sideNav == "0px"){ 
        $(".sideNav").animate({"left": `-${internalNavWidth}`},500);
        $("#toggleIcon").html(`<i class="fa fa-align-justify fa-2x"></i>`);
        $(".internalNav ul li ").animate({"padding-top":"50px"},700);
    }
    
    else{ 
        $("#toggleIcon").html(`<i class="fa-solid fa-xmark fa-2x"></i>`);
        $(".internalNav ul li ").animate({"padding-top":"15px"},1000);
        $(".sideNav").animate({ "left": "0px" },500);
    }
})


$(".internalNav ul li a").click(function(){ 
    $(".sideNav").animate({"left": -internalNavWidth},500);
    $("#toggleIcon").html(`<i class="fa fa-align-justify fa-2x"></i>`);
     
    let href = $(this).attr('href');

    
    if(href == "#searchSection"){ 
        $("#homeSection").css("display","none")
        $("#categorySection").css("display","none")
        $("#areaSection").css("display","none")
        $("#ingredientsSection").css("display","none")
        $("#contactSection").css("display","none")

        let searchObj = new Search();
    }
    else if(href == "#categorySection"){ 
        $("#homeSection").css("display","none")
        $("#searchSection").css("display","none")
        $("#areaSection").css("display","none")
        $("#ingredientsSection").css("display","none")
        $("#contactSection").css("display","none")

        let categoryObj = new Category();
        
    }
    else if(href == "#areaSection"){ 
        $("#homeSection").css("display","none")
        $("#searchSection").css("display","none")
        $("#categorySection").css("display","none")
        $("#ingredientsSection").css("display","none")
        $("#contactSection").css("display","none")

        let areaObj = new Area();
    }
    else if(href == "#ingredientsSection"){ 
        $("#homeSection").css("display","none")
        $("#searchSection").css("display","none")
        $("#categorySection").css("display","none")
        $("#areaSection").css("display","none")
        $("#contactSection").css("display","none")
        let ingredientObj = new Ingriedents();
    }
    else if(href == "#contactSection"){ 
        $("#homeSection").css("display","none")
        $("#searchSection").css("display","none")
        $("#categorySection").css("display","none")
        $("#areaSection").css("display","none")
        $("#ingredientsSection").css("display","none")

        let contactObj = new Contact();
    }
})