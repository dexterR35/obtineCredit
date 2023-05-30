import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";

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

const selectedDay = document.getElementById("jobDay").value;
const selectedMonth = document.getElementById("jobMonth").value;
const selectedYear = document.getElementById("jobYear").value;

let name_user = document.getElementById("f_name");
let phone_user = document.getElementById("p_phone");
let email_user = document.getElementById("e_email");
let option_user = document.getElementById("o_option");

// const emailInput = document.getElementById("e_email");
let attrSelect = window.selectedDivs;




// const addUserBtn = document.querySelector(".btn-Sec4");
const addUserBtn = document.querySelector("#continue-btn3");

let f_stepBtn = 0;
let yes_nbc = 0;
let no_nbc = 0;

let yes_ibc = 0;
let no_ibc = 0;



async function checkEmailInNetworkCollection(email) {
  const q = query(collection(db, "f_users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}
  // let selectedDivsssss = Array.from(document.querySelectorAll(".selected_b")).map(div => div.getAttribute("data-name"));
  // let selectedDivs = Array.from(document.querySelectorAll(".selected_b")).map(div => div.getAttribute("data-name"));
  // console.log(selectedDivs,"selectedDivs");
  // const email_user_check = email_user;
  // const emailExists = await checkEmailInNetworkCollection(email_user_check);
  // if (emailExists) {
  //   alert("Email already exists in the network!");
  //   return;
  // }


addUserBtn.addEventListener("click", userID_add);

async function userID_add() {

  let ref_ = collection(db, "f_users");
  const newDocRef = doc(ref_);

  const user_data = {
    name: name_user.value,
    phone: phone_user.value,
    email: email_user.value,
    aboutUs: option_user.value,
    select_banks:attrSelect,
    selectedDate: selectedDay + " " + selectedMonth + " " + selectedYear, // Add the selected date
    //   ss: selectedDivsssss,
    //   portofolio: checkbox_web.checked ? "N/A" : portofolioBox.value,
    idkeys: newDocRef.id,
    //   selectedAvatarRef,
    timestamp: serverTimestamp(),
    f_stepBtn,
    yes_nbc,
    no_nbc,
    yes_ibc,
    no_ibc,
  };

  /* Validate Data before adding to firestore */
  // if (
  //   !user_data.name ||
  //   !user_data.phone ||
  //   !user_data.email ||
  //   !user_data.aboutUs ||
  //   !user_data.select_banks
  // ) {
  //   console.error("Invalid data:", user_data);
  //   alert("Fill All the inputs");
  //   return;
  // }

  // showLoadingModal("data added succesfully", "_addSucces");

  setDoc(newDocRef, user_data)
    // /* Reset Form */
    // .then(() => {
    //   console.log("data added succesfully");
    //   // reset form inputs
    //   name_user.value = "";
    //   phone_user.value = "";
    //   email_user.value = "";
    //   option_user.value = "";
    //   attrSelect.value = "";
    //   // show success message modal
    // })
    // .catch((error) => {
    //   alert("unsecc operation. error:" + error);
    // });
  console.log("document id is" + newDocRef.id);
}



continueBtn.addEventListener("click", handleContinueBtn);
yesStep2Btn.addEventListener("click", handleYesStep2Btn);
noStep2Btn.addEventListener("click", handleNoStep2Btn);
SendInfoStep4Btn.addEventListener("click", handleSendInfoStep4Btn);
continueStep3.addEventListener("click", handleContinueStep3);
yesStep5Btn.addEventListener("click", handleYesStep5Btn);
noStep5Btn.addEventListener("click", handleNoStep5Btn);


async function showHideSteps(currentStep, nextStep) {
  currentStep.style.display = "none";
  nextStep.style.display = "block";
}

// Add event listener to continue button
// continueBtn.addEventListener("click", handleContinueBtn);

async function handleContinueBtn() {
  
  const email = email_user.value;
  const name = name_user.value;
  const phone = phone_user.value;
  const aboutUs = email_user.value;
  if (!email) {
    alert("Please enter an email address.");
    // toggleLoadingSpinner(false);
    return;
  }
  try {
    const emailExists = await checkEmailInNetworkCollection(email);
    if (emailExists) {
      alert("Email already exists in the network!");
    } else {
    
      if (!name || !phone || !aboutUs) {
        alert("Fill all the inputs.");
        return;
      }
      f_stepBtn = "continue-1";
      progressBar.Next();
      await showHideSteps(step1Container, step2Container);
    }
  } catch (error) {
    console.error("Error checking email:", error);
    alert("An error occurred while checking the email.");
  }
  toggleLoadingSpinner(false); // Hide loading spinner
}


async function handleYesStep2Btn() {
  toggleLoadingSpinner(true);
  progressBar.Next();
  await showHideSteps(step2Container, step4Container);
  yes_nbc = "yes-2";
  toggleLoadingSpinner(false); 
}

async function handleNoStep2Btn() {
  toggleLoadingSpinner(true);
  progressBar.Next();
  progressBar.Next();
  await showHideSteps(step2Container, step3Container);
  no_nbc = "no-3";
  toggleLoadingSpinner(false);
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
  await showHideSteps(step5Container, stepFinal);
  toggleLoadingSpinner(false);
}

async function handleNoStep5Btn() {
  toggleLoadingSpinner(true);
  progressBar.Next();
  contentNo.classList.remove("hidden_c");
  contentYes.classList.add("hidden_c");
  contentContinue.classList.add("hidden_c");
  await showHideSteps(step5Container, stepFinal);
  toggleLoadingSpinner(false);
}

function toggleLoadingSpinner(showSpinner) {
  let spinner = document.getElementById("container-spinner");
  if (!showSpinner) {
    spinner.style.display = "flex";
    setTimeout(() => {
      spinner.style.display = "none";
    }, 800);
  } else {
    spinner.style.display = "none";
  }
}

// Event listener for input_r changes
// document.querySelector(".another_ifn").addEventListener("input", function () {
//   let input_r_value = document.querySelector(".another_ifn").value;
//   let selectedDivs_Div = document.getElementById("selectedDivs");
//   // Remove previous input value if present
//   let existingInput = selectedDivs_Div.querySelector(".input-value");
//   if (existingInput) {
//     existingInput.remove();
//   }
//   // Add the new input value to selectedDivs_Div
//   if (input_r_value) {
//     let _li = document.createElement("li");
//     _li.innerHTML = input_r_value;
//     _li.classList.add("input-value");
//     selectedDivs_Div.appendChild(_li);
//   }
// });


