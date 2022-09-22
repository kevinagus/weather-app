export class StorageLocation {
  id: string;
  city: string;
  latlng: number[];
  constructor(id, city, latlng) {
    this.id = id;
    this.city = city;
    this.latlng = latlng;
  }
}
