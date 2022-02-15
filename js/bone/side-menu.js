let user_name = localStorage.getItem('name') ? localStorage.getItem('name') : 'Guest user';
let user_img = localStorage.getItem('image') ? localStorage.getItem('image'):'/img/logo/joker_00.jpg';
let coin = localStorage.getItem('coin') ? localStorage.getItem('coin') : 0;
let textlog =  localStorage.getItem('id')  ? 'Log out' : 'LogIn/Register';

let rtl = localStorage.getItem('language')==='fa' || localStorage.getItem('language')==='ar'  ? 'rtl' : '';

document.getElementById('side-menu').style.cursor = "pointer";
function fun_side_menu(handler)
{
    //console.log("show side Menu");
    var content = document.querySelector('#side-menu');
    if (handler==true)
    {
      
        var template = `
        <li><div class="user-view" id="user-info-side-menu">
            <div class="background">
            <img src="/img/side-menu-bg.jpg">
            </div>
            <a  href="#"><img class="circle" src="${user_img}" width="100px" ></a>
            <a  href="#"><span class="white-text name">${trans(user_name)}</span> </a>
            <a  href="#"><span class="white-text email">💰${coin}</span> </a>
            
        </div></li>
        <li><a onClick="fun_side_menu_go('play')" class="modal-action modal-close ${rtl}">
        <i class="material-icons">🃏</i>
        ${trans('play')}</a></li>
        <li><div class="divider"></div></li>
        <li><a  onClick="fun_side_menu_go('toptenplayer')"  class="modal-action modal-close ${rtl} btn-flat disabled">
        <i class="material-icons ">🎩</i>
        ${trans('Top Player')} 
        </a></li>
        <li><div class="divider"></div></li>
        <li><a  onClick="fun_side_menu_go('pre-register')"  class="modal-action modal-close ${rtl} btn-flat disabled">
        <i class="material-icons  ">⚙️</i>
        ${trans('Edit Profile')}</a></li>
        <li><div class="divider"></div></li>
        <li><a href="#"  class="modal-action modal-close ${rtl}">
        <i class="material-icons  ">💰</i>
        ${trans('earn coin')} </a></li>
        <li><div class="divider"></div></li>
        <li><a onClick="fun_side_menu_go('share')"  class="modal-action modal-close ${rtl}">
        <i class="material-icons  ">🔗</i>
        ${trans('share')} </a></li>
        <li><div class="divider"></div></li>
        <li><a onClick="fun_side_menu_go('about')"  class="modal-action modal-close ${rtl} ">
        <i class="material-icons  ">ℹ️</i>
        ${trans('about')}</a></li>
        <li><div class="divider"></div></li>
        <li><a onClick="fun_side_menu_go('contact')"   class="modal-action modal-close ${rtl}">
          <i class="material-icons">✉️</i>
         ${trans('contact us')} 
          </a></li>
        <li><div class="divider"></div></li>
        <li><a onClick="fun_side_menu_go('help-faq')" class="modal-action modal-close ${rtl}">
        <i class="material-icons  ">💡</i>
        ${trans('help & learn play')}    
          </a></li>
          <li><div class="divider"></div></li>
          <li><a onClick='LogCheck()'  class="modal-action modal-close ${rtl}" id="logout-btn">
          <i class="material-icons  ">🔑</i>
          ${trans(textlog)}    
            </a></li>
            <li><div class="divider"></div></li>
          <li><div  class="modal-action modal-closet" id="logout-btn">
            <div class="sidemenu-social">
                <span class="social-obj" >
                    <a onClick="fun_side_menu_go('fb')">
                        <img src="/img/icons/facebook.svg" alt="facebook" class=" sidem-s-icon" id="sidem-fb" width="20px">
                    </a>
                </span>
                <span class="social-obj" >
                    <a onClick="fun_side_menu_go('tw')">
                        <img src="/img/icons/twitter.svg" alt="twitter" class=" sidem-s-icon" id="sidem-tw" width="20px">
                    </a>
                </span>
                <span class="social-obj" >
                    <a onClick="fun_side_menu_go('in')">
                        <img src="/img/icons/instagram.svg" alt="instagram" class=" sidem-s-icon" id="sidem-te" width="20px">
                    </a>
                </span>
                <span class="social-obj" >
                    <a onClick="fun_side_menu_go('te')">
                        <img src="/img/icons/telegram.svg" alt="telegram" class=" sidem-s-icon" id="sidem-te" width="20px">
                    </a>
                </span>
                <span class="social-obj" >
                    <a onClick="fun_side_menu_go('${localStorage.getItem('country')=='IR' ? 'ap' : 'yt'}')">
                        <img src="/img/icons/${localStorage.getItem('country')=='IR' ? 'aparat.png' : 'youtube.png'}" alt="${localStorage.getItem('country')=='IR' ? 'aparat' : 'youtube'}" class=" sidem-s-icon" id="sidem-te" width="20px">
                    </a>
                 </span>
                <span class="social-obj" >
                    <a onClick="fun_side_menu_go('${localStorage.getItem('country')=='IR' ? 'md' : 'md'}')">
                        <img src="/img/icons/${localStorage.getItem('country')=='IR' ? 'medium' : 'medium'}.png" alt="${localStorage.getItem('country')=='IR' ? 'medium' : 'medium'}" class="circle sidem-s-icon" id="sidem-te" width="20px">
                    </a>
                 </span>
            </div>
             
            </div></li>
          <li id="log-side-menu"></li>
          
   
        `; 
  
        content.innerHTML =template;

    }
    else
    {
        deleteChild("content");
    }

}

function deleteChild(child) { 
    var myNode = document.getElementById(child);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    
} 

function LogCheck(){
    if(textlog=='Log out'){
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('image');
        switch(localStorage.getItem('country')){
            case 'IR':
                window.open(`/pages/login_.html`,"_self");
            break;
            default:
                window.open(`/pages/login.html`,"_self");
            
        }
    }else{
        switch(localStorage.getItem('country')){
            case 'IR':
                window.open(`/pages/login_.html`,"_self");
            break;
            default:
                window.open(`/pages/login.html`,"_self");
            
        }        
    }
}




function fun_side_menu_go(val)
{
    
    
    switch(val){
        case 'play':
            document.getElementById('body').innerHTML=preloader();
            window.open(`/pages/play.html`,"_self");
        break;
        case 'toptenplayer':
            document.getElementById('body').innerHTML=preloader();
            window.open(`/pages/toptenplayer.html`,"_self");
        break;
        case 'pre-register':
            document.getElementById('body').innerHTML=preloader();
            window.open(`/pages/pre-register.html`,"_self");
        break;
        case 'earn-coin':
            document.getElementById('body').innerHTML=preloader();
            window.open(`/pages/earn-coin.html`,"_self");
        break;
        case 'share':
            document.getElementById('body').innerHTML=preloader();
            window.open(`/pages/${localStorage.getItem('language')}/share.html`,"_self");
        break;
        case 'about':
            document.getElementById('body').innerHTML=preloader();
            window.open(`/pages/${localStorage.getItem('language')}/about.html`,"_self");
        break;
        case 'contact':
            document.getElementById('body').innerHTML=preloader();
            window.open(`/pages/${localStorage.getItem('language')}/contact.html`,"_self");
        break;
        case 'help-faq':
            document.getElementById('body').innerHTML=preloader();
            window.open(`/pages/${localStorage.getItem('language')}/help-faq.html`,"_self");
        break;
        case 'fb':
            window.open(`https://fb.me/jokeretgame`,"_blank");
        break;
        case 'tw':
            window.open(`https://twitter.com/jokeretgame`,"_blank");
        break;
        case 'in':
            window.open(`https://www.instagram.com/jokeretgame`,"_blank");
        break;
        case 'yt':
            window.open(`https://www.youtube.com/channel/UCL0pllQCUwxxtA1OiJG6nKA`,"_blank");
        break;
        case 'md':
            window.open(`https://medium.com/@jokeret`,"_blank");
        break;
        case 'te':
            window.open(`https://t.me/jokeretgame`,"_blank");
        break;
        case 'vr':
            window.open(`https://virgool.io/@jokeret`,"_blank");
        break;
        case 'ap':
            window.open(`https://www.aparat.com/jokeretgame`,"_blank");
        break;
        
   
    }
}

function preloader(){
    return` <div class="preloader" id="preloader"><section class="container"><div id="card"><figure class="front">🃏</figure><figure class="back">🎴</figure></div></section></div>` ;
  } 

