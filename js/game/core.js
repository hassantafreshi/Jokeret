
//timeTurn= Number(localStorage.getItem('timeTurn'))>0 && Number(localStorage.getItem('timeTurn'))<30000  ? Number(localStorage.getItem('timeTurn')):1500;

// نمایش هر دست
function fun_show_hand_to_single_player(v,cards){
    
    // اگر حاکم بود پنج ورق اول را نمایش دهد
    console.log(`[789] fun_show_hand_to_single_player , card count: ${cards.length} v ${v}`);
   // console.log(`king card`,cards);
    //console.log(cards);
    if(v===0){ // اگر حاکم نبود
       
        
        for (i=0 ; i<13 ;i++)
        {  
          //console.log('run');
            for(j=12 ; j>=i ; j--){
                let swap=0;
                if(cards[j]<cards[i]){
                    swap = cards[j];
                    cards[j]=cards[i];
                    cards[i]=swap;
                }//end if
            }//end for
        }
        for(let i=0 ; i<13 ; i++ ){
            const r= fun_card_image_name(cards[i]);
            document.getElementById(`card-desk-${(i+1)}`).src=r

        }//end for
    }
    if(v===1){ // جاکم است 
       // cards_l=cards;
        for(let i=0 ; i<5 ; i++ ){
          console.log(`[789] fun_show_hand_to_single_player ,if hukm (for), next =>fun_card_image_name`);
            const r= fun_card_image_name(cards[i]);
            document.getElementById(`card-desk-${(i+1)}`).src=r;
            console.log(`[789] fun_show_hand_to_single_player ,if hukm (for), fun_card_image_name => after`);
        }//end for
        //fun_set_king_logo(1);
        fun_show_modal_hokm();
        // ربات انتخاب حکم توسط
        /* setTimeout((
          )=>{
            console.log(`[789] time is out hukm => cal function to server`);
            fun_timeisup_hokm();
          },15000); */
    }

    if(v===2){ // بازیکن و بازی شروع شده
        //console.log(`show list 2`);
     /*    for(let i=5 ; i<13 ; i++ ){
            const r= fun_card_image_name(cards[i]);
            document.getElementById(`card-desk-${(i+1)}`).src=r

        }//end for */
        for (i=0 ; i<13 ;i++)
        {  
            for(j=12 ; j>=i ; j--){
                let swap=0;
                if(cards_l[j]<cards_l[i]){
                    swap = cards_l[j];
                    cards_l[j]=cards_l[i];
                    cards_l[i]=swap;
                }//end if
            }//end for
        }
        for(let i=0 ; i<13 ; i++ ){
            const r= fun_card_image_name(cards[i]);
            document.getElementById(`card-desk-${(i+1)}`).src=r

        }//end for
        //console.log(`sort client`,cards_l);
    }
    // اگر حاکم نبود و بازی شروع نشده بود
    if(v==8){ // جاکم نیست و بازی شروع نشده
      let r=`/img/cards/Card_back.svg`
      for (i=0 ; i<13 ;i++)
      {  
        //console.log('run');
          for(j=12 ; j>=i ; j--){
              let swap=0;
              if(cards[j]<cards[i]){
                  swap = cards[j];
                  cards[j]=cards[i];
                  cards[i]=swap;
              }//end if
          }//end for
      }
      for(let i=0 ; i<13 ; i++ ){         
          document.getElementById(`card-desk-${(i+1)}`).src=r;

      }//end for
    }
    if(v===9){// بازیکن و بازی شروع شده بعد از قطعی

/*       for(i=0;i<13;i++){
        if(cards[i]==0 && i!==12){
          
          cards[i]=cards[i+1]
          i<13 ? cards[i+1]=0:0
        
        }
      } */
/*       for (i=0 ; i<13 ;i++)
      {  
        //console.log('run');
          for(j=12 ; j>=i ; j--){
              let swap=0;
              if(cards[j]<cards[i]){
                  swap = cards[j];
                  cards[j]=cards[i];
                  cards[i]=swap;
              }//end if
          }//end for
      } */
      console.log('[625]',cards);
      for(let i=0 ; i<cards.length ; i++ ){
        
        if(cards[i]!=0){
          const r= fun_card_image_name(cards[i]);          
          document.getElementById(`card-desk-${(i+1)}`).src=r
        }else{
          console.log( cards[i] ,i);
          document.querySelector('#card-'+(i+1)).innerHTML='';
       
        }
          

      }//end for
  }
}// end function fun_show_hand_to_single_player


  // اعلان حکم
  function fun_hokm_is(val){
    console.log(`hokm is ${val} un_hokm_is`);
    let hokm_icon =''
    val==1 ? hokm_icon='♠️' :0;
    val==2 ? hokm_icon='♥️' :0;
    val==3 ? hokm_icon='♦️' :0;
    val==4 ? hokm_icon='♣️' :0;
    document.getElementById("hokm-show").innerText =hokm_icon;
    'hokm-show'
    //console.log(`hokm is ${val}`);
    M.toast({html: `${trans('hokm')}: ${hokm_icon}`})
   // fun_event_hokm_is(val);
    hokm_set=val;
    hokm_is=hokm_icon;
    
   // king_player===1 ?fun_show_hand_to_single_player(2,cards_l):0;
  }



  // ست کردن تاج به حاکم
  function fun_set_king_logo(val){
    console.log(`[789] fun_set_king_logo`);
    const id='king-player-seat-'+val;
    if(playerCount==4){
     
      val ===1  ? document.getElementById('king-player-seat-'+4).innerText='' :document.getElementById('king-player-seat-'+(val-1)).innerText='' ; 
     
    }else{
      document.getElementById('king-player-seat-1').innerText=''
      document.getElementById('king-player-seat-3').innerText=''     
    }
    document.getElementById(id).innerText='👑';

    //king-player-seat-4
  }
 // ست کردن نوبت 
  function fun_set_turn_logo(val){    
    
    document.getElementById('turn-player-1').innerText ? document.getElementById('turn-player-1').innerText='' :0;
    document.getElementById('turn-player-2').innerText ? document.getElementById('turn-player-2').innerText='' :0;
    document.getElementById('turn-player-3').innerText ? document.getElementById('turn-player-3').innerText='' :0;
    document.getElementById('turn-player-4').innerText ? document.getElementById('turn-player-4').innerText='' :0;
    if(playerCount==4){
      document.getElementById('turn-player-'+val) ? document.getElementById('turn-player-'+val).innerText='🔴' :0;
    }else{
      console.log(val ,mySeat )
      val===mySeat ? document.getElementById('turn-player-1').innerText='🔴' : document.getElementById('turn-player-3').innerText='🔴';
      
    }
    //king-player-seat-4
  }

  // نمایش پنجره انتخاب حکم
  function fun_show_modal_hokm(){
    console.log(`[789] fun_show_modal_hokm`);
    //console.log(`function hokm is run`);
    const elem = document.getElementById('hokm_is');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.open();

  }


//آدرس هر کارت را تنظیم می کند
function fun_card_image_name(card)
{
  
    let r = '0';
        if(0<card && card<=13){
        //    //console.log(`no ${card} , >13`);
            card===13 ? r='AS':0;
            card===12 ? r='KS':0;
            card===11 ? r='QS':0;
            card===10 ? r='JS':0;
            card<10 ? r=`${(card+1)}S`:0;
        }
        if(13<card && card<=26){
        //    //console.log(`no ${card} , >27`);
            card===26 ? r='AH':0;
            card===25 ? r='KH':0;
            card===24 ? r='QH':0;
            card===23 ? r='JH':0;
            card<23 ? r=`${((card-12))}H`:0;
        }
        if(26<card && card<=39){
       //     //console.log(`no ${card} , >39`);
            card===39 ? r='AD':0;
            card===38 ? r='KD':0;
            card===37 ? r='QD':0;
            card===36 ? r='JD':0;
            card<36 ? r=`${((card-25))}D`:0;
        }
        if(39<card && card<=52){
        //    //console.log(`no ${card} , >52`);
            card===52 ? r='AC':0;
            card===51 ? r='KC':0;
            card===50 ? r='QC':0;
            card===49 ? r='JC':0;
            card<49 ? r=`${((card-38))}C`:0;
        }
        r=`/img/cards/${r}.svg`;
      //  //console.log(`cards ui : ${r}`);
      console.log(`[789] fun_card_image_name rturn[${r}]`);
    return r;
}  // end function fun_card_image_name


//ارسال کارت انتخابی به میز و سرور
function send_card_fun (noPlayer,i){
    const id = `#card-desk-played-${noPlayer}`;
    //console.log(`card ${i} select , id ${id}`);
    let card='';
    if(noPlayer==1){
        // اگر بازیکن باشد
        card= document.querySelector('#card-desk-'+i).src;
        document.querySelector('#card-'+i).innerHTML='';
        fun_lock_card_user(true,0);
      
    }else{
        card =fun_card_image_name(i);
    }
    
    ////console.log(`class lenght: ${classCard.length}`);
    let classCard =document.querySelector('#card-desk-played-1').className;
   // //console.log(`class lenght: ${classCard.length}`);
    classCard = classCard.length >39 ?  classCard.slice(0,39) : classCard;
    const rndm  = Math.floor(Math.random() * 2+1);
   // document.querySelector(id).className =classCard+' zindex-'+rndm;
    document.querySelector(id).src=card;
    noPlayer===1 ?fun_user_turn_play(i):0;
  }//end function send_card_fun
  // تابع قفل کردن کارت های کاربر
  function fun_lock_card_user(val,no){
      ////console.log(`fun_lock_card_user ${val}`)
      // true lock
      //false unlock
      if(val){
          for(var t=1 ; t<14 ; t++){
            let id='btn-card-'+t;
            if(t!==no  && document.getElementById(id) )               
            {   
               
              //  //console.log(`card is lock`,id);
                document.getElementById(id).disabled = true;
            }
          }//end for
      }else{
        for(var t=1 ; t<14 ; t++){
            let id='btn-card-'+t;
            if(t!==no  && document.getElementById(id) )
            { 
                
               // //console.log(`card is unlock`,id);
                document.getElementById(id).disabled =false;
          }
        }
      }
    }//end function



function fun_show_hand_no(val){
    document.getElementById('hand-no').innerHTML=val;
}

function fun_show_point_no(val){
    document.getElementById('point-no').innerHTML=val;
}
// مخفی کردن کارت های نمایش
function hide_cards_desk(){
    //console.log('hide cards desk');
    for(let i=1;i<5;i++){ 
        document.getElementById(`card-desk-played-${i}`).src='/img/cards/0.svg';
    }
   
}


function fun_show_cards_player(){
  console.log('function fun_show_cards_player');
    const classvalue = screen.width>1390 && screen.width<3500 ? "myCard-deck-large" : "myCard-deck";
    temp=`                  
    <div class="row center row-cards-1 " id="row-5">
    <div class="col s1 m1 l1 xl1 cards" id="card-1">
      <button class="game-card-button" id='btn-card-1'  type="submit" onclick="send_card_fun(1,1)">
          <img id='card-desk-1' src="/img/cards/0.svg" class="${classvalue}" alt="submit" >
      </button>
    </div>
    <div class="col s1 m1 l1 xl1 cards" id="card-2">
      <button class="game-card-button" id='btn-card-2'  type="submit" onclick="send_card_fun(1,2)">
          <img id='card-desk-2' src="/img/cards/0.svg" class="${classvalue}" alt="submit" >
      </button>
    </div>
    <div class="col s1 m1 l1 xl1 cards" id="card-3">
      <button class="game-card-button" id='btn-card-3'  type="submit" onclick="send_card_fun(1,3)">
          <img id='card-desk-3' src="/img/cards/0.svg" class="${classvalue}" alt="submit" >
      </button>
    </div>
    <div class="col s1 m1 l1 xl1 cards" id="card-4">
      <button class="game-card-button" id='btn-card-4'   type="submit" onclick="send_card_fun(1,4)">
          <img id='card-desk-4' src="/img/cards/0.svg" class="${classvalue}" alt="submit" >
      </button>
    </div>
    <div class="col s1 m1 l1 xl1 cards" id="card-5">
      <button class="game-card-button" id='btn-card-5'  type="submit" onclick="send_card_fun(1,5)">
          <img id='card-desk-5' src="/img/cards/0.svg" class="${classvalue}" alt="submit" >
      </button>
    </div>
    <div class="col s1 m1 l1 xl1 cards" id="card-6">
      <button class="game-card-button" id='btn-card-6'  type="submit" onclick="send_card_fun(1,6)">
          <img id='card-desk-6' src="/img/cards/0.svg" class="${classvalue}" alt="submit" >
      </button>
    </div>
</div>
<div class=" row center row-cards-2 " id="row-6">
    <div class="col s1 m1 l1 xl1 cards" id="card-7">
      <button class="game-card-button" id='btn-card-7'  type="submit" onclick="send_card_fun(1,7)">
          <img id='card-desk-7' src="/img/cards/0.svg" class="${classvalue}" alt="submit" >
      </button>
    </div>
    <div class="col s1 m1 l1 xl1 cards" id="card-8">
      <button class="game-card-button" id='btn-card-8'  type="submit" onclick="send_card_fun(1,8)">
          <img id='card-desk-8' src="/img/cards/0.svg" class="${classvalue}" alt="submit" >
      </button>
    </div>
    <div class="col s1 m1 l1 xl1 cards" id="card-9">
      <button class="game-card-button" id='btn-card-9'  type="submit" onclick="send_card_fun(1,9)">
          <img id='card-desk-9' src="/img/cards/0.svg" class="${classvalue}" alt="submit" >
      </button>
    </div>

    <div class="col s1 m1 l1 xl1 cards" id="card-10">
      <button class="game-card-button" id='btn-card-10'  type="submit" onclick="send_card_fun(1,10)">
          <img id='card-desk-10' src="/img/cards/0.svg" class="${classvalue}" alt="submit" >
      </button>
    </div>
    <div class="col s1 m1 l1 xl1 cards" id="card-11">
      <button class="game-card-button" id='btn-card-11'  type="submit" onclick="send_card_fun(1,11)">
          <img id='card-desk-11' src="/img/cards/0.svg" class="${classvalue}" alt="submit" >
      </button>
    </div>
    <div class="col s1 m1 l1 xl1 cards" id="card-12">
      <button class="game-card-button" id='btn-card-12'  type="submit" onclick="send_card_fun(1,12)">
          <img id='card-desk-12' src="/img/cards/0.svg" class="${classvalue}" alt="submit" >
      </button>
    </div>
    <div class="col s1 m1 l1 xl1 cards" id="card-13">
      <button class="game-card-button"  id='btn-card-13' type="submit" onclick="send_card_fun(1,13)">
          <img id='card-desk-13' src="/img/cards/0.svg" class="${classvalue}" alt="submit" >
      </button>
    </div>
</div>`;
    document.getElementById(`cardsplayer`).innerHTML=temp;
}


function fun_result_single_game(val){
  const logbox = val ==='win' ? '🏅' : '💤';
  const title = val ==='win' ? 'You Win!' : 'You Loose!';
  const message =  val ==='win' ? 'You played awesome.' : 'Try to win.';
  const expr =  val ==='win' ? +10 : 0;
  const point =  val ==='win' ? +10 : 10;
  document.getElementById(`content`).innerHTML =` <div class=".show-on-large col l3 s1 " algin="center" id="box-left">
 
  </div>
  <div class="container col l6 s10  row " id="container">
          <div class="end-game z-depth-2 teal lighten-5 grey-text  col l6 s12" id="end-game-box">
            <div class="row" id="end-game-box-first-row">
              <div class="col l4 s4 m4 xl4"></div>
              <div class="col l4 s4 m4 xl4 z-depth-1" id="end-game-box-medal">
              <h3 class="center" id="end-game-box-medal-logo">${logbox}<h3>
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
                     <h4 class="center" id="end-game-box-point-box-coin">💰 <span id="end-game-box-point-box-coin-nuumber">${point}</span> </h4>
                   </div>
                   <div class="center col s10 m10 l10 xl10 z-depth-1 " id="end-game-box-point-box-title-box">
                      <h6 class="center" id="end-game-box-point-box-title-box-ex">Experience : <span id="end-game-box-point-box-exp-nuumber">${expr}</span></h6>
                   </div>
                   <a href="#addCoin">
                    <div class="center col s3 m3 l3  xl3 z-depth-2" id="end-game-box-point-box-bg-add-coin">
                      <div class=" material-icons " id="end-game-box-point-box-add-coin"> 
                      add
                      </div>
                    </div>
                   </a>
                  <a href="/pages/${localStorage.getItem('language')}/share.html">
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
        <a href="/pages/single-game.html" >
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
}