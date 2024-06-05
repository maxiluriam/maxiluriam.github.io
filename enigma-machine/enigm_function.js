let startStringArray = [
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "QWERTZUIOASDFGHJKPYXCVBNML",
  "DMTWSILRUYQNKFEJCAZBPGXOHV",
  "HQZGPJTMOBLNCIFDYAWVEUSRKX",
  "UQNTLSZFMREHDPXKIBVYGJCWOA",
  "IMETCGFRAYSQBZXWLHKDVUPOJN",
];

let startStringArraySwedish = [
  "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ",
  "PSBGÖXQJDHWOÄUCFRTEZVÅINLYMKA",
  "CHNSYÖADMOTRZXBWÄIGÅEKQUPFLVJ",
  "ÅVQIAÄWXRJBÖZSPCFYUNTHDOMEKGL",
  "LDGBÄNCPSKJAVFZHXUIÅRMWQÖOTEY",
];

// Original no W
//"ABCDEFGHIJKLMNOPQRSTUVXYZÅÄÖ",
//"ABCDEFGHIJKLMNOPQRSTUVXYZÅÄÖ",
//"PSBGÖXQJDHOÄUCFRTEZVÅINLYMKA",
//"CHNSYÖADMOTRZXBÄIGÅEKQUPFLVJ",
//"ÅVQIAÄXRJBÖZSPCFYUNTHDOMEKGL",
//"LDGBÄNCPSKJAVFZHXUIÅRMQÖOTEY",

// ENCRYPT

function encryptChar(array, startingChar) {
  let cacheChar = startingChar;

  for (let int = 1; int < array.length - 1; int++) {
    cacheChar = array[int][array[0].indexOf(cacheChar)];
  }
  cacheChar = array[array.length - 1][array[0].indexOf(cacheChar)];

  for (let int = 1; int < array.length - 1; int++) {
    cacheChar = array[0][array[array.length - 1 - int].indexOf(cacheChar)];
  }

  if (cacheChar === undefined || startingChar === "*") {
    cacheChar = startingChar;
  }

  return cacheChar;
}

function rotateStringArrayEncrypt(array, rotations) {
  //  rotations[0]++;

  // for (let int = 0; int < rotations.length - 1; int++) {
  //   if (rotations[int] > startStringArray[0].length) {
  //     rotations[int] = 0;
  //     rotations[int + 1]++;
  //   }
  // }

  for (let int = 2; int < array.length - 1; int++) {
    if (rotations[int - 3] === array.length || int === 2) {
      array[int] = array[int].replace(/(\S+)(\S)/g, "$2$1");
    }
  }

  return [array, rotations];
}

function initialRotaionsEncrypt(array, rotations) {
  for (let int = 2; int < array.length - 1; int++) {
    for (let jint = 0; jint < rotations[int - 2]; jint++) {
      array[int] = array[int].replace(/(\S+)(\S)/g, "$2$1");
    }
  }

  return array;
}

export default function encryptString(starTingArray, rotations, string) {
  let rotationscache = rotations;

  let stringArray = initialRotaionsEncrypt(starTingArray, rotationscache);
  string = string.toUpperCase();

  let newString = "";

  for (let int = 0; int < string.length; int++) {
    if (string[int] === " ") {
      newString += " ";
    } else {
      [stringArray, rotationscache] = rotateStringArrayEncrypt(
        stringArray,
        rotationscache
      );
      newString += encryptChar(stringArray, string[int]);
    }
  }
  console.log(starTingArray === stringArray);
  return newString;
}
