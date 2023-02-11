const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [  'Enter employee name: ',  'Enter employee title: ',  'Enter employee email: ',  'Enter employee ID: '];

const employees = [];

const askQuestion = (questionIndex = 0, employeeIndex = 0) => {
  rl.question(questions[questionIndex], (answer) => {
    if (!employees[employeeIndex]) {
      employees[employeeIndex] = {};
    }
    employees[employeeIndex][questions[questionIndex]] = answer;
    if (questionIndex + 1 < questions.length) {
      askQuestion(questionIndex + 1, employeeIndex);
    } else {
      rl.question('Do you want to add another employee? (y/n) ', (answer) => {
        if (answer === 'y') {
          askQuestion(0, employeeIndex + 1);
        } else {
          rl.close();
          createHTML();
        }
      });
    }
  });
};

const createHTML = () => {
  let html = '<html><head><title>Employee Information</title></head><body>';
  employees.forEach((employee) => {
    html += '<h2>Employee Information</h2>';
    html += `<p>Name: ${employee['Enter employee name: ']}</p>`;
    html += `<p>Title: ${employee['Enter employee title: ']}</p>`;
    html += `<p>Email: ${employee['Enter employee email: ']}</p>`;
    html += `<p>ID: ${employee['Enter employee ID: ']}</p>`;
  });
  html += '</body></html>';
  fs.writeFileSync('employees.html', html);
  console.log('HTML file created successfully.');
};

askQuestion();