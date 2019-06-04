

  const addAchievement = async()=>{
    const {value: formValues} = await Swal.fire({
      title: 'New Achievement',
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
    
        $.ajax({
          type: "POST",
          contentType: "application/json",
          url: '/api/achievement/create', 
          data: JSON.stringify(data),
          dataType: "json",
          
          success: function(data,status) { 
            Swal.fire({
              type: 'success',
              title: 'Achievement Added'
            }).then((result) => {
              location.reload();
            })
          },
          error:function(e){
             console.log("Add Achievement Fail")
          },        
       });
    
      }
      
    }
  }


  const deleteAchievement = async (_id)=>{
    Swal.fire({
      text: "Are you sure you want to delete?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "DELETE",
          contentType: "application/json",
          url: '/api/achievement/delete', 
          data: JSON.stringify({"_id":_id}),
          dataType: "json",
          success: function(data,status) { 
            Swal.fire({
              type: 'success',
              title: 'Achievement Removed'
            }).then((result) => {
              location.reload();
            })
          },
          error:function(e){
             Swal.fire({
              type: 'error',
              title: 'Deleting Achievement Fail',
            })
          },        
       });
  
      }
    })
    
  }


  
const unlockAchievement = async(_id)=>{
  Swal.fire({
    text: "Unlock Achievement?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
    cancelButtonText: 'Nope'
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type: "PATCH",
        contentType: "application/json",
        url: '/api/achievement/unlock', 
        data: JSON.stringify({"_id":_id}),
        dataType: "json",
        success: function(data,status) { 
    
    
          location.reload();
        },
        error:function(e){
           Swal.fire({
            type: 'error',
            title: 'Please Try Again',
          })
        },        
      });
    }
  })
  
  


  
}
