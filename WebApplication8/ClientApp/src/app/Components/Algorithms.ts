import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { error } from 'util';

import { ViewChild, ElementRef } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { indexDebugNode } from '@angular/core/src/debug/debug_node';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { startWith } from 'rxjs/operator/startWith';
import { promise } from 'protractor';
import { open } from 'fs';



@Component({
  selector: 'Algorithms',
  templateUrl: './algorithms.html'

})
export class AlgorithmsComponent {
  
  _http: HttpClient;
  _baseURL: string;
  maxNumber: MaxNumber;
  numbers: number[];
  codeSegment: string = "";
  codeSegmentValid: boolean = false;
  // Reference firstNameInput variable inside Component
  

  constructor(http: HttpClient )
  {
    this._http = http;
    this._baseURL = ""; //"http://localhost:63790/";
    this.maxNumber = { number: 0, rank: 0 , tempString: ''};
    this.numbers = new Array();


    
    this._http.get("http://localhost:63790/api/algorithms/trytypes").subscribe(result => {
    

    }, error => {
    
    });
    
  }

  ValidatePracitseExtened() {
    let input = ['{}[]()','{}{}}', '[]{[]}'];


    let validLocations = [];
    let openOccurrences = [];

    
    for (let x = 0; x < input.length; x++) {

      let currentValue = input[x];
      validLocations[x] = 'true';
      for (let i = 0; i < currentValue.length; i++) {
        if (currentValue[i] == '{' || currentValue[i] == '[' || currentValue[i] == '(')
          openOccurrences.push(currentValue[i]);

        else if (currentValue[i] == '}' || currentValue[i] == ']' || currentValue[i] == ')') {

          if (openOccurrences.length == 0) {
            validLocations[x] = 'false';
            break;
          }

          if (this.checkForClosePracet(openOccurrences.pop(), currentValue[i]) == false) {
            validLocations[x] = 'false';
            break;
          }

        }
      }
      

    }

    console.log(validLocations);



  }

  checkForClosePracet(open: string, close: string) {

    if (open == '[' && close == ']')
      return true;
    else if (open == '{' && close == '}')
      return true;
    else if (open == '(' && close == ')')
      return true;
    else
      return false;
      
  }


  EvenNumbersFirst() {

    
    let numbers = [13,14,11,12,15,18]
    let oddNumbersLocations = [];
    let evenNumbersLocations = [];
    let temp =0; 
    for (let i = 0; i < numbers.length; i++) {
       if (numbers[i] % 2 != 0)
         oddNumbersLocations.push(i);
      
    }

    for (let i = 0; i < oddNumbersLocations.length; i++) {

      numbers= this.ReplaceWithLastEvenNumber(oddNumbersLocations[i], numbers);
    }

    
    console.log(numbers);

  }

  ReplaceWithLastEvenNumber(currentOddNumberIndex: number, numbers: number[]) {
    for (let i = numbers.length-1 ; i > 0; i-- ) {

      if (numbers[i] % 2 == 0 && i > currentOddNumberIndex) {
        let temp = numbers[i];
        numbers[i] = numbers[currentOddNumberIndex];
        numbers[currentOddNumberIndex] = temp;
        break;
      }
    }

    return numbers;
  }

  JSPracctic() {

    //arrays
    let array: Array<any>;
    array = [{ name: 'ali', age: 33 }, { name: 'maged', age: 55 }, { name: 'said', age: 32 }];


    console.log('pop' + array.pop().name);
    console.log('push: ' + array.push('some value'));
    console.log('index of: ' + array.indexOf('some value'));
    console.log('index of (wrong value): ' + array.indexOf('Some value'));
    console.log('splice: ' + array.splice(2, 1));
    console.log('unshift: ' + array.unshift('ali'));
    console.log('shift: ' + array.shift());
    console.log('shift: ' + array.join(' '));
    let copyArray = array.slice();
    console.log('pop : ' + array.pop());

    array.pop();
    array.pop();
    array.pop();
    if (array.pop() == undefined)
      array.push('end reached');

    console.log(array[0]);

    console.log('copy array after original pop(): ' + copyArray.length + ', original.length: ' + array.length);
    //

    array.forEach(item => {

      console.log('for each example: ' + item);

    });

    let obj = { age: 3, name: 'ali' };
    console.log(obj['age']);


    //
    //arrays

    // assotiative array
    let keyedArray = { one: 1, two: 2, three: 3, four: 4 };
    keyedArray['five'] = 5;

    for (let key in keyedArray) {

      console.log('key: ' + key + ' value: ' + keyedArray[key]);
    }

    console.log(Object.keys(keyedArray).join(','));


    console.log(
      Object.keys(keyedArray).map(key => { return keyedArray[key]; })
    );

    var fruits = [];
    fruits.push('banana', 'apple', 'peach');

    fruits[5] = 'mango';
    console.log(Object.keys(fruits));
    console.log(fruits.length);

    let input = "fwefbdbddbbdbdbd sdssdfsdfdbdbd";
    let reg = /d(b+)(d)/i;

    let matchResult = input.match(reg);
    console.log(Array.from("1234"));

    console.log('fill : ' + array.fill(2, 0));

    let arr = [1, 2, 3, 4, 5, 6];
    console.log('print arr' + arr);
    console.log('shift: ' + arr.shift());
    console.log('print arr' + arr);
    arr.unshift(45);
    console.log('unshift 45: ' + arr);
    arr.pop();
    console.log('pop: ' + arr);
    arr.push(70)
    console.log('push: 70' + arr);

    arr.sort((a, b) => {

      return a - b;
    });

    var arrOfObj= [
      { name: 'Edward', value: 21 },
      { name: 'Sharpe', value: 37 },
      { name: 'And', value: 45 },
      { name: 'The', value: -12 },
      { name: 'Magnetic', value: 13 },
      { name: 'Zeros', value: 37 }
    ];

    // sort by number desc
    arrOfObj.sort((a, b) => {
      return b.value - a.value ;
    });

    arrOfObj.forEach(item => {
      console.log('sort arrOfObj by integer desc ' + item.value);
    });

    //sort by number asc
    arrOfObj.sort((a, b) => {
      return a.value - b.value ;
    });

    arrOfObj.forEach(item => {
      console.log('sort arrOfObj by integer asc' + item.value);
    });

    //sort by name asc (or date)
    arrOfObj.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase())
        return 1;
      else
        return -1;
    });

    arrOfObj.forEach(item => {
      console.log('sort arrOfObj by name asc: ' + item.name);
    });

    // filter
    console.log("filter");
    arrOfObj =  arrOfObj.filter(item => {

      return item.value > 30;
    }).sort((a, b) => {
      return b.value -a.value ;
      });

    arrOfObj.forEach(item => {
      console.log(item.value);
    })

    // splice
    console.log('splice');
    arrOfObj.splice(2, 3);
    console.log('deleted items from index 2,remove  3 items  : ' + arrOfObj.map(item => { return item.name}));

    // match using regular expression 
    console.log('index of');
    let arrIndexOf = ['ahmed', 'sai', 'husaid'];

    let filter = arrIndexOf.filter(item => {
      
      return item.match(/^.a/i) 
    });
    console.log('match using regular expression .a ' + filter );

    // print items keys 

    var gasPrice = new Intl.NumberFormat('en-US',
      {
        style: 'currency', currency: 'USD',
        minimumFractionDigits: 3
      });
    console.log(gasPrice.format(5.259)); // $5.259

    //hash map & sets as well (new Set()) , sets allow unique items only 
    //let sayings = new Map();
    //sayings.set('dog', 'woof');
    //sayings.set('cat', 'meow');
    //sayings.set('elephant', 'toot');
    //sayings.size; // 3
    //sayings.get('fox'); // undefined
    //sayings.has('bird'); // false
    //sayings.delete('dog');
    //sayings.has('dog'); // false
    
    //for (var [key, value] of sayings) {
    //  console.log(key + ' goes ' + value);
    //}
    // "cat goes meow"
    // "elephant goes toot"

    //sayings.clear();
    //sayings.size; // 0

    console.log(this.showProps(obj, 'myObj'));
    
    
    //JSON
    console.log(JSON.stringify(arrOfObj));
    
    

  }

  showProps(obj: any, objName:string) {
  var result = '';
  for (var i in obj) {
    // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
    if (obj.hasOwnProperty(i)) { //
      result += objName + '.' + i + ' = ' + obj[i] + '\n';
    }

  }
  return result;
}


  GetInputVariations(input: string[]) {
    let temp = "";
    input = ['a','b','c','d','e']
    let result = [];
    
    for (var i = 0; i <input.length; i++) {
      for (var x = 0; x <input.length; x++) {
        let tempArr = input.slice(0, input.length );

        temp = tempArr[x]; // current letter
        tempArr[x] = tempArr[i];
        tempArr[i] = temp;

        //if (result.indexOf(tempArr.join() ) == -1 )
              result.push( tempArr.join());
      }
      
    }

    console.log(result);
  }

  GetMaxRepeatNumber(event) {


    this.numbers = new Array();
    const splits = [3,2,3,4,4,3,3];  //this.txtNumbers.nativeElement.value.split(",");
 
    splits.map(item => {
      this.numbers.push(item);
    });

    this._http.post<number[]>(this._baseURL + 'api/Algorithms/GetMostCommonNumber', this.numbers).subscribe(
      result => {
        this.maxNumber.number = result[0];
        this.maxNumber.rank = result[1];
      //  this.maxNumber.tempString = someString;
      }, error => {
        console.error(error);
      }
    );
  }

  GetMaxSequence() {

    let occurance = new Array();
    
    const seq = [14,15,72,13,300,12,4000,55,432];
    let seed = seq[0]; 
    for (let i = 0; i < seq.length; i++)
      if (seq[i] <= seed)
        seed = seq[i];

    occurance.push(seed);

    for (let x = 0; x < seq.length; x++)
      for (let y = 0; y< seq.length; y++)  
      if (seq[y]- occurance[occurance.length-1]  == 1)
          occurance.push(seq[y]);

    return occurance.join(",");
  }

  ValidateCodeSegment() {

    let openPrackets = new Array();
    this.codeSegmentValid = true;
    
    // check for curly pracket
      // add open pracket to list
      // when clost pracket found, remove the last open pracket
    if (this.codeSegment) {
      for (let i = 0; i < this.codeSegment.length; i++) {
        if (this.codeSegment[i] == "{") {
          openPrackets.push("{");

        }
        else if (this.codeSegment[i] == "}") {
          if (openPrackets.pop() == undefined)
            this.codeSegmentValid = false;
        }
                 
      }
      this.codeSegmentValid = openPrackets.length == 0 && this.codeSegmentValid != false;
    }

  }

  ReverseArrayInPlace() {
    let arr = [1, 2, 3, 4, 5, 6, 7];
    let temp = 0;
    for (let i = 0, x = arr.length - 1; i < arr.length; i++ , x--) {
      temp = arr[i];
      arr[i] = arr[x];
      arr[x] = temp;
    }

    return arr.join(",");
  }

}

///Types
interface MaxNumber {
  number: number,
  rank: number,
  tempString: string,
}
///Types
