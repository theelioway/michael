/** ImportAction: import a node module.
 *
 * @param {Thing} thing.url e.g. to import `thing.js`
 * @returns {Thing}
 */
export const ImportAction = async thing => await import(thing.url)
export default ImportAction
