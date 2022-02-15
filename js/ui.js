var soundTurn = new Audio('/sound/bell_turn.mp3');
var soundWin = new Audio('/sound/win.mp3');
var soundLoose = new Audio('/sound/loose.mp3');
var soundCards_played = new Audio('/sound/cards_played.mp3');
//console.log('ssss');
document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add card-room form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});



//timer_show_fun(1);
function timer_show_fun(val){
  var timeleft = 5;
  var downloadTimer = setInterval(function(){
    document.getElementById("countdown-"+val).innerHTML = timeleft + "";
    timeleft -= 1;
    if(timeleft <= 0){
      clearInterval(downloadTimer);
      document.getElementById("countdown-"+val).innerHTML = "";
    }
  }, 1000);
}

//run_vib_fun();
function run_vib_fun(){
  //console.log(typeof localStorage.getItem('vibration') , `vvvv  ${localStorage.getItem('vibration')}`);
  if(localStorage.getItem('vibration')==='true'){
    //console.log('if run');
   // navigator.vibrate([500]);
  }
}
console.log(`vib checker is ${checkVibPub }`)
//play_sound_turn()
function play_event_turn(){
  if(localStorage.getItem('sound')==='true'){
    //console.log('true sound');
    soundTurn.play()
  }
  if(localStorage.getItem('vibration')==='true'&& checkVibPub){
    navigator.vibrate(200);
  } 
}
function play_event_win(){
  if(localStorage.getItem('sound')==='true'){
    //console.log('true sound');
    soundWin.play()
  }
  if(localStorage.getItem('vibration')==='true'&& checkVibPub){
    navigator.vibrate([200,30,30,30,200,50,50,200]);
  } 
}
function play_event_card(){
  if(localStorage.getItem('sound')==='true'){
    //console.log('true sound');
    soundCards_played.play()
  }

}
function play_event_loose(){
  if(localStorage.getItem('sound')==='true'){
    //console.log('true sound');
    soundLoose.play()
  }
  if(localStorage.getItem('vibration')==='true'&& checkVibPub){
    navigator.vibrate(200);
  } 
}

const val =localStorage.getItem('event');
if(val=='refreshHard'){
  localStorage.setItem('event','0');
  location.reload(true);
}



function preloader(){
  return` <div class="preloader" id="preloader">
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
  </div>` ;
} 