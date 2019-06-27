const form = document.getElementById("contact_form");
const inputs = form.querySelectorAll("input[required], textarea[required]");

form.setAttribute("novalidate", true);

const displayFieldError = function(el) {
  const fieldRow = el.closest(".form__item");
  const fieldError = fieldRow.querySelector(".field-error");
  if (fieldError === null) {
    const errorText = el.dataset.error;
    const divError = document.createElement("div");
    divError.classList.add("field-error");
    divError.innerText = errorText;
    fieldRow.appendChild(divError);
  }
};

const hideFieldError = function(el) {
  const fieldRow = el.closest(".form__item");
  const fieldError = fieldRow.querySelector(".field-error");
  if (fieldError !== null) {
    fieldError.remove();
  }
};

[...inputs].forEach(el => {
  el.addEventListener("input", function() {
    if (!this.checkValidity()) {
      this.classList.add("error");
    } else {
      this.classList.remove("error");
      hideFieldError(this);
    }
  });
});

const checkFieldsErrors = function(elements) {
  let fieldsAreValid = true;

  [...elements].forEach(el => {
    if (el.checkValidity()) {
      hideFieldError(el);
      el.classList.remove("error");
    } else {
      displayFieldError(el);
      el.classList.add("error");
      fieldsAreValid = false;
    }
  });
  return fieldsAreValid;
};

form.addEventListener("submit", e => {
  e.preventDefault();
  if (checkFieldsErrors(inputs)) {
    const elements = form.querySelectorAll(
      "input:not(:disabled), textarea:not(:disabled)"
    );
    const dataToSend = new FormData();
    [...elements].forEach(el => dataToSend.append(el.name, el.value));

    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    submit.classList.add("loading");

    const url = form.getAttribute("action");
    const method = form.getAttribute("method");

    fetch(url, {
      method: method.toUpperCase(),
      body: dataToSend
    })
      .then(resp => resp.json())
      .then(resp => {
        submit.disabled = false;
        submit.classList.remove("loading");

        if (resp.errors) {
          resp.errors.map(el => {
            return '[name="' + el + '"]';
          });
          const badFields = form.querySelectorAll(resp.errors.join(","));
          checkFieldsErrors(badFields);
        } else {
          if (resp.status === "ok") {
            const div = document.createElement("div");
            div.classList.add("form-send-success");

            form.parentElement.insertBefore(div, form);
            div.innerHTML =
              "<strong>Wiadomość została wysłana</strong><span>Dziękujemy za kontakt. Postaramy się odpowiedzieć jak najszybciej</span>";
            form.remove();
          }
          if (resp.status === "error") {
            if (document.querySelector(".send-error")) {
              document.querySelector(".send-error").remove();
            }
            const el = document.createElement("div");
            el.classList.add("send-error");
            el.innerText =
              "Wysłanie wiadomości nie powiodło się. Spróbuj ponownie.";
            submit.parentElement.appendChild(el);
          }
        }
      })
      .catch(_ => {
        submit.disabled = false;
        submit.classList.remove("loading");
      });
  }
});
