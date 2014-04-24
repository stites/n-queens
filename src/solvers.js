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
  var solution = (new Board({'n':n})).rows();
  for(var i = 0; i < n; i++){
    solution[i][i] = 1;
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.findNQueensSolution = function(n){
  var solution = undefined; //fixme
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

window.countNRooksSolutions = function(n){
  var solutionCount = 0;
  var col = new Int8Array(n);
  var recurse = function(cols){
    if( _.reduce(cols,function(m,i){return m+i;},0) === n)
    { return solutionCount++; }
    for(var j = 0; j < n; j++){
      if(cols[j] === 0){
        cols[j] = 1;
        recurse(cols);
        cols[j] = 0;
      }
    }
  }
  recurse(col);
  return solutionCount;
}

window.countNQueensSolutions = function(n){
  var t = new Date();
  var solutionCount=0,
    col=new Int8Array(n),
    maj=new Int8Array(n+n-1),
    min=new Int8Array(n+n-1),
    minIdx,
    majIdx;
  var recurse=function(x, col, majDiag, minDiag){
    for(var y=0;y<n;y++){
      if(majDiag[(n-1)+(x-y)]||minDiag[x+y]){
        continue;
      }
      if(col[y]===0){
        if(x===n-1){ return solutionCount++; }
        col[y] = 1;
        majDiag[(n-1)+(x-y)]=1;
        minDiag[x+y]=1;
        recurse(x+1, col, majDiag, minDiag);
        col[y]=0;
        majDiag[(n-1)+(x-y)] = 0;
        minDiag[x+y] = 0;
      }
    }
  }
  recurse(0,col,maj,min);
  console.log('time:',stime((new Date())-t));
  return solutionCount;
}


window.majDiagonalIdx = function(n, x, y){
  var majDiagIndex = (n - 1) + (x - y);
  return majDiagIndex;
}

window.minDiagonalIdx = function(n, x, y){
  var majDiagIndex = x + y;
  return majDiagIndex;
}


// 12Q @ 147ms
Q0=function(e){var z=new Date;var n=0,r=new Int8Array(e),i=new Int8Array(e+e-1),s=new Int8Array(e+e-1),o=function(t,r,i,s){for(var u=0;u<e;u++){if(i[e-1+(t-u)]||s[t+u]){continue}if(r[u]===0){if(t===e-1){return n++}r[u]=1;i[e-1+(t-u)]=1;s[t+u]=1;o(t+1,r,i,s);r[u]=0;i[e-1+(t-u)]=0;s[t+u]=0}}};o(0,r,i,s);console.log("OurTime:",stime(new Date-z));return n}
// 12Q @ 246ms
Q1=function(e){var z=new Date;s=0,c=(1<<e)-1,f=function(e,t,n,r){var i=~(e|t|n)&r;while(i>0){var o=-i&i;i=i^o;f((e|o)<<1,t|o,(n|o)>>1,r)}t==r&&s++};f(0,0,0,c);console.log("RuanTime:",stime(new Date-z));return s}
// 12Q @ 054ms
stime=function(m){var ms=m%1000;var s=~~((m/1000)%60);var m=~~((m/(60*1000))%60);return m+":"+s+"."+ms+" (m:s)";}
Q2=function(e){var t=0;var n=new Date;var r=function(n,i,s,o){if(n===e){return t++}for(var u=1;u<1<<e;u*=2){var a=i|s|o;if(!(a&u)){r(n+1,i+u,s+u>>1,o+u<<1)}}};r(0,0,0,0);console.log("EmmaTime:",stime(new Date-n));return t}

countNQueensSolutions = Q0

