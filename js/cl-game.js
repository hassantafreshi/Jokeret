


    
    function getAvailableRooms(message) {
        console.log( );
      
            //3mAzzA63:
            // اگر مقدار بالا در پیام بود تشخیص می دهد پیام مخصوص برنامه است
            var lio = message.lastIndexOf('3mAzzA63:');
            message.lastIndexOf('3mAzzA70:') !== -1 ? localStorage.setItem('gid',message.substr(lio+9)) :0 
            if (-1 ==lio){

            var p = document.createElement("p");
            p.innerHTML = message;
            document.querySelector("#messages").appendChild(p);

            }else{
            
                // پیام را برای کنترل بازی می فرستد تا تصمیم بگیرد کد ارسال شده توسط سیستم یعنی چی
                gameControl(message.substr(lio+9));
                
            }
        }//end function




    // لیست تمام اتاق های موجود را می دهد
    function getAvailableListRooms() {
        // لیست تمام اتاق های موجود را می دهد
        // 789 با هر بار کلیک باید لیست بروز رسانی شود و اتاق های قبلی مجددا تکرار نشوند
        
        client.getAvailableRooms('chat', function(rooms, err) {
       
                 `<div class="card-panel card-room white row" id="assfsaf5544" onclick="fun_room_join('ThvA8UphZ')">
                    <img src="/img/logo.png" alt="card-room thumb">
                    <div class="card-room-details">
                    <div class="card-room-title">sssssdddddddd</div>
                    <div class="card-room-ingredients">17001</div>
                        </div>
                            <div class="card-room-person">
                                <i class="material-icons">person person person  person_outline</i>
                            </div>
                        </div>`
               rooms.forEach((room) => {
                
                 

                  console.log(room.roomId);
                  console.log(room.clients);
                  console.log(room.maxClients);
                  console.log(room.metadata);
                
                   
                    //789 هر بار که کاربر کلیک می کند اتاق های که قبلا وجود داشته است نمایش می دهد
 
                    if(room.id != room.maxClients){

                          var p = document.createElement("p");
                          p.id = "br-tag";
                          var txt= "Player ready:"+ room.clients + "/4";
                          p.innerHTML =txt ;
                          document.querySelector("#listOfRoom").appendChild(p);
                          // 789 وقتی کاربری روی یک نام اتاق کلیک می کند باید به داخل اون اتاق اضافه شود
                          var button = document.createElement("input");
                          button.type = "button";
                          button.value = room.metadata.name;
                          button.id = room.roomId;
                          button.onclick =function () {
                                              //   مقدار شماره اتاق پاس داده می شود به این تابع
                                              // تا از طریق تابع اتاق باز شود
                                                  open_room_fun(room.roomId);
                                              };
                          document.querySelector("#listOfRoom").appendChild(button);

                          var br = document.createElement("br");
                          br.id = "br-tag";
                          document.querySelector("#listOfRoom").appendChild(br);

                          var b = document.createElement("b");  
                          b.id = "b-tag";                
                          b.innerHTML ='==============================' ;
                          document.querySelector("#listOfRoom").appendChild(b);

                          var br = document.createElement("br");
                          br.id = "br-tag";
                          document.querySelector("#listOfRoom").appendChild(br);
                        }//end if


              }); //end for each room
              console.log(room);


      
        }); // emd  client.getAvailableRooms
    }// end functio  getAvailableRooms

    // تابع باز کردن اتاق برای شروع بازی
    //7891
    // در قسمت زیر باید اول اتاق انتظار فراخوانی شود
    // زمانی که کاربران اعلام آمادگی کردند اتاق نمایش داده شود
    /*
    function open_room_fun(id){
      // باید نام اتاق را به  room  داد 
      // تا وارد اتاق شود و بصورت داینامیک وارد اتاق شود 
      // از تابع 
      console.log('function run');
       room = client.join(id);
        addListeners(room);
      //اتاق را نمایش لابی را مخفی می کند
      hide_loby_fun(true);
      hide_room_fun(false);
      
    } */

    // نام اتاق را از کاربر می گیرد
    function get_name_room_fun() {
      //789 طول متن
      // محتوا فقط رشته و عدد باشد چک شود
      var room = prompt("Enter Room Name:");
      if (room == null || room == "") {
        room = "Room_name_def";
      } 
     return room;
    }

    // نمایش / عدم نمایش لابی
    function hide_loby_fun(handler)
    {
      // اگر ترو بود المان های لابی را نمایش نده 
      if (handler==true){
        var myNode = document.getElementById("loby");
          while (myNode.firstChild) {
              myNode.removeChild(myNode.firstChild);
          }
          myNode = document.getElementById("content");
          document.getElementById('loby').remove();
          
          //789 خود تگ لابی هم حذف شود
      }
      // اگر فالس بود المان های لابی را نمایش بود
      if (handler==false){
          //add Div Loby
          var tag = document.createElement("div");
          tag.id = "loby";
          tag.className="loby";
          document.querySelector("#content").appendChild(tag);

           // add h2 : hokm online
          tag = document.createElement("h2");
          tag.id = "text-title";
          var txt= "Hokm Online";
          tag.innerHTML =txt ;
          document.querySelector("#loby").appendChild(tag);
        
          // add image logo
          tag = document.createElement("IMG");
          tag.setAttribute("src", "logo.jpg");
          tag.setAttribute("height", "228");
          tag.setAttribute("alt", "Hokm Online");
          document.querySelector("#loby").appendChild(tag);
            
          //add Br Tag
          tag = document.createElement("br");
          tag.id = "br";
          document.querySelector("#loby").appendChild(tag);

        


          //add Button List Available Rooms
          tag = document.createElement("input");
          tag.type = "button";
          tag.value = "List Available Rooms";
          tag.id = "Rooms-butto2n";
          tag.onclick =function () {getAvailableListRooms()};
          document.querySelector("#loby").appendChild(tag);

          //add Button List Available Rooms
          tag = document.createElement("input");
          tag.type = "button";
          tag.value = "Earn Coin";
          tag.id = "EarnCoin-button";
          tag.onclick =function () {EarnCoing_fun()};
          document.querySelector("#loby").appendChild(tag);

          //add div listOfRoom
          var tag = document.createElement("div");
          tag.id = "listOfRoom";
          document.querySelector("#loby").appendChild(tag);

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
            /*
              tag = document.createElement("input");
              tag.type = "button";
              tag.className="waves-effect waves-light btn game-card-button";
              tag.value = "my1";
              tag.id = "myBtn1";
              //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
              tag.onclick =function () { send_card_fun(1)};            
              document.querySelector("#cards_list_id").appendChild(tag);

              tag = document.createElement("input");
              tag.type = "button";
              tag.className="waves-effect waves-light btn game-card-button";
              tag.value = "my2";
              tag.id = "myBtn2";
              //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
              tag.onclick =function () { send_card_fun(2)};            
              document.querySelector("#cards_list_id").appendChild(tag);

              tag = document.createElement("input");
              tag.type = "button";
              tag.className="waves-effect waves-light btn game-card-button";
              tag.value = "my3";
              tag.id = "myBtn3";
              //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
              tag.onclick =function () { send_card_fun(3)};            
              document.querySelector("#cards_list_id").appendChild(tag);

              tag = document.createElement("input");
              tag.type = "button";
              tag.className="waves-effect waves-light btn game-card-button";
              tag.value = "my4";
              tag.id = "myBtn4";
              //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
              tag.onclick =function () { send_card_fun(4)};            
              document.querySelector("#cards_list_id").appendChild(tag);

              tag = document.createElement("input");
              tag.type = "button";
              tag.className="waves-effect waves-light btn game-card-button";
              tag.value = "my5";
              tag.id = "myBtn5";
              //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
              tag.onclick =function () { send_card_fun(5)};            
              document.querySelector("#cards_list_id").appendChild(tag);

              tag = document.createElement("input");
              tag.type = "button";
              tag.className="waves-effect waves-light btn game-card-button";
              tag.value = "my6";
              tag.id = "myBtn6";
              //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
              tag.onclick =function () { send_card_fun(6)};            
              document.querySelector("#cards_list_id").appendChild(tag);

              tag = document.createElement("input");
              tag.type = "button";
              tag.className="waves-effect waves-light btn game-card-button";
              tag.value = "my7";
              tag.id = "myBtn7";
              //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
              tag.onclick =function () { send_card_fun(7)};            
              document.querySelector("#cards_list_id").appendChild(tag);

              tag = document.createElement("input");
              tag.type = "button";
              tag.className="waves-effect waves-light btn game-card-button";
              tag.value = "my8";
              tag.id = "myBtn8";
              //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
              tag.onclick =function () { send_card_fun(8)};            
              document.querySelector("#cards_list_id").appendChild(tag);

              tag = document.createElement("input");
              tag.type = "button";
              tag.className="waves-effect waves-light btn game-card-button";
              tag.value = "my9";
              tag.id = "myBtn9";
              //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
              tag.onclick =function () { send_card_fun(9)};            
              document.querySelector("#cards_list_id").appendChild(tag);

              tag = document.createElement("input");
              tag.type = "button";
              tag.className="waves-effect waves-light btn game-card-button";
              tag.value = "my10";
              tag.id = "myBtn10";
              //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
              tag.onclick =function () { send_card_fun(10)};            
              document.querySelector("#cards_list_id").appendChild(tag);

              tag = document.createElement("input");
              tag.type = "button";
              tag.className="waves-effect waves-light btn game-card-button";
              tag.value = "my11";
              tag.id = "myBtn11";
              //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
              tag.onclick =function () { send_card_fun(11)};            
              document.querySelector("#cards_list_id").appendChild(tag);

              tag = document.createElement("input");
              tag.type = "button";
              tag.className="waves-effect waves-light btn game-card-button";
              tag.value = "my12";
              tag.id = "myBtn12";
              //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
              tag.onclick =function () { send_card_fun(12)};            
              document.querySelector("#cards_list_id").appendChild(tag);

              tag = document.createElement("input");
              tag.type = "button";
              tag.className="waves-effect waves-light btn game-card-button";
              tag.value = "my13";
              tag.id = "myBtn13";
              //999   به دلیل مشکل در حلقه در ست کردن مقدار تر تاربع سند مجبور به تکرار شدم
              tag.onclick =function () { send_card_fun(13)};            
              document.querySelector("#cards_list_id").appendChild(tag);

           //End card list section
          */
          tag = document.createElement("br");
          document.querySelector("#room").appendChild(tag);

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
              tag.className=name_khal[i]+ "waves-effect waves-light btn game-card-button";
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
          tag.onclick =function () {send_message_fun()};
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

        // تابع پیام دادن فراخونی می شود
        room.listen("messages/:index", function(change) {
          console.log("CHANGE!", change);
        });

        
    

      // listen to patches coming from the server
      room.onMessage.add(function(message) {
        
        getAvailableRooms(message);
      });


      }// end if


    }//end function

    function send_message_fun ()
    {
        room.onStateChange.addOnce(function(state) {
          console.log("initial room state:", state);
        });

      console.log('c_pub is true');
      // send message to room on submit
      
        console.log("press");
       // e.preventDefault();

        var input = document.querySelector("#message-text");
        
        // send data to room
        //input.value
        room.send({ message: input.value });

        // clear input
        input.value = "";
      
    }

    function fun_send_message()
    {


      console.log('c_pub is true');
      // send message to room on submit
      
        console.log("press");
       // e.preventDefault();

   
        
       // send data to room
       //input.value
       roomPub.send({ message: document.querySelector("#chat-room").value});

       // clear input
       document.querySelector("#chat-room").value= "";
      
    }


    function send_message_fast_fun (val)
    {
  
        room.send({ message: val });
      
    }
    
    // تابع که اطلاعات مربوط به ساخت اتاق را از کاربر می گیرد
    function  get_create_room_fun(){
        console.log('get_create_room_fun');
      var room_name = document.getElementById("room_name").value;
      var checkbox=false;
      console.log(room_name);
      if (room_name.length>3  ){

          var game_type= document.getElementById("game_type");
          console.log(game_type ,'game_type');
          if (game_type.checked == true){
            checkbox=true;
          }

              // در این قسمت اطلاعات را به سرور می فرستد برای ساختن اتاق
              room = client.join('chat', { create: true, 
              name:room_name, point: 200, game_type:1,privacy:checkbox });
              addListeners(room);

            
        
         // M.toast({html: "Room  "+room_name + " Created", displayLength:2000, classes: ' amber darken-1 '});

          // وقتی کاربر اتاق را ساخت صفحه فرم اطلاعات اتاق مخفی می شود و روم نمایش داده می شود
          form_create_room_fun(true);
          hide_room_fun(false);
      }else{
          M.toast({html: "Please Enter Room name!", displayLength:2000, classes: ' amber darken-1 '});
      
      } //end if else
    }// end function  get_create_room_fun

    // این تابع صفحه فرم ساخت اتاق را نمایش می دهد 
    function form_create_room_fun(handler)
    {
      // اگر فالس بود المان های  فورم را نمایش بود
      if (handler==false)
      {


              var tag = document.createElement("div");
              tag.id = "createRoomForm";
              tag.className="createRoomForm";
              document.querySelector("#content").appendChild(tag);

              tag = document.createElement("h2");
              tag.id = "text-title";
              tag.innerHTML ="Create Room Form"; ;
              document.querySelector("#createRoomForm").appendChild(tag);


              
              //div row 
              tag = document.createElement("div");
              tag.id = "row";
              tag.className="row";
              document.querySelector("#createRoomForm").appendChild(tag);

              //div form-room  input-field col s12
              tag = document.createElement("div");
              tag.id="form-room";
              tag.className="form-room input-field col s12 ";
              document.querySelector("#row").appendChild(tag);

              // <input id="room_name" type="text" class="validate ">
              tag = document.createElement("input");
              tag.type = "text";
              tag.className = "room_name validate";
              tag.id = 'room_name';
              document.querySelector("#form-room").appendChild(tag);

              //<label for="room_name">Room Name</label>
              tag = document.createElement("label");
              tag.htmlFor="room_name";
              tag.innerHTML="Room Name";
              document.querySelector("#form-room").appendChild(tag);


              //add Br Tag
              tag = document.createElement("br");
              document.querySelector("#form-room").appendChild(tag);
              
              //add Br Tag
              tag = document.createElement("br");
              document.querySelector("#form-room").appendChild(tag);


              tag = document.createElement("p");
              tag.id="p_game_type";
              tag.className="p_game_type";
              document.querySelector("#form-room").appendChild(tag);


              tag = document.createElement("label");
              tag.id="label_game_type";
              tag.className="label_game_type";
              document.querySelector("#p_game_type").appendChild(tag);

              // <input  type="radio" name="game_type" value="Regular"   checked/>
              tag = document.createElement("input");
              tag.type = "checkbox";
              tag.className = "game_type";
              tag.id = 'game_type';
              tag.value="Regular"
              document.querySelector("#label_game_type").appendChild(tag);

              tag = document.createElement("span");
              tag.innerHTML="Privatسe Room";
              document.querySelector("#label_game_type").appendChild(tag);

              // <input type="button" value="Run" id="get_create_room" class=" btn waves-effect waves-light blue darken-2" onClick="get_create_room_fun()" >
              tag = document.createElement("input");
              tag.type = "button";
              tag.value = "Run";
              tag.id = "get_create_room";
              tag.className="btn waves-effect waves-light amber darken-1"
              tag.onclick =function () {
                                      // اطلاعات ساخت اتاق را پاس می دهد
                                    get_create_room_fun()
                                  };
              document.querySelector("#form-room").appendChild(tag);
              
  

      }// end if
      // اگر فالس بود المان های  فورم را نمایش بود
      if(handler==true)
      {
        /*
              // اگر ترو بود همه چیز را پاک می کند
              var myNode = document.getElementById("createRoomForm");
              while (myNode.firstChild) {
                  myNode.removeChild(myNode.firstChild);
              }
              myNode = document.getElementById("content");
              document.getElementById('createRoomForm').remove();
        */

      } // end if
    } // end function form_create_room_fun

    // تابع بدست آوردن سکه
    function EarnCoing_fun()
    {
      console.log('Function Earn Coin');
    }// end functio
    

    // نمایش اتاق انتظار
    function fun_show_w8_room(check)
    {
      //اگر صحیح بود نمایش بده
      if(check){
        let content = document.querySelector('#content');
        let temp =`
        <div id="waiting" class="loby">
            </br>
            <input type="button" value="List Available Rooms" id="Rooms-button" onclick="funfunfun()">
           
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



    
