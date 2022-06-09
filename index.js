const { prompt } = require("inquirer");
const db = require("./db/connection");
require("console.table");




function mainMenu() {

    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",

            choices: [{
                name: "View ALL Employees",
                value: "VIEW_EMPLOYEES"
            },
            {
                name: "View All Departments",
                value: "VIEW_DEPARTMENTS"
            },
            {
                name: 'Add an Employee',
                value: 'ADD_EMPLOYEE'
            },
            {
                NAME: "Quit",
                value: "QUIT"
            }]
        }
    ]).then(res => {
        let choices = res.choice;
        switch (choices) {
            case 'VIEW_EMPLOYEES':
                findEmployees();
                break;
            case 'VIEW_DEPARTMENTS':
                findDepartments();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
                break;
        }

    })


}

function findEmployees() {
    db.query(
        `SELECT * FROM employees.employee;`, (err, res) => {
            if (err) {
                console.log(err);
            }

            console.log('\n');
            console.table(res);
            mainMenu();
        }
    )
}

function findDepartments() {
    db.query(`SELECT * FROM department;`, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log('\n');
        console.table(res);
        mainMenu();
    })
}

function addEmployee() {
    let role = db.query(`SELECT * FROM employees.role`, (err, res) => {
        if (err) { console.log(err) };

        prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the employees first name? '
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the employees last name? '
            },
            {
                type: 'list',
                name: 'empRole',
                message: 'What is the role for the employee? ',
                choices:
                    res.map((role) => {
                        return {
                            name: role.title,
                            value: role.id
                        }
                    })
            }
        ])
            .then(res => {
                db.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ("${res.firstName}", "${res.lastName}", "${res.empRole}")`, (err, res) => {
                    if (err) { console.log(err) };

                    console.log('\n');
                    console.log('You have succesfully added an employee.');
                    console.log('\n');
                    mainMenu();
                });
            })
    })
}

function addDepartment(){



}
mainMenu();