export class signUpdata {

    
    private firstname: string;
    public getfirstname(): string {
        return this.firstname;
    }
    public setfirstname(value: string) {
        this.firstname = value;
    }
    private lastName: string;
    public getlastName(): string {
        return this.lastName;
    }
    public setlastName(value: string) {
        this.lastName = value;
    }
    private userName: string;
    public getuserName(): string {
        return this.userName;
    }
    public setuserName(value: string) {
        this.userName = value;
    }
    private password: string;
    public getpassword(): string {
        return this.password;
    }
    public setpassword(value: string) {
        this.password = value;
    }
    
}
