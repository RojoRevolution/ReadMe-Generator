const inquirer = require('inquirer')
const fs = require('fs');
const markdown = require('./utils/generateMarkdown');

// array of questions for user
const questions = [
    'Enter a Project Title:',
    'Enter a Project Description:',
    'Enter Installation Instructions:',
    'Type an installation code example (Leave blank if not applicable):',
    'Enter Usage Information:',
    'Enter Contribution Guidelines:',
    'Enter Test Instructions:',
    'Choose a License:',
    'Enter Your GitHub Username:',
    'Enter Your Email Address:',
];

// function to write README file
function writeToFile(fileName, response) {
    // =============================== //
    // Append name of project - Required
    fs.appendFileSync(fileName, markdown.header(response));
    // =============================== //
    // Append Description - Required
    fs.appendFileSync(fileName, markdown.subHeader("Description"));
    fs.appendFileSync(fileName, response.description);
    // =============================== //
    // Installation Section - Optional
    if (!response.installation) {
        console.log("No installation notes were submitted")
    } else {
        fs.appendFileSync(fileName, markdown.subHeader("Installation"));
        fs.appendFileSync(fileName, response.installation);
        fs.appendFileSync(fileName, markdown.installCode(response));
    }
    // =============================== //
    // Usage Section - Optional
    if (!response.usage) {
        console.log("No usage notes were submitted")
    } else {
        fs.appendFileSync(fileName, markdown.subHeader("Usage"));
        fs.appendFileSync(fileName, response.usage);
    }
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
            {
                type: 'input',
                message: questions[2],
                name: 'installation',
            },
            {
                type: 'input',
                message: questions[3],
                name: 'installationCode',
            },
            {
                type: 'input',
                message: questions[4],
                name: 'usage'
            },
            // {
            //     type: 'input',
            //     message: questions[5],
            //     name: 'contribution',
            // },
            // {
            //     type: 'input',
            //     message: questions[6],
            //     name: 'test',
            // },
            // {
            //     type: 'list',
            //     message: questions[7],
            //     name: 'license',
            //     choices: ['Apache 2.0', 'GNU GPLv3', 'MIT', 'ISC']
            // },
            // {
            //     type: 'input',
            //     message: questions[8],
            //     name: 'github-username',
            // },
            // {
            //     type: 'input',
            //     message: questions[9],
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
