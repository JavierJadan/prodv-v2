import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail-intl',
  templateUrl: './detail-intl.page.html',
  styleUrls: ['./detail-intl.page.scss'],
})
export class DetailIntlPage implements OnInit {

  detailId : string;
  matchesPL = [];
  matchesPLFilter = [];
  nextRound = '1';
  opcMenu;
  playesTopSoccer = [];

  stadingLeagueInt=[];


  constructor(
    private activateddRouter: ActivatedRoute, 
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.detailId = this.activateddRouter.snapshot.paramMap.get('id');
    console.log(this.detailId);
    this.opcMenu = 'matches';
    this.getStandingsLeague();
    this.getTopSoccerLigaProSerieA();

    this.http.get<any>('https://apiv3.apifootball.com' ,{
      params:{
        APIkey: '2335c07ce6ca12a93dde8b639488bbeba8a2281f6eb351e53153d261d3d23e43',
        action: 'get_events',
        league_id: this.detailId,
        from:'2023-08-01',
        to:'2024-05-19' 
      }
    }).subscribe(res =>{

      if (res) {
        // console.log(res);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.matchesPL = res;

        // console.log(this.matchesPL.length);
        this.matchesPLFilter = this.matchesPL.filter( match => match.match_round === this.nextRound );
        console.log(this.matchesPLFilter);
        // this.nextMatches();
        console.log('Total partidos =>' + this.matchesPL.length);


      }else{
        console.log('Dont get DATA');
      }
    });
  }

  changeSegmenEvents(event: any){
    const opc = event.detail.value;
    console.log(opc);
    this.opcMenu = opc;
  }

  nextMatches(){
    if(this.detailId === '152'){
      let convertRound = parseInt(this.nextRound);
      convertRound = convertRound + 1;
      this.nextRound = convertRound.toString();
      if (this.nextRound === '39') {
        this.nextRound = '1';
      }
      this.matchesPLFilter = this.matchesPL.filter( match => match.match_round === this.nextRound );
    }else if(this.detailId === '175'){
      let convertRound = parseInt(this.nextRound);
      convertRound = convertRound + 1;
      this.nextRound = convertRound.toString();
      if (this.nextRound === '35') {
        this.nextRound = '1';
      }
      this.matchesPLFilter = this.matchesPL.filter( match => match.match_round === this.nextRound );
    } else if (this.detailId === '302') {
      let convertRound = parseInt(this.nextRound);
      convertRound = convertRound + 1;
      this.nextRound = convertRound.toString();
      if (this.nextRound === '38') {
        this.nextRound = '1';
      }
      this.matchesPLFilter = this.matchesPL.filter( match =>  match.match_round === this.nextRound );
      
    }

  }

  /**
   * * @description This function is stadings of the league
   */

  getStandingsLeague(){
    this.http.get<any>('https://apiv3.apifootball.com' ,{
      params:{
        APIkey: '2335c07ce6ca12a93dde8b639488bbeba8a2281f6eb351e53153d261d3d23e43',
        action: 'get_standings',
        league_id: this.detailId,
        // timezone: 'America/Guayaquil'
      }
    }).subscribe(res =>{

      if (res) {

        this.stadingLeagueInt = res;
        console.log(this.stadingLeagueInt);

      }else{
        console.log('Dont get DATA');
      }



    });
  }

  /**
   * @description This function is to get players of the league
   */

  getTopSoccerLigaProSerieA(){
    this.http.get<any>('https://apiv3.apifootball.com' ,{
      params:{
        APIkey: '2335c07ce6ca12a93dde8b639488bbeba8a2281f6eb351e53153d261d3d23e43',
        action: 'get_topscorers',
        league_id: this.detailId, 
      }
    }).subscribe(res =>{

      if (res) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.playesTopSoccer = res;
        

      }else{
        console.log('Dont get DATA');
      }
    });
  }



}
