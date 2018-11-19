import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { error } from 'util';

@Component({
  selector: 'menu-item',
  templateUrl: './MenuItems.html'
})

export class MenuItemsComponent {

  //members
  menuItems: MenuItem[];
  _http: HttpClient;
  _baseURL: string;

  constructor(ajax: HttpClient) {
    this._http = ajax;
    this._baseURL = '';
    

  }

  ngOnInit() {
    this._http.get<MenuItem[]>(this._baseURL + 'api/MenuItems/get').subscribe(result => {
      this.menuItems = result;
    }, error => console.error(error)); 
    
  }
  
}

interface MenuItem {
  id: number,
  name: string,
  description: string,
  price: number
  category : string 
}




