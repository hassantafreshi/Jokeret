

//line  78  uncomment@

gtag('event', 'lobby_create_');

var roomPub ;

let gameStartPub = 0; // وضعیت کنترلی بازی را نگه می دارد
let usersPlayer={};
let roomId =0;
let sid_modal = '';
let mySeat=0;
let myCards={};
let isIntheRoom =false;
let hokm_is =0;
let count_time_user_send=0;
let state_room ='lobby  ';
let messageCount=0;
let iplayed =false;
let button_Seat=0;
let cleanDesk=0;
enCoin =true;
// قالب پیش فرض
//console.log(`gameStartPub ${gameStartPub}`);
    function fun_show_tem(handler)
    {
        if(handler==true)
        {}
        else{
            deleteChild("content");
        }
    
    }

// نمایش لابی
function fun_show_loby(handler)
{
    //console.log('show content :fun_show_loby');
    if(handler==true)
    { 

        let content = document.querySelector('#content');
        let cards_room=``;
        cards_room =fun_Card_rooms();
        ///789 سکشن تست
        // بعد پاک شود
        //value=}
        let temp =`
        <div id="loby" data-role="page"  class="loby">
            <div id="listOfButtonsOfLoby" class="center row">
            
            
            <a  id="Rooms-button" class="btn-large indigo darken-4 sidenav-trigger" data-target="side-form">${trans("Start Game")} </a>
            </div>
            <div id="listOfRoom">
            </div>
        </div>
        `;
        content.innerHTML =temp;
        // پایان سکشن تست   

        let template = `<div class="card-rooms " id="card-rooms"> 

        ${cards_room}
    
 
      </div>
      <div class="fixed-action-btn center">
      <a class="btn-floating  btn-large add-btn sidenav-trigger" data-target="side-form">
        <i class="material-icons">add</i>
      </a>`;
        content.innerHTML +=template;

       
    }
    else{
        deleteChild("content");
    }

}// end fun show loby


// این تابع اطلاعات را از کاربر می گیرد و اتاق را می سازد
//789 در حال حاضر فقط اطلاعات را از فرم ثبت می گیرد
//789 با سرور سینک نیست
// محتوا کانت را حذف می کند
function fun_create_room()
{

  //console.log('get_create_room_fun');
      const room_name = document.getElementById("room_name").value;
      let roomtype_=false ,room_kind_=false;
      let gamekind_ =0;
      //console.log('room_name '+room_name);
     // gameStartPub=1;
      if (room_name.length>5  ){

        //const room_type= document.getElementById("room_type");
       // const room_type= document.getElementById("room_type");
          if (room_type.checked == true){
            roomtype_=true;
           
          } 
         // roomtype_=true;
          //console.log('room_type '+roomtype_);

         // نوع بازی را ذخیره می کند
         //7hand , naras ina
          const room_kind= document.getElementById("room_kind");
          //console.log('room kind:'+room_kind_);
          //privte | public
          let game_type =7;
          let player_count =4;
          document.getElementById('game_type-3').checked ? game_type =3:0;
          document.getElementById('game_type-5').checked ? game_type =5:0;
          document.getElementById('game_type-7').checked ? game_type =7:0;

          document.getElementById('game_player_4').checked ? player_count =4 :0;
          document.getElementById('game_player_2').checked ? player_count =2:0;
          document.getElementById('game_player_1').checked ? player_count =1:0;
          //console.log('game_type'+game_type);
          //coin
          const coin_room = document.getElementById("point_room").value;
          //console.log('point_room '+point_room);

            if(coin_room>29 && player_count!=1)
            {
                if('hokm'=='hokm')
                {
                    gamekind_ =10000;
                }
                switch(game_type)
                {
                    case 3:
                            gamekind_+=3000;
                        break;
                    case 5:
                            gamekind_ +=5000;
                        break;
                    case 7:
                            gamekind_ +=7000;
                        break;
                }
                player_count ==4 ? gamekind_ +=400: gamekind_ +=200;
                room_kind.checked == true ? gamekind_+=2 : gamekind_+=1;
                //console.log(`room kind ${gamekind_}`)
                
            
                // در این قسمت اطلاعات را به سرور می فرستد برای ساختن اتاق
                //  room = client.join('chat', { create: true, 
                //name:room_name, point:point_room, room_type:1,privacy:roomtype_ });
            
       


               document.getElementById("side-form").style="transform: translateX(-105%);";
              
               document.getElementsByClassName('sidenav-overlay')[1].style="display: none; opacity: 0;";
               //;
               //side-form
               // M.toast({html: "Room "+room_name + " Created", displayLength:2000, classes: ' amber darken-1 '});
                // محتوا کانت را پاک می کند
                deleteChild("content");
                // تابع ویتینگ روم را صدا می زند
                // کاربر به قسمت انتظار و اعلام آمدگی ارسال می شود
                fun_loby(true , player_count);

                //789 دو تابع زیر تابع های قدیمی هستند
                // وقتی کاربر اتاق را ساخت صفحه فرم اطلاعات اتاق مخفی می شود و روم نمایش داده می شود
                //form_create_room_fun(true);
                    //7891 
                // hide_room_fun(false);
                
                
                client.create("chat"
                ,{create: true, name:room_name, point:coin_room,privacy:roomtype_ ,game_type:`${gamekind_}`}
                )
                    .then(room => {
                        roomPub=room ;
                        //console.log('client id'+roomPub.sessionId);
                        //console.log('roomId:'+room.id);
                        roomId=room.id;
                        localStorage.setItem('inviteRoomId',roomId);
                        auth_user();
                        room.onStateChange.once(function(state) {
                            //console.log("initial room state:", state);
                        });
                
                        // new room state
                        room.onStateChange(function(state) {
                            // this signal is triggered on each patch
                            //console.log(`state is ${state}`)
                            
                        });
                
                        // listen to patches coming from the server
                        room.onMessage(function(message) {
                            //console.log(`message`,message);
                            getDataonMessage(message);
                        });

                        room.onLeave((code) => {
                         console.log(`leave room`);
                         localStorage.removeItem("inviteRoomId");
                         document.getElementById('body').innerHTML =`<div class="message-box-over z-index: 9999;"> <div class="container col l6 s10  row " id="container" onClick='fun_side_menu_go("play")' ><div class="end-game z-depth-2  red lighten-3 grey-text  col l6 s12" id="game-message-box">  <div class="row" id="end-game-box-first-row"> <div class="col l4 s4 m4 xl4"></div> <div class="col l4 s4 m4 xl4 z-depth-1" id="game-message-box-head"> <h3 class="center" id="end-game-box-medal-logo">✋<h3> </div> <div class="col l4 s4 m4 xl4 "></div>  </div>  <div class="row" id="end-game-box-second-row"> <div class="col s12 l12 m12 xl12"><h2 class="center red-text " id="end-game-box-title"></h2>  </div>  </div>  <div  class="row" id="end-game-box-third-row"> <div class="center col s12 m12 l12 xl12" ><div class="center col s12 m12 l12 xl12 z-depth-1" id="game-message-box-M">  <h2 class="center" id="game-message-box-des" onClick='fun_side_menu_go("pre-register")'> <span id="end-game-box-point-box-coin-nuumber">${trans(`Disconnected,Your Connection is poor`)}</br></span></h2></div><div class="center col s10 m10 l10 xl10 z-depth-1 " id="end-game-box-point-box-title-box" > <h6 class="center" id="game-message-box-down-box-me"><span id="end-game-box-point-box-exp-nuumber">🤷</span></h6></div></div></div>  <div class="row" id="end-game-box-fourth-row">  </div> </div>  <a onClick='fun_side_menu_go("play")' ><div class="center col s3 m3 l3  xl3 z-depth-2" id="end-game-box-back-loby"> <div class=" material-icons " id="end-game-box-loby-back-icon"> close  </div> </div>  </a> </div> </div>`;
                        });
         
                
                        // send message to room on submit
      /*                   document.querySelector("#form").onsubmit = function(e) {
                        
                        //   var input = document.querySelector("#input");

                        //   console.log("input:", input.value);
                
                            // send data to room
                        // room.send({ message: input.value });
                
                            // clear input
                        // input.value = "";
                        } */
                    });
            }else if(player_count==1){
              localStorage.setItem('setGame' ,game_type);
              localStorage.setItem('coinGame' ,coin_room);
              document.getElementById('body').innerHTML=preloader();
              window.open(`/pages/single-hokm-game.html`,"_self");
            }else{
                M.toast({html: trans("Please enter minimum 30 coin!"), displayLength:5000, classes: ' red darken-1 '});
            }

      }else{
          M.toast({html: trans("Please enter room Name more than 6 character!"), displayLength:3000, classes: ' red darken-1 '});
      } //end if else

 
    }// end function  get_create_room_fun



//نمایش اتاق انتظار
// این تابع وظیفه دارد زمانی که کاربران اعلام آمادگی کردند اتاق را ایجاد کند
function fun_Waiting_room(handler)
{
    
    if(handler==true)
    {
        //789 این تابع تست برای نمایش اتاق است که از کد قبلی کپی برداری شده
        // 789 بعد این تابع با تاع ساخت اتاق می بایست جایگیزن شود
        hide_room_fun(false);
    }
    else{
        deleteChild("content");
    }
}

function fun_lock_user_player(val,check){
    //console.log('[123] fun_lock_user_player',val ,check)
    //اگر مقدار صحیح گرفت کاربر قفل می شود
    // اگر مقدار غلط کاربر از قفل خارج می شود
    if(val){
        if(check){
          //  setTimeout(function(){fun_lock_card_user(true,0)},1800);
          fun_lock_card_user(true,0)
        }else {
            fun_lock_card_user(true,0);
        }
    //console.log('user is lock');
    }else{
      fun_lock_card_user(false,0);
     
        //console.log('user is unlock');
        
      //  fun_wait_user_response()

        
    }
}

function fun_loby(handler,player_count)
{
  console.log(`[999]player_count ${player_count}`)

  player_count!=0 ?  localStorage.setItem('roomPlayer',player_count) :0;
    if(handler==true)
    {
        //gameStartPub+=1;
        //console.log(`[789] fun_loby gameStartPub ${gameStartPub}  `);
        //789 این تابع تست برای نمایش اتاق است که از کد قبلی کپی برداری شده
        // 789 بعد این تابع با تاع ساخت اتاق می بایست جایگیزن شود
        fun_mange_room(false,player_count);
    }
    else{
        deleteChild("content");
    }
}

// تابع نمایش بازی
/* function fun_play_game(handler){
    console.log('fun_play_game')
    var content = document.querySelector('#content');
    if (handler==true)
    {
        var template = `
       
        <div class="desk">
            <div class="row radif1">
                <div class="col s5 m5 l5 center"><p>Right colum</p>
                </div>
                <div class="col s2 m2 l2 center">
                    <img src="/img/user01.png"  alt="" class=" circle responsive-img">
                </div>
                <div class="col s5 m5 l5 center "><p>left colum</p>
                </div>
            </div>
            <div class="row ">
                <div class="col s5 m5 l5 center"><p>Right colum</p>
                </div>
                <div class="col s2 m2 l2 center">
                    <img  src="/img/cards/9s.svg" alt="" width="90" class="responsive-img" >
                </div>
                <div class="col s5 m5 l5 center "><p>left colum</p>
                </div>
            </div>
            <div class="row ">
                <div class="col s2 m2 l2">
                  <img class="responsive-img" src="/img/user04.png" alt="" class="circle responsive-img">
                </div>
                <div class="col s2 m2 l2 center"></div>
                <div class="col s2 m2 l2 center">  
                    <img src="/img/cards/10s.svg"  alt="submit"  width="90" class="responsive-img" />
                </div>
                <div class="col s2 m2 l2 center">  
                    <img src="/img/cards/10h.svg"  alt="submit" width="90" class="responsive-img" />
                </div>
                <div class="col s2 m2 l2 center"></div>
                <div class="col s2 m2 l2 ">
                  <img  class="responsive-img" src="/img/user02.png"  alt="" class="circle responsive-img">
               </div>
            </div>
                <div class="row ">
                    <div class="col s5 m5 l5 center"><p>Right colum</p>
                    </div>
                    <div class="col s2 m2 l2 center">
                        <img  src="/img/cards/8s.svg" alt="" width="90" class="responsive-img" >
                    </div>
                    <div class="col s5 m5 l5 center "><p>left colum</p>
                    </div>
               </div>
            </div>
       </div>
        <div  class="cardplayer">
          <div class="row center ">
                <div class="col s1">
                  <button type="submit" onclick="M.toast({html: 'I am a toast'})"  style="border: 0; background: transparent">
                      <img src="/img/cards/Ac.svg"   alt="submit" width="100" />
                  </button>
                </div>
                <div class="col s1">
                  <button type="submit" onclick="M.toast({html: 'I am a toast'})"  style="border: 0; background: transparent">
                      <img src="/img/cards/kD.svg"   alt="submit" width="100" />
                  </button>
                </div>
                <div class="col s1">
                  <button type="submit" onclick="M.toast({html: 'I am a toast'})"  style="border: 0; background: transparent">
                      <img src="/img/cards/kc.svg"   alt="submit" width="100" />
                  </button>
                </div>
                <div class="col s1">
                  <button type="submit" onclick="M.toast({html: 'I am a toast'})"  style="border: 0; background: transparent">
                      <img src="/img/cards/kD.svg"   alt="submit" width="100" />
                  </button>
                </div>
                <div class="col s1">
                  <button type="submit" onclick="M.toast({html: 'I am a toast'})"  style="border: 0; background: transparent">
                      <img src="/img/cards/kh.svg"   alt="submit" width="100" />
                  </button>
                </div>
                <div class="col s1">
                  <button type="submit" onclick="M.toast({html: 'I am a toast'})"  style="border: 0; background: transparent">
                      <img src="/img/cards/Ah.svg"   alt="submit" width="100" />
                  </button>
                </div>
          </div>
          <div class=" row center">
                <div class="col s1">
                  <button type="submit" onclick="M.toast({html: 'I am a toast'})"  style="border: 0; background: transparent">
                      <img src="/img/cards/js.svg"   alt="submit" width="100" />
                  </button>
                </div>
                <div class="co2 s2">
                  <button  class="col s1" type="submit" onclick="M.toast({html: 'I am a toast'})"  style="border: 0; background: transparent">
                      <img src="/img/cards/jD.svg"   alt="submit" width="100" />
                  </button>
                  <button  class="col s1" type="submit" onclick="M.toast({html: 'I am a toast'})"  style="border: 0; background: transparent">
                      <img src="/img/cards/jD.svg"   alt="submit" width="100" />
                  </button>
                </div>
  
                <div class="col s1">
                  <button type="submit" onclick="M.toast({html: 'I am a toast'})"  style="border: 0; background: transparent">
                      <img src="/img/cards/QD.svg"   alt="submit" width="100" />
                  </button>
                </div>
                <div class="col s1">
                  <button type="submit" onclick="M.toast({html: 'I am a toast'})"  style="border: 0; background: transparent">
                      <img src="/img/cards/Qh.svg"   alt="submit" width="100" />
                  </button>
                </div>
                <div class="col s1">
                  <button type="submit" onclick="M.toast({html: 'I am a toast'})"  style="border: 0; background: transparent">
                      <img src="/img/cards/Qs.svg"   alt="submit" width="100" />
                  </button>
                </div>
                <div class="col s1">
                  <button type="submit" onclick="M.toast({html: 'I am a toast'})"  style="border: 0; background: transparent">
                      <img src="/img/cards/10s.svg"   alt="submit" width="100" />
                  </button>
                </div>
          </div>
        </div>
        `; 
        content.innerHTML =template;
    }
    else
    {
        deleteChild("content");
    }

    
} */

    function fun_Card_rooms()
    {
        let temp =`` ; // قالب کارت
        let i=0; // برای لوپ
        let max=10; // متغییر تعداد اتاقی که باید نمایش داده شود
        let room_users_ready=` `; // شکلک کاربران برای کارت
        let room_users_ready_in =0;
        let room_name =``; // اسم اتاق را بر می گرداند
        let room_type =``;
        let room_id =``;
   /*      for (i=0 ; i<max ; i++)
        {
            room_id =`assfsaf${Math.floor(Math.random() * 11000)}`; //   room_id از سرور بگیرد
            // متغییر زیر از سمت سرور گرفته می شود
            // تعداد کاربران آماده بازی را مشخص می کند
            room_users_ready_in=3;
            room_name=`Room Name Room Name Room Name`; // اسم اتاق در این متغییرریخته شود
            room_name=(room_name.length>15) ? room_name.substr(0, 15): room_name;
            room_type =`7Hand , 4A , Reular , NA`; // نوع بازی در اینجا ریخته شود
            room_users_ready=`<i class="material-icons">`; 
            let while_count=room_users_ready_in;

            while(while_count>0)
            {
                room_users_ready+=`person`  
                while_count-=1;
            }
            while_count=room_users_ready_in;
            while(while_count<4){
                room_users_ready+=`person_outline`  
                while_count+=1;
            }
           let color =  max /2 ? 'red darken-1 accent-3 white-text' :  ' indigo darken-4  white-text';
            room_users_ready+=`</i>`;
            temp+=` 
            
            <div class="card-panel card-room  ${color}  row" id="${room_id}" onClick="fun_room_join('${room_id}',0)">
                <img src="/img/logo.png" alt="card-room thumb" id="image-card-room">
                <div class="card-room-details">
                <div class="card-room-title">${room_name}</div>
                <div class="card-room-ingredients">${room_type}</div>
            </div>
                <div class="card-room-person">
                    ${room_users_ready}
                </div>
            </div>
        `;

        room_users_ready=``;
        } */
        return temp;
    }

    // حذف از یک المان
    function deleteChild(child) { 
        var myNode = document.getElementById(child);
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        
    } 


    // نمایش عدم نمایش اتاق بازی
    function hide_room_fun(handler)
    {
                // اگر ترو بود المان های اتاق را نمایش نده 
        if (handler==true){
            var myNode = document.getElementById("room");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            myNode = document.getElementById("body");
            document.getElementById('room').remove();
            
        
        }
        // اگر فالس بود المان های اتاق را نمایش بود
        if (handler==false)
        {
            
            var tag = document.createElement("div");
            tag.id = "room";
            tag.className="room";
            document.querySelector("#content").appendChild(tag);
            // لیست تام فرزندان روم را می دهد

            // add image logo
            tag = document.createElement("IMG");
            tag.setAttribute("src", "logo.jpg");
            tag.setAttribute("height", "228");
            tag.setAttribute("alt", "Hokm Online");
            document.querySelector("#room").appendChild(tag);


        
            //point section start
            tag = document.createElement("div");
            tag.id = "room-point";
            tag.className="room-point";
            document.querySelector("#room").appendChild(tag);
            
            
            tag = document.createElement("p");
            var txt = "Set Point";
            tag.innerHTML =txt ;
            document.querySelector("#room").appendChild(tag);

            tag = document.createElement("h4");
            tag.id = "showSymb";
            txt="";
            tag.innerHTML =txt ;
            document.querySelector("#room").appendChild(tag);

            tag = document.createElement("h4");
            tag.id = "mySetsPoint";
            tag.className="mySetsPoint";
            txt="0";
            tag.innerHTML =txt ;
            document.querySelector("#room").appendChild(tag);

            tag = document.createElement("h4");
            txt="-";
            tag.innerHTML =txt ;
            document.querySelector("#room").appendChild(tag);

            tag = document.createElement("h4");
            tag.id = "mySetsPoint";
            tag.className="mySetsPoint";
            txt="0";
            tag.innerHTML =txt ;
            document.querySelector("#room").appendChild(tag);
            // end point section

            //br 
            tag = document.createElement("br");
            document.querySelector("#room").appendChild(tag);

            tag = document.createElement("br");
            document.querySelector("#room").appendChild(tag);


            // user list section 
            tag = document.createElement("div");
            tag.id = "cardAreaDiv";
            tag.className="cardAreaDiv";
            document.querySelector("#room").appendChild(tag);
            var i=0;
            for (i=0;i<4;i++){
                tag = document.createElement("h3");
                tag.id = "playerCard"+(i+1);
                tag.className="playerCard"+(i+1);
                txt="0";
                tag.innerHTML =txt ;
                document.querySelector("#cardAreaDiv").appendChild(tag);
            }//end for
            // End user list section 


            //br 
            tag = document.createElement("br");
            document.querySelector("#room").appendChild(tag);

            tag = document.createElement("br");
            document.querySelector("#room").appendChild(tag);

            // card list section 
            tag = document.createElement("div");
            tag.id = "cards_list_id";
            tag.className="cards_list_id";
            document.querySelector("#room").appendChild(tag);

                tag = document.createElement("input");
                tag.type = "button";
                tag.className="waves-effect waves-light btn";
                tag.value = "my1";
                tag.id = "myBtn1";
                //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
                tag.onclick =function () { send_card_fun_(1)};            
                document.querySelector("#cards_list_id").appendChild(tag);

                tag = document.createElement("input");
                tag.type = "button";
                tag.className="waves-effect waves-light btn";
                tag.value = "my2";
                tag.id = "myBtn2";
                //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
                tag.onclick =function () { send_card_fun_(2)};            
                document.querySelector("#cards_list_id").appendChild(tag);

                tag = document.createElement("input");
                tag.type = "button";
                tag.className="waves-effect waves-light btn";
                tag.value = "my3";
                tag.id = "myBtn3";
                //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
                tag.onclick =function () { send_card_fun_(3)};            
                document.querySelector("#cards_list_id").appendChild(tag);

                tag = document.createElement("input");
                tag.type = "button";
                tag.className="waves-effect waves-light btn";
                tag.value = "my4";
                tag.id = "myBtn4";
                //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
                tag.onclick =function () { send_card_fun_(4)};            
                document.querySelector("#cards_list_id").appendChild(tag);

                tag = document.createElement("input");
                tag.type = "button";
                tag.className="waves-effect waves-light btn";
                tag.value = "my5";
                tag.id = "myBtn5";
                //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
                tag.onclick =function () { send_card_fun_(5)};            
                document.querySelector("#cards_list_id").appendChild(tag);

                tag = document.createElement("input");
                tag.type = "button";
                tag.className="waves-effect waves-light btn";
                tag.value = "my6";
                tag.id = "myBtn6";
                //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
                tag.onclick =function () { send_card_fun_(6)};            
                document.querySelector("#cards_list_id").appendChild(tag);

                tag = document.createElement("input");
                tag.type = "button";
                tag.className="waves-effect waves-light btn";
                tag.value = "my7";
                tag.id = "myBtn7";
                //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
                tag.onclick =function () { send_card_fun_(7)};            
                document.querySelector("#cards_list_id").appendChild(tag);

                tag = document.createElement("input");
                tag.type = "button";
                tag.className="waves-effect waves-light btn";
                tag.value = "my8";
                tag.id = "myBtn8";
                //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
                tag.onclick =function () { send_card_fun_(8)};            
                document.querySelector("#cards_list_id").appendChild(tag);

                tag = document.createElement("input");
                tag.type = "button";
                tag.className="waves-effect waves-light btn";
                tag.value = "my9";
                tag.id = "myBtn9";
                //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
                tag.onclick =function () { send_card_fun_(9)};            
                document.querySelector("#cards_list_id").appendChild(tag);

                tag = document.createElement("input");
                tag.type = "button";
                tag.className="waves-effect waves-light btn";
                tag.value = "my10";
                tag.id = "myBtn10";
                //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
                tag.onclick =function () { send_card_fun_(10)};            
                document.querySelector("#cards_list_id").appendChild(tag);

                tag = document.createElement("input");
                tag.type = "button";
                tag.className="waves-effect waves-light btn";
                tag.value = "my11";
                tag.id = "myBtn11";
                //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
                tag.onclick =function () { send_card_fun_(11)};            
                document.querySelector("#cards_list_id").appendChild(tag);

                tag = document.createElement("input");
                tag.type = "button";
                tag.className="waves-effect waves-light btn";
                tag.value = "my12";
                tag.id = "myBtn12";
                //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
                tag.onclick =function () { send_card_fun_(12)};            
                document.querySelector("#cards_list_id").appendChild(tag);

                tag = document.createElement("input");
                tag.type = "button";
                tag.className="waves-effect waves-light btn";
                tag.value = "my13";
                tag.id = "myBtn13";
                //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
                tag.onclick =function () { send_card_fun_(13)};            
                document.querySelector("#cards_list_id").appendChild(tag);

            //End card list section

            tag = document.createElement("br");
            document.querySelector("#room").appendChild(tag);
            /*
            // list of khal
            tag = document.createElement("div");
            tag.id = "hokm_card_list";
            tag.className="hokm_card_list";
            document.querySelector("#room").appendChild(tag);
            var name_khal= ["pik","del","khesht","gishniz"];
            var khal=["♤","♥️","♢","♧"];

            //end of list khal
            for(i=0;i<4;i++){
                tag = document.createElement("input");
                tag.type = "button";
                tag.value = khal[i];
                tag.id = name_khal[i];
                tag.className=name_khal[i]+ "waves-effect waves-light btn";
                switch(i){
                case 0:
                    tag.onclick =function () {hokm_card_select_fun("pik")};
                break;
                case 1:
                    tag.onclick =function () {hokm_card_select_fun("del")};
                break;
                case 2:
                    tag.onclick =function () {hokm_card_select_fun("khesht")};
                break;
                case 3:
                    tag.onclick =function () {hokm_card_select_fun("gishniz")};
                break;
                }//end switch
                
                document.querySelector("#hokm_card_list").appendChild(tag);
            }//end for

            //End list of khal
            */
            tag = document.createElement("br");
            document.querySelector("#room").appendChild(tag);

            //win hands section
            tag = document.createElement("div");
            tag.id = "Whin_hand";
            tag.className="Whin_hand";
            document.querySelector("#room").appendChild(tag);

            tag = document.createElement("p");
            var txt = "Hands win";
            tag.innerHTML =txt ;
            document.querySelector("#Whin_hand").appendChild(tag);

            var id=["hokmIs","myHandsPoint","","otherTeamHandsPoint"];
            var value=["","0","-","0"];
            for(i=0;i<4;i++)
            {
                tag = document.createElement("h4");
                tag.id = id[i];
                tag.className=id[i];
                txt=value[i];
                tag.innerHTML =txt ;
                document.querySelector("#Whin_hand").appendChild(tag);
            }//end for
            //end win hand section
            tag = document.createElement("br");
            document.querySelector("#room").appendChild(tag);

            //chat section
            tag = document.createElement("div");
            tag.id = "chat";
            tag.className="chat";
            document.querySelector("#room").appendChild(tag);


            tag = document.createElement("h4");
            var txt = "Messages";
            tag.innerHTML =txt ;
            document.querySelector("#chat").appendChild(tag);

            my_form=document.createElement('form');
            my_form.name='form';
            my_form.id="form"
            

            tag=document.createElement('input');
            tag.type='TEXT';
            tag.name='input';
            tag.value='';
            tag.id="input";
            my_form.appendChild(tag);

            tag=document.createElement('INPUT');
            tag.type='button';
            tag.value='Send';
            tag.id="sendId";
            tag.onclick =function () {send_message_fun()};
            my_form.appendChild(tag);
            document.querySelector("#chat").appendChild(my_form);


            tag=document.createElement('INPUT');
            tag.type='button';
            tag.value='Ready';
            tag.id="ReadyId";
            tag.onclick =function () {fun_user_ready()};
            my_form.appendChild(tag);
            document.querySelector("#chat").appendChild(my_form);
            
            tag=document.createElement('INPUT');
            tag.type='button';
            tag.value='Seat 1';
            tag.id="Seat1";
            tag.onclick =function () {fun_user_seat(1)};
            my_form.appendChild(tag);
            document.querySelector("#chat").appendChild(my_form);

            tag=document.createElement('INPUT');
            tag.type='button';
            tag.value='Seat 2';
            tag.id="Seat2";
            tag.onclick =function () {fun_user_seat(2)};
            my_form.appendChild(tag);
            document.querySelector("#chat").appendChild(my_form);

            tag=document.createElement('INPUT');
            tag.type='button';
            tag.value='Seat 3';
            tag.id="Seat3";
            tag.onclick =function () {fun_user_seat(3)};
            my_form.appendChild(tag);
            document.querySelector("#chat").appendChild(my_form);

            tag=document.createElement('INPUT');
            tag.type='button';
            tag.value='Seat 4';
            tag.id="Seat4";
            tag.onclick =function () {fun_user_seat(4)};
            my_form.appendChild(tag);
            document.querySelector("#chat").appendChild(my_form);
            
            //chat section
            tag = document.createElement("div");
            tag.id = "messages";
            tag.className="messages";
            document.querySelector("#chat").appendChild(tag);               

            //end chat section


            // تمام کارت ها را مخفی می کند
        hidden_cards_fun();
        hokm_card_show_fun(false); // مخفی کردن ورق های حکم برای نمایش



        


        }// end if


    }//end function hide_room_fun


    // نمایش عدم نمایش اتاق بازی
    function fun_mange_room(handler,player_count)
    {
        //console.log('fun_mange_room' ,handler);
                // اگر ترو بود المان های اتاق را نمایش نده 
        if (handler==true){
            var myNode = document.getElementById("room");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            myNode = document.getElementById("body");
            document.getElementById('room').remove();
            
        
        }
        // اگر فالس بود المان های اتاق را نمایش بود
        if (handler==false)
        {
          const userAgent = window.navigator.userAgent;
          playerCount = localStorage.getItem(`roomPlayer`) ;
           // gameStartPub=1;
            document.getElementById("content").className +='container';
            document.getElementById('content').innerHTML =`
            <div class="row" >
            </br>
        </div>
        <!-- teams Section -->
        <div id="teams-section" class="">
            <!-- Team A Section -->
            <div id="team-a-waitingPage" class="row card-room  col s12" >
                <div onclick="fun_seat_(1)"   id="user-seat-1"   class="z-depth-1 user-seat-ui-lobby-1 white-text indigo darken-3 col l6 m6 s6 ${playerCount==2 ?` w-100`:``}">
                    <div class="left l3" id="image-user-witingPage">  
                            <a   class="" id="user-seat-profile-1" href="#"  style="border: 0; background: transparent">
                                <img   class="circle responsive-img user-img" id="user-seat-image-1"  src="../img/user.png"  width="60" alt=""> 
                            </a>
                    </div>
                <div class=" l9 center" >
                    <h6 id="user-seat-status-1"> <i class="material-icons"></i> ${trans('Free Seat')} </h6>
                    </div>                
                </div> 
                ${playerCount==2 ?'':`<div onclick="fun_seat_(3)" id="user-seat-3" class="z-depth-1 user-seat-ui-lobby-2 white-text indigo darken-3 col l6 m6 s6"> <div class="right l3" id="image-user-witingPage"> <a class="" id="user-seat-profile-3" href="#" style="border: 0; background: transparent"> <img class="circle responsive-img user-img" id="user-seat-image-3" src="../img/user.png" width="60" alt=""> </a> </div> <div class=" l9 center" > <h6 id="user-seat-status-3"> <i class="material-icons"></i> ${trans('Free Seat')} </h6> </div> </div> `}
                </div>
            <!-- Team B Section -->
            <div id="team-b-waitingPage card-panel  " class="row card-room  col s12">
                <div onclick="fun_seat_(2)"   id="user-seat-2"    class="z-depth-1 user-seat-ui-lobby-3 orange accent-3 col l6 m6 s6 ${playerCount==2 ?` w-100`:``}">
                      <div class="left l3" id="image-user-witingPage ">
                            <a class="" id="user-seat-profile-2" href="#"  style="border: 0; background: transparent">
                                    <img   class="circle responsive-img user-img" id="user-seat-image-2"  src="../img/user.png"  width="60" alt=""> 
                            </a>
                      </div>
                      <div class="l9 center">
                        <h6 id="user-seat-status-2"> <i class="material-icons"></i> ${trans('Free Seat')} </h6>
                      </div>
                </div>

                ${playerCount==2 ? ``:` <div onclick="fun_seat_(4)" id="user-seat-4" class="z-depth-1 user-seat-ui-lobby-4 orange accent-3 col l6 m6 s6 user-seat-ui-lobby-4"> <div class="right l3" id="image-user-witingPage"> <a class="" id="user-seat-profile-4" href="#" style="border: 0; background: transparent"> <img class="circle responsive-img user-img" id="user-seat-image-4" src="../img/user.png" width="60" alt=""> </a> </div> <div class="l9 center"> <h6 id="user-seat-status-4"> <i class="material-icons"></i>${trans('Free Seat')} </h6> </div> </div>`}

             </div>
        </div>
        <!-- ready Section -->
        </br>
        
        <div class="row center " id="ready-section">
            <div id="buttons-room" class="row col l12 m12 s12">
              <a class="waves-effect waves-light z-depth-3 btn   blue-grey darken-1 ${userAgent.lastIndexOf('iPhone')!=-1 ? 'disabled' : ''}" href="#share-modal" style="border: 0; background: transparent">
              <i class="material-icons left">share</i>${trans('Invite')}
               </a>
                <a class=" btn red darken-4 white-text modal-trigger" href="#modal-3crads">${trans('Win Coins')}</a>
                <a class=" btn  brown darken-1 white-text modal-trigger" href="#modal-leaveOut">${trans('Exit')}</a>
            </div>
        </div>

    
        <!-- Chat Section -->
        <div id="chat-section " class="row ">

            <div id="message-area" style="overflow-y: scroll; height:120px;" class=" col l12 m12 s12  green lighten-5 ">
            </br>
            </div>  

            <div id="send-message" class="row col l11 m11 s10">
                <input  id="message-text" class=" black-text" type="text" >
            </div>
                <div class="col l1 m1 s2">
                <a onclick='send_message_fun()' class=" btn orange lighten-2"><i class="material-icons center">send</i></a>
                </div>
            </div>
        </div>
        

        </div>
        <!-- Ads Section -->
        <div  id="ads-section "class=" row  " >
    
        <div id='afscontainer1'></div>

        </div> <!-- ENd Ads Section -->
        
            `
            // تمام کارت ها را مخفی می کند
        //hidden_cards_fun();
    // hokm_card_show_fun(false); // مخفی کردن ورق های حکم برای نمایش



        


        }// end if


    }//end function mange_room_fun

    function fun_leaveOut(){
    
      localStorage.removeItem('inviteRoomId');
      button_Seat=0;
      localStorage.setItem('sid','0');      
      roomPub.send({ mAzzA63: `leave`});
      mySeat=0; document.getElementById('content').innerHTML = preloader();
  
    }

    function send_message_fun ()
    {
 
    

        // send message to room on submit
        
        console.log("press");
        // e.preventDefault();

        const text = document.getElementById("message-text").value;
        document.getElementById("message-text").value ='';
        // send data to room
        //input.value
        roomPub.send({ message: text });

        // clear input
    //  input.value = "";
        
    }// end function send_message_fun

    function auth_user(){
        //console.log('auth user:'+ localStorage.getItem("id"));
        roomPub.send({ mAzzA63: '0011:'+ localStorage.getItem("id")+'' });
    }
    function fun_hokm_is_on(val){
        roomPub.send({ mAzzA63:`mc${(val*13)}`  });
        fun_hokm_is(val);
    }
    function getDataonMessage(message) 
    {
            messageCount +=1;
            !enCoin ? message=0:0;
            console.log('messageFromServer:', message ,messageCount);
            
            //3mAzzA63:
            localStorage.setItem('sid',roomPub.sessionId);
            localStorage.getItem('id').lastIndexOf('guest-')>-1 || !localStorage.getItem('id') ?  fun_redicet_login() : 0;
            const t= typeof message;
            let king=0;
            messageCount==6 ? roomPub.send( {act:'daily',uid:localStorage.getItem('id')} ) :0;
            
            if(t===('object')){ 
                
                //console.log('object run');
                if(message.meta=='userProfileM'){
                  console.log(message);
                    // اطلاعات مدال ها و هدایا برای نمایش در مودال 
                    //user_medals : message.user_medals.Medal
                    //user_gifts :  message.user_gifts.gift_status(send , recive) || message.user_gifts.giftId
                        fun_show_gift_modal(message.gifts);
                        //fun_show_medal_modal(message.medals);
                    
                    //<i class="orange lighten-3" id="icon-modal-profile">🎁</i>
                    //console.log('>>>>>>>>>>>>>>>>>list',message) 
                }else if(message.meta=='seat'){
                    mySeat=message.no;
                }else if(message.meta=='Error'){
                  
                    switch (message.error){
                        case 'coin':
                        localStorage.getItem('id').lastIndexOf('guest-')==-1 ? fun_show_message_user_need_coin (message.coin) :0;
                        enCoin=false;
                        break;
                        case 'close':
                            document.getElementById('content').innerHTML=`<div class="row"><br>
                            <div class="col s12">
                              <div class="card deep-orange darken-4" onClick="fun_reload()">
                                <div class="card-content white-text">
                                  <span class="card-title"> <i class="Medium material-icons">⛔</i></span>
                                  <br><p>${trans(message.m)}</p>
                                  <br><p>${trans('Please Try Again')}</p>
                                </div>
                 
                              </div>
                            </div>
                          </div>`;
                        break;
                        
                    }
                    gtag('event', 'meta_Error');  
                  //  {meta:'Error' ,error:'coin', coin:gameplay[kei].coin}
                  //console.log(`lobby must lock `); // زمانی لابی قفل شود که جای برای نشستن نباشد یا کاربر سکه کافی نداشته باشد
                }else if(message.meta=='sendGift'){
                    //console.log('>>>>>>>>>>>>>>>>>sendGift',message) 
                    fun_show_send_gift_to_user(message);
                }else if(message.meta=='permission'){
                    count_time_user_send==0 ?   fun_check_user_permission(message.permission) :0;
                }else if(message.meta=='king'){
                  state_room='room';
                    alret('you are king');
                    king = 1
                }else if(message.meta=='setKing'){
                  
                    if(!isIntheRoom){
                      isIntheRoom=true;
                     
                      document.getElementById(`countdown-number-1`).style.visibility = 'hidden'; 
                      document.getElementById(`countdown-number-2`).style.visibility = 'hidden'; 
                      document.getElementById(`countdown-number-3`).style.visibility = 'hidden'; 
                      document.getElementById(`countdown-number-4`).style.visibility = 'hidden';
                      console.log('[998877] is in the room');
                       setInterval(function(){
                        //  console.log('message 999');
                          roomPub.send({ mAzzA63: 78999});
                        }, 2000); 
                    }
                    hokm_is =0
                    gameStartPub=2;
                    //const sid = localStorage.getItem('sid');
                    //console.log(`king set[ ${message.king}] my sid [${mySeat}]`)
                    king=  fun_set_king_crown(message.king);
                    
                }else if(message.meta=='cards'){
                    gameStartPub=2
                    //console.log(`[789] gameStartPub: ${gameStartPub}`);
                    myCards=[0];
                    myCards=message.cards;
                    //console.log(`[789] cards`,myCards);
                    if(message.hakem==0){
                        //console.log('king is not');
                        
                        fun_lock_user_player(1,0);
                        for(let i=0 ; i<13 ; i++ ){
                            
                            document.getElementById(`card-desk-${(i+1)}`).src=`/img/cards/Card_back.svg`;
                
                        }//end for
                    }else if(message.hakem==1){
                        //console.log('[789]king , this user message.hakem==1');
                        fun_show_hand_to_single_player(1,myCards);
                    }else{
                        //console.log(`[789] card no message.hakem==${message.hakem}`);
                        fun_show_hand_to_single_player(9,myCards);
                    }
                    
                }else if(message.meta=='hukm'){
                    //console.log(`[789] card no message.meta=='hukm'`,message);
                    if(message.hukm>0)
                    {
                        fun_show_hand_to_single_player(0,myCards);
                        fun_hokm_is(message.hukm);
                    }
                }else if((message.to==mySeat || message.to==99 ) && message.meta=='playerState'){
                    //console.log(`[789] playerState ${message.state} `)
                    setTimeout(function(){
                        
                        fun_lock_user_player(message.state,message.new);
                        message.state? 0: play_event_turn();
                    },1000);
     
                }else if(message.meta=='cardOfPlayer'){
                  
                    //console.log(`player[${message.player}] card[${message.card}] , sid[${message.sid}]`);

                    if(message.sid != localStorage.getItem('sid')){

                        setTimeout(function(){
                              // روی کارت مورد نظر ست کن
                              const cardImg = fun_card_image_name(message.card);     
                              const id=`#card-desk-played-${fun_next_turn_set_logo(message.player,mySeat)}` ;
                              let classCard =document.querySelector('#card-desk-played-1').className;
                              classCard = classCard.length >39 ?  classCard.slice(0,39) : classCard;            
                              document.querySelector(id).src=cardImg;
                              play_event_card();        
                        },950);
                          
                    }

                }else if(message.meta=='turn' && message.turn==0 && message.to==mySeat ){
                    
                    countDownNo(1);
                    iplayed=true;
                  /*   setTimeout(function(){
                      console.log('[7899]TIme is up',iplayed);
                      if (iplayed){
                        fun_lock_user_player(true);
                        roomPub.send({mAzzA63:'mcTimeIsupCard'});
                      }
                    },90000); */
                    //به کاربر اعلام شود نوبت تو هست
                }else if(message.meta=='event'){

                  if(message.state=='lobby' || state_room==='lobby'){
                    //console.log('[789] lobby')
                    state_room=message.state;
                    fun_mange_room(false);
                    fun_object_message(message.users);
                    //console.log('[789] after lobby')
                    fun_show_message_full_screen_refresh();
                   // setTimeout(function(){ location.reload(true); }, 3000);
                   //location.reload(true);
                    }
                    if(message.state=='room' ){
                        state_room=message.state;
                        gtag('event', '_room_create');     
                        //room
                        console.log(`=================================>`,message);
                        usersPlayer=message.users;
                        document.getElementById('content').innerHTML = preloader_content();
                        //console.log(`===============> timeout run new`);
                        fun_create_room_hukm();

                        
                
                      
                    }
                   console.log(message.event , message.event=='lock');
                    switch(message.event){
                      
                      case 'CleanDesk':
                            //{meta:'event',event:'CleanDesk'}
                            fun_clean_desk();
                            cleanDesk=1;
                            break;
                        case 'handFinish':
                            
                            //{meta:'event', event:'handFinish'}
                              document.getElementById('hand-no').innerHTML=`0-0`;
                              roomPub.send({ mAzzA63: 77});
                              gtag('event', 'handFinish');
                            break;  
                            case 'gameFinish':
                                mySeat=0;
                                localStorage.setItem('sid','0');
                                localStorage.setItem('inviteRoomId','0');
                                localStorage.setItem('coin',(Number(localStorage.getItem('coin'))-message.coin));
                              //inviteRoomId
                              //meta:`event`,event:`gameFinish`result:`loose `,exp:3 , coin:0
                              //console.log(`game is finished:[${message.result}] earn coin[${message.coin}] , get exp[${message.exp}] `);
                              gameResult_online(message.result,message.exp,message.coin);
                              result ==='win' ?play_event_win() :play_event_loose();
                              gtag('event', 'gameFinish'); 
                            break;          
                            case 'gameFinishR':
                              
                              //roomPub.leave();
                              console.log(`[gameFinishR]`,message);
                              //this.broadcast({to:`all`,meta:`event`,event:`gameFinishR`,winner:2,expw:10,expl:2,coinw:coinsw,coinl:coinsl})
                              const myteam = mySeat==1 || mySeat==3 ? 1 :2 ;
                              const result = message.winner == myteam ? 'win' : 'loose' ;
                              const exp = result ==='win' ? message.expw : message.expl;
                              const coin = result ==='win' ? message.coinw : message.coinl;
                              const coinAddUI = result ==='win' ?  (Math.round(message.coinl - ((message.coinl/100)*7)))*-1 : message.coinl;
                             // console.log(`[gameFinishR]`,coinAddUI);
                              localStorage.setItem('sid','0');
                              localStorage.removeItem('inviteRoomId');
                              localStorage.setItem('coin',(Number(localStorage.getItem('coin'))+(coinAddUI)));
                              login_user_ui();
                            //inviteRoomId
                            //meta:`event`,event:`gameFinish`result:`loose `,exp:3 , coin:0
                            //console.log(`game is finished:[${message.result}] earn coin[${message.coin}] , get exp[${message.exp}] `);
                            gameResult_online(result,exp,coin);
                            result ==='win' ?play_event_win() :play_event_loose();
                            mySeat=0;
                            gtag('event', 'gameFinishR');
                            break;          
                            case 'timeIsupCardServer':
                              //console.log('[789]',message);
                              roomPub.send({mAzzA63:'recived'});
                             const i = message.card ;
                          
                              document.querySelector('#card-'+i).innerHTML='';
                            break;
                            case 'CleanCard':
                            const classvalue = screen.width>1390 && screen.width<3500 ? "myCard-deck-large" : "myCard-deck";
                            for(let i=1;i<14;i++){ 
                                document.getElementById(`card-${i}`).innerHTML='';
                                
                                document.getElementById(`card-${i}`).innerHTML = `      
                                <button class="game-card-button" id='btn-card-${i}'  type="submit" onclick="send_card_fun_(1,${i})">
                                    <img id='card-desk-${i}' src="/img/cards/0.svg" class="${classvalue}" alt="submit" >
                                </button>`;
                            }
                            //meta:'event' ,event:'gameFinish', game:'hukm',team1:gameplay[kei].hand1,team2:gameplay[kei].hand2
                        break;
                        case '3cardsRoomWin':
                          //console.log(`[event] 3cardsRoomWin`);
                          function_show_result_3cards(4,message.no);                            
                          localStorage.setItem('coin',message.coin);
                          login_user_ui();
                          gtag('event', '3cardsRoomWin');
                        break;
                        case '3cardsRoomLoose':
                            //console.log(`[event] 3cardsRoomLoose`);
                            function_show_result_3cards(1,message.no);
                            localStorage.setItem('coin',message.coin);
                            login_user_ui();
                            gtag('event', '3cardsRoomLoose');
                        break;
                        case 'coin':
                            localStorage.setItem('coin',message.coin);
                            login_user_ui();
                        break;
                        case 'sendgift':
                            message.result ==='filed' ?  M.toast({html: `${trans('Gift not sent!')} `, classes:' blue darken-1'}):0;
                            gtag('event', 'sendGift');
                        break;
                        case 'close':
                            localStorage.setItem('sid','0');
                            localStorage.setItem('inviteRoomId','0');
                            //console.log('room Closed');
                            document.getElementById('content').innerHTML=`<div class="row"><br>
                            <div class="col s12" onClick='fun_reload()'>
                              <div class="card deep-orange darken-4">
                                <div class="card-content white-text">
                                  <span class="card-title"> <i class="Medium material-icons">block</i></span>
                                  <br><p>${trans('Room Closed')} 😔</p>
                                  <br><p>${trans('Tap here to going to previous section')} </p>
                                </div>
                 
                              </div>
                            </div>
                          </div>`;
                          gtag('event', 'room_close_event');
                        break;
                        case 'leave':    
                        gtag('event', 'leave_event');                      
                          location.reload(true);

                        break;
                        case 'kikout':
                          setTimeout(function(){ M.toast({html: `<div><h5> ${trans('You kick out by room manger')} <h5> </div>`, classes:' black'})},3000);
                        break;
                        case 'dailyCoin':
                          //console.log('["dailyCoin"]',state_room)
                          if(state_room.lastIndexOf('lobby')!=-1){
                                //console.log('["dailyCoin"]',state_room==='lobby' )
                            fun_daily_coin();
                          }
                          gtag('event', 'dailyCoin');
                        break;
                        case 'Win400Coin':
                          M.toast({html: `${trans("You Find Joker and Receive400💰")}`, classes:'yellow accent-2 black-text'});
                          coin = Number(localStorage.getItem('coin'));
                          coin +=400;
                          localStorage.setItem('coin',coin);
                          login_user_ui();
                          gtag('event', 'Win400Coin');
                        break;
                        case 'Win40Coin':
                          M.toast({html: `${trans("You didn't find Joker But you Receive40💰")}`, classes:'yellow accent-2 black-text'});
                          coin = Number(localStorage.getItem('coin'));
                          coin +=40;
                          localStorage.setItem('coin',coin);
                          login_user_ui();
                          gtag('event', 'Win40Coin');
                        break;
                        case 'cheat':
                          fun_confirm_cheat_partner(message.no);
                          gtag('event', 'cheat');
                        break;
                        case 'cheatAlret':
                          M.toast({html: `${trans("Cheat investigation is happened and new hand start.")}`, classes:'red accent-2 white-text' ,displayLength:10000});
                          gtag('event', 'cheatAlret');
                        break;
                        case 'readyActive':
                          console.log('[debug]88 readyActive');
                          document.getElementById("ImReadyButton") ? document.getElementById("ImReadyButton").classList.remove("disabled") :0;
                          gtag('event', 'readyActive');
                        break;
                        case 'readyDeActive':
                         
                          document.getElementById("ImReadyButton") ?   document.getElementById("ImReadyButton").className +=` disabled  ` :'';
                          gtag('event', 'readyDeActive');
                        break;
                        case 'lock':
                          console.log(`[999] lock`);
                          fun_lock_card_user(true,0);
                        break;
                        case 'seat':                          
                          fun_seat_data(message.user);    
                          gtag('event', 'seat');                    
                        break;
                        case 'join':                          
                           usersPlayer=message.user;                  
                           state_room=message.state;
                           //console.log(message)
                           state_room!=='room' ? fun_seat_data(message.user):0;      
                           gtag('event', 'join');                  
                        break;
                        case  'kik':
                          fun_show_message_box_eject_by_room_manger(message.no);
                          fun_stand_up_server(message.no)
                        break;
                        case 'room-4':                          
                          Number(localStorage.getItem('roomPlayer'))!=4 ? localStorage.setItem('roomPlayer',7) :0;
                          if(Number(localStorage.getItem('roomPlayer'))==7) 
                          { 
                            localStorage.setItem('roomPlayer',4)
                            location.reload(true);
                          }
                        break;
                        case 'room-2':
                          Number(localStorage.getItem('roomPlayer'))!=2 ? localStorage.setItem('roomPlayer',7) :0;
                          if(Number(localStorage.getItem('roomPlayer'))==7) 
                          { 
                            localStorage.setItem('roomPlayer',2)
                            location.reload(true);
                          }
                        break;
                        
                    }
       

                }else if(message.meta=='point'){
                    //{meta:`point`,team1:gameplay[kei].point1,team2:gameplay[kei].point2}
                    document.getElementById('hand-no').innerHTML=` <span class='indigo-text text-darken-3'>${message.team1}</span>-<span class='orange-text text-accent-3'>${message.team2}</span> `;
                }else if(message.meta=='hand'){
                    document.getElementById('point-no').innerHTML=` <span class='indigo-text text-darken-3'>${message.team1}</span>-<span class='orange-text text-accent-3'>${message.team2}</span> `;
                }else if(message.meta=='turn' && message.turn!=0){
                  
                    //console.log(`[seat] turn user : message.turn :[${message.turn}] , myseat:[${mySeat}]`);
                    const t = playerCount == 4 ? fun_next_turn_set_logo(message.turn,mySeat ) :message.turn ;
                    fun_set_turn_logo(t);
                    countDownNo(t);
                }else if(message.meta=='update'){
                      console.log(message);
                      for(u of message.user){
                        console.log(u)
                        if(localStorage.getItem('sid')==u.sid){
                          mySeat=u.seat;
                          console.log(`>>>>>>>>>>>>${mySeat}`)
                        }
                      }
                   //   cons cards =message.card
 
                      localStorage.setItem('dc','true');
                      console.log(`[789] update`);
                      usersPlayer=message.user;      
                      playerCount = localStorage.getItem('roomPlayer');
                      console.log(`playerCount[${playerCount}]`)          
                      fun_create_room_hukm();
                      myCards=message.cards;
                      fun_show_hand_to_single_player(9,myCards);
                      fun_hokm_is(message.hukm);
                      fun_set_king_crown(message.king);
                      document.getElementById('hand-no').innerHTML=` <span class='indigo-text text-darken-3'>${message.teamp1}</span>-<span class='orange-text text-accent-3'>${message.teamp2}</span> `;
                      document.getElementById('point-no').innerHTML=` <span class='indigo-text text-darken-3'>${message.teamh1}</span>-<span class='orange-text text-accent-3'>${message.teamh2}</span> `;
                      

                      const t = Number(localStorage.getItem('roomPlayer')) == 4 ? fun_next_turn_set_logo(message.turn,mySeat ) :message.turn ;
                      fun_set_turn_logo(t);
                      console.log('user 2',typeof message.cp2=='number');
                        for(let i=1 ;i<5 ;i++){
                            
                            if(i==1 && (typeof message.cp1=='number') && message.cp1!=0 ){                          
                                const cardImg = fun_card_image_name(message.cp1);     
                                const id=`#card-desk-played-${fun_next_turn_set_logo(i,mySeat)}` ;
                                let classCard =document.querySelector('#card-desk-played-1').className;
                                classCard = classCard.length >39 ?  classCard.slice(0,39) : classCard;            
                                document.querySelector(id).src=cardImg;
                            }else if(i==2 && (typeof message.cp2=='number') && message.cp2!=0){
                              
                              const cardImg = fun_card_image_name(message.cp2);     
                              const id=`#card-desk-played-${fun_next_turn_set_logo(i,mySeat)}` ;
                              let classCard =document.querySelector('#card-desk-played-1').className;
                              classCard = classCard.length >39 ?  classCard.slice(0,39) : classCard;            
                              document.querySelector(id).src=cardImg;
                            }else if(i==3 && (typeof message.cp3=='number') && message.cp3!=0){
                              const cardImg = fun_card_image_name(message.cp3);     
                              const id=`#card-desk-played-${fun_next_turn_set_logo(i,mySeat)}` ;
                              let classCard =document.querySelector('#card-desk-played-1').className;
                              classCard = classCard.length >39 ?  classCard.slice(0,39) : classCard;            
                              document.querySelector(id).src=cardImg;
                            }else if(i==4 && (typeof message.cp4=='number') && message.cp4!=0){
                              const cardImg = fun_card_image_name(message.cp4);     
                              const id=`#card-desk-played-${fun_next_turn_set_logo(i,mySeat)}` ;
                              let classCard =document.querySelector('#card-desk-played-1').className;
                              classCard = classCard.length >39 ?  classCard.slice(0,39) : classCard;            
                              document.querySelector(id).src=cardImg;
                            }
                        }
                      
                        
               
                  mySeat==message.turn ?  fun_lock_card_user(false,0):0;
                    console.log(message);
                  console.log( '==>>>>>>>end update')
                }else{
                    // اطلاعات کاربران که درلابی هستند را دریافت می کند
                    fun_object_message(message);
                }
                
            }else{
            let mAzzA63=-1 ;
            let mAzzA65=-1 ;
            let mAzzA67=-1;
            
                if(t==='string'){
                //console.log(`3mAzzA63`,message.indexOf('3mAzzA63:'))
                //console.log(`3mAzzA67`,message.indexOf('3mAzzA67:'))
                //console.log(`3mAzzA65`,message.indexOf('3mAzzA67:'))
                //987
                message.lastIndexOf('3mAzzA70:') !== -1 ? localStorage.setItem('gid',message.substr(9)) :0; 
                //message.lastIndexOf('3mAzzA70:') !== -1 ?console.log(`gid ${message.substr(9)}`) :0; 
                mAzzA63 =  message.indexOf('3mAzzA63:');
                mAzzA65 =  message.indexOf('3mAzzA65:');
                mAzzA67 = message.indexOf('3mAzzA67:');
                    if (message.indexOf('3mAzzA') ==-1 && message.indexOf('undefined') ==-1 ){
                        //console.log('message from user: ' + message.message + '|' , message , typeof message);
                        var p = document.createElement("p");
                        const m =message.slice ((message.indexOf(') ')+1),message.length );
                        const user = get_user_info_by_id( message.slice(1,message.indexOf(')')) );
                        //get_user_info_by_id( message.slice(1,message.indexOf(')')) ) get user info name , sid image ...
                        //console.log(`info of user `,user );
                        //show_profile(get_user_info_by_id(message.slice ((message.indexOf(') ')+1))).sid)
                    //  p.innerHTML = `<a onClick="show_profile('${user.sid}')">${user.name}</a>: ${m}`;
                       // console.log(`788[${m}]`)
                        p.innerHTML =  user.name!=="AI" ? `<a onClick="show_profile('${user.sid}')">${user.name}</a>: <span class="black-text">${m}</span>` : `<a onClick="#"> 🔔</a>:<span class=" indigo-text text-darken-4" id="server-message"> ${trans(m)}</span>`
                        const sid = message.slice (1,message.indexOf(')') );
                        if (p.innerHTML){
                          //789
                          document.querySelector("#message-area").appendChild(p);     
                          //state_room=='room'? M.toast({html: `<div>${p} </div>`, classes:' black'}):0;
                          state_room.lastIndexOf('lobby')!=-1 ? M.toast({html: `<div>${p.innerHTML} </div>`, classes:' grey lighten-2'}) :0;

                        }

                        var textarea = document.getElementById('message-area');
                          textarea.scrollTop = textarea.scrollHeight;
                
                
                    }else{
                            //console.log(`'message from server' ${message.indexOf('3mAzzA')}`,message);
                            // پیام را برای کنترل بازی می فرستد تا تصمیم بگیرد کد ارسال شده توسط سیستم یعنی چی
                            mAzzA63!==-1 ?  gameControl(message.substr(mAzzA63+9)) :0;                        
                            mAzzA67!==-1 ? users_(message.substr(mAzzA67+9)):0;
                        
                                if(mAzzA65!==-1){
                                        //console.log(`a user Stand Up ${message.substr(mAzzA65+9)}`);
                                        message.substr(mAzzA65+9)==="seat1free" ? fun_stand_up_server(1) :0;
                                        message.substr(mAzzA65+9)==="seat2free" ? fun_stand_up_server(2) :0;
                                        message.substr(mAzzA65+9)==="seat3free" ? fun_stand_up_server(3) :0;
                                        message.substr(mAzzA65+9)==="seat4free" ? fun_stand_up_server(4) :0;
                                        message.indexOf('manage:Remove')!=-1 ? fun_show_message_box_eject_by_room_manger(message.charAt((message.length-1))):0;
                                        message.indexOf('Serv1free')!=-1 ? fun_stand_up_server(1) :0;
                                        message.indexOf('Serv2free')!=-1 ? fun_stand_up_server(2) :0;
                                        message.indexOf('Serv3free')!=-1 ? fun_stand_up_server(3) :0;
                                        message.indexOf('Serv4free')!=-1 ? fun_stand_up_server(4) :0;
                                        //fun_stand_up(4,true)
                                    
                                }//end if
                            //}
                            
                    }//end else
                } //end if t==='string'      
            }//end else
            //اگر مقدار بالا در پیام بود تشخیص می دهد پیام مخصوص برنامه است
        
    }//end function


    function fun_clean_desk(){
        setTimeout(function(){hide_cards_desk()},1300);
        
    }
    function fun_redicet_login(){
      //console.log('fun_redicet_login');
      document.getElementById('content').innerHTML=`
      <div class="row">
      <div class="col s12 m6">
        <div class="card orange darken-1">
          <div class="card-content white-text">
            <span class="card-title">Login Error</span>
            <p>You are not login</p>
          </div>
          <div class="card-action">
            <a href="/pages/login.html">Login</a>
           
          </div>
        </div>
      </div>
    </div>
      `;
    }
    // کاربر از اتاق خارج می شود و به او می گوید سکه کافی برای بازی در این اتاق نداری
    function fun_show_message_user_need_coin(no){
      roomPub.send
        document.getElementById('content').innerHTML = `
        <div class="message-box-over z-index: 9999;"> <div class="container col l6 s10  row " id="container" onClick='fun_side_menu_go("earn-coin")'><div class="end-game z-depth-2 yellow accent-3 grey-text  col l6 s12" id="game-message-box">  <div class="row" id="end-game-box-first-row"> <div class="col l4 s4 m4 xl4"></div> <div class="col l4 s4 m4 xl4 z-depth-1" id="game-message-box-head"> <h3 class="center" id="end-game-box-medal-logo">💰<h3> </div> <div class="col l4 s4 m4 xl4 "></div>  </div>  <div class="row" id="end-game-box-second-row"> <div class="col s12 l12 m12 xl12"><h2 class="center red-text " id="end-game-box-title"></h2>  </div>  </div>  <div  class="row" id="end-game-box-third-row"> <div class="center col s12 m12 l12 xl12" ><div class="center col s12 m12 l12 xl12 z-depth-1" id="game-message-box-M">  <h2 class="center" id="game-message-box-des" onClick='fun_side_menu_go("earn-coin")'>🤖 <span id="end-game-box-point-box-coin-nuumber">${trans(`You don't have enough Coin for playing in this room, Tap here to earn Coin.`)} </br> ${trans('Required Coin for this room')}:${no}</span></h2></div><div class="center col s10 m10 l10 xl10 z-depth-1 " id="end-game-box-point-box-title-box" > <h6 class="center" id="game-message-box-down-box-me"><span id="end-game-box-point-box-exp-nuumber">🤷</span></h6></div></div></div>  <div class="row" id="end-game-box-fourth-row">  </div> </div>  <a onClick='fun_side_menu_go("earn-coin")' ><div class="center col s3 m3 l3  xl3 z-depth-2" id="end-game-box-back-loby"> <div class=" material-icons " id="end-game-box-loby-back-icon"> close  </div> </div>  </a> </div> </div>`;

    }

    function fun_reload(){
   
      document.getElementById('body').innerHTML=preloader_content();
     
      location.reload(true);
    }

    function fun_set_king_crown(no){
    
        console.log(`king :fun_set_king_crown` ,no)
        let is_king=0;
        //king and turn
        if(no != mySeat){                                   
                
                    //console.log(`king :fun_set_king_crown :  king sid[${no}] } `)
                    switch(mySeat){                    
                        case 1:
                            is_king = no
                            break;
                        case 2:
                            no ==2 ? is_king=1:0;
                            no ==3 ? is_king=2:0;
                            no ==4 ? is_king=3:0;
                            no ==1 ? is_king=4:0;
                            break;
                        case 3:
                            no ==3 ? is_king=1:0;
                            no ==4 ? is_king=2:0;
                            no ==1 ? is_king=3:0;
                            no ==2 ? is_king=4:0;
                            break;
                        case 4:
                            no ==4 ? is_king=1:0;                 
                            no ==1 ? is_king=2:0;
                            no ==2 ? is_king=3:0;
                            no ==3 ? is_king=4:0;
                            break;
                    }                    
        }else{
        
            is_king=1;
        
        }
        if(playerCount==2){
          is_king = no==mySeat ? 1 :3
        }
        console.log(`king : fun_set_king_crown :seat king[${is_king}] , my[${mySeat}] `);
        fun_set_king_logo(is_king)
        fun_set_turn_logo(is_king)
        return is_king;
    }


    function fun_next_turn_set_logo(no,mySeat){
    //   console.log(`[seat]fun_next_turn_set_logo  no[${no}] myseat[${mySeat}]`);
        //let king:numer;

        // let mySeat=0;
            let rtrn=0 ;
                
            switch(mySeat){                    
                case 1:
                    rtrn = no
                    break;
                case 2:
                    // no ==1 ? rtrn=4 : rtrn =no-1;
                    no ==2 ? rtrn=1:0;
                    no ==3 ? rtrn=2:0;
                    no ==4 ? rtrn=3:0;
                    no ==1 ? rtrn=4:0;
                    break;
                case 3:
                
                    no ==3 ? rtrn=1:0;
                    no ==4 ? rtrn=2:0;
                    no ==1 ? rtrn=3:0;
                    no ==2 ? rtrn=4:0;
                    break;
                case 4:
                    //  no== 1 ? rtrn=4 : rtrn =no-1;
                    no ==4 ? rtrn=1:0;
                    no ==1 ? rtrn=2:0;
                    no ==2 ? rtrn=3:0;
                    no ==3 ? rtrn=4:0;
                    break;
            } 
            //console.log(`[seat] fun_next_turn_set_logo  mySeat[${mySeat}]  seat[${rtrn}]`);
            return rtrn;
    }

    //مشخص کردن مدیر اتاق
    function fun_check_user_permission(value){
      count_time_user_send +=1;
        if(value=='roomMnager'){
            //console.log('roomMnager');
            const b = `<a class="waves-effect waves-light  btn  deep-orange accent-4" id="eject-user-btn" href="#eject-user" style="border: 0; background: transparent">
            <i class="material-icons">eject</i>
            </a>`
            //user-mange
            document.getElementById('user-mange').innerHTML +=b;
        }

    }

    function fun_show_message_box_eject_by_room_manger(value){

        var p = document.createElement("p")
        p.innerHTML = `🔔:  ${trans('Room manger kicked the player on seat No.')} ${value} `;
        document.querySelector("#message-area").appendChild(p);
    }


    function fun_show_gift_modal(gifts){
        //console.log(`gifts`,gifts);
        var giftRecive='' ;
        var giftSend='';
        for(gift of gifts){
            //console.log(gift);
            if (gift.gift_status=='send'){
            //  console.log('send',gift.giftId)
            giftRecive+=`<div class="col s3 m2 l2 xl1 icon-modal"><i class="orange lighten-3" id="icon-modal-profile">${gift.giftId}</i> </div>`;
            }
            if (gift.gift_status=='recive'){
            //    console.log(`recive`,gift.giftId)
                giftSend +=`<div class="col s3 m2 l2 xl1 icon-modal"><i class="orange lighten-3" id="icon-modal-profile">${gift.giftId}</i> </div>`;
            }
        }
        //<i class="orange lighten-3" id="icon-modal-profile">🎁</i>
        // /gift-list-send'
        document.getElementById('gift-list-send').innerHTML = `<div class="row">${giftSend}</div>`;
        document.getElementById('gift-list-re').innerHTML = `<div class="row">${giftRecive}</div>`;
    }

    function fun_show_medal_modal(medals){
        //console.log(`medals`,medals);

        let medaled='';
        for(let m of medals){
            medaled +=`<div class="col s3 m2 l2 xl1 icon-modal"><i class="blue lighten-3" id="icon-modal-profile">${m.medal}</i> </div>`;
    
        }
        //<i class="orange lighten-3" id="icon-modal-profile">🎁</i>
        // /gift-list-send'
        document.getElementById('medal-list').innerHTML = `<div class="row">${medaled}</div>`;
        
    }
    // کاربران را پارسینگ می کند برای وضعیت نشستن یا بینده بودن
    function fun_object_message(obj){
        //console.log('function fun_object_message')
        //console.log('fun_object_message',obj,typeof obj);
    /*         if(obj.meta=='listOfUserInLobby'){
                console.log('users in lobby');
                usersPlayer=obj.send_user_in_lobby;
                console.log(`usersPlayer`,usersPlayer);
                for(let player in usersPlayer){
                    console.log(`1212 player name ${usersPlayer[player].name} sid[${usersPlayer[player].sid} ] seat number ${usersPlayer[player].seat}`)
                    usersPlayer[player].seat!==0 ? console.log(`sid[${usersPlayer[player].id}] seat number [${usersPlayer[player].seat}]`) :0;
                    usersPlayer[player].seat!==0 ? fun_seat(usersPlayer[player].seat,7,usersPlayer[player]):console.log('not seat user',usersPlayer[player].sid);
                }
            } */
         /*    if(obj.meta=='list'){
                //console.log(obj)
            } */
        /*     if(obj[0].seat !=-1){
            obj ? usersPlayer = obj:0;
            for(let player in usersPlayer){
                //console.log(`player name ${usersPlayer[player].name} sid[${usersPlayer[player].sid} ] seat number ${usersPlayer[player].seat}`)
           // usersPlayer[player].seat!==0 ? console.log(`player name ${usersPlayer[player].name} seat number ${usersPlayer[player].seat}`) :0;
            usersPlayer[player].seat!==0 ? fun_seat(usersPlayer[player].seat,7,usersPlayer[player]):0;
            usersPlayer[player].type==='manger' && usersPlayer[player].sid===roomPub.sessionId && count_time_user_send==0 ? fun_check_user_permission(`roomMnager`) :0;
           
            }
        }  */
        
    }
    function users_(s){
    
        const seat = s.slice(s.indexOf(`:`),s.indexOf(';'));
        const session = s.slice((s.indexOf(';')+1),s.length);

        //console.log(`session ${session} seat on ch ${seat} `);
        for(let player in usersPlayer){
            //console.log(`player name ${usersPlayer[player].name} seat number ${usersPlayer[player].seat}`)
        if( usersPlayer[player].seat==0 && usersPlayer[player].sid==session )
            {
                fun_seat(seat,7,usersPlayer[player]);
                usersPlayer[player].seat==seat;
            }
        }
    }

    // نمایش اتاق انتظار
    function fun_show_w8_room(check)
    {
        //7891
    //اگر صحیح بود نمایش بده
    if(check){
        let content = document.querySelector('#content');
        let temp =`
        <div id="waiting-room" class="">
            </br>
            <input type="button" value="w8" id="Rooms-button" onclick="funfunfun()">
            
            <div id="listOfRoom">
            </div>
        </div>
        `;
        content.innerHTML =temp;
    }
    // اگر منفی بود پاک کن
    else{
        deleteChild("content");
    }

    }
// نشستن کاربر
function fun_user_seat(handler){
//console.log(`user seat on ${handler}`);

roomPub.send({ mAzzA63: `6${handler}`});
}
// اعلام آمادگی
    function fun_user_ready(handler){
    //console.log(`user Ready ${handler}`);
    roomPub.send({ mAzzA63: `66`});
    }
// بلند شدن کاربر از خود جایگاه
    function fun_user_stand_up(){
        //console.log('fun user Stand Up');
        roomPub.send({ mAzzA63: `65`});
    }


    function fun_user_ready(){
        //console.log('fun user Stand Up');
        roomPub.send({ mAzzA63: `66`});
    }

    function getAvailableListRooms(){
        //console.log('getAll');
       let cr= document.getElementById('card-rooms');
       const classNam =[`indigo lighten-5`,`deep-purple lighten-5`,`blue lighten-5`,`red lighten-5`,`lime lighten-5`,`orange lighten-5`,`grey lighten-5`];
       while (cr.firstChild) {
        //console.log(cr.firstChild);
         cr.removeChild(cr.firstChild);
         //console.log(cr.firstChild);
         const cl = classNam[Math.floor(Math.random() * 6)];
        /*  document.getElementById('body').className=cl;
         document.getElementById('content').className=cl; */
       }

        let content = document.querySelector('#card-rooms');
        document.getElementById('card-rooms').innerHTML=`
        
        <div class="preloader" id="preloader">
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
        var temp =`<div class="row sidenav-trigger center" data-target="side-form">
        <div class="col s12">
          <div class="card orange accent-4">
            <div class="card-content white-text">
              <span class="card-title">${trans('Public Room not Found')}</span>
              <p>${trans('Create your own')} 😎</p>
            </div>

          </div>
        </div>
      </div>`;
      let state=0;
        //console.log(client , 'client');
    /*     client.getAvailableRooms("chat").then(rooms => {
            rooms.forEach((room) => {
            console.log(room.roomId);
            console.log(room.clients);
            console.log(room.maxClients);
            console.log(room.metadata);
            console.log(room.metadata.name);
            });
        }).catch(e => {
            console.error(e);
        }); */
    client.getAvailableRooms("chat").then(rooms => {
            rooms.forEach((room) => {
            if (!room.metadata.privacy && (room.metadata.name !=undefined || room.metadata.name !=='undefined') ){
                    
                    let icon_user ='';
                    let gameName ='';
                    let hands ='';
                    let gameType = trans('Standard');
                    let player_count =0
                    if(room.metadata.game_type>10000 && room.metadata.game_type<20000 ){
                      // بازی حکم
                      gameName=trans('Hokm');
                      if(room.metadata.game_type>16999){
                        hands=7;
                        player_count = room.metadata.game_type >17299 ? 4 : 2;
                      }else if(room.metadata.game_type>14999){
                        hands=5;
                        player_count = room.metadata.game_type >15299 ? 4 : 2;
                      
                      }else if(room.metadata.game_type>12999){
                      hands=3;
                      player_count = room.metadata.game_type >13299 ? 4 : 2;
                      }
                    switch (room.clients){
                        case 1:
                            icon_user= player_count==4 ?'person person_outline person_outline person_outline' : 'person person_outline' ;
                            break;
                        case 2:
                            icon_user= player_count==4 ?'person person person_outline person_outline' : 'person person' ;
                            break;
                        case 3:
                            icon_user='person person person  person_outline';
                            break;
                        case 4:
                            icon_user='person person person person';
                            break;
                    }
                    //console.log(`icons ${icon_user} client  ${room.clients}`);
                    //console.log(`name ${room.metadata.name}  game type  ${room.metadata.game_type}  room id ${room.roomId} point ${room.metadata.point}`);
             
                 
                      
                    }
                    if(state==0){
                        temp =`
                        <div class="card-panel card-room   red darken-4 accent-3 white-text  row" id="assfsaf5544" onclick="fun_room_join('${room.roomId}',${player_count})">
                        <img src="/img/logo.png" alt="card-room thumb">
                        <div class="card-room-details">
                        <div class="card-room-title">${room.metadata.name}</div>
                        <div class="card-room-ingredients">
                          <span>💰${room.metadata.point} | <span> 
                          <span>${trans('Game')}:<b>${gameName}</b> | <span> 
                          <span>${trans('Hands')}:<b>${hands}</b> | <span>                          
                          <span>${trans('Player')}:<b>${player_count}</b><span>                          
                        </div>
                            </div>
                                <div class="card-room-person">
                                    <i class="material-icons">${icon_user}</i>
                                </div>
                            </div>
                        `;
                        state =1;
                    }else{
                    temp +=`
                    <div class="card-panel card-room   red darken-4 accent-3 white-text  row" id="assfsaf5544" onclick="fun_room_join('${room.roomId}',${player_count})">
                    <img src="/img/logo.png" alt="card-room thumb">
                    <div class="card-room-details">
                    <div class="card-room-title">${room.metadata.name}</div>
                    <div class="card-room-ingredients">
                      <span>💰${room.metadata.point} | <span> 
                      <span>${trans('Game')}:<b>${gameName}</b> | <span> 
                      <span>${trans('Hands')}:<b>${hands}</b> | <span>   
                      <span>${trans('Player')}:<b>${player_count}</b> <span>  
                    </div>
                        </div>
                            <div class="card-room-person">
                                <i class="material-icons">${icon_user}</i>
                            </div>
                        </div>
                    `;}
            }
            //console.log(content);

            
            //console.log(room.metadata);
            //console.log(room.roomId);
            //console.log(room.clients);
            //console.log(room.maxClients);
            
            });//end for each

        }).then(()=>{
          /* 
          <a class="btn-floating  btn-large add-btn sidenav-trigger" data-target="side-form">
        <i class="material-icons">add</i>
      </a>
          */
        if (temp==='notfound'){
            //console.log('notfound run');
            document.getElementById('card-rooms').innerHTML=`<div class="row sidenav-trigger" data-target="side-form">
            <div class="col s12">
              <div class="card orange accent-4">
                <div class="card-content white-text">
                  <span class="card-title">${trans('Public Room not Found')}</span>
                  <p>${trans('Create your own')} 😎</p>
                </div>

              </div>
            </div>
          </div>`;
          state=0;
        }else{
          document.getElementById('card-rooms').innerHTML='';
          document.getElementById('card-rooms').innerHTML=temp;
          state=0;
        }
        }).catch(e => {
            //console.error(e);
        }); 

    }

/// به اتاق می تواند وارد شود که ای دی آن را دارد
    function fun_room_join(roomId,check){
        document.getElementById('content').innerHTML =preloader_content();
        //console.log(`[789] room id ${roomId} check ${check}`);
        client.joinById(roomId ,{id:localStorage.getItem('id'),cid:localStorage.getItem('cid')}).then(room => {
            roomPub = room;
            //console.log(client);
           // check==0?  auth_user():roomPub.send({ mAzzA63:`gld${localStorage.getItem('id')}` });
           // auth_user();
            localStorage.setItem('sid',room.sessionId);
            localStorage.setItem('inviteRoomId',roomId);
            localStorage.setItem('dc','false');
            //console.log("joined successfully", room);
            
            deleteChild("content");
                    // تابع ویتینگ روم را صدا می زند
            // کاربر به قسمت انتظار و اعلام آمدگی ارسال می شود
            // fun_Waiting_room(true);
            check!=1? fun_loby(true,check):0;
            //789 دو تابع زیر تابع های قدیمی هستند
            // وقتی کاربر اتاق را ساخت صفحه فرم اطلاعات اتاق مخفی می شود و روم نمایش داده می شود
            //  form_create_room_fun(true);

                // listen to patches coming from the server
                room.onMessage(function(message) {
                    //console.log('test');
                //  //console.log(message);
                    getDataonMessage(message);
                    //  getDataonMessage(message);
                });
                localStorage.getItem('dc')==='false'?  room.send({ mAzzA63: `gld${localStorage.getItem('id')}`}):0;



        
            }).catch(e => {
            //console.error("join error", e);
            M.toast({html: trans("Room not found"), displayLength:3500, classes: 'red darken-1 '});
            
        });
        
    }

 //end function fun_friend_request
    function fun_eject_user(no ) // کاربر را از اتاق اخراج می کند
    {
        //1 57  2 58 3 59 4 60
    //console.log("تابع اخراج کاربر توسط مدیر");
    roomPub.send({ mAzzA63: `${no+56}`});
    } //end function fun_eject_user
    function get_user_info_by_id(id){
       // id==='AI' ? return 'AI' :0;
        //console.log(`user789999 id [${id}]`)
        //console.log('usersPlayer',usersPlayer);
        let r ={};
        for(let k in usersPlayer){
           //console.log(usersPlayer[k].sid , 'user789999');
          if( usersPlayer[k].sid.lastIndexOf(id)>-1 )
            {
               r=usersPlayer[k];
               break;
            }
        }
 
       if (id.indexOf('server')!=-1 )
       {
        //console.log(`user info AIIIIII`)
           r ={name:'AI'};
       }
      //  console.log(`user info ${r.name}`)
        return r;
    }

   function get_detials_user_info(id){
       //console.log(`user session id:[${id}]`);
       sid_modal=id;
       if(id!='guest'){
            roomPub.send({ get: `${id}`});
       }else{
        set_detials_uset_info_lobby('guest');
       }
   }

   function send_gift_to_user(gift){
    roomPub.send({ giftSend: `${gift}:${sid_modal}`});
    M.toast({html: `${gift} ${trans('Sent.')} `, classes:' blue darken-1'})
   }


   function fun_friend_request( ) // در خواست دوستی برای کاربر ارسال می کند
    {
        if(localStorage.getItem("id").indexOf("guest-")!=-1){
            roomPub.send({ FriendRequest: `${sid_modal}`});
            M.toast({html: `${trans('Friend Request sent.')} `, classes:' blue darken-1'});
            
        }else{
            M.toast({html: `${trans('Please Login')} `, classes:' red darken-1'})
        }
}


    function fun_show_send_gift_to_user(m){
        //console.log(`'fun_show_send_gift_to_user' sender:[${m.sender}] reciver:[${m.reciver}]`);
        let from ;
        let reciv;
        for(let k in usersPlayer){
            
            if( usersPlayer[k].sid==m.reciver.trim() )
            {
               
                //console.log('Receiveis done')
               reciv=usersPlayer[k].name;
            }
           if( usersPlayer[k].sid==m.sender.trim() )
             {
                from=usersPlayer[k].name;
             }
         }
         m.reciver = m.reciver.replace(' ','');
         m.sender = m.sender.replace(' ','');
         //console.log(`gift from[${from}] to[${reciv}]`)
         var p = document.createElement("p")
         p.innerHTML = `🔔: <a onclick="show_profile('${m.sender}')">${from}</a> ${trans('Send To')}  <a onclick="show_profile('${m.reciver}')">${reciv}</a> ${m.gift}`;
         document.querySelector("#message-area").appendChild(p);
         M.toast({html: `<div><h5> <a onclick="show_profile('${m.sender}')">${from}</a> ${trans('Send To')}  <a onclick="show_profile('${m.reciver}')">${reciv}</a>  ${m.gift}  <h5> </div>`, classes:' black'});
    }

   function set_detials_uset_info_lobby(user){
    //console.log('set_detials_uset_info_lobby',user);
    if(typeof user=='object'){
        const friends_list =                 
        `
            <div class="row">  
                      
            </div>                                           
        `;

      //  document.querySelector('#friend-list').innerHTML = friends_list;
        document.querySelector('#gift-list-send').innerHTML = friends_list;
        document.querySelector('#gift-list-re').innerHTML = friends_list;
        document.querySelector('#medal-list').innerHTML = friends_list;

    }else{
        
        //friend-list'
        const friends_list =                 
        `
            <div class="row">  
                      
            </div>                                           
        `;
        //gift-list-send
        //gift-list-re
        //medal-list
     //   document.querySelector('#friend-list').innerHTML = friends_list;
        document.querySelector('#gift-list-send').innerHTML = friends_list;
        document.querySelector('#gift-list-re').innerHTML = friends_list;
        document.querySelector('#medal-list').innerHTML = friends_list;
    }

   }

   // نمایش صفحه پایان بازی 
   function gameResult_online(status,expr,coin){
    const logobox  = status == 'win' ? '🏅' : '💤';
    const title    = status ==='win' ? trans('You Win!') : trans('You Loose!');
    const message  = status ==='win' ? trans('You played awesome.') : trans('Try to win.');
    const colorbox = status ==='win' ? 'teal lighten-5' : 'grey lighten-1'
    document.getElementById(`content`).innerHTML =` <div class=".show-on-large col l3 s1 " algin="center" id="box-left">
      </div>
      <div class="container col l6 s10  row " id="container">
              <div class="end-game z-depth-2 ${colorbox}  grey-text  col l6 s12" id="end-game-box">
                <div class="row" id="end-game-box-first-row">
                  <div class="col l4 s4 m4 xl4"></div>
                  <div class="col l4 s4 m4 xl4 z-depth-1" id="end-game-box-medal">
                  <h3 class="center" id="end-game-box-medal-logo">${logobox}<h3>
                  </div>
                  <div class="col l4 s4 m4 xl4 "></div>
                </div>
                <div class="row" id="end-game-box-second-row">
                  <div class="col s12 l12 m12 xl12">
                    <h2 class="center red-text " id="end-game-box-title">${trans(title)}</h2>
                    <p class="center  grey-text text-darken-3" id="end-game-box-message" >${trans(message)}  </p>
                  </div>
                </div>
                <div  class="row" id="end-game-box-third-row">
                    <div class="center col s2 m3 l3 xl3">
                    </div>
                    <div class="center col s8 m6 l6 xl6" >
                      <div class="center col s12 m12 l12 xl12 z-depth-1" id="end-game-box-point-box">
                        <h4 class="center" id="end-game-box-point-box-coin">💰 <span id="end-game-box-point-box-coin-nuumber">${coin}</span> </h4>
                      </div>
                      <div class="center col s10 m10 l10 xl10 z-depth-1 " id="end-game-box-point-box-title-box">
                          <h6 class="center" id="end-game-box-point-box-title-box-ex">Experience : <span id="end-game-box-point-box-exp-nuumber">${expr}</span></h6>
                      </div>
                      <a href="/pages/earn-coin.html">
                        <div class="center col s3 m3 l3  xl3 z-depth-2" id="end-game-box-point-box-bg-add-coin">
                          <div class=" material-icons " id="end-game-box-point-box-add-coin"> 
                          add
                          </div>
                        </div>
                      </a>
                      <a href="#share-modal">
                        <div class="center col s3 m3 l3  xl3 z-depth-2" id="end-game-box-point-box-bg-share-coin">
                          <div class=" material-icons " id="end-game-box-point-box-share-coin"> 
                            share
                          </div>
                      </a>
                      </div>
                    </div>
                    <div class="center col s2 m3 l3 xl3">
                    
                    </div>
                </div>
                <div class="row" id="end-game-box-fourth-row">
                </div>
            </div>
            <a onClick='play_again()' >
              <div class="center col s3 m3 l3  xl3 z-depth-2" id="end-game-box-back-loby">
                  <div class=" material-icons " id="end-game-box-loby-back-icon"> 
                    replay
                  </div>
              </div>
            </a>
            
      </div>
      <div class="footer ads"> <img src="https://lh4.ggpht.com/AY4Oim9f4-HfEA278OdvrgGrWrlPjtI9hZ7e8-ANDQKbC1RTq0txQfydLV48I4F4-qZAV9TN=w180"> </div>
      <div class=".show-on-large col l3 s1" id="box-right-down">
      </div>
    `;

  }//end gameResult_online


  function play_again (){
    deleteChild("content");
    fun_loby(true)
  }
/* function fun_seat(handler,check ,player)(
    console.log("joined successfully", handler);
    ) */
// recconection section start
// اتصال دوباره
async function fun_recconection(){
   
    //console.log(`[789]reconnect room id ${localStorage.getItem('inviteRoomId')} user id: ${localStorage.getItem('sid')}`);
    
    if(localStorage.getItem('inviteRoomId')){
        client = new Colyseus.Client(location.protocol.replace("http", "ws") + host + (location.port ? ':' + location.port : ''));
        /* roomPub= await client.join(localStorage.getItem('inviteRoomId'));
        console.log(`roomPub`,roomPub); */
        //console.log(`[789]gameStartPub ${gameStartPub}`)
        gameStartPub<2 ?   fun_room_join(localStorage.getItem('inviteRoomId'),0) : fun_room_join(localStorage.getItem('inviteRoomId'),1);
        //console.log(`[789]reconnect room id ${localStorage.getItem('inviteRoomId')} user id: ${localStorage.getItem('sid')}`);
        const m = localStorage.getItem('id');
        
        //console.log(`[789]${m}`);

    }
}
    

let is_dc=false;
window.addEventListener('offline', function(e) {
    // مقدار تگ content
    // در یک متغییر ریخته شود
    // و به کاربر پیامی نمایش دهد که اینترنت قطع شد
    // باید به کاربر پیامی نمایش دهد که شما به اینترنت وصل نیستید
    myCards =[0];
    //console.log('=======================================>>>>>>>>>>>>>>>>>>>offline',myCards); 
     let content = document.querySelector('#content');
        let temp = `<div id="overlay-page" >
        <div id="overlay-page-text">${trans('Disconnected')} 😟</div>
      </div>`;
      //this.console.log(temp);
      content.innerHTML +=temp ; // محتوای زمان قطعی به کاربر نمایش

      //change header
      content=document.querySelector('#statusGame'); 
      temp='🛑';
      content.innerHTML =temp ;
      is_dc=true;
      
    });

window.addEventListener('online', function(e) { 
    //console.log('online',gameStartPub); 
    
    document.getElementById('overlay-page').remove();

          //change header
         let content=document.querySelector('#statusGame'); 
         const temp='online';
          content.innerHTML =temp ;
    // ببررسی شود که اگر 
    // کاربر در اتاق بازی بود
    // موارد اتاق بازی برای او چک شود 
    // به اتاق بازی دوباره باز گردد و اطلاعات را از زمان قطعی از کاربر بگیرد
    // درغیر اینصورت آخرین محتوا به کاربر نمایش داده شود
        if(is_dc){ 
            //console.log('user reconnected');
            document.getElementById('content').innerHTML =  preloader_content();
       
           is_dc=false;
           fun_recconection();
        }
     //   serverReconnect();
        
    

});

function play_again(){
    //roomPub.send({ mAzzA63:`gld${localStorage.getItem('id')}` });
    //window.open(`/pages/play.html`,"_self");
    location.reload(true);
    document.getElementById(content).innerHTML=preloader_content();
}

function preloader_content(){
    const r=`
    <div class="preloader" id="preloader">
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
    return r;
}

// recconection section end

// تابع بازی سه کارت
function fun_three_cards_play(num)
{ 

 roomPub.send( {act:'3cards',select:num} );

}//end function fun_three_cards_play
function fun_three_cards_daily_play(num)
{ 
  // کارت روزانه
    //console.log(`dailyCoinPlayed`,num)
 let r=( Math.floor(Math.random() * 3)+ 1 == num ) ? 4 : num;


 //id="cards3play-card3"
roomPub.send( {act:'dailyCoinPlayed',select:num,uid:localStorage.getItem('id')} );
const elem = document.getElementById('modal-3crads');
const instance = M.Modal.init(elem, {dismissible: false});
instance.close();
document.getElementById('3crads-title').innerHTML=trans('Find Joker card and Win');
document.getElementById('3crads-Des').innerHTML=trans('Pay 10, win 30');
document.getElementById('3cards-row').innerHTML=`
<button type="submit"  
class=" col l4 s4" 
id="cards3Button1"
onclick="fun_three_cards_play(1)"  
style="border: 0; background: transparent" >
  <img src="../img/cards/Card_back.svg" alt=""  class="cards3play z-depth-2" id="cards3play-card1">
</button>
<button type="submit"  
class=" col l4 s4" 
id="cards3Button1"
onclick="fun_three_cards_play(1)"  
style="border: 0; background: transparent" >
  <img src="../img/cards/Card_back.svg" alt=""  class="cards3play z-depth-2" id="cards3play-card1">
</button>
<button type="submit"  
class=" col l4 s4" 
id="cards3Button1"
onclick="fun_three_cards_play(1)"  
style="border: 0; background: transparent" >
  <img src="../img/cards/Card_back.svg" alt=""  class="cards3play z-depth-2" id="cards3play-card1">
</button>
`;

}//end function fun_three_cards_play



function fun_create_room_hukm(){
    console.log('[789] fun_create_room_hukm');
    let player1 ={};
    let player2 = {};
    let player3 ={};
    let player4 ={};
    let seat=0;
    let colorteam1 ='';
    let colorteam2 ='';
    for(let k in usersPlayer){
      console.log(usersPlayer[k] , '[789]');
      if( usersPlayer[k].sid===localStorage.getItem('sid') )
        {
            switch(usersPlayer[k].seat){
              case 1:
                player1=usersPlayer[k];
                seat=1;
              break;
              case 2:
                player1=usersPlayer[k];
                seat=2;
              break;
              case 3:
                player1=usersPlayer[k];
                seat=3;
              break;
              case 4:
                player1=usersPlayer[k];
                seat=4;              
              break;
            }
            break;
        }
     }//end for
     if (seat!=0){
      for(let k in usersPlayer){
        if(seat==1 && usersPlayer[k].sid!=localStorage.getItem('sid')){
          playerCount == 2 &&  usersPlayer[k].seat==2 ? player3 =usersPlayer[k] : '';
          usersPlayer[k].seat == 2 ? player2 =usersPlayer[k]:0;
          usersPlayer[k].seat == 3 ? player3 =usersPlayer[k]:0;
          usersPlayer[k].seat == 4 ? player4 =usersPlayer[k]:0;
          colorteam1 ='color-boarder-team1';
          colorteam2 ='color-boarder-team2';
        }
        if(seat==2 && usersPlayer[k].sid!=localStorage.getItem('sid')){
          playerCount == 2 &&  usersPlayer[k].seat==1 ? player3 =usersPlayer[k] : '';
          usersPlayer[k].seat == 3 ? player2 =usersPlayer[k]:0;
          usersPlayer[k].seat == 4 ? player3 =usersPlayer[k]:0;
          usersPlayer[k].seat == 1 ? player4 =usersPlayer[k]:0;
          colorteam2 ='color-boarder-team1';
          colorteam1 ='color-boarder-team2';
        }
        if(seat==3 && usersPlayer[k].sid!=localStorage.getItem('sid')){
          usersPlayer[k].seat == 4 ? player2 =usersPlayer[k]:0;
          usersPlayer[k].seat == 1 ? player3 =usersPlayer[k]:0;
          usersPlayer[k].seat == 2 ? player4 =usersPlayer[k]:0;
          colorteam1 ='color-boarder-team1';
          colorteam2 ='color-boarder-team2';
        }
        if(seat==4 && usersPlayer[k].sid!=localStorage.getItem('sid')){
          usersPlayer[k].seat == 1 ? player2 =usersPlayer[k]:0;
          usersPlayer[k].seat == 2 ? player3 =usersPlayer[k]:0;
          usersPlayer[k].seat == 3 ? player4 =usersPlayer[k]:0;
          colorteam2 ='color-boarder-team1';
          colorteam1 ='color-boarder-team2';
        }
      }//end for
          //console.log(`player1`,player1);
          //console.log(`player2`,player2);
          //console.log(`player3`,player3);
          //console.log(`player4`,player4);
     }
      // yes
    //   roomPub.send({ message: '3mAzzA63:mc31' });
       
       g_c='start';
       document.getElementById("body").className='bg-game';
       document.getElementById("content").className='content row';
       document.querySelector('#content').innerHTML =`
       <div class=".show-on-large col l2 " algin="center" id="box-left">
       </div>
       <div class="col l8  " id="container">
     
               <div class="desk grey-text  col l12">
                  <!-- <div class="ads header"> <img src="https://lh5.ggpht.com/XJZJYLBAMMyyV3e0oY1jTiBxmA17G4BI_2KLG3MlEsVFUjHBBB1VHy1SgCd9gWwbZnlitH3T=w234"> </div> -->
                   <div class="row row-first-deck" id="row-1">
                       <div class="col s3 m3 l3 xl3 center" id="row-1-col-1">
                       <h5 id="hokm-show" class="white"> s</h5> 
                       </div>
                       <div class="col s2 m2 l2 xl2 center" id="row-1-col-2">
                         
                       </div>
                       <div class="col s2 m2 l2 xl2 center king-container" id="player-seat-3">
                        <img src="${player3.image==="d" || player3.image==="undefined" || player3.image==undefined  ? '/img/logo/joker_00.jpg' :player3.image}" alt="${player3.name}" onerror="this.onerror=null;this.src='https://jokeret.com/img/logo/joker_00.jpg';" class=" image-profile-deck circle ${ playerCount==4 ? colorteam1 : colorteam2 }" onclick="show_profile('${player3.sid}')">
                       
                         
                         <div class="countdown center" id="countdown-3">
                          <div class="countdown" id="countdown-number-3"></div>
                         </div>
                         <div class="king-logo" id="king-player-seat-3"></div>
                         <div class="turn-logo" id="turn-player-3"></div>
                       </div>

                       <div class="col s1 m2 l2 xl2 center" id="row-1-col-4"></div>
                       <div class="col s4 m3 l3 xl3 center" id="row-1-col-5">    
                       <div id="table-points-hands">
                           <div id="row-point" class="black-text"><span id="points"> ${trans('Points')}: </span><span id='hand-no'>0-0 </span> </div>
                           <div id="row-point" class="black-text"><span id="hands"> ${trans('Hands')}: </span> <span id='point-no'>0-0 </span> </div>
                         </div></div>
                   </div>    
                   
                   
                   <div class="row row-second-deck king-container" id="row-3">
                       <div class="col s2 m2 l2 xl2 " id="row-3-col-left">
                         ${ playerCount==4 ? `<img src="${player2.image==="d" || player2.image==="undefined" || player2.image==undefined   ? '/img/logo/joker_00.jpg' :player2.image}" onerror="this.onerror=null;this.src='https://jokeret.com/img/logo/joker_00.jpg';" alt="${player2.name}" class=" circle image-profile-deck  ${colorteam2}" onclick="show_profile('${player2.sid}')">`: ''}
                         <div class="countdown center" id="countdown-2">
                          <div class="countdown" id="countdown-number-2"></div>
                         </div>                                            
                         <div class="king-logo" id="king-player-seat-2"></div>
                         <div class="turn-logo" id="turn-player-2"></div>
                       </div>
   
                       <div class="col s8 m8 l8 xl8 center" id="desk-card">                          
   
                             <!-- اگر اسکرین بزرگ بود کلاس نیم card-deck-large بجای بدون لارج اضافه شود-->
                             <img src="/img/cards/0.svg" id="card-desk-played-2" alt="submit" width="65px" class="responsive-img card-desk-played-2 crdpl">
                             <img src="/img/cards/0.svg" id="card-desk-played-3" alt="submit" width="65px" class="responsive-img card-desk-played-3 crdpl">
                             <img src="/img/cards/0.svg" id="card-desk-played-1" alt="submit" width="65px" class="responsive-img card-desk-played-1 crdpl ">
                             <img src="/img/cards/0.svg" id="card-desk-played-4" alt="submit" width="65px" class="responsive-img card-desk-played-4 crdpl">
                             
                       </div>
                       <div class="col s2 m2 l2 xl2 king-" id="row-3-col-right">
                       ${ playerCount==4 ? `<img src="${player4.image==="d" || player4.image==="undefined" || player4.image==undefined   ? '/img/logo/joker_00.jpg' :player4.image}" onerror="this.onerror=null;this.src='https://jokeret.com/img/logo/joker_00.jpg';" alt="${player4.name}" class="  image-profile-deck circle  ${colorteam2}" onclick="show_profile('${player4.sid}')">` :``}
                         <div class="countdown center" id="countdown-4">
                          <div class="countdown" id="countdown-number-4"></div>
                         </div>
                       <div class="king-logo" id="king-player-seat-4"></div>
                       <div class="turn-logo" id="turn-player-4"></div>
                     </div>
                   </div>
                   <div class="row row-fourth-deck" id="row-1">
                       <div class="col s3 m3 l3 xl3 center" id="row-1-col-1"> </div>
                       <div class="col s2 m2 l2 xl2 center" id="row-1-col-2">
                       </div>
                       <div class="col s2 m2 l2 xl2 center king-container" id="player1-seat">
                         <img src="${player1.image==="d" || player1.image==="undefined"  || player1.image==undefined ? '/img/logo/joker_00.jpg' :player1.image}" onerror="this.onerror=null;this.src='https://jokeret.com/img/logo/joker_00.jpg';" alt="${player1.name}" class=" image-profile-deck circle  ${colorteam1}" onclick="show_profile('${player1.sid}')">
                         <div class="countdown center" id="countdown-1">
                          <div class="countdown" id="countdown-number-1"></div>
                         </div>
                         <div class="king-logo" id="king-player-seat-1"></div>
                         <div class="turn-logo" id="turn-player-1"></div>
                       </div>
                       <div class="col s2 m2 l2 xl2 center" id="row-1-col-4"></div>
                       <div class="col s3 m3 l3 xl3 center" id="row-1-col-5"></div>
                   </div>    
                   <div class="row-cardplayer-deck col l12" id="cardsplayer">
                     <div class="row center row-cards-1 " id="row-5">
                           <div class="col s1 m1 l1 xl1 cards" id="card-1">
                             <button class="game-card-button" id='btn-card-1'  type="submit" onclick="send_card_fun_(1,1)">
                                 <img id='card-desk-1' src="/img/cards/0.svg" class="myCard-deck" alt="submit" >
                             </button>
                           </div>
                           <div class="col s1 m1 l1 xl1 cards" id="card-2">
                             <button class="game-card-button" id='btn-card-2'  type="submit" onclick="send_card_fun_(1,2)">
                                 <img id='card-desk-2' src="/img/cards/0.svg" class="myCard-deck" alt="submit" >
                             </button>
                           </div>
                           <div class="col s1 m1 l1 xl1 cards" id="card-3">
                             <button class="game-card-button" id='btn-card-3'  type="submit" onclick="send_card_fun_(1,3)">
                                 <img id='card-desk-3' src="/img/cards/0.svg" class="myCard-deck" alt="submit" >
                             </button>
                           </div>
                           <div class="col s1 m1 l1 xl1 cards" id="card-4">
                             <button class="game-card-button" id='btn-card-4'   type="submit" onclick="send_card_fun_(1,4)">
                                 <img id='card-desk-4' src="/img/cards/0.svg" class="myCard-deck" alt="submit" >
                             </button>
                           </div>
                           <div class="col s1 m1 l1 xl1 cards" id="card-5">
                             <button class="game-card-button" id='btn-card-5'  type="submit" onclick="send_card_fun_(1,5)">
                                 <img id='card-desk-5' src="/img/cards/0.svg" class="myCard-deck" alt="submit" >
                             </button>
                           </div>
                           <div class="col s1 m1 l1 xl1 cards" id="card-6">
                             <button class="game-card-button" id='btn-card-6'  type="submit" onclick="send_card_fun_(1,6)">
                                 <img id='card-desk-6' src="/img/cards/0.svg" class="myCard-deck" alt="submit" >
                             </button>
                           </div>
                     </div>
                     <div class=" row center row-cards-2 " id="row-6">
                           <div class="col s1 m1 l1 xl1 cards" id="card-7">
                             <button class="game-card-button" id='btn-card-7'  type="submit" onclick="send_card_fun_(1,7)">
                                 <img id='card-desk-7' src="/img/cards/0.svg" class="myCard-deck" alt="submit" >
                             </button>
                           </div>
                           <div class="col s1 m1 l1 xl1 cards" id="card-8">
                             <button class="game-card-button" id='btn-card-8'  type="submit" onclick="send_card_fun_(1,8)">
                                 <img id='card-desk-8' src="/img/cards/0.svg" class="myCard-deck" alt="submit" >
                             </button>
                           </div>
                           <div class="col s1 m1 l1 xl1 cards" id="card-9">
                             <button class="game-card-button" id='btn-card-9'  type="submit" onclick="send_card_fun_(1,9)">
                                 <img id='card-desk-9' src="/img/cards/0.svg" class="myCard-deck" alt="submit" >
                             </button>
                           </div>
             
                           <div class="col s1 m1 l1 xl1 cards" id="card-10">
                             <button class="game-card-button" id='btn-card-10'  type="submit" onclick="send_card_fun_(1,10)">
                                 <img id='card-desk-10' src="/img/cards/0.svg" class="myCard-deck" alt="submit" >
                             </button>
                           </div>
                           <div class="col s1 m1 l1 xl1 cards" id="card-11">
                             <button class="game-card-button" id='btn-card-11'  type="submit" onclick="send_card_fun_(1,11)">
                                 <img id='card-desk-11' src="/img/cards/0.svg" class="myCard-deck" alt="submit" >
                             </button>
                           </div>
                           <div class="col s1 m1 l1 xl1 cards" id="card-12">
                             <button class="game-card-button" id='btn-card-12'  type="submit" onclick="send_card_fun_(1,12)">
                                 <img id='card-desk-12' src="/img/cards/0.svg" class="myCard-deck" alt="submit" >
                             </button>
                           </div>
                           <div class="col s1 m1 l1 xl1 cards" id="card-13">
                             <button class="game-card-button"  id='btn-card-13' type="submit" onclick="send_card_fun_(1,13)">
                                 <img id='card-desk-13' src="/img/cards/0.svg" class="myCard-deck" alt="submit" >
                             </button>
                           </div>
                     </div>
                     <div class='row-chat-deck'>
                   
                     <div class="fixed-action-btn click-to-toggle ">
                       <a class="btn-floating  btn-small  orange darken-4">
                         <i class="large material-icons">chat</i>
                       </a>
                       <ul>
                         <li><a class="btn  orange accent-4" onclick="send_message_fast_fun('Hello')">👋</a></li>                        
                         <li><a class="btn  orange accent-4" onclick="send_message_fast_fun('Please play faster')">😫</a></li>
                         <li><a class="btn  orange accent-4" onclick="send_message_fast_fun('Good Game')">👍</a></li>
                         <li><a class="btn  orange accent-4" onclick="send_message_fast_fun('😥')">😥</a></li>                         
                         <li><a class="btn  orange accent-4" onclick="fun_detect_cheat('cheat')">🕵️</a></li>
                         <li><a class="btn  orange accent-4"   href="#modal-chat"> 💬</a></li>
                         <li><a class="btn  orange accent-4" id="sound" onclick="sound_state()">🔊</a></li>
                         <li><a class="btn modal-trigger orange accent-4 white-text" href="#modal-leaveOut" ><i class="small material-icons">backspace</i></a></li>
                       </ul>
                     </div>
                   </div>
                   </div>
             </div>
       </div>
       <div class=".show-on-large col l2 " id="box-right"></div>  
     </div>
       `;
       fun_lock_card_user(true,0);
}



function fun_show_message_full_screen_refresh(){
    //console.log('[789] fun_show_message_full_screen_refresh');
    //location.reload(true);
}


function send_message_fast_fun(val){
  roomPub.send({ message: val });

}

function sound_state(){
  let m ='';
  if (localStorage.getItem('sound')=="true"){
    localStorage.setItem('sound','false');
    document.getElementById('sound').innerHTML = '🔈';
    m = 'Muted';
  }else{
    localStorage.setItem('sound','true');
    document.getElementById('sound').innerHTML = '🔊';
    m= 'UnMuted';
  }
  M.toast({html: `${trans(m)} `, classes:' red darken-1'})
}
function load_regame(){
    document.getElementById('overlay-page').remove();
}

//تابع ارسال ورق
function send_card_fun_(noPlayer,i){
 
    // ورق از اینجا ارسال می شود
    const id = `#card-desk-played-${noPlayer}`;
    //console.log(`card ${i} select , id ${id}`);
    iplayed=false
    let card='';
    if(noPlayer==1){
        // اگر بازیکن باشد
        //console.log('send_card_fun:'+ i );
    
        roomPub.send({ mAzzA63: + i });
       // cards_send.push(numb]);
      
        card= document.querySelector('#card-desk-'+i).src;
        document.querySelector('#card-'+i).innerHTML='';
        fun_lock_card_user(true,0);
      
    }else{
        card =fun_card_image_name(i);
    }
    
 
    let classCard =document.querySelector('#card-desk-played-1').className;
    classCard = classCard.length >39 ?  classCard.slice(0,39) : classCard;
    const rndm  = Math.floor(Math.random() * 2+1);
    document.querySelector(id).src=card;
    play_event_card();
    


 

    gtag('event', 'card_tap');
}// end function send_card_fun


function fun_timeisup_hokm(){

    if(hokm_is==0){
        const elem = document.getElementById('hokm_is');
        const instance = M.Modal.init(elem, {dismissible: false});
        instance.close();
        roomPub.send({ mAzzA63:`mcTimeIsup`,seat:mySeat  });
     
    }
    
}



function gameControl(msg)
{
  // تابع کنترل کننده بازی
  // وضعیت آمادگی بازی را بررسی می کند
  var g_c='0';
  var cards=[1,2,3,4,5,6,7,8,9,10,11,12,13];
  //console.log(`message from server: ${msg}`);
  
  if (msg == 'mc71')
  { 
    //console.log(`[789] mc71`);
    fun_create_room_hukm()
       //content
  }// end if mc71 

 

  if (msg == 'mc40')
  {
    //789 وقتی یک کاربر لفت می دهد این تابع اجرا می شود
    // و وقتی بر می گردد باید یک تابع براش در نظر گرفته بشود
    waiting_user_back();
  }

  //اعلام مدیریت به کاربر
  if (-1 !=  msg.lastIndexOf('yourManger')){
    //console.log('you are manger');
    // اگر مدیر بود گزینه اجکت در یو آی برای کاربر نمایش داده شود
    // دکمه بیرون انداخت به قسمت نمایش پروفایل هر کاربر اضافه شود و  تابع زیر به 
    // همراه شماره جایگاه به آن اضافه گردد
    //throw_out_user_from_roomPub
    
  }

  //زمانی که کاربر توسط مدیر اتاق از جایگاه بلند می شود
  if (-1 !=  msg.lastIndexOf('manage:Remove')){
    M.toast({html: 'Room Creator remove you from seat'})
  }

  // به کاربران در لابی اعلام می شود صندلی ایکس خالی شد
  //صندلی 1
  if (-1 !=  msg.lastIndexOf('seat1free')){
    //console.log('seat 1 is free');
    // وقتی کاربری بلند می شود باید در المان های جایگاه و اطلاعات مربوط به آن جایگاه 
    // بروز رسانی شود
  }
// صندلی 2 خالی شد
  if (-1 !=  msg.lastIndexOf('seat2free')){
    //console.log('seat 2 is free');
  }
// صندلی 3 خالی شد
  if (-1 !=  msg.lastIndexOf('seat3free')){
    //console.log('seat 3 is free');
  }
// صندلی 4 خالی شد
  if (-1 !=  msg.lastIndexOf('seat4free')){
    //console.log('seat 4 is free');
  }

// اعلام آمادی کاربران
if (-1 !=  msg.lastIndexOf('player1Ready')){
  const i =1 ;
  document.getElementById(`user-seat-status-${i}`)? document.getElementById(`user-seat-status-${i}`).innerHTML ='<i class="material-icons">done</i>':0;
  //console.log('player 1 ready');

}

if (-1 !=  msg.lastIndexOf('player2Ready')){
  const i =2 ;
  document.getElementById(`user-seat-status-${i}`)?  document.getElementById(`user-seat-status-${i}`).innerHTML ='<i class="material-icons">done</i>':0;
  //console.log('player 2 ready');

}

if (-1 !=  msg.lastIndexOf('player3Ready')){
  const i =3 ;
  document.getElementById(`user-seat-status-${i}`)? document.getElementById(`user-seat-status-${i}`).innerHTML ='<i class="material-icons">done</i>' :0;
  //console.log('player 3 ready');

}
if (-1 !=  msg.lastIndexOf('player4Ready')){
  const i =4 ;
  document.getElementById(`user-seat-status-${i}`)? document.getElementById(`user-seat-status-${i}`).innerHTML ='<i class="material-icons">done</i>' :0;
  //console.log('player 4 ready');

}


  // لیست کاربران را دریافت می کند از سرور 
  if (-1 !=  msg.lastIndexOf('usrplylist'))
  {
    var users; 
    users=msg.substr(11);
    var usersList = users.split(',');   
    for (i = 0; i < usersList.length; i++) { 
        usersUrl[i]=document.location.origin + '/profile/' + usersList[i];
      }
  

  }// end if userplylist
  // در صورتی که بازیکن حاکم باشد متغیر حاکم صیح می شود در این ایف
  if (-1 !=  msg.lastIndexOf('urKing') ){

    king_set=true;
    roomPub.send({ mAzzA63:'3mAzzA63:mc77' });
  }// end if urking

  //به کاربر می گوید تو حاکم نیستی
  if (-1 !=  msg.lastIndexOf('urNKing') ){

    king_set=false;
    document.getElementById('myHandsPoint').innerHTML=0;
    document.getElementById('otherTeamHandsPoint').innerHTML=0;
  }// end if urN king

  // cards:
  // ست کردن کارت در متغییر برای نمایش
  if (-1 !=  msg.lastIndexOf('cards:'))
  {
    //h♧♤♢
    // ست کردن کارت ها در متغییر برای نمایش
    cardlist=msg.substr(6);
    mycards=cardlist.split(',');
    
    mycards=mycards.sort(sortNumber);
    //console.log(mycards);

    var n=0;
   for(n=0;n<13;n++){
     cards_num[n]=mycards[n];
     mycards[n]=parseInt(mycards[n]);
     mycards[n]=card_view_fun(mycards[n]);
   }
    //console.log(mycards);
    set_cards_fun(false);
    var cc=[];
    for(n=1;n<53;n++){
      cc[n]=card_view_fun(n);
    }
    //console.log(cc);
   

    if (king_set==true)
    {
       // پنجره انتخاب حکم را نمایش می دهد
        hokm_card_show_fun(true);
        document.getElementById('showSymb').innerHTML=' ♔ ';


    }
    if(king_set==false)
    {
      document.getElementById('showSymb').innerHTML='  ';
    }
  }// end if cards

  // پیام ارسال قفل کردن 
  if (-1 !=  msg.lastIndexOf('lock')){
        fun_lock_user_player(true);
        //lock_fun();
      }// if loc

  // پیام دریافت باز بودن
   if (-1 !=  msg.lastIndexOf('unlock')){
      fun_lock_user_player(false);
      //  unlock_fun();        
      }// end if unlock

  // نوبت بازی
  if (-1 !=  msg.lastIndexOf('yourTurn')){
    fun_lock_user_player(false);
        //789       
       // unlock_fun(false)
    }// end if yourTurn

  // پیام دریافت  پایان بازی
   if (-1 !=  msg.lastIndexOf('gameFinished')){
      //console.log('game Finished');
      }
    // پیام دریافت  برنده بازی
   if (-1 !=  msg.lastIndexOf('uWin')){
      //console.log('U Win Game');
      }

  // پیام دریافت  باخت بازی
  if (-1 !=  msg.lastIndexOf('uLose')){   console.log('U Lose Game');          }// end if you lose

  if (-1 !=  msg.lastIndexOf('uWin')){    console.log('U Win Game');}// end if you win

  // امتیاز بازی را بروز می کند
  if (-1 !=  msg.lastIndexOf('point:'))
  {
        points =msg.substr(6).split(',');
        document.getElementById('myHandsPoint').style.visibility = 'visible';
        document.getElementById('otherTeamHandsPoint').style.visibility = 'visible';
            //myHandsPoint otherTeamHandsPoint
        if(team_==1)
        {
            //console.log('team number 1'+ points);
            document.getElementById('myHandsPoint').innerHTML=points[0];
            document.getElementById('otherTeamHandsPoint').innerHTML=points[1];
        }
        if(team_==2)
        {
          //console.log('team number 1' + points);
          document.getElementById('myHandsPoint').innerHTML=points[1];
          document.getElementById('otherTeamHandsPoint').innerHTML=points[0];
        }
        //playerCards رو بعد از دو ثانیه مخفی می کند
        //789 باید سرور دو ثانیه دیلی نوبت را به نفر بعدی بدهد
        setTimeout(function(){ 
            for (i=1 ; i<=4 ; i++){
              document.getElementById('playerCard'+i).innerHTML=' ';
            }
         }, 2000);
        // کارت های بازی حذف شوند
  }// end if
  //شماره تیم را نگه می دارد
  if (-1 !=  msg.lastIndexOf('teamt:'))
  {
    team_ =msg.substr(6);
  
  }// end if

  //  در صفحه برای نمایش ست کردن حکم
  if (-1 !=  msg.lastIndexOf('hukm:')){
    //7894
    
      //console.log('hukm is: '+msg.substr(5));
/*     //789
  switch(parseInt(msg.substr(5))){
    case 13:
      document.getElementById('hokmIs').innerHTML='♥️';
      //console.log('hukm is: h');
    break;
    case 26:
     document.getElementById('hokmIs').innerHTML='♢';
     //console.log('hukm is: ♢');
     
    break;
    case 39:
      document.getElementById('hokmIs').innerHTML='♧';
      //console.log('hukm is: ♧');
      
    break;
    case 52:
      document.getElementById('hokmIs').innerHTML='♤';
       //console.log('hukm is: ♤');
    break;
  } */
  }
  
  if(-1 !=  msg.lastIndexOf('player') )
  {
    //console.log('card came from other user');
/*      cm=msg.substr(6).split(':');
   // cm[0] کد بازیکنی که کارت را آمده نگه می دارد
   // com[1] کارت بازی شده را نگه
   //playerCard1
   //7894
      cardv=cm[1];
      cardv=card_view_fun(parseInt(cardv.substr(2)));
      //console.log(' 789 player:' +cm[0] +' card'+ cardv);
      document.getElementById('playerCard'+cm[0]).innerHTML= cardv;
     */

  }//end if

  //دست تمام شد.
  if(-1 !=  msg.lastIndexOf('setFinish') )
  {
    //console.log('this set is Finish');
    lock_fun();
    hidden_cards_fun();
    king_set==false;
    
  }// End if setFinish

  //   شده نمایش امتیاز  دست های  بازی
  if(-1 !=  msg.lastIndexOf('pointG:') )
  {
    //console.log('Point Game:');
    points=msg.substr(7).split(':');
    //console.log(points);
    document.getElementById('mySetsPoint').style.visibility = 'visible';
    document.getElementById('otherTeamSetPoint').style.visibility = 'visible';
    if(team_==1)
    {
        //console.log('team number Game Point:'+ points);
        document.getElementById('mySetsPoint').innerHTML=points[0];
        document.getElementById('otherTeamSetPoint').innerHTML=points[1];
    }
    if(team_==2)
    {
      //console.log('team number 2 Game Point:' + points);
      document.getElementById('mySetsPoint').innerHTML=points[1];
      document.getElementById('otherTeamSetPoint').innerHTML=points[0];
    }
    
    

  }// End if pointG

  //وقتی بازی  هفت دست کلا تمام  می شود
  // به کاربر گفته می شود آیا تمایل داری بازی کنی
  // بخش زیر اعلام اتمام بازی است از سرور به کلاینت جهت گرفتن 
  if(-1 !=  msg.lastIndexOf('gameFinished') ){
      ready_play_again_show_bot_fun(1);
  }//end if gameFinished


}// end function gameControl

function fun_daily_coin(){
//console.log(`fun_daily_coin`);
document.getElementById('3crads-title').innerHTML=trans('Daily Free Coin');
document.getElementById('3crads-Des').innerHTML=trans('Find Joker card and Win 400 Coins');

document.getElementById('3cards-row').innerHTML=`
<button type="submit"  
class=" col l4 s4" 
id="cards3Button1"
onclick="fun_three_cards_daily_play(1)"  
style="border: 0; background: transparent" >
  <img src="../img/cards/Card_back.svg" alt=""  class="cards3play z-depth-2" id="cards3play-card1">
</button>
<button type="submit"  
class=" col l4 s4" 
id="cards3Button1"
onclick="fun_three_cards_daily_play(1)"  
style="border: 0; background: transparent" >
  <img src="../img/cards/Card_back.svg" alt=""  class="cards3play z-depth-2" id="cards3play-card1">
</button>
<button type="submit"  
class=" col l4 s4" 
id="cards3Button1"
onclick="fun_three_cards_daily_play(1)"  
style="border: 0; background: transparent" >
  <img src="../img/cards/Card_back.svg" alt=""  class="cards3play z-depth-2" id="cards3play-card1">
</button>
`;
if(localStorage.getItem('sound')==='true'){
  const sound =new Audio('/sound/bell_turn.mp3');
  sound.play()
}
const elem = document.getElementById('modal-3crads');
const instance = M.Modal.init(elem, {dismissible: false});
instance.open();
  
}//end fi

var countdown
function countDownNo(no){

  switch (no){
     case 1:
       document.getElementById(`countdown-number-1`).style.visibility = 'hidden'; 
       document.getElementById(`countdown-number-2`).style.visibility = 'hidden'; 
       document.getElementById(`countdown-number-3`).style.visibility = 'hidden'; 
       document.getElementById(`countdown-number-4`).style.visibility = 'hidden'; 
     break;
     case 2:
       document.getElementById(`countdown-number-1`).style.visibility = 'hidden'; 
       document.getElementById(`countdown-number-2`).style.visibility = 'hidden'; 
       document.getElementById(`countdown-number-3`).style.visibility = 'hidden'; 
       document.getElementById(`countdown-number-4`).style.visibility = 'hidden'; 
     break;
    case 3: 
       document.getElementById(`countdown-number-1`).style.visibility = 'hidden'; 
       document.getElementById(`countdown-number-2`).style.visibility = 'hidden'; 
       document.getElementById(`countdown-number-3`).style.visibility = 'hidden'; 
       document.getElementById(`countdown-number-4`).style.visibility = 'hidden'; 
     break;
     case 4:
       document.getElementById(`countdown-number-1`).style.visibility = 'hidden'; 
       document.getElementById(`countdown-number-2`).style.visibility = 'hidden'; 
       document.getElementById(`countdown-number-3`).style.visibility = 'hidden'; 
       document.getElementById(`countdown-number-4`).style.visibility = 'hidden'; 
     break;
    
   }
   var countdownNumberEl =document.getElementById(`countdown-number-${no}`);
  
   countdown = 90;
   countdownNumberEl.textContent = countdown;

 
 }
 
 setInterval(function() {
  countdown = --countdown <= 0 ? 90 : countdown;
  
  
  document.getElementById(`countdown-number-1`) ? document.getElementById(`countdown-number-1`).textContent=countdown:0;
  document.getElementById(`countdown-number-2`) ? document.getElementById(`countdown-number-2`).textContent=countdown:0;
  document.getElementById(`countdown-number-3`) ? document.getElementById(`countdown-number-3`).textContent=countdown:0;
  document.getElementById(`countdown-number-4`) ? document.getElementById(`countdown-number-4`).textContent=countdown :0;
  if(countdown == 0){
    //console.log('count down is 0')
    document.getElementById(`countdown-number-1`) ? document.getElementById(`countdown-number-1`).style.visibility = 'hidden':0;
    document.getElementById(`countdown-number-2`) ? document.getElementById(`countdown-number-2`).style.visibility = 'hidden':0;
    document.getElementById(`countdown-number-3`) ? document.getElementById(`countdown-number-3`).style.visibility = 'hidden':0; 
    document.getElementById(`countdown-number-4`) ? document.getElementById(`countdown-number-4`).style.visibility = 'hidden':0; 
  }
}, 1000);


// مقدار پیش فرض مودال تقلب
fun_def_Val_modal_cheat();
function fun_def_Val_modal_cheat(){
  let img1 ='/img/logo/joker_00.jpg';
  let img2 ='/img/logo/joker_00.jpg';
  
    for(let player in usersPlayer){
      if(mySeat ==1 || mySeat ==3){
        usersPlayer[player].seat==2 ?img1 =usersPlayer[player].image:0;
        usersPlayer[player].seat==4 ?img2 =usersPlayer[player].image:0;
      }else{
        usersPlayer[player].seat==1 ?img1 =usersPlayer[player].image:0;
        usersPlayer[player].seat==3 ?img2 =usersPlayer[player].image:0;
      }
  
  }
  if(document.getElementById('modal-Cheat')){ 
   document.getElementById('modal-Cheat').innerHTML =
` <div id="cheat-area" class="modal-content orange  darken-4  black-text">
            <h3 id="cheat-title">${trans(`Who is cheater ?`)}</h3>
            <p>${trans('Details: your partner must confirm cheat is happen and if you are wrong, your team loose this hand. and if you are right, your team wins this hand.')}</p>
              <div class="row center">             
                      <img src="${img1}" class="circle img-cheat cards3play" id="player1"  onClick='fun_select_cheater(1)'>               
                      <img src="${img2}"  class="circle img-cheat cards3play" id="player2"  onClick='fun_select_cheater(2)'>          
              </div>            
          </div>
          <div class="modal-footer modal-content orange  darken-4  black-text">
          <a class="modal-close waves-effect waves-green btn-flat">${trans('Close')}</a>
        
        </div>`;}
}//end fun fun_def_Val_modal_cheat

function fun_select_cheater(val){
 const elem = document.getElementById('modal-Cheat');
 const instance = M.Modal.init(elem, {dismissible: false});
 instance.close();
 roomPub.send({ act:'cheatHappen' ,no:val}); 
 }//end fun fun_select_cheater



 // پنجره تایید شریک
function fun_confirm_cheat_partner(no){
  //console.log(`fun_confirm_cheat_partner`);
  let img = '/img/logo/joker_00.jpg';
  let nno =0;
  for(let player in usersPlayer){
      if(mySeat ==1 || mySeat ==3){
         nno = no==1 ? 2:4;
        usersPlayer[player].seat==nno ? img =usersPlayer[player].image:0;       
      }else{
         nno = no==1 ? 1:3;
        usersPlayer[player].seat==nno ? img =usersPlayer[player].image:0;        
      }

  }
  
  document.getElementById('modal-Cheat').innerHTML =`
      <div class="modal-content orange  darken-4  black-text ">
        <h5>${trans('Your partner tells you the other user is cheats, do you agree?')}</h5>
        <p>${trans('Details: your partner guess this user cheats and if you believe cheating is happened tap "Accept" or not, "Reject". consider that if the guess is wrong, you will loose the hand and if you are right, you will Win.')}</p>
  
         <div class="row center">
           <img src="${img}" class="cards3play  circle img-cheat">
        <div>
                 
      </div>
      <div class="modal-footer modal-content orange  darken-4  black-text">
        <a onClick="fun_result_confirm_cheat(${nno})" class="modal-close waves-effect waves-green btn-flat">${trans('Accept')}</a>
        <a onClick="fun_result_confirm_cheat(0)" class="modal-close waves-effect waves-green btn-flat">${trans('Reject')}</a>
      </div>
  `;
  const elem = document.getElementById('modal-Cheat');
  const instance = M.Modal.init(elem, {dismissible: false});
  instance.open();
  }//end fun fun_confirm_cheat_partner

  function fun_result_confirm_cheat(val){
    //0 -
    //1 +
    console.log(`fun_result_confirm_cheat` ,val)
    fun_def_Val_modal_cheat();
    const elem = document.getElementById('modal-Cheat');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.close();
    roomPub.send({ act:'cheatAc' ,no:val}); 
    
  }

  function fun_detect_cheat(){
    fun_def_Val_modal_cheat();
    const elem = document.getElementById('modal-Cheat');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.open();
  }


const userAgent = window.navigator.userAgent;
console.log(`ua`,userAgent);
if(userAgent.lastIndexOf('iPhone')!=-1 )
{
  M.toast({html: trans("You can't invite anyone because iPhone don't give us permssion for this service"), displayLength:8500, classes: 'red darken-1 '});
 localStorage.setItem('iPhone','iPhone');
}
const named =localStorage.getItem('name');
console.log(named);
if(named.length<6 || named.lastIndexOf('guest-')!=-1 ){
  console.log('name problem');
  document.getElementById('body').innerHTML =`<div class="message-box-over z-index: 9999;"> <div class="container col l6 s10  row " id="container" onClick='fun_side_menu_go("pre-register")' ><div class="end-game z-depth-2  red lighten-3 grey-text  col l6 s12" id="game-message-box">  <div class="row" id="end-game-box-first-row"> <div class="col l4 s4 m4 xl4"></div> <div class="col l4 s4 m4 xl4 z-depth-1" id="game-message-box-head"> <h3 class="center" id="end-game-box-medal-logo">✋<h3> </div> <div class="col l4 s4 m4 xl4 "></div>  </div>  <div class="row" id="end-game-box-second-row"> <div class="col s12 l12 m12 xl12"><h2 class="center red-text " id="end-game-box-title"></h2>  </div>  </div>  <div  class="row" id="end-game-box-third-row"> <div class="center col s12 m12 l12 xl12" ><div class="center col s12 m12 l12 xl12 z-depth-1" id="game-message-box-M">  <h2 class="center" id="game-message-box-des" onClick='fun_side_menu_go("pre-register")'> <span id="end-game-box-point-box-coin-nuumber">${trans(`You need to change name before Play Game`)}</br>${trans("Put more than 6 characters in your name.")}</span></h2></div><div class="center col s10 m10 l10 xl10 z-depth-1 " id="end-game-box-point-box-title-box" > <h6 class="center" id="game-message-box-down-box-me"><span id="end-game-box-point-box-exp-nuumber">🤷</span></h6></div></div></div>  <div class="row" id="end-game-box-fourth-row">  </div> </div>  <a onClick='fun_side_menu_go("pre-register")' ><div class="center col s3 m3 l3  xl3 z-depth-2" id="end-game-box-back-loby"> <div class=" material-icons " id="end-game-box-loby-back-icon"> close  </div> </div>  </a> </div> </div>`;
}



function fun_seat_(no){

  if(mySeat==0){
    mySeat= no;
    const user_image = localStorage.getItem('image');
    const user_name = localStorage.getItem('name');
    console.log(user_image);
    document.getElementById(`user-seat-image-${no}`).src=user_image;
    document.getElementById(`user-seat-status-${no}`).innerHTML=user_name;
    roomPub.send({mAzzA63:`${no+60}`});
    fun_lobby_lock(true);

 
  }
}


function fun_lobby_lock(state){

  if(state==true){
/*     document.getElementById('content').innerHTML+=`<div id="overlay-page" >
    <div id="overlay-page-text"><b>${trans('Waiting')}<b>
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
    </div>
  </div>`; */
  }else{
    document.getElementById('overlay-page')?    document.getElementById('overlay-page').remove():0;
  }

}

function fun_seat_data(user){
  console.log(`1`,user);
  usersPlayer=user;
  const sid=localStorage.getItem('sid')
    for(let i in user){
      console.log(user[i].sid,sid)
      let sid_in=user[i].sid;
      console.log(sid_in.lastIndexOf(sid)!=-1);
      console.log(i ,user[i].sid ,localStorage.getItem('sid') );
      if(user[i].seat !=0 ){
          console.log(localStorage.getItem('sid')===user[i].sid);
          
          if(localStorage.getItem('sid')===user[i].sid  && button_Seat==0 ){
            console.log(`localStorage.getItem('sid')===user[i].sid  && button_Seat==0`);
          //if(localStorage.getItem('sid')===user[i].sid && !document.body.contains(document.getElementById('ImReadyButton')) ){
            button_Seat=mySeat;
            document.getElementById('user-seat-'+user[i].seat).onclick = function() { show_profile(user[0].seat); }
            
            document.querySelector(`#buttons-room`).innerHTML +=`
            <button type="submit" id="ImReadyButton" 
                            class="waves-effect waves-light z-depth-2 btn pulse   orange lighten-2 disabled"                     
                            onclick="fun_im_ready(${user[i].seat})"  
                            style="border: 0; background: transparent" >
                              <i class="material-icons left">done</i>${trans('Ready')}
            </button>
            <button type="submit" id="standUpButton"
                          class="waves-effect waves-light z-depth-3 btn   black lighten-2" 
                          onclick="fun_stand_up_(0)" style="border: 0; background: transparent">
                          <i class="material-icons left">sync</i>${trans('Stand Up')} 
                          </button>`;
            fun_lobby_lock(false);

          }else{
            document.getElementById('user-seat-'+user[i].seat).onclick = function() { show_profile(user[i].seat); }
            const user_image =user[i].image;
            const user_name = user[i].name;
            console.log(user_image);
            document.getElementById(`user-seat-image-${user[i].seat}`).src=user_image;
            document.getElementById(`user-seat-status-${user[i].seat}`).innerHTML=user_name;
            //document.getElementById(`user-seat-profile-${user[i].seat}`).href="#modal-profile";
            if(mySeat==user[0].seat && sid_in.lastIndexOf(sid)==-1 ){
              fun_lobby_lock(false);
            }
          }
      }
   }   
}


function fun_stand_up_(val){
  if(mySeat!=0 && val==0){
    roomPub.send({mAzzA63:`${65}`});
    
  }

}

function fun_stand_up_server(val){

  console.log(val);
    if(mySeat!=0 && val==mySeat){
      const n =mySeat
      button_Seat=0;
      document.getElementById(`user-seat-image-${mySeat}`).src=`/img/user.png`;
      document.getElementById(`user-seat-status-${mySeat}`).innerHTML=`${trans('Free Seat')}`;
      document.getElementById(`ImReadyButton`).remove();
      document.getElementById(`standUpButton`).remove();
      document.getElementById('buttons-room').innerHTML=`<div id="buttons-room" class="row col l12 m12 s12">
        <a class="waves-effect waves-light z-depth-3 btn   blue-grey darken-1 ${userAgent.lastIndexOf('iPhone')!=-1 ? 'disabled' : ''}" href="#share-modal" style="border: 0; background: transparent">
        <i class="material-icons left">share</i>${trans('Invite')}
        </a>
          <a class=" btn red darken-4 white-text modal-trigger" href="#modal-3crads">${trans('Win Coins')}</a>
          <a class=" btn  brown darken-1 white-text modal-trigger" href="#modal-leaveOut">${trans('Exit')}</a>
      </div>`;
      document.getElementById('user-seat-'+mySeat).onclick = function() {fun_seat_(n);};
      
      mySeat=0;
      
    }else{
      document.getElementById(`user-seat-image-${val}`).src=`/img/user.png`;
      document.getElementById(`user-seat-status-${val}`).innerHTML=`${trans('Free Seat')}`;
      document.getElementById('user-seat-'+val).onclick = function() {fun_seat_(val);};
    }
}



