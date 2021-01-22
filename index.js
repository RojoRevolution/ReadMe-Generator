const inquirer = require('inquirer')
const fs = require('fs');
const markdown = require('./utils/generateMarkdown');

// array of questions for user
const questions = [
    'Enter a Project Title:',
    'Enter a Project Description:',
    'Enter Installation Instructions:',
    'Enter Usage Information:',
    'Enter Contribution Guidelines:',
    'Enter Test Instructions:',
    'Choose a License:',
    'Enter Your GitHub Username:',
    'Enter Your Email Address:'

];

// function to write README file
function writeToFile(fileName, response) {
    fs.appendFile(fileName, JSON.stringify(response), (err) =>
        err ? console.error(err) : console.log('Success'));
}

// function to initialize program
function init() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: questions[0],
                name: "title"
            },
            {
                type: 'input',
                message: questions[1],
                name: 'description',
            },
            {
                type: 'input',
                message: questions[2],
                name: 'installation',
            },
            {
                type: 'input',
                message: questions[3],
                name: 'usage'
            },
            {
                type: 'input',
                message: questions[4],
                name: 'contribution',
            },
            {
                type: 'input',
                message: questions[5],
                name: 'test',
            },
            {
                type: 'list',
                message: questions[6],
                name: 'license',
                choices: ['Apache 2.0', 'GNU GPLv3', 'MIT', 'ISC']
            },
            {
                type: 'input',
                message: questions[7],
                name: 'github-username',
            },
            {
                type: 'input',
                message: questions[8],
                name: 'email',
            },
        ]).then((response) => {
            // console.log(JSON.stringify(response))
            writeToFile('TEST.md', response)
        })
}

// function call to initialize program
init();
