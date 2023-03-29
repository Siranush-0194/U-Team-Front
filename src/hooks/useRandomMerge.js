const useRandomMerge = () => {
    return (arr1, arr2) => {
        function removeItem(arr, index) {
          for (var i = index; i < arr.length - 1; i++) {
            arr[i] = arr[i + 1];
          }
          arr.length = arr.length - 1;
        }
      
        function extractRandom(arr) {
          var index = Math.floor(Math.random() * arr.length);
          var result = arr[index];
          // remove item from the array
          removeItem(arr, index);
          return result;
        }
      
        var result = [];
        while (arr1.length || arr2.length) {
          if (arr1.length) {
            result[result.length] = extractRandom(arr1);
          }
          if (arr2.length) {
            result[result.length] = extractRandom(arr2);
          }
        }
        return result;
      }
};

export default useRandomMerge;
