import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AddressCt } from './Components/AddressCt';
import { AlgorithmsComponent } from './Components/Algorithms';
import { RegisterCustomerCt } from './Components/RegisterCustomerCt';
import { CommonService } from './Services/CommonService';
import { CustomerService } from './Services/CustomerService';
import { NoNumbersAllawedValidator, EmailExistsValidator, LoaderChecker } from './Validators/Validators';
import { htmlPractice } from './Components/HTMLPractice';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CustomerList } from './Components/CustomerList';
import { PageNotFoundComponent } from './Components/PageNotFoundComponent';
import { TodoCt } from './Components/ToDo';
import { XOCt} from './Components/XO';


@NgModule({
  declarations: [
    XOCt,
    TodoCt,
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AddressCt,
    AlgorithmsComponent,
    RegisterCustomerCt,
    NoNumbersAllawedValidator,
    EmailExistsValidator,
    LoaderChecker,
    htmlPractice,
    CustomerList,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }), // ToastrModule added
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'Register-Customer', component: RegisterCustomerCt, pathMatch: 'full' },
      { path: 'Register-Customer/:id', component: RegisterCustomerCt, pathMatch: 'full' },
      { path: 'algorithms', component: AlgorithmsComponent, pathMatch: 'prefix' },
      { path: 'htmlPractice', component: htmlPractice, pathMatch: 'full' },
      { path: 'CustomerList', component: CustomerList, pathMatch: 'full' },
     
      { path: '**', component: PageNotFoundComponent }
    ])

  ],
  providers: [LoaderChecker, CommonService, CustomerService, NoNumbersAllawedValidator, EmailExistsValidator],  //
  bootstrap: [AppComponent]
})
export class AppModule { }
