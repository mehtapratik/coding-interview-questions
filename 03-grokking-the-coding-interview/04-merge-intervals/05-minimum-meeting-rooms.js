/*
Given a list of intervals representing the start and end time of ‘N’ meetings, find 
the minimum number of rooms required to hold all the meetings.

Meetings: [[1,4], [2,5], [7,9]]
Output: 2
Explanation: Since [1,4] and [2,5] overlap, we need two rooms to hold these two meetings. [7,9] can 
occur in any of the two rooms later.

Meetings: [[1, 4], [1, 2], [3, 10], [7, 9]]
Output: 3
Explanation: Since [1,4] and [2,5] overlap, we need two rooms to hold these two meetings. [7,9] can 
occur in any of the two rooms later.
*/

class Meeting {
   constructor(start, end) {
      this.start = start;
      this.end = end;
   }
}

// Approach 1 / Without using MinHeap
const __min_meeting_rooms__ = function (meetings) {
   if (Array.isArray(meetings) === false || meetings.length === 0) return 0;
   if (meetings.length < 2) return 1;

   meetings.sort((a, b) => a.start - b.start);
   let minRooms = 1;
   for (let i = 0; i < meetings.length; i++) {
      const current = meetings[i];
      let rooms = 1;
      for (let j = i + 1; j < meetings.length; j++) {
         const next = meetings[j];
         if (current.start <= next.start && current.end > next.start) {
            rooms++;
         }
      }
      minRooms = Math.max(rooms, minRooms);
   }
   return minRooms;
};

// Approach 2 / By using MinHeap
const min_meeting_rooms = function (meetings) {
   if (Array.isArray(meetings) === false || meetings.length === 0) return 0;
   if (meetings.length === 1) return 1;

   meetings.sort((a, b) => a.start - b.start);

   const minHeap = new Heap([], null, (a, b) => b.end - a.end);
   let minRooms = 1;

   for (let meeting of meetings) {
      while (minHeap.length > 0 && minHeap.peek().end <= meeting.start) {
         minHeap.pop();
      }
      minHeap.push(meeting);
      minRooms = Math.max(minRooms, minHeap.length);
   }
   return minRooms;
};

console.log(
   `Minimum meeting rooms required: ${min_meeting_rooms([
      new Meeting(1, 4),
      new Meeting(2, 3),
      new Meeting(2, 10),
      new Meeting(6, 7),
   ])}`
);

console.log(
   `Minimum meeting rooms required: ${min_meeting_rooms([
      new Meeting(4, 5),
      new Meeting(2, 3),
      new Meeting(2, 4),
      new Meeting(3, 5),
   ])}`
);

console.log(
   `Minimum meeting rooms required: ${min_meeting_rooms([
      new Meeting(1, 4),
      new Meeting(2, 5),
      new Meeting(7, 9),
   ])}`
);

console.log(
   `Minimum meeting rooms required: ${min_meeting_rooms([
      new Meeting(6, 7),
      new Meeting(2, 4),
      new Meeting(8, 12),
   ])}`
);

console.log(
   `Minimum meeting rooms required: ${min_meeting_rooms([
      new Meeting(1, 4),
      new Meeting(2, 3),
      new Meeting(3, 6),
   ])}`
);

console.log(
   `Minimum meeting rooms required: ${min_meeting_rooms([
      new Meeting(4, 5),
      new Meeting(2, 3),
      new Meeting(2, 4),
      new Meeting(3, 5),
   ])}`
);
