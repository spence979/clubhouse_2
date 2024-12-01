import { Component, OnInit, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Shoot } from "../shoot.interface";
import { FirestoreService } from "../../../services/FirestoreService";

@Component({
  selector: "events-dashboard",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  readonly SHOOT_TYPES = ["DTL", "Sporting", "Other 1", "Other 2"];

  private firestoreService = inject(FirestoreService);

  shoots: Shoot[] = [];

  shootForm: FormGroup;
  isModalOpen = false;
  editingShoot: Shoot | null = null;
  selectedType = "all";

  ngOnInit(): void {
    this.firestoreService.getEvents("events").subscribe((events) => {
      console.log(events);
      this.shoots = events;
    });
  }

  get filteredShoots(): Shoot[] {
    return this.selectedType === "all"
      ? this.shoots
      : this.shoots.filter((shoot) => shoot.type === this.selectedType);
  }

  get shootCounts(): { [key: string]: number } {
    return this.shoots.reduce((acc, shoot) => {
      acc[shoot.type] = (acc[shoot.type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  generateDefaultTitle(type: string): string {
    const currentCount = (this.shootCounts[type] || 0) + 1;
    return `${type}-${currentCount}`;
  }

  openCreateModal(): void {
    this.isModalOpen = true;
    this.editingShoot = null;
    this.shootForm.reset();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.editingShoot = null;
    this.shootForm.reset();
  }

  startEdit(shoot: Shoot): void {
    this.editingShoot = shoot;
    this.shootForm.patchValue(shoot);
  }

  handleCreate(): void {
    if (this.shootForm.valid) {
      const formValue = this.shootForm.value;
      const newShoot: Shoot = {
        id: this.shoots.length + 1,
        title:
          formValue.title.trim() || this.generateDefaultTitle(formValue.type),
        ...formValue,
      };
      this.shoots.push(newShoot);
      this.closeModal();
    }
  }

  handleUpdate(): void {
    if (this.shootForm.valid && this.editingShoot) {
      const formValue = this.shootForm.value;
      const updatedShoot: Shoot = {
        ...this.editingShoot,
        ...formValue,
        title:
          formValue.title.trim() || this.generateDefaultTitle(formValue.type),
      };
      const index = this.shoots.findIndex(
        (s) => s.id === this.editingShoot!.id
      );
      if (index !== -1) {
        this.shoots[index] = updatedShoot;
      }
      this.closeModal();
    }
  }

  handleDelete(id: number): void {
    this.shoots = this.shoots.filter((shoot) => shoot.id !== id);
  }

  isFormValid(): boolean {
    return this.shootForm.valid;
  }
}
