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
    console.log(`Saved Locations ${JSON.parse(value)}`);
    return JSON.parse(value) as StorageLocation[];
  }

  async setLocations(value: StorageLocation): Promise<boolean> {
    const locations = await this.getLocations();
    if (!locations.find((l) => l.city === value.city)) {
      locations.push(value);
      await Preferences.set({
        key: 'favourites',
        value: JSON.stringify(locations)
      });
      return true;
    }
    return false;
  }

  async deleteLocations() {
    await Preferences.remove({ key: 'favourites' });
  }
}
