/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
// eslint-disable-next-line no-unused-vars
var dailyTemperatures = function(temperatures) {
    const n = temperatures.length;
    const res = new Array(n).fill(0)
    const stack = []

    for(let i=n-1;i>=0;i--){
        
        while( stack.length && temperatures[stack[stack.length -1]] <= temperatures[i]){
            stack.pop();
        }

        if(stack.length) {
            res[i] = stack[stack.length -1] - i
        }
        stack.push(i)
    }

    return res;
};