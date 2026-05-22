import { Component } from '@angular/core';
import { IRooms, IRoomList } from './irooms';

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

  roomList: IRoomList[] = [
    {
      roomNumber: 101,
      roomType: 'Deluxe',
      amenities: 'WiFi, TV, Air Conditioning',
      price: 150,
      photos: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      checkinTime: new Date(),
      checkoutTime: new Date()
    },
    {
      roomNumber: 102,
      roomType: 'Standard',
      amenities: 'WiFi, TV',
      price: 100,
      photos: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      checkinTime: new Date(),
      checkoutTime: new Date()
    },
    {
      roomNumber: 103,
      roomType: 'Suite',
      amenities: 'WiFi, TV, Air Conditioning, Jacuzzi, Mini Bar',
      price: 300,
      photos: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      checkinTime: new Date(),
      checkoutTime: new Date()
    },
    {
      roomNumber: 104,
      roomType: 'Economy',
      amenities: 'WiFi',
      price: 60,
      photos: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      checkinTime: new Date(),
      checkoutTime: new Date()
    }
  ];

  toggle() {
    this.hideRooms = !this.hideRooms;
  }
}
