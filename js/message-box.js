let ptemp
function close_message_box(val){
 console.log('close_message_box');
 localStorage.setItem("new",false);
 location.reload(true);
 document.querySelector('#content').innerHTML=preloader();
}

function open_page(val){
  if(val == 'tt'){
    window.open(`/pages/toptenplayer.html`,"_self");
  }
  if(val == 'fq'){
    window.open(`/pages/${localStorage.getItem('language')}/help-faq.html`,"_self");
  }
 
  document.getElementById('content').innerHTML = preloader();
}
function message_box_first_time_show(){
ptemp=document.querySelector('#content').innerHTML;
const temp =`
          <div class="message-box-over z-index: 9999;">
            <div class="container col l6 s10  row " id="container">
              <div class="end-game z-depth-2 grey lighten-5 grey-text  col l6 s12" id="game-message-box">
                <div class="row" id="end-game-box-first-row">
                  <div class="col l4 s4 m4 xl4"></div>
                  <div class="col l4 s4 m4 xl4 z-depth-1" id="game-message-box-head">
                  <h3 class="center" id="end-game-box-medal-logo">💌<h3>
                  </div>
                  <div class="col l4 s4 m4 xl4 "></div>
                </div>
                <div class="row" id="end-game-box-second-row">
                  <div class="col s12 l12 m12 xl12">
                    <h2 class="center red-text " id="end-game-box-title"></h2>                    
                  </div>
                </div>
                <div  class="row" id="end-game-box-third-row">                    
                    <div class="center col s12 m12 l12 xl12" >
                      <div class="center col s12 m12 l12 xl12 z-depth-1" id="game-message-box-M">
                        <h4 class="center" id="game-message-box-des" onClick='open_page("tt")'>🎩 <span id="end-game-box-point-box-coin-nuumber">${trans("Top players with more coins will earn Gift Cards tap here.")}</span></h4>
                        <h4 class="center" id="game-message-box-des" onClick='open_page("fq")'>🃏 <span id="end-game-box-point-box-coin-nuumber">${trans("To learn how to play tap here.")}</span> </h4>
                        <h4 class="center" id="game-message-box-des" onClick='open_page("fq")'>💰 <span id="end-game-box-point-box-coin-nuumber">${trans("To be familiar with how to earn coin tap here.")}</span></h4>
                      </div>
                      <div class="center col s10 m10 l10 xl10 z-depth-1 " id="end-game-box-point-box-title-box" >
                          <h6 class="center" id="game-message-box-down-box-me"><span id="end-game-box-point-box-exp-nuumber">${trans("Welcome, You receive 1000")}💰</span></h6>
                      </div>                                            
                    </div>               
                </div>
                <div class="row" id="end-game-box-fourth-row">
                </div>
            </div>
            <a onClick='close_message_box("first_time")' >
              <div class="center col s3 m3 l3  xl3 z-depth-2" id="end-game-box-back-loby">
                  <div class=" material-icons " id="end-game-box-loby-back-icon"> 
                    close
                  </div>
              </div>
            </a>            
      </div>
    </div>
      `
    document.querySelector('#content').innerHTML=temp ;
}