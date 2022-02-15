//client side
console.log('chat-roomPub.js is called');





var users;
var mycards=['','','',''];
var cards_num=['','','',''];
var cards_send=[,];
// لیست کاربران را نگه می دارد
var usersList= ['','','',''];
// لیست آدرس کاربران را نگه می دارد
var usersUrl =['','','',''];
// مقدار حکم را نگه می دارد
 
/// 999 این به هیچ وجه پاک نشود متغییر ست حاکم
 var king_set=false;
 var team_=0;
 ;



// تابع قفل کردن ورق ها
function lock_fun()
{
  console.log('Receivelock');
  var i;
  for (i=1;i<14;i++)
  {
    document.getElementById("myBtn"+i).disabled = true;
  }
}// end function lock_fun


// تابع باز کردن ورق ها
function unlock_fun(){
  console.log(' Receiveunlock');
  var i;
  for (i=1;i<14;i++){
    document.getElementById("myBtn"+i).disabled = false;
  }
}// end function unlock

// ورق ها را ست می کند
function set_cards_fun(do_){
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>> The kingis:'+king_set +'  do_:'+do_);
  //789 این قسمت درست شود و به تگ مربوط لینک شود
  let content = document.querySelector('#content');
    //7894
    if(king_set==false && do_==false)
    {
      let temp =`
      <div class="row center " id="row-5">
      <div class="col s1">
        <button class="game-card-button" id="myBtn1" type="submit" onclick="send_card_fun(1)"  >
            <img src="/img/cards/${mycards[0]}.svg"   alt="submit" width="100" />
        </button>
      </div>
      <div class="col s1">
        <button class="game-card-button" id="myBtn2" type="submit" onclick="send_card_fun(2)"  >
            <img src="/img/cards/${mycards[1]}.svg"   alt="submit" width="100" />
        </button>
      </div>
      <div class="col s1">
        <button class="game-card-button" id="myBtn3" type="submit" onclick="send_card_fun(3)"  >
            <img src="/img/cards/${mycards[2]}.svg"   alt="submit" width="100" />
        </button>
      </div>
      <div class="col s1">
        <button class="game-card-button" id="myBtn4" type="submit" onclick="send_card_fun(4)"  >
            <img src="/img/cards/${mycards[3]}.svg"   alt="submit" width="100" />
        </button>
      </div>
      <div class="col s1">
        <button class="game-card-button" id="myBtn5" type="submit" onclick="send_card_fun(5)"  >
            <img src="/img/cards/${mycards[4]}.svg"   alt="submit" width="100" />
        </button>
      </div>
      <div class="col s1">
        <button class="game-card-button" id="myBtn6" type="submit" onclick="send_card_fun(6)"  >
            <img src="/img/cards/${mycards[5]}.svg"   alt="submit" width="100" />
        </button>
      </div>
    </div>
    <div class=" row center" id="row-6">
    <div class="col s1">
      <button class="game-card-button" id="myBtn7" type="submit" onclick="send_card_fun(7)"  >
          <img src="/img/cards/${mycards[6]}.svg"   alt="submit" width="100" />
      </button>
    </div>
    <div class="col s1">
      <button class="game-card-button" id="myBtn8" type="submit" onclick="send_card_fun(8)"  >
          <img src="/img/cards/${mycards[7]}.svg"   alt="submit" width="100" />
      </button>
    </div>
    <div class="col s1">
      <button class="game-card-button" id="myBtn9" type="submit" onclick="send_card_fun(9)"  >
          <img src="/img/cards/${mycards[8]}.svg"   alt="submit" width="100" />
      </button>
    </div>

    <div class="col s1">
      <button class="game-card-button" id="myBtn10" type="submit" onclick="send_card_fun(10)"  >
          <img src="/img/cards/${mycards[9]}.svg"   alt="submit" width="100" />
      </button>
    </div>
    <div class="col s1">
      <button class="game-card-button" id="myBtn11" type="submit" onclick="send_card_fun(11)"  >
          <img src="/img/cards/${mycards[10]}.svg"   alt="submit" width="100" />
      </button>
    </div>
    <div class="col s1">
      <button class="game-card-button" id="myBtn12" type="submit" onclick="send_card_fun(12)"  >
          <img src="/img/cards/${mycards[11]}.svg"   alt="submit" width="100" />
      </button>
    </div>
    <div class="col s1">
      <button class="game-card-button" id="myBtn13" type="submit" onclick="send_card_fun(13)"  >
          <img src="/img/cards/${mycards[12]}.svg"   alt="submit" width="100" />
      </button>
    </div>
    </div>     
    `;
    content.innerHTML =temp;
  
    }

    //قسمت ست کردن ورق برای حاکم
    if(king_set==true && do_==false)
    {
            let temp =`
      <div class="row center " id="row-5">
      <div class="col s1">
        <button class="game-card-button" id="myBtn1" type="submit" onclick="send_card_fun(1)"  >
            <img src="/img/cards/${mycards[0]}.svg"   alt="submit" width="100" />
        </button>
      </div>
      <div class="col s1">
        <button class="game-card-button" id="myBtn2" type="submit" onclick="send_card_fun(2)"  >
            <img src="/img/cards/${mycards[1]}.svg"   alt="submit" width="100" />
        </button>
      </div>
      <div class="col s1">
        <button class="game-card-button" id="myBtn3" type="submit" onclick="send_card_fun(3)"  >
            <img src="/img/cards/${mycards[2]}.svg"   alt="submit" width="100" />
        </button>
      </div>
      <div class="col s1">
        <button class="game-card-button" id="myBtn4" type="submit" onclick="send_card_fun(4)"  >
            <img src="/img/cards/${mycards[3]}.svg"   alt="submit" width="100" />
        </button>
      </div>
      <div class="col s1">
        <button class="game-card-button" id="myBtn5" type="submit" onclick="send_card_fun(5)"  >
            <img src="/img/cards/${mycards[4]}.svg"   alt="submit" width="100" />
        </button>
      </div>
    </div>`;
    content.innerHTML =temp;
   
    }
    if(king_set==true && do_==true)
    {
      let temp =`
      <div class="row center " id="row-5">
      <div class="col s1">
        <button class="game-card-button" id="myBtn1" type="submit" onclick="send_card_fun(1)"  >
            <img src="/img/cards/${mycards[0]}.svg"   alt="submit" width="100" />
        </button>
      </div>
      <div class="col s1">
        <button class="game-card-button" id="myBtn2" type="submit" onclick="send_card_fun(2)"  >
            <img src="/img/cards/${mycards[1]}.svg"   alt="submit" width="100" />
        </button>
      </div>
      <div class="col s1">
        <button class="game-card-button" id="myBtn3" type="submit" onclick="send_card_fun(3)"  >
            <img src="/img/cards/${mycards[2]}.svg"   alt="submit" width="100" />
        </button>
      </div>
      <div class="col s1">
        <button class="game-card-button" id="myBtn4" type="submit" onclick="send_card_fun(4)"  >
            <img src="/img/cards/${mycards[3]}.svg"   alt="submit" width="100" />
        </button>
      </div>
      <div class="col s1">
        <button class="game-card-button" id="myBtn5" type="submit" onclick="send_card_fun(5)"  >
            <img src="/img/cards/${mycards[4]}.svg"   alt="submit" width="100" />
        </button>
      </div>
      <div class="col s1">
        <button class="game-card-button" id="myBtn6" type="submit" onclick="send_card_fun(6)"  >
            <img src="/img/cards/${mycards[5]}.svg"   alt="submit" width="100" />
        </button>
      </div>
    </div>
    <div class=" row center" id="row-6">
    <div class="col s1">
      <button class="game-card-button" id="myBtn7" type="submit" onclick="send_card_fun(7)"  >
          <img src="/img/cards/${mycards[6]}.svg"   alt="submit" width="100" />
      </button>
    </div>
    <div class="col s1">
      <button class="game-card-button" id="myBtn8" type="submit" ="send_card_fun(8)"  >
          <img src="/img/cards/${mycards[7]}.svg"   alt="submit" width="100" />
      </button>
    </div>
    <div class="col s1">
      <button class="game-card-button" id="myBtn9" type="submit" onclick="send_card_fun(9)"  >
          <img src="/img/cards/${mycards[8]}.svg"   alt="submit" width="100" />
      </button>
    </div>

    <div class="col s1">
      <button class="game-card-button" id="myBtn10" type="submit" onclick="send_card_fun(10)"  >
          <img src="/img/cards/${mycards[9]}.svg"   alt="submit" width="100" />
      </button>
    </div>
    <div class="col s1">
      <button class="game-card-button" id="myBtn11" type="submit" onclick="send_card_fun(11)"  >
          <img src="/img/cards/${mycards[10]}.svg"   alt="submit" width="100" />
      </button>
    </div>
    <div class="col s1">
      <button class="game-card-button" id="myBtn12" type="submit" onclick="send_card_fun(12)"  >
          <img src="/img/cards/${mycards[11]}.svg"   alt="submit" width="100" />
      </button>
    </div>
    <div class="col s1">
      <button class="game-card-button" id="myBtn13" type="submit" onclick="send_card_fun(13)"  >
          <img src="/img/cards/${mycards[12]}.svg"   alt="submit" width="100" />
      </button>
    </div>
    </div>     
    `;
    content.innerHTML =temp;
    }
}// end function set_cards_fun

function sortNumber(a, b) {
  return a - b;
}// end function sortNumber

// نمایش خال ها حکم به حاکم برای انتخاب حکم
function hokm_card_show_fun(handler){
 
  // اگر فالس باشد مخفی می کند و اگر صحیح باشد نمایش می دهد
  if (handler==false)
  {
    console.log(`if :hokm_card_show_fun`);
    
    if(document.querySelector('#row-hokm-show')){
      var content =+ document.querySelector('#row-hokm-show');
      content.innerHTML ='';
      document.getElementById('row-hokm-show').style.visibility="hidden";
      document.getElementById("row-hokm-show").remove();
    }

  }else{
    console.log(`else:hokm_card_show_fun`);
            //13 del :: 
          //26 khesht
          //39 pik
          //52 gishniz
  const temp =`
  <div class='row center show-hokm-cards' id='row-hokm-show'>
    <div class="col s1">
      <button class="game-card-button" id="myBtn7" type="submit" onclick="hokm_card_select_fun('gishniz')">
          <img src="/img/cards/AC.svg" alt="submit" width="100">
      </button>
    </div>
    <div class="col s1">
      <button class="game-card-button" id="myBtn8" type="submit" onclick="send_card_fun('khesht')">
          <img src="/img/cards/AD.svg" alt="submit" width="100">
      </button>
    </div>
    <div class="col s1">
      <button class="game-card-button" id="myBtn9" type="submit" onclick="send_card_fun('del')">
          <img src="/img/cards/AH.svg" alt="submit" width="100">
      </button>
    </div>
    <div class="col s1">
    <button class="game-card-button" id="myBtn9" type="submit" onclick="send_card_fun('pik')">
        <img src="/img/cards/AS.svg" alt="submit" width="100">
    </button>
    </div>
  </div>
  `;
  let content = document.querySelector('#content');
  content.innerHTML +=temp;
  }

}// end function hokm_card_show_fun

// انتخاب کننده حکم و ارسال حکم
function hokm_card_select_fun(handler)
{
  //["pik","del","khesht","gishniz"];
  console.log(`hokem hakem : ${handler}`);
  var hokm=0;
          //13 del :: 
          //26 khesht
          //39 pik
          //52 gishniz
           //♥️♧♤♢
  var symb='H'
  switch(handler){
    case 'del':
     hokm=13;
     symb='H';
    break;
    case 'khesht':
     hokm=26;
     symb='D';
    break;
    case 'gishniz':
     hokm=39;
      symb='J';
    break;
    case 'pik':
     hokm=52;
      symb='C';
    break;
  }
    hokm_is= '3mAzzA63:mc';
    hokm_is=hokm_is+hokm;              
        if(hokm_is!='0')
        {
          roomPub.send({ message: hokm_is });
          hokm_do=true;
        }
  console.log('hokm is:'+hokm_is +' ' + symb);
  hokm_is=hokm;
  // کارت های انتخاب حکم مخفی می شود
  hokm_card_show_fun(false);
  // به نمایش کارت می گوید حکم ست شد بقیه رو نمایش بده
  set_cards_fun(hokm_do);
  
}// end function hokm_card_select_fun


// حذف کننده کارت
function remove_card_fun(handlr){
  console.log(handlr);
   var txt="myBtn"+(handlr+1);
   console.log('button is clciked:'+txt);
   document.getElementById(`card-desk-${i}`).src='/img/cards/0.svg';
   document.getElementById(`card-desk-${i}`).onClick="#";
    
   // parent.removeChild(child);
}// end function remove_card_fun

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
    return r;
}  // end function fun_card_image_name

// همه ورق ها را مخفی می کند
function hidden_cards_fun()
{

        document.getElementById('myBtn1').style.visibility = 'hidden';
        document.getElementById('myBtn2').style.visibility = 'hidden';
        document.getElementById('myBtn3').style.visibility = 'hidden';
        document.getElementById('myBtn4').style.visibility = 'hidden';
        document.getElementById('myBtn5').style.visibility = 'hidden';
        document.getElementById('myBtn6').style.visibility = 'hidden';
        document.getElementById('myBtn7').style.visibility = 'hidden';
        document.getElementById('myBtn8').style.visibility = 'hidden';
        document.getElementById('myBtn9').style.visibility = 'hidden';
        document.getElementById('myBtn10').style.visibility = 'hidden';
        document.getElementById('myBtn11').style.visibility = 'hidden';
        document.getElementById('myBtn12').style.visibility = 'hidden';
        document.getElementById('myBtn13').style.visibility = 'hidden';

}// end fun hidden_cards_fun

// عدد کارت را می گیرد و ظاهر عدد را بر می گردونه
function card_view_fun(card){
  //1-13 del        h
  //14-26 kesh      D
  //27-39 pik       s
  //40 -52 gish     c


  if(card<14){
          if (card<10)
          {
            //♥️
            card=card+1;
            card= card+'H';
            
          }
          if(card==10){ card= 'J'+'H';}
          if(card==11){ card= 'Q'+'H';}
          if(card==12){ card= 'k'+'H';}
          if(card==13){ card= 'A'+'H';}
      }
      if(card>=14 && card<27){
          //♢
        if (card<23)
          {
            card= card-12+'D';
          }
          if(card==23){ card= 'J'+'D';}
          if(card==24){ card= 'Q'+'D';}
          if(card==25){ card= 'k'+'D';}
          if(card==26){ card= 'A'+'D';}

      }
      if(card>=27 && card<40)
      {
          //♤
          if (card<36)
          {
            card= card-25+'S';
          }
          if(card==36){ card= 'J'+'S';}
          if(card==37){ card= 'Q'+'S';}
          if(card==38){ card= 'k'+'S';}
          if(card==39){ card= 'A'+'S';}

      }
      if(card>=40 && card<53)
        {
          //♧
          if (card<49)
          {
            card= (card-38)+'C';
          }
          if(card==49){ card= 'J'+'C';}
          if(card==50){ card= 'Q'+'C';}
          if(card==51){ card= 'k'+'C';}
          if(card==52){ card= 'A'+'C';}

         }

  return card;
}//end function card_view_fun

// در خواست شروع بازی مجدد
function ready_play_again_fun()
{
  // این تابع درخواست مجدد به برنامه می فرسته تا مجدد بازی شروع شود
  roomPub.send({ mAzzA63: '70' });
  ready_play_again_show_bot_fun(0);

}// end fun ready_play_again_fun

function ready_play_again_show_bot_fun(handler)
{
  if(handler==1)
  {
    // دکمه را نمایش دهد
  }
  if(handler==0)  
  {
    // دکمه نمایش را مخفی کند
  }
}// end fun ready_play_again_show_bot_fun




//وقتی یک کاربر لفت می دهد این تیکه اجرا می شود
function waiting_user_back(){
  console.log("a user left roomPub")
}

/// تابعی که باید به هر دکمه متصل شود
// تابع بلند کردن توسط مدیر اتاق
function throw_out_user_from_roomPub(no){
  let msg =''
  switch (no){
    case 1:
        msg='mAzzA63:57';
      break;
    case 2:
        msg='mAzzA63:58';
      break;
    case 3:
        msg='mAzzA63:59';
      break;
    case 4:
        msg='mAzzA63:60';
      break;
  }
  roomPub.send({ mAzzA63: msg });
} // end function throw_out_user_from_room



function preloader_content(){
  document.getElementById('content').innerHTML =`
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
}


