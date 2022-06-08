USE employees;

INSERT INTO department
    (name)

VALUES
    ("Engineering"),
    ("Sales"),
    ("Management"),
    ("Legal");

INSERT INTO role
    (title, salary, department_id); 
VALUES
    ("Senior Developer", 100000, 1),
    ("Sales", 75000, 2),
    ("Project Manager", 120000, 3),
    ("Lawyer", 250000, 4);

INSERT INTO employees
    (first_name, last_name, role_id)
VALUES
    ("Brad","Hand", 1),
    ("Luis", "Severino", 2),
    ("Giancarlo", "Stanton", 3),
    ("Aaron", "Judge", 4);
