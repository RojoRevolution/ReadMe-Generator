// function to generate markdown for README
// function generateHeader(response) {
//   return `# ${response.title}\n\n`;
// }
function generateHeader(response) {
  return `# ${response.title}\n\n`;
}

function generateSubHeader(response) {
  return `## ${response.title}\n`;
}

// module.exports = header;
module.exports = {
  header: (response) => `# ${response.title}\n\n`,
  subHeader: (response) => `## ${response}\n`
}