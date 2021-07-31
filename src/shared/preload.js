
export const preloader = () => { 

  document.body.onload = () => {
    setTimeout(function() {
      const preload = document.querySelector('.preloader')
      if ( !(preload.classList.contains('done')) ){
        preload.className = 'done'
      }
    },1000 )
    
    }
}