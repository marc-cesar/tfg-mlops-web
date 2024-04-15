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
    const user = JSON.parse(localStorage.getItem('currentUser') as string)
    this.logService.getAllLogs(user.token).subscribe({
      next: (data : Log[]) => {
        this.logs = data.map(log => ({
          ...log,
          // Convert the date to a human-readable format and local date time
          date: new Date(log.date).toLocaleString()
        }));

      },
      error: (err : any) => console.error(err),
    });
  }
}
