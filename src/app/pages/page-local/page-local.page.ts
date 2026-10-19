import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppData, League, Match, Team } from '../../core/models/app-data.models';
import { SportsDataService } from '../../core/services/sports-data.service';

@Component({selector:'app-page-local',templateUrl:'./page-local.page.html',styleUrls:['./page-local.page.scss','./page-local-enhancements.scss']})
export class PageLocalPage implements OnInit {
  readonly liveLimit = 2;
  readonly upcomingLimit = 4;
  data?:AppData; leagues:League[]=[]; allLiveMatches:Match[]=[]; liveMatches:Match[]=[]; nextMatches:Match[]=[]; recentMatches:Match[]=[];
  loading=true; error=false;
  constructor(private sports:SportsDataService){}
  ngOnInit():void{this.load();}
  private load():void{
    this.sports.getLeagues({status:'active'}).subscribe({next:leagues=>{
      this.leagues=leagues;
      if(!leagues.length){this.loading=false;return;}
      forkJoin(leagues.slice(0,3).map(league=>this.sports.getLeagueOverview(league.id).pipe(catchError(()=>of(undefined))))).subscribe(packs=>{
        const valid=packs.filter((pack):pack is AppData=>!!pack);
        if(!valid.length){this.error=true;this.loading=false;return;}
        this.data={...valid[0],leagues,teams:this.unique(valid.reduce((all,item)=>all.concat(item.teams),[]),'id'),matches:this.unique(valid.reduce((all,item)=>all.concat(item.matches),[]),'id'),standings:valid.reduce((all,item)=>all.concat(item.standings),[]),topScorers:valid.reduce((all,item)=>all.concat(item.topScorers),[]),matchDetails:Object.assign({},...valid.map(item=>item.matchDetails))};
        const byDate=(a:Match,b:Match)=>new Date(a.startsAt).getTime()-new Date(b.startsAt).getTime();
        this.allLiveMatches=this.data.matches.filter(match=>match.status==='live').sort(byDate);
        this.liveMatches=this.allLiveMatches.slice(0,this.liveLimit);
        this.nextMatches=this.data.matches.filter(match=>match.status==='scheduled').sort(byDate).slice(0,this.upcomingLimit);
        this.recentMatches=this.data.matches.filter(match=>match.status==='finished').sort((a,b)=>-byDate(a,b)).slice(0,3);
        this.loading=false;
      });
    },error:()=>{this.error=true;this.loading=false;}});
  }
  team(id:string):Team|undefined{return this.data?this.sports.getTeam(this.data,id):undefined;}
  league(id:string):League|undefined{return this.leagues.find(item=>item.id===id);}
  get hasMoreLive():boolean{return this.allLiveMatches.length>this.liveLimit;}
  leagueStatusLabel(status?:string):string{return this.sports.getLeagueStatusLabel(status);}
  stageName(league:League):string{return league.stages.find(stage=>stage.id===league.currentStage)?.name||league.currentStage.replace(/[_-]+/g,' ');}
  statusLabel(match:Match):string{return match.status==='live'?`${match.minute}'`:match.status==='finished'?'Finalizado':'Próximo';}
  private unique<T>(items:T[],key:keyof T):T[]{return Array.from(new Map(items.map(item=>[item[key],item])).values());}
}
