import { Component, DoCheck, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,DoCheck {

  constructor() { }
  loginFlag : boolean = true;
  ngDoCheck(): void {
   if( localStorage.getItem('AdminUser') === "true"){
     this.adminFlag = true;
   }
   else{
     this.adminFlag = false;
   }
   if(localStorage.getItem('userName') != undefined){
        this.loginFlag = false
   }
  }
  user : any;
  status : boolean = false;
  adminFlag : boolean = false;
  ngOnInit(): void {
  }

  login() { 
  //   this.loginServiceService.login();
  //   localStorage.setItem('LogedinUser',this.user);
  //   this.status = true;
  //  console.log("I am here !!!!!!!!!!!!!!!!!!" + this.status);
  }

  logout(){
   localStorage.removeItem('userName');
   localStorage.removeItem('Name');
   localStorage.removeItem('AdminUser');
   this.loginFlag = true;
  }

}
