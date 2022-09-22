import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { StorageLocation } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async getLocations(): Promise<StorageLocation[]> {
    const { value } = await Preferences.get({ key: 'favourites' });
    console.log(`Saved Locations ${value}`);
    return value ? JSON.parse(value) : [];
  }

  async setLocations(value: StorageLocation): Promise<boolean> {
    const locations = await this.getLocations();
    if (!locations.find((l) => l.city === value.city)) {
      locations.push(value);
      await Preferences.set({
        key: 'favourites',
        value: JSON.stringify(locations),
      });
      return true;
    }
    return false;
  }

  async deleteLocation(id: string) {
    const locations = await this.getLocations();
    if (locations.length > 0) {
      if (locations.findIndex((l) => l.id === id) >= 0) {
        const index = locations.findIndex((l) => l.id === id);
        locations.splice(index, 1);
        return Preferences.set({
          key: 'favourites',
          value: JSON.stringify(locations),
        });
      }
    }
  }
}
