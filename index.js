const button = document.querySelector(".pointer_button");
const slots = document.querySelector(".slots"),
  stars = document.querySelectorAll(".wheel > span"); // flash(stars)

let spinCounter = 2;

const form = document.querySelector(".form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const phoneInput = document.querySelector("#phone");

let dynamicMask = IMask(phoneInput, {
  mask: [
    {
      mask: "000 000 000",
    },
    {
      mask: /^\d+\S*@?d+\S*$/,
    },
  ],
});

const input_wrapper = document.querySelector(".input_wrapper");
const input_block = document.querySelector(".input_tel-block");
const input_tel = document.querySelector(".input_tel");
const input_code = document.querySelector(".input_code");
const input_code_block = document.querySelector(".input_code-block");
const input_search = document.querySelector(".input_search");
const arrow_click = document.querySelector(".arrow_click");
const input_flag = document.querySelector(".input_flag");
const overlay1 = document.getElementById("overlay1");
const overlay2 = document.getElementById("overlay2");
const overlay_form = document.getElementById("overlay_form");
const email_error = document.querySelector(".email_error");
const password_error = document.querySelector(".password_error");
const phone_error = document.querySelector(".phone_error");

const pop_up = document.querySelectorAll(".pop-up-window");
const btn = document.querySelector(".openOverlay");

const tab_email = document.querySelector("#tab_email");
const tab_phone = document.querySelector("#tab_phone");
const block_email = document.querySelector("#block_email");
const block_phone = document.querySelector("#block_phone");
const spinCounterInHtml = document.querySelectorAll(".counter-block__quantity"); 

let $ = window.jQuery;

const modal1Func = () => {
  overlay1.style.display = "block";
  button.disabled = false;
  button.classList.remove("pointer_button--active");
};

const modal2Func = () => {
  overlay2.style.display = "block";
  button.classList.remove("pointer_button--active");
};

const onSpin = () => {
  button.disabled = true;
  button.classList.add("pointer_button--active");
  if (spinCounter === 2) {
    slots.classList.add("spin1");
    setTimeout(() => modal1Func(), 4500);
  } else if (spinCounter === 1) {
    const angle = Math.floor(Math.random() * 360);
    slots.classList.add("spin2");
    setTimeout(() => modal2Func(), 4500);
  }
  spinCounter--;

  spinCounterInHtml.forEach((item) => {
    item.textContent = spinCounter;
  });
};

button.addEventListener("click", onSpin);

pop_up.forEach((item) =>
  item.addEventListener("click", function (e) {
    e.stopPropagation();
    if (e.target.className == "pop-up-button") {
      overlay1.style.display = "none";
    }
    if (e.target.className == "pop-up-button modal_2_button") {
      overlay2.style.display = "none";
      overlay_form.style.display = "block";
    }
  })
);

block_email.classList.add("open");
tab_email.classList.add("active");

tab_phone.addEventListener("click", function () {
  tab_phone.classList.add("active");
  tab_email.classList.remove("active");
  block_email.classList.remove("open");
  block_phone.classList.add("open");
});

tab_email.addEventListener("click", function () {
  tab_email.classList.add("active");
  tab_phone.classList.remove("active");
  block_phone.classList.remove("open");
  block_email.classList.add("open");
});

emailInput.addEventListener("change", function (e) {
  if (!isValidEmail(e.target.value) || e.target.value === "") {
    email_error.style.display = "block";
    email_error.textContent = "¡Campo obrigatório!";
    emailInput.classList.add("error_border");
  } else {
    email_error.style.display = "none";
    email_error.textContent = "";
    emailInput.classList.remove("error_border");
  }
});

passwordInput.addEventListener("change", function (e) {
  if (!e.target.value || e.target.value === "") {
    password_error.style.display = "block";
    password_error.textContent = "¡Campo obrigatório!";
    passwordInput.classList.add("error_border");
  } else {
    password_error.style.display = "none";
    password_error.textContent = "";
    passwordInput.classList.remove("error_border");
  }
});

phoneInput.addEventListener("input", function (e) {
  if (!e.target.value || e.target.value === "") {
    phone_error.style.display = "block";
    phone_error.textContent = "Número de caracteres inválido";
    input_wrapper.classList.add("error_border");
  } else {
    phone_error.style.display = "none";
    phone_error.textContent = "";
    input_wrapper.classList.remove("error_border");
  }
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (emailInput.value === "") {
    email_error.style.display = "block";
    email_error.textContent = "¡Campo obrigatório!";
    emailInput.classList.add("error_border");
  } else {
    email_error.style.display = "none";
    email_error.textContent = "";
    emailInput.classList.remove("error_border");
  }
  if (passwordInput.value === "") {
    password_error.style.display = "block";
    password_error.textContent = "¡Campo obrigatório!";
    passwordInput.classList.add("error_border");
  } else {
    password_error.style.display = "none";
    password_error.textContent = "";
    passwordInput.classList.remove("error_border");
  }

  if (phoneInput.value === "") {
    phone_error.style.display = "block";
    phone_error.textContent = "Número de caracteres inválido";
    input_wrapper.classList.add("error_border");
  } else {
    phone_error.style.display = "none";
    phone_error.textContent = "";
    input_wrapper.classList.remove("error_border");
  }

  if (tab_email.classList.contains("active")) {
    if (emailInput.value && passwordInput.value) {
      overlay_form.style.display = "none";
      console.log({ email: emailInput.value, password: passwordInput.value });
    }
  } else if (tab_phone.classList.contains("active")) {
    if (phone.value) {
      overlay_form.style.display = "none";
      console.log({ phone: `${input_code.value} ${phoneInput.value}` });
    }
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const select = document.getElementById("tel_code");

fetch("number.json")
  .then((response) => response.json())
  .then((data) => {
    let option = "";
    data.forEach((item) => {
      input_flag.src = './images/flag.avif';
      input_code.value = item.code;
      phoneInput.setAttribute("placeholder", item.placeholder);
      option += `<div class='tel_option' id="${item.id}"> 
        <div class='tel_code'>
          <img class="flag-icon" src=${'./images/flag.avif'}>
          <p>${item.country}</p>
        </div>
        <div>${item.code}</div>
        <div style='display:none'>${item.placeholder}</div>
      </div>`;
      input_tel.innerHTML = `${option}`;
      input_tel.style.color = "black";
      input_block.style.display = "none";
    });

    const tel_option = document.querySelectorAll(".tel_option");
    tel_option.forEach((item) =>
      item.addEventListener("click", function (e) {
        input_block.style.display = "none";
        arrow_click.classList.toggle("arrow_rotate");
        input_code.style.display = "block";
        input_search.style.display = "none";
        input_code_block.style.marginLeft = "18px";
        input_flag.src =
          e.currentTarget.children[0].children[0].getAttribute("src");
        input_flag.style.display = "block";
        input_code.value = e.currentTarget.children[1].textContent;
        phoneInput.setAttribute(
          "placeholder",
          e.currentTarget.children[2].textContent
        );
      })
    );
  })
  .catch((error) => console.error(error));

[input_code_block, arrow_click].forEach((el) => {
  el.addEventListener("click", function () {
    arrow_click.classList.toggle("arrow_rotate");
    if (arrow_click.classList.contains("arrow_rotate")) {
      input_block.style.display = "block";
      input_code.style.display = "none";
      input_flag.style.display = "none";
      input_search.style.display = "block";
      input_search.value = "";
      input_search.focus();
      input_code_block.style.marginLeft = "0px";
      myFunction();
    } else {
      input_block.style.display = "none";
      input_code.style.display = "block";
      input_flag.style.display = "block";
      input_search.style.display = "none";
      input_code_block.style.marginLeft = "18px";
    }
  });
});

function myFunction() {
  input_search.value = input_search.value.toLowerCase();
  let x = document.getElementsByClassName("tel_option");

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input_search.value)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "";
    }
  }
}

const passwordField = document.getElementById("password");
const iconPassword = document.querySelectorAll(".icon-password");

iconPassword.forEach((item) => {
  item.addEventListener("click", function (e) {
    if (e.target.classList.value.includes("close")) {
      document.querySelector(".close").style.display = "none";
      document.querySelector(".icon-password.open").style.display = "block";
      passwordField.setAttribute("type", "text");
    } else {
      document.querySelector(".icon-password.open").style.display = "none";
      document.querySelector(".close").style.display = "block";
      passwordField.setAttribute("type", "password");
    }
  });
});

//function for flashing starts
const flash = (arr) => {
  const min = 0,
    max = arr.length,
    randNumb = Math.floor(Math.random() * (max - min) + min);
  arr.forEach((item, i) => {
    if (i === randNumb) {
      item.style.display = "none";
    } else {
      item.style.display = "inline-block";
    }
  });
};
setInterval(() => {
  flash(stars);
}, 100);
//function for flashing starts --end--

button.addEventListener("click", onSpin);
