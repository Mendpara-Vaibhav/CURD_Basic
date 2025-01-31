const arrList = [];
let selectedRowIndex = null;

function onFormSubmit() {
  let formData = readFormData();
  // console.log(formData);

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
  return formData;
}

function updateTable() {
  let html = "";
  document.getElementById("tableBody").innerHTML = "";

  arrList.forEach((element, index) => {
    html += `<tr>`;
    html += `<td>${element.fname}</td>`;
    html += `<td>${element.lname}</td>`;
    html += `<td>${`<a onclick=onEdit(${index}) >Edit</a> / <a onclick=onDelete(${index}) >Delete</a>`}</td> `;
    html += `</tr>`;
  });
  document.getElementById("tableBody").innerHTML = html;
}

function resetForm() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  selectedRowIndex = null;
}

function onEdit(index) {
  selectedRowIndex = index; // store the index of the selected row
  let selectedRow = arrList[index]; // Access array directly using the index
  document.getElementById("fname").value = selectedRow.fname;
  document.getElementById("lname").value = selectedRow.lname;
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
