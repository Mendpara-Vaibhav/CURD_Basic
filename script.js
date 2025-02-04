const arrList = [];
let selectedRowIndex = null;

function onFormSubmit() {
  if (!validate()) {
    return false;
  } else {
    let formData = readFormData();
    console.log(formData);

    if (selectedRowIndex == null) {
      arrList.push(formData);
      updateTable();
    } else {
      updateData(formData);
    }
    resetForm();
  }
}

function readFormData() {
  let formData = {};
  formData.fname = document.getElementById("fname").value;
  formData.lname = document.getElementById("lname").value;
  formData.email = document.getElementById("email").value;
  formData.gender =
    document.querySelector("input[name='gender']:checked")?.value || "";

  let hobbies = document.querySelectorAll('input[name="hobby"]:checked');
  formData.hobby = Array.from(hobbies)
    .map((hobby) => hobby.value)
    .join(", ");
  formData.country = document.getElementById("country").value;
  formData.age = document.getElementById("age").value;
  formData.password = document.getElementById("password").value;
  formData.cpassword = document.getElementById("cpassword").value;
  return formData;
}

function updateTable() {
  let html = "";
  document.getElementById("tableBody").innerHTML = "";

  arrList.forEach((element, index) => {
    html += `<tr>`;
    html += `<td>${element.fname}</td>`;
    html += `<td>${element.lname}</td>`;
    html += `<td>${element.email}</td>`;
    html += `<td>${element.gender}</td>`;
    html += `<td>${element.hobby}</td>`;
    html += `<td>${element.country}</td>`;
    html += `<td>${element.age}</td>`;
    html += `<td>${element.password}</td>`;
    html += `<td>${element.cpassword}</td>`;
    html += `<td>${`<a onclick=onEdit(${index}) >Edit</a> / <a onclick=onDelete(${index}) >Delete</a>`}</td> `;
    html += `</tr>`;
  });
  document.getElementById("tableBody").innerHTML = html;
}

function resetForm() {
  // document.getElementById("fname").value = "";
  // document.getElementById("lname").value = "";
  // document.getElementById("email").value = "";
  // document
  //   .querySelectorAll("input[name='gender']")
  //   .forEach((radio) => (radio.checked = false));
  // document
  //   .querySelectorAll('input[name="hobby"]')
  //   .forEach((checkbox) => (checkbox.checked = false));
  // document.getElementById("country").value = "";
  // document.getElementById("age").value = "";
  // document.getElementById("password").value = "";
  // document.getElementById("cpassword").value = "";

  document.getElementById("form").reset();
  selectedRowIndex = null;
}

function onEdit(index) {
  selectedRowIndex = index; // store the index of the selected row
  let selectedRow = arrList[index]; // Access array directly using the index
  document.getElementById("fname").value = selectedRow.fname;
  document.getElementById("lname").value = selectedRow.lname;
  document.getElementById("email").value = selectedRow.email;
  document.querySelector(
    `input[name='gender'][value="${selectedRow.gender}"] `
  ).checked = true;

  document.querySelectorAll('input[name="hobby"]').forEach((checkbox) => {
    checkbox.checked = selectedRow.hobby.split(", ").includes(checkbox.value);
  });
  document.getElementById("country").value = selectedRow.country;
  document.getElementById("age").value = selectedRow.age;
  document.getElementById("password").value = selectedRow.password;
  document.getElementById("cpassword").value = selectedRow.cpassword;
}

function updateData(formData) {
  arrList[selectedRowIndex] = formData; // directly update the array at the stored index
  updateTable(); // refresh table after updating
  selectedRowIndex = null; // clear selected row index
}

function onDelete(index) {
  if (confirm("Are you sure you want to delete")) {
    arrList.splice(index, 1); // remove from array using index
    updateTable(); // refresh table after deletion
    resetForm();
  }
}

function validate() {
  let fname = document.getElementById("fname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let cpassword = document.getElementById("cpassword").value;
  let country = document.getElementById("country").value;
  let age = document.getElementById("age").value;
  let gender = document.querySelector('input[name="gender"]:checked');
  let hobby = document.querySelectorAll('input[name="hobby"]:checked');

  if (fname.length < 2) {
    alert("please enter a valid name");
    return false;
  }
  if (!email.includes("@")) {
    alert("please enter a valid email");
    return false;
  }
  if (!gender) {
    alert("please select a gender");
    return false;
  }
  if (hobby.length < 2) {
    alert("please select atleast two hobbies");
    return false;
  }
  if (country == "") {
    alert("please select a country");
    return false;
  }
  if (age < 18) {
    alert("age must be greater than 18");
    return false;
  }
  if (password.length < 8) {
    alert("password must be at least 8 characters");
    return false;
  }
  if (password !== cpassword) {
    alert("password and confirm password are equal");
    return false;
  }
  return true;
}
