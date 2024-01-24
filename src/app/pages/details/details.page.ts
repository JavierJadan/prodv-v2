import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  detailsId: string;
  details = [];
  golesNumber;
  
  opcion="";
  constructor(
    private activateddRouter: ActivatedRoute, 
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.opcion="estadisticas";
    this.detailsId = this.activateddRouter.snapshot.paramMap.get('id');
    console.log(this.detailsId);

    this.http.get<any>('https://apiv3.apifootball.com' ,{
    params:{
      APIkey: '30f1a389afbdc15fffdecb663c68a28e0d8b41541ae31af007875a9b99545a41',
      action: 'get_events',
      match_id: this.detailsId,      

    }
  }).subscribe(res =>{

    if (res) {
      console.log(res);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.details = res;
      console.log(this.details);

    }else{
      console.log('Dont get DATA');
    }
  });

  }

  changeSegment(event: any) {
    const opc = event.detail.value;
    console.log(opc);
    this.opcion=opc;
  }

}
