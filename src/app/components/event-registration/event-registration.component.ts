import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Registration } from '../../models/registration.model';

@Component({
  selector: 'app-event-registration',
  standalone: false,
  templateUrl: './event-registration.component.html',
  styleUrl: './event-registration.component.css',
})
export class EventRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  registrations: Registration[] = [];

  constructor(private fb: FormBuilder, private eventService: EventService) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      participantName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      eventName: ['', Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
    });

    this.loadRegistrations();
  }

  // Convenience getters for template access
  get participantName() { return this.registrationForm.get('participantName'); }
  get email() { return this.registrationForm.get('email'); }
  get eventName() { return this.registrationForm.get('eventName'); }
  get mobileNumber() { return this.registrationForm.get('mobileNumber'); }

  loadRegistrations(): void {
    this.registrations = this.eventService.getRegistrations();
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) return;

    this.eventService.addRegistration(this.registrationForm.value);
    this.loadRegistrations();
    this.registrationForm.reset();
  }

  onDelete(id: number): void {
    this.eventService.deleteRegistration(id);
    this.loadRegistrations();
  }
}
