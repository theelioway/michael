const fs = require("fs");

// Define the paths to your JavaScript modules
const entryFile = "./index.js";
const outputFile = "./bundle.js";

// Read the content of the entry file (index.js)
const entryCode = fs.readFileSync(entryFile, "utf-8");

// Create a function to recursively resolve and bundle dependencies
function bundleModule(modulePath) {
  const moduleCode = fs.readFileSync(modulePath, "utf-8");
  const moduleLines = moduleCode.split("\n");
  const wrappedCode = moduleLines
    .map((line) => `  ${line}`) // Indent each line
    .join("\n");

  return `(function() {\n${wrappedCode}\n})();\n`;
}

// Recursively bundle dependencies starting from the entry file
function bundleDependencies(entryPath) {
  const dependencies = [];

  function collectDependencies(modulePath) {
    if (!dependencies.includes(modulePath)) {
      dependencies.push(modulePath);
      const moduleCode = fs.readFileSync(modulePath, "utf-8");
      const importStatements = moduleCode.match(/require\(['"](.*)['"]\)/g);

      if (importStatements) {
        importStatements.forEach((importStatement) => {
          const dependencyPath = importStatement.match(
            /require\(['"](.*)['"]\)/,
          )[1];
          collectDependencies(dependencyPath);
        });
      }
    }
  }

  collectDependencies(entryPath);

  return dependencies.map(bundleModule).join("\n");
}

// Bundle all dependencies and the entry file
const bundledCode = bundleDependencies(entryFile) + bundleModule(entryFile);

// Write the bundled code to the output file (bundle.js)
fs.writeFileSync(outputFile, bundledCode, "utf-8");

console.info("Bundling complete. File saved as bundle.js");
