
      let lang ='en'
window.onload = function() {




    let status ='first'
    // اگر بار اول بود می بایست زبان را انتخاب کند
    if (status==='first'){
        fun_load_language_content(true);

        document.getElementById('select-language-persian').addEventListener('click', function() {
         //   fun_load_auth(true);
           // add_field_db('ir');
            //fun_selected_language('ir');
            fun_persian_language();
            localStorage.setItem("language",'fa') ;
            lang = 'IR';
          });
          
          document.getElementById('select-language-english').addEventListener('click', function() {
            //fun_load_auth(true);
           // add_field_db('gb');
         //   fun_selected_language('gb');
             fun_english_language();
            localStorage.setItem("language",'en'); 
            lang ='GB';
          
          });
          document.getElementById('select-language-arabic').addEventListener('click', function() {
         //   fun_load_auth(true);
            //add_field_db('sa');
          //  fun_selected_language('sa');
            fun_arabic_language();
            localStorage.setItem("language",'ar') ;
            lang='SA';
          
          });  
    }
    // اگر بار اول و لوگین بود فورم ثبت نام نمایش داده شود
    if (status==='notfirst'){
// اگر بار اول نبود
    }
    
}


//نمایش محتوا ثبت نام
function fun_load_auth(handler)
{
    let temp;
    let content = document.querySelector('#contentView');

    console.log('show content :fun_load_auth');
    window.open("/pages/login.html?language="+lang+"","_self")

}//end function fun_load_auth


// نمایش محتوا انتخاب زبان
function fun_load_language_content(handler){
    console.log('show content :fun_load_language_select');
    if(handler==true)
    { 

        let content = document.querySelector('#contentView');
        let temp =`
        <br>
        <div class="row" id="select-language">
   
         <div class="persian  col   ">
             <button class="btn  waves-effect waves-light  deep-purple darken-4" id="select-language-persian"><span class="flag-icon flag-icon-ir"></span> فارسی</span></button>
          </div>
          <div class="english col ">
              <button class="btn  waves-effect waves-light  deep-purple darken-4" id="select-language-english"><span class="flag-icon flag-icon-gb"></span> English</span></button>          
          </div>
         <div class="arabic col ">
              <button class="btn  waves-effect waves-light  deep-purple darken-4" id="select-language-arabic"><span class="flag-icon flag-icon-sa"></span> العربية</span></button>
          </div>   
   
        `;
        content.innerHTML =temp;

       
    }
    else{
        deleteChild("contentView");
    }

}//end function fun_load_language_select





