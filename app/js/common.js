const box = document.querySelector(".selection-box");
let counterStep = 1;
const res = {};

step();

function step() {
  switch(counterStep) {
    case 1:
      templatefirst();
      break;
    case 2:
      templateSecond();
      break;
    case 3:
      thirdStep();
  }
}

function saveData() {
  let arrCheckbox = box.querySelectorAll(".check-input");
  let arrChecked = [];

  for (let i = 0; i < arrCheckbox.length; i++) {
    if (arrCheckbox[i].checked === true) {
      arrChecked.push(arrCheckbox[i].parentElement.innerText);
    }
  }

  res[counterStep] = arrChecked;

  console.log(res);
}
function templatefirst() {
  box.innerHTML = `
  <div class="selection-header">
    <h2>Шаг 1.&#8194;<span>Класс оборудования</span></h2>
  </div>
  <div class="selection-main">
    <div class="selection-body">
      <ul>
        <li>
          <label class="check">
            <input class="check-input" type="checkbox">
            <span class="check-box"></span>
            бытовые
          </label>
        </li>
        <li>
          <label class="check">
            <input class="check-input" type="checkbox">
            <span class="check-box"></span>
            полупрофессиональные
          </label>
        </li>
        <li>
          <label class="check">
            <input class="check-input" type="checkbox">
            <span class="check-box"></span>
            профессиональные
          </label>
        </li>
        <li>
          <label class="check">
            <input class="check-input" type="checkbox">
            <span class="check-box"></span>
            не имеет значения
          </label>
        </li>
      </ul>
    </div>
    <div class="selection-action">
      <button class="button button-dark button-block">Следующий вопрос</button>
    </div>
  </div>
  `;
  box.querySelector(".button-dark").addEventListener("click", () => {
    saveData();
    counterStep += 1;
    step();
  });
}
function templateSecond() {
  box.innerHTML = `
<div class="selection-header">
  <h2>Шаг 2.&#8194;<span>Напряжение питания</span></h2>
</div>
<div class="selection-main">
  <div class="selection-body">
      <ul>
          <li>
              <label class="check">
                  <input class="check-input" type="checkbox">
                  <span class="check-box"></span>
                  для аэрографии
              </label>
          </li>
          <li>
              <label class="check">
                  <input class="check-input" type="checkbox">
                  <span class="check-box"></span>
                  для покраски
              </label>
          </li>
          <li>
              <label class="check">
                  <input class="check-input" type="checkbox">
                  <span class="check-box"></span>
                  для автосервиса
              </label>
          </li>
          <li>
              <label class="check">
                  <input class="check-input" type="checkbox">
                  <span class="check-box"></span>
                  для плазменной резки
              </label>
          </li>
          <li>
              <label class="check">
                  <input class="check-input" type="checkbox">
                  <span class="check-box"></span>
                  другое
              </label>
          </li>
      </ul>
  </div>
  <div class="selection-action">
      <button class="button button-light button-middle">Назад</button>
      <button class="button button-dark button-middle">Далее</button>
  </div>
</div>
`;
  box.querySelector(".button-dark").addEventListener("click", () => {
    saveData();
    counterStep += 1;
    step();
  });
  box.querySelector(".button-light").addEventListener("click", () => {
    counterStep -= 1;
    step();
  });
}

function thirdStep() {
  box.innerHTML = `
  <div class="selection-header">
    <h2>Спасибо за уделенное время!</h2>
  </div>
  <div class="selection-main">
    <div class="selection-loader">
      <div class="loader">
        <img src="./img/loader.gif" alt="loader">
      </div>
      <p>Мы уже подбираем<br/>для аппарат...</p>
    </div>
  </div>
  `;
  setTimeout(fourthStep, 3000);
}

function fourthStep() {
  box.innerHTML = `
  <div class="selection-header">
    <h2>Данные будут отправлены на обработку</h2>
  </div>
  <form name="form-data" class="selection-main form-data">
    <div class="selection-body">
      <p>Для подтверждения заявки оставьте свои данные.<br/>Наш менеджер свяжется с Вами в течение 10 мин.</p>
      <div class="form-group form-view">
        <label for="phone">*Ваш телефон</label>
        <input type="text" class="form-control" id="phone" required>
      </div>
      <div class="form-group form-view">
        <label for="name">Ваше имя</label>
        <input type="text" class="form-control" id="name">
      </div>
      <div class="form-group form-view">
        <label for="email">Ваш Email</label>
        <input type="email" class="form-control" id="email">
      </div>
    </div>
    <div class="selection-action">
      <button type="submit" class="button button-dark button-block">Отправить</button>
    </div>
  </form>
  `;
}