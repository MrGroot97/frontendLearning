/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const binarySearch = (arr,t,lp,rp)=>{
    let l=lp,r=rp;
    while(l<=r){
        const m = Math.floor((l+r)/2)
        if(arr[m] === t) return m
        else if(arr[m] >t) r = r-1;
        else l=l+1
    }
    return -1;
}
// eslint-disable-next-line no-unused-vars
var search = function(nums, target) {
    let l=0,r=nums.length-1;
    let largestNumIdx = r;
    while(l<=r){
        const m = Math.floor((l+r)/2) 
        if(m<nums.length-1 && nums[m] > nums[m+1]){
            largestNumIdx = m
            break;
        }
        else if( nums[m] < nums[0] ) r = m-1
        else l = m+1;
    }
    if (nums[largestNumIdx] === target) return largestNumIdx;
    else if (target >= nums[0]) return binarySearch(nums,target, 0, largestNumIdx)
    else return binarySearch(nums,target,largestNumIdx+1,nums.length-1)
};