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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

var table;

function formatDateForDisplay(timestamp) {
  if (!timestamp) {
    return "Error";
  }

  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("en-us", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function generateDataTable(user) {
  const displayDate = formatDateForDisplay(user.timestamp);
  const sortableDate = user.timestamp;

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

    <td data-order="${sortableDate}">${displayDate}</td>
    <td>${user.aboutUs}</td>
  </tr>`;
  return tableAHtml;
}

async function fetchFirestoreData() {
  const usersRef = collection(db, "f_users");
  const querySnapshot = await getDocs(usersRef);

  if (!table) {
    table = $("#userTable").DataTable({
      // aaSorting: [[7, "desc"]],
      language: { search: "" },
      fixedHeader: true,
      responsive: true,
      bInfo: false,
      autoFill: true,
      lengthMenu: true,
      select: true,
      dom: "Bfrtip",
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
      columnDefs: [
        {
          responsivePriority: 1,
          targets: [0, 7],
        },
        {
          responsivePriority: 10001,
          targets: "_all",
        },
        {
          targets: [0, 2, 3],
          createdCell: function (td) {
            $(td).css("text-wrap", "balance");
          },
        },
        {
          targets: 7,
          type: "date",
        },
        {
          targets: 7,
          createdCell: function (td) {
            $(td).css("background", "#ecfff2");
          },
        },
        {
          targets: 0,
          createdCell: function (td) {
            $(td).css("text-wrap", "balance");
            $(td).css("width", "300px");
          },
        },
      ],
      order: [[7, "desc"]],
      pageLength: 10,
    });
  } else {
    table.clear();
  }

  querySnapshot.forEach((doc) => {
    var user = doc.data();
    user.timestamp = user.timestamp.toDate
      ? user.timestamp.toDate()
      : new Date();

    console.log(user.timestamp);
    const userHtml = generateDataTable(user);
    table.row.add($(userHtml));
  });
  table.draw();
}

$(document).ready(function () {
  fetchFirestoreData();
});
