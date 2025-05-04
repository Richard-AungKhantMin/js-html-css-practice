//15 --> 1 * 3 * 5
export function divisors(n) {
    if (n < 0){
        n = -n
    }

    if (n === 0 || n === 1){
        return []
    }

    const ans = []
    for (let i = 1; i < n; i++){
        if (n % i === 0){
            ans.push(i)
        }
    }

    return ans
}