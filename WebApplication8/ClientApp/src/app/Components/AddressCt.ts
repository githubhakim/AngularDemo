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
  selector: 'Address',
  templateUrl: './Address.html',
  
  
})
export class AddressCt {

  // fields
  @ViewChild('addressForm') form: NgForm;
  regions: model.Lookup[];
  selectedRegin: model.Lookup;
  @Input() customer: model.Customer;
  @Input() submitted: boolean;
 // subscription: Subscription;

  address: model.Address;
  eventEmitter: EventEmitter<number>;
  

  constructor(private commonService: CommonService,  private http: HttpClient, private customerService: CustomerService) { 
    this.address = new model.Address();
    this.eventEmitter = new EventEmitter<number>();

   
  }

  onChange() {
    
    this.eventEmitter.emit(1);
    
  }

  onChangeServiceMessage() {
    this.commonService.setKey(2, 3);
  }

  ngOnInit() {

    this.commonService.getData().subscribe(value => {
      console.log('message is received in  address component as : ' + value.join(','));
      
    });


    if (!this.customer.regionId)
        this.customer.regionId = null;
    // load lookups
    this.customerService.GetLookup("LookupRegion").toPromise().then(result => {

      

      this.regions = <Lookup[]>result;
      this.customerService.isLoading$.next(false);

    },
      error => {
        alert('errored');
      });

  }

  onSelectRegion(region) {
    this.selectedRegin = region;
  }


  

}
