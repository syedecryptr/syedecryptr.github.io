var button = document.getElementById("inpsub");
var reset = document.getElementById("inpreset");
var truthtable = document.getElementById("truthtable");
var expression = document.getElementById("exp");
var reducedexpression = document.getElementById("reducedexpression");
var flag = 1;

reset.onclick = function() {resetfn()};

button.onclick = function() {calculator()};

Array.prototype.equals = function (array) 
 {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
 

 }

Array.prototype.onlyOnePresent = function()
 {
 	var noOfOnes = 0;
 	var indexOfOne;
 	for (var i = 0; i<this.length; i++ ){
 		if(this[i] == 1) {
 			noOfOnes++;
 			indexOfOne = i;
 		}

 	}
 	if(noOfOnes == 1){
 		return indexOfOne;
 	}
 	return -1;
 }

Array.prototype.checkAlreadyPresent = function (array)
 {
 	for(var i=0; i<this.length; i++){
 		if(this[i].equals(array) == true){   //prototype inside prototype :D
 			return true;
 		}
 	}
 		return false;
 }

Array.prototype.numberToCheckPresent = function(number)
 {
	for(var i=0 ; i<this.length; i++){
		if(this[i] == number){
			return true;
		}
	}
	return false;
 }//to mark one in result.

Array.prototype.Empty = function()
 {
	for(var i=0; i<this.length; i++){
		for(var j=0; j<this[i].length; j++){
			if(this[i][j] == 1){
				return false;
			}
		}
	}
	return true;
 }

function printBinaryArray(arrayToPrint, mintermArray, numberToCheck)
 {
		for(var i=0; i<arrayToPrint.length; i++)
		{
				truthtable.innerHTML += arrayToPrint[i];
				truthtable.innerHTML += "  |  " + "&nbsp;" ;
		}	
				truthtable.innerHTML += "" + "&nbsp;" ;
				if(mintermArray.numberToCheckPresent(numberToCheck)== true)
				{
					truthtable.innerHTML += 1;
				}
				else
				{
					truthtable.innerHTML += 0;
				}
				truthtable.innerHTML += "" + "<br />"
 }//print binary array and result by checking minterm Array.

function makeMintermArray(to, from)
 {
		var  temp = "";

		for(var i=0; i<from.length; i++)
		{
				if(from[i] == ' ' )
				{
					to.push(parseInt(temp));
					temp = "";
					continue;
				}
				
				temp += from[i];
		}
				to.push(parseInt(temp));

 }//create minterm array from expression //calculate minterm array from expression excluding spaces and converting string to int.

function calculateBinary(number, resultArray)
 {
	var quotient = number;
	var virtualLength = 0;
	var originalLength = resultArray.length;
	while(quotient!=0){
         resultArray[virtualLength++]= quotient % 2;
         quotient = parseInt( quotient / 2) ;
    }
    for(i=virtualLength; i<originalLength; i++){
    	resultArray[i] = 0;
    }
    resultArray.reverse();
 } // make binary array of any number

function compareOneMatch(array1, arrayNumber1, array2, arrayNumber2, result, tickArray)
 {
	var totalMismatching = 0;
	var indexOfMismatch;
	for(var i=0; i<array1.length; i++){
		if(array1[i] != array2[i]){
			totalMismatching++;
			indexOfMismatch = i;
		}
	}
	if(totalMismatching == 1){
		tickArray[arrayNumber1] = 0;
		tickArray[arrayNumber2] = 0;
		for(var i=0; i<array1.length; i++){
			if(i == indexOfMismatch) result.push(-1);
			else result.push(array1[i]);
		}
		return 1;
	}
	return 0;
 }

var arrayToStorePrimeImplicants = new Array();

var arrayToStoreEssentialImplicants = new Array();

var arrayToStoreMinSum = new Array();

var someThingHappened ;

function equalityCondition(arrayOfMinterms, index)
 {
 	for(var i = 0; i < arrayOfMinterms.length; i++){
 		if((arrayToStorePrimeImplicants[index][i]) != -1 ){
 			if(arrayOfMinterms[i] != arrayToStorePrimeImplicants[index][i]){
 				return false;
 			}
 		}
 	}
 	return true;
 }

function createImplicantTable(implicantTable, minterms)
 {
 	for(var i=0; i<minterms.length; i++){
 		implicantTable[i] = new Array(arrayToStorePrimeImplicants.length);
 	}
 	for(var i=0; i<minterms.length; i++){
 		for (var j = 0; j < arrayToStorePrimeImplicants.length; j++) {
 			if( equalityCondition(minterms[i], j) == true )
				implicantTable[i][j] = 1;
			else
				implicantTable[i][j] = 0;
 		}
 	}
 }

function findPrimeImpilcants(array)
 {

	var noMatch = 0;

	var resultArray = new Array(); //2D array containing dashes
	var elementArrayToInsertInResultArray = new Array();
	var counter = 0;
	var tickArray = new Array(array.length);
	for(var i=0; i<tickArray.length; i++) tickArray[i] = -1;
	for(var i=0; i<array.length-1; i++){
		for(var j = i; j<array.length; j++){
			if(compareOneMatch(array[i], i, array[j], j, elementArrayToInsertInResultArray, tickArray) == 1){
				noMatch++;
				resultArray[resultArray.length] = new Array();
				resultArray[resultArray.length-1] = elementArrayToInsertInResultArray.slice(0);  
				counter++;
				elementArrayToInsertInResultArray.length = 0;
			}
		}
	}
	
	for(var i=0; i<tickArray.length; i++){
		if(tickArray[i] == -1 && arrayToStorePrimeImplicants.checkAlreadyPresent(array[i]) == false){
			arrayToStorePrimeImplicants[arrayToStorePrimeImplicants.length] = new Array();
			arrayToStorePrimeImplicants[arrayToStorePrimeImplicants.length-1]  = array[i].slice(0);
		}
	}
	if(noMatch == 0) return;
	else findPrimeImpilcants(resultArray);   // hahahaa recursion beatch lv u ujjwal :D
 }

function printArrayToStorePrimeImplicants()
 {
		reducedexpression.innerHTML += "" + "<br />" + "<br />" + "<u>" + "Prime Implicants : " + "</u>" + "<br />" + "<br />";
		for (var i = 0; i < arrayToStorePrimeImplicants.length; i++) {
					var index = 65;
					for(var j = 0; j < arrayToStorePrimeImplicants[i].length; j++ ){
						if(arrayToStorePrimeImplicants[i][j] == 1)
							reducedexpression.innerHTML += String.fromCharCode(index+j);
						else if(arrayToStorePrimeImplicants[i][j] == 0)
							reducedexpression.innerHTML += String.fromCharCode(index+j) + "'";
					}
					reducedexpression.innerHTML +="" +  '&nbsp;'  +  '&nbsp;'  +  '&nbsp;'  ;
				}
 }

function printArrayToStoreEssentialImplicants()
 {
		reducedexpression.innerHTML += "" + "<br />" + "<br />" + "<u>" + "Essential Implicants : " + "</u>" + "<br />" + "<br />";
		for (var i = 0; i < arrayToStoreEssentialImplicants.length; i++) {
					var index = 65;
					for(var j = 0; j < arrayToStoreEssentialImplicants[i].length; j++ ){
						if(arrayToStoreEssentialImplicants[i][j] == 1)
							reducedexpression.innerHTML += String.fromCharCode(index+j);
						else if(arrayToStoreEssentialImplicants[i][j] == 0)
							reducedexpression.innerHTML += String.fromCharCode(index+j) + "'";
					}
					reducedexpression.innerHTML +="" +  '&nbsp;'  +  '&nbsp;'  +  '&nbsp;'  ;
				}
 }

function printArrayToStoreMinSum()
 {
 	reducedexpression.innerHTML += "" + "<br />" + "<br />" + "<u>" + "Min Expression : " + "</u>" + "<br />" + "<br />";
		for (var i = 0; i < arrayToStoreEssentialImplicants.length; i++) {
					var index = 65;
					for(var j = 0; j < arrayToStoreEssentialImplicants[i].length; j++ ){
						if(arrayToStoreEssentialImplicants[i][j] == 1)
							reducedexpression.innerHTML += String.fromCharCode(index+j);
						else if(arrayToStoreEssentialImplicants[i][j] == 0)
							reducedexpression.innerHTML += String.fromCharCode(index+j) + "'";
					}
					reducedexpression.innerHTML +="" +  '&nbsp;'  +  '&nbsp;'  +  '&nbsp;'  ;
				}
		for (var i = 0; i < arrayToStoreMinSum.length; i++) {
					var index = 65;
					for(var j = 0; j < arrayToStoreMinSum[i].length; j++ ){
						if(arrayToStoreMinSum[i][j] == 1)
							reducedexpression.innerHTML += String.fromCharCode(index+j);
						else if(arrayToStoreMinSum[i][j] == 0)
							reducedexpression.innerHTML += String.fromCharCode(index+j) + "'";
					}
					reducedexpression.innerHTML +="" +  '&nbsp;'  +  '&nbsp;'  +  '&nbsp;'  ;
				}
 }

Array.prototype.eliminateRow = function()
 {
 	for(var i=0; i<this.length; i++){
 		this[i] = -1; //eliminated
 	}
 }

Array.prototype.eliminateColumn = function(columnIndex)
 {
 	for(var i=0; i<this.length; i++){
 		if(this[i][columnIndex] == 1){
 			this[i].eliminateRow();
 		}
 		this[i][columnIndex] = -1; //eliminated
 	}
 }

function eliminateEssentialColumns(array)
 {

 	var columnToEliminate;
 	for(var i=0; i<array.length; i++){
 		if(array[i].onlyOnePresent() >= 0){
 			columnToEliminate = array[i].onlyOnePresent();
 			array.eliminateColumn(columnToEliminate);
 			someThingHappened = true;
 			arrayToStoreEssentialImplicants[arrayToStoreEssentialImplicants.length] = new Array();
			arrayToStoreEssentialImplicants[arrayToStoreEssentialImplicants.length-1]  = arrayToStorePrimeImplicants[columnToEliminate].slice();
 			
 		}
 	}
 }

Array.prototype.dominates = function(array)
 {	 var count = 0;
 	 var falseFlag = 0;
	for(var i=0; i<this.length; i++){
		if(this[i] == 1){
			count++;
			if(array[i] != this[i]){
				falseFlag = 1;
			}
		}
		if(falseFlag == 1 || count == 0) return false;
		return true;
 	}
 }

function deleteDominatingArray(array)
 {
 	for(var i=0; i<array.length; i++){
 		array[i] = -1;
 	}
 }

function eliminateDominatingRows(array)
 {

	for(var i=0; i<array.length; i++){
		for(var j=0; j<array.length; j++){
			if(i!=j){
				if(array[i].dominates(array[j]) == true){
					
					deleteDominatingArray(array[i]);
					someThingHappened = true;

				}
			}
		}	
	}

 }

function eliminateDominatedColumns(array)
 {

 		var count = 0, falseFlag = 0;
	for(var j=0; j<array[0].length; j++){
		for(var k =0; k<array[0].length; k++){
			if(j!=k){
				
				for(var i=0; i<array.length; i++){
					if(array[i][j] == 1){
						count++;
					if(array[i][j] != array[i][k]){
						falseFlag = 1;
					}
					}
				}
					if(falseFlag != 1 && count > 0) {
								
								someThingHappened	= true;

								for(var l=0; l<array.length; l++){
								array[l][j] = -1;
								}
					}
			}
			count = 0; falseFlag = 0;	
		}
	}

	
 }

function deleteRandomColumn(array)
 {
 	for(var i=0; i<array.length; i++){
 		for(var j=0; j<array[i].length; j++){
 			if(array[i][j] == 1){
 				array.eliminateColumn(j);
 				arrayToStoreMinSum[arrayToStoreMinSum.length] = new Array();
				arrayToStoreMinSum[arrayToStoreMinSum.length-1]  = arrayToStorePrimeImplicants[j].slice(0);
				return;
 			}
 		}
 	}

 }

function calculator() 
 {
		if(flag == 1){
			var expressionMinterm = expression.value;
			var variableCount =  parseInt( document.getElementById("variables").value );

			var mintermArray = new Array();
			//this will create minterm array from expression array.
			makeMintermArray(mintermArray, expressionMinterm);
			// truthtable.innerHTML += "ppp"+mintermArray+"ppp";
			var numberOfElementsInMintermArray  = mintermArray.length;

			truthtable.innerHTML += "" + "<br />" + "<br />" + "<u>" + "TRUTH TABLE" + "</u>" + "<br />" + "<br />";

			for (var i = 0; i < variableCount; i++) {
					truthtable.innerHTML += String.fromCharCode(65+i)+"  |  " + "&nbsp;";
				}

			truthtable.innerHTML += "RESULT"+ "<br />";

			var binaryArray = new Array(variableCount);
				for(var i=0; i<Math.pow(2, variableCount); i++){
			 	calculateBinary(i, binaryArray);
				printBinaryArray(binaryArray, mintermArray, i);
			}
			var minTermBinaryArray = new Array(numberOfElementsInMintermArray);  //this will create minterm binary arrays as 2D array for comparisons
			for(var i=0; i<numberOfElementsInMintermArray; i++){
				minTermBinaryArray[i] = new Array(variableCount);
				calculateBinary(mintermArray[i], minTermBinaryArray[i]);
			}
				
			findPrimeImpilcants(minTermBinaryArray);
			
			printArrayToStorePrimeImplicants();
			flag = 0;



			//-------------------------------implicants created now part 2-------------------------------------------------------------------------------//
			var implicantTable = new Array();

			createImplicantTable(implicantTable, minTermBinaryArray);

			  while(implicantTable.Empty() == false){

			  	someThingHappened = false;

				eliminateEssentialColumns(implicantTable);

				 if(implicantTable.Empty() == true) break;

				eliminateDominatingRows(implicantTable);     //eliminate unessential rows as one minterm having many 1's at different prime implicants,
														     // one that is less dominating also cover another dominated one.
				 if(implicantTable.Empty() == true) break;

				eliminateDominatedColumns(implicantTable); //eliminate redundant prime implicants
				
				 if(implicantTable.Empty() == true) break;

				if(someThingHappened == false && implicantTable.Empty() == false){

					deleteRandomColumn(implicantTable);

				}
				
			 }
				 printArrayToStoreEssentialImplicants();

				 printArrayToStoreMinSum();


		}
 }

function resetfn() 
 {
	truthtable.innerHTML = "";
	reducedexpression.innerHTML = "";
	flag = 1;
	arrayToStorePrimeImplicants.length = 0;
	arrayToStoreEssentialImplicants.length = 0;
	arrayToStoreMinSum.length = 0;
 }
