
let country_code;
let county_no;
//let country_name= geoplugin_countryCode();
let country_name= 'US';
//localStorage.setItem("country",country_name);

if(!localStorage.getItem('language')){
   //switch(geoplugin_countryCode())
   switch(true)
   {
      case 'ar':
            //console.log('arabic');
            lang ='ar';
            country_code=
            localStorage.setItem("language",'ar');
            fun_arabic_language();
            break;
      case 'IR':
            lang ='fa';
            //console.log('Persian');
            localStorage.setItem("language",'fa');
            fun_persian_language();
            break;
      default:
            lang ='en';
            //console.log('english');
            localStorage.setItem("language",'en'); 
            localStorage.setItem("vibration",'true'); 
            localStorage.setItem("sound",'true'); 
            localStorage.setItem("speedGame",'true');
            localStorage.setItem("point",'100');
            localStorage.setItem("coin",'100000');
            localStorage.setItem("exp",'1');
            localStorage.setItem("name",'Puddin');
            localStorage.setItem("image",'/img/logo/joker_00.jpg');
            
        //    localStorage.setItem("id",`guest-${(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()}`);
            fun_english_language();
      
   }
};
if(localStorage.getItem('language')){
      //console.log(localStorage.getItem('language'));
      switch(localStorage.getItem('language')){
      case 'ar':
            lang ='ar';
            //console.log('arabic');
            localStorage.setItem("language",'ar');
            fun_arabic_language();
            break;
      case 'fa':
            lang ='fa';
            //console.log('Persian');
            localStorage.setItem("language",'fa');
            fun_persian_language();
            break;
      default:
            lang='en'
            //console.log('english');
            localStorage.setItem("language",'en'); 
            fun_english_language();
      }      
   }
   //console.log(`language is seat on store is ${localStorage.getItem('language')}`)




function fun_persian_language(){
   //console.log('Persian Language');
  let head=  document.querySelector("head");
  let temp =`
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <meta http-equiv="X-UA-Compatible" content="ie=edge">
         <meta name="theme-color" content="#053f5e"/>
         <!-- <script language="JavaScript" src="http://www.geoplugin.net/javascript.gp" type="text/javascript"></script> -->
         <script src="/js/bone/lan/language.js"></script>
         <title>جوکرت | حکم آنلاین رایگان</title>
         <link rel="shortcut icon" href="/favicon.ico" />
         <!-- materialize icons, css & js -->
         <link type="text/css" href="/css/materialize.min.css" rel="stylesheet">
         <link type="text/css" href="/css/materialize-rtl.css" rel="stylesheet">
         <link type="text/css" href="/css/flags-css/flag-icon.css" rel="stylesheet">
         <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
         <link type="text/css" href="/css/styles.css" rel="stylesheet">
         <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>  <script async src="https://www.googletagmanager.com/gtag/js?id=G-V8J3FCS630"></script>
         <script type="text/javascript" src="/js/gifts.js"></script>
         <!-- -->
         <link rel="manifest" href="/manifest.json">
         <script type="text/javascript" src="/js/cl-game.js"></script>
         <script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
         <script src="/js/bone/content-handler.js"></script>
         <script type="text/javascript" src="/js/bone/prompt.js"></script>
         
            
         <script src="https://www.gstatic.com/firebasejs/ui/4.0.0/firebase-ui-auth__fa.js"></script>
         <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.0.0/firebase-ui-auth-rtl.css" />
     
         <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
         <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
         
         
         <meta name="apple-mobile-web-app-capable" content="yes">
         <meta name="apple-mobile-web-app-status-bar-style" content="053f5e">
         <meta name="apple-mobile-web-app-title" content="Joker online">
         <link rel="apple-touch-icon" href="/img/icons/icon-96.png">
               <!-- IOS support-->
         
         <meta name="msapplication-TileImage" content="/img/icons/icon-120.png">
         <meta name="msapplication-TileColor" content="#053f5e">
         
                  
            `;
  head.innerHTML =temp;
  document.documentElement.lang="fa";
  
}


function fun_arabic_language(){
   //console.log('Arabic Language');
   let head=  document.querySelector("head");
   let temp =`
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <meta http-equiv="X-UA-Compatible" content="ie=edge">
         <meta name="theme-color" content="#053f5e"/>
         <!-- <script language="JavaScript" src="http://www.geoplugin.net/javascript.gp" type="text/javascript"></script> -->
         <script src="/js/bone/lan/language.js"></script>
         <title> jokert | لعب مجاني حکم   </title>
         <link rel="shortcut icon" href="/favicon.ico" />
         <!-- materialize icons, css & js -->
         <link type="text/css" href="/css/materialize.min.css" rel="stylesheet">
         <link type="text/css" href="/css/materialize-rtl.css" rel="stylesheet">
         <link type="text/css" href="/css/flags-css/flag-icon.css" rel="stylesheet">
         <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
         <link type="text/css" href="/css/styles.css" rel="stylesheet">
         <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>  <script async src="https://www.googletagmanager.com/gtag/js?id=G-V8J3FCS630"></script>
         <!-- -->
         <link rel="manifest" href="/manifest.json">
        
         <script type="text/javascript" src="/js/cl-game.js"></script>
         <script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
         <script src="/js/bone/content-handler.js"></script>
            
         <script src="https://www.gstatic.com/firebasejs/ui/4.0.0/firebase-ui-auth__ar.js"></script>
         <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.0.0/firebase-ui-auth-rtl.css" />
         <!--

            IOS support-->
         <!--  برای هر نسخه موبایل باید آیکون ها ادد شود-->
         <link rel="apple-touch-icon" href="/icons/icon-96.png">
         <meta name="apple-mobile-web-app-status-ba" content ="#053f5e">  <!-- header Color IOS -->`;
   head.innerHTML =temp;
   document.documentElement.lang="ar";
  
}

function fun_english_language(){
   //console.log('English Language');
   let head=  document.querySelector("head");
   let temp =`
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <meta name="theme-color" content="#053f5e"/>
   <!-- <script language="JavaScript" src="http://www.geoplugin.net/javascript.gp" type="text/javascript"></script> -->
   <script src="/js/bone/lan/language.js"></script>
   <title> Jokeret | Trump card game </title>
   <!-- materialize icons, css & js -->
   <link type="text/css" href="/css/materialize.min.css" rel="stylesheet">
   <link type="text/css" href="/css/materialize-rtl.css" rel="stylesheet">
   <link type="text/css" href="/css/flags-css/flag-icon.css" rel="stylesheet">
   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
   <link type="text/css" href="/css/styles.css" rel="stylesheet">
   <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>  <script async src="https://www.googletagmanager.com/gtag/js?id=G-V8J3FCS630"></script>
   <!-- -->
   <link rel="manifest" href="/manifest.json">
   <script type="text/javascript" src="/js/cl-game.js"></script>
   <script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
   <script src="/js/bone/content-handler.js"></script>
      
   <script src="https://www.gstatic.com/firebasejs/ui/4.0.0/firebase-ui-auth__en.js"></script>
   <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.0.0/firebase-ui-auth.css" />
   <!--

      IOS support-->
   <!--  برای هر نسخه موبایل باید آیکون ها ادد شود-->
   <link rel="apple-touch-icon" href="/icons/icon-96.png">
   <meta name="apple-mobile-web-app-status-ba" content ="#053f5e">  <!-- header Color IOS -->`;
   head.innerHTML =temp;
   document.documentElement.lang="en";
   
}


function trans(str){
      let r='0';
      if(localStorage.getItem('language')=='fa'){           
            const phrase =listOfPhrase[0];
            for(i in phrase){
                  
                 i.toUpperCase()===str.toUpperCase() ? r=phrase[i]:0;               
            }
      }
      if(localStorage.getItem('language')=='ar'){
            const phrase =listOfPhrase[1];
            for(i in phrase){
                  i.toUpperCase()===str.toUpperCase() ? r=phrase[i]:0; 
            }
      }
      localStorage.getItem('language')==='en' ? r=str :0;
      r==='0' ? r=str:0;
   return r;
}
