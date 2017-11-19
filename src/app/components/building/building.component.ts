import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Building } from '../../services/service-models/building';
import { BuildingService } from '../../services/building.service';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BuildingComponent implements OnInit {
  id: string;
  buildings: Building[];

  constructor(private activatedRoute: ActivatedRoute, private buildingService: BuildingService) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.buildingService.getBuilding(this.id).subscribe((buildings: Building[]) => {
        this.buildings = buildings;
        console.log(this.buildings);
      });
    });
  }

  ngOnInit() {
  }

  protected customDateSort(eventPayload: any): void {
    this.sortBy(eventPayload => eventPayload.dateBuilt, eventPayload);
    this.buildings = [...this.buildings];
  }

  protected customCategorySort(eventPayload: any): void {
    this.sortBy(eventPayload => eventPayload.category[0].name, eventPayload);
    this.buildings = [...this.buildings];
  }

  protected sortBy(itemCallback: Function, event: any): Array<Building> {
    return this.buildings.sort((item1: Building, item2: Building) => {

      let value1 = itemCallback(item1);
      let value2 = itemCallback(item2);

      if (value1 === null) {
        return 1;
      }

      if (value2 === null) {
        return -1;
      }

      if (value1 > value2) {
        return 1 * event.order;
      }

      if (value1 < value2) {
        return -1 * event.order;
      }

      return 0;
    });
  }

}
