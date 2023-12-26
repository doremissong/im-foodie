var isChecked = document.getElementById("isChecked").value;

// const form = document.getElementById("duplicateCheck");
// const idInput = document.getElementById("input-memId");
function checkDuplicate(){
    var memId = document.getElementById("mem_id").value;
    
    // form.addEventListener("submit", function(event){
    //     event.preventDefault();
    //     const formData = new FormData(event.target);
    //     const content = formData.get("memId");
    
    fetch(`/auth/duplicateCheck?memId=${memId}`)
    .then(response=> response.json())
    .then(data=>{
        // console.log('success: ', data.success);
        // console.log(data.message);
        if(data.success){
            alert(data.message);
            isChecked =1 ;
            console.log(document.getElementById("isChecked").value);
        } else{
            memId = '';
            alert(data.message);
        }
    })
    //     .catch(err=>{
    //         console.log('[ERROR] While chekcing duplicate', err);
    //         idInput.innerText = '';
    //         alert('다시 시도해주세요');
    //     })
    // });
};
