import { AfterViewInit, Component, NgModule, ViewChild, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { error, debug } from 'util';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { CustomerService } from '../Services/CustomerService';
import { Router, Params, ActivatedRoute} from '@angular/router';
import * as  model from '../model/model';
import { CommonService } from '../Services/CommonService';
import { validateConfig } from '@angular/router/src/config';
import { AddressCt } from './AddressCt';

import { Observable , BehaviorSubject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';
import { setTimeout } from 'timers';
import * as $ from 'jquery';



@Component({
  selector: 'Register-Customer',
  templateUrl: './RegisterCustomer.html',

 
})
export class RegisterCustomerCt {

  // fields
  
  customer: model.Customer;
  @ViewChild('form') form: NgForm;
  customerId: number;
  isEdit = false;
  color = 'red';
  successMessage: {};
  errorMessage: {};
  isLoading: boolean;

  subscription: Subscription;
  @ViewChild(AddressCt) addressCt;
  
  constructor(private toastrService : ToastrService, private commonService: CommonService , private activatedRoute: ActivatedRoute, private http: HttpClient, private customerService: CustomerService
    , private router: Router) {
    
    this.customer = new model.Customer();
    this.successMessage = { visibility: 'none', message: '' };
    this.errorMessage = { visibility: 'none', message: '' };
  }

  //child event 
  ngAfterViewInit() {

    


    this.addressCt.eventEmitter.subscribe(value => alert(value));
  }

  
  
  onChangeServiceMessage() {
    this.commonService.setKey(1,33);
  }

  delete() {
    if (this.customer) {
      this.customerService.Delete(this.customer).subscribe(result => {
        this.toastrService.success('customer deleted successfully');
        this.customerService.isLoading$.next(false);
        this.router.navigate(['CustomerList']);

      }, error => {
        this.customerService.isLoading$.next(false);
        this.toastrService.error('error loading customer details ');
      });
    }

    
  }

  confirmDelete() {
   $('#divConfirmDelete').modal('show');
  }

  ngOnInit() {


    
    
    
    this.customerService.isLoading$.subscribe(value => {
      this.isLoading = value;
    });
    
    this.subscription = this.commonService.getData().subscribe(value => {
      console.log('message is received in  customer component as : ' + value.join(','));
    });

    
    
    this.activatedRoute.params.subscribe(params => {
      
      if (params['id']) {
        this.customerId = params['id'];
        
        // load customer
        this.customerService.Get(this.customerId).subscribe(result => {
          this.customerService.isLoading$.next(false);
          this.customer = result;
          if (this.customer)
            this.isEdit = true;
          
        }, error =>  {
          this.customerService.isLoading$.next(false);
          this.toastrService.error('error loading customer details ');
        });
      }
    });
    
  }

  

  setAddress(customer: model.Customer) {

    if (this.addressCt) {
      this.customer.address = this.addressCt.customer.address;
      this.customer.postalCode = this.addressCt.customer.postalCode;
      this.customer.regionId = this.addressCt.customer.regionId;
      this.customer.addressNumber = this.addressCt.customer.addressNumber;
    }
    
  }

  
  onSubmit() {
 
    if (this.form.valid && this.addressCt.form.valid) {
      this.setAddress(this.customer);

      if (this.isEdit)
        this.customerService.Edit(this.customer).subscribe(result => {
          this.customerService.isLoading$.next(false);
          this.toastrService.success('customer has been updated');
          this.router.navigate(['CustomerList']);
        

        }, error => {

          this.customerService.isLoading$.next(false);
          this.toastrService.error('an error has occured');
          
        });
      else
        this.customerService.Add(this.customer).subscribe(result => {
          this.customerService.isLoading$.next(false);
          this.toastrService.success('customer has been updated');
          this.router.navigate(['CustomerList']);
          
        }, error => {
          this.customerService.isLoading$.next(false);
          this.toastrService.error('an error has occured');
          
        });
    }
   

    

  }


}
