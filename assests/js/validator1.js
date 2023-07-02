
function Validator(options) {
    function parentElm(element,selector) {
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules={};
    function validate(inputElement,rule){
    
        var errorElement = parentElm(inputElement, options.formGroup).querySelector(options.errorSelector);
        var errorMessage ;
        var rules = selectorRules[rule.selector];
        for(var i=0;i<rules.length;i++){
            switch(inputElement.type){
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector+':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }

            if(errorMessage) break;
        }

        if(errorMessage){
            errorElement.innerText = errorMessage;
            parentElm(inputElement, options.formGroup).classList.add('invalid');
        }else{
            errorElement.innerText = '';
            parentElm(inputElement, options.formGroup).classList.remove('invalid');
        } 
        return !errorMessage;         
    }
    var formElement= document.querySelector(options.form);
    if(formElement){
        formElement.onsubmit = function(e){
            e.preventDefault();

            var isFormValid=true;
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isvalid=validate(inputElement,rule);
                if(!isvalid){
                    isFormValid = false;
                }
            });

            if(isFormValid){
                //TH submit vs js
               if(typeof options.onsubmit=="function"){
                    var enableInput=formElement.querySelectorAll('[name]:not([disabled])');
                    console.log(enableInput);
                    //chuyen nodelist sang array
                    var formValues=Array.from(enableInput).reduce(function(values, input){
                        
                        switch(input.type){
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="'+input.name+'"]:checked').value;
                                break;
                            case 'checkbox':
                                if(!input.matches(':checked')){
                                    values[input.name] = [];
                                    return values;
                                }
                                if(!Array.isArray(values[input.name])){
                                        values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name]= input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    },{});
                    options.onsubmit(formValues);
                //TH submit voi hanh vi mac dinh
               }else{
                    formElement.submit();
               }
            }
        }
        //Lap qua moi rule va xu ly(lang nghe su kien blur, input)
        options.rules.forEach(function(rule){

            //Luu lai cac rules cho moi input
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }else{
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);
            
            Array.from(inputElements).forEach(function(inputElement){
                var errorElement = parentElm(inputElement, options.formGroup).querySelector(options.errorSelector);
                //Xu li truong hop blur ra khoi input
                inputElement.onblur=function(){
                    validate(inputElement,rule);
                }
                //Xu li moi khi nguoi dung nhap vao input
                inputElement.oninput=function(){
                    errorElement.innerText = '';
                    parentElm(inputElement, options.formGroup).classList.remove('invalid');
                }
            });
        });
       
    }
}

// Định nghĩa rules
Validator.isRequired=function(selector){
    return {
        selector: selector,
        test: function(value){
            return value ? undefined: "Vui long nhap truong nay"
        }
    };
}
Validator.isEmail=function(selector){
    return {
        selector: selector,
        test: function(value){
            //js email regex
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value)? undefined: "Truong nay phai la Email";
        }
    };
}
Validator.minLength=function(selector,min){
    return {
        selector: selector,
        test: function(value){
            return value.length>=min? undefined: `Vui long nhap toi thieu ${min} ky tu`;
        }
    };
}