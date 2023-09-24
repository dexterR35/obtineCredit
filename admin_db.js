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
var tableData = [];


// Fetch Firestore data and populate DataTable
async function fetchFirestoreData() {
  const usersRef = collection(db, "f_users");
  const querySnapshot = await getDocs(usersRef);
  querySnapshot.forEach((doc) => {
    var user = doc.data();
    console.log(user);
    tableData.push([
      // doc.id,
      user.name,
      user.phone,
      user.selectedDate,           
      user.select_banks,
      user.no_ibc,
      user.yes_ibc,
      user.yes_nbc,
      user.email,
      user.user_status,
    ]);
  });
  if (table) {
    table.clear().draw();
  }
  table = $('#userTable').DataTable({
    data: tableData,

    
    columnDefs: [
      {
        responsivePriority: 1,
        targets:0
      },
      {
        responsivePriority: 2,
        targets: -1
      }
    ],
    aaSorting: [],
    responsive: true,
    dom: 'Bfrtip', // Display the buttons
    buttons: [
      'csv', 'excel', 'pdf', 'print', 'colvis',
      {
        extend: "searchBuilder",
        text: "Filter Builder",
        searchBuilder: {
          columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] // Specify the columns to enable in the search builder
        }
      } // Add the required buttons
    ],

  });
  
  $(".dataTables_filter input")
    .attr("placeholder", "Search here...")
    .css({
      width: "300px",
      display: "inline-block"
    });

  $('[data-toggle="tooltip"]').tooltip();
}
console.log(tableData, "tableData");

// Initialize the DataTable and fetch Firestore data
$(document).ready(function () {
  fetchFirestoreData();
});