//判断字符是否为空的方法
function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}

//判断email
function isEmail(obj){
	var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	if(reg.test(obj)){
		return true;
	}else{
		return false;
	}
}

function isPoneAvailable($poneInput) {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test($poneInput.val())) {
        return false;
    } else {
        return true;
    }
}

function CheckIsChinese(val){    
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    if(reg.test(val)){return true; }
    else{return false;}
}