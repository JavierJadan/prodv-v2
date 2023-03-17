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

@Component({
  selector: 'app-page-internacional',
  templateUrl: './page-internacional.page.html',
  styleUrls: ['./page-internacional.page.scss'],
})
export class PageInternacionalPage implements OnInit {

    matches=[];
  constructor(private http: HttpClient ) {
    // this.initialize();
  }

  ngOnInit() {

    this.http.get<any>('https://v3.football.api-sports.io/fixtures?live=all',{
      headers:{
        'x-rapidapi-host' : 'v3.football.api-sports.io',
        'x-rapidapi-key'  : '057eb7678fa2d34dca7c319ce9a57a7d'
      }
    }).subscribe(res =>{
      console.log(res);
      this.matches = res.response;
      console.log(res.response);
    });
  }
  // async initialize(){
  //   const { status } = await AdMob.trackingAuthorizationStatus();
  //   console.log(status);
  //   if (status === 'notDetermined') {
  //     console.log('Display information before ads load first time');
  //   }

  //   AdMob.initialize({
  //     requestTrackingAuthorization: true,
  //     testingDevices: ['YOURTESTDEVICECODE'],
  //     initializeForTesting: true,
  //   });
  // }

  // async showBanner() {
  //   const adId = isPlatform('ios') ? 'ios-ad-id' : 'android-ad-unit';

  //   const options: BannerAdOptions = {
  //     adId,
  //     adSize: BannerAdSize.ADAPTIVE_BANNER,
  //     position: BannerAdPosition.BOTTOM_CENTER,
  //     margin: 0,
  //     isTesting: true,
  //     // The default behavior of the Google Mobile Ads SDK is to serve personalized ads.
  //     // Set this to true to request Non-Personalized Ads
  //     // npa: true
  //   };
  //   await AdMob.showBanner(options);
  // }

  // async hideBanner() {
  //   // Hides it but still available in background
  //   await AdMob.hideBanner();

  //   // Completely removes the banner
  //   await AdMob.removeBanner();
  // }


  // async showInterstitial() {
  //   const options: AdOptions = {
  //     adId: 'YOUR AD ID',
  //     isTesting: true,
  //     // npa: true
  //   };
  //   await AdMob.prepareInterstitial(options);
  //   await AdMob.showInterstitial();
  // }
  // async showRewardVideo() {
  //   AdMob.addListener(
  //     RewardAdPluginEvents.Rewarded,
  //     (reward: AdMobRewardItem) => {
  //       // Give the reward!
  //       console.log('REWARD: ', reward);
  //     }
  //   );
  //   const options: RewardAdOptions = {
  //     adId: 'YOUR ADID',
  //     isTesting: true,
  //     // npa: true
  //     // ssv: { ... }
  //   };

  //   await AdMob.prepareRewardVideoAd(options);
  //   await AdMob.showRewardVideoAd();
  // }

}
