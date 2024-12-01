import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "events-new-list",
  templateUrl: "./newlist.component.html",
  styleUrls: ["./newlist.component.scss"],
})
export class EventListComponent implements OnInit {
  @Input() data: any = {};

  ngOnInit() {}
}
