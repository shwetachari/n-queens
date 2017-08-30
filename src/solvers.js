/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

/*
[
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
]
*/

window.findNRooksSolution = function(n) {
  var solution = makeEmptyMatrix(n);
  
  var placeRooks = function(row, column, rooksLeft) {
    //  base case if rooksLeft === 0
    if (rooksLeft === 0) {
      return;
      //  return
    } else {
      solution[row][column] += 1;
      //  call placeRooks(row + 1, column + 1, rooksLeft - 1)
      placeRooks(row + 1, column + 1, rooksLeft - 1);
    }
    
  
  };
  placeRooks(0, 0, n);
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  for (var i = 1; i <= n; i++) {
    if (i === 1) {
      solutionCount = 1;
    }
    solutionCount = solutionCount * i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme
  // pick a start point (not the corners)
  // iterate over all possible starting points
    // iterate over all possible points in next column
    // check for conflicts, place
      //repeat until end of board
    //last column: if can't find non-conflicting spot
      //solution does not work
      //move onto next solution
    //last column: if we can find a working solution
      //add 1

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
