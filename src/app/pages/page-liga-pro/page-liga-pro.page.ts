import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getTestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-page-liga-pro',
  templateUrl: './page-liga-pro.page.html',
  styleUrls: ['./page-liga-pro.page.scss'],
})
export class PageLigaProPage implements OnInit {

  // datePipe = new DatePipe('en-US');

  matches= [];
  matchesB= [];
  opcion='';
  opcionSerie='';
  opcionB='';
  stadingOneRound=[];
  stadingSecondRound=[];
  newAcumulada = [];
  ptdOneRound = [];
  ptdTwoRound = [];

  ptOne;
  ptTwo;

  stadingAcumulada = [
    {
      team: '',
      pts : null,
      gd : null,
      pt : null,
    }
  ];

  acumulada1=[];
  acumulada2=[];
  totalAcumulada=[{
    team : '',
    goles: 0,
  }];

  golesTotalesOne;
  golesTotalesTwo;
  teamGFOneRounds=[];
  teamGAOneRounds=[];
  teamGDOneRounds=[];

  teamGFSecondRounds=[];
  teamGASecondRounds=[];
  teamGDSecondRounds=[];

  opcStading='';
  stadingRound= [];
  
  modalities= [];
  response=[];
  currentDateMatch = new Date();
  formatDateToMatch='';
  
  //^ Variables for the SERIE B
  stadingOneRoundB=[];
  stadingSecondRoundB=[]; 
  opcStadingB='';
  
  constructor(private http: HttpClient) {
   }

  ngOnInit() {
    this.opcion='partidos';
    this.opcionSerie='seriea';
    this.opcStading='firstStading';
    this.opcionB='partidosB';
    // if (this.opcion ==='dates') {
      this.ionViewDidLoad();
      this.getAllMatchesLigaPro();
      this.getStandingsSerieA();
      this.getAllMatchesLigaProB();


     



  }

  ionViewDidLoad(){
    console.log('getViewLoadMatches');
  }

  changeSegmentLeaguePro(event: any){
    const opc = event.detail.value;
    console.log(opc);
    this.opcion=opc;
  }

  changeSegmentLeagueProB(event: any){
    const opc = event.detail.value;
    console.log(opc);
    this.opcionB=opc;
  }

  changeStadingLigaPrB(event: any){
    const opcStadingB = event.detail.value;
    this.opcStadingB = opcStadingB;
    console.log(this.opcStadingB);
  }

  changeStadingLigaPro(event: any){
    const opcStading = event.detail.value;
    this.opcStading = opcStading;
    console.log(this.opcStading);
  }

  getAllMatchesLigaProB(){
    this.http.get<any>('https://apiv3.apifootball.com' ,{
      params:{
        APIkey: '30f1a389afbdc15fffdecb663c68a28e0d8b41541ae31af007875a9b99545a41',
        action: 'get_events',
        league_id: 139,
        from:'2023-09-05',
        to:'2023-10-18' 
      }
    }).subscribe(res =>{

      if (res) {
        // console.log(res);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.matchesB = res;
      }else{
        console.log('Dont get DATA');
      }
    });
  }

  getAllMatchesLigaPro(){

    // this.formatDateToMatch = this.datePipe.transform(this.currentDateMatch,'yyyy-MM-dd');
    // console.log(this.formatDateToMatch);

    this.http.get<any>('https://apiv3.apifootball.com' ,{
      
      params:{
        APIkey: '30f1a389afbdc15fffdecb663c68a28e0d8b41541ae31af007875a9b99545a41',
        action: 'get_events',
        league_id: 140,
        from:'2023-01-05',
        to:'2023-12-20' 
      }
    }).subscribe(res =>{

      if (res) {
        
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.matches = res;
        console.log(this.matches);
      }else{
        console.log('Dont get DATA');
      }
    });
  }

  getStandingsSerieA(){
    this.http.get<any>('https://apiv3.apifootball.com' ,{
      params:{
        APIkey: '30f1a389afbdc15fffdecb663c68a28e0d8b41541ae31af007875a9b99545a41',
        action: 'get_standings',
        league_id: 140,
      }
    }).subscribe(res =>{

      

      if (res) {

        this.stadingOneRound = res.filter( standings => standings.stage_name === '1st Round');
        this.stadingSecondRound = res.filter( standings => standings.stage_name === '2nd Round');

        this.acumulada1 = this.stadingOneRound.filter( standings => standings.overall_league_PTS ) ;
        this.acumulada2 = this.stadingSecondRound.filter( standings => standings.overall_league_PTS );

        this.teamGFOneRounds = this.stadingOneRound.filter( standings => standings.overall_league_GF);
        this.teamGAOneRounds = this.stadingOneRound.filter( standings => standings.overall_league_GA);

        this.teamGFSecondRounds = this.stadingSecondRound.filter( standings => standings.overall_league_GF);
        this.teamGASecondRounds = this.stadingSecondRound.filter( standings => standings.overall_league_GA);

        this.ptdOneRound = this.stadingOneRound.filter( standings => standings.overall_league_payed);
        this.ptdTwoRound = this.stadingOneRound.filter( standings => standings.overall_league_payed);

        for (let index = 0; index < this.acumulada1.length ; index++) {
          this.filterAcumulada(index);

        }

        this.newAcumulada = this.stadingAcumulada.sort((a,b) => (b.pts - a.pts));
        // console.log(this.newAcumulada);

      }else{
        console.log('Dont get DATA');
      }



    });
  }

  filterAcumulada(index: number ){

    let stadinNameOne = this.acumulada1[index].team_name;

    //& ONE ROUND
    
     this.golesTotalesOne = this.teamGFOneRounds[index].overall_league_GF - this.teamGAOneRounds[index].overall_league_GA;

      this.ptOne = this.ptdOneRound[index].overall_league_payed;

    for (let itemTeam = 0; itemTeam <= this.acumulada2.length -1; itemTeam++) {
      
      //& SECOND ROUND
      this.golesTotalesTwo = this.teamGFSecondRounds[itemTeam].overall_league_GF - this.teamGASecondRounds[itemTeam].overall_league_GA;
      this.ptTwo = this.ptdTwoRound[itemTeam].overall_league_payed;

      if(stadinNameOne === this.acumulada2[itemTeam].team_name){
       
        let ptsA = (parseInt(this.acumulada1[index].overall_league_PTS) + parseInt(this.acumulada2[itemTeam].overall_league_PTS) );
        let gdA = (this.golesTotalesOne + this.golesTotalesTwo);
        let pt = (parseInt(this.ptOne) + parseInt(this.ptTwo));
        this.stadingAcumulada.push({team: stadinNameOne, pts: ptsA, gd: gdA, pt: pt });
      }
    }
  }


  changeOpctionSerieLigaPro(event: any){
    const opc = event.detail.value;
    console.log(opc);
    this.opcionSerie=opc;

  }



}
