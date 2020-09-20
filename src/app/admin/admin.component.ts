import { Component, OnInit } from '@angular/core';
import { Room } from '../Model/Rooms';
import { ServiceService } from '../service.service';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service : ServiceService ) { }
  floorNumber : any;
  increasedRoomCapacity : any;
  increasedFloorValue : any;
  fromDate : any;
  toDate : any;
  RoomsList : Array<Room> = []
  roomObj : Room ;
  isChecked : any = false;
  errormsg : any;
  loginFlag: boolean = false;

  ngOnInit(): void {
    this.service.getDetailsOfHotel().subscribe(data=>{
      console.log(data['FloorNumber']);
      this.floorNumber = data['FloorNumber'];
    });
  }

  submit(){
    let reponse = {"floorNumber" : this.increasedFloorValue, "roomCapacity" : this.increasedRoomCapacity};
    this.service.postResponse(reponse).subscribe();
  }

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
       this.exportexcel();
      })
      this.isChecked = false;
    }
  }


  fileName= 'ExcelSheet.xlsx';  

exportexcel(): void 
    {
       /* table id is passed over here */   
      //  let element = document.getElementById('excel-table'); 
      //  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
      //  /* generate workbook and add the worksheet */
      //  const wb: XLSX.WorkBook = XLSX.utils.book_new();
      //  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      //  /* save to file */
      //  XLSX.writeFile(wb, this.fileName);

      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.RoomsList);
      console.log('worksheet',worksheet);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      this.saveAsExcelFile(excelBuffer, 'sample');
    }
  
    private saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
  
			
    }


