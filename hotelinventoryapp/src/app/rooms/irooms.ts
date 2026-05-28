export interface IRooms {
    totalRooms?: number;
    avaibleRooms?: number;
    bookRooms?: number;
}

export interface IRoomList {
    roomNumber: number;
    roomType: string;
    amenities: string;
    price: number;
    photos: string;
    checkinTime: Date;
    checkoutTime: Date;
    rating?: number;
}