import { Component } from "@angular/core";

@Component({
  selector: "events-new-modal",
  templateUrl: "./newevent.component.html",
  styleUrls: ["./newevent.component.scss"],
})
export class EventsNewModal {
  showModal = false;
  openCreateModal() {
    this.showModal = !this.showModal;
  }
}
