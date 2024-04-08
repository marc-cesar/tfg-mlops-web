import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Log } from '../../models/log.module';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent {
  logs: Log[] = [];

  constructor(private logService : LogService){ }

  ngOnInit() {
    this.logService.getAllLogs().subscribe({
      next: (data : Log[]) => {
        this.logs = data;
      },
      error: (err : any) => console.error(err),
    });
  }
}
