import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { settings } from 'cluster';


@Injectable()
export class CommonService {
  keys: number[] = [4, 5, 1, 3, 2];
  private data: BehaviorSubject<number[]> = new BehaviorSubject(this.keys);

  constructor() {
    
  };

  

  public setKey(i: number, val: number): void {
    this.keys[i] = val;
    this.data.next( [...this.keys]);
  }
  public getData(): Observable<number[]> {
    return this.data.asObservable();
  }
  public getKeys(): number[] {
    return this.keys;
  }
}
