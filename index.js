const imgInput = document.querySelector("#img-select");
const imgPreview = document.querySelector(".preview");
const deleteButton = document.querySelector(".delete-image");
const deleteColor = document.querySelector(".delete-color");

if (!window.EyeDropper) {
  alert("Your browser does not support this feature");
}
const eyeDropper = new EyeDropper();

const pickerBtn = document.querySelector(".open-picker");
const result = document.querySelector(".res");

imgInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    imgPreview.src = this.result;
    deleteButton.style.visibility = "visible";
  });
  reader.readAsDataURL(file);
});
pickerBtn.addEventListener("click", function () {
  eyeDropper
    .open()
    .then((res) => {
      deleteColor.style.visibility = "visible";
      result.innerHTML = ` You Picked this color : <b>${res.sRGBHex}</b>`;
    })
    .catch((err) => {
      console.log("User canceled the selection.");
    });
});

deleteButton.addEventListener("click", function () {
  imgPreview.src = "";
  imgInput.value = "";
  deleteButton.style.visibility = "hidden";
});

deleteColor.addEventListener("click", function () {
  result.innerHTML = "";
  deleteColor.style.visibility = "hidden";
});
