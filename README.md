## n-queens

#### Solutions and benchmarks to the n-queens problem
Tests are conducted up to 15 queens, which takes ~34s to compute. Within
`src/solvers.js` our final version is called `Q0`. There also exist two
bitwise solutions, `Q1` and `Q2`, for comparison. Our solution is - to my
knowledge - faster than one of these. In short, we optimized our solution
to a point where we reconstructed the fastest bitwise logic without using
bitwise operators in our solution.

You can access all of these after opening up `solversSpec.js` and checking
out the console.

Please also note that this is a copy of the work I did on a private repo,
originally from a project from [Hack Reactor's](http://hackreactor.com)
curriculum. This project was worked on with [bioball](https://github.com/bioball)
as an additional contributor.
