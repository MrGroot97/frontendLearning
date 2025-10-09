/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
// eslint-disable-next-line no-unused-vars
var carFleet = function(target, position, speed) {
    const pair = position.map((item, idx)=>{
        return {pos: item, speed: speed[idx]}
    })
    // Sort pairs by position in descending order
    const sortedPair = pair.sort((a,b)=> b.pos - a.pos)

    const stack = []
    sortedPair.forEach((item)=>{
        const time =  (target - item.pos) / item.speed
        
        if(!(stack.length && stack[stack.length -1] >=  time )){
            stack.push(time)
        }
        // otherwise Current car will catch up with the fleet in front
    })

    return stack.length
};