export function reverseChunks(r, size){

    if (size <= 0) return []
    
    const ans = []
    
    for (let i = 0; i < r.length; i = i + size){
        const groupie = r.slice(i, i+size).reverse()
        ans.push(...groupie)
    }
    
    return ans
    }