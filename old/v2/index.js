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
      //password: process.env.MYSQL_PASSWORD,
      database: 'week12_employee_db'
   },
   //console.log(`Connected to the week12_employee_db database.`),
   //draw_header()
);


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

   inquirer.prompt(main_question).then((answers) => {
      let user_answer = answers.wish_list;
      //console.log(answers); // {wish_list: 'View All Departments'}
      //console.log(user_answer); //View All Departments

      if(user_answer === "View All Departments"){
         // query database
         db.query('SELECT * FROM department', function(err,results){
            if(err){
               throw err;
            } else {
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
         // jw
         user_questions();
      }else if(user_answer === "View All Employees"){
         // jw
         user_questions();
      }else if(user_answer === "Add Department"){
         // jw
         user_questions();
      }else if(user_answer === "Add Role"){
         // jw
         user_questions();
      }else if(user_answer === "Add Employee"){
         // jw
         user_questions();
      }else if(user_answer === "Update Employee Role"){
         // jw
         user_questions();
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