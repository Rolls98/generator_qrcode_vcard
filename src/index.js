let QRCode = require("qrcode");
let btn = document.querySelector("button");
let btndownload = document.querySelector("#download");
//let canvas = document.querySelector("canvas");

QRCode.toDataURL("Veuillez cliquer sur generer un qrcode avant de scanner",{width:200}, function (err, url) {
    if (err) return console.error(err);
    let img = document.querySelector("img");
    img.src = url;
   
  });

btn.addEventListener("click", generateQr);

btndownload.addEventListener("click",function (e){
    e.preventDefault();
    if(!document.querySelector(".disabled")){
        downloadURI(this.href,"qrCode")
    }
})

function generateQr(e) {
  e.preventDefault();
  let vCardJS = require("vcards-js");
  let vCard = vCardJS();

  if (checkInput()) {
    vCard.firstName = getInputValueByName("nom");
    vCard.lastName = getInputValueByName("prenom");
    vCard.homePhone = getInputValueByName("tel");
    vCard.birthday = new Date(getInputValueByName("anniv"));
    vCard.url = getInputValueByName("site");
    vCard.organization = getInputValueByName("entr");

    console.log(vCard.getFormattedString());

    QRCode.toDataURL(vCard.getFormattedString(),{width:200}, function (err, url) {
      if (err) return console.error(err);
      let divqr = document.querySelector("#qrCode");
      let divDown = document.querySelector(".btnDownload");
      let img = document.querySelector("img");
        img.classList.remove("flou");
      document.querySelector("#download button").classList.remove("disabled")
      document.querySelector("#download").setAttribute("href",url)
      img.src = url;
      console.log(url);
      setTimeout(EmptyAllInput,2000)
    });
  } else {
    alert("vous devez remplir tout les champs!!! merci");
  }
}

// QRCode.toCanvas(
//   canvas,vCard.getFormattedString(),
//   function (err) {
//     if (err) return console.error(err);
//     console.log("success ! ");
//   }
// );

//genetorQrCode(6000, { name: "Rolls", prenom: "Roys", email: "r@nan.ci" });

// function genetorQrCode(time, data) {
//   setTimeout(() => {
//     QRCode.toCanvas(
//       canvas,
//       `\nNom : ${data.name} \nPrenom: ${data.prenom} \nEmail: ${data.email}`,
//       function (err) {
//         if (err) return console.error(err);
//         console.log("success ! ");
//       }
//     );
//   }, time);
// }

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }

function getInputValueByName(name) {
  let input = document.querySelector("#" + name);

  return input.value.trim();
}

function checkInput() {
  let notEmpty = true;
  let allInputs = document.querySelectorAll("input");
  for (let input of allInputs) {
    if (input.value.trim() === "" || !input.value.trim()) notEmpty = false;
  }

  return notEmpty;
}

function EmptyAllInput() {
  let allInputs = document.querySelectorAll("input");
  for (let input of allInputs) {
    input.value = "";
  }
}
