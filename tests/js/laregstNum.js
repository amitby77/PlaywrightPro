function largest(arr){
    let max = arr[0]
    for ( let num of arr){
        if(num > max) max = num
    }
    return max
}

console.log(largest([4,7,88,555,4,8,9,66,5,44444,441522]))