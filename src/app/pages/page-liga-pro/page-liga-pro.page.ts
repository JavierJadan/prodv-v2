import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-page-liga-pro',
  templateUrl: './page-liga-pro.page.html',
  styleUrls: ['./page-liga-pro.page.scss'],
})
export class PageLigaProPage implements OnInit {

  // datePipe = new DatePipe('en-US');

  matches= [];
  matchesB= [];
  playesTopSoccer = [];
  opcion='';
  opcionSerie='';
  opcionB='';
  stadingOneRound=[];
  stadingSecondRound=[];
  filterTopSoccerOneRound=[];
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

  //^ Variables for filter the matches
  
  matchesFilterOneRound = [];
  matchesFilterSecondRound = [];
  round = '1';
  roundValue = '1';

  opcMatchRound = '';

  //^ Variables for the filter the matches
  time ='';
  
  constructor(private http: HttpClient, private loadingCtrl: LoadingController) {
   }

  ngOnInit() {
    this.opcion='partidos';
    this.opcionSerie='seriea';
    this.opcStading='firstStading';
    this.opcionB='partidosB';
    this.opcMatchRound= 'round1';
    // if (this.opcion ==='dates') {
      this.ionViewDidLoad();
      this.getAllMatchesLigaPro();
      this.getStandingsSerieA();
      this.getAllMatchesLigaProB();
      this.getTopSoccerLigaProSerieA();
    }
    
    ionViewDidEnter(){
      this.getAllMatchesLigaPro();
    }
    
    ionViewDidLoad(){
      console.log('getViewLoadMatches');
      
  }

  changeSegmentLeaguePro(event: any){
    const opc = event.detail.value;
    console.log(opc);
    this.opcion=opc;
    if (this.opcion ==='players') {
      this.getTopSoccerLigaProSerieA();
    }
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

  changeMatchRound(event: any){
    const opcMatchRound = event.detail.value;
    this.opcMatchRound = opcMatchRound;
    if(opcMatchRound === 'round2'){
      this.matchesFilterSecondRound = this.matches.filter( match => match.stage_name === '2nd Round' && match.match_round === this.roundValue );
    }

  }

  /**
   * @description This function is to filter the matches by the round One
   */
  nextMatchRoundOne(){
    let convertRound = parseInt(this.round);
    convertRound = convertRound + 1;
    this.round = convertRound.toString();
    if (this.round === '16') {
      this.round = '1';
    }
    this.matchesFilterOneRound = this.matches.filter( match => match.stage_name === '1st Round' && match.match_round === this.round );
  }

  antMatchRoundOne(){
    let convertRound = parseInt(this.round);
    convertRound = convertRound - 1;
    this.round = convertRound.toString();
    if (this.round === '0') {
      this.round = '15';
    }
    this.matchesFilterOneRound = this.matches.filter( match => match.stage_name === '1st Round' && match.match_round === this.round );
  }

  /**
   * @description This function is to filter the matches by the round Two
   */

  nextMatchRoundTwo(){
    let convertRound = parseInt(this.roundValue);
    convertRound = convertRound + 1;
    this.roundValue = convertRound.toString();
    if (this.roundValue === '16') {
      this.roundValue = '1';
    }
    this.matchesFilterSecondRound = this.matches.filter( match => match.stage_name === '2nd Round' && match.match_round === this.roundValue );
  }

  antMatchRoundTwo(){
    let convertRound = parseInt(this.roundValue);
    convertRound = convertRound - 1;
    this.roundValue = convertRound.toString();
    if (this.roundValue === '0') {
      this.roundValue = '15';
    }
    this.matchesFilterSecondRound = this.matches.filter( match => match.stage_name === '2nd Round' && match.match_round === this.roundValue );
  }

  /**
   * @description This function is to get all the matches of the Liga Pro B
   */

  getAllMatchesLigaProB(){
    this.http.get<any>('https://apiv3.apifootball.com' ,{
      params:{
        APIkey: '2335c07ce6ca12a93dde8b639488bbeba8a2281f6eb351e53153d261d3d23e43',
        action: 'get_events',
        league_id: 139,
        from:'2023-01-05',
        to:'2023-12-18' 
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

  /**
   * @description This function is to get all the matches of the Liga Pro
   */
  getAllMatchesLigaPro(){
    this.http.get<any>('https://apiv3.apifootball.com' ,{
      
      params:{
        APIkey: '2335c07ce6ca12a93dde8b639488bbeba8a2281f6eb351e53153d261d3d23e43',
        action: 'get_events',
        league_id: 140,
        from:'2024-01-05',
        to:'2024-12-20',
        timezone: 'America/Guayaquil'
      }
    }).subscribe(res =>{

      if (res) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.matches = res;
        this.matchesFilterOneRound = this.matches.filter( match => match.stage_name === '1st Round' && match.match_round === this.round );
        // this.matchesFilterOneRound = this.matches.filter( (match) =>{
        //   return ;
        // });
        
        console.log(this.matchesFilterOneRound);
      }else{
        console.log('Dont get DATA');
      }
    });
  }

  /**
   * @description This function is to get the standings of the Serie A
   */
  getStandingsSerieA(){
    this.http.get<any>('https://apiv3.apifootball.com' ,{
      params:{
        APIkey: '2335c07ce6ca12a93dde8b639488bbeba8a2281f6eb351e53153d261d3d23e43',
        action: 'get_standings',
        league_id: 140,
        timezone: 'America/Guayaquil'
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

  getTopSoccerLigaProSerieA(){
    this.http.get<any>('https://apiv3.apifootball.com' ,{
      params:{
        APIkey: '2335c07ce6ca12a93dde8b639488bbeba8a2281f6eb351e53153d261d3d23e43',
        action: 'get_topscorers',
        league_id: 140, 
      }
    }).subscribe(res =>{

      if (res) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.playesTopSoccer = res;
        this.filterTopSoccerOneRound = this.playesTopSoccer.filter( player => player.stage_name === '1st Round').sort((a,b) => (a.player_place - b.player_place));

      }else{
        console.log('Dont get DATA');
      }
    });
  }



}
