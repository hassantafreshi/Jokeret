let size =0;
let colMain=0;
let colSide=0;
let checkScreenSize = false
const ads= `
<!-- Homepage Leaderboard -->
<ins 
google_adtest="on"
class="adsbygoogle"
style="display:inline-block;width:160px;height:700px"
data-ad-client="ca-pub-1234567890123456"
data-ad-slot="1234567890"></ins>
`;
if (screen.width>1390 && screen.width<1900){
    colMain = 7;
    colSide= 2;
    checkScreenSize=true;
}
if (screen.width>1900 && screen.width<2900){
     colMain = 6;
     colSide= 3;
     checkScreenSize=true;
}
if (screen.width>2900 && screen.width<3500){
     colMain = 8;
     colSide= 2;
     checkScreenSize=true;
}
if (screen.width>2900 && screen.width<3500){
     colMain = 9;
     colSide= 1;
     checkScreenSize=true;
}
if (screen.width>3500){
    colMain = 10;
    colSide= 1;
    checkScreenSize=true;
}
if ((screen.width ==1280 && screen.height==800) || (screen.width ==1280 && screen.height==950) )
{
    colMain = 10;
    colSide= 1;
    checkScreenSize=true;

}


if(checkScreenSize){
    console.log('test');
    document.getElementById("container").className = ` container col l${colMain}`;
    document.getElementById("box-left").className = ".show-on-large col l"+colSide;
    document.getElementById('box-left').innerHTML=ads
    document.getElementById("box-right").className = ".show-on-large col l"+colSide;
    document.getElementById('box-right').innerHTML=ads
    document.getElementById("card-desk-1").className = 'myCard-deck-large' ;
    document.getElementById("card-desk-2").className = 'myCard-deck-large' ;
    document.getElementById("card-desk-3").className = 'myCard-deck-large' ;
    document.getElementById("card-desk-4").className = 'myCard-deck-large' ;
    document.getElementById("card-desk-5").className = 'myCard-deck-large' ;
    document.getElementById("card-desk-6").className = 'myCard-deck-large' ;
    document.getElementById("card-desk-7").className = 'myCard-deck-large' ;
    document.getElementById("card-desk-8").className = 'myCard-deck-large' ;
    document.getElementById("card-desk-9").className = 'myCard-deck-large' ;
    document.getElementById("card-desk-10").className = 'myCard-deck-large' ;
    document.getElementById("card-desk-11").className = 'myCard-deck-large' ;
    document.getElementById("card-desk-12").className = 'myCard-deck-large' ;
    document.getElementById("card-desk-13").className = 'myCard-deck-large' ;


    document.getElementById("card-desk-played-1").className = 'responsive-img card-desk-played-1-large' ;
    document.getElementById("card-desk-played-2").className = 'responsive-img card-desk-played-2-large' ;
    document.getElementById("card-desk-played-3").className = 'responsive-img card-desk-played-3-large' ;
    document.getElementById("card-desk-played-4").className = 'responsive-img card-desk-played-4-large' ;
 
 //card-desk-played-2
}

function functionTest(str){
    console.log(`come:${str}`);
    const toast = `<span> user: ${str} </span>`
    M.toast({html: toast })
}
