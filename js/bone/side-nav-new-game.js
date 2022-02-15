function fun_side_nav_new_game(handler)
{
    
    var content = document.querySelector('#side-form');
    if (handler==true)
    {
        var template = `
            <h5 class=" indigo-text text-darken-4 " id="title-side-nav-new-game" >
             <i class="material-icons">supervisor_account</i> ${trans('create a room')}
             <div class="divider">
             </div>
            </h5>
    
            <div id="detials-side-nav-new-game" >
            <div class="input-field" hidden>
            <input name="room_name" placeholder="${trans('e.g. kings of hokm')}" id="room_name" type="text" class="validate" value="King of Hokm" disabled="disabled">
            <label class=" indigo-text text-darken-4 " for="title">${trans('Room Name')}:</label>
            </div>
            <div class="input-field" hidden>
                <div class="switch">
                    <label class=" indigo-text text-darken-4 ">
                    ${trans('private room')}:              
                    <input name="room_type"  id="room_type"  type="checkbox" disabled="disabled"  >
                    <span class="lever"></span>                 
                    </label>
                </div>
            </div>
            <div class="input-field" hidden>
                <div class="switch">
                    <label class=" indigo-text text-darken-4 ">
                    ${trans('3Ras , Naras')}:                           
                    <input name="room_kind" id="room_kind"  type="checkbox">
                    <span class="lever"></span>                 
                    </label>
                </div>
            </div>
            <div class="input-field">
                <p>
                <label class=" indigo-text text-darken-4 ">
                    <input name="game_type" value="7" id="game_type-7" type="radio" checked />
                    <span>${trans('7 hands')}  </span>
                </label>
                </p>
                <p>
                <label class=" indigo-text text-darken-4 ">
                    <input name="game_type" value="5" id="game_type-5" class=" indigo-text text-darken-4 " type="radio" />
                    <span>${trans('5 hands')} </span>
                </label >
                </p>
                <p>
                <label class=" indigo-text text-darken-4 ">
                    <input name="game_type"  class="blue"  value="3" id="game_type-3" " type="radio"  />
                    <span>${trans('3 hands')} </span>
                </label>
                </p>
            </div>
            <div class="input-field">
                <div class="divider">
                </div>
                <p>            
                <label class=" indigo-text text-darken-4 ">
                    <input name="game_player" value="4" id="game_player_4" type="radio" disabled="disabled" />
                    <span>${trans('4 Player')}  </span>
                </label>
                </p>
                <p>
                <label class=" indigo-text text-darken-4 ">
                    <input name="game_player" value="2" id="game_player_2" class=" indigo-text text-darken-4 " type="radio" disabled="disabled"/>
                    <span>${trans('2 Player')} </span>
                </label >
                </p>
                <p>
                <label class=" indigo-text text-darken-4 ">
                    <input name="game_player" value="1" id="game_player_1" class=" indigo-text text-darken-4 " type="radio" checked/>
                    <span>${trans('Single Player')} <small>(${trans('Offline')})</small></span>
                </label >
                </p>
            </div>
            <div class="input-field " id="point-side-nav-new-game " hidden>
            <input name="point_room" class=" indigo-text text-darken-4 "  placeholder="30" id="point_room" type="number" class="validate" value="30" hidden>
            <label class=" indigo-text text-darken-4 " for="point_room" hidden>${trans('Coin')}: </label>
            </div>
            
            </div>
    
            <div class="input-field center">
            <a class="btn-small  red darken-4 white-text" onclick="fun_create_room()">${trans('Create')}</a>
            </div>
         </div>
    
        `; 
        content.innerHTML =template;
    }
    else
    {
        deleteChild("side-form");
    }

}

function deleteChild(child) { 
    var myNode = document.getElementById(child);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    
} 