


var uid_public;
let user_seat_no_server =0; // این مقدار از سرور گرفته می شود که کاربر در کدام جایگاه قرار است بنشیند یا بلند شود
let user_seat_no =0; // این مقدار از کلاینت می آید که می گوید کدام جایگاه قرار است خالی شود
let users_seat =[4,0,0,0,0]; // ذخیره صندلی ها
let hokm_of_hakm_is =0;
let seat_local_user=0;
let seat_state =[0,0,0,0];
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
/* 
navigator.vibrate = navigator.vibrate ||
                  navigator.webkitVibrate ||
                  navigator.mozVibrate || 
                  navigator.msVibrate;
                  if (navigator.vibrate) {
                    alert('we can vibrate');
                    navigator.vibrate(500);
                  } else {
                    alert('no vibration for you :-(');
                  }
 */

function function_show_result_3cards(r,no){
console.log('function_show_result_3cards',no);
  let cards=['AH','AS','AC'];
  let _3p =(r==4) ? 'JB' : cards[Math.floor(Math.random() * 2)+ 1]
  document.getElementById(`cards3play-card${no}`).src=`/img/cards/${_3p}.svg`;
  //disabled
  document.getElementById("cards3Button1").disabled = true;
  document.getElementById("cards3Button2").disabled = true;
  document.getElementById("cards3Button3").disabled = true;
 
  r==4 ? document.getElementById("result-3cards").innerHTML =trans("You Win 30 coins") :document.getElementById("result-3cards").innerHTML =trans("You Lose 10 coin") ;
  // if r ==4 user win !
  setTimeout(function(){
     document.getElementById(`cards3play-card${no}`).src=`/img/cards/Card_back.svg`;
     document.getElementById("result-3cards").innerHTML ="";
     document.getElementById("cards3Button1").disabled = false;
     document.getElementById("cards3Button2").disabled = false;
     document.getElementById("cards3Button3").disabled = false;
   
   }, 2700);
 
}

// این متغییر زمانی مقدار دهی می شود که در بار اول کاربر یک صندلی را انتخاب کند و بنشید
let user_player =2;
let count_click_ready_fun =0;
// تابع اعلام آمادگی توسط کاربر
function fun_im_ready(handler)
{   
  fun_user_ready();
      count_click_ready_fun+=1;
      document.getElementById("ImReadyButton").remove();

      // 789
      // اعلام آمادگی به سرور و اجرای توابع مربوطه
      //789
      // در چت اعلام شود چه کسی اعلام آمادگی کرده است


  let content = document.querySelector("#user-seat-status-"+handler);
  let temp=`<i class="material-icons">done</i> `;
  content.innerHTML =temp ;
}//end  fun_im_ready

function fun_stand_up(handler,check)
{
  // اگر تابع از تابع مرتبت با سرور اجرا شده باشد
  // و مقدار تابع عمومی handler_server
  // مخالف با صفر باشد مقدار را در درون تابع یوزـسیتـنو می ریزد

  seat_state[handler]=0;
  console.log("از جا بر خواستن" + handler,seat_state); 
  seat_local_user==handler ? seat_local_user=0:0;
  users_seat[handler]=0;
  console.log( users_seat); 
  // پیام از سرور نیست
  if(check)
  { 
 
    myseat=0;
    fun_user_stand_up();
    document.getElementById(`user-seat-${handler}`).onclick = function() { fun_seat(handler,handler); };
    users_seat[1]==1 ? 1 : document.getElementById(`user-seat-1`).onclick = function() { fun_seat(1,1); } ;
    users_seat[2]==1 ? 1 : document.getElementById(`user-seat-2`).onclick = function() { fun_seat(2,2); } ;
    users_seat[3]==1 ? 1 : document.getElementById(`user-seat-3`).onclick = function() { fun_seat(3,3); } ;
    users_seat[4]==1 ? 1 : document.getElementById(`user-seat-4`).onclick = function() { fun_seat(4,4); } ;
    document.getElementById(`user-seat-image-${handler}`).src = `/img/user.png`;
    document.getElementById(`user-seat-profile-${handler}`).href="#";
    document.getElementById("standUpButton").remove();
    document.getElementById("ImReadyButton").remove();
    content = document.querySelector(`#user-seat-status-${handler}`);
    temp=`<i class="material-icons"></i> Free Seat `;
    content.innerHTML =temp ;
  }else{
    //پیام از سرور است
    // طبق گفته سرور یک کاربر از یک جایگاه بلند شده است
    document.getElementById(`user-seat-${handler}`).onclick = function() { fun_seat(handler,handler); };
    document.getElementById(`user-seat-image-${handler}`).src = `/img/user.png`;
    document.getElementById(`user-seat-profile-${handler}`).href="#";
    content = document.querySelector(`#user-seat-status-${handler}`);
    temp=`<i class="material-icons"></i>${trans('Free Seat')}`;
    content.innerHTML =temp ;
    mySeat ==handler ? mySeat =0 :0;
    mySeat ==handler ? location.reload(true) :0;
  }
/*   if(seat_state[1]!=1 || seat_state[2]!=1 || seat_state[3]!=1 || seat_state[4]!=1 && !document.getElementById("ImReadyButton").classList.contains(`disabled`) ){
    document.getElementById("ImReadyButton").className =document.getElementById("ImReadyButton").className +`disabled`;
    document.getElementById("ImReadyButton").disabled = true;
  } */

}//function fun_stand_up


function stand_up_force(handler){
    document.getElementById(`user-seat-${handler}`).onclick = function() { fun_seat(handler,handler); };
    document.getElementById(`user-seat-image-${handler}`).src = `/img/user.png`;
    document.getElementById(`user-seat-profile-${handler}`).href="#";
    document.getElementById("standUpButton").remove();
    document.getElementById("ImReadyButton").remove();
    content = document.getElementById(`#user-seat-status-${handler}`).innerHTML = `<i class="material-icons"></i>${trans('Free Seat')}`;
   /*  temp=`<i class="material-icons"></i> Free Seat `;
    content.innerHTML =temp ; */
}

//789 این تابع زمانی فراحوانی می شود که پیامی از سرور 
// در خصوص بلند شدن یا نشستن یک کاربر دریافت شده باشد
// اگر نشسته مقدار چک صحیح
// اگر بلند شده مقدار چک غلط
function server_seat_stand (seat_no,check){
  if (check){
      users_seat[seat_no]=1;
      fun_seat(seat_no ,5);
  }else{
    
      fun_stand_up(seat_no,false);
  }
}//function server_seat_stand 


  
    //تابع نشست کاربر
    // اگر ورودی متغییر چک 5 باشید یعنی از سرور پیام ارسال شده
    //هندلر شماره جایگاه را نگه می دارد
    function fun_seat(handler,check ,player)
    {
      if(seat_local_user!=0){
        if(check !=7){
          return 0
        }
      }
     // seat_local_user!=0 && check !=7 ? return 0:0;
      console.log(`نشستن درجایگاه ${handler} , check ${check} player ${player } local ${seat_local_user} `)
     // 
      
      seat_state[handler]=1;
      let  user_seat_no=handler;
      let user_image = localStorage.getItem('image')  ;
      let user_name = localStorage.getItem('name') ;
      myseat=handler; // شماره نسشتن را بصورت عمومی نگه می دارد فقط خود کاربر
      let ready_logo='';
      
 /*      if(check!=7){
        if(handler==2){user_seat_no=3;myseat=3;}
        if(handler==3){user_seat_no=2;myseat=2;}
      }else{
        user_seat_no=handler;
      } */
      console.log(`user_seat_no ${user_seat_no} , user_image ${user_image} user_name ${user_name}`)
       if(check==7){
        user_seat_no=handler;

        user_image = player.image ;
        user_image ==='d' || user_image ==='joker.jpg'  ? user_image ='/img/logo/joker_00.jpg' :0;
        user_name =  player.name;    
        //document.getElementById(`user-seat-status-${i}`).innerHTML ='<i class="material-icons">done</i>'
        console.log(`type of ready ${ player.ready}`)
        if(player.ready){ready_logo = 'done';}
        //player.ready ? ready_logo = 'done', 0;
        console.log(`user_seat_no ${user_seat_no} , user_image ${user_image} user_name ${user_name}`)
       }

      
       user_name=fun_string_short(user_name,17)
       let content = document.querySelector(`#buttons-room`);
      

        // اول به سرور پیام می فرستد اینجا می خواهد بنشید آیا آزاد هست ؟
         //789 اول به سرور هماهنگ می کند که کاربر می خواهد اینجا بنشید اگر آزاد بود می تواند بنشیند 
      // اگر قبلا کسی نشسته است به کاربر پیام نشان دهد پر شده است  
      //check == 7 یعنی اطلاعات از سمت سرور آماده
        const server_return =fun_user_seat(user_seat_no);  
        if (users_seat[user_seat_no]==0 || check===7 ){
            if(check!=5 ){
                handler==check ? seat_local_user=handler: 0;
                console.log(`نشستن درجایگاه ${handler}` ,seat_state)
                users_seat[user_seat_no]=1;

              //  document.getElementById(`user-seat-${handler}`).onclick = `fun_seat(${handler},${handler})`;
                if(check!==7){
                  temp =`          
                  <button type="submit"  
                    class="waves-effect waves-light z-depth-2 btn pulse   orange lighten-2 disabled" 
                    id="ImReadyButton"
                    onclick="fun_im_ready(${handler})"  
                    style="border: 0; background: transparent" >
                      <i class="material-icons left">done</i>${trans('Ready')}
                  </button>`;
                  content.innerHTML +=temp;

                temp=`<button type="submit" 
                  class="waves-effect waves-light z-depth-3 btn   black lighten-2" 
                  id="standUpButton" onclick="fun_stand_up(${handler},true)" style="border: 0; background: transparent">
                  <i class="material-icons left">sync</i>${trans('Stand Up')} 
                  </button>`;
                  content.innerHTML +=temp;

                }
                 // اگر کاربر در یک جایگاه نشست دیگر قابل کلیک نباشد
                  if(seat_local_user!=0){
                    //fun_seat
  /*                   document.getElementById(`user-seat-1`).onclick = "";
                    document.getElementById(`user-seat-2`).onclick = "";
                    document.getElementById(`user-seat-3`).onclick = "";
                    document.getElementById(`user-seat-4`).onclick = ""; */
                  }

                  console.log('user info in function fun_seat',user_seat_no,user_image)
                  document.getElementById(`user-seat-image-${user_seat_no}`).src = `${user_image}` ;
                  //document.getElementById(`user-seat-profile-${user_seat_no}`).href="#modal-profile";
                  content = document.querySelector("#user-seat-status-"+user_seat_no);
                  temp=`<i class="material-icons">${ready_logo}</i> ${user_name} `;
                  content.innerHTML =temp ;

                  if(check==7){
                    console.log('function fun_seat check 7');
                     document.getElementById('user-seat-'+user_seat_no).onclick = function() { show_profile(user_seat_no); }
                  }
              }//end if
          }//end if
          else{
            //789 
            // اگر جایگاه آزاد نبود کد زیر اجرا می شود
            //document.getElementById(`user-seat-${user_seat_no}`).onclick = "";
          //  document.getElementById(`user-seat-${user_seat_no}`)..addEventListener("click",'#')
            users_seat[user_seat_no]=1;
            
            document.getElementById(`user-seat-image-${user_seat_no}`).src = user_image ;
            document.getElementById(`user-seat-profile-${user_seat_no}`).href="#modal-profile";
            content = document.querySelector("#user-seat-status-"+user_seat_no);
            temp=`<i class="material-icons">done</i> ${user_name} `;
            content.innerHTML =temp ;
            
            //به کاربر پیامی نمایش داده شود که این جایگاه پر شده است
          }
          //console.log(`seats ${users_seat} no: ${user_seat_no} , ${ seat_state[1]!=1 || seat_state[2]!=1 || seat_state[3]!=1 || seat_state[4]!=1 && !document.getElementById("ImReadyButton").classList.contains(`disabled`)} `);
          //document.getElementById("ImReadyButton").className  =+`disabled`;
     /*      if(seat_state[1]!=1 || seat_state[2]!=1 || seat_state[3]!=1 || seat_state[4]!=1 && !document.getElementById("ImReadyButton").classList.contains(`disabled`) ){
            document.getElementById("ImReadyButton").className =document.getElementById("ImReadyButton").className +`disabled`;
            document.getElementById("ImReadyButton").disabled = true;
          }
          if(seat_state[1]==1 && seat_state[2]==1 && seat_state[3]==1 && seat_state[4]==1 ){
            console.log('ImReadyButton');
            document.getElementById("ImReadyButton").disabled = false;
            document.getElementById("ImReadyButton").classList.remove("disabled");
          }     */    
    }//function fun_seat

    function show_profile(no){
      // if type of no is integer then value is seat no , if type of varible no is string  then value is sid
      console.log('show_profile' + no);
      let user ={};
      if(typeof no === 'string'){
        user = get_user_info_by_id(no);
      
      }else
      {

        for(let k in usersPlayer){         
          if( usersPlayer[k].seat==no )
            {
               user= usersPlayer[k];
            }
        }
      }
      //eject-user-button
      document.getElementById('eject-user-button').innerHTML=`<button onclick='fun_eject_user(${no})' class="modal-close waves-effect waves-green btn-flat">${trans('Yes')}</button>`
      console.log(user);
      localStorage.getItem('id').indexOf('guest-')==-1?get_detials_user_info(user.sid): get_detials_user_info('guest');
/*      if( localStorage.getItem('id').indexOf('guest-')==-1 ){
       console.log('not guest');
      get_detials_user_info(user.sid);
     }else{
      console.log('guest',localStorage.getItem('id'),localStorage.getItem('id').indexOf('guest-'));
       get_detials_user_info('guest');
      } */
      //m-p-name-value
      console.log(user.exp);
      document.getElementById('m-p-name-value').innerHTML=user.name
      document.getElementById('m-p-image').src = user.image==='d' || user.image==='joker.jpg'  ? '/img/logo/joker_00.jpg' : user.image;
      document.getElementById('m-p-totalp').innerHTML = user.coin +'💰';
      document.getElementById('m-p-totalex').innerHTML = user.exp;
      document.getElementById('m-p-totalwin').innerHTML = user.win;
      document.getElementById('m-p-totalleft').innerHTML = user.dc;
     
   
     const elem = document.getElementById('modal-profile');
      const instance = M.Modal.init(elem, {dismissible: false});
      instance.open();
      // document.getElementById('user-seat-'+user_seat_no).onclick = function() { show_profile(user_seat_no); }
      document.querySelector(".modal-overlay").onclick = function() {hide_profile(); }
      //modal-overlay
    }

    function hide_profile(){
      console.log('close modal profile');
      const elem = document.getElementById('modal-profile');
      const instance = M.Modal.init(elem, {dismissible: false});
      instance.close();
    }



     
    //789 زمانی که اتاق خصوصی بود این تابع باید صدا زده شود
    // این تابع دکمه اشتراک گذاری را به اتاق اضافه می کند
    // کاربر با کلیک رو این دکمه یک مدل به نام مدل-شر را می بنید
    function fun_private_room_share()
    {
      let content = document.querySelector(`#buttons-room`);
      temp =`        
           <a class="waves-effect waves-light z-depth-3 btn   blue-grey darken-1" href="#share-modal"  style="border: 0; background: transparent">
              <i class="material-icons left">share</i>${trans('invite')}
           </a>`;
      content.innerHTML +=temp;
    }

    function fun_room_mangement()
    {

      let content = document.querySelector(`#user-mange`);
      temp =`        
      <a class="waves-effect waves-light  btn  deep-orange accent-4" id="ImReadyButton" href="#eject-user" style="border: 0; background: transparent">
         <i class="material-icons">${trans('Eject')}</i>
      </a>
   `;
      content.innerHTML +=temp;
    }

    function fun_share(a,val){

        //room_id ای دی اتاق است
        //val ==1 یعنی قرار است اتاق به اشتراک گذاشته شود
        // val==2 یعنی قرار است خود بازی توسط بازیکن اشتراک گذاشته شود
        gtag('event', 'share_room');
        var send ;
        let room_id = 0;
        val == 1 ? room_id=roomId :0;
        const shareId= val ==2 && localStorage.getItem('gid') ? localStorage.getItem('gid') :'789';
        let text ="Let's play Hukm 😍";
        console.log('farsi lan' + localStorage.getItem('language'));
        localStorage.getItem('language')==='fa' ? console.log('farsi lan'):0;
        localStorage.getItem('language')==='fa' ? text ="رفیق بیا حکم بازی کنیم 😍" : 0 ;
        localStorage.getItem('language')==='ar' ? text =text+'😎' : 0 ;
          // لینک اتاق به اشتراک گذاشته می شود
        //  var share_url = room_id!=0 ? encodeURIComponent(`${window.location.protocol}//${window.location.hostname}/invite/${room_id}`) :encodeURIComponent(`${window.location.protocol}//${window.location.hostname}/share/${shareId}`);
          var share_url = encodeURIComponent(`${window.location.protocol}//${window.location.hostname}/`) ;
          var share_title = encodeURIComponent(trans("Let's play Hukm 😍"));
        var share_img = encodeURIComponent("XXXXXX");


        if (a == 'twitter'){send  = 'https://twitter.com/intent/tweet';
        send += '?text='       + share_title;
        send += '&url='    + share_url;
        }if (a == 'whatsapp'){send  = 'whatsapp://send';
        send += '?text='       + share_title;
        send += '%20'    + share_url;
        }if (a == 'telegram'){send  = 'https://telegram.me/share/url';
        send += '?url='    + share_url;
        send += '&text='       + share_title;
        }if (a == 'facebook'){send  = 'https://www.facebook.com/sharer/sharer.php';
        send += '?u='    + share_url;
        
        }if (a=='email'){        
          send =`mailto:?body=${share_title} ${share_url}`;
        }
        if(send){
          window.open(send,'','toolbar=0,status=0,width=500,height=500, top=40%, left=40%');
        }

        if (a=='copy')
        {
          
          copyText(share_url);
        }
    }

    // این تابع زمانی فراخوانی می شود که کاربر سازنده اتاق باشد
    //789
  function room_controler(check)
  {

    //اگر سازنده اتاق بود
    if (check)
    {
      fun_room_mangement()
    }


  }


  function copyText(str){
   var el = document.createElement('textarea');
   // Set value (string to be copied)
   el.value = str;
   // Set non-editable to avoid focus and move outside of view
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   // Select text inside element
   el.select();
   // Copy text to clipboard
   document.execCommand('copy');
   // Remove temporary element
   document.body.removeChild(el);
  }
  //listGiftsUi();


  function fun_sendgift(gift,value){
    let ex= Number(localStorage.getItem("coin"));
     ex> value ? send_gift_to_user(gift) :M.toast({html: `${trans("You don't have enough Coin")}`, classes:' Red darken-1'});
     ex>value ? ex = ex-value:0;
    console.log(`net ${ex-value}`);
    
    localStorage.setItem("coin",ex);
    gtag('event', 'send_gift');
  }


  function fun_string_short(str,len){ // مقدار استرینگ اگر بزرگتر از طول مورد نظر بود اون 
   let r=str ;
   console.log(str)
   console.log(`str len : ${str.length}`);
   str.length <= len ? r=str : r=str.slice(0,(len-4))+'...';
    return r;
  }



  function fun_setting_update(){
    
    const sound= document.getElementById("sound_update").checked;
    const vibration= document.getElementById("vibration_update").checked;
    const speedGame= document.getElementById("speed_game").checked;
    let name =document.getElementById("name").value;
    console.log(`name:${name} sound:${sound} `)
    //vibration
    if(name.length<5){
      M.toast({html: trans("name must be more then 8 charcters!"), displayLength:5000, classes: ' red darken-1 '});
    }
    else{
      localStorage.setItem("name",name); 
      localStorage.setItem("sound",sound); 
      localStorage.setItem("vibration",vibration); 
      localStorage.setItem("speedGame",speedGame); 
 
      M.toast({html: trans("Update Done."), displayLength:4500, classes: 'amber darken-1 '});
    }
    if (vibration){
      window.navigator.vibrate([200]);
      console.log(' vib true');
    }
    user_update();
  }
  // تنظیمات
  function fun_setting_get_data(){

    console.log(typeof localStorage.getItem('sound') )
    if(document.getElementById("name")){
      localStorage.getItem("sound")==="true" ? document.getElementById("sound_update").checked =true :document.getElementById("sound_update").checked =false;  
      localStorage.getItem("speedGame")==="true" ? document.getElementById("speed_game").checked =true :document.getElementById("speed_game").checked =false;  
      //language
      localStorage.getItem("vibration")==="true" ? document.getElementById("vibration_update").checked =true :document.getElementById("vibration_update").checked =false; 
      document.getElementById("name").value =localStorage.getItem('name');
    }

  }


  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
    //  alert("Ready");
   
     (modal, trigger);
    },
    complete: function() { //alert('Closed');
    } // Callback for Modal close
  }
);