export class LoginData{


    private emailaddress : string;

    public getEmailAddress(){
        return this.emailaddress;
    }

    public setEmailAddress(value : string){
         this.emailaddress = value;
    }

    private password : string;

    public getPassword(){
        return this.password;
    }

    public setPassword(value : string){
         this.password = value;
    }
}