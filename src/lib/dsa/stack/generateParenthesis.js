/**
 * @param {number} n
 * @return {string[]}
 */
// eslint-disable-next-line no-unused-vars
var generateParenthesis = function(n) {
    const stack = [];
    const res = [];

    const backTrack = (openCount,closeCount) =>{

        // when open and close brackets count becomes equal, then only it is a valid bracket
        if(openCount === closeCount && openCount === n){
            res.push(stack.join(""))
        }

        // we can only add open bracket upto n
        if(openCount < n){
            stack.push("(")
            backTrack(openCount+1, closeCount)
            stack.pop()
        }

        // we can only add close bracket if it's less than open bracket other wise it will make parenthesis invalid
        if(closeCount<openCount){
            stack.push(")")
            backTrack(openCount, closeCount+1)
            stack.pop()
        }
    } 

    backTrack(0,0);

    return res;
};