import * as Constants from "@resources/Constants";

export const emailOrMobileValidation=(emailid)=>{
    let errorMsg=""
    let checkIfNumber=/^[0-9]*$/;
    let emailtest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!checkIfNumber.test(emailid)){
        if(emailtest.test(String(emailid).toLowerCase())){
            return errorMsg;
        }else{
            return Constants.INVALID_EMAIL;
        }
    }else{
        if(emailid.length==10){
            return errorMsg;
        }else{
            if(emailid.length==0){
                return Constants.INVALID_NUMBER+' or Email'
            }
            return Constants.INVALID_NUMBER;
        }
    }
}

export const passwordValidation=(password)=>{
    var testpasswd=/^[a-zA-Z0-9]*$/;
    if(password){
    if(password.length>5 && password.length<21){
        if(testpasswd.test(password)){
            return "";
        }else{
            return Constants.PASS_MATCH;
        }
    }else{
        return Constants.PASS_LEN_IS_SMALL
    }
    }else{
        return "Password Cannot be empty"
    }
}

export const mobileValidation=(number)=>{
    let numtest = /^[0-9]*$/;
    if(numtest.test(number)&& number.length==10){
        return "";
    }else{
        return Constants.INVALID_NUMBER;
    }
}

export const usernameValidate=(name)=>{
    var testname=/^[a-zA-Z ]*$/;
    if(testname.test(name) && name[0]!=" "){
        if(name.length<3){
            return Constants.USER_NAME_LENGTH
        }else{
            return ""   
        }
    }else{
        return 'Invalid Name'
    }
}

export const emailValidation=(emailid)=>{
    let emailtest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailtest.test(String(emailid).toLowerCase()) && emailtest!=""){
        return "";
    }else{
        return Constants.INVALID_EMAIL;
    }
}

export const otpValidation=(otp)=>{
    let otptest=/^[0-9]*$/;
    if(otptest.test(otp)){
        if(otp.length===4){
            return ""
        }else{
            return "otp must be 4 charecter long."
        }
    }else{
        return "Invalid otp."
    }
}