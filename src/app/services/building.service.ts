import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Building } from './service-models/building';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client.service';

@Injectable()
export class BuildingService {

  constructor(private http: HttpClientService) { }

  getBuilding(architectId): Observable<Building[]> {
    return this.http.get(environment.apiEndpoint+`/architects/${architectId}/buildings`);
  }

}
