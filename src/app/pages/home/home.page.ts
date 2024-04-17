import { Component, OnInit, AfterContentInit, Input, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet,Router,RouterModule } from '@angular/router';
import { DxButtonModule,DxDataGridModule } from 'devextreme-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, DxButtonModule, RouterModule,DxDataGridModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage  {
  constructor(private router: Router, private cdr: ChangeDetectorRef) {
  }
 
  gotoSomePractice(): void {

    this.router.navigate(['practice']);

  }
  alertYou(): void {
    alert("you. lol");
  }

  friends : any =
  [
    {
      "id": 0,
      "name": "Saunders Howard",
      "email": "saundershoward@ultrimax.com",
      "contact": "(803) 422-2915"
    },
    {
      "id": 1,
      "name": "Lucille Landry",
      "email": "lucillelandry@ultrimax.com",
      "contact": "(812) 468-3993"
    },
    {
      "id": 2,
      "name": "Hopkins Wade",
      "email": "hopkinswade@ultrimax.com",
      "contact": "(995) 598-3365"
    },
    {
      "id": 3,
      "name": "Shirley Massey",
      "email": "shirleymassey@ultrimax.com",
      "contact": "(838) 574-3889"
    },
    {
      "id": 4,
      "name": "Elizabeth Shields",
      "email": "elizabethshields@ultrimax.com",
      "contact": "(976) 400-3558"
    },
    {
      "id": 5,
      "name": "Buckley Blackburn",
      "email": "buckleyblackburn@ultrimax.com",
      "contact": "(859) 513-2513"
    },
    {
      "id": 6,
      "name": "Kirby Burns",
      "email": "kirbyburns@ultrimax.com",
      "contact": "(989) 558-2511"
    },
    {
      "id": 7,
      "name": "Jacobson West",
      "email": "jacobsonwest@ultrimax.com",
      "contact": "(822) 484-2988"
    },
    {
      "id": 8,
      "name": "Daugherty Bullock",
      "email": "daughertybullock@ultrimax.com",
      "contact": "(915) 496-2051"
    },
    {
      "id": 9,
      "name": "Leach Morton",
      "email": "leachmorton@ultrimax.com",
      "contact": "(809) 417-2533"
    }
    ]

    onRowUpdating(event:any): void{
      const {oldData, newData} = event;
      const updateFriends = this.friends.map((friend:any) =>{
        if (friend.id === oldData.id){
          return {...friend, ...newData};
        }
        return friend
      });
      this.friends = updateFriends;
      console.log(this.friends);

      this.cdr.detectChanges();
  
      }

    saveData():void{
      const myjson = JSON.stringify(this.friends);
      localStorage.setItem(myjson,this.friends);
      console.log(myjson);
      console.log(this.friends);

    }
    
   

  
      
    }