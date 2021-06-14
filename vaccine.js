const submitHand = ()=>{
   const fname = document.getElementById("fname").value;
   const lname = document.getElementById("lname").value;
   const dob = document.getElementById("dob").value;
   const add = document.getElementById("add").value;
   const name = fname+" "+lname;
   console.log(name);
   console.log(dob);
   var bday = new Date(dob);
   var curDate = new Date();
   var difference = (curDate - bday)/((1000*60*60*24*365));
   var age= Math.ceil(difference);
   console.log(Math.ceil(difference));
    $.ajax({
        url:"./server/insertPatientInfo.php",
        type: 'post',
        datatype: 'json',
        data:{
            
            
            patient_name: name,
            patient_age: age,
            patient_address: add
            

            


        },
        success: function(res){
            
            
            var form = document.getElementById("form");
            form.style.display="none";
            var pid = document.getElementById("patient_id");
            pid.innerHTML="Your patient id is: "+res;
            //covid1920210003
            
            

            

             
        }
    })
}