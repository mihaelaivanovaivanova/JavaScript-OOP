function solve() {
    return function (numbers) {

        if(!Array.isArray(numbers)){
            throw '';
        }

        if(!numbers.every(x=>x==0||Number(x))){
            throw '';
        }
        if(numbers.length===0){
            return null;
        }

        return numbers.reduce((x, y) => +x + (+y), 0)
    }
} 