import { HOST } from "../../constants/host.js";

export class ProfilView {


    render(data) {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = ` 
            <div class="profil">
                <div class="profil__header box">
                    <div class="profil__header__bg">
                      <label for="img-avatar">  
                         <img class="avatar-preview profilUpdate-img" src="${HOST}/api/images/avatars/${data.img_url}"/>  
                      </label>
                      <input id="img-avatar" type="file"/>
                      
                    </div>
                    
                    <div class="profil__header__menu">
                    <div class="profil__header__menu__name">
                        <p>${data.name}</p>
                        <div><i class="fa-solid fa-briefcase"></i><p>${data.role}</p></div>
                    </div>
                    <div class="profil__header__menu__forms">
                            <div><p class="profilActive profilUpdate-name">Name</p></div>
                            <div><p class="profilUpdate-role">Role</p></div>
                            <div><p class="profilUpdate-password">Password</p></div>
                            <div><p class="profilCreateBirthDays">Bd-Add</p></div>
                            <div><p class="profilUpdate-birthdays">Bd-filter</p></div>  
                    </div>
                    </div>
                    
                 
                </div>
                <div class="profil__body box">
                     <div class="profil_form"></div>
                </div>
             
   
            </div>
            `;
        }
    }

}

