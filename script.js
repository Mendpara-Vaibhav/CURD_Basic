const arrList = [];
let selectedRowIndex = null;

function onFormSubmit() {
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

function readFormData() {
  let formData = {};
  formData.fname = document.getElementById("fname").value;
  formData.lname = document.getElementById("lname").value;
  formData.email = document.getElementById("email").value;
  formData.gender = document.querySelector("input[name='gender']:checked")
    ? document.querySelector("input[name='gender']:checked").value
    : "";

  let hobbies = document.querySelectorAll('input[name="hobby"]:checked');
  formData.hobby = Array.from(hobbies)
    .map((hobby) => hobby.value)
    .join(", ");

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
    html += `<td>${`<a onclick=onEdit(${index}) >Edit</a> / <a onclick=onDelete(${index}) >Delete</a>`}</td> `;
    html += `</tr>`;
  });
  document.getElementById("tableBody").innerHTML = html;
}

function resetForm() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  document
    .querySelectorAll("input[name='gender']")
    .forEach((radio) => (radio.checked = false));

  document
    .querySelectorAll('input[name="hobby"]')
    .forEach((checkbox) => (checkbox.checked = false));
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
  // document.getElementsByName("hobby").value = selectedRow.hobby;
  // document.querySelectorAll("input[name='hobby']").value = selectedRow.hobby;
  document.querySelectorAll('input[name="hobby"]').forEach((checkbox) => {
    checkbox.checked = selectedRow.hobby.split(", ").includes(checkbox.value);
  });
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
