import { Component, Inject, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
import { window } from 'rxjs/operator/window';
import { Event } from '@angular/router';

@Component({
  selector: 'htmlPractice',
  templateUrl: './HTMLPractice.html'
  
})
export class htmlPractice {

  // fields
  modal: HTMLElement;
  openBtn: HTMLElement;
  closeSpan: HTMLElement;
  modalStatus: any = { 'display': 'none' };
  constructor(private commonService: CommonService,  private http: HttpClient, private customerService: CustomerService) { 
    
  }

  

  onChangeServiceMessage() {

  }

  ngOnInit() {


    this.modal = document.getElementById('myModal');
    this.openBtn = document.getElementById('btnOpenModal');
    this.closeSpan = document.getElementById('btnCloseModal');

    this.openBtn.onclick = () => {
    
      this.modalStatus = {'display':'block'} ;
    }

    this.closeSpan.onclick = () => {
      this.modalStatus = { 'display': 'none' };

    }

    document.onclick = (event  ) => {
      //if (event.target == this.modal)
     //   this.modalStatus = { 'display': 'none' };
    }

  }







  

}
