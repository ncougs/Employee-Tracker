INSERT INTO department (name)
VALUES  ("Finance"),
        ("Operations"),
        ("Digital"),
        ("Marketing"),
        ("People and Culture");

INSERT INTO role (title, salary, department_id)
VALUES  ("Head of Finance", 150000, 1),
        ("Finance Analyst", 100000, 1),
        ("Finance Associate", 80000, 1),
        ("Head of Operations", 150000, 2),
        ("Operations Consultatnt", 100000, 2),
        ("Operations Associate", 80000, 2),
        ("Head of Digital", 150000, 3),
        ("Digital Developer", 100000, 3),
        ("Content Manager", 80000, 3),
        ("Head of Marketing", 150000, 4),
        ("Brand Manager", 100000, 4),
        ("Content Manager", 80000, 4),
        ("Head of People and Culture", 150000, 5),
        ("Employee Wellbeing", 100000, 5),
        ("Employee Support", 80000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Harry", "Potter", 1, 3),
        ("Ron", "Weasly", 10, 1),
        ("Hermione", "Granger", 7, 2),
        ("Luna", "Lovegood", 13, 1),
        ("Draco", "Malfoy", 2, 1),
        ("Sirius", "Black", 6, 2),
        ("Bellatrix", "Lestrange", 14, 4);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

       
       
