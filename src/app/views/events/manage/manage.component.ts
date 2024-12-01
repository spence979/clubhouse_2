import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Shoot } from "../shoot.interface";

@Component({
  selector: "events-dashboard",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  readonly SHOOT_TYPES = ["DTL", "Sporting", "Other 1", "Other 2"];

  shoots: Shoot[] = [
    {
      id: 1,
      title: "DTL-1",
      date: "2024-12-01",
      location: "Range A",
      client: "Club Members",
      type: "DTL",
    },
    {
      id: 2,
      title: "Sporting-1",
      date: "2024-12-15",
      location: "Range B",
      client: "Open Event",
      type: "Sporting",
    },
    {
      id: 3,
      title: "Custom Event",
      date: "2024-11-01",
      location: "Range C",
      client: "Members Only",
      type: "DTL",
    },
    {
      id: 4,
      title: "Sporting-2",
      date: "2024-10-15",
      location: "Range D",
      client: "Public Event",
      type: "Sporting",
    },
  ];

  shootForm: FormGroup;
  isModalOpen = false;
  editingShoot: Shoot | null = null;
  selectedType = "all";

  constructor(private fb: FormBuilder) {
    this.shootForm = this.createForm();
  }

  ngOnInit(): void {
    this.shootForm.get("type")?.valueChanges.subscribe((value) => {
      this.shootForm.patchValue({ title: "" }, { emitEvent: false });
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: [""],
      type: ["", Validators.required],
      date: ["", Validators.required],
      location: ["", Validators.required],
      client: ["", Validators.required],
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
