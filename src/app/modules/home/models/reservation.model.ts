export interface Reservation {
  id: string;
  username: string;
  email: string;
  selectDate: Date;
  selectTime: number;
  phone: number;
  price: number;
  selectService: String;
  photoUrl: string;
  creation_dt: Date;
}
