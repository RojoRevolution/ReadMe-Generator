// function to generate markdown for README
// function generateHeader(response) {
//   return `# ${response.title}\n\n`;
// }
function generateHeader(response) {
  return `# ${response.title} \n`;
}

function generateSubHeader(response) {
  return `## ${response.title}\n`;
}

// module.exports = header;
module.exports = {
  header: (response) => `# ${response.title}\n\n`,
  subHeader: (response) => `\n##  ${response}\n`,
  installCode: (response) => `\n> ${response.installationCode} \n`,
  usageCode: (response) => `\n> ${response.usageCode} \n`,
  profileLink: (response) => `\n [GitHub Profile](${response.githubProfileURL})\n\n`,
  licenseApache: (response) => `![License Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-success)\n`,
  licenseGNU: (response) => `![License Apache 2.0](https://img.shields.io/badge/License-GNU%20GPLv3-Success)\n`,
  licenseMIT: (response) => `![License Apache 2.0](https://img.shields.io/badge/License-MIT-Success)\n`,
  licenseISC: (response) => `![License Apache 2.0](https://img.shields.io/badge/License-ISC-Success)\n`,
}