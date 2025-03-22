document.addEventListener("DOMContentLoaded", function () {
  iniciarCalc();
});

let NumberSelected1 = "";
let NumberSelected2 = "";
let SingSelected = "";
let isSecondNumber = false;

function iniciarCalc() {
  const BtnNumber = document.querySelectorAll(".keyboard-btn");
  const BtnAction = document.querySelectorAll(".keyboard-btn--Action");
  const BtnEqual = document.querySelector(".keyboard-btn--Equal");
  const SampleScreen = document.querySelector(".PantallaMostrar");

  // Evento para los números
  BtnNumber.forEach((BtnNumber) => {
    BtnNumber.addEventListener("click", function () {
      SampleScreen.textContent += BtnNumber.textContent;
      if (isSecondNumber) {
        NumberSelected2 += BtnNumber.textContent.trim();
      } else {
        NumberSelected1 += BtnNumber.textContent.trim();
      }
    });
  });

  // Evento para los signos (+, -, *, /, DEL, RESET)
  BtnAction.forEach((BtnAction) => {
    BtnAction.addEventListener("click", function () {
      const action = BtnAction.textContent.trim();

      if (action === "DEL") {
        if (isSecondNumber && NumberSelected2.length > 0) {
          NumberSelected2 = NumberSelected2.slice(0, -1);
        } else if (!isSecondNumber && NumberSelected1.length > 0) {
          NumberSelected1 = NumberSelected1.slice(0, -1);
        }
        SampleScreen.textContent =
          NumberSelected1 + (SingSelected || "") + NumberSelected2;
      } else if (action == "RESET") {
        NumberSelected1 = "";
        NumberSelected2 = "";
        SingSelected = "";
        isSecondNumber = false;
        SampleScreen.textContent = "";
      } else {
        if (NumberSelected1 !== "") {
          SingSelected = action;
          isSecondNumber = true;
          SampleScreen.textContent += SingSelected;
        } else {
          console.warn(
            "Por favor ingresa un número antes de seleccionar una operación."
          );
        }
      }
    });
  });

  // Evento para el botón "="
  BtnEqual.addEventListener("click", function () {
    if (NumberSelected1 !== "" && NumberSelected2 !== "") {
      const num1 = Number(NumberSelected1);
      const num2 = Number(NumberSelected2);
      let resultado = 0;

      switch (SingSelected) {
        case "+":
          resultado = num1 + num2;
          break;
        case "-":
          resultado = num1 - num2;
          break;
        case "x":
          resultado = num1 * num2;
          break;
        case "/":
          resultado = num2 !== 0 ? num1 / num2 : "Error (División por 0)";
          break;
        default:
          console.warn("Operación no válida.");
          return;
      }

      SampleScreen.textContent = resultado;
      NumberSelected1 = resultado.toString();
      NumberSelected2 = "";
      SingSelected = "";
      isSecondNumber = false;
    } else {
      console.warn("Por favor ingresa un número válido.");
    }
  });
}
