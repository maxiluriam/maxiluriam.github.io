import encryptString from "./enigm_function.js";

const startStringArray = [
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "QWERTZUIOASDFGHJKPYXCVBNML",
  "DMTWSILRUYQNKFEJCAZBPGXOHV",
  "HQZGPJTMOBLNCIFDYAWVEUSRKX",
  "UQNTLSZFMREHDPXKIBVYGJCWOA",
  "IMETCGFRAYSQBZXWLHKDVUPOJN",
];

let stringArray = [];

stringArray = [...startStringArray];

console.log(stringArray, startStringArray);

let rotations = [0, 0, 0];

function intToChar(int) {
  const code = "A".charCodeAt(0);

  return String.fromCharCode(code + int);
}

function renderDrums(rotations, drumSelectors) {
  for (let i = 0; i < rotations.length; i++) {
    let drumChar = drumSelectors[i].querySelector("#rotations");

    drumChar.innerText = intToChar(rotations[i]);
  }
}

function initialiseDrums(rotations) {
  const drumSelectors = document.querySelectorAll(
    "#rotationes-container-child"
  );

  const textInput = document.getElementById("plaintext");
  const textoutput = document.getElementById("chipertext");

  for (let i = 0; i < drumSelectors.length; i++) {
    renderDrums(rotations, drumSelectors);

    let plusButton = drumSelectors[i].querySelector("#drum-rotator-plus");

    plusButton.addEventListener("click", () => {
      rotations[i]++;
      if (rotations[i] > startStringArray[0].length - 1) {
        rotations[i] = 0;
      }

      renderDrums(rotations, drumSelectors);

      textoutput.value = encryptString(stringArray, rotations, textInput.value);
      stringArray = [...startStringArray];
    });

    let minusButton = drumSelectors[i].querySelector("#drum-rotator-minus");

    minusButton.addEventListener("click", () => {
      rotations[i]--;
      if (rotations[i] < 0) {
        rotations[i] = startStringArray[0].length - 1;
      }

      renderDrums(rotations, drumSelectors);

      textoutput.value = encryptString(stringArray, rotations, textInput.value);
      stringArray = [...startStringArray];
    });
  }
}

initialiseDrums(rotations);

const textInput = document.getElementById("plaintext");
const textoutput = document.getElementById("chipertext");

textInput.addEventListener("input", (e) => {
  textoutput.value = encryptString(stringArray, rotations, e.target.value);

  stringArray = [...startStringArray];

  console.log(startStringArray === stringArray);
});

textoutput.value = encryptString(stringArray, rotations, textInput.value);

stringArray = [...startStringArray];

console.log(startStringArray === stringArray);
