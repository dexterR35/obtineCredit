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


var table;

function generateDataTable(user) {
  const tableAHtml = `<tr>
    <td>
        <div class="d-flex align-items-center">
            <div class="avatar-table avatar-blue mr-3">${(user.name).slice(0, 2).toUpperCase()}</div>
            <div class="">
                <p class="font-weight-bold mb-0">${user.name}</p>
                <p class="text-muted mb-0">Istoric Bancar: ${user.yes_ibc.slice(0, 3).toUpperCase()}</p>
            </div>
        </div>
    </td>
    <td>${user.phone}</td>
    <td>${user.selectedDate}</td>
    <td> ${Array.isArray(user.select_banks) && user.select_banks.length > 0 ? user.select_banks.join(', ') : 'Nu exista'}</td>
    <td>${user.another_ifn === "none" ? "Nu exista" : (user.another_ifn || "Nu exista")}</td>
    <td>${user.yes_ibc ? user.yes_ibc.slice(0, 4) : user.no_ibc.slice(0, 4) ? user.no_ibc.slice(0, 4) : 'Nu exista'}</td>
    <td>${user.yes_nbc.slice(0, 3) ? user.yes_nbc.slice(0, 11) : "Nu exista"}</td>
    <td>${user.email ? user.email : "none"}</td>

    <td>${user.timestamp.toDate().toLocaleDateString('ro-RO', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })}</td>
    <td>${user.aboutUs}</td>

  </tr>`;
  // console.log(user.select_banks)
  // Append the HTML to the table
  return tableAHtml;
}

async function fetchFirestoreData() {
  const usersRef = collection(db, "f_users");
  const querySnapshot = await getDocs(usersRef);

  // Initialize the DataTable if it doesn't exist
  if (!table) {
    table = $('#userTable').DataTable({
      aaSorting: [],
      // fixedColumns: true,
      fixedHeader: false,
      bAutoWidth: false,
      lengthMenu: true,
      select: true,
      responsive: true,
      dom: 'Bfrtip', // Display the buttons
      buttons: [
        'csv', 'excel', 'pdf', 'print', 'colvis',
        {
          extend: "searchBuilder",
          text: "Filter Builder",
        }
      ],
      "columns": [
        { className: "my_class" },
        null,
        null,
        null,
        null
      ],
      pageLength: 8,
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
  $(".dataTables_filter input")
    .attr("placeholder", "Search here...")
    .css({
      width: "300px",
      display: "inline-block"
    });
  $('[data-toggle="tooltip"]').tooltip();
}

$(document).ready(function () {
  fetchFirestoreData();
});