// console.log(('00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00007A79_78777675_74737271_706F6E6D_6c6B6A69_68676665_64636261'.length));

/*
00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00000000_00007A79_78777675_74737271_706F6E6D_6c6B6A69_68676665_64636261_F0030F02_116E6001_FFFFFFFF_FFFF0000
 */

var ascii = require('ascii-codes');


const header = '_F0030F02_116E6001_FFFFFFFF_FFFF0000'

let string = `GOOD MORNING`;

if (process.argv[2] == '-w' && process.argv[3]) {
  string = process.argv[3];
}

let string_ascii = '';
var i;
for (i = 0; i < 112; i++){
  if (i < string.length) {
    string_ascii = ascii.hexForSymbol(string[i]) + string_ascii;
  } else {
    string_ascii = '00' + string_ascii;
  }
  if ((i + 1) % 4 == 0 && (i+1 !== 112)) {
    string_ascii = '_' + string_ascii;
  }
}

const strings = [];
if (string.length > 112) {
  var j;
  for (j = 0; j < Math.floor(string.length/112); j++) {
    let new_str_ascii = '';
    var x;
    for (x = 0; x < 128; x++){
      if ((x + ((j + 1 ) * 112)) < string.length) {
        new_str_ascii = ascii.hexForSymbol(string.charAt((x + ((j + 1 ) * 112)))) + new_str_ascii;
      } else {
        new_str_ascii = '00' + new_str_ascii;
      }
      if ((x + 1) % 4 == 0 && (x + 1 !== 128)) {
        new_str_ascii = '_' + new_str_ascii;
      }
    }
    strings.push(new_str_ascii)
  }
}

console.log('0:', '1024\'h' + string_ascii + header);
strings.forEach(
  function(str, index) {
    console.log((index + 1) + ":" , '1024\'h' + str);
  }
)
