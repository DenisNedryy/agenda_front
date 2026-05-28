export class HomeView {

    render() {
        const el = document.getElementById("root");

        if (el) {
            el.innerHTML = `
                <div class="home">

                    <div class="video_bg">
                        <video autoplay muted loop>
                            <source src="/public/assets/videos/smoke_colors.mp4" type="video/mp4">
                        </video>
                    </div>

                    <div class="home__bodyContainer">

                        <div class="home__bodyContainer__left">

                            <div class="home__bodyContainer__left__projets box">
                                <h2>
                                <span class="projectsTitle_1">Manage your</span>
                                  <span class="projectsTitle_2">Projets</span>
                                </h2>

                                <div class="home__bodyContainer__left__projets__projetsContainer">

                                </div>
                            </div>

                        </div>

                        <div class="home__bodyContainer__right">

                        </div>

                    </div>

                </div>
            `;
        }
    }
}