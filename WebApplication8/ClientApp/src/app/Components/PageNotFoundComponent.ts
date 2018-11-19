import { Component, Inject, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { error } from 'util';
import {NgForm } from '@angular/forms';
import { CustomerService } from '../Services/CustomerService';
import * as model from '../model/model';

import { Lookup } from '../model/model';
import { validateConfig } from '@angular/router/src/config';
import { CommonService } from '../Services/CommonService';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { lookup } from 'dns';

@Component({
  selector: 'PageNotFoundComponent',
  templateUrl: './PageNotFoundComponent.html',
  
  
})
export class PageNotFoundComponent {

 
  constructor(private commonService: CommonService,  private http: HttpClient, private customerService: CustomerService) { 
 

   
  }

  

}
