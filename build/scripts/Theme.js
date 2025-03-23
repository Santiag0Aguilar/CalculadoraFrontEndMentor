document.addEventListener("DOMContentLoaded", function () {
  ThemeSelected();
});

function ThemeSelected() {
  const BtnThemeSelected = document.querySelectorAll(
    ".Theme__Option--Selected"
  );
  const body = document.querySelector("Body");

  BtnThemeSelected.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value == "2") {
        body.classList.remove("Theme3");
        body.classList.add("Theme2");
      } else if (radio.value == "3") {
        body.classList.remove("Theme2");
        body.classList.add("Theme3");
      } else {
        body.classList.remove("Theme2");
        body.classList.remove("Theme3");
      }
    });
  });

}
