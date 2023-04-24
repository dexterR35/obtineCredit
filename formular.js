// Get input elements and buttons
const nameInput = document.getElementById("f_name");
const phoneInput = document.getElementById("p_phone");
const emailInput = document.getElementById("e_email");
const continueBtn = document.getElementById("continue-btn");

const yesStep2Btn = document.getElementById("yes-step2");
const noStep2Btn = document.getElementById("no-step2");

const yesStep3Btn = document.getElementById("yes-step3");
const noStep3Btn = document.getElementById("no-step3");


const SendInfoStep4Btn = document.getElementById("continueStep4");

// Get step containers
const step1Container = document.getElementById("step1-container");
const step2Container = document.getElementById("step2-container");
const step3Container = document.getElementById("step3-container");
const step4Container = document.getElementById("step4-container");

const stepFinal = document.getElementById("step-final");

const termsDiv = document.querySelector(".terms_div");

let selectedDivs = [];

console.log("termsDiv", termsDiv);


// continueBtn.style.visibility = "visible";
let outputName = [
  document.querySelector("#output-s3"),
  document.querySelector("#output-sF")
];
// Function to check if all inputs are filled
function checkInputs() {

  const nameValue = nameInput.value.trim();
  const phoneValue = phoneInput.value.trim();
  const emailValue = emailInput.value.trim();


  outputName.forEach((span) => {
    span.innerHTML = nameValue.toUpperCase();
  });
  // outputName.innerHTML = nameValue;

  // console.log("jobValue");
  // if (nameValue !== "" && phoneValue !== "" && emailValue !== "") {
  //   continueBtn.style.visibility = "visible";
  // } else {
  //   continueBtn.style.visibility = "visible";
  // }
  // if (jobValue !== "") {
  //   question.style.visibility = "visible";
  // } else {
  //   question.style.visibility = "visible";
  // }
}

function checkRadio() {
  const input_r = document.querySelector('.another_ifn');
  const radio_r = document.querySelector('.radio_');
input_r.addEventListener('focus', () => {
  radio_r.checked = true;
});
}
checkRadio();
// Add event listeners to input fields
nameInput.addEventListener("input", checkInputs);
phoneInput.addEventListener("input", checkInputs);
emailInput.addEventListener("input", checkInputs);

// Function to show/hide step containers
async function showHideSteps(currentStep, nextStep) {
  currentStep.style.display = "none";
  nextStep.style.display = "block";
}

// Add event listener to continue button
continueBtn.addEventListener("click", async () => {
  toggleLoadingSpinner(false); // afișează spinner-ul
  progressBar.Next();
  await showHideSteps(step1Container, step2Container);
  toggleLoadingSpinner(false); // ascunde spinner-ul
});

// Add event listener to yes button in step 2 to 4

yesStep2Btn.addEventListener("click", async () => {
  toggleLoadingSpinner(true); // ascunde spinner-ul
  progressBar.Next();
  await showHideSteps(step2Container, step4Container);
  toggleLoadingSpinner(false); // ascunde spinner-ul
});

// Add event listener to no button in step 2 to 3

noStep2Btn.addEventListener("click", async () => {
  toggleLoadingSpinner(true);
  await showHideSteps(step2Container, step3Container);
  toggleLoadingSpinner(false);
});

// Add event listener to yes button in step 3 to 4

yesStep3Btn.addEventListener("click", async () => {
  toggleLoadingSpinner(true);
  await showHideSteps(step3Container, step4Container);
  toggleLoadingSpinner(false);
});

// Add event listener to yes button in step 3 to 5

noStep3Btn.addEventListener("click", async () => {
  toggleLoadingSpinner(true);
  progressBar.Next();
  // Do something else
  await showHideSteps(step3Container, stepFinal);
  toggleLoadingSpinner(false);
});

// Add event listener to yes button in step 3 to final

SendInfoStep4Btn.addEventListener("click", async () => {
  toggleLoadingSpinner(true);
  progressBar.Next();
  // Do something else
  await showHideSteps(step4Container, stepFinal);
  toggleLoadingSpinner(false);
});


function toggleLoadingSpinner(showSpinner) {
  let spinner = document.getElementById("container-spinner");
  if (!showSpinner) {
    spinner.style.display = "block";
    setTimeout(() => {
      spinner.style.display = "none";
    }, 700);
  } else {
    spinner.style.display = "none";
  }
}

function displayAttribute(div_) {
  let dataName = div_.getAttribute("data-name");
  // Check if attribute is already selected
  if (selectedDivs.includes(dataName)) {
    // Remove attribute from selectedDivs array
    selectedDivs = selectedDivs.filter((item) => item !== dataName);
    // Remove highlighting from element
    div_.classList.remove("selected_b");
  } else {
    // Add attribute to selectedDivs array
    selectedDivs.push(dataName);

    // Highlight selected element
    div_.classList.add("selected_b");
  }

  let selectedDivs_Div = document.getElementById("selectedDivs");
  selectedDivs_Div.innerHTML = "";
  // Display all selected attributes
  for (let i = 0; i < selectedDivs.length; i++) {
    let _li = document.createElement("LI");
    _li.innerHTML = selectedDivs[i];
    selectedDivs_Div.appendChild(_li);
  }
   // Get the value of input_r and append it to selectedDivs_Div
   let input_r_value = document.querySelector(".another_ifn").value;
   if (input_r_value) {
     let _li = document.createElement("LI");
     _li.innerHTML = input_r_value;
     selectedDivs_Div.appendChild(_li);
   }
}

function setFocus(on) {
  let elementFocus = document.activeElement;
  if (on) {
    setTimeout(function () {
      elementFocus.parentNode.classList.add("focus");
    });
  } else {
    let boxR = document.querySelector("._forms");
    // console.log(boxR, "boxes");
    boxR.classList.remove("focus");
    $("._input").each(function () {
      let $input = $(this);
      let $parent = $input.closest("._forms");
      if ($input.val()) {
        $parent.addClass("focus");
      } else {
        $parent.removeClass("focus");
      }
    });
  }
}

$("._input").attr({
  onfocus: "setFocus(true)",
  onblur: "setFocus(false)",
  maxlength: "40",
});


var progressBar = {
  Bar: $("#progress-bar"),
  Reset: function () {
    if (this.Bar) {
      this.Bar.find("li").removeClass("active");
    }
  },
  Next: function () {
    $("#progress-bar li:not(.active):first").addClass("active");
  },
  Back: function () {
    $("#progress-bar li.active:last").removeClass("active");
  },
};

progressBar.Reset();


function displayDate() {
  for (var i = 1; i <= 31; i++) {
    $('#birthDay').append('<option value="' + i + '">' + i + '</option>');
  }

  for (var i = 1; i <= 12; i++) {
    $('#birthMonth').append('<option value="' + i + '">' + i + '</option>');
  }

  var currentTime = new Date();
  var year = currentTime.getFullYear();
  for (var i = year; i >= 1900; i--) {
    $('#birthYear').append('<option value="' + i + '">' + i + '</option>');
  }
  
  // add event listener to select elements
  $('#birthDay, #birthMonth, #birthYear').on('change', function() {
    var day = $('#birthDay').val();
    var month = $('#birthMonth').val();
    var year = $('#birthYear').val();
    $('#selectedDate').text(month + '.' + day + '.' + year); // update text of div
  });
}

displayDate();
////
// $("#Next").on('click', function () {
//   progressBar.Next();
// })
// $("#Back").on('click', function () {
//   progressBar.Back();
// })
// $("#Reset").on('click', function () {
//   progressBar.Reset();
// })

// validate form 


const formFields_ = document.querySelectorAll('#f_name, #e_email, #p_phone');
const submitBtn_ = document.querySelector('.submitBtn');
const errorMsg_ = document.querySelector('#errorMsg');

function validateForm() {
  for (let i = 0; i < formFields_.length; i++) {
    if (formFields_[i].value === '') {
      errorMsg_.style.display = 'block'; // show error message
      return false; // form is not valid
    }
  }
  errorMsg_.style.display = 'none'; // hide error message
  return true; // form is valid
}

// enable/disable submit button based on whether form is valid or not
for (let i = 0; i < formFields_.length; i++) {
  formFields_[i].addEventListener('input', () => {
    submitBtn_.disabled = !validateForm();
  });
}