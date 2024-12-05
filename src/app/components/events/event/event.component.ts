import { Component, Input, OnInit } from "@angular/core";
import { Shoot } from "../../../views/events/shoot.interface";

@Component({
  selector: "events-component",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"],
})
export class EventComponent implements OnInit {
  @Input() data: any[] = [];

  showOnlyAssigned: boolean = false;

  ngOnInit() {}
}
