fetch('https://www.cloudflare.com/cdn-cgi/trace')
  .then(function(response) {
    response.text().then(function(text) {    	
      local = text.slice((text.indexOf('loc')+4),
    
        (text.indexOf('loc')+6))        
       ips=text.slice((text.indexOf('ip')+4),
      	(text.indexOf('ts')))
      storedText=text
      done();
    });
  });

function done() {
  localStorage.setItem('country',local);
  localStorage.setItem('ip',ips);
  sessionStorage.setItem('ip',ips);
  console.log('local.js' ,local)
  preloader_content_lan(false);
}

 window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-V8J3FCS630'); 

function fun_head_show(handler)
{
    
 
    let content = document.querySelector('#head-nav');
    if (handler==true)
    {

        //console.log("show2 header");
        let select_language ='';
         localStorage.getItem('language')==='en'? select_language= `${set_flag_english()} En`:``;
         localStorage.getItem('language')==='ar'?select_language=  `${set_flag_arabic()} Ar`:``;
        localStorage.getItem('language')==='fa' && (select_language!=='ar' || select_language!=='en' ) ?select_language=  '🇮🇷  Fa':0;
       const user_img = localStorage.getItem('image') ? localStorage.getItem('image'):'/img/logo/joker_00.jpg';
       const path = localStorage.getItem('id') ? '/pages/pre-register.html' : '/pages/login.html';
        let temp = `
           
                <div class="nav-wrapper container">
                    <!-- <a href="/">Joker<span id="statusGame">et</span><span id="version"> (βv38) <span></a> -->
                    <a href="/"><img src="/img/head-logo-jokeret.png" alt='Jokeret Logo' class="" id='head-logo'> </a>
                    
          
                    <span class="right indigo-text text-lighten-5">
                        
                        <i class="material-icons sidenav-trigger" data-target="side-menu">menu</i>
                    </span>
                    <span class="userHead" id="user-head-info">   <span class="userHead ">
                    <a href="${path}" ><img src="${user_img}" alt='User Photo' class=" circle" id='img-user-head-info' width="20px"></a>
                    </span></span>
                    <span class="userHead blue-grey-text text-lighten-5 " id="language-info">
                        <a class='dropdown-button' id='language-selector' href='#' data-activates='dropdownLan'>${select_language}</a>
                            <!-- Dropdown Structure -->
                            <ul id='dropdownLan' class='dropdown-content'>
                            <li><a onClick='language_selected(1)' id="language-en"><span> ${set_flag_english()}  En</span></a></li>
                            <li><a onClick='language_selected(2)' id="language-ar"><span> ${set_flag_arabic()}  Ar</span></a></li>
                            <li><a onClick='language_selected(3)' id="language-fa"><span>🇮🇷  Fa</span></a></li>
                            </ul>
                    </span>
                </div>
     
        `; 

        content.innerHTML =temp;

        //content.innerHTML =temp;
    }
    else
    {
        deleteChild("content");
    }
    //console.log(`${set_flag_english()}`);
}

function deleteChild(child) { 
    var myNode = document.getElementById(child);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    
} 
// تابع مربوط به انتخاب زبان
function language_selected(val){
      
        //console.log(`function language_selected ${val}`);
       // $('.dropdown-button').dropdown('close');
       let content = document.querySelector('#body');
       let temp = `<div id="overlay-page" >
       <div id="overlay-page-text">${preloader()}</div>
     </div>`;
     this.console.log(temp);
     content.innerHTML +=temp ;
        
        
        switch(val)
        {
            case 1:
                //en
                localStorage.setItem("language",'en');
                document.getElementById('language-selector').innerHTML=document.getElementById('language-en').innerHTML;
                break;
            case 2:
                //ar 
                localStorage.setItem("language",'ar');
                document.getElementById('language-selector').innerHTML=document.getElementById('language-ar').innerHTML;
                break;
            case 3:
                //fa
                localStorage.setItem("language",'fa');
                document.getElementById('language-selector').innerHTML=document.getElementById('language-fa').innerHTML;
                break;
            
        }
        
        location.reload(true);
}


function set_flag_english(){
   //console.log(`local storage ${localStorage.getItem('country')}`);
   let flag=''
   switch(localStorage.getItem('country')){
       case'AG':
        flag='🇦🇬';
       break;
       case'AU':
        flag='🇦🇺';
       break;
       case'BS':
        flag='🇧🇸';
       break;
       case'BB':
        flag='🇧🇧';
      break;
      case'BZ':
        flag='🇧🇿';
      break;
      case'CA':
        flag='🇨🇦';
      break;
      case'DM':
        flag='🇩🇲';
      break;
      case'GD':
        flag='🇬🇩';
      break;
      case'GY':
        flag='🇬🇾';
      break;                  
      case'IE':
        flag='🇮🇪';
      break;   
      case'JM':
        flag='🇯🇲';
      break; 
      case'NZ':
        flag='🇳🇿';
      break; 
      case'KN':
        flag='🇰🇳';
      break; 
      case'LC':
        flag='🇱🇨';
      break; 
      case'VC':
        flag='🇻🇨';
      break;
      case'TT':
        flag='🇹🇹';
      break; 
      case'GB':
      //console.log('gb');
        flag='🇬🇧';
      break; 
      case'US':
        flag='🇺🇸';
      break; 
      default:
        flag='🇺🇸';                                                         
   }
   return flag;
}

function set_flag_arabic(){

    // if
    let flag=''
    switch(localStorage.getItem('country')){
        case'PS':
         flag='🇵🇸';
        break;
        case'DZ':
         flag='🇩🇿';
        break;
        case'BH':
         flag='🇧🇭';
        break;
        case'KM':
         flag='🇰🇲';
       break;
       case'DJ':
         flag='🇩🇯';
       break;
       case'EG':
         flag='🇪🇬';
       break;
       case'IQ':
         flag='🇮🇶';
       break;
       case'JO':
         flag='🇯🇴';
       break;
       case'KW':
         flag='🇰🇼';
       break;                  
       case'LB':
         flag='🇱🇧';
       break;   
       case'LY':
         flag='🇱🇾';
       break; 
       case'MR':
         flag='🇲🇷';
       break; 
       case'MA':
         flag='🇲🇦';
       break; 
       case'OM':
         flag='🇴🇲';
       break; 
       case'QA':
         flag='🇶🇦';
       break;
       case'SA':
         flag='🇸🇦';
       break; 
       case'So':
         flag='🇸🇴';
       break; 
       case'SS':
         flag='🇸🇸';
       break; 
       case'SY':
         flag='🇸🇾';
       break; 
       case'TN':
         flag='🇹🇳';
       break; 
       case'AE':
         flag='🇦🇪';
       break;  
       case'YE':
         flag='🇾🇪';
       break; 
       default:
         flag='🇦🇪';                                                         
    }
    return flag;
 }


 function preloader_content_lan(val){

  if(val && document.querySelector('#content')){

    let cntnt = document.querySelector('#content').innerHTML;
         cntnt += `<div class="preloader" id="preloader">
        <section class="container">
        <div id="card">
          <figure class="front">
            🃏
          </figure>
          <figure class="back">
            🎴
          </figure>
        </div>
      </section>
      </div>`;
     
      return cntnt;

  }else{
    document.getElementById('preloader')? document.getElementById('preloader').remove():0;
  }
}
