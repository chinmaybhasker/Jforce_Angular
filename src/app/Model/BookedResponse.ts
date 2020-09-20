export class BookedResponse{

    private fromDate: Date;

    private toDate: Date;

    private roomsNumber: Array<number>;

    private userMailId: String;

    public getuserMailId(): String {
        return this.userMailId;
    }
    public setuserMailId(value: String) {
        this.userMailId = value;
    }

    
    public getroomsNumber(): Array<number> {
        return this.roomsNumber;
    }
    public setroomsNumber(value: Array<number>) {
        this.roomsNumber = value;
    }

    public gettoDate(): Date {
        return this.toDate;
    }
    public settoDate(value: Date) {
        this.toDate = value;
    }
    public getfromDate(): Date {
        return this.fromDate;
    }
    public setfromDate(value: Date) {
        this.fromDate = value;
    }


}