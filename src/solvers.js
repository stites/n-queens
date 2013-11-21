/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, 
// with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  // create an array that looks like an empty board
  // generate a board.rows();
  // for rowidx===colidx, 
  // reassign board[rowIdx]= 1
  // return board
  var solution = (new Board({'n':n})).rows();
  for(var i = 0; i < n; i++){
    solution[i][i] = 1;
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var memo = {};
  var recurse = function(n, board){
    board = board || new Board({'n': n });

    _.each(board.rows(), function (row, yidx) {
      _.each(row, function (cell, xidx) {
        if (cell === 0){
          board.insert(xidx, yidx, 1);
        }
        if (board.hasAnyRooksConflicts()){
          board.insert(xidx, yidx, 'X');
        } else {
          if(cell !== 1 && cell !== 'X'){
            board.insert(xidx, yidx, 0);
          }
        }
      });
    });

    // if (JSON.stringify(board.rows()) === JSON.stringify([[1,"X"],["X",1]])){
    //   debugger;
    // }
    if ( board.countThings(0) === 0 ){
      // countThings will count the number of the
      // passed in value that are contained in the board
      if (board.countThings(1) >= n){
        var key = JSON.stringify(board.rows());
        memo[key] = true;
        // count++;
      }
    } else {
      _.each(board.rows(), function (row, yidx) {
        _.each(row, function (cell, xidx) {
          if (cell === 0){

            var dupedBoard = new Board(copyArray(board.rows()));

            dupedBoard.insert(xidx, yidx, 1); //inserting fo realz
            recurse(n, dupedBoard);

          }
        });
      });
    }
  }
  recurse(n);
  var keyCount = 0;
  for (var keys in memo){
    keyCount++;
  }
  console.log('Number of solutions for ' + n + ' rooks:', keyCount);
  return keyCount;
};

window.copyArray = function(arr){
  var result = [];
  for(var i = 0; i < arr.length; i++){
    result.push(arr[i].slice(0));
  }
  return result;
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
