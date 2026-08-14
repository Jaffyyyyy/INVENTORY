// Store students in local memory for this prototype
let students = [];

// Function to add a test student to the table
function addDummyStudent() {
    const student = {
        name: "Student " + (students.length + 1),
        grade: "Grade 6",
        average: Math.floor(Math.random() * (95 - 75 + 1)) + 75, // Random grade 75-95
    };
    students.push(student);
    updateUI();
}

// Function to update the table and dashboard numbers
function updateUI() {
    document.getElementById("studentCount").innerText = students.length;
    
    const tableBody = document.getElementById("studentList");
    tableBody.innerHTML = ""; // Clear existing rows

    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.className = "border-b";
        row.innerHTML = `
            <td class="p-3 font-semibold">${student.name}</td>
            <td class="p-3">${student.grade}</td>
            <td class="p-3">
                <span class="px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-700">PROMOTED</span>
            </td>
            <td class="p-3">
                <button onclick="generatePDF(${index})" class="bg-slate-800 text-white text-xs px-2 py-1 rounded">Generate Result</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Automated PDF Generation using jsPDF
function generatePDF(index) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const student = students[index];

    doc.setFontSize(18);
    doc.text("MAM-ON ELEMENTARY SCHOOL", 20, 20);
    doc.setFontSize(12);
    doc.text("OFFICIAL REPORT CARD", 20, 30);
    
    doc.text(`Name: ${student.name}`, 20, 50);
    doc.text(`Grade Level: ${student.grade}`, 20, 60);
    doc.text(`Final Average: ${student.average}%`, 20, 70);
    doc.text(`Status: PROMOTED`, 20, 80);

    doc.save(`${student.name}_Result.pdf`);
}
