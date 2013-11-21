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
window.countNQueensSolutionsNaive = function(n){
  var memo = {};
  var recurse = function(n, board){
    board = board || new Board({'n': n });

    _.each(board.rows(), function (row, yidx) {
      _.each(row, function (cell, xidx) {
        if (cell === 0){
          board.insert(xidx, yidx, 1);
        }
        if (board.hasAnyQueensConflicts()){
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


window.countNQueensSolutions = function(n){
  var path = "right";
  var stepper = 0;
  var x = 0;
  var y = 0;
  var coords = [];
  var maxStep = n - 1;
  var result;

  while(maxStep){
    if(path === "right"){
      coords.push([x,y]);
      stepper++;
      x++;
      if(stepper === maxStep){
        path = "down";
        stepper = 0;
        maxStep -= 2
      }
    }
    if(path === "down"){
      coords.push([x,y]);
      stepper++;
      y++;
      if(stepper === maxStep){
        path = "left";
        stepper = 0;
        maxStep -= 2;
      }
    }
    if(path === "left"){
      coords.push([x,y]);
      stepper++;
      x--;
      if(stepper === maxStep){
        path = "up";
        stepper = 0;
        maxStep -= 2;
      }
    }
    if(path === "up"){
      coords.push([x,y]);
      stepper++;
      y--;
      if(stepper === maxStep){
        path = "right";
        stepper = 0;
        maxStep -= 2;
      }
    }
    if(n % 2){
      var coord = ~~(n/2 + 1);
      coords.push([coord, coord]);
    }
  }

  var cols = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
  var rows = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);

  // pre-vetted intitialized boards
  for (var i = 0; i < coords.length; i++) {
    cols[ coords[i][0] ] = 1;   //[0,1,0,0,0]
    rows[ coords[i][1] ] = 1;   //[1,0,0,0,0]
    var queenPosX = coords[i][0];
    var queenPosY = coords[i][1];

    result += recur(rows, cols, { queenPosX+":"+queenPosY:true });
  };

  var recur = function(arrRows, arrCols, queenPositions){
    for (x = 0; x < arrRows.length; x++) {
      for (y = 0; y < arrCols.length; y++) {
        if(_.reduce(arrRows.concat(arrCols), function(sum, num){ return sum + num}, 0) === n*2 ){
          result += returnWeightedSymmetry(queenPositions, n);
        }
        if (arrRows[x] === 0 && arrCols[y] === 0){
          arrRows[x] = 1;
          arrCols[y] = 1;
          queenPositions[x + ":" + y] = true;
          recur(arrRows, arrCols, queenPositions);
        }
      };
    };
    // generate solutions

  }
  return result;
};

window.returnWeightedSymmetry = function(obj, n){
  var newObj = {};
  var coords, x, y;

  // rotate 90 degrees
  _.each(obj, function(item, key){
    coords = key.split(":");
    x = coords[0];
    y = coords[1];
    x = n - y;
    y = n - x;
    newObj[x + ":" + y] = true;

  })

  if (JSON.stringify(obj) === JSON.stringify(newObj)){
    // symmetry is 4-rotational. we're done and don't need to check further.
    return 1;
  }

  // rotate 180 degrees
  _.each(obj, function(item, key){
    coords = key.split(":");
    x = coords[0];
    y = coords[1];
    x = n - x;
    y = n - y;
    newObj[]
  })

  if (JSON.stringify(obj) === JSON.stringify(newObj)){
    // symmetry is 2-rotational
    return 2;
  }
  return 4;
}

window.countNQueensSolutionsNaive = function(n){
  var memo = {};
  var recurse = function(n, board){
    board = board || new Board({'n': n });

    _.each(board.rows(), function (row, yidx) {
      _.each(row, function (cell, xidx) {
        if (cell === 0){
          board.insert(xidx, yidx, 1);
        }
        if (board.hasAnyQueensConflicts()){
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

