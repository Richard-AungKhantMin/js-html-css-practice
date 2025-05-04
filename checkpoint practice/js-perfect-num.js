
// 6 = 1 * 2 * 3 = 1 + 2 + 3
export function isPerfectNum(n){

    if (n === 0)return false

    const rayray = diviors(n)
    let sum = 0

    for (let j = 0; j < rayray.length; j++ ){
        sum += rayray[j]
    }


    if (sum === n){
        return true
    }
    return false

    // helper func
   function diviors(a){
    if ( a === 0 || a === 1) return []

    const divs = []
    for ( let i = 1; i < a; i++){
        if (a%i === 0){
            divs.push(i)
        }
    }
    return divs
   }

}