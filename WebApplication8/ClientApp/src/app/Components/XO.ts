import { Component, Inject, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { error, debug } from 'util';
import {NgForm } from '@angular/forms';
import { CustomerService } from '../Services/CustomerService';
import * as model from '../model/model';

import { Lookup } from '../model/model';
import { validateConfig } from '@angular/router/src/config';
import { CommonService } from '../Services/CommonService';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { lookup } from 'dns';
import { rootRenderNodes } from '@angular/core/src/view';


class Coordinates {
  X: number = 0;
  Y: number = 0;


}
@Component({
  selector: 'XO',
  templateUrl: './XO.html',
  
  
})
export class XOCt {

  board: string[][] = [];

  currentPlayer: string = 'O';
  currentCount: number = 0;
  size: number = 3;

  winner: string = "";
  MaxMovesReached: boolean = false;

  constructor() { 
    this.intialize();  
  }

  intialize() {
    this.currentPlayer = 'O';
    
    this.currentCount = 0;
    
    this.winner = "";

 
    // initialize board
    
    for (let row = 0; row < this.size; row++) {
      
      this.board[row] = [];
      for (let col = 0; col < this.size; col++)
        this.board[row][col] = "-";
    }
    
  }
  Move(col: number, row: number) {

   
    if (this.board[row][col] != 'X' && this.board[row][col] != 'O') {

      
        this.currentPlayer = (this.currentPlayer == 'X')?   'O' : 'X'; 

        this.board[row][col] = this.currentPlayer; // set current cell 
        this.currentCount += 1;  // increase step count 

        
        // check if columns are matching for current player
        this.CheckWinner(col, row, 'h');

        //check if rows are matching for current player
        this.CheckWinner(col, row, 'v');

        //check if diagonal is matching for current player
        if (col == row) // if diag case
        {
          this.CheckWinner(col, row, 'd');
        }

      if (Math.pow(this.size, 2) - 1 == this.currentCount)  // if number of mazimum moves reached finish the game
          this.MaxMovesReached = true;
        
      
    
    }
    else { // move the selected item to the next hilighted place 

    }

    // check for a winner
    
      

  }


  CheckWinner(col:number , row: number , direction: string) {
    for (var i = 0; i < this.size; i++) {
      if (direction == 'h') //  horizontal
      {
        if (this.board[row][i] != this.currentPlayer) // if all columns has the current plater value 
          break;
      }
      else if (direction == 'v') // vertical
      {
        if (this.board[i][col] != this.currentPlayer) // if all columns has the current plater value 
          break;
      }
      else // diagonal
      {
        if (this.board[i][i] != this.currentPlayer) // if all columns has the current plater value 
          break;
      }

      if (i == this.size - 1) // if last iteration, set the winnder
        this.winner = this.currentPlayer;
    }
  }
  

 

  ngOnInit() {
   

  }



  

}
