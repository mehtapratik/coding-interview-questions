//
// INSTRUCTIONS
//
// Write a BST class that supports:
// insert method for inserting values
// remove method for removing values
// contains method to check if a given value exists in BST

//
// CODE
//
// Do not edit the class below except for
// the insert, contains, and remove methods.
// Feel free to add new properties and methods
// to the class.
class BST {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }

   insert(value) {
      if (this.value == null) {
         this.value = value;
      } else if (value < this.value) {
         if (this.left == null) {
            this.left = new BST(value);
         } else {
            this.left.insert(value);
         }
      } else {
         if (this.right == null) {
            this.right = new BST(value);
         } else {
            this.right.insert(value);
         }
      }
      return this;
   }

   contains(value) {
      if (this.value === value) {
         return true;
      } else if (value < this.value && this.left) {
         return this.left.contains(value);
      } else if (value >= this.value && this.right) {
         return this.right.contains(value);
      }
      return false;
   }

   remove(value, parentNode = null) {
      if (value < this.value) {
         if (this.left == null) {
            return this;
         } else {
            this.left.remove(value, this);
         }
      } else if (value > this.value) {
         if (this.right == null) {
            return this;
         } else {
            this.right.remove(value, this);
         }
      } else {
         if (this.left != null && this.right != null) {
            // removing 2
            //                    1
            //              /           \
            //             2             3
            //          /    \        /     \
            //         4      5      6       7
            //       /   \   /
            //      8    9  10
            this.value = this.right.getMinValue();
            this.right.remove(this.value, this);
         } else if (parentNode == null) {
            // When only one side tree is left and you want to remove
            // root node (e.g. 10)
            /*
                        10
                       /
                      5
                    /   \
                   2     3
            */
            if (this.left) {
               this.value = this.left.value;
               this.right = this.left.right;
               this.left = this.left.left;
            } else if (this.right) {
               this.value = this.right.value;
               this.left = this.right.left;
               this.right = this.right.right;
            } else {
               // there is only one node in tree, root node
               // this.value = null;
            }
         } else if (parentNode.left === this) {
            /* 
                  Deleting 2
                        10
                       /
                      5  (parent node)
                    /   \
           (this)  2     3                  
                  /
                 1 
            */
            parentNode.left = this.left ? this.left : this.right;
         } else if (parentNode.right === this) {
            /* 
                  Deleting 2
                        10
                       /
                      5  
                    /   \
                   2     3 (parent node)
                          \
                           4 (this)
            */
            parentNode.right = this.left ? this.left : this.right;
         }
      }
      return this;
   }

   getMinValue() {
      let currentNode = this;
      while (currentNode.left) {
         currentNode = currentNode.left;
      }

      return currentNode.value;
   }
}

//
// TEST
//

const root = new BST(10);
root.left = new BST(5);
root.left.left = new BST(2);
root.left.left.left = new BST(1);
root.left.right = new BST(5);
root.right = new BST(15);
root.right.left = new BST(13);
root.right.left.right = new BST(14);
root.right.right = new BST(22);

root.insert(12);
root.remove(10);
root.contains(15);
console.log(root);
