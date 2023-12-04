import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCs3m9ZWLYoQZYVXzW9URyDTqfGq9Cc4ds",
  authDomain: "obtinecredit-b43cd.firebaseapp.com",
  projectId: "obtinecredit-b43cd",
  storageBucket: "obtinecredit-b43cd.appspot.com",
  messagingSenderId: "670878608599",
  appId: "1:670878608599:web:b45c23f9ceeb363b255492",
  measurementId: "G-SR97YYFBB6",
};
// ${user.yes_ibc
//   .slice(0, 3)
//   .toUpperCase()}

{
  /* <td>${
  user.yes_ibcs
    ? user.yes_ibc.slice(0, 1)
    : user.no_ibc.slice(0, 1)
    ? user.no_ibc.slice(0, 6)
    : "Nu"
}</td> 



    <td>${user.yes_nbc.slice(0, 3) ? user.yes_nbc.slice(0, 11) : "nu"}</td>*/
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

var table;

function generateDataTable(user) {
  const tableAHtml = `<tr>
    <td>
        <div class="d-flex align-items-center">
            <div class="avatar-table avatar-blue mr-3">${user.name
              .slice(0, 2)
              .toUpperCase()}</div>
            <div class="">
                <p class="font-weight-bold mb-0">${user.name}</p>
                <p class="text-muted mb-0">${user.phone} </p>

            </div>
        </div>
    </td>
    <td>${user.selectedDate === "0 0 0" ? "nu" : user.selectedDate}</td>
    <td> ${
      Array.isArray(user.select_banks) && user.select_banks.length > 0
        ? user.select_banks.join(",")
        : "nu"
    }</td>
    <td>${user.another_ifn === "none" ? "nu" : user.another_ifn || "nu"}</td>
    <td>${user.yes_ibc === "yes-istoric-bancar(2)" ? "da" : "nu"}</td>
<td>${user.yes_nbc === "yes-negativ-birou-credit(3)" ? "da" : "nu"}</td>
    <td>${user.email ? user.email : "nu"}</td>

    <td>${user.timestamp.toDate().toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}</td>
    <td>${user.aboutUs}</td>
  </tr>`;
  return tableAHtml;
}
// Event listener for showing tooltips on cell click

async function fetchFirestoreData() {
  const usersRef = collection(db, "f_users");
  const querySnapshot = await getDocs(usersRef);

  // Initialize the DataTable if it doesn't exist
  if (!table) {
    table = $("#userTable").DataTable({
      aaSorting: [],
      // fixedColumns: true,
      // fixedHeader: true,
      fixedHeader: true,
      language: { search: "" },
      bInfo: false,

      lengthMenu: true,
      select: true,
      responsive: true,
      dom: "Bfrtip", // Display the buttons,
      // sDom: "lfrti",
      buttons: [
        "csv",
        "excel",
        "pdf",
        "print",
        "colvis",
        {
          extend: "searchBuilder",
          text: "Filtre",
        },
      ],
      // columns: [{ className: "my_class" }, null, null, null, null],
      pageLength: 10,
      columnDefs: [
        {
          targets: 2, // Target the third column (0-indexed)
          createdCell: function (td) {
            $(td).css("max-width", "200px");
            $(td).css("text-wrap", "balance");
          },
        },

        {
          responsivePriority: 1,
          targets: 7,
        },
        {
          responsivePriority: 2,
          targets: 0,
        },
      ],
    });
  }

  table.clear().draw();

  querySnapshot.forEach((doc) => {
    var user = doc.data();
    console.log(user);
    // Generate HTML for the user data
    const userHtml = generateDataTable(user);
    // Append the user data to the table
    table.row.add($(userHtml));
  });

  // Draw the table to display the added data
  table.draw();
  $(".dataTables_filter input").attr("placeholder", "Cauta..").css({
    // width: "200px",
    // display: "inline-block",
  });
  $('[data-toggle="tooltip"]').tooltip();
}

$(document).ready(function () {
  fetchFirestoreData();
});
