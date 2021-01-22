// function to generate markdown for README
function generateHeader(response) {
  return `# ${response.title}\n\n`;
}

module.exports = generateHeader;
