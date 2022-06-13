/*
Given two strings containing backspaces (identified by the character ‘#’), check if the two strings are equal.

Example 1:
Input: str1="xy#z", str2="xzz#"
Output: true
Explanation: After applying backspaces the strings become "xz" and "xz" respectively.

Example 2:
Input: str1="xy#z", str2="xyz#"
Output: false
Explanation: After applying backspaces the strings become "xz" and "xy" respectively.

Example 3:
Input: str1="xp#", str2="xyz##"
Output: true
Explanation: After applying backspaces the strings become "x" and "x" respectively.
In "xyz##", the first '#' removes the character 'z' and the second '#' removes the character 'y'.

Example 4:
Input: str1="xywrrmp", str2="xyw#rrmu#p"
Output: true
Explanation: After applying backspaces the strings become "xywrrmp" and "xywrrmp" respectively.
*/

const backspace_compare = function (str1, str2) {
   let index1 = str1.length - 1;
   let index2 = str2.length - 1;
   while (index1 >= 0 || index2 >= 0) {
      const validIndex1 = getNextValidIndex(str1, index1);
      const validIndex2 = getNextValidIndex(str2, index2);
      if (validIndex1 < 0 && validIndex2 < 0) return true;
      else if (validIndex1 < 0 || validIndex2 < 0) return false;
      else if (str1[validIndex1] !== str2[validIndex2]) return false;
      index1 = validIndex1 - 1;
      index2 = validIndex2 - 1;
   }
   return true;
};

function getNextValidIndex(str, currentIndex) {
   let index = currentIndex;
   let backspaces = 0;
   while (index >= 0) {
      if (str[index] === "#") backspaces++;
      else if (backspaces > 0) backspaces--;
      else break;
      index--;
   }

   return index;
}
