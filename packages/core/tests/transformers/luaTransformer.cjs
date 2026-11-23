const fs = require('fs');

module.exports = {
    process(sourceText, sourcePath) {
        const fileContent = fs.readFileSync(sourcePath, 'utf8');
        return {
            code: `module.exports = ${JSON.stringify(fileContent)};`,
        }
    }
}