let ccc =localStorage.getItem('return');
ccc !=="NaN" ? ccc =parseInt(ccc)+1 : ccc=1;
localStorage.setItem('return',ccc);
localStorage.setItem('rTime',Date());
if( parseInt(localStorage.getItem('return'))<2){
  document.getElementById('content').style.display="none";
  document.getElementById('body').innerHTML +=`
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
  times =()=>{
      let r=0
    if(localStorage.getItem('country') === "IR" || localStorage.getItem('country') === "ir")  {
      r=7000;
    }else{
      r=4000;
    }
    return r;
  }

  setTimeout(function(){
      deleteChild('preloader');
      document.getElementById('content').style.display="block";
  },times())
}


function deleteChild(child) { 
    var myNode = document.getElementById(child);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    
} 