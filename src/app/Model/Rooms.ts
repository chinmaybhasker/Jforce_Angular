export class Room{


    private roomNumber: number;
    public getroomNumber(): number {
        return this.roomNumber;
    }
    public setroomNumber(value: number) {
        this.roomNumber = value;
    }

    private floorNumber: number;
    public getfloorNumber(): number {
        return this.floorNumber;
    }
    public setfloorNumber(value: number) {
        this.floorNumber = value;
    }

    private bookingStatus: String;
    public getbookingStatus(): String {
        return this.bookingStatus;
    }
    public setbookingStatus(value: String) {
        this.bookingStatus = value;
    }

    private bookingFlag: boolean;
    public getbookingFlag(): boolean {
        return this.bookingFlag;
    }
    public setbookingFlag(value: boolean) {
        this.bookingFlag = value;
    }
}