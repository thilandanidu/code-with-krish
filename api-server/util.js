function getMinNumber(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    return {
      status: 400,
      data: {
        error: `both parameters should be numbers`,
      },
    };
  }
  return {
    status: 200,
    data: {min: Math.min(num1, num2)},
  };
}


function getMaxNumber(num1, num2){
    if(isNaN(num1) || isNaN(num2)){
        return {
            status:400,
            data: {
                error: 'both parametres shoud be numbers',
            }
        };
    }
    return {
        status:200,
        data:
        { max: Math.max(num1,num2)}
    };
}


function getAverageNumber(numArray) {
    if (numArray.length === 0) {
      return {
        status: 400,
        data: {
          error: 'The array is empty. Please provide an array with numbers.',
        },
      };
    }
  
    let sum = 0;
  
    for (let i = 0; i < numArray.length; i++) {
      if (isNaN(numArray[i])) {
        return {
          status: 400,
          data: {
            error: 'All elements must be valid numbers',
          },
        };
      }
      sum += numArray[i];
    }
  
    const average = sum / numArray.length;
  
    return {
      status: 200,
      data: { average: average },
    };
  }
  


  function sortNumbers(numArray, type) {
    if (numArray.some(isNaN)) {
      return {
        status: 400,
        data: {
          error: 'All elements must be valid numbers',
        },
      };
    }
  
    let n = numArray.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if ((type === 'asc' && numArray[j] > numArray[j + 1]) ||
            (type === 'desc' && numArray[j] < numArray[j + 1])) {
         
          [numArray[j], numArray[j + 1]] = [numArray[j + 1], numArray[j]];
        }
      }
    }
  
    return {
      status: 200,
      data: { sortedNumbers: numArray },
    };
  }



  function countOccurrences(numArray, search) {
    if (numArray.length === 0) {
      return {
        status: 400,
        data: {
          error: 'The numbers array should not be empty',
        },
      };
    }
  
    let count = 0;
    for (let i = 0; i < numArray.length; i++) {
      if (numArray[i] == search) { 
        count++;
      }
    }
  
    return {
      status: 200,
      data: { count: count },
    };
  }
  


  module.exports = {getMinNumber, getMaxNumber, getAverageNumber, sortNumbers, countOccurrences};
  
