/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// eslint-disable-next-line no-unused-vars
var searchMatrix = function(matrix, target) {
    let r=matrix.length,c=matrix[0].length;

    let topr=0,botr=r-1;

    while(topr<=botr){
        const mid = Math.floor((topr+botr)/2)
        if( matrix[mid][0] > target ) botr--;
        else if( matrix[mid][c-1] < target ) topr++;
        else {
            topr = mid
            break;
        }
    }

    if (topr>botr) return false

    let lc=0,rc=c-1;
    while( lc<=rc ){
        const mid = Math.floor((lc+rc)/2)
        if(matrix[topr][mid] > target ) rc--;
        else if( matrix[topr][mid] < target ) lc++;
        else return true
    }

    return false
};