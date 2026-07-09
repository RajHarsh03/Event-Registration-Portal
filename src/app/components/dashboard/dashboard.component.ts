import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Registration } from '../../models/registration.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  activeTab: 'register' | 'registered' = 'registered';

  registrationForm!: FormGroup;
  registrations: Registration[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      participantName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      eventName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });

    this.loadRegistrations();
  }

  // Form field getters
  get participantName() { return this.registrationForm.get('participantName'); }
  get email() { return this.registrationForm.get('email'); }
  get eventName() { return this.registrationForm.get('eventName'); }
  get mobileNumber() { return this.registrationForm.get('mobileNumber'); }

  setTab(tab: 'register' | 'registered'): void {
    this.activeTab = tab;
  }

  loadRegistrations(): void {
    this.registrations = this.eventService.getRegistrations();
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) return;
    this.eventService.addRegistration(this.registrationForm.value);
    this.loadRegistrations();
    this.registrationForm.reset();
    this.activeTab = 'registered';
  }

  onDelete(id: number): void {
    this.eventService.deleteRegistration(id);
    this.loadRegistrations();
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
