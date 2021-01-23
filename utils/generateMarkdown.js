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
}