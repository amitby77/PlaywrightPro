function removeDuplicates(arr){
    let result =[]
    
    for(let i=0;i<arr.length;i++){
        if(!result.includes(arr[i])){
            result.push(arr[i])
        }
    }
    return result
}

console.log(removeDuplicates([2,2,4,5,6,7,5,5,9]))