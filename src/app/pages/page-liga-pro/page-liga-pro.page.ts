import { Component, OnInit } from '@angular/core';
import { AppData, CompetitionStage, League, Match, Standing, Team, TopScorer } from '../../core/models/app-data.models';
import { SportsDataService } from '../../core/services/sports-data.service';
@Component({selector:'app-page-liga-pro',templateUrl:'./page-liga-pro.page.html',styleUrls:['./page-liga-pro.page.scss']})
export class PageLigaProPage implements OnInit {
  data?:AppData; selected?:League; selectedStage?:CompetitionStage; table?:Standing; scorers:TopScorer[]=[]; matches:Match[]=[]; segment='matches'; round=1;
  constructor(private sports:SportsDataService){}
  ngOnInit():void{this.sports.getSnapshot().subscribe(data=>{this.data=data;this.select(data.leagues[0]);});}
  select(league:League):void{this.selected=league;this.selectedStage=league.stages.find(stage=>stage.id===league.currentStage)||league.stages[0];this.round=league.currentRound;this.refresh();}
  selectStage(stage:CompetitionStage):void{this.selectedStage=stage;this.round=1;this.refresh();}
  changeRound(step:number):void{const total=this.selectedStage?.rounds||1;this.round=Math.min(total,Math.max(1,this.round+step));this.refreshMatches();}
  private refresh():void{this.table=this.data?.standings.find(item=>item.leagueId===this.selected?.id&&item.stage===this.selectedStage?.id);this.scorers=this.data?.topScorers.filter(item=>item.leagueId===this.selected?.id)||[];this.refreshMatches();}
  private refreshMatches():void{this.matches=this.data?.matches.filter(item=>item.leagueId===this.selected?.id&&item.stage===this.selectedStage?.id&&item.round===this.round)||[];}
  team(id:string):Team|undefined{return this.data?this.sports.getTeam(this.data,id):undefined;}
}
