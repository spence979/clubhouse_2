import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header-no-stats",
  templateUrl: "./header-no-stats.component.html",
})
export class HeaderNoStatsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log("HeaderNoStatsComponent");
  }
}
