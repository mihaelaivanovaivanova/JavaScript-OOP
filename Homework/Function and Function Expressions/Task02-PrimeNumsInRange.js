function solve() {
    let primeNums = [];

    function isPrime(number) {
        for (let i = 2; i < number; i += 1) {
            if (!number % i) {
                return false;
            }
        }
        return true;
    }

    return function (numbers) {
      var start = +numbers[0];
      var end = +numbers[1];

        if(start===null||end===null){
            throw '';
        }

        if (start > end) {
            throw '';
        }

        if (isNaN(start) || isNaN(end)) {
            throw '';
        }

        for (let i = +start; i <= +end; i += 1) {
            if (isPrime(i)) {
                primeNums.push(i);
            }
        }
        return primeNums;
    }
}