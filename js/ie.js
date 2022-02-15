
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    
    var rtrn = 'https://www.google.com/chrome/';
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        //alert('Use Chrome or Firefox for Play');
        var url= "/pages/ie.html"; 
        window.location = url; 
        console.log('testtttt');
        

    }
  

