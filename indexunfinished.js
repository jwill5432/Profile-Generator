const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const employeeClassQuestions = {
  "Manager": [
    "Enter office number: "
  ],
  "Engineer": [
    "Enter GitHub username: "
  ],
  "Intern": [
    "Enter school name: "
  ],
  "Employee": []
};

const commonQuestions = [
  "Enter employee name: ",
  "Enter employee class name (Manager, Engineer, Intern, or Employee): ",
  "Enter employee email: ",
  "Enter employee biography: "
];

const questions = [];
const answers = [];

const askQuestion = (i) => {
  rl.question(questions[i], (answer) => {
    answers.push(answer);

    if (i < questions.length - 1) {
      askQuestion(i + 1);
    } else {
      rl.close();
    }
  });
};

rl.question(commonQuestions[1], (className) => {
  classNameUpper = className.toUpperCase();
  questions.push(...commonQuestions);
  questions.push(...employeeClassQuestions[classNameUpper]);
  askQuestion(0);
});

rl.on("close", () => {
  const [name, _, email, bio, ...classSpecificAnswers] = answers;

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${name} - Employee Profile</title>
    </head>
    <body>
      <h1>${name}</h1>
      <p><a href="mailto:${email}">${email}</a></p>
      <p>${bio}</p>
  `;

  switch (classNameUpper) {
    case "MANAGER":
      html += `
        <h2>Manager</h2>
        <p>Office number: ${classSpecificAnswers[0]}</p>
      `;
      break;
    case "ENGINEER":
      html += `
        <h2>Engineer</h2>
        <p>GitHub username: ${classSpecificAnswers[0]}</p>
      `;
      break;
    case "INTERN":
      html += `
        <h2>Intern</h2>
        <p>School: ${classSpecificAnswers[0]}</p>
      `;
      break;
    case "EMPLOYEE":
      html += `
        <h2>Employee</h2>
      `;
      break;
    default:
      html += `
        <h2>Invalid Class Name</h2>
        <p>Please enter a valid class name (Manager, Engineer, Intern, or Employee).</p>
      `;
  }

  html += `
    </body>
    </html>
  `;

  fs.writeFile("employee.html", html, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Employee HTML file generated successfully.");
  });
});