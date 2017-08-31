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
  
  var solution = makeEmptyMatrix(n);
  var board = new Board({n: n});
  
  var noConflicts = function(board) {
    return board['hasAnyQueensConflicts']();
  };

  var placeQueens = function(row, col) {
    if (board.get(row) === undefined) {
      return;
    } else if (board.get(row)[col] === undefined && board.get(row - 1) !== undefined) {
      row--;
      var prevIndex = board.get(row).indexOf(1);
      board.get(row)[prevIndex] = 0;
      placeQueens(row, prevIndex + 1);
    } else {
      board.get(row)[col] = 1;
      if (!noConflicts(board)) {
        placeQueens(row + 1, 0);
      } else {
        board.get(row)[col] = 0;
        placeQueens(row, col + 1);
      }
    }
  };
  
  if (n === 2 || n === 3) {
    return solution;
  } else {
    placeQueens(0, 0);
    for (var i = 0; i < n; i++) {
      solution[i] = board.get(i);
    }
  }
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  window.displayBoard(solution);

  return solution;
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 
  var board = new Board({n: n});
  
  

  var noConflicts = function(board) {
    return board['hasAnyQueensConflicts']();
  };
  
  var hitMidpoint = false;
  var placeQueens = function(row, col) {
    if (hitMidpoint === false && n % 2 !== 0 && board.get(0).indexOf(1) === Math.ceil(n / 2) - 1) {
      solutionCount *= 2;
      hitMidpoint = true;
    }
    
    if (board.get(row) === undefined) {
      var posAtRow0 = board.get(0).indexOf(1);
      if (n % 2 === 0 && posAtRow0 > ((n - 1) / 2)) {
        solutionCount *= 2;
        return;
      } else if (n % 2 !== 0 && posAtRow0 === Math.ceil(n / 2)) {
        return;
      }
      solutionCount += 1;
      var lastQueen = board.get(row - 1).indexOf(1);
      board.get(row - 1)[lastQueen] = 0;
      placeQueens(row - 1, lastQueen + 1); 
    } else if (board.get(row)[col] === undefined && board.get(row - 1) !== undefined) {
      row--;
      var prevIndex = board.get(row).indexOf(1);
      board.get(row)[prevIndex] = 0;
      placeQueens(row, prevIndex + 1);
    } else {
      board.get(row)[col] = 1;
      if (!noConflicts(board)) {
        placeQueens(row + 1, 0);
      } else {
        board.get(row)[col] = 0;
        placeQueens(row, col + 1);
      }
    }
  };
  if (n === 0 || n === 1) {
    return 1;
  } else if (n === 2 || n === 3) {
    return 0;
  } else {
    placeQueens(0, 0);
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
