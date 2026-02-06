export class HomeView {

    render() {
        const el = document.getElementById("root");
        if (el) {
            el.innerHTML = `
            <div class="home">

                <div class="banner bgImg-blue box">
                    <div class="banner__container">
                          <div class="banner__text">
                             <p class="banner__text--title">I'm doing my part</p>
                             <p>They’re doing their part. Are you? Join the Mobile Infantry and save the world. Service guarantees citizenship.</p>
                            <p>Would you like to now more ?</p>                         
                             </div>
                          <div class="banner__container__button">
                            <div class="btn">Join</div>
                          </div>
                    </div>
                </div>

                

                <div class="home__bodyContainer">
                    <div class="home__bodyContainer__left">
                      <div class="home__bodyContainer__left__dayOff box">
                      <h2>Prochain jour de congé</h2>
                      <div class="home__bodyContainer__left__dayOff__dateOff"> 
                       
                      </div>
                      </div>
                      <div class="home__bodyContainer__left__projets box">
                        <h2>Projets</h2>
                        <div class="home__bodyContainer__left__projets__projetsContainer">
                   
                        </div>
                      </div>
                    </div>
                   <div class="home__bodyContainer__right">
                    <div class="home__bodyContainer__right__englishMap box">
                    <h2>Progression</h2>
                   <div class="map-uk"></div>
                    </div>
                   </div>
                    
                </div>
            </div>
            `;
        }
    }
} 