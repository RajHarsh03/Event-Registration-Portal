import { Injectable } from '@angular/core';
import { Registration } from '../models/registration.model';

const STORAGE_KEY = 'event_registrations';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  /** Returns all registrations loaded from localStorage */
  getRegistrations(): Registration[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as Registration[]) : [];
  }

  /** Creates a new registration with a generated id and saves it */
  addRegistration(formData: Omit<Registration, 'id'>): void {
    const registrations = this.getRegistrations();
    const newRecord: Registration = {
      id: Date.now(),
      ...formData,
    };
    registrations.push(newRecord);
    this.saveToStorage(registrations);
  }

  /** Removes a registration by id and persists the change */
  deleteRegistration(id: number): void {
    const updated = this.getRegistrations().filter((r) => r.id !== id);
    this.saveToStorage(updated);
  }

  /** Saves the full registrations array to localStorage */
  private saveToStorage(registrations: Registration[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  }
}
