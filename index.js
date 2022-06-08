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
                NAME: "Quit",
                value:"QUIT"
            }
        
        ]
        }
    ]).then(res => {
        let choices = res.choice;
        switch(choices){
            case 'VIEW_EMPLOYEES':
                findEmployees();
                break;
        }
    })


}

function findEmployees(){
    db.query(
        `SELECT * FROM employees.employee;`, (err, results) => {
            if (err){
                console.log(err);
            }

            console.log('\n');
            console.table(results);
            mainMenu();
        }
    )
}


mainMenu();