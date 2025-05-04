// 0 1 1 2 3 5 8 13
// n1, n2, n3 = n2+n1, n4 = n3+n2, ....

export function fibonacci(n){

    if (n === 0) return 0
    if (n === 1) return 1

    return fibonacci(n-1)+fibonacci(n-2)

}