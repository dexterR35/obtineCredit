
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

function toggleLoadingSpinner(showSpinner) {
  var spinner = document.getElementById("container-spinner");

  if (showSpinner) {
    spinner.style.display = "block";
    setTimeout(() => {
      spinner.style.display = "none";
    }, 700);
  } else {
    spinner.style.display = "none";
  }
}

// continueBtn.style.visibility = "visible";

// Function to check if all inputs are filled
function checkInputs() {
  const nameValue = nameInput.value.trim();
  const phoneValue = phoneInput.value.trim();
  const emailValue = emailInput.value.trim();
  document.getElementById("output-name").innerHTML = nameValue;
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
  toggleLoadingSpinner(true); // afișează spinner-ul
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
}
function setFocus(on) {
  let elementFocus = document.activeElement;
  if (on) {
    setTimeout(function () {
      elementFocus.parentNode.classList.add("focus");
    });
  } else {
    let boxR = document.querySelector("._forms");
    console.log(boxR, "boxes");
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
  required: "required",
  maxlength: "40",
});

$(".step_p").each(function (index, element) {
  // element == this
  $(element).not(".active").addClass("done");
  $(".done").html('<i class="icon-ok"></i>');
  if ($(this).is(".active")) {
    return false;
  }
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

