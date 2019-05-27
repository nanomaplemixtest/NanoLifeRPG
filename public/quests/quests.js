
const completeQuest = async(_id)=>{
  Swal.fire({
    text: "Quest Completed?",
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
        url: '/api/quests/complete', 
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

const redoQuest = async(_id)=>{
  Swal.fire({
    text: "Redo this Quest?",
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
        url: '/api/quests/redo', 
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

const deleteQuest = async (_id)=>{
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
        url: '/api/quests/delete', 
        data: JSON.stringify({"_id":_id}),
        dataType: "json",
        success: function(data,status) { 
          Swal.fire({
            type: 'success',
            title: 'Quest Removed'
          }).then((result) => {
            location.reload();
          })
        },
        error:function(e){
           Swal.fire({
            type: 'error',
            title: 'Deleting Quest Fail',
          })
        },        
     });

    }
  })
  
}


const addQuest = async()=>{
  const {value: formValues} = await Swal.fire({
    title: 'Create New Quest',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Title">' + 
      '<textarea id="swal-input2" class="swal2-textarea" rows="10" placeholder="Description"></textarea>' +
      '<form><input id="radio1" type="radio" class="swal2-radio " name="gender" value="easy" checked> Easy <br><input id="radio2" type="radio" class="swal2-radio" name="gender" value="normal"> Normal <br><input id="radio3" type="radio" class="swal2-radio" name="gender" value="hard"> Hard </form> ',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value,
        document.getElementById('radio1').checked,
        document.getElementById('radio2').checked,
        document.getElementById('radio3').checked
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

      var type = ""
      if(formValues[2]) type = "Easy"
      if(formValues[3]) type = "Normal"
      if(formValues[4]) type = "Hard"

      var data = {
        "title": formValues[0],
        "description" : formValues[1],
        "type":type,
      }
  
      console.log(data)
      $.ajax({
        type: "POST",
        contentType: "application/json",
        url: '/api/quests/create', 
        data: JSON.stringify(data),
        dataType: "json",
        success: function(data,status) { 
          Swal.fire({
            type: 'success',
            title: 'Quest Added'
          }).then((result) => {
            location.reload();
          })
        },
        error:function(e){
           console.log("Add Quest Fail")
        },        
     });
  
    }
    
  }
}