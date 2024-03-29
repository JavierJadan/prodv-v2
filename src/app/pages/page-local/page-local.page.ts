import { Component, OnInit } from '@angular/core';
import { Campeonatos } from 'src/app/models';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Encuentro, Equipos } from 'src/app/models';
import { MenuController } from '@ionic/angular';
import {
  AdMob,
  AdMobRewardItem,
  AdOptions,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
  RewardAdOptions,
  RewardAdPluginEvents,
} from '@capacitor-community/admob';
import { isPlatform } from '@ionic/angular';


@Component({
  selector: 'app-page-local',
  templateUrl: './page-local.page.html',
  styleUrls: ['./page-local.page.scss'],
})
export class PageLocalPage implements OnInit {

  equipoInfo: Subscription;
  equiposInfo: Subscription;
  relampago = false;
  campeonatos: Campeonatos[] = [];
  genef: Encuentro[] = [];
  gene: Encuentro[] = [];
  geneinit: Encuentro[] = [];
  grupo1: Encuentro[] = [];
  grupo2: Encuentro[] = [];
  grupo3: Encuentro[] = [];
  grupo4: Encuentro[] = [];
  grupo5: Encuentro[] = [];
  grupo6: Encuentro[] = [];
  grupo7: Encuentro[] = [];
  grupo8: Encuentro[] = [];
  grupo9: Encuentro[] = [];
  grupo10: Encuentro[] = [];
  grupoinit1: Encuentro[] = [];
  grupoinit2: Encuentro[] = [];
  grupoinit3: Encuentro[] = [];
  grupoinit4: Encuentro[] = [];
  grupoinit5: Encuentro[] = [];
  grupoinit6: Encuentro[] = [];
  grupoinit7: Encuentro[] = [];
  grupoinit8: Encuentro[] = [];
  grupoinit9: Encuentro[] = [];
  grupoinit10: Encuentro[] = [];
  grupof1: Encuentro[] = [];
  grupof2: Encuentro[] = [];
  grupof3: Encuentro[] = [];
  grupof4: Encuentro[] = [];
  grupof5: Encuentro[] = [];
  grupof6: Encuentro[] = [];
  grupof7: Encuentro[] = [];
  grupof8: Encuentro[] = [];
  grupof9: Encuentro[] = [];
  grupof10: Encuentro[] = [];
  geneida: Encuentro[] = [];
  geneidainit: Encuentro[] = [];
  geneidaf: Encuentro[] = [];
  genevuel: Encuentro[] = [];
  genevuelinit: Encuentro[] = [];
  genevuelf: Encuentro[] = [];


  cuarto = false;
  semis = false;
  fina = false;
  fases = false;
  ida = false;
  vuelta = false;
  descenso = false;
  opcion = '';
  opcion2 = '';
  titulo = '';
  gru1 = false;
  gru2 = false;
  gru3 = false;
  gru4 = false;
  gru5 = false;
  gru6 = false;
  gru7 = false;
  gru8 = false;
  gru9 = false;
  gru10 = false;
  antsig = false;
  isActiveM1 = false;
  isActiveM2 = false;
  fase = '';
  numero = 0;


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


  encuentro: Encuentro = {
    uid: '',
    tipo: '',
    fechae: '',
    numero: 0,
    fecha: null,
    grupo: '',
    uid_e1: '',
    uid_e2: '',
    estado: 'iniciado',
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
    penale2: 0,
    statuspen: 'no',
    update: 'outdated',
    estadio: '',
    ciudad: '',
    esquemae1: '',
    esquemae2: '',
    typematch: ''
  };


  // Tabla

  grupoE1: Equipos[] = [];
  grupoE2: Equipos[] = [];
  grupoE3: Equipos[] = [];
  grupoE4: Equipos[] = [];
  grupoE5: Equipos[] = [];
  grupoE6: Equipos[] = [];
  grupoE7: Equipos[] = [];
  grupoE8: Equipos[] = [];
  grupoE9: Equipos[] = [];
  grupoE10: Equipos[] = [];
  descensoE: Equipos[] = [];


  grup1 = false;
  grup2 = false;
  grup3 = false;
  grup4 = false;
  grup5 = false;
  grup6 = false;
  grup7 = false;
  grup8 = false;
  grup9 = false;
  grup10 = false;
  des = false;
  isActivePublicidad = true;

  constructor(public firestoreService: FirestoreService,
    public alertController: AlertController,
    public menuL: MenuController) {
    // this.initialize();
  }

  ngOnInit() {
    this.menuL.enable(false);
    this.opcion = 'Partidos';
    this.opcion2 = 'Clasificacion';
    this.isActiveM1 = true;
    this.getCampeonatos();
    const campeonatod = this.firestoreService.getCampeonato();
    console.log(campeonatod);

    // if (campeonatod == undefined) {
    //   this.infocampeonato.uid = '3BuPLlNAQ7yA4yo8Karg';
    //   this.infocampeonato.nombre = 'Copa Gualaquiza';
    // } else {
    //   this.infocampeonato = campeonatod;
    // }
    // this.getPartidos(this.infocampeonato.uid);

    this.opcion2 = 'clasificacion';
  }



  //codigo para publicidad

  async initialize() {
    const { status } = await AdMob.trackingAuthorizationStatus();
    console.log(status);
    if (status === 'notDetermined') {
      console.log('Display information before ads load first time');
    }
    AdMob.initialize({
      requestTrackingAuthorization: false,
      // testingDevices: ['YOURTESTDEVICECODE'],
      initializeForTesting: false,
    });
  }

  // async showBanner() {
  //   const adId = isPlatform('ios') ? 'ca-app-pub-5567251641138923/4617221021' : 'ca-app-pub-5567251641138923/3143918917';
  //   const options: BannerAdOptions = {
  //     adId,
  //     adSize: BannerAdSize.ADAPTIVE_BANNER,
  //     position: BannerAdPosition.TOP_CENTER,
  //     margin: 0,
  //     isTesting: false,
  //     // The default behavior of the Google Mobile Ads SDK is to serve personalized ads.
  //     // Set this to true to request Non-Personalized Ads
  //     // npa: true
  //   };
  //   await AdMob.showBanner(options);
  // }
  ///

  async showRewardVideo() {
    AdMob.addListener(
      RewardAdPluginEvents.Rewarded,
      (reward: AdMobRewardItem) => {
        // Give the reward!
        console.log('REWARD: ', reward);
      }
    );
    const options: RewardAdOptions = {
      adId: isPlatform('ios') ? 'ca-app-pub-5567251641138923/3326349999' : 'ca-app-pub-5567251641138923/8705835032',
      isTesting: false,
      // npa: true
      // ssv: { ... }
    };

    await AdMob.prepareRewardVideoAd(options);
    await AdMob.showRewardVideoAd();
  }


  changeSegment(event: any) {

    if (this.opcion === 'Partidos' && this.isActivePublicidad) {
      this.showRewardVideo();
      this.isActivePublicidad = false;
    }

    const opc = event.detail.value;
    console.log(opc);
    this.opcion = opc;
    console.log(this.opcion);
    (this.opcion == 'Clasificacion') ? this.isActiveM2 = true : this.isActiveM2 = false;
    (this.opcion == 'Partidos') ? this.isActiveM1 = true : this.isActiveM1 = false;

  }
  changeSegment2(event: any) {
    const opc = event.detail.value;
    console.log(opc);
    this.opcion2 = opc;
  }

  getCampeonatos() {
    const path = 'Campeonatos';
    this.equipoInfo = this.firestoreService.getTeamfecha<Campeonatos>(path).subscribe(res => {
      this.campeonatos = res;
      console.log(this.campeonatos);
      if (res.length) {

        this.infocampeonato = res[0];
        console.log(this.infocampeonato);
        this.getPartidos(this.infocampeonato.uid);
        this.getGrupo1(this.infocampeonato.uid);
        this.getGrupo2(this.infocampeonato.uid);
        this.getGrupo3(this.infocampeonato.uid);
        this.getGrupo4(this.infocampeonato.uid);
        this.getGrupo5(this.infocampeonato.uid);
        this.getGrupo6(this.infocampeonato.uid);
        this.getGrupo7(this.infocampeonato.uid);
        this.getGrupo8(this.infocampeonato.uid);
        this.getGrupo9(this.infocampeonato.uid);
        this.getGrupo10(this.infocampeonato.uid);
        this.getDescenso(this.infocampeonato.uid);
        if(this.infocampeonato.tipo==='Relampago'){
          this.relampago=true;
        }else{
          this.relampago=false;
        }

      }
    });

  }

  segment(event: any) {
    const option = event.detail.value;
    console.log(option);
    // this.opciong = option;

    this.limpiar();
  }

  async limpiar() {

    this.antsig = false;
    this.titulo = '';
    this.gru1 = false;
    this.gru2 = false;
    this.gru3 = false;
    this.gru4 = false;
    this.gru5 = false;
    this.gru6 = false;
    this.gru7 = false;
    this.gru8 = false;
    this.gru9 = false;
    this.gru10 = false;
    this.ida = false;
    this.vuelta = false;
    this.gene = [];
    this.genef = [];
    this.geneinit = [];
    this.geneida = [];
    this.geneidainit = [];
    this.geneidaf = [];
    this.genevuel = [];
    this.genevuelinit = [];
    this.genevuelf = [];
    this.grupo1 = [];
    this.grupo2 = [];
    this.grupo3 = [];
    this.grupo4 = [];
    this.grupo5 = [];
    this.grupo6 = [];
    this.grupo7 = [];
    this.grupo8 = [];
    this.grupo9 = [];
    this.grupo10 = [];
    this.grupof1 = [];
    this.grupof2 = [];
    this.grupof3 = [];
    this.grupof4 = [];
    this.grupof5 = [];
    this.grupof6 = [];
    this.grupof7 = [];
    this.grupof8 = [];
    this.grupof9 = [];
    this.grupof10 = [];
    this.grupoinit1 = [];
    this.grupoinit2 = [];
    this.grupoinit3 = [];
    this.grupoinit4 = [];
    this.grupoinit5 = [];
    this.grupoinit6 = [];
    this.grupoinit7 = [];
    this.grupoinit8 = [];
    this.grupoinit9 = [];
    this.grupoinit10 = [];

    this.grupoE1 = [];
    this.grupoE2 = [];
    this.grupoE3 = [];
    this.grupoE4 = [];
    this.grupoE5 = [];
    this.grupoE6 = [];
    this.grupoE7 = [];
    this.grupoE8 = [];
    this.grupoE9 = [];
    this.grupoE10 = [];
    this.descensoE = [];
    this.grup1 = false;
    this.grup2 = false;
    this.grup3 = false;
    this.grup4 = false;
    this.grup5 = false;
    this.grup6 = false;
    this.grup7 = false;
    this.grup8 = false;
    this.grup9 = false;
    this.grup10 = false;
    this.des = false;



  }

  async getCampeonato(campeonato: Campeonatos) {
    console.log('Click en getEquipo');
    this.relampago=false;
    this.numero=0;
    this.opcion='Partidos'
    console.log(campeonato);
    this.firestoreService.setCampeonato(campeonato);

    const campeonatod = this.firestoreService.getCampeonato();
    if (campeonatod !== undefined) {
      this.infocampeonato = campeonatod;
    }
    console.log(this.infocampeonato);
    this.getPartidos(this.infocampeonato.uid);
    this.getGrupo1(this.infocampeonato.uid);
    this.getGrupo2(this.infocampeonato.uid);
    this.getGrupo3(this.infocampeonato.uid);
    this.getGrupo4(this.infocampeonato.uid);
    this.getGrupo5(this.infocampeonato.uid);
    this.getGrupo6(this.infocampeonato.uid);
    this.getGrupo7(this.infocampeonato.uid);
    this.getGrupo8(this.infocampeonato.uid);
    this.getGrupo9(this.infocampeonato.uid);
    this.getGrupo10(this.infocampeonato.uid);
    this.getDescenso(this.infocampeonato.uid);
    if(this.infocampeonato.tipo==='Relampago'){
      this.relampago=true;
    }else{
      this.relampago=false;
    }

  }

  async getPartidos(uid: string) {
    const path = 'Campeonatos/' + uid + '/Partidos';
    this.equiposInfo = this.firestoreService.getPartidos<Encuentro>(path).subscribe(res => {
      if (res.length) {
        this.antsig = true;
      } else {
        this.antsig = false;
      }
      this.encuentro = res[0];
      if (this.encuentro.fechae === 'ida' || this.encuentro.fechae === 'vuelta' || this.encuentro.fechae === 'unico') {
        this.titulo = this.encuentro.tipo;
      } else {
        this.titulo = this.encuentro.fechae;
      }
      this.numero = this.encuentro.numero;
      this.fase = this.encuentro.fechae;

      if (this.fase === 'ida' || this.fase === 'vuelta' || this.fase === 'unico') {
        this.prueba(this.encuentro.tipo);
        this.pruebafina(this.encuentro.tipo);
        this.partidos_init(this.encuentro.tipo);
        this.partidos_ida_vuel_E(this.encuentro.tipo);
        this.partidos_ida_vuel_init(this.encuentro.tipo);
        this.partidos_ida_vuel_fina(this.encuentro.tipo);
      } else {
        this.gene = [];
        this.gruposfinalizados(this.fase);
        this.grupos(this.fase);
        this.partidos_init_fases(this.fase);
      }



    });

  }

  async prueba(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.getCollection<Encuentro>(path, 'tipo', '==', tipo, 'unico').subscribe(res => {
      this.gene = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.gru1 = false;
      this.gru2 = false;
    });
  }
  async partidos_init(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.getpartidos_init<Encuentro>(path, 'tipo', '==', tipo, 'unico').subscribe(res => {
      this.geneinit = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.gru1 = false;
      this.gru2 = false;
    });

  }
  async pruebafina(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.getCollectionfinalizados<Encuentro>(path, 'tipo', '==', tipo, 'unico').subscribe(res => {
      this.genef = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.gru1 = false;
      this.gru2 = false;
    });
  }

  async grupos(fase: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 1', fase).subscribe(res => {
      this.grupo1 = res;
      if (res.length) {
        this.gru1 = true;
      } else {
        // this.gru1=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 2', fase).subscribe(res => {
      this.grupo2 = res;
      if (res.length) {
        this.gru2 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 3', fase).subscribe(res => {
      this.grupo3 = res;
      if (res.length) {
        this.gru3 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 4', fase).subscribe(res => {
      this.grupo4 = res;
      if (res.length) {
        this.gru4 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 5', fase).subscribe(res => {
      this.grupo5 = res;
      if (res.length) {
        this.gru5 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 6', fase).subscribe(res => {
      this.grupo6 = res;
      if (res.length) {
        this.gru6 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 7', fase).subscribe(res => {
      this.grupo7 = res;
      if (res.length) {
        this.gru7 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 8', fase).subscribe(res => {
      this.grupo8 = res;
      if (res.length) {
        this.gru8 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 9', fase).subscribe(res => {
      this.grupo9 = res;
      if (res.length) {
        this.gru9 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 10', fase).subscribe(res => {
      this.grupo10 = res;
      if (res.length) {
        this.gru10 = true;
      } else {
        // this.gru2=false;
      }
    });



  }
  async gruposfinalizados(fase: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.firestoreService.getCollectiongruposfinalizados<Encuentro>(path, 'grupo', '==', 'Grupo 1', fase).subscribe(res => {
      this.grupof1 = res;
      if (res.length) {
        this.gru1 = true;
      } else {
        // this.gru1=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<Encuentro>(path, 'grupo', '==', 'Grupo 2', fase).subscribe(res => {
      this.grupof2 = res;
      if (res.length) {
        this.gru2 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<Encuentro>(path, 'grupo', '==', 'Grupo 3', fase).subscribe(res => {
      this.grupof3 = res;
      if (res.length) {
        this.gru3 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<Encuentro>(path, 'grupo', '==', 'Grupo 4', fase).subscribe(res => {
      this.grupof4 = res;
      if (res.length) {
        this.gru4 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<Encuentro>(path, 'grupo', '==', 'Grupo 5', fase).subscribe(res => {
      this.grupof5 = res;
      if (res.length) {
        this.gru5 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<Encuentro>(path, 'grupo', '==', 'Grupo 6', fase).subscribe(res => {
      this.grupof6 = res;
      if (res.length) {
        this.gru6 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<Encuentro>(path, 'grupo', '==', 'Grupo 7', fase).subscribe(res => {
      this.grupof7 = res;
      if (res.length) {
        this.gru7 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<Encuentro>(path, 'grupo', '==', 'Grupo 8', fase).subscribe(res => {
      this.grupof8 = res;
      if (res.length) {
        this.gru8 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<Encuentro>(path, 'grupo', '==', 'Grupo 9', fase).subscribe(res => {
      this.grupof9 = res;
      if (res.length) {
        this.gru9 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongruposfinalizados<Encuentro>(path, 'grupo', '==', 'Grupo 10', fase).subscribe(res => {
      this.grupof10 = res;
      if (res.length) {
        this.gru10 = true;
      } else {
        // this.gru2=false;
      }
    });


  }
  async partidos_init_fases(fase: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.firestoreService.getgruposinit<Encuentro>(path, 'grupo', '==', 'Grupo 1', fase).subscribe(res => {
      this.grupoinit1 = res;
      if (res.length) {
        this.gru1 = true;
      } else {
        // this.gru1=false;
      }
    });

    this.firestoreService.getgruposinit<Encuentro>(path, 'grupo', '==', 'Grupo 2', fase).subscribe(res => {
      this.grupoinit2 = res;
      if (res.length) {
        this.gru2 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<Encuentro>(path, 'grupo', '==', 'Grupo 3', fase).subscribe(res => {
      this.grupoinit3 = res;
      if (res.length) {
        this.gru3 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<Encuentro>(path, 'grupo', '==', 'Grupo 4', fase).subscribe(res => {
      this.grupoinit4 = res;
      if (res.length) {
        this.gru4 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<Encuentro>(path, 'grupo', '==', 'Grupo 5', fase).subscribe(res => {
      this.grupoinit5 = res;
      if (res.length) {
        this.gru5 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<Encuentro>(path, 'grupo', '==', 'Grupo 6', fase).subscribe(res => {
      this.grupoinit6 = res;
      if (res.length) {
        this.gru6 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<Encuentro>(path, 'grupo', '==', 'Grupo 7', fase).subscribe(res => {
      this.grupoinit7 = res;
      if (res.length) {
        this.gru7 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<Encuentro>(path, 'grupo', '==', 'Grupo 8', fase).subscribe(res => {
      this.grupoinit8 = res;
      if (res.length) {
        this.gru8 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<Encuentro>(path, 'grupo', '==', 'Grupo 9', fase).subscribe(res => {
      this.grupoinit9 = res;
      if (res.length) {
        this.gru9 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getgruposinit<Encuentro>(path, 'grupo', '==', 'Grupo 10', fase).subscribe(res => {
      this.grupoinit10 = res;
      if (res.length) {
        this.gru10 = true;
      } else {
        // this.gru2=false;
      }
    });



  }

  async partidos_ida_vuel_E(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_E<Encuentro>(path, 'tipo', '==', tipo, 'ida').subscribe(res => {
      this.geneida = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      if (res.length) {
        this.ida = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_E<Encuentro>(path, 'tipo', '==', tipo, 'vuelta').subscribe(res => {
      this.genevuel = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupoinit1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.vuelta = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });

  }


  async partidos_ida_vuel_init(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Init<Encuentro>(path, 'tipo', '==', tipo, 'ida').subscribe(res => {
      this.geneidainit = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.ida = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Init<Encuentro>(path, 'tipo', '==', tipo, 'vuelta')
      .subscribe(res => {
        this.genevuelinit = res;
        this.grupo1 = [];
        this.grupo2 = [];
        this.grupof1 = [];
        this.grupof2 = [];
        if (res.length) {
          this.vuelta = true;
        }
        this.gru1 = false;
        this.gru2 = false;
      });

  }


  async partidos_ida_vuel_fina(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Fina<Encuentro>(path, 'tipo', '==', tipo, 'ida').subscribe(res => {
      this.geneidaf = res;
      this.grupo1 = [];
      this.grupo2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      if (res.length) {
        this.ida = true;
      }
      this.gru1 = false;
      this.gru2 = false;
    });
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_Fina<Encuentro>(path, 'tipo', '==', tipo, 'vuelta')
      .subscribe(res => {
        this.genevuelf = res;
        this.grupo1 = [];
        this.grupo2 = [];
        this.grupof1 = [];
        this.grupof2 = [];
        if (res.length) {
          this.vuelta = true;
        }
        this.gru1 = false;
        this.gru2 = false;
      });

  }


  async anterior() {

    if (this.numero > 1) {

      this.numero = this.numero - 1;

    }

    console.log(this.numero);

    if (this.numero >= 1 && this.numero <= this.infocampeonato.fases) {
      this.titulo = 'Fecha ' + this.numero;
      this.grupos('Fecha ' + this.numero);
      this.gruposfinalizados('Fecha ' + this.numero);
      this.partidos_init_fases('Fecha ' + this.numero);
      this.gene = [];
      this.genef = [];
      this.geneinit = [];
      this.geneida = [];
      this.geneidainit = [];
      this.geneidaf = [];
      this.genevuel = [];
      this.genevuelinit = [];
      this.genevuelf = [];
      this.gru1 = false;
      this.gru2 = false;
      this.gru3 = false;
      this.gru4 = false;
      this.gru5 = false;
      this.gru6 = false;
      this.gru7 = false;
      this.gru8 = false;
      this.gru9 = false;
      this.gru10 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero === this.infocampeonato.fases + 1) {

      this.titulo = 'Descenso';
      this.prueba('Descenso');
      this.pruebafina('Descenso');
      this.partidos_init('Descenso');

      this.geneida = [];
      this.geneidainit = [];
      this.geneidaf = [];
      this.genevuel = [];
      this.genevuelinit = [];
      this.genevuelf = [];
      this.limpiargrupos();

    } else if (this.numero === this.infocampeonato.fases + 2) {
      this.titulo = 'Cuartos de final';
      this.prueba('Cuartos de final');
      this.pruebafina('Cuartos de final');
      this.partidos_init('Cuartos de final');
      this.partidos_ida_vuel_E('Cuartos de final');
      this.partidos_ida_vuel_init('Cuartos de final');
      this.partidos_ida_vuel_fina('Cuartos de final');
      this.limpiargrupos();
    } else if (this.numero === this.infocampeonato.fases + 3) {
      this.titulo = 'Semifinal';
      this.prueba('Semifinal');
      this.pruebafina('Semifinal');
      this.partidos_init('Semifinal');
      this.partidos_ida_vuel_E('Semifinal');
      this.partidos_ida_vuel_init('Semifinal');
      this.partidos_ida_vuel_fina('Semifinal');
      this.limpiargrupos();
    } else if (this.numero === this.infocampeonato.fases + 4) {
      this.titulo = 'Tercero y Cuarto';
      this.prueba('Tercero y Cuarto');
      this.pruebafina('Tercero y Cuarto');
      this.partidos_init('Tercero y Cuarto');
      this.partidos_ida_vuel_E('Tercero y Cuarto');
      this.partidos_ida_vuel_init('Tercero y Cuarto');
      this.partidos_ida_vuel_fina('Tercero y Cuarto');
      this.limpiargrupos();
    } else if (this.numero === this.infocampeonato.fases + 5) {
      this.titulo = 'Final';
      this.prueba('Final');
      this.pruebafina('Final');
      this.partidos_init('Final');
      this.partidos_ida_vuel_E('Final');
      this.partidos_ida_vuel_init('Final');
      this.partidos_ida_vuel_fina('Final');
      this.limpiargrupos();
    }
  }

  async siguiente() {
    if (this.numero < this.infocampeonato.fases + 5) {

      this.numero = this.numero + 1;

    }

    console.log(this.numero);
    if (this.numero >= 1 && this.numero <= this.infocampeonato.fases) {
      this.titulo = 'Fecha ' + this.numero;
      this.grupos('Fecha ' + this.numero);
      this.gruposfinalizados('Fecha ' + this.numero);
      this.partidos_init_fases('Fecha ' + this.numero);
      this.gene = [];
      this.genef = [];
      this.geneinit = [];
      this.geneida = [];
      this.geneidainit = [];
      this.geneidaf = [];
      this.genevuel = [];
      this.genevuelinit = [];
      this.genevuelf = [];
      this.gru1 = false;
      this.gru2 = false;
      this.gru3 = false;
      this.gru4 = false;
      this.gru5 = false;
      this.gru6 = false;
      this.gru7 = false;
      this.gru8 = false;
      this.gru9 = false;
      this.gru10 = false;
      this.ida = false;
      this.vuelta = false;
    } else if (this.numero === this.infocampeonato.fases + 1) {

      this.titulo = 'Descenso';
      this.prueba('Descenso');
      this.pruebafina('Descenso');
      this.partidos_init('Descenso');
      this.limpiargrupos();
      this.geneida = [];
      this.geneidainit = [];
      this.geneidaf = [];
      this.genevuel = [];
      this.genevuelinit = [];
      this.genevuelf = [];


    } else if (this.numero === this.infocampeonato.fases + 2) {
      this.titulo = 'Cuartos de final';
      this.prueba('Cuartos de final');
      this.pruebafina('Cuartos de final');
      this.partidos_init('Cuartos de final');
      this.partidos_ida_vuel_E('Cuartos de final');
      this.partidos_ida_vuel_init('Cuartos de final');
      this.partidos_ida_vuel_fina('Cuartos de final');
      this.limpiargrupos();
    } else if (this.numero === this.infocampeonato.fases + 3) {
      this.titulo = 'Semifinal';
      this.prueba('Semifinal');
      this.pruebafina('Semifinal');
      this.partidos_init('Semifinal');
      this.partidos_ida_vuel_E('Semifinal');
      this.partidos_ida_vuel_init('Semifinal');
      this.partidos_ida_vuel_fina('Semifinal');
      this.limpiargrupos();
    } else if (this.numero === this.infocampeonato.fases + 4) {
      this.titulo = 'Tercero y Cuarto';
      this.prueba('Tercero y Cuarto');
      this.pruebafina('Tercero y Cuarto');
      this.partidos_init('Tercero y Cuarto');
      this.partidos_ida_vuel_E('Tercero y Cuarto');
      this.partidos_ida_vuel_init('Tercero y Cuarto');
      this.partidos_ida_vuel_fina('Tercero y Cuarto');
      this.limpiargrupos();
    } else if (this.numero === this.infocampeonato.fases + 5) {
      this.titulo = 'Final';
      this.prueba('Final');
      this.pruebafina('Final');
      this.partidos_init('Final');
      this.partidos_ida_vuel_E('Final');
      this.partidos_ida_vuel_init('Final');
      this.partidos_ida_vuel_fina('Final');
      this.limpiargrupos();
    }
  }

  async anteriorrelampago() {

    if (this.infocampeonato.init !== this.titulo) {
      if (this.numero >= 1) {
        console.log('numero es '+this.numero);
        this.numero = this.numero - 1;
        if (this.numero === 1) {
          this.titulo = 'Dieciseisavos';
          this.prueba('Dieciseisavos');
          this.pruebafina('Dieciseisavos');
          this.partidos_init('Dieciseisavos');
          this.partidos_ida_vuel_E('Dieciseisavos');
          this.partidos_ida_vuel_init('Dieciseisavos');
          this.partidos_ida_vuel_fina('Dieciseisavos');
          this.limpiargrupos();
        } if (this.numero === 2) {
          this.titulo = 'Octavos';
          this.prueba('Octavos');
          this.pruebafina('Octavos');
          this.partidos_init('Octavos');
          this.partidos_ida_vuel_E('Octavos');
          this.partidos_ida_vuel_init('Octavos');
          this.partidos_ida_vuel_fina('Octavos');
          this.limpiargrupos();

        } else if (this.numero === 3) {
          this.titulo = 'Cuartos';
          this.prueba('Cuartos');
          this.pruebafina('Cuartos');
          this.partidos_init('Cuartos');
          this.partidos_ida_vuel_E('Cuartos');
          this.partidos_ida_vuel_init('Cuartos');
          this.partidos_ida_vuel_fina('Cuartos');
          this.limpiargrupos();
        } else if (this.numero === 4) {
          this.titulo = 'Semifinal';
          this.prueba('Semifinal');
          this.pruebafina('Semifinal');
          this.partidos_init('Semifinal');
          this.partidos_ida_vuel_E('Semifinal');
          this.partidos_ida_vuel_init('Semifinal');
          this.partidos_ida_vuel_fina('Semifinal');
          this.limpiargrupos();
        } else if (this.numero === 5) {
          this.titulo = 'Tercero y Cuarto';
          this.prueba('Tercero y Cuarto');
          this.pruebafina('Tercero y Cuarto');
          this.partidos_init('Tercero y Cuarto');
          this.partidos_ida_vuel_E('Tercero y Cuarto');
          this.partidos_ida_vuel_init('Tercero y Cuarto');
          this.partidos_ida_vuel_fina('Tercero y Cuarto');
          this.limpiargrupos();
        } else if (this.numero === 6) {
          this.titulo = 'Final';
          this.prueba('Final');
          this.pruebafina('Final');
          this.partidos_init('Final');
          this.partidos_ida_vuel_E('Final');
          this.partidos_ida_vuel_init('Final');
          this.partidos_ida_vuel_fina('Final');
          this.limpiargrupos();
        }
      }
    }

  }
  async siguienterelampago() {

    if (this.numero <= 6) {
      this.numero = this.numero + 1;
      if (this.numero === 1) {
        this.titulo = 'Dieciseisavos';
        this.prueba('Dieciseisavos');
        this.pruebafina('Dieciseisavos');
        this.partidos_init('Dieciseisavos');
        this.partidos_ida_vuel_E('Dieciseisavos');
        this.partidos_ida_vuel_init('Dieciseisavos');
        this.partidos_ida_vuel_fina('Dieciseisavos');
        this.limpiargrupos();
      } else if (this.numero === 2) {
        this.titulo = 'Octavos';
        this.prueba('Octavos');
        this.pruebafina('Octavos');
        this.partidos_init('Octavos');
        this.partidos_ida_vuel_E('Octavos');
        this.partidos_ida_vuel_init('Octavos');
        this.partidos_ida_vuel_fina('Octavos');
        this.limpiargrupos();

      } else if (this.numero === 3) {
        this.titulo = 'Cuartos';
        this.prueba('Cuartos');
        this.pruebafina('Cuartos');
        this.partidos_init('Cuartos');
        this.partidos_ida_vuel_E('Cuartos');
        this.partidos_ida_vuel_init('Cuartos');
        this.partidos_ida_vuel_fina('Cuartos');
        this.limpiargrupos();

      } else if (this.numero === 4) {
        this.titulo = 'Semifinal';
        this.prueba('Semifinal');
        this.pruebafina('Semifinal');
        this.partidos_init('Semifinal');
        this.partidos_ida_vuel_E('Semifinal');
        this.partidos_ida_vuel_init('Semifinal');
        this.partidos_ida_vuel_fina('Semifinal');
        this.limpiargrupos();

      } else if (this.numero === 5) {
        this.titulo = 'Tercero y Cuarto';
        this.prueba('Tercero y Cuarto');
        this.pruebafina('Tercero y Cuarto');
        this.partidos_init('Tercero y Cuarto');
        this.partidos_ida_vuel_E('Tercero y Cuarto');
        this.partidos_ida_vuel_init('Tercero y Cuarto');
        this.partidos_ida_vuel_fina('Tercero y Cuarto');
        this.limpiargrupos();
      } else if (this.numero === 6) {
        this.titulo = 'Final';
        this.prueba('Final');
        this.pruebafina('Final');
        this.partidos_init('Final');
        this.partidos_ida_vuel_E('Final');
        this.partidos_ida_vuel_init('Final');
        this.partidos_ida_vuel_fina('Final');
        this.limpiargrupos();

      }
    }

  }

  async limpiargrupos() {
    this.grupoinit1 = [];
    this.grupoinit2 = [];
    this.grupoinit3 = [];
    this.grupoinit4 = [];
    this.grupoinit5 = [];
    this.grupoinit5 = [];
    this.grupoinit7 = [];
    this.grupoinit8 = [];
    this.grupoinit9 = [];
    this.grupoinit10 = [];

    this.grupo1 = [];
    this.grupo2 = [];
    this.grupo3 = [];
    this.grupo4 = [];
    this.grupo5 = [];
    this.grupo6 = [];
    this.grupo7 = [];
    this.grupo8 = [];
    this.grupo9 = [];
    this.grupo10 = [];

    this.grupof1 = [];
    this.grupof2 = [];
    this.grupof3 = [];
    this.grupof4 = [];
    this.grupof5 = [];
    this.grupof6 = [];
    this.grupof7 = [];
    this.grupof8 = [];
    this.grupof9 = [];
    this.grupof10 = [];


    this.gru1 = false;
    this.gru2 = false;
    this.gru3 = false;
    this.gru4 = false;
    this.gru5 = false;
    this.gru6 = false;
    this.gru7 = false;
    this.gru8 = false;
    this.gru9 = false;
    this.gru10 = false;
    this.ida = false;
    this.vuelta = false;

  }

  // Tabla codigo

  async getGrupo1(uid: string) {
    const path = 'Campeonatos/' + uid + '/Equipos';
    this.firestoreService.getCollectionGru<Equipos>(path, 'grupo', '==', 'Grupo 1').subscribe(res => {
      this.grupoE1 = res;
      console.log(res);
      if (res.length) {
        this.grup1 = true;
      }

    });
  }

  async getDescenso(uid: string) {

    const path = 'Campeonatos/' + uid + '/Equipos';
    this.firestoreService.getCollectionGru<Equipos>(path, 'grupo', '==', 'Descenso').subscribe(res => {
      this.descensoE = res;
      console.log(res);
      if (res.length) {
        this.des = true;
      }

    });
  }



  async getGrupo2(uid: string) {
    const path = 'Campeonatos/' + uid + '/Equipos';
    this.firestoreService.getCollectionGru<Equipos>(path, 'grupo', '==', 'Grupo 2').subscribe(res => {
      this.grupoE2 = res;
      console.log(res);
      if (res.length) {
        this.grup2 = true;
      }

    });
  }

  async getGrupo3(uid: string) {
    const path = 'Campeonatos/' + uid + '/Equipos';
    this.firestoreService.getCollectionGru<Equipos>(path, 'grupo', '==', 'Grupo 3').subscribe(res => {
      this.grupoE3 = res;
      console.log(res);
      if (res.length) {
        this.grup3 = true;
      }
    });
  }

  async getGrupo4(uid: string) {
    const path = 'Campeonatos/' + uid + '/Equipos';
    this.firestoreService.getCollectionGru<Equipos>(path, 'grupo', '==', 'Grupo 4').subscribe(res => {
      this.grupoE4 = res;
      console.log(res);
      if (res.length) {
        this.grup4 = true;
      }
    });
  }
  async getGrupo5(uid: string) {
    const path = 'Campeonatos/' + uid + '/Equipos';
    this.firestoreService.getCollectionGru<Equipos>(path, 'grupo', '==', 'Grupo 5').subscribe(res => {
      this.grupoE5 = res;
      console.log(res);
      if (res.length) {
        this.grup5 = true;
      }
    });
  }
  async getGrupo6(uid: string) {
    const path = 'Campeonatos/' + uid + '/Equipos';
    this.firestoreService.getCollectionGru<Equipos>(path, 'grupo', '==', 'Grupo 6').subscribe(res => {
      this.grupoE6 = res;
      console.log(res);
      if (res.length) {
        this.grup6 = true;
      }
    });
  }
  async getGrupo7(uid: string) {
    const path = 'Campeonatos/' + uid + '/Equipos';
    this.firestoreService.getCollectionGru<Equipos>(path, 'grupo', '==', 'Grupo 7').subscribe(res => {
      this.grupoE7 = res;
      console.log(res);
      if (res.length) {
        this.grup7 = true;
      }
    });
  }
  async getGrupo8(uid: string) {
    const path = 'Campeonatos/' + uid + '/Equipos';
    this.firestoreService.getCollectionGru<Equipos>(path, 'grupo', '==', 'Grupo 8').subscribe(res => {
      this.grupoE8 = res;
      console.log(res);
      if (res.length) {
        this.grup8 = true;
      }
    });
  }
  async getGrupo9(uid: string) {
    const path = 'Campeonatos/' + uid + '/Equipos';
    this.firestoreService.getCollectionGru<Equipos>(path, 'grupo', '==', 'Grupo 9').subscribe(res => {
      this.grupoE9 = res;
      console.log(res);
      if (res.length) {
        this.grup9 = true;
      }
    });
  }
  async getGrupo10(uid: string) {
    const path = 'Campeonatos/' + uid + '/Equipos';
    this.firestoreService.getCollectionGru<Equipos>(path, 'grupo', '==', 'Grupo 10').subscribe(res => {
      this.grupoE10 = res;
      console.log(res);
      if (res.length) {
        this.grup10 = true;
      }
    });
  }




}
