
var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var fullVersion  = parseFloat(navigator.appVersion); 
var majorVersion = parseInt(navigator.appVersion,10);
var  nameOffset,verOffset,ix;
 checkVibPub =true; // پشتیبانی از ویبره
console.log(navigator);

// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
 browserName = "Opera";
 fullVersion = nAgt.substring(verOffset+6);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
   checkVibPub=false;
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
 browserName = "Microsoft Internet Explorer";
 fullVersion = nAgt.substring(verOffset+5);
 checkVibPub=false;
}
// In Chrome, the true version is after "Chrome" 
else if ((verOffset=navigator.userAgent.indexOf("Chrome"))!=-1) {
 browserName = "Chrome";
 fullVersion = nAgt.slice(verOffset+7,verOffset+11);
 //alert(`brower name ${browserName} , v:${fullVersion}`);
}
// In Safari, the true version is after "Safari" or after "Version" 
else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
 browserName = "Safari";
 checkVibPub=false;
 fullVersion = nAgt.substring(verOffset+7);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In Firefox, the true version is after "Firefox" 
else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
 browserName = "Firefox";
 fullVersion = nAgt.slice(verOffset+7,verOffset+11);
 //alert(`brower name ${browserName} , v:${fullVersion}`);
}
// In most other browsers, "name/version" is at the end of userAgent 
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
          (verOffset=nAgt.lastIndexOf('/')) ) 
{
 browserName = nAgt.substring(nameOffset,verOffset);
 fullVersion = nAgt.substring(verOffset+1);
 if (browserName.toLowerCase()==browserName.toUpperCase()) {
  browserName = navigator.appName;
 }
}
// trim the fullVersion string at semicolon/space if present
if ((ix=fullVersion.indexOf(";"))!=-1)
   fullVersion=fullVersion.substring(0,ix);
if ((ix=fullVersion.indexOf(" "))!=-1)
   fullVersion=fullVersion.substring(0,ix);

majorVersion = parseInt(''+fullVersion,10);
if (isNaN(majorVersion)) {
 fullVersion  = ''+parseFloat(navigator.appVersion); 
 majorVersion = parseInt(navigator.appVersion,10);
}

var os=getOS();
var rtrn='1';
var otherBrowser =1;
if (((!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime))  || (navigator.userAgent.indexOf("Chrome"))!=-1))
{//Chrome
    browserName='chrome';
    otherBrowser=0;
    if( majorVersion<55){
        // اگر آپدیت نبود
        rtrn=fun_update_browser(os,'chrome');
    }
    
}//end if chrome
if((navigator.userAgent.indexOf("Firefox"))!=-1)
{ // Firefox
    browserName='firefox';
    const s= navigator.userAgent.indexOf("Firefox")+8;
    const v = navigator.userAgent.slice(s, s+2)
    otherBrowser=0;
    console.log(
        'firefox ',v
    )
    if( v<54){
        rtrn=fun_update_browser(os,'firefox');
    }
}//end if firfox
var isIE = /*@cc_on!@*/false || !!document.documentMode;
if(isIE){
    rtrn=fun_update_browser(os,'ie');
    otherBrowser=0;
}

if (!isIE && !!window.StyleMedia)
{//Edg
    checkVibPub=false;
   console.log('edg');
    otherBrowser=0;
    if(majorVersion<15){
        //console.log('browser version is lower as 14 please update your Edg '+majorVersion);
        rtrn=fun_update_browser(os,'edge');
    }
}

if((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' opr') != -1)
{//Opera
    checkVibPub=false;
    browserName='opera'
    otherBrowser=0;
    if(majorVersion<42){
        rtrn=fun_update_browser(os,'Opera');
        //console.log('browser version is lower as 14 please update your Edg '+ majorVersion);
    }
}
//console.log(nAgt);
var isSafari = navigator.userAgent.indexOf("Safari")!=-1 || /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
//console.log()

if(navigator.userAgent.indexOf("Safari")!=-1 && navigator.userAgent.indexOf("Chrome")==-1 && navigator.userAgent.indexOf("Mozillas")==-1){//safari
    console.log('safari')
    checkVibPub=false;
    browserName='safari'
    otherBrowser=0;
//    alert(`majorVersion${majorVersion}`);
// ios 13
    if(majorVersion<11){
       
        rtrn=fun_update_browser(os,'safari');
        console.log('browser version is lower as 10 please update your safari '+ majorVersion);
    }
}
if (otherBrowser==1 ){
    rtrn=fun_update_browser(os , 'unknown');
}



if(rtrn!='1'){
 
    var temp = "<div id='overlay-page' style='z-index: 9999;'>"+
    "<div id='overlay-page-text'>"+trans("You need update the browser <br>")+
    "<a  href="+rtrn+">"+trans("tap here")+" </a></div></div>";

      
      document.querySelector('#content').innerHTML +=temp ; 

}
function getOS() {
    console.log('getOS');
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;
       console.log(`getOS`,userAgent , userAgent.lastIndexOf('iPhone'));
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1 && os==null) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1 && os==null) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    } else if(!os && userAgent.indexOf("BlackBerry")!=-1){
      os='blackberry';
    }
    
    localStorage.setItem('os',os);
    return os;
  }

  function fun_update_browser(os,browser){
    //console.log(`your browser is ${browser} ,v ${majorVersion} and os ${os}`);
    var r='s';
    //unknown
    switch (os){
        case 'android':
            if(browser=='firefox'){r='https://play.google.com/store/apps/details?id=org.mozilla.firefox';}
            if(browser=='chrome'){r='https://play.google.com/store/apps/details?id=com.android.chrome';}
            if(browser=='ie'|| browser=='edge'){r='https://play.google.com/store/apps/details?id=com.microsoft.emmx';}
            if(browser=='safari'){r='https://www.apple.com/safari/';}
            if(browser=='opera'){r='https://play.google.com/store/apps/dev?id=6928237143520558692&hl=en_US';}
            if(browser=='unknown'){r='https://play.google.com/store/apps/details?id=com.android.chrome';}
        break;
        case 'Windows':
            if(browser=='firefox'){r='https://www.mozilla.org/en-US/firefox/windows/';}
            if(browser=='chrome'){r='https://www.google.com/chrome/';}
            if(browser=='ie'|| browser=='edge'){r='https://www.microsoft.com/en-us/windows/microsoft-edge';}
            if(browser=='safari'){r='https://support.apple.com/kb/DL1569?viewlocale=en_US&locale=en_US';}
            if(browser=='opera'){r='https://www.opera.com/computer/beta';}
            if(browser=='unknown'){r='https://www.google.com/chrome/';}
        break;
        case 'Mac OS':
            if(browser=='firefox'){r='https://support.mozilla.org/en-US/kb/update-firefox-latest-release';}
            if(browser=='chrome'){r='https://support.google.com/chrome/answer/95414?co=GENIE.Platform%3DDesktop&hl=en';}
            if(browser=='ie'|| browser=='edge'){r='https://microsoft-edge.en.softonic.com/mac/download';}
            if(browser=='safari'){r='https://support.apple.com/en-us/HT204416';}
            if(browser=='opera'){r='https://www.opera.com/computer/beta';}
            if(browser=='unknown'){r='https://www.google.com/chrome/';}
        break;
        case 'iOS':
        case 'IOS':
        case 'ios':
            if(browser=='firefox'){r='https://apps.apple.com/us/app/firefox-private-safe-browser/id989804926';}
            if(browser=='chrome'){r='https://apps.apple.com/us/app/google-chrome/id535886823';}
            if(browser=='ie' || browser=='edge'){r='https://apps.apple.com/us/app/microsoft-edge/id1288723196';}
            if(browser=='safari'){r='https://www.apple.com/safari/';}
            if(browser=='opera'){r='https://www.opera.com/computer/beta';}
            if(browser=='unknown'){r='https://www.google.com/chrome/';}
        break;
        case 'Linux':
            if(browser=='firefox'){r='https://www.mozilla.org/en-US/firefox/linux/';}
            if(browser=='chrome'){r='https://support.google.com/chrome/a/answer/9025903?hl=en';}
            if(browser=='opera'){r='https://www.opera.com/computer/beta';}
            if(browser=='unknown' || browser=='ie'|| browser=='edge'||browser=='safari' ){r='https://www.google.com/chrome/';}
        break;
        case 'blackberry':
            if(browser=='firefox'){r='https://www.mozilla.org/en-US/firefox/';}
            if(browser=='chrome'){r='https://www.google.com/chrome/';}
            if(browser=='ie' || browser=='edge'){r='https://www.microsoft.com/en-us/windows/microsoft-edge';}
            if(browser=='safari'){r='https://www.apple.com/safari/';}
            if(browser=='opera'){r='https://www.opera.com/';}
            if(browser=='unknown'){r='https://www.google.com/chrome/';}
            // اگر مرورگر هم ناشناس بود  به کاربر پیام نمایش داده شود مرورگر خود را بروز رسانی کنید
            // پیشنهاد بده که مثلا کروم نصب کنه
        break;
    }
    return r;
}

console.log(`browser ${browserName}`);

