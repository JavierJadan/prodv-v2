import { Component, OnInit } from '@angular/core';
// import {
//   AdMob,
//   AdMobRewardItem,
//   AdOptions,
//   BannerAdOptions,
//   BannerAdPosition,
//   BannerAdSize,
//   RewardAdOptions,
//   RewardAdPluginEvents,
// } from '@capacitor-community/admob';
import { isPlatform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AdMob, AdMobRewardItem, AdOptions, BannerAdOptions, BannerAdPosition, BannerAdSize, RewardAdOptions, RewardAdPluginEvents } from '@capacitor-community/admob';
import { Card } from '../../models';

@Component({
  selector: 'app-page-internacional',
  templateUrl: './page-internacional.page.html',
  styleUrls: ['./page-internacional.page.scss'],
})
export class PageInternacionalPage implements OnInit {

  matches=[];
  leagueCards: Card[] = [
    {imagen:'assets/imgs/int-leagues/premier_logo_app.png', league_id:152},
    {imagen:'assets/imgs/int-leagues/bundesliga.png', league_id:175},
    {imagen:'assets/imgs/int-leagues/la_liga.png', league_id:302},
    {imagen:'assets/imgs/int-leagues/primer_division.png', league_id:515},
    {imagen:'assets/imgs/int-leagues/mls.png', league_id:332},
  ];

  constructor(private http: HttpClient ) {
    // this.initialize();
  }

  ngOnInit() {

    
  
  }

  viewLeagues(){
   
  }

  getLeagues( league_id: number){
    console.log(league_id);
    this.http.get<any>('https://apiv3.apifootball.com' ,{
      params:{
        APIkey: '2335c07ce6ca12a93dde8b639488bbeba8a2281f6eb351e53153d261d3d23e43',
        action: 'get_events',
        league_id: league_id,
        from:'2023-08-01',
        to:'2024-06-26' 
      }
    }).subscribe(res =>{

      if (res) {
        this.matches = res;
        console.log(this.matches);
      }else{
        console.log('Dont get DATA');
      }
    });
  }

  


}
