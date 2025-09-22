export class AddModelView {

  renderModelMobile() {
    const el = document.querySelector(".modalAddContainer");
    if (el) {
      el.innerHTML = `
            <div class="modal hidden">
  <div class="modalContent">
    <div class="modal__content__header">
      <h3>Nouvelle tâche</h3>
      <i class="fa-solid fa-square-xmark leaveModal"></i>
    </div>

    <form class="formTask-add">
      <!-- Name -->
      <div>
        <label for="name">Name</label>
        <input type="text" name="name" id="name">
      </div>

      <!-- Description -->
      <div>
        <label for="description">Description</label>
        <textarea name="description" id="description"></textarea>
      </div>

      <!-- Type -->
      <div>
        <label for="typeSelect">Type</label>
        <select id="typeSelect" name="type">
          <option value="tasks">Tasks</option>
          <option value="spaced_repetition">Spaced repetition</option>
          <option value="courses">Courses</option>
          <option value="rdvs">Rdvs</option>
          <option value="events">Events</option>
          <option value="projets">Projets</option>
          <option value="dayOff">DayOff</option>
          <option value="alert">Alert</option>
        </select>
      </div>

      <!-- Subject -->
      <div class="subjectContainer hidden">
        <label for="subjectSelect">Subject</label>
        <select id="subjectSelect" name="subject">
        <option value="" disabled selected hidden>Select a subject</option>
          <option value="english">English</option>
          <option value="js">Js</option>
          <option value="nodejs">NodeJs</option>
          <option value="react">React</option>
          <option value="php">PHP</option>
          <option value="github">GitHub</option>
          <option value="ts">Ts</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="sql">Sql</option>
          <option value="mysql">MySql</option>
          <option value="nextjs">NextJs</option>
          <option value="tailwind">TailWind</option>
        </select>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-submit-addTask2">Enregistrer</button>
    </form>
  </div>
</div>

            `;
    }
  }

renderModel() {
  const el = document.querySelector(".modalAddContainer");
  if (el) {
    el.innerHTML = `
            <div class="modal hidden">
  <div class="modalContent">
    <div class="modal__content__header">
      <h3>Nouvelle tâche</h3>
      <i class="fa-solid fa-square-xmark leaveModal"></i>
    </div>

    <form class="formTask-add">
      <!-- Name -->
      <div>
        <label for="name">Name</label>
        <input type="text" name="name" id="name">
      </div>

      <!-- Description -->
      <div>
        <label for="description">Description</label>
        <textarea name="description" id="description"></textarea>
      </div>

      <!-- Type -->
      <div>
        <label for="typeSelect">Type</label>
        <select id="typeSelect" name="type">
          <option value="tasks">Tasks</option>
          <option value="spaced_repetition">Spaced repetition</option>
          <option value="courses">Courses</option>
          <option value="rdvs">Rdvs</option>
          <option value="events">Events</option>
          <option value="projets">Projets</option>
          <option value="dayOff">DayOff</option>
          <option value="alert">Alert</option>
        </select>
      </div>

      <!-- Subject -->
      <div class="subjectContainer hidden">
        <label for="subjectSelect">Subject</label>
        <select id="subjectSelect" name="subject">
        <option value="" disabled selected hidden>Select a subject</option>
          <option value="english">English</option>
          <option value="js">Js</option>
          <option value="nodejs">NodeJs</option>
          <option value="react">React</option>
          <option value="php">PHP</option>
          <option value="github">GitHub</option>
          <option value="ts">Ts</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="sql">Sql</option>
          <option value="mysql">MySql</option>
          <option value="nextjs">NextJs</option>
          <option value="tailwind">TailWind</option>
        </select>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-submit-addTask">Enregistrer</button>
    </form>
  </div>
</div>

            `;
  }
}
}