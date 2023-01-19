// call node modules:
const inquirer = require('inquirer');
//const express = require('express');
const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
   {
      host: 'localhost',
      user: 'root',
      password: 'Jw*336509',
      database: 'week12_employee_db'
   },
   console.log(`Connected to the week12_employee_db database.`)
);


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

function get_answers(){
   return inquirer.prompt(main_question).then((answers) => {
      let user_answer = answers.wish_list;
      if(user_answer === "View All Departments"){
         // query database
         db.query('SELECT * FROM department', function(err,results){
            //console.log(results);
            //console.log("jw");
            console.table(results);
         });
         return get_answers();
      }else if(user_answer === "View All Roles"){
         // jw
         return get_answers();
      }else if(user_answer === "View All Employees"){
         // jw
         return get_answers();
      }else if(user_answer === "Add Department"){
         // jw
         return get_answers();
      }else if(user_answer === "Add Role"){
         // jw
         return get_answers();
      }else if(user_answer === "Add Employee"){
         // jw
         return get_answers();
      }else if(user_answer === "Update Employee Role"){
         // jw
         return get_answers();
      }else if(user_answer === "Quit"){
         // jw
         //question_onoff = false;
         return answers;
      }
   })
   .catch(error=>{
      if(error.isTtyError){
         // Prompt couldn't be rendered in the current environment.
      }else{
         // Something else went wrong.
      }
   }); // End of inquirer   
}

function draw_header(){
   // I will update this later as shown in the video.
   console.log("!=====================================================!");
   console.log("! Employee ");
   console.log("! Manager  ");
   console.log("!=====================================================!");
}

function user_questions(){
   /*
   // I will update this later as shown in the video.
   console.log("!=====================================================!");
   console.log("! Employee ");
   console.log("! Manager  ");
   console.log("!=====================================================!");
   */
   draw_header();

   /*
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

   function get_answers(){
      return inquirer.prompt(main_question).then((answers) => {
         let user_answer = answers.wish_list;
         if(user_answer === "View All Departments"){
            // query database
            db.query('SELECT * FROM department', function(err,results){
               //console.log(results);
               //console.log("jw");
               console.table(results);
            });
            return get_answers();
         }else if(user_answer === "View All Roles"){
            // jw
            return get_answers();
         }else if(user_answer === "View All Employees"){
            // jw
            return get_answers();
         }else if(user_answer === "Add Department"){
            // jw
            return get_answers();
         }else if(user_answer === "Add Role"){
            // jw
            return get_answers();
         }else if(user_answer === "Add Employee"){
            // jw
            return get_answers();
         }else if(user_answer === "Update Employee Role"){
            // jw
            return get_answers();
         }else if(user_answer === "Quit"){
            // jw
            //question_onoff = false;
            return answers;
         }
      })
      .catch(error=>{
         if(error.isTtyError){
            // Prompt couldn't be rendered in the current environment.
         }else{
            // Something else went wrong.
         }
      }); // End of inquirer   
   }
   get_answers();
   */

   
   get_answers()
   .then(console.log)
   .catch(err=>{
      console.log(err)
   });
};

// =======================================================================================!
get_answers()
   .then(console.log('\n\n'))
   .catch(err=>{
      console.log(err)
   });

/*
user_questions()
   .then(console.log)
   .catch(err=>{
      console.log(err)
   });
*/   
   
// End of the project ====================================================================!   