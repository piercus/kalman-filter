module.exports = function(arr){
  let diag=0;
  for (let row=0; row<matrix.length; row++){
    diag +=arr[row][row]
  }
  return diag
}
