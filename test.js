function filter_list(l) {

  //return l.filter( ch => Number.isInteger(ch) || !Number.isNaN(ch % 1) )  
  //return l.filter( ch => typeof ch === 'number' )


  //var n = parseInt(readline()); // the number of temperatures to analyse
  var temps = '-10 -10'//readline(); // the n temperatures expressed as integers ranging from -273 to 5526
  //printErr( n ) 


  var arr = temps.split(' ')
  var min = Math.abs( arr[0] )
  var abs_min = (arr[0] >= 0) ? true : false 

console.log( arr[0]  ,abs_min ) 

  for( i=1 ; i<2 ; i++ ){
      if( Math.abs( arr[i] ) <= min ){
          abs_min = ( arr[i] >= 0 || ( Math.abs( arr[i] ) === min && abs_min ) ) ? true : false 
          min = Math.abs( arr[i] )
      }
      console.log( arr[i]  ,abs_min ) 
  }

  console.log( min , abs_min )

  console.log( abs_min ? min : -min );
}


filter_list('l');