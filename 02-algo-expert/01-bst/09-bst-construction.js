//
// INSTRUCTIONS
//
// Write a BST implementation that supports three methods
// 1. Insert
// 2. Remove - removes first instance found in the BST
// 3. Contains

//
// CODE
//
class BST {
   constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
   }

   insert(value) {
      if (value < this.value) {
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
      if (value === this.value) {
         return true;
      } else if (value < this.value) {
         if (this.left == null) {
            return false;
         } else {
            return this.left.contains(value);
         }
      } else {
         if (this.right == null) {
            return false;
         } else {
            return this.right.contains(value);
         }
      }
   }

   remove(value, parent = null) {
      if (value < this.value) {
         if (this.left != null) {
            this.left.remove(value, this);
         }
      } else if (value > this.value) {
         if (this.right != null) {
            this.right.remove(value, this);
         }
      } else {
         // we found the node that we want to delete
         if (this.left != null && this.right != null) {
            this.value = this.right.getMinValue();
            this.right.remove(this.value, this);
         } else if (parent == null) {
            if (this.left != null) {
               /*
                        10           6
                       /      =>    /  \
                      6            3    7
                    /   \
                   3     7
               */
               this.value = this.left.value;
               this.right = this.left.right;
               this.left = this.left.left;
            } else if (this.right != null) {
               /*
                       10           16
                         \   =>    /  \
                         16       12  22
                        /  \
                       12  22
                  
               */
               this.value = this.right.value;
               this.left = this.right.left;
               this.right = this.right.right;
            } else {
               // We only have one node in the tree (root node)
               // do not delete this node.
            }
         } else {
            if (parent.left == this) {
               parent.left = this.left ? this.left : this.right;
            } else if (parent.right == this) {
               parent.right = this.left ? this.left : this.right;
            }
         }
      }
      return this;
   }

   getMinValue() {
      if (this.left == null) {
         return this.value;
      }
      return this.left.getMinValue();
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
root.contains(22);
