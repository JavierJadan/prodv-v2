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
    this.getDataMatches();



  }

  getDataMatches(){
    this.http.get<any>('https://apiv3.apifootball.com' ,{
      params:{
        APIkey: '2335c07ce6ca12a93dde8b639488bbeba8a2281f6eb351e53153d261d3d23e43',
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
