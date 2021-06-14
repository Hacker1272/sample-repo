const clickHand = ()=>{
    var pid = document.getElementById("pid").value;
    var vdate = document.getElementById("vdate").value;
    var centre = document.getElementById("centre").value;
    console.log(centre);
    $.ajax({
        url: "./server/getCountByDateAndCentre.php",
        type: 'post',
        datatype: 'json',
        data:{
            user_selected_date: vdate,
            user_selected_centre: centre
        },
        success: function(res){
            // var out=JSON.parse(res)
            var str=res.replace(/['"]+/g, '')
            var cnt = parseInt(str);
            const slot1 = "9:00 AM - 11:00 AM";
            const slot2 = "11:00 AM - 01:00 PM";
            const slot3 = "01:00 PM - 05:00 PM";
            var slot = Math.ceil(cnt/10);
            document.getElementById("form").style.display="none";
            if(cnt>=30){
                document.getElementById("slot").innerHTML="Sorry all slots have been booked for that date, please try another date!!";
            }
            else{
                $.ajax({
                    url: "./server/insertAppointment.php",
                    type:'post',
                    datatype: 'json',
                    data:{
                        patient_id: pid,
                        centre_id: centre,
                        vdate: vdate
                    },
                    success:function(res){
                        var doc = new jsPDF();
                        var res1="Your patient id is: ";
                        res1+= pid;
                        doc.text(20, 20,res1);
                        var res2="Your centre name is: ";
                        var sel = document.getElementById("centre");
                        var text= sel.options[sel.selectedIndex].text;
                        console.log(text);
                        res2+= text;
                        doc.text(20, 30, res2);
                        var res3="Your time slot is: ";

                        // Add new page
                        
                        var res1 = "Your time slot is: ";
                         if(slot<=1){
                        document.getElementById("slot").innerHTML=res1+slot1;
                        res3=slot1;
                            }
                        else if(slot<=2){
                            document.getElementById("slot").innerHTML=res1+slot2;
                            res3=slot2;
                        }
                        else{
                            document.getElementById("slot").innerHTML=res1+slot3;
                            res3=slot3;
                        }
                        doc.text(20, 40, res3);
                        doc.addPage();
                        doc.text(20, 20, 'Kindly Follow all COVID protocols');
                        doc.text(20, 30, 'Promote vaccination, ask your friends and family to get vaccinated');

                        // Save the PDF
                            doc.save('document.pdf');
                    }
                })
            }
            
            
            // else{
            //     var res = "Your time slot is: ";
            //     if(slot<=1){
            //         document.getElementById("slot").innerHTML=res+slot1;
            //     }
            //     else if(slot<=2){
            //         document.getElementById("slot").innerHTML=res+slot2;
            //     }
            //     else{
            //         document.getElementById("slot").innerHTML=res+slot3;
            //     }
            // }

        }
    })

}