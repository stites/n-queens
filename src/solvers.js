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
window.countNRooksSolutions = function(n, board, count){
  debugger;
  count = count || 0;
  board = board || new Board({'n': n });
  _.each(board.rows(), function (row, yidx) {
    _.each(row, function (cell, xidx) {
      if (cell === 0){
        board.insert(xidx, yidx, 1);
      }
      if (board.hasAnyRooksConflicts()){
        board.insert(xidx, yidx, 'X');
      } else {
        board.insert(xidx, yidx, 0);
      }
    });
  });
  if ( !board.countThings(0) ){
    // countThings will count the number of the
    // passed in value that are contained in the board
    if (board.countThings(1) > n){
      count++;
    }
  } else {
    _.each(board.rows(), function (row, yidx) {
      _.each(row, function (cell, xidx) {
        if (cell === 0){
          board.insert(xidx, yidx, 1); //inserting fo realz
          var dupeBoard = Object.create(board);
          countNRooksSolutions(n, dupeBoard, count);
        }
      });
    });
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return count;
};



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
