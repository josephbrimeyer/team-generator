const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

let employeeInformation = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function makeManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please create the Manager card first (required).\n  What is the Manager's first and last name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Manager's email address?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the Manager's id number?"
        },
        {
            type: "list",
            name: "role",
            message: "Enter the role of this Employee:",
            choices: ["Manager"]
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the Manager's office number?"
        },
        {
            type: "list",
            name: "position",
            message: "Would you like to add another role?",
            choices: ['Engineer', 'Intern', 'Exit'],
        }
    ]).then(function (data) {
        let manager = new Manager(data.name, data.email, data.id, data.officeNumber);
        employeeInformation.push(manager);

        switch (data.position) {
            case "Engineer":
                makeEngineer();
                break;
            case "Intern":
                makeIntern();
                break;
            default:
                createHtml();
        }
    });
}
function makeEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Engineer's first and last name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Engineer's email address?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the Engineer's id number?"
        },
        {
            type: "input",
            name: "github",
            message: "Enter the Engineer's GitHub user name:",
        },
        {
            type: "list",
            name: "position",
            message: "Would you like to add another role?",
            choices: ['Engineer', 'Intern', 'Exit'],
        }
    ]).then(function (data) {
        let engineer = new Engineer(data.name, data.email, data.id, data.github);
        employeeInformation.push(engineer);

        switch (data.position) {
            case "Engineer":
                makeEngineer();
                break;
            case "Intern":
                makeIntern();
                break;
            default:
                createHtml();
        }
    });
}

function makeIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Intern's first and last name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Intern's email address?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the Intern's id number?"
        },
        {
            type: "input",
            name: "school",
            message: "What is the name of the Intern's school?",
        },
        {
            type: "list",
            name: "position",
            message: "Would you like to add another role?",
            choices: ['Engineer', 'Intern', 'Exit'],
        }
    ]).then(function (data) {
        let intern = new Intern(data.name, data.email, data.id, data.school);
        employeeInformation.push(intern);

        switch (data.position) {
            case "Engineer":
                makeEngineer();
                break;
            case "Intern":
                makeIntern();
                break;
            default:
                createHtml();
        }
    });
}
function createHtml() {
    fs.writeFileSync(outputPath, render(employeeInformation), "utf-8")
}

makeManager();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
