//
// INSTRUCTIONS
//

//
// EXAMPLE
//

//
// PREPARATION
//

//
// CODE
//

//
// TEST
//
/**
 * @param {Node} doc
 * @return {string}
 */
function tableOfContents(doc) {
   if (!doc || doc.nodeName !== "#document") {
      return "";
   }

   let hTags = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);
   let root = {
      tag: "root",
      text: null,
      children: [],
   };
   let parentNode = root;
   traverse(doc.body);
   console.log(root);
   function traverse(element) {
      if (!element || !element.tagName) {
         return;
      }
      let previousParent = parentNode;
      if (hTags.has(element.tagName.toLowerCase())) {
         const currentNode = {
            tag: element.tagName,
            text: element.textContent,
            children: [],
         };
         parentNode.children.push(currentNode);
         parentNode = currentNode;
      }
      (element.childNodes || []).forEach((child) => {
         traverse(child);
      });

      parentNode = previousParent;
   }
}

const doc = new DOMParser().parseFromString(
   `<!DOCTYPE html>
  <body>
    <h1>Heading1</h1>
    <h2>Heading2a</h2>
    <h2>Heading2b</h2>
    <h3>Heading3a</h3>
    <h3>Heading3b</h3>
    <h4>Heading4</h3>
    <h2>Heading2c</h2>
  </body>`,
   "text/html"
);

const htmlString = tableOfContents(doc);
