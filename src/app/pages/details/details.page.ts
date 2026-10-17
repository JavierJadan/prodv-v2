import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppData, Match, Team } from '../../core/models/app-data.models';
import { SportsDataService } from '../../core/services/sports-data.service';
@Component({selector:'app-details',templateUrl:'./details.page.html',styleUrls:['./details.page.scss']})
export class DetailsPage implements OnInit {
  data?:AppData; match?:Match; detail:any; segment='stats'; lineupSide:'home'|'away'='home';
  constructor(private route:ActivatedRoute,private sports:SportsDataService){}
  ngOnInit():void{const id=this.route.snapshot.paramMap.get('id');this.sports.getSnapshot().subscribe(data=>{this.data=data;this.match=data.matches.find(item=>item.id===id);this.detail=id?data.matchDetails[id]:null;});}
  team(id:string):Team|undefined{return this.data?this.sports.getTeam(this.data,id):undefined;}
}
