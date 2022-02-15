
 user_name = localStorage.getItem('name') ? localStorage.getItem('name') : 'anonymous';
 user_img = localStorage.getItem('image') ? localStorage.getItem('image'):'/img/logo/joker_00.jpg'; 
let user_id = '';
let auth_status =1;
var user;

var path = window.location.pathname;
var page = path.split("/").pop();
console.log('pages', page );

  
switch (page)
{
    case 'profile.html':
    case 'setting.html':
    case 'play.html':
    case 'pre-register.html':
    case 'earn-coin.html':
    case 'toptenplayer.html':
     fun_check();
  //  window.open("/pages/login.html","_self") ;       
    break;
}

const config = {
      apiKey: "AIzaSyA6BXBZqy0g40vI6fFtre5y-9KN7LEUUVI",
      authDomain: "jokeret.firebaseapp.com",
      databaseURL: "https://jokeret.firebaseio.com",
      projectId: "jokeret",
      storageBucket: "jokeret.appspot.com",
      messagingSenderId: "250348877287",
      appId: "1:250348877287:web:2939b640bf41129ba03942",
     // authDomain: 'Jokeret.com',
      measurementId: "G-0XSEBNHJ3N"
  };
    firebase.initializeApp(config);
    const db = firebase.firestore()
    firebase.analytics();




firebase.auth().onAuthStateChanged(function(user) {
  //user login
  if (user){
    console.log('test');
    console.log('user',user)
    localStorage.setItem("new",true);
   // phone = user.phoneNumber;
    //user.photoURL !=null ? localStorage.setItem('image',user.photoURL)  : console.log('user dont have profile image in auth') ;
    //user.displayName!=null ?localStorage.setItem('name',user.displayName ) : console.log('user dont have name  in auth') ;
    user_id= user.uid;
    auth_status=2;
 
    
   // siede_menu_log(true);// show item in side menu
  
   // localStorage.getItem("inviteRoomId")!=='0' && page!='play.html' ?window.open("/pages/play.html", "_self"):console.log(`localStorage.getItem("inviteRoomId")`);

  }else // user is not login
  {
      /// 789 
      // list page hay ke gharar hast user hataman LOGIN BASHAD

    //console.log(' 2 user is NOT login') ;
    //siede_menu_log(false);
  }
  //waves-effect 
});

    //789
    //below function get list of user exists on db
    const list_users =(data) =>{
      data.forEach(doc => {
        const user = doc.data();
       // //console.log(`test User name is : ${user.name} , image: ${user.image} and ID : ${user.uid}`);
      });
   }


function set_info_user_head(user_img) {
  
        let content = document.querySelector('#user-head-info');
        temp =`
        <span class="userHead ">
        <a href="/" ><img src="${user_img}" class=" circle" id='img-user-head-info' width="20px"></a>
        </span>
        `;
        content.innerHTML =temp;
   

}

function fun_logout(){
   
    localStorage.setItem("point",'0');
    localStorage.setItem("exp",'1');
   // localStorage.setItem("name",'Puddin');
   // localStorage.setItem("coin",'0');
    localStorage.setItem("inviteRoomId",'0');
    localStorage.setItem("image",'/img/logo/joker_00.jpg');
   // localStorage.setItem("id",`guest-${(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()}`);
    localStorage.removeItem('id');
    localStorage.removeItem('image');
    localStorage.removeItem('coin');
    localStorage.removeItem('name');
    localStorage.removeItem('gid');
    let content = document.querySelector('#user-head-info');   
    firebase.auth() ?firebase.auth().signOut() :0;
    window.open("/pages/login.html","_self");
    siede_menu_log(false);
}

function fun_login(){
   

   // firebase.auth().signOut();
    window.open("/pages/login.html","_self");
   //console.log('log-in');
}
fun_check();
function fun_check(){
  console.log(
    `fun_check ${localStorage.getItem('id')} s ${localStorage['name']}` , 
  );
 // if(localStorage.getItem('id')=== null ){
  if(!localStorage.getItem('id') ){
    document.getElementById('content').innerHTML=`
    <div class="row">
    <a href="/pages/login.html">
    <div class="col s12 m6">
    <div class="card orange darken-1">
    <div class="card-content white-text">
    <span class="card-title">Login Error</span>
    <p>You are not login</p>
    </div>
    <div class="card-action">
    <a href="#">Login</a>
    
    </div>
    </div>
    </div>
    </a>
    </div>
    `;
    window.open('/pages/login.html','_self');
 }else{
   console.log('bug');
 }
}
function siede_menu_log(handler)
{
    if(handler)
    {
       //show
       //user is log-in

      // login_user_ui();
       

         

    }
    if(handler==false)
    {
        
        //hide
        //user is log-out
        let content=" ";
        let temp=" ";
        content = document.querySelector('#log-side-menu');
        temp=` <a onClick='fun_login()' id="login-btn" class="waves-effect ">
          <i class="material-icons  ">exit_to_app</i>
          ${trans('Log in')} </a>`;
        content.innerHTML =temp;
         content = document.querySelector('#user-info-side-menu');
         temp =`
         <div class="background">
         <img src="/img/side-menu-bg.jpg">
         </div>
         <a href="#user"><img class="circle" src="/img/logo/joker_00.jpg" width="100px"></a>
         <a href="#name"><span class="white-text name">${trans('Guest user')}</span></a>
         <a href="#email"><span class="white-text email"></span></a>`;
     /*    temp =`
        <a href="/pages/login.html" class="waves-effect  "  >
        <i class="material-icons  " >account_circle</i>
        Guest</a> `;
        */
        content.innerHTML =temp;
        content="";

       
    }
}// end function

//edit profile information
let updateUserForm =0;
const loc = 'US';
//console.log(`loc is ${loc}`);
//const ip = geoplugin_request();
const ip = '1.1.1.1'
document.querySelector('#user-profile-update-form') ?  updateUserForm=document.querySelector('#user-profile-update-form') : updateUserForm =0;
if(updateUserForm!=0){
  updateUserForm.addEventListener('submit',(e)=>{
    e.preventDefault();
  //777 add new data == >> db.collection('users').add({
    db.collection('users').doc(user_id).update({
      name: updateUserForm['username'].value,
    // image: updateUserForm['userphoto'].value,
      image: user_img,
      uid:user_id, //666
      date: Date.now(),
      location:loc,
      ip:ip,
    }).then(()=>{
      user_name=updateUserForm['username'].value;
      login_user_ui();
      M.toast({html: 'Edit done successfully.' ,classes: 'deep-orange darken-4'})
      ///789 when edit add to database after that UI must change

    }).catch(err=>{
      //console.log(err.message);
    })
  })
}// end if 

let uploadImageUserProfile = 0;
document.querySelector('#userPhotoUpload') ? uploadImageUserProfile=document.querySelector('#userPhotoUpload') : uploadImageUserProfile = 0;
if(uploadImageUserProfile!=0){
uploadImageUserProfile.addEventListener('change',function(e){

  const filea =e.target.files[0];
  var blob = filea.slice(0, filea.size, 'image/jpg'); 
  const newName =Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)+'-'+user_name.replace(/\s+/g, ''); ;
  const file = new File([blob], newName, {type: 'image/jpg'});
  //console.log('file name:'+file.name);
  const storegeRef= firebase.storage().ref('images/users/'+file.name);
  const task = storegeRef.put(file);
  task.on('state_changed', function(snapshot){
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    const content = document.querySelector('#save-profile');
    const temp =`            <div class="progress">
    <div class="indeterminate red"></div>
</div>`;
    content.innerHTML =temp
    //console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        //console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'

        //console.log('Upload is running');
        break;
    }
  }, function(error) {
    // Handle unsuccessful uploads
  }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    const content = document.querySelector('#save-profile');
    const temp =`<button class="btn waves-effect waves-light add-btn " type="submit" name="action">save
    <i class="material-icons right  col s12">send</i>
  </button>`;
    content.innerHTML =temp
    task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      //console.log('File available at', downloadURL);
      user_img =downloadURL;
      const content = document.querySelector('#showImageProfile');
      const temp =`<div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${downloadURL}" width="50px">
          </div>
        </div>`;
      content.innerHTML =temp;
    });
  });
});
}
let username = 0;
document.querySelector('#username') ? username = document.querySelector('#username') : username = 0;
if(username){
  username.addEventListener('input',function(e){
    
    //console.log('test');
    const content = document.querySelector('#save-profile');
    const temp =`<button class="btn waves-effect waves-light add-btn " type="submit" name="action">save
    <i class="material-icons right  col s12">send</i>
  </button>`;
    content.innerHTML =temp
  })
}


 function login_user_ui(){
  user_img == localStorage.getItem('image') ==='d' ? '/img/logo/joker_00.jpg' :localStorage.getItem('image')  ;
  user_name = localStorage.getItem('name');
  coin =localStorage.getItem('coin');
  let content = document.querySelector('#user-head-info');
  console.log(user_name,user_img,coin)
  let temp =`
  <span class="userHead ">
  <a href="/" ><img src="${user_img}" class=" circle" id='img-user-head-info' width="20px"></a>
  </span>
  `;
  content.innerHTML =temp;
  content = document.querySelector('#user-info-side-menu');
  temp =`
  <div class="background">
  <img src="/img/side-menu-bg.jpg">
  </div>
  <a href="/pages/profile.html"><img class="circle" src="${user_img}"></a>
  <a href="/pages/profile.html"><span class="white-text name">${user_name}</span></a>
  <a href="#"><span class="white-text email">${coin} 💰</span></a>`;
  content.innerHTML =temp;


} 


function first_login(){
  
}

function user_update(){
  if(localStorage.getItem('id').indexOf('guest-')==-1){
    console.log('user_update');
    var host = window.document.location.host.replace(/:.*/, '');
    var client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':'+location.port : ''));
    client.create("control").then(room => {
      room.onStateChange.once(function(state) {
      });
          const datad =[`${localStorage.getItem("id")}`,`${localStorage.getItem("name")}`,`${localStorage.getItem("image")}`,`${localStorage.getItem("sound")}`,`${localStorage.getItem("vibration")}`,`${localStorage.getItem("speed")}`];
          console.log(datad);
           room.send({ proupdate:`${datad}`  });
                       room.onMessage(function(message) {
                           if(message.meta=='updateSetting')
                           {
                             console.log(message);
                              if(message.c==1){
                                // کاربر به صفحه تکمیل اطلاعات پاس داده شود
                                 localStorage.setItem('name',document.getElementById('username').value);
                                 localStorage.setItem('image',message.img);
                                 window.open('/pages/play.html','_self');
                              }else{
                                 M.toast({html: ''+`${trans(message.m)}`+'' ,classes:' red darken-1' });
                                 document.getElementById('body').className='yellow lighten-2';
                                 input='';
                                 output=''
                              }
                           }


                       
            });
            room.onMessage(function(message) {
              if(message.meta=='updateSetting')
              {
                console.log(message);
                 if(message.c==1){
                   // کاربر به صفحه تکمیل اطلاعات پاس داده شود
                    localStorage.setItem('name',document.getElementById('username').value);
                    localStorage.setItem('image',message.img);
                    window.open('/pages/home.html','_self');
                 }else{
                    M.toast({html: ''+`${trans(message.m)}`+'' ,classes:' red darken-1' });
                    document.getElementById('body').className='yellow lighten-2';
                    input='';
                    output=''
                 }
              }          
            });
    });
  }else{
    console.log(`user is not register`);
  }
  
}








