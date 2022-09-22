export class StorageLocation {
  id: number;
  city: string;
  latlng: number[];
  constructor(id, city, latlng) {
    this.id = id;
    this.city = city;
    this.latlng = latlng;
  }
}
