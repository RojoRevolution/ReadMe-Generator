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
    // fs.appendFile(fileName, JSON.stringify(response.title), (err) =>
    //     err ? console.error(err) : console.log('Success'));
    const headers = markdown(response);
    fs.appendFileSync(fileName, headers, (err) =>
        err ? console.error(err) : console.log('Project Title Was added'));

    fs.appendFileSync(fileName, response.description, (err) =>
        err ? console.error(err) : console.log('Description Body Text Was added'));

}

// function to initialize program
function init() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: questions[0],
                name: "title",
                validate: function (answer) {
                    if (answer === "") {
                        return console.log("A valid project title is required.")
                    } else {
                        return true;
                    }

                }

            },
            {
                type: 'input',
                message: questions[1],
                name: 'description',
                validate: function (answer) {
                    if (answer === "") {
                        return console.log("A valid project description is required.")
                    } else {
                        return true;
                    }

                }
            },
            // {
            //     type: 'input',
            //     message: questions[2],
            //     name: 'installation',
            // },
            // {
            //     type: 'input',
            //     message: questions[3],
            //     name: 'usage'
            // },
            // {
            //     type: 'input',
            //     message: questions[4],
            //     name: 'contribution',
            // },
            // {
            //     type: 'input',
            //     message: questions[5],
            //     name: 'test',
            // },
            // {
            //     type: 'list',
            //     message: questions[6],
            //     name: 'license',
            //     choices: ['Apache 2.0', 'GNU GPLv3', 'MIT', 'ISC']
            // },
            // {
            //     type: 'input',
            //     message: questions[7],
            //     name: 'github-username',
            // },
            // {
            //     type: 'input',
            //     message: questions[8],
            //     name: 'email',
            // },
        ]).then((response) => {
            // console.log(JSON.stringify(response))
            writeToFile('TEST.md', response, (err) =>
                err ? console.error(err) : console.log('Your Markdown File Was Successfully Created'))
        })
}

// function call to initialize program
init();
