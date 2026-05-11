import { Component } from '@angular/core';
import { IRooms } from './irooms';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss',
})
export class Rooms {
  hotelName = 'Hotel Test App';
  numberOfRooms = 50;
  hideRooms = false;

  rooms : IRooms = {
    totalRooms: 20,
    avaibleRooms: 10,
    bookRooms: 5  
  };

    //totalRooms: 20,
    //avaibleRooms: 10,
    //bookRooms: 5

  toggle() {
    this.hideRooms = !this.hideRooms;
  }
}
