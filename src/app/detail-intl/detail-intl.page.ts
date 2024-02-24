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

  constructor(
    private activateddRouter: ActivatedRoute, 
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.detailId = this.activateddRouter.snapshot.paramMap.get('id');
    console.log(this.detailId);

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

        console.log(this.matchesPL);

      }else{
        console.log('Dont get DATA');
      }
    });
  }

}
