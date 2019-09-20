import { Component } from '@angular/core';
import { LoadingScreenComponent } from './home/core/loading-screen/loading-screen.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public loadingScreenComponent = LoadingScreenComponent;
}

