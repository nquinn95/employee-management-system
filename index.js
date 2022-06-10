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
                value: "View_Employees"
            },
            {
                name: "View All Departments",
                value: "View_Departments"
            },
            {
                name: "View ALL Roles",
                value: "View_Roles"
            },
            {
                name: 'Add an Employee',
                value: 'Add_Employee'
            },
            {
                name: 'Add a role',
                value: 'Add_Role'
            },
            {
                NAME: "Quit",
                value: "Quit"
            }]
        }
    ]).then(res => {
        let choices = res.choice;
        switch (choices) {
            case 'View_Employees':
                findEmployees();
                break;
            case 'View_Departments':
                findDepartments();
                break;
            case 'View_Roles':
                findRoles();
                break;
            case 'Add_Employee':
                addEmployee();
                break;
            case 'Add_Role':
                addRole();
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
    db.query(`SELECT * FROM employees.department;`, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log('\n');
        console.table(res);
        mainMenu();
    })
}

function findRoles() {
    db.query(`SELECT * FROM employees.role;`, (err, res) => {
        if (err) { console.log(err); }

        console.log('\n');
        console.table(res);
        mainMenu()
    })
}
function addEmployee() {
    db.query(`SELECT * FROM employees.role`, (err, res) => {
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

function addRole() {
    db.query(`SELECT * FROM employees.department`, (err, res) => {

        if (err) { console.log(err); }

        prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'What role would you like to add? '
            },
            {
                type: 'input',
                name: 'roleSal',
                message: 'What is the salary for this role? '
            },
            {
                type: 'list',
                name: 'roleDep',
                message: 'Where is those role assigned? ',
                choices:
                    res.map((department) => {
                        return {
                            name: department.name,
                            value: department.id
                        }
                    })
            }


        ]).then(res => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${res.newRole}", "${res.roleSal}", "${res.roleDep}")`, (err, res) => {
                if (err) { console.log(err); }
                console.log('\n');
                console.log('Succesfully added new role.');
                console.log('\n');
                mainMenu();

            });

        })

    })

}

function addDep(){

    
}

mainMenu();