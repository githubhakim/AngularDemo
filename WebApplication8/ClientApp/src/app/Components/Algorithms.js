"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlgorithmsComponent = /** @class */ (function () {
    // Reference firstNameInput variable inside Component
    function AlgorithmsComponent(http, baseURL) {
        this.codeSegment = "";
        this.codeSegmentValid = false;
        this._http = http;
        this._baseURL = baseURL;
        this.maxNumber = { number: 0, rank: 0 };
        this.numbers = new Array();
    }
    AlgorithmsComponent.prototype.GetMaxRepeatNumber = function (event) {
        var _this = this;
        this.numbers = new Array();
        var splits = [4, 3, 4, 3, 3]; //this.txtNumbers.nativeElement.value.split(",");
        splits.map(function (item) {
            _this.numbers.push(item);
        });
        this._http.post(this._baseURL + 'api/Algorithms/GetMostCommonNumber', this.numbers).subscribe(function (result) {
            _this.maxNumber.number = result[0];
            _this.maxNumber.rank = result[1];
        }, function (error) { return console.error(error); });
    };
    AlgorithmsComponent.prototype.ValidateCodeSegment = function () {
        var openPrackets = new Array();
        this.codeSegmentValid = true;
        // check for curly pracket
        // add open pracket to list
        // when clost pracket found, remove the last open pracket
        if (this.codeSegment) {
            for (var i = 0; i < this.codeSegment.length; i++) {
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
    };
    AlgorithmsComponent.prototype.ReverseArrayInPlace = function () {
        var arr = [1, 2, 3, 4, 5, 6, 7];
        var temp = 0;
        for (var i = 0, x = arr.length - 1; i < arr.length; i++, x--) {
            temp = arr[i];
            arr[i] = arr[x];
            arr[x] = temp;
        }
        return arr.join(",");
    };
    return AlgorithmsComponent;
}());
exports.AlgorithmsComponent = AlgorithmsComponent;
///Types
//# sourceMappingURL=Algorithms.js.map