function checkMaxLength(object){
    if(object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }
}