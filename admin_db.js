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





// Fetch Firestore data and populate DataTable
async function fetchFirestoreData() {
    const usersRef = collection(db, "f_users");
    const querySnapshot = await getDocs(usersRef);
    
    var tableData = [];
    querySnapshot.forEach((doc) => {
      var user = doc.data();
      tableData.push([
        // doc.id,
        user.name,
        user.email,
        user.phone,
        user.select_banks,
        user.selectedDate,
        user.no_ibc,
        user.yes_ibc,
        user.no_nbc,
        user.yes_nbc,
        '<button class="btn btn-primary" onclick="editUser(\'' + doc.id + '\')">Edit</button> ' +
        '<button class="btn btn-danger" onclick="deleteUser(\'' + doc.id + '\')">Delete</button>'
      ]);
    });
    var originalData = tableData; // Store the original table data
    var table = $('#userTable').DataTable({
      data: tableData,
      columns: [
        // { title: "ID" },
        { title: "Name" },
        { title: "Email" },
        { title: "Phone" },
        { title: "Banks" },
        { title: "Date" },
        { title: "NIBC" },
        { title: "YIBC" },
        { title: "NNBC" },
        { title: "YNBC" },
        { title: "Actions", orderable: false }
      ]
    });
  
// Apply search filter
$('#searchInput').on('keyup', function() {
    var searchValue = this.value;
    if (searchValue) {
      var filteredData = originalData.filter(function(row) {
        // Match search value against all columns
        return Object.values(row).some(function(column) {
          return column.toString().toLowerCase().includes(searchValue.toLowerCase());
        });
      });
      table.clear().rows.add(filteredData).draw();
    } else {
      table.clear().rows.add(originalData).draw();
    }
  });
  
  // Apply custom filters
  $('#filterSelect').on('change', function() {
    var columnIndex = parseInt($(this).val());
    var filterValue = '';

    if (columnIndex !== 0) {
      filterValue = this.value;
    }

    table.columns().every(function() {
      this.search('').draw(); // Reset all column filters
    });

    if (filterValue) {
      table.columns(columnIndex - 1).search(filterValue).draw();
    }
  });
  }
  
  // Edit user
  function editUser(userId) {
    // Implement your edit logic here
    console.log("Edit user with ID:", userId);
  }
  
  // Delete user
  function deleteUser(userId) {
    // Implement your delete logic here
    console.log("Delete user with ID:", userId);
  }
  
  // Call the fetchFirestoreData function to populate DataTable
  fetchFirestoreData();