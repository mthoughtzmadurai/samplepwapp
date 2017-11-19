import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Architect } from './service-models/architect';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client.service';

@Injectable()
export class ArchitectService {

  constructor(private http: HttpClientService) { }

  getArchitects(): Observable<Architect[]> {
    return this.http.get(environment.apiEndpoint+`/architects`);
  }

}
