import data from "./data.js";

let studentData = data;
function loadData(studentData) {
  if (document.getElementById("table-2-div").style.display == "block") {
    document.getElementById("table-2-div").style.display = "none";
    // studentData = data;
  }
  const table = document.getElementsByTagName("table")[0];

  table.innerHTML =
    "<tr><td>Id</td><td>Name</td><td>Gender</td><td>Class</td><td>Marks</td><td>Passing</td><td>Email</td></tr>";

  studentData.map((student) => {
    let tr = document.createElement("tr");

    //id
    let td1 = document.createElement("td");
    td1.innerText = student.id;
    //   console.log(td1.innerText);

    // image full-name
    let td2 = document.createElement("td");

    let image = document.createElement("img");
    image.src = student.img_src;
    let p = document.createElement("p");
    p.innerText = student.first_name + " " + student.last_name;

    td2.append(image, p);
    td2.classList.add("td2-container");

    //   console.log(td2);

    let td3 = document.createElement("td");
    td3.innerText = student.gender;

    let td4 = document.createElement("td");
    td4.innerText = student.class;

    let td5 = document.createElement("td");
    td5.innerText = student.marks;

    let td6 = document.createElement("td");
    td6.innerText = student.passing ? "Passed" : "Failed";

    let td7 = document.createElement("td");
    td7.innerText = student.email;

    tr.append(td1, td2, td3, td4, td5, td6, td7);

    table.appendChild(tr);
  });
}

// search

const searchBtn = document.getElementById("searchbtn");
searchBtn.addEventListener("click", (e) => {
  let searchValue = document.getElementById("search").value;

  if (searchValue == "") {
    alert("please enter data to search");
    return;
  }
  //   console.log(searchValue);
  studentData = data.filter((student) => {
    let fullName = (
      student.first_name +
      student.last_name +
      student.email
    ).toLocaleLowerCase();
    // console.log(fullName);
    return fullName.indexOf(searchValue.toLocaleLowerCase()) !== -1;
  });
  //   console.log(studentData);
  //   console.log(studentData);
  if (studentData.length == 0) {
    document.getElementsByTagName("table")[0].style.display = "none";
    document.getElementsByTagName("table")[1].style.display = "none";
    document.getElementById("not-found").style.display = "block";

    return;
  }

  loadData(studentData);
  studentData = data;
});

// sort A to Z

const sortAZBtn = document.getElementById("sortAZ");

sortAZBtn.addEventListener("click", () => {
  studentData.sort((a, b) => {
    let fullNameA = a.first_name + a.last_name;
    let fullNameB = b.first_name + b.last_name;

    return fullNameA > fullNameB ? 1 : -1;
  });

  loadData(studentData);
});

const sortZABtn = document.getElementById("sortZA");

sortZABtn.addEventListener("click", () => {
  studentData.sort((a, b) => {
    let fullNameA = a.first_name + a.last_name;
    let fullNameB = b.first_name + b.last_name;

    return fullNameA > fullNameB ? -1 : 1;
  });

  loadData(studentData);
});

// sort by marks

const sortMarksBtn = document.getElementById("markssort");

sortMarksBtn.addEventListener("click", () => {
  studentData.sort((a, b) => {
    return a.marks > b.marks ? 1 : -1;
  });

  loadData(studentData);
});

const passBtn = document.getElementById("passbtn");

passBtn.addEventListener("click", () => {
  studentData = studentData.filter((student) => student.passing);
  loadData(studentData);
  studentData = data;
});

const classBtn = document.getElementById("classbtn");

classBtn.addEventListener("click", () => {
  studentData.sort((a, b) => (a.class > b.class ? 1 : -1));

  loadData(studentData);
});

const genderSortBtn = document.getElementById("gendersortbtn");

genderSortBtn.addEventListener("click", () => {
  loadGenderBase();
  studentData = data;
});

//gender based
function loadGenderBase() {
  const table1 = document.getElementsByTagName("table")[0];
  const table2 = document.getElementsByTagName("table")[1];

  table1.innerHTML =
    "<tr><td>Id</td><td>Name</td><td>Gender</td><td>Class</td><td>Marks</td><td>Passing</td><td>Email</td></tr>";
  table2.innerHTML =
    "<tr><td>Id</td><td>Name</td><td>Gender</td><td>Class</td><td>Marks</td><td>Passing</td><td>Email</td></tr>";
  //   table.innerHTML =
  //     "<tr><td>Id</td><td>Name</td><td>Gender</td><td>Class</td><td>Marks</td><td>Passing</td><td>Email</td></tr>";

  let isMalePresent = false;
  let isFemalePresent = false;

  studentData = studentData.filter((student) => {
    if (student.gender == "Male" || student.gender == "Female") {
      return true;
    } else {
      return false;
    }
  });

  studentData.map((student) => {
    let tr = document.createElement("tr");

    //id
    let td1 = document.createElement("td");
    td1.innerText = student.id;
    //   console.log(td1.innerText);

    // image full-name
    let td2 = document.createElement("td");

    let image = document.createElement("img");
    image.src = student.img_src;
    let p = document.createElement("p");
    p.innerText = student.first_name + " " + student.last_name;

    td2.append(image, p);
    td2.classList.add("td2-container");

    //   console.log(td2);

    let td3 = document.createElement("td");
    td3.innerText = student.gender;

    let td4 = document.createElement("td");
    td4.innerText = student.class;

    let td5 = document.createElement("td");
    td5.innerText = student.marks;

    let td6 = document.createElement("td");
    td6.innerText = student.passing ? "Passed" : "Failed";

    let td7 = document.createElement("td");
    td7.innerText = student.email;

    tr.append(td1, td2, td3, td4, td5, td6, td7);

    if (student.gender == "Male") {
      table1.appendChild(tr);
      isMalePresent = true;
      //   console.log("table1");
    } else {
      table2.appendChild(tr);
      isFemalePresent = true;
      //   console.log("table2");
    }

    document.getElementById("table-2-div").style.display = "block";
  });
  if (!isMalePresent) {
    table1.style.display = "none";
  }
  if (!isFemalePresent) {
    table2.style.display = "none";
  }
}
loadData(studentData);
