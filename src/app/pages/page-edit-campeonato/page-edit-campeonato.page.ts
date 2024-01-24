import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, AlertController, ToastController, IonDatetime } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Equipos, Campeonatos } from 'src/app/models';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-page-edit-campeonato',
  templateUrl: './page-edit-campeonato.page.html',
  styleUrls: ['./page-edit-campeonato.page.scss'],
})
export class PageEditCampeonatoPage implements OnInit {

  eliminar=false;
  grupos=false;
  uid='';
  relampago=false;
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
  showPicker = false;
  dateValue = format(new Date(), 'yyy-MM-dd') + 'T09:00:00.000Z';
  formatedString = '';
  @ViewChild(IonDatetime) datetime: IonDatetime;
  constructor(public firestoreService: FirestoreService,
    public firebaseauth: FirebaseauthService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public router: Router) {
    this.firebaseauth.stateAuth().subscribe(res => {
      if (res != null) {
        this.uid = res.uid;
        console.log(this.uid);

      if(this.uid === '5wDUdu2vCvapam5cGLAU95hrBn32'){
        this.eliminar=true;
      }else{
        this.eliminar=false;
      }
      }else {
        console.log(this.uid);
      }
      });

    }

  ngOnInit() {
    const campeonato = this.firestoreService.getCampeonato();
    if (campeonato !== undefined) {
      this.infocampeonato = campeonato;
      if(this.infocampeonato.tipo==='Relampago'){
        this.relampago=true;
      }else if(this.infocampeonato.tipo==='Fase de grupos'){
        this.relampago=false;
      }
    }
    console.log(this.infocampeonato);
  }
  close() {
    this.datetime.cancel(true);
  }

  select() {
    this.datetime.confirm(true);
  }

  dateChanged(value) {
    this.dateValue = value;
    this.formatedString = format(parseISO(value), 'HH:mm, MMM d, yyy');
    this.showPicker = false;
    this.infocampeonato.fecha = value;
    console.log(value);
  }

  async deleteCampeonato() {
    const path = 'Campeonatos/';
    this.firestoreService.deletepartido(path, this.infocampeonato.uid).then(res => {
      this.presentLoading('Eliminando', 1500);
      setTimeout(() => {
        this.router.navigate(['/page-create-campeonato']);
      }, 1000);
    }).catch(error => {
      console.log(error);
    });
  }

  async tipocam() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tipo de campeonato: ',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Fase de grupos',
          value: 'Fase de grupos',
          checked: false
        },
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Relampago',
          value: 'Relampago',
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            if (data === 'Fase de grupos') {
              this.grupos = true;
              this.infocampeonato.tipo = data;

            }else if (data === 'Relampago') {
              this.grupos = false;
              this.relampago=true;
              this.infocampeonato.tipo = data;

            }

          }

        }
      ]
    });
    await alert.present();
  }
  reset() {
    this.grupos = false;
    this.relampago =false;
    this.infocampeonato = {
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
    this.formatedString='';
  }

  async tipoinit(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Fase inicial: ',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Dieciseisavos',
          value: 'Dieciseisavos',
          checked: false
        },
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Octavos',
          value: 'Octavos',
          checked: false
        },
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Cuartos',
          value: 'Cuartos',
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            if (data === 'Dieciseisavos') {
              this.relampago = true;
              this.infocampeonato.init = data;
            }else if (data === 'Relampago') {
              this.relampago = false;
              this.infocampeonato.init = data;
            }else if(data === 'Relampago'){
              this.relampago = false;
              this.infocampeonato.init = data;

            }
          }
        }
      ]
    });
    await alert.present();
  }

  saveCampeonato() {
    console.log(this.infocampeonato);;
    if (this.infocampeonato.nombre === '') {
      this.presentToast('Complete el nombre del campeonato', 2000);
    } else if (this.infocampeonato.tipo === '') {
      this.presentToast('Selecione el tipo de campeonato', 2000);
    } else if (this.infocampeonato.tipo === 'Fase de grupos') {
      this.infocampeonato.init='';
      if (this.infocampeonato.grupos === 0) {
        this.presentToast('Especifique el numero de grupos', 2000);
      } else {
        const path = 'Campeonatos';
        // this.gruposnumero(this.infocampeonato.grupos, this.infocampeonato.uid);
        this.firestoreService.createDoc(this.infocampeonato, path, this.infocampeonato.uid).then(res => {
          this.presentLoading('Actualizando campeonato', 1500);


          this.infocampeonato = {
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

        }).catch(error => {
          console.log(error);
        });

      }


    } else if(this.infocampeonato.tipo==='Relampago'){
      if (this.infocampeonato.init === '') {
        this.presentToast('Especifique la fase inicial', 2000);
      } else {
        const path = 'Campeonatos';
        // this.gruposnumero(this.infocampeonato.grupos, this.infocampeonato.uid);
        this.firestoreService.createDoc(this.infocampeonato, path, this.infocampeonato.uid).then(res => {
          this.presentLoading('Actualizando campeonato', 1500);
          this.infocampeonato = {
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

        }).catch(error => {
          console.log(error);
        });

      }

    }

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
