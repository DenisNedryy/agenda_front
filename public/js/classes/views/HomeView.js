export class HomeView {

    render() {
        const el = document.getElementById("root");

        if (el) {
            el.innerHTML = `
                <div class="home">



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
                            <div class="home__bodyContainer__right__movies box">
                                <div class="home__bodyContainer__right__movies__header">
                                    <i class="fa-solid fa-clapperboard"></i><p>Movies</p>
                                </div>
                                <div class="home__bodyContainer__right__movies__body"></div>
                            </div>
                            <div class="home__bodyContainer__right__findTasks box">
                                <div class="home__bodyContainer__right__findTasks__header">
                                    <i class="fa-solid fa-list"></i><p>Find your task</p>
                                </div>
                                <div class="home__bodyContainer__right__findTasks__body">
                                <div class="home__bodyContainer__right__findTasks__body__inputs">

                                    <div class="findTasksSearch">
                                        <input class="findTasksSearchInput" type="search" placeholder="Search tasks" />
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </div>

                                    <div class="findTasksFilters">

                                        <select class="findTasksType">
                                            <option value="all">All types</option>
                                            <option value="tasks">Tasks</option>
                                            <option value="movies">Movies</option>
                                            <option value="courses">Courses</option>
                                            <option value="rdvs">RDVs</option>
                                            <option value="events">Events</option>
                                            <option value="projets">Projects</option>
                                            <option value="alert">Alerts</option>
                                            <option value="dayOff">Day Off</option>
                                        </select>

                                        <select class="findTasksSort">
                                            <option value="recent">Most recent</option>
                                            <option value="oldest">Oldest</option>
                                        </select>

                                    </div>
                                </div>
                                    <div class="home__bodyContainer__right__findTasks__body__content"></div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            `;
        }
    }
}