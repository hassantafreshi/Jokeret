
class cnctn {
    pageName;
    roomP;
    cid;
    uid;
    ipp;
    host
    constructor(name) {
      this.cid = localStorage.getItem('cid') ? localStorage.getItem('cid') :'0';
      this.uid = localStorage.getItem('id') ? localStorage.getItem('id') :'0';
      this.pageName = name;
      this.host = window.document.location.host.replace(/:.*/, '');
      this.create(name);        
    }

    message(){
        let m;
        roomP.onMessage(function(message) {
            console.log(message)
            m=message;       
        });
        return m;
    }
    sendprivate(){
      
     //   this.roomP.send({event:'adCoinComplate', uid:localStorage.getItem('id'),cid:localStorage.getItem('cid')});
    }
    done(r){
        console.log(`done is run ${r}`);
    }
   async create(c){
        const uid = this.uid;
        const cid = this.cid;
        const host = this.host;
        const roomFinaly=  await fetch('https://www.cloudflare.com/cdn-cgi/trace').then(async function(response) {
          let roomIn = await response.text().then(async function(text) {                
                let ipp=text.slice((text.indexOf('ip')+4), (text.indexOf('ts')));
                let roomr;                
                let client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':'+location.port : ''));
               roomr =await client.create("control",{uid:uid,cid:cid,event:'session',ip:ipp}).then(room => {                                             
                        return room;
                });
                return roomr;                                
            });
            //this.roomP = roomIn;
        
            return roomIn;
        });
        this.roomP=roomFinaly       
        this.sendprivate()
    }

   


  }