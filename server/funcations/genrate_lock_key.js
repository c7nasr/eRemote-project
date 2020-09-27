const unlock_code_array = Math.random().toString(20).substr(2, 12).match(/.{1,4}/g)
console.log(unlock_code_array[0] + "-" + unlock_code_array[1] + "-" + unlock_code_array[2])


