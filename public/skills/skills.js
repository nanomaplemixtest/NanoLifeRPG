const getHourspercentage = (hours,maxHours)=>{
    const result = hours / maxHours 
    return Math.floor(result) 
}

console.log( $("#mybar").attr('style') )
  
const addSkill = async()=>{
    const {value: formValues} = await Swal.fire({
      title: 'Learn New Skill',
      focusConfirm: false,
      html:
            '<input id="swal-input1" class="swal2-input" placeholder="Title">' + 
            '<textarea id="swal-input2" class="swal2-textarea" rows="10" placeholder="Description"></textarea>',
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
        ]
      }
    })
    
    if (formValues) {
  
      if(formValues[0].trim() == ""){
        Swal.fire({
          type: 'error',
          title: 'Title Required',
        })
      }else{
  
        var data = {
          "title": formValues[0],
          "description" : formValues[1],
        }
    
        console.log(data)
        $.ajax({
          type: "POST",
          contentType: "application/json",
          url: '/api/skills/create', 
          data: JSON.stringify(data),
          dataType: "json",
          
          success: function(data,status) { 
            Swal.fire({
              type: 'success',
              title: 'Skill Added'
            }).then((result) => {
              location.reload();
            })
          },
          error:function(e){
             console.log("Add Skill Fail")
          },        
       });
    
      }
      
    }
  }




  const deleteSkill = async (_id)=>{
    Swal.fire({
      text: "Are you sure you want to unlearn?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, unlearn it!'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "DELETE",
          contentType: "application/json",
          url: '/api/skills/delete', 
          data: JSON.stringify({"_id":_id}),
          dataType: "json",
          success: function(data,status) { 
            Swal.fire({
              type: 'success',
              title: 'Skill Removed'
            }).then((result) => {
              location.reload();
            })
          },
          error:function(e){
             Swal.fire({
              type: 'error',
              title: 'Deleting Skill Fail',
            })
          },        
       });
  
      }
    })
    
  }