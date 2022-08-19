// https://api2.binance.com/api/v3/avgPrice?symbol=ETHUSDT
// https://api2.binance.com/api/v3/avgPrice?symbol=ETHUSDT
// https://api2.binance.com/api/v3/ticker/24hr?symbols=['BTCUSDT','ETHUSDT','UNIUSDT']

const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const messageTextarea = document.getElementById("message-textarea");
const emailInputError = document.getElementById("email-input-error");
const nameInputError = document.getElementById("name-input-error");
const messageTextareaError = document.getElementById("message-textarea-error");
const contactForm = document.getElementById("contact-form");

const getCrytoData = async () => {
  try {
    const data = await fetch(
      "https://api2.binance.com/api/v3/avgPrice?symbol=BTCUSDT"
    );
    const response = await data.json();
    console.log(response);
  } catch (error) {}
};
// getCrytoData();

const handleBlur = (e) => {
  const { value, name } = e.target;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const messageTextareaRegex = /^(.|\n){30,250}/;
  const nameRegex = /^\w+/;

  if (name === "name") {
    if (nameRegex.test(value)) {
      e.target.style.outline = "1px solid var(--color-input)";
    } else {
      e.target.style.outline = "1px solid red";
      nameInputError.classList.remove("hide-error-text");
      nameInputError.innerText = "você deve escrever seu nome";
    }
  }

  if (name === "email") {
    if (emailRegex.test(value)) {
      e.target.style.outline = "1px solid var(--color-input)";
    } else {
      e.target.style.outline = "1px solid red";
      emailInputError.classList.remove("hide-error-text");
      emailInputError.innerText = "Você deve escrever um e-mail correto.";
    }
  }

  if (name === "message") {
    if (messageTextareaRegex.test(value)) {
      e.target.style.outline = "1px solid var(--color-input)";
    } else {
      e.target.style.outline = "1px solid red";
      messageTextareaError.classList.remove("hide-error-text");
      messageTextareaError.innerText =
        "A mensagem deve ter no mínimo 30 caracteres e no máximo 250 caracteres";
    }
  }
};

const handleInput = (e) => {
  const { value, name } = e.target;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const messageTextareaRegex = /^(.|\n){30,250}/;
  const nameRegex = /^\w+/;

  if (name === "name") {
    if (nameRegex.test(value)) {
      e.target.style.outline = "1px solid var(--color-accent)";
      nameInputError.classList.add("hide-error-text");
    } else {
      e.target.style.outline = "1px solid red";
    }
  }

  if (name === "email") {
    if (emailRegex.test(value)) {
      e.target.style.outline = "1px solid var(--color-accent)";
      emailInputError.classList.add("hide-error-text");
    } else {
      e.target.style.outline = "1px solid red";
    }
  }
  console.log(messageTextareaRegex.test(value));
  if (name === "message") {
    if (messageTextareaRegex.test(value)) {
      e.target.style.outline = "1px solid var(--color-accent)";
      messageTextareaError.classList.add("hide-error-text");
    } else {
      e.target.style.outline = "1px solid red";
    }
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e.target.value);
  // alert("obrigado por me contactar");
  contactForm.reset();
};

nameInput.addEventListener("blur", handleBlur);
emailInput.addEventListener("blur", handleBlur);
messageTextarea.addEventListener("blur", handleBlur);
nameInput.addEventListener("input", handleInput);
emailInput.addEventListener("input", handleInput);
messageTextarea.addEventListener("input", handleInput);
contactForm.addEventListener("submit", handleSubmit);
