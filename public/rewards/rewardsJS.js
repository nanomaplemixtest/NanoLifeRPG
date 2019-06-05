

  const addReward = async()=>{
    const {value: formValues} = await Swal.fire({
      title: 'New Achievement',
      focusConfirm: false,
      html:
            '<input id="swal-input1" class="swal2-input" placeholder="Title">' + 
            '<textarea id="swal-input2" class="swal2-textarea" rows="10" placeholder="Description"></textarea>' +
            '<input id="swal-input3" class="swal2-input" placeholder="Price">',
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value
        ]
      }
    })
    
    if (formValues) {
  
        if(formValues[0].trim() == ""){
            Swal.fire({
            type: 'error',
            title: 'Title Required',
            })
        }else if(formValues[2].trim() == ""){
            Swal.fire({
                type: 'error',
                title: 'Price Required',
            })
        
        }else{
            const h = parseFloat(formValues[2])
            if(!h){
                Swal.fire({
                    type: 'error',
                    title: 'Invalid Price',
                })
            }else{
                var data = {
                    "title": formValues[0],
                    "description" : formValues[1],
                    "price":formValues[2]
                  }
              
                  $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: '/api/reward/create', 
                    data: JSON.stringify(data),
                    dataType: "json",
                    
                    success: function(data,status) { 
                      Swal.fire({
                        type: 'success',
                        title: 'Reward Added'
                      }).then((result) => {
                        location.reload();
                      })
                    },
                    error:function(e){
                       console.log("Add Reward Fail")
                    },        
                 });
              
            }
        }     
    }
  }


  const deleteReward = async (_id)=>{
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
          url: '/api/reward/delete', 
          data: JSON.stringify({"_id":_id}),
          dataType: "json",
          success: function(data,status) { 
            Swal.fire({
              type: 'success',
              title: 'Reward Removed'
            }).then((result) => {
              location.reload();
            })
          },
          error:function(e){
             Swal.fire({
              type: 'error',
              title: 'Deleting Reward Fail',
            })
          },        
       });
  
      }
    })
    
  }


  
const buyReward = async(_id)=>{
  Swal.fire({
    text: "Buy Reward?",
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
        url: '/api/reward/buy', 
        data: JSON.stringify({"_id":_id}),
        dataType: "json",
        success: function(data,status) {  
          location.reload();
        },
        error:function(e){
           Swal.fire({
            type: 'error',
            title: 'Not Enough Gold',
          })
        },        
      });
    }
  })
  
  


  
}
