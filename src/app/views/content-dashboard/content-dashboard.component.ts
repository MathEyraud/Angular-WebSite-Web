import {Component, OnInit} from '@angular/core';
import {Theme} from 'src/app/models/Theme';
import {ThemeService} from 'src/app/services/theme.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-content-dashboard',
  templateUrl: './content-dashboard.component.html',
  styleUrls: ['./content-dashboard.component.scss']
})
export class ContentDashboardComponent implements OnInit {

  constructor(
    private themeService: ThemeService, 
    private utilsService: UtilsService){}

  listeTheme: Theme[] = [];
  isLoading!: boolean;
      //for pagination
      page: number = 1;


  ngOnInit(): void {
    this.loadThemes();
  }

  loadThemes() {
    this.themeService.getAll().subscribe({
      next: (data) => this.listeTheme = data
    })
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  getSubString(text: string) {
    return this.utilsService.getSubString(text, 30);
  }
}