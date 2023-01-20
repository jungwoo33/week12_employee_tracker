// call node modules:
const inquirer = require('inquirer');
//const express = require('express');
const mysql = require('mysql2');

// prepare for the header lines ========================================!
function draw_header(){
   // I will update this later as shown in the video.
   console.log("!=====================================================!");
   console.log("! Employee ");
   console.log("! Manager  ");
   console.log("!=====================================================!");
}

// connect to database =================================================!
const db = mysql.createConnection(
   {
      host: 'localhost',
      user: 'root',
      password: '',
      //password: process.env.MYSQL_PASSWORD,
      database: 'week12_employee_db'
   },
   //console.log(`Connected to the week12_employee_db database.`),
   //draw_header()
);
db.connect(); // do i need this?


function user_questions(){
   const main_question = [
      {
         name: "wish_list",
         type: "list",
         message: "What would you like to do?",
         choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Quit'
         ],
         validate: function(answer){
            if(answer.length < 1){
               return console.log("A valid wish_list must be selected.");
            }
            return true; // default: false.
         }
      }
   ];

   const add_department_question = [
      {
         name: "add_department",
         type: "input",
         message: "What is the name of the department?",
         validate: function(answer){
            if(answer.length < 1){
               return console.log("A valid department name must be provided.");
            }
            return true; // default: false.
         }
      }
   ];

   const add_role_question = [
      {
         name: "add_role_title",
         type: "input",
         message: "What is the name of the role?",
         validate: function(answer){
            if(answer.length < 1){
               return console.log("A valid role must be provided.");
            }
            return true; // default: false.
         }
      },
      {
         name: "add_role_salary",
         type: "input",
         message: "What is the salary of the role?",
         validate: function(answer){
            if(answer.length < 1){
               return console.log("A valid salary must be provided.");
            }
            return true; // default: false.
         }
      },
      {
         name: "add_role_department",
         type: "list",
         message: "Which department does the role belong to?",
         // Note: this choices should be properly updated with updated department names... I will do it later...
         choices: [
            {
               name: 'Engineering',
               value: 1,
            },
            {
               name: 'Finance',
               value: 2,
            },
            {
               name: 'Legal',
               value: 3,
            },
            {
               name: 'Sales',
               value: 4,
            },
            {
               name: 'Service',
               value: 5,
            }
         ],
         validate: function(answer){
            if(answer.length < 1){
               return console.log("A valid department must be provided.");
            }
            return true; // default: false.
         }
      },
   ];

   const add_employee_question = [
      {
         name: "add_employee_firstname",
         type: "input",
         message: "What is the employee's first name?",
         validate: function(answer){
            if(answer.length < 1){
               return console.log("A valid first name must be provided.");
            }
            return true; // default: false.
         }
      },
      {
         name: "add_employee_lastname",
         type: "input",
         message: "What is the employee's last name?",
         validate: function(answer){
            if(answer.length < 1){
               return console.log("A valid last name must be provided.");
            }
            return true; // default: false.
         }
      },
      {
         name: "add_employee_role",
         type: "list",
         message: "What is the employee's role?",
         choices:[
            {
               name: 'Sales Lead',
               value: 1,
            },
            {
               name: 'Salesperson',
               value: 2,
            },
            {
               name: 'Lead Engineer',
               value: 3,
            },
            {
               name: 'Software Engineer',
               value: 4,
            },
            {
               name: 'Account Manager',
               value: 5,
            },
            {
               name: 'Accountant',
               value: 6,
            },
            {
               name: 'Legal Team Lead',
               value: 7,
            },
            {
               name: 'Lawyer',
               value: 8,
            }
         ],
         validate: function(answer){
            if(answer.length < 1){
               return console.log("A valid employee's role must be selected.");
            }
            return true; // default: false.
         }
      },
      {
         name: "add_employee_manager",
         type: "input",
         message: "Who is the employee's manager?",
         choices:[
            {
               name: 'None',
               value: null,
            },
            {
               name: 'John Doe',
               value: 1,
            },
            {
               name: 'Mike Chan',
               value: 2,
            },
            {
               name: 'Ashley Rodriguez',
               value: 3,
            },
            {
               name: 'Kevin Tupik',
               value: 4,
            },
            {
               name: 'Kunal Singh',
               value: 5,
            },
            {
               name: 'Malia Brown',
               value: 6,
            },
            {
               name: 'Sarah Lourd',
               value: 7,
            },
            {
               name: 'Tom Allen',
               value: 8,
            }
         ],
         validate: function(answer){
            if(answer.length < 1){
               return console.log("A valid last name must be provided.");
            }
            return true; // default: false.
         }
      },
   ];

   const update_employee_role = [
      {
         name: "update_name",
         type: "list",
         message: "Which employee's role do you want to update?",
         choices: [
            {
               name: 'John Doe',
               value: 1,
            },
            {
               name: 'Mike Chan',
               value: 2,
            },
            {
               name: 'Ashley Rodriguez',
               value: 3,
            },
            {
               name: 'Kevin Tupik',
               value: 4,
            },
            {
               name: 'Kunal Singh',
               value: 5,
            },
            {
               name: 'Malia Brown',
               value: 6,
            },
            {
               name: 'Sarah Lourd',
               value: 7,
            },
            {
               name: 'Tom Allen',
               value: 8,
            },
         ],
         validate: function(answer){
            if(answer.length < 1){
               return console.log("A valid first name must be provided.");
            }
            return true; // default: false.
         }
      },
      {
         name: "update_role",
         type: "list",
         message: "Which role do you want to assign the selected employee?",
         choices:[
            {
               name: 'Sales Lead',
               value: 1,
            },
            {
               name: 'Salesperson',
               value: 2,
            },
            {
               name: 'Lead Engineer',
               value: 3,
            },
            {
               name: 'Software Engineer',
               value: 4,
            },
            {
               name: 'Account Manager',
               value: 5,
            },
            {
               name: 'Accountant',
               value: 6,
            },
            {
               name: 'Legal Team Lead',
               value: 7,
            },
            {
               name: 'Lawyer',
               value: 8,
            }
         ],
         validate: function(answer){
            if(answer.length < 1){
               return console.log("A valid employee's role must be selected.");
            }
            return true; // default: false.
         }
      },
   ];



   inquirer.prompt(main_question).then((answers) => {
      let user_answer = answers.wish_list;
      //console.log(answers); // {wish_list: 'View All Departments'}
      //console.log(user_answer); //View All Departments

      if(user_answer === "View All Departments"){
         // query database
         db.query('SELECT * FROM department', function(err,results){
            if(err){
               throw err;
            }else{
               //console.log(results);
               //console.log("jw");
               console.log('\n');
               console.log("View All Departments:");
               console.table(results);
               user_questions();
            }
         });
         //user_questions();
      }else if(user_answer === "View All Roles"){
         // query database
         db.query('SELECT * FROM role', function(err,results){
            if(err){
               throw err;
            }else{
               console.log('\n');
               console.log('View All Roles:');
               console.table(results);
               user_questions();
            }
         })
      }else if(user_answer === "View All Employees"){
         // query database
         db.query('SELECT * FROM employee', function(err,results){
            if(err){
               throw err;
            }else{
               console.log('\n');
               console.log('View All Employees:');
               console.table(results);
               user_questions();
            }
         })         
      }else if(user_answer === "Add Department"){
         // I don't need this anymore since I am using "AUTO_INCREMENT" option
         /*
         let row_index;
         db.query(`SELECT table_name, table_rows FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'week12_employee_db'`, function(err,results){
            if(err){
               throw err;
            }else{
               / * tests: followings will return:
               console.log(results);
                  [
                     {TABLE_NAME: 'department', TABLE_ROWS: 6},
                     {TABLE_NAME: 'employee', TABLE_ROWS: 8},
                     {TABLE_NAME: 'role', TABLE_ROWS: 8},
                  ]
               console.log(results[0].TABLE_ROWS);
                  6   
               * /
               row_index = results[0].TABLE_ROWS + 1;
               console.log(row_index);
            }
         })
         */

         inquirer.prompt(add_department_question).then((answers) => {
            let user_answer = answers.add_department;
            //db.query(`INSERT INTO department (id,name) VALUES (${row_index},"${user_answer}")`, function(err,results){
            db.query(`INSERT INTO department (name) VALUES ("${user_answer}")`, function(err,results){   
               if(err){
                  throw err;
               }else{
                  //console.log('\n');
                  //console.log(user_answer + " department is added:");

                  db.query('SELECT * FROM department', function(err,results){
                     if(err){
                        throw err;
                     }else{
                        console.log('\n');
                        //console.log('View All Employees:');
                        console.log(user_answer + " department is added:");
                        console.table(results);
                        user_questions();
                     }
                  })         
                           
                  //console.table(results);
                  //user_questions();
               }
            })
         })
         .catch(error=>{
            if(error.isTtyError){
               // Prompt couldn't be rendered in the current environment.
            }else{
               // Something else went wrong.
            }
         }); // End of inquirer
               
      }else if(user_answer === "Add Role"){
         inquirer.prompt(add_role_question).then((answers) => {
            let answer1 = answers.add_role_title; // string
            let answer2 = answers.add_role_salary; // decimal
            let answer3 = answers.add_role_department; // int

            /*
            let answer31;
            console.log(answer31);
            db.query(`SELECT id FROM department WHERE name='${answer3}'`, function(err,results){
               if(err){
                  throw err;
               }
               / * here:
                  results = [{id: 2}]
               * /
               answer31 = results[0].id;
               console.log('answer31 = ', answer31);
               //return results[0].id;
               //console.log('jw=', answer31);
               //console.log(`${answer31}`);
            })
            */


            //console.log(answer1,answer2,answer3);

            db.query(`INSERT INTO role (title,salary,department_id) VALUES ("${answer1}",${answer2},${answer3})`, function(err,results){
               if(err){
                  throw err;
               }else{
                  //console.log('\n');
                  //console.log(user_answer + " department is added:");

                  db.query('SELECT * FROM role', function(err,results){
                     if(err){
                        throw err;
                     }else{
                        console.log('\n');
                        //console.log('View All Employees:');
                        console.log(`A new role, "${answer1}", has been added to the database:"`);
                        console.table(results);
                        user_questions();
                     }
                  })         
                           
                  //console.table(results);
                  //user_questions();
               }
            })
         })
         .catch(error=>{
            if(error.isTtyError){
               // Prompt couldn't be rendered in the current environment.
            }else{
               // Something else went wrong.
            }
         }); // End of inquirer

      }else if(user_answer === "Add Employee"){
         inquirer.prompt(add_employee_question).then((answers) => {
            let answer1 = answers.add_employee_firstname; // string
            let answer2 = answers.add_employee_lastname; // string
            let answer3 = answers.add_employee_role; // int
            let answer4 = answers.add_employee_manager; // int

            db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("${answer1}","${answer2}",${answer3},${answer4})`, function(err,results){
               if(err){
                  throw err;
               }else{
                  db.query('SELECT * FROM employee', function(err,results){
                     if(err){
                        throw err;
                     }else{
                        console.log('\n');
                        //console.log('View All Employees:');
                        console.log(`A new employee, "${answer1} ${answer2}", has been added to the database:"`);
                        console.table(results);
                        user_questions();
                     }
                  })         
                           
                  //console.table(results);
                  //user_questions();
               }
            })
         })
         .catch(error=>{
            if(error.isTtyError){
               // Prompt couldn't be rendered in the current environment.
            }else{
               // Something else went wrong.
            }
         }); // End of inquirer         
      }else if(user_answer === "Update Employee Role"){
         inquirer.prompt(update_employee_role).then((answers) => {
            let answer1 = answers.update_name; // int
            let answer2 = answers.update_role; // int

            db.query(`UPDATE employee SET role_id = ${answer2} WHERE id=${answer1}`, function(err,results){
               if(err){
                  throw err;
               }else{
                  db.query('SELECT * FROM employee', function(err,results){
                     if(err){
                        throw err;
                     }else{
                        console.log('\n');
                        //console.log('View All Employees:');
                        console.log(`A role of the employee, "${answer1}", has been updated with "${answer2}" in the database:"`);
                        console.table(results);
                        user_questions();
                     }
                  })         
               }
            })
         })
         .catch(error=>{
            if(error.isTtyError){
               // Prompt couldn't be rendered in the current environment.
            }else{
               // Something else went wrong.
            }
         }); // End of inquirer         
      }else if(user_answer === "Quit"){
         // jw
         //question_onoff = false;
         //return answers;
         exit();
      }
   })
   .catch(error=>{
      if(error.isTtyError){
         // Prompt couldn't be rendered in the current environment.
      }else{
         // Something else went wrong.
      }
   }); // End of inquirer   
}; // end of function user_questions()
   
// =======================================================================================!
/*
get_answers()
   .then(console.log('\n\n'))
   .catch(err=>{
      console.log(err)
   });
*/

user_questions();
/*
user_questions()
   .then(console.log)
   .catch(err=>{
      console.log(err)
   });
*/   
// End of the project ====================================================================!   