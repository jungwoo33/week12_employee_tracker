// call node modules:
const inquirer = require('inquirer');
//const express = require('express');
const mysql = require('mysql2');

// prepare for the header lines ========================================!
function show_header(){
   // I will update this later as shown in the video.
   console.log("!=====================================================!");
   console.log("! Employee Management Program                         !");
   console.log("! Developed by Jungwoo Lee                            !");
   console.log("!=====================================================!");
   console.log();
}

// connect to database =================================================!
const db = mysql.createConnection(
   {
      host: 'localhost',
      user: 'root',
      password: process.env.MYSQL_PASSWORD,
      database: 'week12_employee_db'
   },
   //console.log(`Connected to the week12_employee_db database.`),
   //draw_header()
);
db.connect(); // do i need this?


// Note, this "main_prompt()" function will be called recursively until "Quit" option is selected.
function main_prompt(){
   // This is the primary question:
   const main_question = [
      {
         name: "main_question_list",
         type: "list",
         message: "What would you like to do?",
         choices: [
            '1. View All Departments',
            '2. View All Roles',
            '3. View All Employees',
            '4. Add Department',
            '5. Add Role',
            '6. Add Employee',
            '7. Update Employee Role',
            '8. Quit'
         ],
         validate: function(answer){
            if(answer.length < 1){
               return console.log("A valid question list must be selected.");
            }
            return true; // default: false.
         }
      }
   ];

   inquirer.prompt(main_question).then((answers) => {
      let user_answer = answers.main_question_list;
      //console.log(answers); // {main_question_list: 'View All Departments'}
      //console.log(user_answer); //View All Departments
      // or you can do this:
      // let {user_answers} = answers; // since this will directly pointing "values" in {KEY: VALUE} pair.

      //====================================================================================================================================!
      if(user_answer === "1. View All Departments"){
         // query database & show table: "department":
         db.query('SELECT * FROM department', function(err,results){
            if(err){
               throw err;
            }else{
               //console.log(results);
               //console.log("jw");
               console.log("View All Departments:");
               console.table(results);
               console.log();
               main_prompt(); // go back to the "main_prompt()"
            }
         });
      //====================================================================================================================================!   
      }else if(user_answer === "2. View All Roles"){
         // query database & show table: "role":
         db.query('SELECT * FROM role', function(err,results){
            if(err){
               throw err;
            }else{
               console.log('View All Roles:');
               console.table(results);
               console.log();
               main_prompt(); // go back to the "main_prompt()"
            }
         })
      //====================================================================================================================================!   
      }else if(user_answer === "3. View All Employees"){
         // query database & show table: "employee":
         /*
         db.query('SELECT * FROM employee', function(err,results){
            if(err){
               throw err;
            }else{
               console.log('View All Employees:');
               console.table(results);
               console.log();
               main_prompt(); // go back to the "main_prompt()"
            }
         })
         */
         /* some tests ...
         const jw_1 = `SELECT * 
                     FROM employee 
                     LEFT JOIN role ON employee.role_id = role.id`; 
         const jw_2 = `SELECT * 
                     FROM employee 
                     LEFT JOIN role ON employee.role_id = role.id 
                     LEFT JOIN department ON role.department_id = department.id`;
         const jw_3 = `SELECT * 
                     FROM employee 
                     LEFT JOIN role ON employee.role_id = role.id 
                     LEFT JOIN department ON role.department_id = department.id 
                     LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;

         db.query(jw_1, function(err,results){
            if(err){
               throw err;
            }else{
               console.log('jw_1:');
               console.table(results);
            }
         })
         db.query(jw_2, function(err,results){
            if(err){
               throw err;
            }else{
               console.log('jw_2:');
               console.table(results);
            }
         })
         db.query(jw_3, function(err,results){
            if(err){
               throw err;
            }else{
               console.log('jw_3:');
               console.table(results);
            }
         })
         */

         // Note: here, I have to use "LEFT JOIN", not just "JOIN", to show "null" in "manager" column.
         const sql_query = `SELECT
                                 employee.id,
                                 employee.first_name,
                                 employee.last_name,
                                 role.title,
                                 department.name AS department,
                                 role.salary,
                                 CONCAT(manager.first_name, " ", manager.last_name) AS manager
                           FROM employee  
                                 LEFT JOIN role ON employee.role_id = role.id
                                 LEFT JOIN department ON role.department_id = department.id
                                 LEFT JOIN employee manager ON employee.manager_id = manager.id`;
         db.query(sql_query, function(err,results){
            if(err){
               throw err;
            }else{
               console.log('View All Employees:');
               console.table(results);
               console.log();
               main_prompt(); // go back to the "main_prompt()"
            }
         })
      //====================================================================================================================================!   
      }else if(user_answer === "4. Add Department"){
         // Note, from the second questions, the questions are indented with 3 empty spaces to show that this is the secondary question.
         const add_department_question = [
            {
               name: "add_department",
               type: "input",
               message: "   4.1 What is the name of the department?",
               validate: function(answer){
                  if(answer.length < 1){
                     return console.log("A valid department name must be provided.");
                  }
                  return true; // default: false.
               }
            }
         ];

         inquirer.prompt(add_department_question).then((answers) => {
            // query database & insert additional department into the "department" table.
            let user_answer = answers.add_department;
            db.query(`INSERT INTO department (name) VALUES ("${user_answer}")`, function(err,results){   
               if(err){
                  throw err;
               }else{
                  // if adding department in the "department" table is successful,
                  // then, query database & show the "department" table. 
                  db.query('SELECT * FROM department', function(err,results){
                     if(err){
                        throw err;
                     }else{
                        console.log(user_answer + " department is added:");
                        console.table(results);
                        console.log();
                        main_prompt(); // go back to the "main_prompt()"
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
      //====================================================================================================================================!   
      }else if(user_answer === "5. Add Role"){
         // first, let's get the "department_list" from the "department" table:
         db.query(`SELECT * FROM department`, function(err,results){
            if(err){
               throw err;
            }else{
               /* here results will have:
                     [
                        { id: 1, name: 'Sales' },
                        { id: 2, name: 'Engineering' },
                        { id: 3, name: 'Finance' },
                        { id: 4, name: 'Legal' },
                        { id: 5, name: 'jw1' }
                     ]
                  Thus, the followings are true:
                     results[0].id = 1
                     results[0].name = sales
                  Now, I will construct an array for "choice" as:
                     [
                        { name: 'Sales', value: 1 },
                        { name: 'Engineering', value: 2 },
                        { name: 'Finance', value: 3 },
                        { name: 'Legal', value: 4 },
                     ]
                  To do so, I will use "map()" method as shown below in the code:
                  See more details "Using map to reformat objects in an array" in the:
                     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
                  Note: "department_choices" will be used in the question choices.   
               */
               const department_choices = results.map(({name,id}) => ({name: name, value: id}));
               //return results.map(({name,id}) => ({name: name, value: id}));
               //console.log(department_choices);
               
               // Now, we can creat "add_role_question" with information of "department_choices"
               const add_role_question = [
                  {
                     name: "add_role_title",
                     type: "input",
                     message: "   5.1 What is the name of the role?",
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
                     message: "   5.2 What is the salary of the role?",
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
                     message: "   5.3 Which department does the role belong to?",
                     // Note: this choices should be properly updated with updated department names... I will do it later...
                     choices: department_choices,
                     /* Note: department_choices will have (e.g.):
                           [
                              { name: 'Sales', value: 1 },
                              { name: 'Engineering', value: 2 },
                              { name: 'Finance', value: 3 },
                              { name: 'Legal', value: 4 },
                           ]
                     */
                     validate: function(answer){
                        if(answer.length < 1){
                           return console.log("A valid department must be provided.");
                        }
                        return true; // default: false.
                     }
                  },
               ];

               // Now, prompt (show) questions and receive the user answer & proceed showing the updated results:
               inquirer.prompt(add_role_question).then((answers) => {
                  let answer1 = answers.add_role_title; // string
                  let answer2 = answers.add_role_salary; // decimal
                  let answer3 = answers.add_role_department; // int
                  
                  // query database & insert additional role into the "role" table.
                  db.query(`INSERT INTO role (title,salary,department_id) VALUES ("${answer1}",${answer2},${answer3})`, function(err,results){
                     if(err){
                        throw err;
                     }else{
                        // if adding role in the "role" table is successful,
                        // then, query database & show the "role" table. 
                        db.query('SELECT * FROM role', function(err,results){
                           if(err){
                              throw err;
                           }else{
                              console.log(`A new role, "${answer1}", has been added to the database:"`);
                              console.table(results);
                              console.log();
                              main_prompt(); // go back to the "main_prompt()"
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
            } // End of if(err) else ()
         }) // End of db.query()
      //====================================================================================================================================!
      }else if(user_answer === "6. Add Employee"){
         // I will follow the same routine as in "Add role".
         // first, let's get the "role_list" from the "role" table:
         db.query(`SELECT * FROM role`, function(err,results){
            if(err){
               throw err;
            }else{
               const role_choices = results.map(({id,title}) => ({name: title, value: id}));
               //console.log(role_choices);
               /* it will look like this:
               [
                  {  name: 'Sales Lead', value: 1},
                  {  name: 'Salesperson',value: 2},
                  ...
               ]
               */

               // Now, I have to go one more down to find manager info:
               db.query(`SELECT * FROM employee`, function(err,results){
                  if(err){
                     throw err;
                  }else{
                     const manager_choices = results.map(({id,first_name,last_name}) => ({name: first_name + ' ' + last_name, value: id}));
                     manager_choices.push({name: null, id: null});
                     //console.log(manager_choices);
                     /* it will look like:
                     [
                        {  name: 'John Doe', value: 1},
                        {  name: 'Mike Chan', value: 2},                              
                        ...
                        {  name: null, value: null}
                     ]
                     */

                     // Now, I can creat "add_employee_question" with information of "role_choices" & "manager_choices"
                     const add_employee_question = [
                        {
                           name: "add_employee_firstname",
                           type: "input",
                           message: "   6.1 What is the employee's first name?",
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
                           message: "   6.2 What is the employee's last name?",
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
                           message: "   6.3 What is the employee's role?",
                           choices: role_choices,
                           validate: function(answer){
                              if(answer.length < 1){
                                 return console.log("A valid employee's role must be selected.");
                              }
                              return true; // default: false.
                           }
                        },
                        {
                           name: "add_employee_manager",
                           type: "list",
                           message: "   6.4 Who is the employee's manager?",
                           choices: manager_choices,
                           validate: function(answer){
                              if(answer.length < 1){
                                 return console.log("A valid last name must be provided.");
                              }
                              return true; // default: false.
                           }
                        },
                     ];
                     
                     // Now, prompt (show) questions and receive the user answer & proceed showing the updated results:
                     inquirer.prompt(add_employee_question).then((answers) => {
                        let answer1 = answers.add_employee_firstname; // string
                        let answer2 = answers.add_employee_lastname; // string
                        let answer3 = answers.add_employee_role; // int
                        let answer4 = answers.add_employee_manager; // int
                        
                        // query database & insert additional employee into the "employee" table.
                        db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("${answer1}","${answer2}",${answer3},${answer4})`, function(err,results){
                           if(err){
                              throw err;
                           }else{
                              // if adding an employee in the "employee" table is successful,
                              // then, query database & show the "employee" table. 
                              db.query('SELECT * FROM employee', function(err,results){
                                 if(err){
                                    throw err;
                                 }else{
                                    console.log(`A new employee, "${answer1} ${answer2}", has been added to the database:"`);
                                    console.table(results);
                                    console.log();
                                    main_prompt(); // go back to the "main_prompt()"
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
                  } // End of if(err) else ()
               }) // End of inner db.query()
            } // End of if(err) else ()
         }) // End of outter db.query()
      //====================================================================================================================================!   
      }else if(user_answer === "7. Update Employee Role"){
         // first, let's get the "employee_list" from the "employee" table:
         // Note, this part is almost identical to "Add Employee" section
         db.query(`SELECT * FROM role`, function(err,results){
            if(err){
               throw err;
            }else{
               // Note, this is identical to "role_choices" in "Add Employee" section (but with new name since I am using "const")
               const emp_role_choices = results.map(({id,title}) => ({name: title, value: id}));
               //console.log(emp_role_choices);
               /* it will look like this:
               [
                  {  name: 'Sales Lead', value: 1},
                  {  name: 'Salesperson',value: 2},
                  ...
               ]
               */

               // Now, I have to go one more down to find employee info:
               db.query(`SELECT * FROM employee`, function(err,results){
                  if(err){
                     throw err;
                  }else{
                     // Note, this is similar to "manager_choices" in "Add Employee" section (except null values which is only in "manager_choices").
                     const employee_choices = results.map(({id,first_name,last_name}) => ({name: first_name + ' ' + last_name, value: id}));
                     //console.log(employee_choices);
                     /* it will look like:
                     [
                        {  name: 'John Doe', value: 1},
                        {  name: 'Mike Chan', value: 2},                              
                        ...
                     ]
                     */

                     // Now, I can creat "update_employee_role" with information of "emp_role_choices" & "employee_choices"
                     const update_employee_role = [
                        {
                           name: "update_name",
                           type: "list",
                           message: "   7.1 Which employee's role do you want to update?",
                           choices: employee_choices,
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
                           message: "   7.2 Which role do you want to assign the selected employee?",
                           choices: emp_role_choices,
                           validate: function(answer){
                              if(answer.length < 1){
                                 return console.log("A valid employee's role must be selected.");
                              }
                              return true; // default: false.
                           }
                        },
                     ];

                     // Now, prompt (show) questions and receive the user answer & proceed showing the updated results:
                     inquirer.prompt(update_employee_role).then((answers) => {
                        let answer1 = answers.update_name; // int
                        let answer2 = answers.update_role; // int

                        let emp_name = employee_choices[answer1-1].name; // corresponding employee name
                        let emp_role = emp_role_choices[answer2-1].name; // corresponding employee role
                        
                        // query database & update selected employee's role in the "employee" table.
                        db.query(`UPDATE employee SET role_id = ${answer2} WHERE id=${answer1}`, function(err,results){
                           if(err){
                              throw err;
                           }else{
                              // if updating an employee's role in the "employee" table is successful,
                              // then, query database & show the "employee" table. 
                              db.query('SELECT * FROM employee', function(err,results){
                                 if(err){
                                    throw err;
                                 }else{
                                    console.log(`A role of the employee, "${emp_name}", has been updated with "${emp_role}" in the database:"`);
                                    console.table(results);
                                    console.log();
                                    main_prompt(); // go back to the "main_prompt()"
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
                  } // End of if(err) else()
               }) // End of inner db.query()
            } // End of if(err) else()
         }) // End of outter db.query()
      //====================================================================================================================================!   
      }else if(user_answer === "8. Quit"){
         db.end(); // terminate the connection to mysql databse
         console.log("Bye Bye~~~!");
         process.exit(); // Kill node program.
      }
   })
   .catch(error=>{
      if(error.isTtyError){
         // Prompt couldn't be rendered in the current environment.
      }else{
         // Something else went wrong.
      }
   }); // End of inquirer   
}; // end of function main_prompt()
// =======================================================================================!

show_header(); // At the first call, show header lines; this will not be called from the second call
main_prompt(); // initial main_prompt() call
// End of the project ====================================================================!   