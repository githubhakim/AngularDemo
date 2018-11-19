import { Directive, forwardRef, Attribute, Input, HostListener, HostBinding, ElementRef, } from '@angular/core';
import {    NG_VALIDATORS, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidator, Validator, FormControl, NgControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { debounce } from 'rxjs/operator/debounce';
import { Observable} from "rxjs/Observable";
import { CustomerService} from '../Services/CustomerService';
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';
import { debug } from 'util';

import { map} from 'rxjs/operators';
import { validateConfig } from '@angular/router/src/config';
 
@Directive({
  selector: '[EmailExistsValidator]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: EmailExistsValidator, multi:true }]
})


export class EmailExistsValidator implements AsyncValidator {

  @Input('isEdit') public isEdit: boolean;
  constructor(private customerService: CustomerService) {

  }

  validate(c: AbstractControl): any { //  Promise<ValidationErrors | null> | Observable<ValidationErrors | null> 

    
    if (!c.value || c.value == "" || this.isEdit) {
      
      return Observable.of(false).pipe(
        map(result => { return null; } )
      );
    }
    
    return this.customerService.CheckEmailExists(c.value).pipe(map(value => {
      
      this.customerService.isLoading$.next(false);
      return (value) ? { 'EmailExistsValidator': true } : null;
    }));
  }
  
}


@Directive({
  selector: '[loader-checker]'
})

export class LoaderChecker {
  constructor(element: ElementRef, private customerService: CustomerService) {
    
    this.customerService.isLoading$.subscribe(value => {
      
      element.nativeElement.style.display = (value) ? 'block' : 'none';
    });
    
  }
}


@Directive({
  selector: '[NoNumbersAllawedValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: NoNumbersAllawedValidator , multi: true } // forwardRef(() => emailValidator) 
  ],
  host: {
    

  }
})
export class NoNumbersAllawedValidator implements Validator {

  
  @Input('email') public email: string;

  constructor(private http: HttpClient) {
    
 
  }

  //@HostBinding('class.card-outline-primary') private ishovering: boolean;


  //@HostListener('blur') popup() {
  //  //alert('pop up listner');
  //}

  validate(c: FormControl) {
    
    let returnValue: { [key: string]: true } = {};

    if (c.value == null || c.value== "")
      return null;

    const matchs = c.value.match(/[1-9]+/);
    if (matchs != null)
      return { 'NoNumbersAllawedValidator': true }; // returnValue['NoNumbersAllawedValidator'] = true;
    else
      return null;
   
    

  }

}




@Directive({
  selector: '[validate-onblur]',
  host: {
    '(focus)': 'onFocus($event)',
    '(blur)': 'onBlur($event)'
  }
})
export class ValidateOnBlurDirective {
  constructor(public formControl: NgControl) {
  }

  onFocus($event) {
    this.formControl.control.markAsUntouched({ onlySelf: false });
  }

  onBlur($event) {
    this.formControl.control.markAsTouched({ onlySelf: true });
  }
}

