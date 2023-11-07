import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-liga-pro',
  templateUrl: './page-liga-pro.page.html',
  styleUrls: ['./page-liga-pro.page.scss'],
})
export class PageLigaProPage implements OnInit {

  matches= [];
  matches1= [];
  opcion='';

  modalities= [];
  response=[];

  constructor(private http: HttpClient) {
   }

  ngOnInit() {
    this.opcion='live';
    // if (this.opcion ==='dates') {
      this.getMatchesBySeasonLigaPro();
      this.ionViewDidLoad();

  }

  ionViewDidLoad(){
    console.log('getViewLoadMatches');
    if (this.opcion ==='dates') {
    this.getMatchesBySeasonLigaPro2();
    }
  }

  changeSegmentLeaguePro(event: any){
    const opc = event.detail.value;
    console.log(opc);
    this.opcion=opc;
  } 

  getAllMatchesLigaPro(url){
    this.http.get<any>('https://v3.football.api-sports.io/fixtures' ,{
      headers:{
        'x-rapidapi-host' : 'v3.football.api-sports.io',
        'x-rapidapi-key'  : '057eb7678fa2d34dca7c319ce9a57a7d'
      },
      params:{
        live : 'all',
        league: 242,
        season:2023,
      }
    }).subscribe(res =>{

      if (res) {
        console.log(res);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.matches = res.response;
        console.log('Error: ' + this.matches.length);
        console.log(res.response);
      }else{
        console.log('Dont get DATA');
      }
    });
  }
  getMatchesBySeasonLigaPro(){
    console.log('getMaches1');
    this.http.get<any>('https://v3.football.api-sports.io/fixtures' ,{
      headers:{
        'x-rapidapi-host' : 'v3.football.api-sports.io',
        'x-rapidapi-key'  : '057eb7678fa2d34dca7c319ce9a57a7d'
      },
      params:{
        league : 242,
        round :'1st Round - 4',
        season : 2023
      }
    }).subscribe(res =>{

      if (res) {
        console.log(res);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.matches = res.response;
        console.log('Error: ' + this.matches.length);
        console.log(res.response);
      }else{
        console.log('Dont get DATA');
      }
    });
  }
  getMatchesBySeasonLigaPro2(){
    console.log('GetMaches2');
    this.http.get<any>('https://v3.football.api-sports.io/fixtures' ,{
      headers:{
        'x-rapidapi-host' : 'v3.football.api-sports.io',
        'x-rapidapi-key'  : '057eb7678fa2d34dca7c319ce9a57a7d'
      },
      params:{
        league : 242,
        round :'1st Round - 5',
        season : 2023
      }
    }).subscribe(res =>{

      if (res) {
        console.log(res);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.matches1 = res.response;
        console.log('Error: ' + this.matches1.length);
        console.log(res.response);
      }else{
        console.log('Dont get DATA');
      }
    });
    return this.matches1;
    // this.getMatchesBySeasonLigaPro().unsuscribe
  }

  getModalities(){
    this.http.get<any>('http://api-platform.test/api/universities/1',{
      headers:{
        'Accept': 'application/json'
      }
    }).subscribe( res => {
      if (res) {
        console.log(res);
        this.response = this.modalities = res.modality;
        this.response.filter( (value) => {
          return value;
        });
        console.log(this.response);

      }else{
        console.log('Could not find');
      }
    })
  }


}
