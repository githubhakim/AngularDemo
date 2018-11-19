

import { HttpClient } from '@angular/common/http';
import * as Model from '../model/model';
import { Injectable } from '@angular/core';
import { NG_VALIDATORS, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidator, Validator, FormControl, NgControl } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import { validateConfig } from '@angular/router/src/config';
import { BehaviorSubject } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { debug } from 'util';

@Injectable()
export class CustomerService {

  // fields
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  baseURL :string = "http://localhost:63790/api/customer/";
  constructor(private _http: HttpClient) {
    
  }


  GetAll() {
    this.isLoading$.next(true);
    return this._http.get<Model.Customer[]>(this.baseURL + 'getAll');
  }


  Search(phrase : string) {
    this.isLoading$.next(true);
 
    return this._http.get<Model.Customer[]>(this.baseURL + 'find/' + phrase).debounceTime(1000);
  }

  CheckEmailExists(email: string) {
    
    this.isLoading$.next(true);
    return this._http.get('/api/customer/emailexists/' + email);

    
  }

  Get(id: number) {
    this.isLoading$.next(true);
    return this._http.get<Model.Customer>(this.baseURL + 'get/' + id);
  }

  Add(customer: Model.Customer) {
    this.isLoading$.next(true);
    return this._http.post(this.baseURL + 'add', customer);
  }

  Edit(customer: Model.Customer) {
    this.isLoading$.next(true);
    return this._http.post(this.baseURL + 'edit', customer);
  }

  Delete(customer: Model.Customer) {
    this.isLoading$.next(true);
    return  this._http.post(this.baseURL+'delete', customer);
  }

  GetLookup(lookupName: string) {
    
    this.isLoading$.next(true);
    return  this._http.get('http://localhost:63790/api/Lookup/getall/' + lookupName);
  }
}
