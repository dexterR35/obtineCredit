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


var table;
var tableData = [];


// Fetch Firestore data and populate DataTable
async function fetchFirestoreData() {
    const usersRef = collection(db, "f_users");
    const querySnapshot = await getDocs(usersRef);
    querySnapshot.forEach((doc) => {
      var user = doc.data();
      tableData.push([
        doc.id,
        user.name,
        user.email,
        user.phone,
        user.select_banks,
        user.selectedDate,
        user.no_ibc,
        user.yes_ibc,

        user.yes_nbc,
        '<button class="btn btn-secondary" onclick="infoUser(\'' + doc.id + '\')">info</button>' +
        '<button class="btn btn-secondary edit-user-btn">Edit</button>' +
        '<button class="btn btn-danger" onclick="deleteUser(\'' + doc.id + '\')">Delete</button>'
       
      ]);
    });
    var originalData = tableData; // Store the original table data
    if (table) {
      table.clear().draw();
    }
     table = $('#userTable').DataTable({
      data: tableData,
      columns: [
        { title: "ID" },
        { title: "Name" },
        { title: "Email" },
        { title: "Phone" },
        { title: "Banks" },
        { title: "Date" },
        { title: "NIBC" },
        { title: "YIBC" },
        { title: "YNBC" },
        { title: "Actions", orderable: false }
      ],
      dom: 'Bfrtip', // Display the buttons
      buttons: [
        'csv', 'excel', 'pdf', 'print', 'colvis',
        {
          extend: "searchBuilder",
          text: "Filter Builder",
          searchBuilder: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8,9,10,11] // Specify the columns to enable in the search builder
          }
        } // Add the required buttons
      ],
      
    });
      // Attach event handler for edit button using event delegation
  $('#userTable').on('click', '.edit-user-btn', function () {
    // var userId = table.row($(this).closest('tr')).data()[0];

    var userId = table.row($(this).parents('tr')).data()[0];
    editUser(userId);
  });
}
console.log(tableData,"tableData");

 // Edit user
async function editUser(userId) {
  var userData = tableData.find((data) => data[0] === userId);
  console.log(userData,"userData")
  console.log("User ID:", userId);

  if (userData) {
    var name = userData[1];
    var email = userData[2];
    var phone = userData[3];
    var status = userData[10];
    console.log(status);
    // Set the values in the modal
    $('#editName').val(name || '');
    $('#editEmail').val(email || '');
    $('#editPhone').val(phone || '');
    $('#editStatus').val(status || '');
    // Set the "data-user-id" attribute on the update button
    $('#updateUserBtn').attr('data-user-id', userId);

    // Show the modal
    $('#editUserModal').modal('show');
  } else {
    console.error("User not found.");
  }
}
 // Update user in Firestore
 async function updateUser(userId) {
  const userRef = doc(collection(db, "f_users"), userId);
  console.log(userRef,"userRef")
  console.log(userId,"userId")
  var userData = tableData.find((data) => data[0] === userId);

  if (userData) {
    var name = userData[1];
    var email = userData[2];
    var phone = userData[3];
    var status = userData[10];
    console.log(status);
    try {
      // Perform the update operation
      await updateDoc(userRef, {
        name: name,
        email: email,
        phone: phone,
        status_user: status
      });
      console.log("User updated successfully!");
      // Hide the modal after update
      $('#editUserModal').modal('hide');
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  } else {
    console.error("User data not found.");
  }
}

  // Delete user
  function deleteUser(userId) {
    console.log("Delete user with ID:", userId);
  }
  

    // Initialize the DataTable and fetch Firestore data
    $(document).ready(function () {
      fetchFirestoreData();
      $('#updateUserBtn').click(function () {
        var userId = $(this).data('userId');
        updateUser(userId);
      });
    });