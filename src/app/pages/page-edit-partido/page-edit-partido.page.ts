import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ToastController, AlertController, IonDatetime } from '@ionic/angular';
import { Encuentro, Equipos, Campeonatos } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-page-edit-partido',
  templateUrl: './page-edit-partido.page.html',
  styleUrls: ['./page-edit-partido.page.scss'],
})
export class PageEditPartidoPage implements OnInit, OnDestroy {
  grupo = false;
  grupo1 = false;
  grupo2 = false;
  boton= true;
  equiposInfo: Subscription;
  equiposInfo1: Subscription;
  formatedString = '';
  showPicker = false;
  dateValue = format(new Date(), 'yyy-MM-dd') + 'T09:00:00.000Z';

  equipo1update: Subscription;
  equipo2update: Subscription;
  escudo1 = '';
  escudo2 = '';
  uid1 = '';
  uid2 = '';

  penaltis=false;


  equipo1: Equipos = {
    uid: '',
    nombre: '',
    escudo: '',
    grupo: '',
    puntos: 0,
    p_j: 0,
    p_g: 0,
    p_e: 0,
    p_p: 0,
    g_f: 0,
    g_c: 0,
    d_g: 0
  };

  equipo2: Equipos = {
    uid: '',
    nombre: '',
    escudo: '',
    grupo: '',
    puntos: 0,
    p_j: 0,
    p_g: 0,
    p_e: 0,
    p_p: 0,
    g_f: 0,
    g_c: 0,
    d_g: 0


  };

  equipo1up: Equipos = {
    uid: '',
    nombre: '',
    escudo: '',
    grupo: '',
    puntos: 0,
    p_j: 0,
    p_g: 0,
    p_e: 0,
    p_p: 0,
    g_f: 0,
    g_c: 0,
    d_g: 0
  };

  equipo2up: Equipos = {
    uid: '',
    nombre: '',
    escudo: '',
    grupo: '',
    puntos: 0,
    p_j: 0,
    p_g: 0,
    p_e: 0,
    p_p: 0,
    g_f: 0,
    g_c: 0,
    d_g: 0


  };

  encuentro: Encuentro = {
    uid: '',
    tipo: '',
    fechae: '',
    fecha: null,
    numero: 0,
    grupo: '',
    uid_e1: '',
    uid_e2: '',
    estado: 'espera',
    res_e1: 0,
    res_e2: 0,
    escudo_e1: '',
    escudo_e2: '',
    nombre_e1: '',
    nombre_e2: '',
    puntose1: 0,
    pje1: 0,
    pge1: 0,
    pee1: 0,
    ppe1: 0,
    gfe1: 0,
    gce1: 0,
    dge1: 0,
    puntose2: 0,
    pje2: 0,
    pge2: 0,
    pee2: 0,
    ppe2: 0,
    gfe2: 0,
    gce2: 0,
    dge2: 0,
    penale1: 0,
    penale2:0,
    statuspen: 'no',
    update: 'outdated',
    estadio: '',
    ciudad: '',
    esquemae1: '',
    esquemae2: '',
    typematch: '',
  };

  infocampeonato: Campeonatos = {
    uid: '',
    nombre: '',
    fecha: null,
    tipo: '',
    lugar: '',
    estado: 'iniciado',
    grupos: 0,
    fases: 0,
    init: ''
  };

  @ViewChild(IonDatetime) datetime: IonDatetime;
  constructor(public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public router: Router) { }

  ngOnInit() {
    // this.restart();
    const match = this.firestoreService.getMatch();
    if (match !== undefined) {
      this.encuentro = match;
    }
    console.log(this.encuentro);
    const campeonatod = this.firestoreService.getCampeonato();
    if (campeonatod !== undefined) {
      this.infocampeonato = campeonatod;
    }
  }
  ngOnDestroy(): void {
    console.log('Destroy - edit partido');
    if (this.equiposInfo) {
      console.log('eqiposInfo estaba suscripto pero se destruyo');
      this.equiposInfo.unsubscribe();
      this.equiposInfo1.unsubscribe();
      // this.equipo1update.unsubscribe();
      // this.equipo2update.unsubscribe();
  }
}
  dateChanged(value){ 
    this.dateValue = value;
    this.formatedString = format(parseISO(value), 'HH:mm, MMM d, yyy');
    this.showPicker = false;
    this.encuentro.fecha = value;
    console.log(value);
  }

  handleChange(event: any){
    const opc = event.detail.checked;
    console.log(opc);
    if(opc===true){
      this.penaltis=true;
    }else{
      this.penaltis=false;
    }
  }


  close(){
  this.datetime.cancel(true);
  }

  select(){
  this.datetime.confirm(true);
  }


  async actualizarpuntos(uid1: string, uid2: string){
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Equipos';
    this.equiposInfo = this.firestoreService.getgrupos<Equipos>(path, 'uid', '==', uid1).subscribe(res => {
      if (res.length) {
        this.equipo1 = res[0];

        if (this.encuentro.res_e1 === this.encuentro.res_e2) {
          this.equipo1.puntos = this.encuentro.puntose1 + 1;
          this.equipo1.p_g = this.encuentro.pge1;
          this.equipo1.p_p = this.encuentro.ppe1;
          this.equipo1.p_j = this.encuentro.pje1 + 1;
          this.equipo1.p_e = this.encuentro.pee1 + 1;
          this.equipo1.g_f = this.encuentro.gfe1 + this.encuentro.res_e1;
          this.equipo1.g_c = this.encuentro.gce1 + this.encuentro.res_e2;
          this.equipo1.d_g = this.equipo1.g_f - this.equipo1.g_c;


        } else if (this.encuentro.res_e1 > this.encuentro.res_e2) {
          this.equipo1.puntos = this.encuentro.puntose1 + 3;
          this.equipo1.p_j = this.encuentro.pje1 + 1;
          this.equipo1.p_g = this.encuentro.pge1 + 1;
          this.equipo1.p_e = this.encuentro.pee1;
          this.equipo1.p_p = this.encuentro.ppe1;
          this.equipo1.g_f = this.encuentro.gfe1 + this.encuentro.res_e1;
          this.equipo1.g_c = this.encuentro.gce1 + this.encuentro.res_e2;
          this.equipo1.d_g = this.equipo1.g_f - this.equipo1.g_c;


        } else if (this.encuentro.res_e1 < this.encuentro.res_e2) {
          this.equipo1.puntos=this.encuentro.puntose1;
          this.equipo1.p_j = this.encuentro.pje1 + 1;
          this.equipo1.p_p = this.encuentro.ppe1 + 1;
          this.equipo1.p_e = this.encuentro.pee1;
          this.equipo1.p_g = this.encuentro.pge1;
          this.equipo1.g_f = this.encuentro.gfe1 + this.encuentro.res_e1;
          this.equipo1.g_c = this.encuentro.gce1 + this.encuentro.res_e2;
          this.equipo1.d_g = this.equipo1.g_f - this.equipo1.g_c;
        }

        const data = {
          puntos: this.equipo1.puntos,
          p_j: this.equipo1.p_j,
          p_g: this.equipo1.p_g,
          p_e: this.equipo1.p_e,
          p_p: this.equipo1.p_p,
          g_f: this.equipo1.g_f,
          g_c: this.equipo1.g_c,
          d_g: this.equipo1.d_g
        };


        this.firestoreService.actualizarpartido(data, path, uid1);
        this.equipo1={
          uid: '',
          nombre: '',
          escudo: '',
          grupo: '',
          puntos: 0,
          p_j: 0,
          p_g: 0,
          p_e: 0,
          p_p: 0,
          g_f: 0,
          g_c: 0,
          d_g: 0
      };
        this.equiposInfo.unsubscribe();


      }
      console.log('Se actualizaron correctamente equipo 1');
    }

    );

    this.equiposInfo1 = this.firestoreService.getgrupos<Equipos>(path, 'uid', '==', uid2).subscribe(res => {
      if (res.length) {
        this.equipo2 = res[0];

        if (this.encuentro.res_e1 === this.encuentro.res_e2) {

          this.equipo2.puntos = this.encuentro.puntose2 + 1;
          this.equipo2.p_j = this.encuentro.pje2 + 1;
          this.equipo2.p_e = this.encuentro.pee2 + 1;
          this.equipo2.p_g = this.encuentro.pge2;
          this.equipo2.p_p = this.encuentro.ppe2;
          this.equipo2.g_f = this.encuentro.gfe2 + this.encuentro.res_e2;
          this.equipo2.g_c = this.encuentro.gce2 + this.encuentro.res_e1;
          this.equipo2.d_g = this.equipo2.g_f - this.equipo2.g_c;

        } else if (this.encuentro.res_e1 > this.encuentro.res_e2) {
          this.equipo2.puntos=this.encuentro.puntose2;
          this.equipo2.p_j = this.encuentro.pje2 + 1;
          this.equipo2.p_p = this.encuentro.ppe2 + 1;
          this.equipo2.p_e = this.encuentro.pee2;
          this.equipo2.p_g = this.encuentro.pge2;
          this.equipo2.g_f = this.encuentro.gfe2 + this.encuentro.res_e2;
          this.equipo2.g_c = this.encuentro.gce2 + this.encuentro.res_e1;
          this.equipo2.d_g = this.equipo2.g_f - this.equipo2.g_c;

        } else if (this.encuentro.res_e1 < this.encuentro.res_e2) {
          this.equipo2.puntos = this.encuentro.puntose2 + 3;
          this.equipo2.p_e = this.encuentro.pee2;
          this.equipo2.p_p = this.encuentro.ppe2;
          this.equipo2.p_j = this.encuentro.pje2 + 1;
          this.equipo2.p_g = this.encuentro.pge2 + 1;
          this.equipo2.g_f = this.encuentro.gfe2 + this.encuentro.res_e2;
          this.equipo2.g_c = this.encuentro.gce2 + this.encuentro.res_e1;
          this.equipo2.d_g = this.equipo2.g_f - this.equipo2.g_c;
        }

        const data = {
          puntos: this.equipo2.puntos,
          p_j: this.equipo2.p_j,
          p_g: this.equipo2.p_g,
          p_e: this.equipo2.p_e,
          p_p: this.equipo2.p_p,
          g_f: this.equipo2.g_f,
          g_c: this.equipo2.g_c,
          d_g: this.equipo2.d_g
        };

        this.firestoreService.actualizarpartido(data, path, uid2);
        this.equipo2={
          uid: '',
          nombre: '',
          escudo: '',
          grupo: '',
          puntos: 0,
          p_j: 0,
          p_g: 0,
          p_e: 0,
          p_p: 0,
          g_f: 0,
          g_c: 0,
          d_g: 0
      };
        this.equiposInfo1.unsubscribe();

      }
      console.log('Se actualizaron correctamente equipo 2');
    });

  }
  async saveMatch() {
    if (this.encuentro.estado === 'espera') {
      const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos';
      this.firestoreService.createDoc(this.encuentro, path, this.encuentro.uid).then(res => {
        this.encuentro = {
          uid: '',
          tipo: '',
          fechae: '',
          fecha: null,
          numero: 0,
          grupo: '',
          uid_e1: '',
          uid_e2: '',
          estado: '',
          res_e1: 0,
          res_e2: 0,
          escudo_e1: '',
          escudo_e2: '',
          nombre_e1: '',
          nombre_e2: '',
          puntose1: 0,
          pje1: 0,
          pge1: 0,
          pee1: 0,
          ppe1: 0,
          gfe1: 0,
          gce1: 0,
          dge1: 0,
          puntose2: 0,
          pje2: 0,
          pge2: 0,
          pee2: 0,
          ppe2: 0,
          gfe2: 0,
          gce2: 0,
          dge2: 0,
          penale1: 0,
          penale2:0,
          statuspen: 'no',
          update: 'outdated',
          estadio: '',
          ciudad: '',
          esquemae1: '',
          esquemae2: '',
          typematch: ''
        };
        this.presentLoading('Actualizando datos', 1500);
        // setTimeout(() => {
        //   this.router.navigate(['/tab-info-campeonato/page-encuentros-campeonato']);
        // }, 1000);

      }).catch(error => {
        console.log(error);
      });

    } else if (this.encuentro.estado === 'iniciado' || this.encuentro.estado === 'finalizado') {
      this.completardatos(this.encuentro.update,this.encuentro.uid, this.encuentro.tipo);
      //esto queda para hacer pruebas
      console.log('El partido ha iniciado - finalizado');
      // this.encuentro.tipo=this.encuentro.tipo;
      if (this.encuentro.tipo === 'Fase de grupos' || this.encuentro.tipo === 'Descenso') {
        this.actualizarpuntos(this.encuentro.uid_e1, this.encuentro.uid_e2);
        // this.encuentro.puntose1=this.encuentro.puntose1;
        // this.encuentro.puntose2=this.encuentro.puntose2;
        const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos';

        this.firestoreService.createDoc(this.encuentro, path, this.encuentro.uid).then(res => {
          this.encuentro = {
            uid: '',
            tipo: '',
            fechae: '',
            fecha: null,
            numero: 0,
            grupo: '',
            uid_e1: '',
            uid_e2: '',
            estado: '',
            res_e1: 0,
            res_e2: 0,
            escudo_e1: '',
            escudo_e2: '',
            nombre_e1: '',
            nombre_e2: '',
            puntose1: 0,
            pje1: 0,
            pge1: 0,
            pee1: 0,
            ppe1: 0,
            gfe1: 0,
            gce1: 0,
            dge1: 0,
            puntose2: 0,
            pje2: 0,
            pge2: 0,
            pee2: 0,
            ppe2: 0,
            gfe2: 0,
            gce2: 0,
            dge2: 0,
            penale1: 0,
            penale2:0,
            statuspen: 'no',
            update: 'outdated',
            estadio: '',
            ciudad: '',
            esquemae1: '',
            esquemae2: '',
            typematch: ''
          };

          this.equipo1={
              uid: '',
              nombre: '',
              escudo: '',
              grupo: '',
              puntos: 0,
              p_j: 0,
              p_g: 0,
              p_e: 0,
              p_p: 0,
              g_f: 0,
              g_c: 0,
              d_g: 0
          };
          this.equipo2={
            uid: '',
            nombre: '',
            escudo: '',
            grupo: '',
            puntos: 0,
            p_j: 0,
            p_g: 0,
            p_e: 0,
            p_p: 0,
            g_f: 0,
            g_c: 0,
            d_g: 0
        };
          this.presentLoading('Guardando partido', 1500);
          // setTimeout(() => {

          // }, 1000);

        }).catch(error => {
          console.log(error,'erroooor');
        });

      } else {
        const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos';
        this.firestoreService.createDoc(this.encuentro, path, this.encuentro.uid).then(res => {
          this.encuentro = {
            uid: '',
            tipo: '',
            fechae: '',
            fecha: null,
            numero: 0,
            grupo: '',
            uid_e1: '',
            uid_e2: '',
            estado: '',
            res_e1: 0,
            res_e2: 0,
            escudo_e1: '',
            escudo_e2: '',
            nombre_e1: '',
            nombre_e2: '',
            puntose1: 0,
            pje1: 0,
            pge1: 0,
            pee1: 0,
            ppe1: 0,
            gfe1: 0,
            gce1: 0,
            dge1: 0,
            puntose2: 0,
            pje2: 0,
            pge2: 0,
            pee2: 0,
            ppe2: 0,
            gfe2: 0,
            gce2: 0,
            dge2: 0,
            penale1: 0,
            penale2:0,
            statuspen: 'no',
            update: 'outdated',
            estadio: '',
            ciudad: '',
            esquemae1: '',
            esquemae2: '',
            typematch: ''
          };
          this.presentLoading('Actualizando datos', 1500);
          // setTimeout(() => {
            this.router.navigate(['/tab-info-campeonato/page-encuentros-campeonato']);
          // }, 1000);
        }).catch(error => {
          console.log(error,'errpppppr');
        });

      }
    }
  }


  async  completardatos(update: string, uid: string, tipo: string){
    if(update === 'outdated'){
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Equipos';
    const pathp = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equipo1update = this.firestoreService.getgrupos<Equipos>(path, 'nombre', '==', this.encuentro.nombre_e1).subscribe(res => {
      if (res.length) {
        this.equipo1up = res[0];
        this.encuentro.puntose1 = this.equipo1up.puntos;
        this.encuentro.pje1 = this.equipo1up.p_j;
        this.encuentro.pge1 = this.equipo1up.p_g;
        this.encuentro.pee1 = this.equipo1up.p_e;
        this.encuentro.ppe1 = this.equipo1up.p_p;
        this.encuentro.gfe1 = this.equipo1up.g_f;
        this.encuentro.gce1 = this.equipo1up.g_c;
        this.encuentro.dge1 = this.equipo1up.d_g;
      };

        this.firestoreService.actualizarpartido(this.encuentro, pathp, uid).then(res => {
          this.equipo1up ={
            uid: '',
            nombre: '',
            escudo: '',
            grupo: '',
            puntos: 0,
            p_j: 0,
            p_g: 0,
            p_e: 0,
            p_p: 0,
            g_f: 0,
            g_c: 0,
            d_g: 0
        };
        });
        this.equipo1update.unsubscribe();
    });
    this.equipo2update= this.firestoreService.getgrupos<Equipos>(path, 'nombre', '==', this.encuentro.nombre_e2).subscribe(res => {
      if (res.length) {
        this.equipo2up = res[0];
        const up = 'update';
          this.encuentro.puntose2= this.equipo2up.puntos;
          this.encuentro.pje2= this.equipo2up.p_j;
          this.encuentro.pge2= this.equipo2up.p_g;
          this.encuentro.pee2= this.equipo2up.p_e;
          this.encuentro.ppe2= this.equipo2up.p_p;
          this.encuentro.gfe2= this.equipo2up.g_f;
          this.encuentro.gce2= this.equipo2up.g_c;
          this.encuentro.dge2= this.equipo2up.d_g;
          this.encuentro.update = 'update';

        this.firestoreService.actualizarpartido(this.encuentro, pathp, uid).then(res => {
          this.equipo2up ={
            uid: '',
            nombre: '',
            escudo: '',
            grupo: '',
            puntos: 0,
            p_j: 0,
            p_g: 0,
            p_e: 0,
            p_p: 0,
            g_f: 0,
            g_c: 0,
            d_g: 0
          };
        });
        this.equipo2update.unsubscribe();
      }
    });

}else if(update === 'update'){

    }
  }


  async deleteMatch() {
    const path = 'Campeonatos/'+this.infocampeonato.uid+'/Partidos';
    this.firestoreService.deletepartido(path, this.encuentro.uid).then(res => {
      this.presentLoading('Eliminando', 1500);
      setTimeout(() => {
        this.router.navigate(['/tab-info-campeonato/page-encuentros-campeonato']);
      }, 1000);
    }).catch(error => {
      console.log(error);
    });
    this.restart();
  }




  async restart() {
    this.router.navigate(['/tab-info-campeonato/page-encuentros-campeonato']);

    this.encuentro = {
      uid: null,
      tipo: null,
      fechae: null,
      fecha: null,
      numero: 0,
      grupo: null,
      uid_e1: null,
      uid_e2: null,
      estado: 'iniciado',
      res_e1: 0,
      res_e2: 0,
      escudo_e1: null,
      escudo_e2: null,
      nombre_e1: null,
      nombre_e2: null,
      puntose1: 0,
      pje1: 0,
      pge1: 0,
      pee1: 0,
      ppe1: 0,
      gfe1: 0,
      gce1: 0,
      dge1: 0,
      puntose2: 0,
      pje2: 0,
      pge2: 0,
      pee2: 0,
      ppe2: 0,
      gfe2: 0,
      gce2: 0,
      dge2: 0,
      penale1: 0,
      penale2:0,
      statuspen: 'no',
      update: 'outdated',
      estadio: '',
      ciudad: '',
      esquemae1: '',
      esquemae2: '',
      typematch: ''
    };

    this.infocampeonato = {
    uid: '',
    nombre: '',
    fecha: null,
    tipo: '',
    lugar: '',
    estado: 'iniciado',
    grupos: 0,
    fases: 0,
    init: '',
    };
  console.log(this.encuentro);
  }



  async presentToast(mensaje: string, tiempo: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: tiempo,
      position: 'middle'
    });
    toast.present();
  }

  async presentLoading(mensaje: string, tiempo: number) {
    const loading = await this.loadingController.create({
      message: mensaje,
      duration: tiempo
    });
    await loading.present();
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
