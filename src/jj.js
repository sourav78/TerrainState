const yourVariable = {
    jj: "lll"
};

if (typeof yourVariable === 'object' && yourVariable !== null) {
  // The variable is an object
  console.log('It is an object!');
  console.log(Object.keys(yourVariable).length);
} else {
  // The variable is not an object or it is null
  console.log('It is not an object.');
}