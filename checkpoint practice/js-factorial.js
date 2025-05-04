// n! = n * (n-1) * ... * 1
//5! = 5 * 4 * 3 * 2 * 1

// remember to export

export function factorial(n){
    if (n === 0){
        return 1
    }

    let ans = n
    for (let i = n-1; i >= 1; i--){
        ans = ans * i
    }
    return ans
}

