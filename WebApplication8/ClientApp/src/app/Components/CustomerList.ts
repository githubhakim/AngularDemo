import { Component, Inject, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { error } from 'util';
import {NgForm, AbstractControl } from '@angular/forms';
import { CustomerService } from '../Services/CustomerService';
import * as model from '../model/model';

import { Lookup, Customer } from '../model/model';
import { validateConfig } from '@angular/router/src/config';
import { CommonService } from '../Services/CommonService';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { lookup } from 'dns';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { Event } from '_debugger';

@Component({
  selector: 'CustomerList',
  templateUrl: './CustomerList.html',
  
  
})
export class CustomerList {

  // fields
  customerList: Customer[];
  filteredList: Customer[];
  searchInput: string = "";
  showFilterResult: boolean = false;
  sortDirection: string = 'asc';
  currentSortColumn: string = 'first-name';
  constructor(private toastrService: ToastrService,  private router: Router, private commonService: CommonService, private customerService: CustomerService) { 
    

  }


  onClear() {
 
    this.searchInput = "";
    
  }


  onSelectFilter(event: any) {

    
    event.cancelBubble = true;
    this.showFilterResult  = false;
    this.searchInput = event.target.innerText;
    this.customerList = this.filteredList;
    
  }

  onSort(column: string, initialSort?: boolean) {

    
    if (initialSort == false || initialSort == undefined) {
      if (column === this.currentSortColumn) // change direction when
      {
        this.sortDirection = (this.sortDirection == 'asc') ? 'desc' : 'asc';
      }
      else
      {
        this.currentSortColumn = column;
        this.sortDirection = 'asc';
      }
    }

    this.customerList.sort((a, b) => {
   
      if (this.sortDirection == 'asc') {
        if (column == 'last-name')
          return (a.lastName > b.lastName) ? 1 : -1;
        else if (column == 'phone')
          return a.phone > b.phone ? 1 : -1;
        else if (column == 'email')
          return  a.email > b.email ? 1 : -1 ;
        else if (column == 'birth-date')
          return a.birthDate > b.birthDate ? 1 : -1;
        else
          return a.firstName > b.firstName? 1 : -1;
      }
      else {
        if (column == 'last-name')
          return  a.lastName < b.lastName ? 1 : -1;
        else if (column == 'phone')
          return  a.phone < b.phone ? 1 : -1;
        else if (column == 'email')
          return  a.email < b.email ? 1 : -1;
        else if (column == 'birth-date')
          return a.birthDate < b.birthDate ? 1 : -1;
        else
          return a.firstName < b.firstName ? 1 : -1;
      }

      
     

    });
  }

  onSearch() {

    this.customerService.Search(this.searchInput).subscribe(result => {

      this.showFilterResult = true;
      this.filteredList = result;
      this.toastrService.success("seatch complete");
      this.customerService.isLoading$.next(false);
    }
      , error => {
        this.customerService.isLoading$.next(false);
        this.toastrService.error("an error occurred.");
      });

  }

  ngOnInit() {

    $(document).click(() => {
      
      this.showFilterResult  = false;
    });

 
    this.onLoad();
  }

  onLoad() {
    this.customerService.GetAll().subscribe(result => {
      this.customerService.isLoading$.next(false);
      this.customerList = result;
      this.onSort('first-name', true);
    }, error => {
      this.toastrService.error('an error occured');
    });
  }

  onAdd() {
    this.router.navigate(['Register-Customer']);
  }


  

}
