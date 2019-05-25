



const alert = ()=>{
    const {value: email} = await Swal.fire({
        title: 'Input email address',
        input: 'email',
        inputPlaceholder: 'Enter your email address'
      })
      
      if (email) {
        Swal.fire('Entered email: ' + email)
      }
}