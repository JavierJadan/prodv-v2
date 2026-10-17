import { Component, OnInit } from '@angular/core';
import { AppData, Match, Team } from '../../core/models/app-data.models';
import { SportsDataService } from '../../core/services/sports-data.service';
@Component({ selector: 'app-page-internacional', templateUrl: './page-internacional.page.html', styleUrls: ['./page-internacional.page.scss'] })
export class PageInternacionalPage implements OnInit {
  data?: AppData; matches: Match[]=[]; filter='all';
  constructor(private sports: SportsDataService) {}
  ngOnInit(): void { this.sports.getSnapshot().subscribe(data=>{this.data=data;this.apply();}); }
  apply(): void { this.matches=(this.data?.matches||[]).filter(m=>this.filter==='all'||m.status===this.filter); }
  team(id:string):Team|undefined{return this.data?this.sports.getTeam(this.data,id):undefined;}
}
