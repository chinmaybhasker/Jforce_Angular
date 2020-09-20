import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { signUpdata } from '../Model/signUpdata';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  flag : boolean = false;
  message : string;
  signUpForm: FormGroup;
  signUpObject : any;
  total : number;
  signUp : signUpdata;
  constructor(private formBuilder: FormBuilder, private service : ServiceService,private route : Router) { }
 
  ngOnInit() {
      this.signUpForm = this.formBuilder.group({
      firstName: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(15),
      Validators.pattern('[a-zA-Z]*')]),

      lastName: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(15),
        Validators.pattern('[a-zA-Z]*')]),

      emailaddress: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(30),
        Validators.email]),
        
      password: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(15)
      ]),
    });
    
    
    // this.service.getSignUpdata().subscribe(data =>{
    //   debugger;
    //   this.signUpObject = data.response;
    //   console.log("I am here :: " + this.signUpObject.length);
    //   this.total = this.signUpObject.length;
    //   this.onSubmit();
    // });
  }
  
  onSubmit(){
    debugger;
    this.signUp = new signUpdata();
    if (this.signUpForm.getRawValue().firstName === '') {
      this.signUp.setfirstname(null);
    }
    else {
      this.signUp.setfirstname(this.signUpForm.getRawValue().firstName);
    }
    this.signUp.setlastName(this.signUpForm.getRawValue().lastName);
    if (this.signUpForm.getRawValue().password === '') {
      this.signUp.setpassword(null);
    }
    else {
      this.signUp.setpassword(this.signUpForm.getRawValue().password);
    }
    if (this.signUpForm.getRawValue().emailaddress === '') {
      this.signUp.setuserName(null);
    }
    else {
      this.signUp.setuserName(this.signUpForm.getRawValue().emailaddress);
    }
    this.service.postSignUpdata(this.signUp).subscribe(data =>{
      if (data == 'OK'){
        this.flag = true;
        this.message = "Sign Up is Successfull";
      }
      if (data == 'BAD_REQUEST'){
        this.flag = true;
        this.message = "Sign Up is failed";
      }
      setTimeout( () => { this.route.navigate(['login'])}, 3000 );
    });
    console.log("vbwvbwbviwbviwvbiwov");
    // for(let i=0;i<this.total;i++){
    //   console.log(this.signUpObject[i].password);
    // }
  }


  

  

}
