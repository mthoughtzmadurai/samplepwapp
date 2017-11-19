import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArchitectService } from '../../services/architect.service';
import { Architect } from '../../services/service-models/architect';
import { environment} from '../../../environments/environment';

@Component({
  selector: 'app-architect',
  templateUrl: './architect.component.html',
  styleUrls: ['./architect.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ArchitectComponent implements OnInit {
  architects: Architect[];

  constructor(private architectService: ArchitectService) { }

  ngOnInit() {
    this.architectService.getArchitects()
      .subscribe((architects: Architect[]) => {
          this.architects = architects;
          console.log(this.architects);
          },
        err => console.log(err)
      );
  }
}
