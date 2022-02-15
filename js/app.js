
if('serviceWorker' in navigator){
    console.log('run')
    navigator.serviceWorker.register('/sw.js')
     .then((reg)=>console.log('service worker register',reg))
     .catch((err)=>console.log('service worker NOT register',err))
}


//let contentInner
window.addEventListener('offline', function(e) {
     console.log('offline'); 
        // مقدار تگ content
        // در یک متغییر ریخته شود
        // و به کاربر پیامی نمایش دهد که اینترنت قطع شد
     // باید به کاربر پیامی نمایش دهد که شما به اینترنت وصل نیستید
     
     let content = document.querySelector('#content');
        let temp = `<div id="overlay-page" >
        <div id="overlay-page-text">${trans('Disconnected')} 😟</div>
      </div>`;
      this.console.log(temp);
      content.innerHTML +=temp ; // محتوای زمان قطعی به کاربر نمایش

      //change header
      content=document.querySelector('#statusGame'); 
      temp='🛑';
      content.innerHTML =temp ;
    });


    window.addEventListener('online', function(e) { 
        console.log('online'); 
        
        document.getElementById('overlay-page')?    document.getElementById('overlay-page').remove():0;
    
              //change header
             let content=document.querySelector('#statusGame'); 
             const temp='et';
              content.innerHTML =temp ;
        // ببررسی شود که اگر 
        // کاربر در اتاق بازی بود
        // موارد اتاق بازی برای او چک شود 
        // به اتاق بازی دوباره باز گردد و اطلاعات را از زمان قطعی از کاربر بگیرد
        // درغیر اینصورت آخرین محتوا به کاربر نمایش داده شود

    
    });
    
    
