function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function logArray(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(`Index: ${i} = ${array[i]}`);
    
  }
}

// Used like so
var arr = [2, 11, 37, 42];
arr = shuffle(arr);
// console.log(arr);

logArray(arr);