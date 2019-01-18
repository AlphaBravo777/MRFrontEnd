import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../../core/urls.service';

@Component({
  selector: 'app-website-home',
  templateUrl: './website-home.component.html',
  styleUrls: ['./website-home.component.css']
})
export class WebsiteHomeComponent implements OnInit {

  constructor(private urlService: UrlsService) { }

  versionNumber: number;

  ngOnInit() {
      this.versionNumber = this.urlService.currentVersion;
  }

}
