const set=7,hands=7;
let cards_of_player =[];
let king_player=0;
let turn_player=king_player;
let hokm_set=1;// مقدار حکم را نگه می دارد

let cards_played=[]; // ورق های بازی هر ست را نگه می دارد
let cards_played_by = []; // مشخص می کند در هر ست کدام ورق را چه کسی آمده
let hands_win = [0,0]; // امتیاز مجموع بازی را نگه می دارد
let sets_win = [0,0]; // امتیاز هر ست را نگه می دارد
let sets_played = 1; // مجموع ست های بازی شده را نگه می دارد
let maxHand = Number(localStorage.getItem('setGame'));
console.log(`maxHand ${maxHand}`);
let newSet=true;
const time =350
const timeHideCard = localStorage.getItem("speedgame")==='true' ? time*2 : time*3;
const timeStartGame= localStorage.getItem("speedgame")==='true' ? time*3.5 : time*4.4;
const timeBotTurn =  localStorage.getItem("speedgame")==='true' ? time*2 : time*3.2;
console.log(`time  ${localStorage.getItem("speedgame")} timeHideCard:[${timeHideCard}] timeStartGame:[${timeStartGame}] timeBotTurn:[${timeBotTurn}]`);
fun_start_game();

async  function fun_start_game(){
    play_event_turn();
    console.log('fun_start_Game');
    if(sets_win[0]<maxHand && sets_win[1]<maxHand){
        hands_win[0]=0;
        hands_win[1]=0;
        fun_king_set(); //  حاکم مشخص می شود
        await fun_get_to_cards_user(); // کارت برای بازیکن ارسال می شود
     
        setInterval(fun_control_game(),20); // کنترل کننده بازی

    }else{
        sets_win[0] === maxHand ? fun_result_single_game('win') : fun_result_single_game('loose');
    }
   
    console.log(`hand:[${hands_win[0]}-${hands_win[1]}] point:[${sets_win[0]}-${sets_win[1]}]`)
}
//تابع بر زدن کارت ها 
function fun_random_cards()
{
    
    let list_of_Cards =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,
        26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,
        49,50,51,52];
    let current_index = list_of_Cards.length,temporary_value, random_index;
    while (0 !== current_index) {
        random_index = Math.floor(Math.random() * current_index);
        current_index -= 1;
        temporary_value = list_of_Cards[current_index];
        list_of_Cards[current_index] = list_of_Cards[random_index];
        list_of_Cards[random_index] = temporary_value;
        }//End while
    return list_of_Cards;
}//end function fun_random_cards

async function fun_get_to_cards_user(){
    
 cards_of_player=fun_random_cards();
 /*      cards_of_player=[
        30,2,3,5,6,7,8,9,11,12,13,32,15,51,
        28,7,18,19,20,21,22,23,24,25,26,37,
        31,4,33,34,35,36,38,39,1,14,40,16,49,
        29,41,42,43,44,45,46,47,48,50,52,17,10,36
        ]  */
  
    if(king_player===1){
        //اگر حاکم بود 
        //console.log('if user king')
        hokm_set= fun_show_hand_to_single_player(1,cards_of_player.slice(0,13));
        r=0;
    }else{
        // اگر حاکم نبود
       console.log('user not kinggggggggggggggg')
        fun_show_hand_to_single_player(0,cards_of_player.slice(0,13));
       console.log(`'time hokem is [${timeStartGame}]'`);
  /*      setTimeout(function (){
            hokm_set= fun_hokm_khal_bot(king_player);
        },(timeStartGame)); */
        hokm_set= fun_hokm_khal_bot(king_player);
        console.log(`hokem is ${hokm_set}`);
        fun_hokm_is(hokm_set);
        fun_event_hokm_is(hokm_set); //تابع اعلام حکم

         turn_player=king_player;

    }

    //در این قسمت لیست کارت ها به کاربر نمایش داده می شود
    // برای انتخاب حکم
}//end function fun_get_to_cards_user
function fun_king_set()
{
    
    if(newSet){
        king_player===0 ? king_player=1 :0;
        fun_set_king_logo(king_player);
    if(king_player==1){
        //به کاربر اعلام شود تو حاکمی و منتظر حکم بازیکن بماند

        turn_player=1;
    }else{
        king_player=turn_player;
       // کاربر قفل شود و تابع تعیین حکم اجرا شود


    }

    //console.log(`player  ${king_player} is The kingnext turn  ${turn_player}`);
    M.toast({html: `${trans('The kingis player')} ${king_player}`})
    //console.log(`value of newSet ${newSet}`);
        
    }
}//end function fun_king_set

//مشخص می کند اگر حاکم ربات بود تابع انتخاب حکم ربات فراخوانی شود
function fun_hokm_khal_bot(player){
    
    let r=0;
    console.log(`hakem is ${player}`);
    switch(player){
        case 2:
            r=fun_chose_hokm_khal_bot(cards_of_player.slice(13,18));
           // //console.log(cards_of_player.slice(13,18));
            break;
        case 3:
         //   //console.log(cards_of_player.slice(25,30));
           r= fun_chose_hokm_khal_bot(cards_of_player.slice(25,30)) ;
            break;
        case 4:
         //    //console.log(cards_of_player.slice(39,44));
            r= fun_chose_hokm_khal_bot(cards_of_player.slice(39,44));
            break;
    }
    /* 
    1 1  13
    2 14 26
    3 27 39
    4 40 52 */

    return r;
}//end function fun_hokm_khal_bot

//ربات حکم را انتخاب می کند 
function fun_chose_hokm_khal_bot(cards){
    let hokm_card=[0,0,0,0],r;
    for (card of cards){
        if(card>0 && card<=13)
        {
            hokm_card[0]+=card;
        }
        if(card>13 && card<=26)
        {   
            hokm_card[1]+= (card-13);
        }
        if(card>26 && card<=39){
            hokm_card[2]+=(card-26);
        }
        if(card>39 && card<=52){
            hokm_card[3]+=(card-39);
        }
    }

    r=0;
    for (i=0; i<3 ; i++){
        hokm_card[r]>hokm_card[i+1] ? 1 : r=i+1;        
    }
    r+=1;
    console.log(hokm_card);
    console.log(`r is ${r}`);
    return r;
}//end function fun_chose_hokm_khal_bot

function fun_event_hokm_is(hokm_){
    // به کاربر اعلام می شود که حکم فلان است 
    // کاربر قفل اش باز می شود
    //["♤","♥️","♢","♧"]
    let hokm_is ='1';
    switch(hokm_){
        case 1:
                hokm_is ='♤';
        break;
        case 2:
                hokm_is ='♥️';
        break;
        case 3:
                hokm_is ='♢';
        break
        case 4:
                hokm_is ='♧';
        break
    }
   // console.log(cards_of_player);
   // console.log(`hokm is ${hokm_is}`);
  //  M.toast({html: `${trans('hokm')}: ${hokm_is}`})
    fun_sort_cards(); // تمامی کارت های هر بازیکن را سورت می کند
 //   //console.log(cards_of_player);
}//end function fun_event_hokm_is

// کارت ها را برای بازیکن و ربات مرتب می کند
function fun_sort_cards(){
    for(i=0;i<52;i++){
        
        if(i<13){
            
            for(j=12 ; j>=i ; j--){
                let swap=0;
                if(cards_of_player[j]<cards_of_player[i]){
                    swap = cards_of_player[j];
                    cards_of_player[j]=cards_of_player[i];
                    cards_of_player[i]=swap;
                }//end if
            }//end for
            
        }//end if
         if(i<26 && i>=13){
            let swap=0;
            for(j=26 ; j>=i ; j--){
                if(cards_of_player[i]>cards_of_player[j]){
                    swap = cards_of_player[j];
                    cards_of_player[j]=cards_of_player[i];
                    cards_of_player[i]=swap;
                }//end if
            }//end for
        }//end if
        if(i<39 && i>=26){
            let swap=0;
            for(j=38 ; j>=i ; j--){
                if(cards_of_player[i]>cards_of_player[j]){
                    swap = cards_of_player[j];
                    cards_of_player[j]=cards_of_player[i];
                    cards_of_player[i]=swap;
                }//end if
            }//end for
        }//end if
        if(i<=51  && i>=39){
            let swap=0;
            for(j=51 ; j>=i ; j--){
                if(cards_of_player[i]>cards_of_player[j]){
                    swap = cards_of_player[j];
                    cards_of_player[j]=cards_of_player[i];
                    cards_of_player[i]=swap;
                }//end if
            }//end for
        }//end if

    }//end for
    ////console.log('log' ,cards_of_player );
   // console.log(`sort server`,cards_of_player.slice(0,13))
}//end function


function fun_control_game(){
    console.log(`next player ${turn_player}`);
    newSet=false;



        fun_turn_control();
        
  
}

// نوبت دهی به ربات یا بازیکن را نگه می دارد
function fun_turn_control(){
  
        if(cards_played.length%4===0){
            console.log(`turn 256 ${turn_player}`);
            fun_set_turn_logo(turn_player); 
        }    
        // ترتیب نوبت دهی باید عوض شود
        // به گونه ای که بعد از آمدن کارت یک کاربر نوبت به کاربر بعدی داده شود
        // و بعد از رسید به مجموع چهار کارت حساب کتاب شروع شود
       
        if(cards_played.length!==sets_played*4)
        {      
              if (turn_player!==1){
                console.log(`turn [${turn_player}]  to play`)
                fun_lock_user_player(true);
            //    fun_lock_user_bot(false);
               const time= cards_played.length+1%5 ===0 && cards_played.length+1 >4 ? timeBotTurn*2 : timeBotTurn;
                setTimeout(function (){fun_lock_user_bot(false);},time);
            }else{
                play_event_turn();
                fun_lock_user_player(false);
                fun_lock_user_bot(true);
            }
        }
     //   //console.log(`len cards played ${cards_played.length}`)
        // 789
        // باید منتظر بماند بازیکن ها کارت های خود را بازی کنند
        // بعد کد زیر اجرا شود
        // شرط ایف اگر چهارتا کارت بازی نشده بود تابع والد صدا زده شود
        // بر اساس کارت های بازی شده حساب کند چه کسی برنده شده است و نوبت را به او دهد
        // || cards_played.length!==(sets_played*4)
        let rtrn =0;
        if(cards_played.length%4===0 && cards_played.length>3 && cards_played.length===sets_played*4 ){
           // turn_player===4 ? turn_player=1 : turn_player+=1;
            console.log(`total card played by hands: ${cards_played.length}`)
            rtrn=fun_cal_winner_of_hand();
            sets_played+=1
            console.log(`set play after cal ${sets_played}`);      
        }
        if(rtrn==1){
            console.log(`hand finish >>>>>>>>>>>>>>>>`);
            cards_played_by=[];
            cards_played=[];
            sets_played=1;
            hokm_set=1;
            cards_of_player =[];
            //console.log(`len card played ${cards_played_by.length}`);
            //console.log(cards_played_by);
            console.log('time');
            sets_win[0]<maxHand && sets_win[1]<maxHand ? newSet=true: 0;
            console.log(`time hide [${timeHideCard}] `);
            setTimeout(function (){hide_cards_desk()},timeHideCard);
  
            fun_show_cards_player();
            console.log(`time start [${timeStartGame}] `);
            setTimeout(function (){fun_start_game()},timeStartGame);
            
        }
       // //console.log(cards_played)
      
   // یا ادامه یا بد
}//end function fun_turn_control

function fun_lock_user_player(val){
    //اگر مقدار صحیح گرفت کاربر قفل می شود
    // اگر مقدار غلط کاربر از قفل خارج می شود
    if(val){
        fun_lock_card_user(true,0);
     
     //   //console.log('user is lock');
    }else{
      
     
      fun_lock_card_user(false,0);
     
        //console.log('user is unlock');
        
      //  fun_wait_user_response()

        
    }
    
   
}//end function fun_lock_user_player

async function fun_wait_user_response(){
    let c = 0;
    let w=20;
    (function loop() {
        if (c++ > 20)
            return;
        setTimeout(function () {
            if (turn_player === 1) {
                loop();
            }
            else {
                c = 20;
            }
        }, 1000);
    })();
    if(turn_player===1 && c===20){
        //console.log('game is finished and player is loose');
    }
    //console.log('user waiting is finished !')
}// end function

function fun_lock_user_bot(val){
    //اگر مقدار صحیح گرفت کاربر قفل می شود
    // اگر مقدار غلط کاربر از قفل خارج می شود
    if(val){
    //    //console.log('bot is lock');
    }else{
        //console.log(`'bot is unlock , user turn'${turn_player}`);
       fun_bot_turn_play()
    }
}//end function fun_lock_user_bot

function fun_bot_turn_play(){
    const min = 13*(turn_player-1);
    const max = 13*turn_player;
  //  //console.log(`min:${min} max:${max} range${max-min}`);
    let hokm_weight_in_hand =0;
    let hokm_count_in_hand=0;
    let card_count_in_hand=0;
    let r=0;
    //console.log(cards_of_player);
   
        // شروع کد تست : انتخاب یک ورق راندوم و نوشتن صفر بجای آن
       
  /*       let rndm =0
        let select_card=0
        while(select_card==0)
        {
            rndm=Math.floor(Math.random() * 13)+min
            select_card =cards_of_player[rndm];
        }//end while
        cards_of_player[rndm]=0;
      //  //console.log(` player : ${turn_player} , card ${select_card} `, `hand:${sets_played}`);
        // پایان کد تست */
    

     
    
    //  قسمت هوش مصنوعی
    select_card=fun_bot_play_hand(min,max);
    console.log(`turn to play ${turn_player} , card select ${select_card}`);
    send_card_fun(turn_player,select_card);
    //setTimeout(send_card_fun(turn_player,select_card), 3000);
    let card_no =0;
    select_card <= 13 ? card_no=select_card.toString()+"♤" : khal =0;
    select_card <= 26 && select_card  > 13 ? card_no=(select_card-13).toString()+"♥️" :0;
    select_card <= 39 && select_card  > 26 ? card_no=(select_card-26).toString()+"♢" :0;
    select_card <= 52 && select_card  > 39 ? card_no=(select_card-39).toString()+"♧" :0;
 
  //console.log(cards_of_player.slice(min,max));
  //console.log(` player : ${turn_player} , card ${card_no} id:${select_card} `, `hand:${sets_played}`);
  let cc=0 ;
  const ccrd = cards_of_player.slice(min,max);
  for(card of ccrd){
      card !==0 ? cc+=1:0;
  }
 
   //درلیست کارت های بازی شده بوسیله ٫ شماره بازیکنی که کارت را انتخاب کرده درج می شود
   cards_played_by.push(turn_player);
   //در کد زیر کارت بازی شده را در لیست با عنوان کارت های بازی شده می گذارد
   cards_played.push(select_card);
   console.log(`last user card played is ${cards_played[((cards_played.length)-1)]} select ${select_card} , by ${cards_played_by[((cards_played_by.length)-1)]} , len ${cards_played.length}`)
   //نوبت را به نفر بعدی می دهد
   turn_player==4 ? turn_player=1 : turn_player+=1;
   console.log(`next player is ${turn_player}`);
    hands_win[0]<7 && hands_win[1]<7 ?  fun_turn_control() :0;
  
}//end function fun_bot_turn_play

function fun_user_turn_play(no){
    turn_player+=1;
    no -=1;
 const card_played_by_user = cards_of_player[no];
 //console.log(cards_of_player.slice(0,13));
 //console.log(`card is select ${card_played_by_user} , no${no}`);
 cards_of_player[no]=0;
 cards_played.push(card_played_by_user);
 cards_played_by.push(1);
 console.log(`next player ${turn_player}`);
 fun_lock_card_user(true , no);
 turn_player=2;
 //console.log(`next player ${turn_player}`);
 console.log(`hokm is ${hokm_set}`);
 fun_lock_card_user(true);
 hands_win[0]<7 && hands_win[1]<7 ?  fun_turn_control() :0;
}




//حساب کتاب برنده دست بازی شده
 function fun_cal_winner_of_hand(){
    ////console.log('fun_cal_winner_of_hand is run');
    // (sets_played-1)*4
    //فرمول اول کارت بازی شده هر دست و بازیکن
   let r=0;
   const no= sets_played===1 ?0:((sets_played-1)*4);
   let first_card_hand = cards_played[no];
   let winner_of_hand =cards_played_by[no] ;
   let cut =false;
   let khal =0;
   
   console.log(`first of played is :${cards_played[no]} `);
   console.log(cards_played);
   console.log(sets_played)
    // خال ورق اول بازی را مشخص می کند
    
        first_card_hand <= 13 ? khal =1 : khal =0;
        first_card_hand <= 26 && first_card_hand  > 13 ? khal =2 :0;
        first_card_hand <= 39 && first_card_hand  > 26 ? khal =3 :0;
        first_card_hand <= 52 && first_card_hand  > 39 ? khal =4 :0;
    

   for(i=no ; i<no+4 ; i++){

     // بررسی می کند کارت بازی شده در خال بازی بوده است یا نه
      if(cards_played[i]<=(khal*13) && cards_played[i]>((khal-1)*13)){

          if(first_card_hand <cards_played[i] && 
            !((first_card_hand<=(hokm_set*13) && first_card_hand>((hokm_set-1)*13)))){

            console.log(`cards played i ${cards_played[i]}`);
            console.log(`+++++++++++++ comper , last: ${first_card_hand} , new: ${cards_played[i]} , player${cards_played_by[i]}`)
            first_card_hand=cards_played[i];
            winner_of_hand=cards_played_by[i];
            console.log(`winner is ${cards_played_by[i]}`)
          }//end if
      }//end if
      // بررسی می کند ورق بازی شده در دست حکم بوده یا نه
      if( (cards_played[i]<=(hokm_set*13) && cards_played[i]>((hokm_set-1)*13)) )
      {
          console.log('if hokm comper');
        // اگر ورق نفر اول حکم نبود شرط زیر برقرار است در غیر اینصورت 
        // ورق نفر اول یا نفری در دست کارت حکم بازی کرده پس الس اجرا می شود
        if( !(first_card_hand<=(hokm_set*13) && first_card_hand>((hokm_set-1)*13))){
            console.log('493');
            console.log(cards_played_by[i]);
            first_card_hand=cards_played[i];
            winner_of_hand=cards_played_by[i];
        }else{
            console.log('497');
           //بررسی می کند از کارت اول حکم است یا نه اگر نبود حکم را می ریزد
           // در ورق اول 
           // در شرط بعدی هم اگر شماره ورق با شماره بازیکن یکی بود برنده را 
           if((cards_played[i]<=(hokm_set*13) && cards_played[i]>((hokm_set-1)*13)) &&
            !(first_card_hand<=(hokm_set*13) && first_card_hand>((hokm_set-1)*13)) ){
                console.log('503');
                console.log(cards_played_by[i]);
                first_card_of_hand=cards_played[i];
                winner_of_hand=cards_played_by[i];}
            // بررسی می کند از حکم های موجود کدام بزرگتر است
            console.log(`player[${i}]  card[${cards_played[i]}] ,state[${first_card_hand<=cards_played[i] }] , state2[${(cards_played[i]<=(hokm_set*13) && cards_played[i]>((hokm_set-1)*13))}]  `)
            if(first_card_hand<=cards_played[i] && (cards_played[i]<=(hokm_set*13) && cards_played[i]>((hokm_set-1)*13))  ){
                console.log('508');
                console.log(cards_played_by[i]);
                first_card_hand=cards_played[i];
                winner_of_hand=cards_played_by[i];
            }//end if
        }//end else
      }//end if
   }//end for

   if(winner_of_hand==1 || winner_of_hand==3){
       hands_win[0]+=1;
       turn_player=winner_of_hand; // به دلیل اینکه نوبت از شماره یک شروع می شود
   }else{
       hands_win[1]+=1;
       turn_player=winner_of_hand;
   }
   console.log(cards_played.slice((cards_played.length-4),(cards_played.length)));
   console.log(cards_played_by.slice((cards_played_by.length-4),(cards_played_by.length)));
  // console.log(`WWWWWinner ${winner_of_hand} , next turn ${turn_player} hands${ hands_win[0]}-${ hands_win[1]}`)
   fun_show_hand_no(`${ hands_win[0]}-${ hands_win[1]}`);
   
   if(hands_win[0]<7 && hands_win[0]<7){
        setTimeout(function () 
        { 
            hide_cards_desk();
            if(hands_win[0]<7 && hands_win[1]<7)        
            {
                    setTimeout(function () { 
                    fun_turn_control();
                    }, timeHideCard);
            }else{
                fun_lock_user_player(true);
            }

        }, timeStartGame);
            console.log(`turn 546 ${turn_player}`);
            fun_set_turn_logo(turn_player);   
   }



   // اعلام بردن یا باختن دست
   let handIsNotFinish=true;
   if(hands_win[0]===7){
    hands_win[1]==0 && (king_player== 2 || king_player==4 ) ? sets_win[0]+=3 :0;
    hands_win[1]==0 && (king_player!= 2 || king_player!=4 ) ? sets_win[0]+=2 :0;
    hands_win[1]!=0 ? sets_win[0]+=1 :0;
    
    handIsNotFinish=false;
    fun_show_point_no(`${ sets_win[0]}-${ sets_win[1]}`);
    fun_show_hand_no(`0-0`);
    king_player === 4 ? king_player=1 :0;
    king_player === 2 ? king_player=3 :0;
    turn_player=king_player;
    console.log(`turn 562 ${turn_player}`);
    fun_set_turn_logo(turn_player); 
    M.toast({html: ''+`${trans('Well done,you win the hand')} 👏`+''});
    r=1;
    //fun_start_game();
   }
   if(hands_win[1]===7){
    hands_win[0]==0 && (king_player== 1 || king_player==3 ) ? sets_win[1]+=3 :0;
    hands_win[0]==0 && (king_player!= 1 || king_player!=3 ) ? sets_win[1]+=2 :0;
    hands_win[0]!=0 ? sets_win[1]+=1 :0;
    
    king_player ===1 || king_player===3 ? king_player +=1 :0;
    turn_player=king_player;
    console.log(`turn 572 ${turn_player}`);
    fun_set_turn_logo(turn_player);
    handIsNotFinish=false;
    fun_show_point_no(`${ sets_win[0]}-${ sets_win[1]}`);
    fun_show_hand_no(`0-0`);
    M.toast({html: ''+`${trans('You loose the hand')} 😕`+''});
    r=1;
   // fun_start_game();
   }
 

   /*  // اگر نفر بعدی بازیکن نبود
    // بازی تمام نشده بود
   if(turn_player!==1 && handIsNotFinish){
       hide_cards_desk();
       fun_lock_user_bot(false);
       fun_lock_user_player(true);


    }
    if(turn_player===1 && handIsNotFinish){
        const fun=()=>{
            console.log('function is run');
            hide_cards_desk();
            fun_lock_user_bot(false);
            fun_lock_user_player(true);
        }
        setTimeout(fun(), 5000);
        
    } 
 */
   return r;
}//end function of fun_cal_winner_of_hand
//تابع اگر اولین بازیکن شروع دست باشد

function fun_bot_play_hand(min,max){
    console.log(`[debug]==============================================>`,cards_played)
    // console.log(cards_of_player);

   
     let partner_no=0;
     turn_player===4 ? partner_no==2 : partner_no=turn_player+2;
     partner_no===5 ? partner_no=1:0;
    //hokm_set خال عددی حکم 1 2 3 4

 let hokm_weight_in_hand =0; // مجموع وزن حکم ها
 let hokm_count_in_hand=0; // تعداد حکم ها
 let card_count_in_hand=0; // تعداد کارت های موجود
 let card_selected=0; // کارت انتخابی
 let select_card_set=[0,0,0,0];
 let big_card_set_of_player=[0,0,0,0];// بزرگترین کارت هر ست
 let small_card_set_of_player=[0,0,0,0];// بزرگترین کارت هر ست
 let count_card_set_of_player=[0,0,0,0];// تعداد کارت هر ست
 let count_card_of_set_is_played=[0,0,0,0];// تعداد کارت های بازی شده هر ست
 let partner_card_played =[0];
 let _cards =[[],[],[],[]];
 let _cards_played =[[],[],[],[]];
 let _cards_played_by =[[],[],[],[]];
 let c_p =4 ; // تعداد بازیکنانن
     //بررسی می کند اولین کارت دست را باید باید یا خیر
     let first_card_of_hand=false;
     cards_played.length%c_p===0 || cards_played.length===0 ? first_card_of_hand=true : first_card_of_hand=false;
 console.log(`first hand is ${first_card_of_hand}`);
 // بزرگترین و کوچکترین کارت هر خال را انتخاب می کند و در متغییر
 //small_card_set_of_player وbig_card_set_of_player ذخیره می کند

 //console.log(big_card_set_of_player,`big`);
 //console.log(small_card_set_of_player,`small`);
 for(let i=0 ;i<4; i++){
     let sort_card = _cards[i];
     for( s in sort_card){            
         if( s+1<sort_card.length && sort_card[s]<sort_card[s+1]){
             let swap =sort_card[s];
             sort_card[s] = sort_card[s+1];
             sort_card[s] = swap;
         }
     }
     _cards[i] =sort_card;
 }
 for(j=0 ; j<4 ; j++){
     /*     if(big_card_set_of_player[j]===12 ||big_card_set_of_player[j]===25 
         || big_card_set_of_player[j]===38 || big_card_set_of_player[j]===52) */
         if(true)
         {
             //شرایط انتخاب حکم
             if(big_card_set_of_player[j]>((hokm_set)*13) && (hokm_count_in_hand<3 || hokm_count_in_hand>3)){
                 card_selected=big_card_set_of_player[j];
             }//end if
             let count_w =0;
             
                 let khal_of_card=j+1;
                 big_card_set_of_player[j]>0  && big_card_set_of_player[j]>=13 ? khal_of_card=1:0;
                 big_card_set_of_player[j]>13 && big_card_set_of_player[j]>=26 ? khal_of_card=2:0;
                 big_card_set_of_player[j]>26 && big_card_set_of_player[j]>=39 ? khal_of_card=3:0;
                 big_card_set_of_player[j]>39 && big_card_set_of_player[j]>=52 ? khal_of_card=4:0;
                 //console.log(`khal of card: ${khal_of_card} card big ${big_card_set_of_player[j]}`)
                 //console.log(`count cards played ${cards_played.length}`)
             for(let t=0 ; t<cards_played.length ; t++){

                 if( (big_card_set_of_player[j]>(khal_of_card-1)*13) && (big_card_set_of_player[j]<(khal_of_card*13)) ){
                     count_card_of_set_is_played[khal_of_card-1]+=1;
                     //console.log(`khal ${khal_of_card} card played:`,count_card_of_set_is_played[khal_of_card-1]);
                      // تعداد خالهای بازی شده یا را نگه می دارد
                     cards_played_by[t]===partner_no ? partner_card_played[j]+=1 :0; 
                    
                     if(big_card_set_of_player[j]<cards_played[t]){
                         
                          count_w!==0 ?count_w +=1:0;//تعداد کارت های بزرگتر بازی شده را می شمارد
                          //console.log(`khal count ${count_w}`)
                     }//end if
                 } //end if
             }//end for t
             //  اگر تعداد خال موجود در دست کمتراز مجموع کارت های بازی شده و مانده باشد
             if(count_card_set_of_player[j]<((khal_of_card*13)-count_w) || cards_played.length>44){
                 
                 //if()شرط بریده شدن در دست قبل
                 // اگر تعداد کارتهای در دست بعلاه مجموع 
                 //console.log(`count_card_of_set_is_played ${count_card_of_set_is_played[khal_of_card-1]} , khal : ${(khal_of_card-1)}`);
                
                 
                 //console.log(`count ${count_card_set_of_player[khal_of_card-1]+count_card_of_set_is_played[khal_of_card-1]}`);
                 if(count_card_set_of_player[khal_of_card-1]+count_card_of_set_is_played[khal_of_card-1] <10) 
                 {
                     
                     select_card_set[j]=0;
                     if(count_w%4!==0 || count_w>4){ // اگر چهار نفر در بازی های قبل حداقل یک نفر نداشته است
                         //console.log(`count w ${count_w}`);
                         if(Math.floor(count_w/4)<3 && partner_card_played[j]%2!==0){ 
                             //اگر در دو دست گذشته شریکت رد یا بریده باشد
                             //کوچکترین کارت را بازی کن
                             select_card_set[j]=small_card_set_of_player[j];
                         }
                     }else{
                         //console.log('else count_w%4!==0',count_w,count_w%4);
                         // اگر در دسته قبلی همه کارت داشته باشند
                         select_card_set[j]=big_card_set_of_player[j];
                         //console.log(`last else,select card: ${select_card_set[j]}`);

                     }
                 }
                 //اگر همه حکم ها دست بقیه رفته بود بزرگترین کارت را بیا
                 if(((count_card_set_of_player[khal_of_card-1]+count_card_of_set_is_played[khal_of_card-1] >10) 
                 && (count_card_set_of_player[hokm_set-1]+count_card_of_set_is_played[hokm_set-1]===13 ))
                 || cards_played.length===43 ){
                     //console.log(`اگر همه حکم ها دست بقیه رفته بود بزرگترین کارت را بیا`)
                     select_card_set[j]=big_card_set_of_player[j];
                 }
             }
         }//end if
 }//end for  j

 for(let c in cards_played){

     if(cards_played[c]>0 &&cards_played[c]<=13 ){
         _cards_played[0].push(cards_played[c]);
         _cards_played_by[0].push(cards_played_by[c]);
     }else if (cards_played[c]>13 &&cards_played[c]<=26){
         _cards_played[1].push(cards_played[c]);
         _cards_played_by[1].push(cards_played_by[c]);
     }else if (cards_played[c]>26 &&cards_played[c]<=39){
         _cards_played[2].push(cards_played[c]);
         _cards_played_by[2].push(cards_played_by[c]);
     }else {
         _cards_played[3].push(cards_played[c]);
         _cards_played_by[3].push(cards_played_by[c]);
     }
 }
console.log(`_cards [${_cards[1].length}]`);
 for(i=min ; i<max ; i++){
     
     cards_of_player[i] !==0  ? card_count_in_hand+=1 : 1; // تعداد کارت های موجود را می شمارد      
     if(cards_of_player[i]>0 && cards_of_player[i]<=13){ // کارت های پیک دست و بزرگترین کارت پیک را می یابد
        
         count_card_set_of_player[0]+=1;
         _cards[0].push(cards_of_player[i]);

         
     }
     if(cards_of_player[i]>13 && cards_of_player[i]<=26){ // کارت های دل دست و بزرگترین کارت دل را می یابد
         count_card_set_of_player[1]+=1;
         _cards[1].push(cards_of_player[i]);

     }
     if(cards_of_player[i]>26 && cards_of_player[i]<=39){ // کارت های خشت دست و بزرگترین کارت خشت را می یابد
         count_card_set_of_player[2]+=1;
         _cards[2].push(cards_of_player[i]);

     }
     if(cards_of_player[i]>39 && cards_of_player[i]<=52){ // کارت های گیشنیز دست و بزرگترین کارت گیشنیز را می یابد
         count_card_set_of_player[3]+=1;
         _cards[3].push(cards_of_player[i]);

     }
     // بررسی کارت های حکم
 if((cards_of_player[i] > (hokm_set-1)*13 ) && cards_of_player[i]<=hokm_set*13 ){
         hokm_count_in_hand+=1; // تعداد کارت های جکم موجود در دست را حساب می کند
         hokm_weight_in_hand = (cards_of_player[i]-((hokm_set-1)*13 )); // جمع وزنی کارت های حکم را حساب می کند
     }//end if 
 }//end for


 if(first_card_of_hand){
    console.log(`[debug] first_card_of_hand`);
     //بازی کن نفر اول هر دست
     let big_card=0;
     let khal_big_card=1;
     for(let t=0 ; t<4 ; t++){
        console.log(`[debug] 790 for t:[${t}] [${big_card==0}] [${big_card}]`);
         //بزرگترین کارت هر خال را بازی می کند
         khal_big_card = (t+1) *13;
        if( big_card==0){
            console.log(`[debug] 794 if t:[${t}]`);
             // اگر تکش را داشت
             const lastindx = _cards[t].length !=0 ? _cards[t].length-1 : 0 ;
             console.log(`khal_big_Card [${khal_big_card}] `);
             
            khal_big_card ==_cards[t][lastindx] && t!=hokm_set-1 && big_card==0 ? big_card=_cards[t][lastindx] :0
            console.log(`khal_big_Card [${khal_big_card}] big_Card[${big_card}] [${_cards[t][lastindx]}] [${khal_big_card ==_cards[t][lastindx]}]`);
           if(cards_played.length<c_p){
            console.log(`[debug] 800 cards_played.length<2[${cards_played.length}]`);
               // اگر دست اول بود
               
               
              
               
               if(t==3 && big_card==0){
                console.log(`[debug] 807 t==3 && big_card==0[${t}]`);
                   //اگر شاه خالی را دارد                 
                   let ed= _cards[0].length !=0 ? _cards[0].length-1 : 0 ;
                   _cards[0][ed] == 12 && ed>0  &&   1!=hokm_set ? big_card=_cards[0][0] :0;

                   ed= (_cards[1].length) !=0 ? _cards[1].length-1 : 0 ;
                   _cards[1][ed] == 25 && ed>0  &&   2!=hokm_set && big_card==0 ? big_card=_cards[1][0] :0;

                   ed= (_cards[2].length) !=0 ? _cards[2].length-1 : 0 ;
                   _cards[2][ed] == 38 && ed>0  &&   3!=hokm_set && big_card==0 ? big_card=_cards[2][0] :0;

                   ed= (_cards[3].length) !=0 ? _cards[3].length-1 : 0 ;
                   _cards[3][ed] == 51 && ed>0  &&   4!=hokm_set && big_card==0 ? big_card=_cards[3][0] :0;
                   if(big_card==0){
                       // اگر شاهی نداشت ورقی بیاد که کمترین دست را ارد
                     ed= (_cards[0].length) !=0 ? _cards[0].length-1 : 0 
                     let minc = _cards[0].length ;
                      1!=hokm_set ? big_card= _cards[0][0] : 0;

                     ed= (_cards[1].length)!=0 ? _cards[1].length-1 : 0                   
                      2!=hokm_set && ed+1<minc && big_card==0  ? big_card=_cards[1][0] : 0;
                     minc = _cards[1].length ;

                     ed= (_cards[2].length)!=0 ? _cards[2].length-1 : 0                       
                     3!=hokm_set && ed+1<minc && big_card==0  ? big_card= _cards[2][0] : 0;
                     minc = _cards[2].length ;

                     ed= (_cards[3].length)!=0 ? _cards[3].length-1 : 0                         
                     4!=hokm_set && ed+1<minc && big_card==0  ? big_card= _cards[3][0] : 0;                        

                   }

                   console.log(`[debug] 839 t==3 && big_card==0 bigCards[${big_card}]`);
               }

           }else{
              console.log(`[debug] 843 else[${t}]`);
               // اگر دست دوم به بالا بود 
               const lastindx = _cards[t].length !=0 ? _cards[t].length-1 : 0 ;
               const candiated_card = _cards[t][lastindx];
               // بزرگترین کارتی که در دست دارد انتخاب می کند
               // با کارت های قبلی مقایسه کند
               // اگر کمتر از سه دست بازی شده بود کارت را انتخاب کند
               const cards_ckeck_played = khal_big_card-candiated_card ;
               let card_played_count=0;                                   
               for(let h=0 ; h<_cards_played[t].length ; h++){
                   
                       card_played_count += candiated_card< _cards_played[t][h] &&   _cards_played[t][h]<=khal_big_card  ? 1 :0;
                   
               }
               card_played_count==cards_ckeck_played ? big_card = candiated_card :0;
               console.log(`[debug] 858 card_played_count[${card_played_count}] big_card[${big_card}]`);
               if(big_card==0){
                console.log(`[debug] 860 big_card[${big_card}]`);
                   // اگر کارت سری نداشت
                   //   یا رد کرده دست های قبل را نگاه کند ببیند شریکش کجا بریده 
                 
                   let khal_c =0;
                   let khal_partner =-1;
                   for(let i =0 ; i<cards_played.length ; i++) {
                    console.log(`[debug] 867  for i:[${i}]`);
                       if((i==0 || i%c_p==0) && cards_played_by[i]!=partner_no && khal_partner==-1){

                        console.log(`[debug] 869 if[${(i==0 || i%c_p==0) && cards_played_by[i]!=partner_no && khal_partner==-1}]  i==0 || i%c_p==0[${i==0 || i%c_p==0}] cards_played_by[i]!=partner_no[${cards_played_by[i]!=partner_no}]  khal_partner==-1[${khal_partner==-1}]`);

                             khal_c = Math.ceil((cards_played[i])/13);
                       }else if(cards_played_by[i]==partner_no && khal_partner==-1){
                        console.log(`[debug] 874  else if[${cards_played_by[i]==partner_no && khal_partner==-1}] cards_played_by[i]==partner_no[${cards_played_by[i]==partner_no}]  khal_partner==-1[${ khal_partner==-1}] `);
                         khal_partner = khal_c != Math.ceil((cards_played[i])/13) && khal_c!=hokm_set-1 ? Math.ceil((cards_played[i])/13) : -1;
                       }
                                   
                   }//end for
                   if(khal_partner!=-1){
                       const x= khal_partner-1;
                       const cindx = (_cards[x].length)!=0 ? _cards[x].length-1 : 0 
                       console.log(`[debug] 884  if khal_partner!=-1 :[${khal_partner}] x[${x}] cindx[${cindx}]`);
                       console.log(`[debug] 886 selected card cindx:[${_cards[x][cindx]}] 0:[${_cards[x][0]}]`);
                     big_card = cindx>0 ? _cards[x][0] :0;
                   }
                   if(big_card==0 && t==3){
                    console.log(`[debug] 886  if big_card==0` , hokm_set);
                     // اگر شاهی نداشت ورقی بیاد که کمترین دست را ارد
                   ed= (_cards[0].length)!=0 ? _cards[0].length-1 : 0 
                  for(let v =0 ; v<4 ;v++){
                    
                    v!= hokm_set && big_card==0 &&  _cards[v].length>0 ? big_card = _cards[v][0] :0;
                    
                    console.log(`[debug]  v:[${v}] hokmset[${hokm_set}] v!= hokm_set:[${v!= hokm_set}] _cards[v].length>0[${_cards[v].length}]  [${_cards[v][0]}] [${v!= hokm_set && big_card==0 &&  _cards[v].length>0 }]`);
                  }
                  big_card==0 ? big_card = _cards[hokm_set][0] :0;
                             
                 } 


                 console.log(`[debug] 912 big_card[${big_card}]`);
               }//end if
             }//end else
           
        }else{
            break;
        }

        console.log(`[debug] 913 big_card[${big_card}]`);
     }
     card_selected=big_card;


 
 }

 //بررسی می کند اگر نفر اول نبود ٬ خال بازی چه چیزی بوده
 if(!first_card_of_hand){
     console.log(`[debug] !first_card_of_hand`);
     card_selected=0;
     let hand_no=Math.ceil(cards_played.length/c_p)>0 ?Math.ceil(cards_played.length/c_p) :1;
     const first_card_indx =(hand_no-1)*c_p;
     const first_card_ =cards_played[first_card_indx];
     const first_card_khal =Math.ceil(first_card_/13);
     let big_card=0;
     const row_khal = first_card_khal-1;
     const t= row_khal;
     console.log(`910 [${row_khal}] , [${first_card_khal}] , [${Math.ceil(first_card_/4)}] , ${hand_no}`,cards_played,_cards[row_khal].length);
     if(_cards[row_khal].length>0){
        console.log(`[debug] _cards[row_khal].length[${_cards[row_khal].length}]`);
           // اگر آن خال را داشت
         const lastindx = _cards[row_khal].length!=0 ? _cards[row_khal].length-1 :0; // ایندکس آخرین ورق در خال در دست بازیکن نگه می دارد          
         if(hand_no==1){
            console.log(`[debug] hand_no[${hand_no}]`);
            let hokm_exist =0
             // اگر دست اول بود
             if(c_p==4){
                for(let i=0 ; i<cards_played.length ; i++){
                    cards_played[i]<=hokm_set*13 && cards_played[i]>(hokm_set-1)*13 ? hokm_exist+=1 :0;
                }

             }
             //اگر تکش داشت
            big_card= _cards[row_khal][lastindx]>first_card_ &&   _cards[row_khal][lastindx] == first_card_khal*13 && hokm_exist==0?  _cards[row_khal][lastindx] :0;
            if(big_card==0){
                console.log(`[debug] 99`);
                // اگر تک نداشت
                const lind=cards_played.length-1;
                big_card=lastindx<3 && _cards[row_khal][1] < (first_card_khal*11) && _cards[row_khal][1]>cards_played[first_card_indx] && _cards[row_khal][1]>cards_played[lind] ? _cards[row_khal][1] :99;
                big_card==99 && lastindx<3 && _cards[row_khal][2] < (first_card_khal*13)-2 && _cards[row_khal][2]>cards_played[first_card_indx] && _cards[row_khal][2]>cards_played[lind] ?big_card= _cards[row_khal][2] :0;
                big_card==99 ? big_card= _cards[row_khal][0] :0;
            
            }
           
         }else{
            console.log(`[debug] hand_no[${hand_no}]`);
             
             const candiated_card = _cards[row_khal][lastindx];
             console.log(`[debug] hand_no[${candiated_card}]`);
             // بزرگترین کارتی که در دست دارد انتخاب می کند
             // با کارت های قبلی مقایسه کند
             // اگر کمتر از سه دست بازی شده بود کارت را انتخاب کند
             const cards_ckeck_played = (first_card_khal*13)-candiated_card ;
             let card_played_count=0;     
             console.log(`[debug] 966 [${candiated_card}] [${(first_card_khal)*13}]`);
             //big_card = candiated_card==(first_card_khal)*13 ? candiated_card :0; */                
            if(big_card==0){ 
                for(let h=0 ; h<_cards_played[row_khal].length ; h++){
                 
                     card_played_count += candiated_card< _cards_played[row_khal][h]  &&   _cards_played[t][h]<=first_card_khal*13  ? 1 :0;
                 
             }
             //اگر بازی دست توسط شریک باشد و بزرگترین کارت را آمده
             // کوچکترین کارت بازی کند
             big_card = cards_played_by[first_card_indx]==partner_no &&  (cards_played[first_card_indx]+card_played_count+1>=candiated_card) ?  _cards[t][0] :0;
             console.log(`[debug] 996 [${candiated_card}] [${(first_card_khal)*13}] [${cards_played_by[first_card_indx]==partner_no}] [${cards_played[first_card_indx]+card_played_count == ((first_card_khal*13))}]  [${cards_played[first_card_indx]+card_played_count }]  [${first_card_khal*13 }]   [${first_card_khal}]  [${cards_played[first_card_indx]==first_card_khal*12 && candiated_card==first_card_khal*13}] [${cards_played[first_card_indx]==first_card_khal*12}] [${cards_played[first_card_indx]==first_card_khal*12}]    [${big_card}]`)
              big_card==0 &&  card_played_count==cards_ckeck_played ? big_card=candiated_card :0;
             console.log(`[debug] 979  [${cards_ckeck_played==card_played_count}] [${big_card==0 }] [${card_played_count ==cards_ckeck_played   ? candiated_card :0}] [${big_card}]`)
             console.log(`[debug] 966 candiated_card[${big_card}]`)
             // اگر بازیکن اول شریکش نبوده و نفر آخر بازی هست
             if(c_p==4 && big_card==0 && (hand_no*3)==cards_played.length){
                const lastindxPlyed = cards_played.length-1;
                let en_card = cards_played[lastindxPlyed] ;
                let pl_card =cards_played_by[lastindxPlyed];
                
                 for(let i =lastindxPlyed ; first_card_indx<=i ; i--){
                    console.log(`first[${first_card_indx}] last[${lastindxPlyed}] i[${i}]`);
                    en_card <cards_played[i] ?  en_card =cards_played[i] :0;
                    pl_card <cards_played_by[i] ?  pl_card =cards_played_by[i] :0;
                } 
                const bflastindx = lastindx>2 ? lastindx-1 :0;
                big_card =  pl_card!=partner_no && en_card<_cards[row_khal][bflastindx] ? _cards[row_khal][bflastindx] :0

             }
             console.log(`[debug] 966 996 candiated_card[${big_card}]`)
             big_card==0 ?   big_card=_cards[t][0] :0;
            }
         }
     }else{
         // اگر آن خال را نداشت
         if(cards_played_by[first_card_indx]==partner_no){

            console.log(`[debug] 957  cards_played_by[first_card_indx]==partner_no[${cards_played_by[first_card_indx]}] == [${partner_no}]`);
             // اگر کارت شریک بود
             let card_played_count=0;
             let count_card=0;
             for(let h=0 ; h<_cards_played[t].length ; h++){
                 card_played_count += cards_played_by[first_card_indx]< _cards_played[t][h]  &&   _cards_played[t][h]<=first_card_khal*13  ? 1 :0;
                 count_card += _cards_played[t][h]> (row_khal)*13 && _cards_played[t][h]<= (first_card_khal)*13 ? 1 :0;
                 console.log(`[debug] 962  [${count_card}]  [${ _cards_played[t][h]> (row_khal)*13}] [${ _cards_played[t][h]<= (first_card_khal)*13 }] _cards_played[t][h]:[${_cards_played[t][h]}] (first_card_khal)*13[${(first_card_khal)*13}] (row_khal)*13[${(row_khal)*13}]`);
             
              }
                const lastindx = (_cards[row_khal].length);
                const candiated_card = _cards[row_khal][lastindx];
                const cards_ckeck_played = (first_card_khal*13)-candiated_card ;
                 
     
              if(count_card>8 || card_played_count==cards_ckeck_played){
                let card_select = _cards[hokm_set-1][0]
                let other_hokm = 0;
                for(let i = first_card_indx+1 ; cards_played.length > i ; i++){
                    console.log(`[debug] 972  let i = first_card_indx+1 ; cards_played.length > i ; i++[${i}] == [${cards_played.length}]`);
                 // اگر قبلا کسی در این دست حکم بازی کرده بود
                 if(Math.ceil(cards_played[i]/13) ==hokm_set  && card_select<cards_played[i] &&  cards_played[i]>= hokm_set*13 ){
                    console.log(`[debug] 975 Math.ceil(cards_played[i]) ==hokm_set  && card_select<cards_played[i] && .. [${i}] == [${cards_played.length}]`);
                     other_hokm=cards_played_by[i];
                     card_select=cards_played[i]; 
                 }
                }
                if(other_hokm==0 || other_hokm==partner_no){
                    console.log(`[debug] 981  other_hokm==0 || other_hokm==partner_n [${other_hokm}] == [${partner_no}]`);
                 // رد کردن با کارتی که دارد
                 //این قسمت ففط رد می کند منطقی ندارد
                 for(let i=0 ; i<4;i++){
                     _cards[i].length>0  && i!=hokm_set-1 && big_card==0 ?  big_card= _cards[i][0] :0;
                     big_card==0 && i ==3 ? big_card= _cards[hokm_set-1][0] :0;
                 }
                }else{
                    
                 for(let i in _cards[hokm_set-1]){
                    console.log(`[debug] 990  let i in _cards[hokm_set-1] [${i}]  [${_cards[hokm_set-1][i]}]`);
                     // یک درجه بزرگتر انتخاب می کند برای بریدن
                     if(_cards[hokm_set-1][i]> card_select){
                         big_card = _cards[hokm_set-1][i];
                         break;
                     }
                 }

                }
              }else{
                console.log(`[debug] 1000  else `);
                               // رد کردن با کارتی که دارد
                 //این قسمت ففط رد می کند منطقی ندارد
                 for(let i=0 ; i<4;i++){
                    _cards[i].length>0 && big_card==0 && ((_cards[i][0]!=i*13 && _cards[i][0]!=(i*13)-1) || i==3 )  ? big_card=_cards[i][0] :0
                 }
              }

         }else{
            console.log(`[debug] 1010  else `);
             big_card = _cards[hokm_set-1].length>0 &&   _cards[hokm_set-1][0]<hokm_set*12 ?   _cards[hokm_set-1][0] :0;
             big_card==0 &&  _cards[hokm_set-1].length>0 && hand_no>6 ?  big_card= _cards[hokm_set-1][0] :0;
             console.log(`[debug] 1000  big_card[${big_card}] `);
             if(big_card==0){
                 for(let i=0 ; i<4;i++){
                      _cards[i].length>0 && big_card==0 && ((_cards[i][0]!=i*13 && _cards[i][0]!=(i*13)-1) || i==3 )? big_card= _cards[i][0] :0
                 }
                 console.log(`[debug] 1017  big_card[${big_card}] `);
             }

         }
     }
               

         
     card_selected = big_card;


 }//end if !first_card_of_hand

 console.log(`sort`,_cards);
 console.log(`sort`,_cards_played_by);
 console.log(`sort`,_cards_played);
 //کارت انتخاب شده را از لیست کارت ها حذف می کند
 const t = cards_of_player.indexOf(card_selected);
 console.log(`[debug] select v :${card_selected} card v:${cards_of_player[t]} `)
 cards_of_player[t] = 0;
 console.log(`[debug] select v :${card_selected} card v:${cards_of_player[t]} `)
 ////console.log(`card_selected: ${card_selected}`)

 return card_selected;

} //end function fun_bot_play_hand
