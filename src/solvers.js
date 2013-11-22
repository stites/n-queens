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
// window.findNRooksSolution = function(n){
//   // create an array that looks like an empty board
//   // generate a board.rows();
//   // for rowidx===colidx, 
//   // reassign board[rowIdx]= 1
//   // return board
//   var solution = (new Board({'n':n})).rows();
//   for(var i = 0; i < n; i++){
//     solution[i][i] = 1;
//   }
//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution;
// };

// window.findNRooksSolution = function(){};
// window.findNQueensSolution = function(){};
// window.countNQueensSolution = function(){};


// window.countNRooksSolutions = function(n){
//   var coords = [];
//   var result;
//   var i = 0;
//   var directions = ["right", "down", "left", "up"];

//   // this will 
//   for( var maxStep = n, path = "right", stepper = 0, x = 0, y = 0; maxStep < 0; stepper++){
//     if(stepper === maxStep){
//       maxStep -= 2;
//       i += 1;
//       path = directions[i];
//       stepper = 0;
//     }
//     coords.push([x,y]);
//     switch(path){
//       case "right":
//         x++;
//         break;
//       case "down":
//         y++;
//         break;
//       case "left":
//         x--;
//         break;
//       case "up":
//         y--;

//         break;
//     }
//   }
//   debugger;

//   // if the board is an odd number, we need to add the center cell.
//   if(n % 2 && n > 1){
//     var coord = Math.ceil(n / 2);
//     coords.push([coord, coord]);
//   }

//   var cols = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
//   var rows = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);

//   var recur = function(arrRows, arrCols, rookPositions){
//     for (x = 0; x < arrRows.length; x++) {
//       for (y = 0; y < arrCols.length; y++) {
//         var red = _.reduce(arrRows.concat(arrCols), function(sum, num){ 
//           return sum + num;
//         }, 0);
//         if( red === n * 2 ){
//           result += returnWeightedSymmetry(rookPositions, n);
//         }
//         if (arrRows[x] === 0 && arrCols[y] === 0){
//           arrRows[x] = 1;
//           arrCols[y] = 1;
//           rookPositions[(x + ":" + y)] = true;
//           recur(arrRows, arrCols, rookPositions);
//         }
//       };
//     };
//     // generate solutions
//   }

//   // pre-vetted intitialized boards
//   for (var i = 0; i < coords.length; i++) {
//     cols[ coords[i][0] ] = 1;   //[0,1,0,0,0]
//     rows[ coords[i][1] ] = 1;   //[1,0,0,0,0]
//     var queenPosX = coords[i][0];
//     var queenPosY = coords[i][1];
//     var queenPos = queenPosX + ":" + queenPosY;

//     recur(rows, cols, { queenPos: true });
//   };
//   return result;
// };



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutionsNaive = function(n){
//   var memo = {};
//   var recurse = function(n, board){
//     board = board || new Board({'n': n });

//     _.each(board.rows(), function (row, yidx) {
//       _.each(row, function (cell, xidx) {
//         if (cell === 0){
//           board.insert(xidx, yidx, 1);
//         }
//         if (board.hasAnyRooksConflicts()){
//           board.insert(xidx, yidx, 'X');
//         } else {
//           if(cell !== 1 && cell !== 'X'){
//             board.insert(xidx, yidx, 0);
//           }
//         }
//       });
//     });

//     // if (JSON.stringify(board.rows()) === JSON.stringify([[1,"X"],["X",1]])){
//     //   debugger;
//     // }
//     if ( board.countThings(0) === 0 ){
//       // countThings will count the number of the
//       // passed in value that are contained in the board
//       if (board.countThings(1) >= n){
//         var key = JSON.stringify(board.rows());
//         memo[key] = true;
//         // count++;
//       }
//     } else {
//       _.each(board.rows(), function (row, yidx) {
//         _.each(row, function (cell, xidx) {
//           if (cell === 0){

//             var dupedBoard = new Board(copyArray(board.rows()));

//             dupedBoard.insert(xidx, yidx, 1); //inserting fo realz
//             recurse(n, dupedBoard);

//           }
//         });
//       });
//     }
//   }
//   recurse(n);
//   var keyCount = 0;
//   for (var keys in memo){
//     keyCount++;
//   }
//   console.log('Number of solutions for ' + n + ' rooks:', keyCount);
//   return keyCount;
// };

// window.copyArray = function(arr){
//   var result = [];
//   for(var i = 0; i < arr.length; i++){
//     result.push(arr[i].slice(0));
//   }
//   return result;
// }

// // return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// window.findNQueensSolution = function(n){
//   var solution = undefined; //fixme

//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return solution;
// };



// // return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// window.countNQueensSolutionsNaive = function(n){
//   var memo = {};
//   var recurse = function(n, board){
//     board = board || new Board({'n': n });

//     _.each(board.rows(), function (row, yidx) {
//       _.each(row, function (cell, xidx) {
//         if (cell === 0){
//           board.insert(xidx, yidx, 1);
//         }
//         if (board.hasAnyQueensConflicts()){
//           board.insert(xidx, yidx, 'X');
//         } else {
//           if(cell !== 1 && cell !== 'X'){
//             board.insert(xidx, yidx, 0);
//           }
//         }
//       });
//     });

//     // if (JSON.stringify(board.rows()) === JSON.stringify([[1,"X"],["X",1]])){
//     //   debugger;
//     // }
//     if ( board.countThings(0) === 0 ){
//       // countThings will count the number of the
//       // passed in value that are contained in the board
//       if (board.countThings(1) >= n){
//         var key = JSON.stringify(board.rows());
//         memo[key] = true;
//         // count++;
//       }
//     } else {
//       _.each(board.rows(), function (row, yidx) {
//         _.each(row, function (cell, xidx) {
//           if (cell === 0){

//             var dupedBoard = new Board(copyArray(board.rows()));

//             dupedBoard.insert(xidx, yidx, 1); //inserting fo realz
//             recurse(n, dupedBoard);

//           }
//         });
//       });
//     }
//   }
//   recurse(n);
//   var keyCount = 0;
//   for (var keys in memo){
//     keyCount++;
//   }
//   console.log('Number of solutions for ' + n + ' rooks:', keyCount);
//   return keyCount;

// };

// window.countNQueensSolutions = function(n){
//   return undefined;
// }


window.returnWeightedSymmetry = function(obj, n){
  var newObj = {};
  var coords, x, y;
  var coord;

  // rotate 90 degrees
  _.each(obj, function(item, key){
    coords = key.split(":");
    x = coords[0];
    y = coords[1];
    x = n - y;
    y = n - x;
    coord = x + ":" + y;
    newObj[coord] = true;

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
    coord = x + ":" + y;
    newObj[coord] = true;
  })

  if (JSON.stringify(obj) === JSON.stringify(newObj)){
    // symmetry is 2-rotational
    return 2;
  }
  return 4;
}
// window.countNQueensSolutionsNaive = function(n){
//   var memo = {};
//   var recurse = function(n, board){
//     board = board || new Board({'n': n });

//     _.each(board.rows(), function (row, yidx) {
//       _.each(row, function (cell, xidx) {
//         if (cell === 0){
//           board.insert(xidx, yidx, 1);
//         }
//         if (board.hasAnyQueensConflicts()){
//           board.insert(xidx, yidx, 'X');
//         } else {
//           if(cell !== 1 && cell !== 'X'){
//             board.insert(xidx, yidx, 0);
//           }
//         }
//       });
//     });

//     // if (JSON.stringify(board.rows()) === JSON.stringify([[1,"X"],["X",1]])){
//     //   debugger;
//     // }
//     if (board.countThings(0) === 0){
//       // countThings will count the number of the
//       // passed in value that are contained in the board
//       if (board.countThings(1) >= n){
//         var key = JSON.stringify(board.rows());
//         memo[key] = true;
//         // count++;
//       }
//     } else {
//       _.each(board.rows(), function (row, yidx) {
//         _.each(row, function (cell, xidx) {
//           if (cell === 0){

//             var dupedBoard = new Board(copyArray(board.rows()));

//             dupedBoard.insert(xidx, yidx, 1); //inserting fo realz
//             recurse(n, dupedBoard);

//           }
//         });
//       });
//     }
//   }
//   recurse(n);
//   var keyCount = 0;
//   for (var keys in memo){
//     keyCount++;
//   }
//   console.log('Number of solutions for ' + n + ' rooks:', keyCount);
//   return keyCount;
// };

window.countNRooksSolutionsBitwise = function(n){
  var solutionCount = 0;
  var row = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
  var col = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);

  // var maj = new Int8Array(n+n-1);
  // var min = new Int8Array(n+n-1);

  var recurse = function(rows, cols){
    // var sum = _.reduce(rows.concat(cols), function(result, value){
    //   return result + value;
    // }, 0);
    var sum = _.reduce(cols, function(result, value){
      return result + value;
    }, 0);
    if( sum === n){//(2 * n)){
      solutionCount++;
      console.log('solutionCount:', solutionCount)
      return;
    }
    // for(var i = 0; i < n; i++){
      for(var j = 0; j < n; j++){
        if(cols[j] === 0){
          // rows[i] = 1;
          cols[j] = 1;
          console.log('rows', rows);
          console.log('cols', cols);
          recurse(rows, cols); // [1,0]  [1,0]
          // rows[i] = 0;
          cols[j] = 0;
        // }
      }
    }
  }
  recurse(row, col);
  return solutionCount;
}