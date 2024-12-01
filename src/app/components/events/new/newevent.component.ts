import { Component, OnInit, inject } from "@angular/core";
import { FirestoreService } from "../../../services/FirestoreService";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "events-new-modal",
  templateUrl: "./newevent.component.html",
  styleUrls: ["./newevent.component.scss"],
})
export class EventsNewModal implements OnInit {
  private firestoreService = inject(FirestoreService);

  private shootForm: FormGroup;
  private shootData: any = {};
  private showModal: boolean = false;

  constructor(private fb: FormBuilder) {
    this.shootForm = fb.group({
      title: ["", Validators.required],
      eventDate: [this.getCurrentDate(), Validators.required],
    });
  }

  openCreateModal() {
    this.showModal = !this.showModal;
  }

  getCurrentDate(): string {
    return new Date().toISOString().split("T")[0];
  }

  ngOnInit() {
    this.shootForm.valueChanges.subscribe((values) => {
      this.shootData = { ...this.shootData, ...values };
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const formValues = this.shootForm.value;
    formValues.tags = ["Members"];

    if (this.shootForm.valid) {
      this.firestoreService.addEvent("events", formValues).then(() => {
        this.shootForm.reset();
        this.openCreateModal();
      });
    } else {
      // Mark all fields as touched to trigger validation visuals
      Object.keys(this.shootForm.controls).forEach((key) => {
        const control = this.shootForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  isFormInvalid(): boolean {
    return this.shootForm.invalid || this.shootForm.pristine;
  }
}
