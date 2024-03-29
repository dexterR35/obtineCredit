window.selectedDivs = [];
console.log("selectedDivs top", selectedDivs);

$("._input").attr({
  onfocus: "setFocus(true)",
  onblur: "setFocus(false)",
  maxlength: "40",
});

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
        // showError(this, "This field is required");
      }
    });
  }
}

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

async function displayAttribute(div_) {
  console.log(div_, "divs");
  let dataName = div_.getAttribute("data-name");
  selectAttribute = dataName;
  console.log(selectAttribute, "1");
  // Check if attribute is already selected
  if (window.selectedDivs.includes(dataName)) {
    // Remove attribute from selectedDivs array
    window.selectedDivs = window.selectedDivs.filter(
      (item) => item !== dataName
    );
    // Remove highlighting from element
    div_.classList.remove("selected_b");
  } else {
    // Add attribute to selectedDivs array
    window.selectedDivs.push(dataName);
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

function checkRadio() {
  const input_r = document.querySelector(".another_ifn");
  const radio_r = document.querySelector(".radio_");
  input_r.addEventListener("focus", () => {
    radio_r.checked = true;
  });
}

checkRadio();
// Add event listeners to input fields

const jobDay = document.getElementById("jobDay");
const jobMonth = document.getElementById("jobMonth");
const jobYear = document.getElementById("jobYear");

function displayDate() {
  let currentTime = new Date();
  const months = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
  ];

  for (let i = 0; i <= 11; i++) {
    const monthName = months[i];
    $("#jobMonth").append(
      '<option value="' + monthName + '">' + monthName + "</option>"
    );
  }

  for (let i = 1; i <= 31; i++) {
    $("#jobDay").append('<option value="' + i + '">' + i + "</option>");
  }

  let year = currentTime.getFullYear();
  for (let i = year; i >= 1980; i--) {
    $("#jobYear").append('<option value="' + i + '">' + i + "</option>");
  }
  // add event listener to select elements
  $("#jobDay, #jobMonth, #jobYear").on("change", function () {
    const selectedDay = jobDay.value;
    const selectedMonth = jobMonth.value;
    const selectedYear = jobYear.value;
    let selectedDateText = "";

    if (selectedDay !== "0" && selectedMonth !== "0" && selectedYear !== "0") {
      selectedDateText =
        "Ai ales: " +
        " " +
        selectedDay +
        " " +
        "/" +
        " " +
        selectedMonth +
        " " +
        "/" +
        " " +
        selectedYear;
      // selectedDateText = `felicitari, ai mai mult de ${selectedDay}`
      $("#selectedDate").css("display", "block"); // update text of div
      $("#selectedDate").text(selectedDateText); // update text of div
      $("#selectedDate").css("border", "1px solid var(--border-input)"); // add border
      $("#selectedDate").css("padding", "0.4em 0"); // add border
      $("#continue-btn3").prop("disabled", false);
    } else {
      // $('#selectedDate').text('Please select a date.');
      $("#continue-btn3").prop("disabled", true);
    }
  });
}
displayDate();

progressBar.Reset();

// $( window ).on( "load", function() {
//   console.log( "window loaded" );

// });
