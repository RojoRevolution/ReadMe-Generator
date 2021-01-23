const inquirer = require('inquirer')
const fs = require('fs');
const markdown = require('./utils/generateMarkdown');

// array of questions for user
const questions = [
    'Enter a project title:',
    'Enter a project description:',
    'Enter installation instructions:',
    'Type an installation code example (Leave blank if not applicable):',
    'Enter usage instructions:',
    'Enter usage code example (Leave blank if not applicable):',
    'Enter contribution guidelines:',
    'Enter test instructions:',
    'Choose a license:',
    'Enter Your GitHub username:',
    'Enter Your email address:',
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
        fs.appendFileSync(fileName, markdown.usageCode(response));
    }
    // =============================== //
    // Contribution Section - Optional
    if (!response.usage) {
        console.log("No usage notes were submitted")
    } else {
        fs.appendFileSync(fileName, markdown.subHeader("Contribution"));
        fs.appendFileSync(fileName, response.contribution);
    }
    // =============================== //
    // Test Section - Optional
    if (!response.usage) {
        console.log("No test notes were submitted")
    } else {
        fs.appendFileSync(fileName, markdown.subHeader("Test Instructions"));
        fs.appendFileSync(fileName, response.test);
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
            {
                type: 'input',
                message: questions[5],
                name: 'usageCode'
            },
            {
                type: 'input',
                message: questions[6],
                name: 'contribution',
            },
            {
                type: 'input',
                message: questions[7],
                name: 'test',
            },
            // {
            //     type: 'list',
            //     message: questions[8],
            //     name: 'license',
            //     choices: ['Apache 2.0', 'GNU GPLv3', 'MIT', 'ISC']
            // },
            // {
            //     type: 'input',
            //     message: questions[9],
            //     name: 'github-username',
            // },
            // {
            //     type: 'input',
            //     message: questions[10],
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
