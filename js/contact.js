export class Contact{ 
    constructor(){ 
        $("#contactSection").fadeIn(500);
        this.nameInput = document.getElementById("nameInput");
        this.emailInput = document.getElementById("emailInput");
        this.phoneInput = document.getElementById("phoneInput");
        this.ageInput = document.getElementById("ageInput");
        this.passwordInput = document.getElementById("passwordInput");
        this.repasswordInput = document.getElementById("repasswordInput");
        
       
        $("#nameInput").blur((e)=>{ 
            this.validateName(e.target.value);
            this.enableBtn();
        })
        $("#emailInput").blur((e)=>{ 
            this.validateEmail(e.target.value);
            this.enableBtn();
        })
        $("#phoneInput").blur((e)=>{ 
            this.validatePhone(e.target.value);
            this.enableBtn();
        })
        $("#ageInput").blur((e)=>{ 
            this.validateAge(e.target.value);
            this.enableBtn();
        })
        $("#passwordInput").blur((e)=>{ 
            this.validatePassword(e.target.value);
            this.enableBtn();
        })
        $("#repasswordInput").blur((e)=>{ 
            this.validateRepassword(e.target.value);
            this.enableBtn();
        })
       
    }

    enableBtn(){ 
        if($("#nameInput").hasClass("is-valid") && $("#emailInput").hasClass("is-valid")
        && $("#phoneInput").hasClass("is-valid") && $("#ageInput").hasClass("is-valid") 
        && $("#passwordInput").hasClass("is-valid") && $("#repasswordInput").hasClass("is-valid") == true ){ 
            $("#submitBtn").removeClass("disabled");
        }
    }

    validateName(val){ 
        let regexName =/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/
        if(regexName.test(val)== true){ 
            this.nameInput.classList.add("is-valid");
            this.nameInput.classList.remove("is-invalid");
            $("#alertName").css("display","none")
            
        }
        else{ 
            this.nameInput.classList.add("is-invalid")
            this.nameInput.classList.remove("is-valid")
            $("#alertName").css("display","block")
          
        }
    }
    validateEmail(val){ 
        let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regexEmail.test(val)== true){ 
            this.emailInput.classList.add("is-valid");
            this.emailInput.classList.remove("is-invalid");
            $("#alertEmail").css("display","none")
           
        }
        else{ 
            this.emailInput.classList.add("is-invalid")
            this.emailInput.classList.remove("is-valid")
            $("#alertEmail").css("display","block")
        }
    }
    validatePhone(val){ 
        let regexPhone = /^01[0125][0-9]{8}$/;
        if(regexPhone.test(val)== true){ 
            this.phoneInput.classList.add("is-valid");
            this.phoneInput.classList.remove("is-invalid");
            $("#alertPhone").css("display","none")
        }
        else{ 
            this.phoneInput.classList.add("is-invalid")
            this.phoneInput.classList.remove("is-valid")
            $("#alertPhone").css("display","block")
        }
    }
    validateAge(val){ 
        let regexAge = /^([1-9][0-9]|100)$/;
        if(regexAge.test(val)== true){ 
            this.ageInput.classList.add("is-valid");
            this.ageInput.classList.remove("is-invalid");
            $("#alertAge").css("display","none")
        }
        else{ 
            this.ageInput.classList.add("is-invalid")
            this.ageInput.classList.remove("is-valid")
            $("#alertAge").css("display","block")
        }
    }
    validatePassword(val){ 
        let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if(regexPassword.test(val)== true){ 
            this.passwordInput.classList.add("is-valid");
            this.passwordInput.classList.remove("is-invalid");
            $("#alertPassword").css("display","none")
          
        }
        else{ 
            this.passwordInput.classList.add("is-invalid")
            this.passwordInput.classList.remove("is-valid")
            $("#alertPassword").css("display","block")
        }
    }
    validateRepassword(val){ 
        let valFromPasswordInput = this.passwordInput.value;
        if(valFromPasswordInput != ""){ 
            if(this.repasswordInput.value === valFromPasswordInput) { 
                this.repasswordInput.classList.add("is-valid");
                this.repasswordInput.classList.remove("is-invalid");
                $("#alertRePassword").css("display","none")
             
            }
            else{ 
                this.repasswordInput.classList.add("is-invalid")
                this.repasswordInput.classList.remove("is-valid")
                $("#alertRePassword").css("display","block")
              
            }
        }
    }
}