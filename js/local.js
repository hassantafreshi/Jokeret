var storedText;
let local;
let ips;
console.log(`location.js`);
document.getElementById('content').innerHTML=preloader_content_lan(true);
fetch('https://www.cloudflare.com/cdn-cgi/trace')
  .then(function(response) {
    response.text().then(function(text) {    	
      local = text.slice((text.indexOf('loc')+4),
    
        (text.indexOf('loc')+6))        
       ips=text.slice((text.indexOf('ip')+4),
      	(text.indexOf('ts')))
      storedText=text;
      done();
    });
  });

function done() {
  localStorage.setItem('country',local);
  localStorage.setItem('ip',ips);
  sessionStorage.setItem('ip',ips);
  console.log('local.js' ,local)
  preloader_content_lan(false);
}


function preloader_content_lan(val){

  if(val && document.querySelector('#content')){

    let cntnt = document.querySelector('#content').innerHTML;
         cntnt += `<div class="preloader" id="preloader">
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
     
      return cntnt;

  }else{
    document.getElementById('preloader')? document.getElementById('preloader').remove():0;
  }
}



