// Get input elements and buttons
const nameInput = document.getElementById("f_name");
const phoneInput = document.getElementById("p_phone");
const emailInput = document.getElementById("e_email");
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



// Get step containers
const step1Container = document.getElementById("step1-container");
const step2Container = document.getElementById("step2-container");
const step3Container = document.getElementById("step3-container");
const step4Container = document.getElementById("step4-container");
const step5Container = document.getElementById("step5-container");

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
  if (nameValue !== "" && phoneValue !== "" && emailValue !== "") {
    continueBtn.disabled = false;
  } else {
    continueBtn.disabled = true;
  }
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

// Add event listeners for date 



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
  progressBar.Next();
  progressBar.Next();
  await showHideSteps(step2Container, step3Container);
  toggleLoadingSpinner(false);
});

// Add event listener to yes button in step 4 to final

SendInfoStep4Btn.addEventListener("click", async () => {
  toggleLoadingSpinner(true);
  progressBar.Next();
  progressBar.Next();
  progressBar.Next();
  // Do something else
  contentContinue.classList.remove("hidden_c");
  contentYes.classList.add("hidden_c");
  contentNo.classList.add("hidden_c");
  await showHideSteps(step4Container, stepFinal);
  toggleLoadingSpinner(false);

});

// Add event listener to yes button in step 3 to 5
continueStep3.addEventListener("click", async () => {
  toggleLoadingSpinner(true);
  progressBar.Next();
  // Do something else
  await showHideSteps(step3Container, step5Container);
  toggleLoadingSpinner(false);
})

// Add event listener to yes button in step 5 to final

yesStep5Btn.addEventListener("click", async () => {
  toggleLoadingSpinner(true);
  progressBar.Next();
  contentNo.classList.add("hidden_c");
  contentYes.classList.remove("hidden_c");
  contentContinue.classList.add("hidden_c");
  await showHideSteps(step5Container, stepFinal);
  toggleLoadingSpinner(false);
});

// Add event listener to yes button in step 5 to final

noStep5Btn.addEventListener("click", async () => {
  toggleLoadingSpinner(true);
  progressBar.Next();
  // Do something else
  contentNo.classList.remove("hidden_c");
  contentYes.classList.add("hidden_c");
  contentContinue.classList.add("hidden_c");
  await showHideSteps(step5Container, stepFinal);
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




const jobDay = document.getElementById("jobDay");
const jobMonth = document.getElementById("jobMonth");
const jobYear = document.getElementById("jobYear");



function displayDate() {
  let currentTime = new Date();



  const months = [
    'Ianuarie',
    'Februarie',
    'Martie',
    'Aprilie',
    'Mai',
    'Iunie',
    'Iulie',
    'August',
    'Septembrie',
    'Octombrie',
    'Noiembrie',
    'Decembrie'
  ];

  for (let i = 0; i <= 11; i++) {
    const monthName = months[i];
    $('#jobMonth').append('<option value="' + monthName + '">' + monthName + '</option>');
  }
  for (let i = 1; i <= 31; i++) {
    $('#jobDay').append('<option value="' + i + '">' + i + '</option>');
  }

  let year = currentTime.getFullYear();
  for (let i = year; i >= 1980; i--) {
    $('#jobYear').append('<option value="' + i + '">' + i + '</option>');
  }

  // add event listener to select elements
  $('#jobDay, #jobMonth, #jobYear').on('change', function () {

    const selectedDay = jobDay.value;
    const selectedMonth = jobMonth.value;
    const selectedYear = jobYear.value;
    let selectedDateText = '';

    if (selectedDay !== "0" && selectedMonth !== "0" && selectedYear !== "0") {

    
    
      selectedDateText = 'Ai ales: ' + ' ' + selectedDay + ' ' + '/' + ' ' + selectedMonth + ' ' + '/' + ' ' + selectedYear;
      // selectedDateText = `felicitari, ai mai mult de ${selectedDay}`
      $('#selectedDate').css('display', 'block'); // update text of div
      $('#selectedDate').text(selectedDateText); // update text of div
      $('#selectedDate').css('border', '1px solid var(--border-input)'); // add border
      $('#selectedDate').css('padding', '0.4em 0'); // add border
      $('#continue-btn3').prop('disabled', false);
    } else {
      // $('#selectedDate').text('Please select a date.');
      $('#continue-btn3').prop('disabled', true);
    }

  });
}





const formFields_ = document.querySelectorAll('#f_name, #e_email, #p_phone');
const submitBtn_ = document.querySelector('.submitBtn');
const errorMsg_ = document.querySelector('#errorMsg');

// function validateForm() {
//   for (let i = 0; i < formFields_.length; i++) {
//     if (formFields_[i].value.trim() === '') {
//       errorMsg_.style.display = 'block'; // show error message
//       return false; // form is not valid
//     }
//   }
//   errorMsg_.style.display = 'none'; // hide error message
//   return true; // form is valid
// }

// // enable/disable submit button based on whether form is valid or not
// for (let i = 0; i < formFields_.length; i++) {
//   formFields_[i].addEventListener('input', () => {
//     submitBtn_.disabled = !validateForm();
//   });
// }


$("._input").attr({
  onfocus: "setFocus(true)",
  onblur: "setFocus(false)",
  maxlength: "40",
});


let progressBar = {
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


displayDate();







// $( window ).on( "load", function() {
//   console.log( "window loaded" );

// });