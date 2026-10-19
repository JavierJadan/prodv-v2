import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppData, Match, Team } from '../../core/models/app-data.models';
import { SportsDataService } from '../../core/services/sports-data.service';
@Component({selector:'app-details',templateUrl:'./details.page.html',styleUrls:['./details.page.scss']})
export class DetailsPage implements OnInit {
  data?:AppData; match?:Match; detail:any; segment='stats'; lineupSide:'home'|'away'='home';
  constructor(private route:ActivatedRoute,private sports:SportsDataService){}
  ngOnInit():void{const leagueId=this.route.snapshot.paramMap.get('leagueId');const id=this.route.snapshot.paramMap.get('id');if(leagueId&&id){this.sports.getMatchDetail(leagueId,id).subscribe(data=>{this.data=data;this.match=data.matches[0];this.detail=data.matchDetails[id];});}}
  team(id:string):Team|undefined{return this.data?this.sports.getTeam(this.data,id):undefined;}
}
