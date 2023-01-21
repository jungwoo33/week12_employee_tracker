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
               return console.log("A valid question list must be selected.");
            }
            return true; // default: false.
         }
      }
   ];



   const add_employee_question = [
      {
         name: "add_employee_firstname",
         type: "input",
         message: "   What is the employee's first name?",
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
         message: "   What is the employee's last name?",
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
         message: "   What is the employee's role?",
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
         message: "   Who is the employee's manager?",
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
         message: "   Which employee's role do you want to update?",
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
         message: "   Which role do you want to assign the selected employee?",
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
      let user_answer = answers.main_question_list;
      //console.log(answers); // {main_question_list: 'View All Departments'}
      //console.log(user_answer); //View All Departments
      // or you can do this:
      // let {user_answers} = answers; // since this will directly pointing "values" in {KEY: VALUE} pair.

      //====================================================================================================================================!
      if(user_answer === "View All Departments"){
         // query database & show table: "department":
         db.query('SELECT * FROM department', function(err,results){
            if(err){
               throw err;
            }else{
               //console.log(results);
               //console.log("jw");
               console.log('\n');
               console.log("View All Departments:");
               console.table(results);
               main_prompt(); // go back to the "main_prompt()"
            }
         });
      //====================================================================================================================================!   
      }else if(user_answer === "View All Roles"){
         // query database & show table: "role":
         db.query('SELECT * FROM role', function(err,results){
            if(err){
               throw err;
            }else{
               console.log('\n');
               console.log('View All Roles:');
               console.table(results);
               main_prompt(); // go back to the "main_prompt()"
            }
         })
      //====================================================================================================================================!   
      }else if(user_answer === "View All Employees"){
         // query database & show table: "employee":
         db.query('SELECT * FROM employee', function(err,results){
            if(err){
               throw err;
            }else{
               console.log('\n');
               console.log('View All Employees:');
               console.table(results);
               main_prompt(); // go back to the "main_prompt()"
            }
         })
      //====================================================================================================================================!   
      }else if(user_answer === "Add Department"){
         // Note, from the second questions, the questions are indented with 3 empty spaces to show that this is the secondary question.
         const add_department_question = [
            {
               name: "add_department",
               type: "input",
               message: "   What is the name of the department?",
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
                        console.log('\n');
                        console.log(user_answer + " department is added:");
                        console.table(results);
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
      }else if(user_answer === "Add Role"){
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
                     message: "   What is the name of the role?",
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
                     message: "   What is the salary of the role?",
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
                     message: "   Which department does the role belong to?",
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
                     /*
                     choices: [
                        { name: 'Sales', value: 1 },
                        { name: 'Engineering', value: 2 },
                        { name: 'Finance', value: 3 },
                        { name: 'Legal', value: 4 },
                     ],
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
                              console.log('\n');
                              console.log(`A new role, "${answer1}", has been added to the database:"`);
                              console.table(results);
                              main_prompt(); // go back to the "main_prompt()"
                           }
                        })         
                                 
                        //console.table(results);
                        //main_prompt();
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
      }else if(user_answer === "Quit"){
         // jw
         //question_onoff = false;
         //return answers;
         db.end();
         //exit();
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
/*
get_answers()
   .then(console.log('\n\n'))
   .catch(err=>{
      console.log(err)
   });
*/

main_prompt();
/*
main_prompt()
   .then(console.log)
   .catch(err=>{
      console.log(err)
   });
*/   
// End of the project ====================================================================!   