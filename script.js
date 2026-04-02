let students = [
  { name: "Rahul", marks: 85 },
  { name: "Amit", marks: 72 },
  { name: "Neha", marks: 90 },
  { name: "Priya", marks: 60 },
  { name: "Karan", marks: 35 }
];

// Load saved data
let saved = JSON.parse(localStorage.getItem("students"));
if (saved) students = saved;

// Add status & grade
students.forEach(s => {
  s.status = s.marks >= 40 ? "Pass" : "Fail";

  if (s.marks >= 80) s.grade = "A";
  else if (s.marks >= 60) s.grade = "B";
  else s.grade = "C";
});

// Save
localStorage.setItem("students", JSON.stringify(students));

// Login
function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (u === "admin" && p === "1234") {
    document.getElementById("login").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    showDashboard();
  } else {
    alert("Wrong credentials");
  }
}

// Show dashboard
function showDashboard() {
  let output = document.getElementById("output");
  output.innerHTML = "";

  let total = 0;

  students.forEach(s => {
    total += s.marks;
    output.innerHTML += `
      <p>${s.name} - ${s.marks} (${s.status}, Grade: ${s.grade})</p>
    `;
  });

  let avg = total / students.length;
  output.innerHTML += `<h3>Average: ${avg}</h3>`;

  // Top 3
  let top3 = [...students].sort((a,b)=>b.marks-a.marks).slice(0,3);
  let topDiv = document.getElementById("top3");
  topDiv.innerHTML = "";

  top3.forEach(s => {
    topDiv.innerHTML += `<p>${s.name} - ${s.marks}</p>`;
  });

  // Chart
  new Chart(document.getElementById("chart"), {
    type: 'bar',
    data: {
      labels: students.map(s => s.name),
      datasets: [{
        label: 'Marks',
        data: students.map(s => s.marks)
      }]
    }
  });
}

// Search
function searchStudent() {
  let name = document.getElementById("search").value.toLowerCase();
  let result = document.getElementById("result");

  let found = students.find(s => s.name.toLowerCase() === name);

  if (found) {
    result.innerHTML = `
      <p>${found.name} - ${found.marks}</p>
      <p>${found.status}, Grade: ${found.grade}</p>
    `;
  } else {
    result.innerHTML = "Not found";
  }
}
