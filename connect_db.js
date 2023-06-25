import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  onSnapshot,
  serverTimestamp,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

//   import { displayAttribute } from './formular.js';

const firebaseConfig = {
  apiKey: "AIzaSyCs3m9ZWLYoQZYVXzW9URyDTqfGq9Cc4ds",
  authDomain: "obtinecredit-b43cd.firebaseapp.com",
  projectId: "obtinecredit-b43cd",
  storageBucket: "obtinecredit-b43cd.appspot.com",
  messagingSenderId: "670878608599",
  appId: "1:670878608599:web:b45c23f9ceeb363b255492",
  measurementId: "G-SR97YYFBB6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const continueBtn = document.getElementById("continue-btn");

const yesStep2Btn = document.getElementById("yes-step2");
const noStep2Btn = document.getElementById("no-step2");
const continueStep3 = document.getElementById("continue-btn3");
const SendInfoStep4Btn = document.getElementById("continueStep4");
const yesStep5Btn = document.getElementById("yes-step5");
const noStep5Btn = document.getElementById("no-step5");
const contentYes = document.getElementById("content-yes");
const contentNo = document.getElementById("content-no");
const contentContinue = document.getElementById("content-continue");

const step1Container = document.getElementById("step1-container");
const step2Container = document.getElementById("step2-container");
const step3Container = document.getElementById("step3-container");
const step4Container = document.getElementById("step4-container");
const step5Container = document.getElementById("step5-container");

const stepFinal = document.getElementById("step-final");
const termsDiv = document.querySelector(".terms_div");

const selectedDay = document.getElementById("jobDay");
const selectedMonth = document.getElementById("jobMonth");
const selectedYear = document.getElementById("jobYear");

let name_user = document.getElementById("f_name");
let phone_user = document.getElementById("p_phone");
let email_user = document.getElementById("e_email");
let option_user = document.getElementById("o_option");
let anotherIFN = document.querySelector(".another_ifn");

console.log(anotherIFN, "anotherIFM");
// const addUserBtn = document.querySelector("#continue-btn3");

let attrSelect = window.selectedDivs;

continueBtn.addEventListener("click", handleContinueBtn);
yesStep2Btn.addEventListener("click", handleYesStep2Btn);
noStep2Btn.addEventListener("click", handleNoStep2Btn);
SendInfoStep4Btn.addEventListener("click", handleSendInfoStep4Btn);
continueStep3.addEventListener("click", handleContinueStep3);
yesStep5Btn.addEventListener("click", handleYesStep5Btn);
noStep5Btn.addEventListener("click", handleNoStep5Btn);

// continueBtn.addEventListener("click", handleContinueBtn);
// addUserBtn.addEventListener("click", userID_add);

const buttons_add = [SendInfoStep4Btn, noStep5Btn, yesStep5Btn];
buttons_add.forEach((button) => {
  button.addEventListener("click", function (event) {
    userID_add(event);
  });
});
// const addUserBtn = document.querySelector(".btn-Sec4");

let btn_continueStepOne = 0;
let yes_nbc = 0;
// let no_nbc = 0;
let yes_ibc = 0;
let no_ibc = 0;
let ref_ = collection(db, "f_users");
const newDocRef = doc(ref_);

$(document).ready(function () {
  progressBar.Next();
});

async function userID_add() {
  const user_data = {
    name: name_user.value,
    phone: phone_user.value,
    email: email_user.value,
    aboutUs: option_user.value,
    select_banks: attrSelect,
    another_ifn: anotherIFN.value,
    selectedDate: selectedDay.value + " " + selectedMonth.value + " " + selectedYear.value,
    idkeys: newDocRef.id,
    timestamp: serverTimestamp(),
    btn_continueStepOne,
    yes_nbc,
    yes_ibc,
    no_ibc,
  };

  setDoc(newDocRef, user_data);
  console.log("document id is" + newDocRef.id);
  // console.log("user_data id is" + user_data.idkeys);
}

async function showHideSteps(currentStep, nextStep) {
  currentStep.style.display = "none";
  nextStep.style.display = "block";
}

async function checkEmailInNetworkCollection(email) {
  const q = query(collection(db, "f_users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

async function handleContinueBtn(event) {
  event.preventDefault();
  const _emails = email_user.value;
  const _name = name_user.value;
  const _phone = phone_user.value;
  const _aboutUs =
    option_user.value === "Cum ati auzit de noi!?" ? "" : option_user.value;
  // console.log(aboutUs, "aboutuys");
  // if (!name || !phone || !aboutUs || !emails) {
  //   console.log("Fill all the inputs.");
  //   return;
  // }

  if (_name.trim() === "" || _name.length < 4 || !isNaN(_name)) {
    showError("Introdu numele tău");
    return;
  } 
  
  if (_phone.length < 10) {
    showError("introdu un număr valid, din 10 cifre");
    return;
  }
  try {
    const emailExists = await checkEmailInNetworkCollection(_emails);
    if (emailExists) {
      // console.log("Email already exists in the network.");
      showError("Email există in baza noastră");
      return;
    }
    if (_aboutUs === "") {
      // console.log("Please select an option.");
      showError("Selectează o obțiune");
      return;
    }
    const outputS3Element = document.getElementById("output-s3");
    outputS3Element.textContent = _name;
    btn_continueStepOne = "First Step";
    await showHideSteps(step1Container, step2Container);
    progressBar.Next();
    displayGreetings();
  } catch (error) {
    // console.error("Error checking email:", error);
    alert("An error occurred while checking the email.");
  }
  toggleLoadingSpinner(false);
}

async function handleYesStep2Btn() {
  toggleLoadingSpinner(true);
  progressBar.Next();
  await showHideSteps(step2Container, step4Container);
  yes_nbc = "yes-negativ-birou-credit(3)";
  toggleLoadingSpinner(false);
}

async function handleNoStep2Btn() {
  toggleLoadingSpinner(true);
  progressBar.Next();
  progressBar.Next();
  await showHideSteps(step2Container, step3Container);
  // no_nbc = "no-negativ-birou-credit";
  toggleLoadingSpinner(false);
  console.log("step3-Angajare");
}

async function handleSendInfoStep4Btn() {
  toggleLoadingSpinner(true);
  progressBar.Next();
  progressBar.Next();
  progressBar.Next();
  contentContinue.classList.remove("hidden_c");
  contentYes.classList.add("hidden_c");
  contentNo.classList.add("hidden_c");
  await showHideSteps(step4Container, stepFinal);
  toggleLoadingSpinner(false);
}

async function handleContinueStep3() {
  console.log("step3-angajare");
  toggleLoadingSpinner(true);
  progressBar.Next();
  await showHideSteps(step3Container, step5Container);
  toggleLoadingSpinner(false);
}

async function handleYesStep5Btn() {
  toggleLoadingSpinner(true);
  progressBar.Next();
  contentNo.classList.add("hidden_c");
  contentYes.classList.remove("hidden_c");
  contentContinue.classList.add("hidden_c");
  yes_ibc = "yes-istoric-bancar(2)";
  await showHideSteps(step5Container, stepFinal);
  toggleLoadingSpinner(false);
}

async function handleNoStep5Btn() {
  toggleLoadingSpinner(true);
  progressBar.Next();
  contentNo.classList.remove("hidden_c");
  contentYes.classList.add("hidden_c");
  contentContinue.classList.add("hidden_c");
  no_ibc = "no-istoric-bancar(2)";
  await showHideSteps(step5Container, stepFinal);
  toggleLoadingSpinner(false);
}

function generateGreeting() {
  const now = new Date();
  const hour = now.getHours();
  let greeting;
  if (hour >= 5 && hour < 12) {
    greeting = "Bună dimineața";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Bună ziua";
  } else {
    greeting = "Bună seara";
  }
  return greeting;
}

function displayGreetings() {
  const timeGreeting = generateGreeting();
  const greetingSpan = document.getElementById("output-s2");
  greetingSpan.textContent = timeGreeting;
}

function showError(message) {
  const errorElement = document.querySelector(".error-message");
  errorElement.textContent = message;
}
