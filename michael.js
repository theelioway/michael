/**
 * 
 * @usage 
 * 
import michael from "@elioway/michael/promised";

michael().then((module) => {
  // Now you can access the functions and exports from "./src/index.js"
  // For example:
  let [, , ...args] = process.argv;
  module.parseCliArgs(args);
}).catch((error) => {
  console.error("Error loading module:", error);
});
 */

export const michael = async () => await import("./src/index.js");

export default michael;
