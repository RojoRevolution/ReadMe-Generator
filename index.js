const inquirer = require('inquirer')
const fs = require('fs');
const markdown = require('./utils/generateMarkdown');

// array of questions for user
const questions = [
    'Enter a project title (Required):',
    'Enter a project description (Required):',
    'Enter installation instructions:',
    'Type an installation code example (Leave blank if not applicable):',
    'Enter usage instructions:',
    'Enter usage code example (Leave blank if not applicable):',
    'Enter contribution guidelines:',
    'Enter test instructions:',
    'Choose a license (Required):',
    'Enter Your GitHub profile URL:',
    'Enter Your email address:',
    'Would you like to include a table of contents?',
];

// function to write README file
function writeToFile(fileName, response) {

    // =============================== //
    // Append name of project - Required
    fs.appendFileSync(fileName, markdown.header(response));

    // =============================== //
    // License Badge - Required
    switch (response.license) {
        case 'Apache 2.0':
            fs.appendFileSync(fileName, '![License Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-success)\n');
            break;
        case 'GNU GPLv3':
            fs.appendFileSync(fileName, '![License GNU GPLv3](https://img.shields.io/badge/License-GNU%20GPLv3-Success)\n');
            break;
        case 'MIT':
            fs.appendFileSync(fileName, '![License MIT](https://img.shields.io/badge/License-MIT-Success)\n');
            break;
        case 'ISC':
            fs.appendFileSync(fileName, '![License ISC](https://img.shields.io/badge/License-ISC-Success)\n');
            break;
    }

    // =============================== //
    // Append Description - Required
    fs.appendFileSync(fileName, markdown.subHeader("Description"));
    fs.appendFileSync(fileName, response.description);

    // =============================== //
    // Table of Contents - Optional
    if (response.tableOfContents === 'Yes') {
        fs.appendFileSync(fileName, markdown.subHeader("Table of Contents"));
        if (response.installation) {
            fs.appendFileSync(fileName, '* [Installation](#Installation)\n');
        }
        if (response.usage) {
            fs.appendFileSync(fileName, '* [Usage](#Usage)\n');
        }
        if (response.contribution) {
            fs.appendFileSync(fileName, '* [Contribution](#Contribution)\n');
        }
        if (response.test) {
            fs.appendFileSync(fileName, '* [Testing](#Testing)\n');
        }
        if (response.license) {
            fs.appendFileSync(fileName, '* [License](#License)\n');
        }
        if (response.githubProfileURL) {
            fs.appendFileSync(fileName, '* [Contact Info](#Questions?)\n');
        }
    }

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
    if (!response.contribution) {
        console.log("No usage notes were submitted")
    } else {
        fs.appendFileSync(fileName, markdown.subHeader("Contribution"));
        fs.appendFileSync(fileName, response.contribution);
    }

    // =============================== //
    // Test Section - Optional
    if (!response.test) {
        console.log("No test notes were submitted")
    } else {
        fs.appendFileSync(fileName, markdown.subHeader("Testing"));
        fs.appendFileSync(fileName, response.test);
    }

    // =============================== //
    // License Section - Optional
    if (!response.license) {
        console.log("No license notes were submitted")
    } else {
        fs.appendFileSync(fileName, markdown.subHeader("License"));
        fs.appendFileSync(fileName, `This project is covered under the license: ${response.license}`);
    }

    // =============================== //
    // Questions Section - Required
    if (!response.githubProfileURL && !response.email) {
        console.log("No GitHub or Email notes were submitted")
    } else {
        fs.appendFileSync(fileName, markdown.subHeader("Questions?"));
        fs.appendFileSync(fileName, markdown.profileLink(response));
        fs.appendFileSync(fileName, `Get in touch at ${response.email} for any additional questions`);
    }
}

// Function initializes the inquirer program and begins prompts
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
            {
                type: 'list',
                message: questions[8],
                name: 'license',
                choices: ['Apache 2.0', 'GNU GPLv3', 'MIT', 'ISC']
            },
            {
                type: 'input',
                message: questions[9],
                name: 'githubProfileURL',
                validate: function (answer) {
                    if (answer === "") {
                        return console.log("A valid gitHub url is required.")
                    } else {
                        return true;
                    }

                }
            },
            {
                type: 'input',
                message: questions[10],
                name: 'email',
                validate: function (answer) {
                    if (answer === "") {
                        return console.log("A contact email address is required.")
                    } else {
                        return true;
                    }

                }
            },
            {
                type: 'list',
                message: questions[11],
                name: 'tableOfContents',
                choices: ['Yes', 'No']
            },
        ]).then((response) => {
            writeToFile('TEST.md', response, (err) =>
                err ? console.error(err) : console.log('Your Markdown File Was Successfully Created'))
        })
}

// function call to initialize program
init();
