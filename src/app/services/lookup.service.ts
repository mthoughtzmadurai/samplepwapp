import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class LookupService {

  architects = {
    getArchitects: '/architects',
    getArchitect: '/architects',
    editArchitect: '/architects',
    deleteArchitect: '/architects'
  };

  buildings = {
    getBuildings: '/buildings',
    editBuilding: '/buildings'
  }

  constructor() {
  }
}
