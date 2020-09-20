import { Component, OnInit } from '@angular/core';
import { on } from 'process';
import { BookedResponse } from '../Model/BookedResponse';
import { Room } from '../Model/Rooms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.css']
})
export class BookRoomComponent implements OnInit {

  RoomsList : Array<Room> = []
  roomObj : Room ;
  errormsg : any;
  constructor(private service : ServiceService) { }

  ngOnInit(): void {
  }

  fromDate : any;
  toDate : any;

  Submit(){
    this.RoomsList = [];
    console.log(new Date(this.fromDate));
    if ( (this.fromDate == undefined || this.toDate == undefined) || (new Date(this.fromDate)) > (new Date(this.toDate)) ){
      this.errormsg = "Please Select Valid Date"
      this.isChecked = true;
    }
    else{
      this.service.getRoomsDetail(this.fromDate,this.toDate).subscribe(data =>{
        let i = 0;
       while(data[i] != undefined){
          this.roomObj = new Room();
          this.roomObj.setfloorNumber(data[i]['floorNumber']);
          this.roomObj.setroomNumber(data[i]['roomNumber']);
          this.roomObj.setbookingStatus(data[i]['availableStatus']);
          if (data[i]['availableStatus'] === 'Available'){
            this.roomObj.setbookingFlag(false);
          }
          else{
            this.roomObj.setbookingFlag(true);
          }
          this.RoomsList.push(this.roomObj);
          i++;
       }
      })
      this.isChecked = false;
    }
  }
  isChecked : any = false;
  RoomNumberList : Array<number> = [];
  checkCheckBoxvalue(value : any,$event){
    
    if ( $event.target.checked == true){
      this.RoomNumberList.push(value);
      console.log(this.RoomNumberList);
    }
    else{
      this.RoomNumberList.splice(this.RoomNumberList.indexOf(value),1);
    }
  }
  loginFlag: boolean = false;
  SendResponse(){
    if (localStorage.getItem('userName') != undefined){
        console.log(this.RoomNumberList);
        let obj = new BookedResponse();
        obj.setfromDate(this.fromDate);
        obj.settoDate(this.toDate);
        obj.setroomsNumber(this.RoomNumberList);
        obj.setuserMailId(localStorage.getItem('userName'));
        this.service.sendRoomBookingResponse(obj).subscribe();
    }
    else{
      this.loginFlag = true;
      this.errormsg = "Only Logged in user can book room"
    }
  }

}
