describe("solvers", function() {
  window.displayBoard = function(){};

  describe('findNRooksSolution()', function(){

    it('finds a valid solution for n of 1-8', function(){
      _.range(1, 9).map(function(n){
        var solutionBoard = new Board(findNRooksSolution(n));
        expect(solutionBoard.get('n')).to.equal(n);
        expect(solutionBoard.hasAnyRooksConflicts()).to.be.equal(false);
      });
    });

  });

  describe('countNRooksSolutions()', function(){

    it('finds the number of valid solutions for n of 1-8', function(){
      _.range(1, 9).map(function(n){
        // if (n === 2 ){
          // debugger;
          // sinon.spy(window, "countNRooksSolutions");

          var solutionCount = countNRooksSolutions(n);
          var expectedSolutionCount = ["lalala", 1, 2, 6, 24, 120, 720, 5040, 40320][n];

          console.log("Call count:", window.countNRooksSolutions.callCount);

          expect(solutionCount).to.be.equal(expectedSolutionCount);
          console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
        // }
      });
    });

  });

  describe('findNQueensSolution()', function(){

    it('finds a valid solution for n of 0-8', function(){
      _.range(1, 8).map(function(n){
        var solutionBoard = new Board(findNQueensSolution(n));
        expect(solutionBoard.get('n')).to.equal(n);
        expect(solutionBoard.hasAnyQueensConflicts()).to.be.equal(false);
      });
    });

  });

  describe('countNQueensSolutions()', function(){

    it('finds the number of valid solutions for n of 0-8', function(){
      _.range(1, 9).map(function(n){
        // if (n === 2) {debugger;}
        var solutionCount = countNQueensSolutions(n);
        var expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92][n];
        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });

});
