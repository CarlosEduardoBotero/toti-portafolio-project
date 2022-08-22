const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const messageTextarea = document.getElementById("message-textarea");
const emailInputError = document.getElementById("email-input-error");
const nameInputError = document.getElementById("name-input-error");
const messageTextareaError = document.getElementById("message-textarea-error");
const contactForm = document.getElementById("contact-form");
const textBitcoinPrice = document.getElementById("bitcoin-price");
const textEthereumPrice = document.getElementById("ethereum-price");
const textUniswapPrice = document.getElementById("uniswap-price");
const skeletonLoadingPrice = document.querySelectorAll(".skeleton-loading");
const apiSection = document.getElementById("API");
const navModalMobileContainer = document.querySelector(
  ".nav-modal-mobile-container"
);
const navModalMobile = document.querySelector(".nav-modal-mobile");
const navModalMobileBackdrop = document.querySelector(
  ".nav-modal-mobile-backdrop"
);
const hamburgerBtn = document.querySelector(".hamburger-btn");
const fadeOutBtn = document.querySelector(".fadeOutBtn");
const drawerBtn = document.querySelectorAll("#drawerBtn");

const handleClickBackdrop = () => {
  document.body.removeAttribute("style");
  navModalMobile.classList.add("drawerLeftOut");
  navModalMobileBackdrop.classList.add("fadeOut");
  setTimeout(() => {
    navModalMobile.classList.remove("drawerLeftOut");
    navModalMobileBackdrop.classList.remove("fadeOut");
    navModalMobileContainer.style.visibility = "hidden";
  }, 250);
};

const handleClickHamburguerBtn = () => {
  document.body.style.overflow = "hidden";
  navModalMobileContainer.style.visibility = "visible";
  navModalMobile.classList.add("drawerLeftIn");
  navModalMobileBackdrop.classList.add("fadeIn");
  setTimeout(() => {
    navModalMobile.classList.remove("drawerLeftIn");
    navModalMobileBackdrop.classList.remove("fadeIn");
  }, 1000);
};

const USDCurrencyFormatter = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
};

const getBitcoin = () => {
  return fetch("https://api2.binance.com/api/v3/avgPrice?symbol=BTCUSDT");
};
const getEthereum = () => {
  return fetch("https://api2.binance.com/api/v3/avgPrice?symbol=ETHUSDT");
};
const getUniswap = () => {
  return fetch("https://api2.binance.com/api/v3/avgPrice?symbol=UNIUSDT");
};

let isMakingApiCall = false;

const getData = async () => {
  isMakingApiCall = true;
  try {
    const response = await Promise.all([
      getBitcoin(),
      getEthereum(),
      getUniswap(),
    ]);
    const [bitcoinData, ethereumData, uniswapData] = await Promise.all(
      response.map((res) => res.json())
    );
    textBitcoinPrice.innerText = USDCurrencyFormatter(bitcoinData.price);
    textEthereumPrice.innerText = USDCurrencyFormatter(ethereumData.price);
    textUniswapPrice.innerText = USDCurrencyFormatter(uniswapData.price);
  } catch (error) {
    textBitcoinPrice.innerText = "ocorreu um erro";
    textEthereumPrice.innerText = "ocorreu um erro";
    textUniswapPrice.innerText = "ocorreu um erro";
    textBitcoinPrice.classList.add("error-text");
    textEthereumPrice.classList.add("error-text");
    textUniswapPrice.classList.add("error-text");
  } finally {
    skeletonLoadingPrice.forEach((skeleton) => skeleton.remove());
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.isIntersecting && !isMakingApiCall && getData();
    });
  },
  { threshold: 0.8 }
);

observer.observe(apiSection);

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
  alert("obrigado por me contactar");
  contactForm.reset();
};

nameInput.addEventListener("blur", handleBlur);
emailInput.addEventListener("blur", handleBlur);
messageTextarea.addEventListener("blur", handleBlur);
nameInput.addEventListener("input", handleInput);
emailInput.addEventListener("input", handleInput);
messageTextarea.addEventListener("input", handleInput);
contactForm.addEventListener("submit", handleSubmit);
navModalMobileBackdrop.addEventListener("click", handleClickBackdrop);
drawerBtn.forEach((button) =>
  button.addEventListener("click", handleClickBackdrop)
);
hamburgerBtn.addEventListener("click", handleClickHamburguerBtn);
