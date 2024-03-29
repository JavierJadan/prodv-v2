import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LoadingController, IonDatetime, AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Equipos, Campeonatos, Encuentro, fase } from 'src/app/models';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-page-encuentros-campeonato',
  templateUrl: './page-encuentros-campeonato.page.html',
  styleUrls: ['./page-encuentros-campeonato.page.scss'],
})
export class PageEncuentrosCampeonatoPage implements OnInit {

  relampago = false;
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
  antsig = false;


  numerofases = [];
  numerogrupos = [];

  estado = false;
  grupo = false;
  grupo1 = false;
  grupo2 = false;
  gene = false;
  equiposInfo: Subscription;
  equipo1Info: Subscription;
  equipo2sInfo: Subscription;
  numero = 0;
  fecha = false;
  team1: Equipos[] = [];
  team2: Equipos[] = [];
  teamg: Equipos[] = [];
  teamrela: Equipos[] = [];
  teamd: Equipos[] = [];
  genee: Encuentro[] = [];
  genef: Encuentro[] = [];
  geneinit: Encuentro[] = [];
  geneida: Encuentro[] = [];
  geneidainit: Encuentro[] = [];
  geneidaf: Encuentro[] = [];
  genevuel: Encuentro[] = [];
  genevuelinit: Encuentro[] = [];
  genevuelf: Encuentro[] = [];

  grupoe1: Encuentro[] = [];
  grupoe2: Encuentro[] = [];
  grupoe3: Encuentro[] = [];
  grupoe4: Encuentro[] = [];
  grupoe5: Encuentro[] = [];
  grupoe6: Encuentro[] = [];
  grupoe7: Encuentro[] = [];
  grupoe8: Encuentro[] = [];
  grupoe9: Encuentro[] = [];
  grupoe10: Encuentro[] = [];
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

  fase = '';
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
  ida = false;
  vuelta = false;
  descenso = false;

  escudo1 = '';
  escudo2 = '';
  uid1 = '';
  uid2 = '';

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

  showPicker = false;
  dateValue = format(new Date(), 'yyy-MM-dd') + 'T09:00:00.000Z';
  formatedString = '';

  encuentro: Encuentro = {
    uid: '',
    fechae: '',
    numero: 0,
    tipo: '',
    fecha: null,
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
    penale2: 0,
    statuspen: 'no',
    update: 'outdated',
    estadio: '',
    ciudad: '',
    esquemae1: '',
    esquemae2: '',
    typematch: ''
  };
  encuentropri: Encuentro = {
    uid: '',
    fechae: '',
    numero: 0,
    tipo: '',
    fecha: null,
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
    penale2: 0,
    statuspen: 'no',
    update: 'outdated',
    estadio: '',
    ciudad: '',
    esquemae1: '',
    esquemae2: '',
    typematch: ''
  };

  items;

  @ViewChild(IonDatetime) datetime: IonDatetime;
  constructor(public alertController: AlertController,
    public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,) { }

  ngOnInit() {
    // this.restart();
    const campeonato = this.firestoreService.getCampeonato();
    if (campeonato !== undefined) {
      this.infocampeonato = campeonato;
      if (this.infocampeonato.tipo === 'Relampago') {
        this.relampago = true;
        this.getEquiposRelampago();
      } else {
        this.relampago = false;
      }

    }
    console.log(this.infocampeonato);
    this.getPartidos();
    this.fases();
    this.numerogrup();

    const name_1 = 'Fecha 10';

    console.log(this.obtenernumofstring(name_1));// Nos devolverá 136140
  }



  async numerogrup() {
    const n = this.infocampeonato.grupos;
    this.numerogrupos = ['Descenso'];
    for (let a = 1; a <= n; a++) {
      this.numerogrupos = [...this.numerogrupos, 'Grupo ' + a];
    }
  }

  async elegirgrupo() {
  }

  obtenernumofstring(string) {
    var tmp = string.split('');
    var map = tmp.map(function (current) {
      if (!isNaN(parseInt(current))) {
        return current;
      }
    });
    var numbers = map.filter(function (value) {
      return value != undefined;
    });
    return numbers.join('');
  }


  onChange(evt) {
    if (evt === -1) {
      this.items = this.numerofases.map(x => x.id);
    } else {
      let selectAllIndex = this.items.indexOf(-1);
      this.items.splice(selectAllIndex, 1);
      console.log(selectAllIndex);
    }
    console.log(this.items);
  }


  getItem(cod: number) {
    const getSelectd = cod;//Aquí envío el valor seleccionado
    this.encuentro.numero = cod;
    console.log('index', cod);
    // this.getInventoryList();//Ésta es la función que traerá el servicio que necesito
  }

  async fases() {
    const n = this.infocampeonato.fases;
    for (let a = 1; a <= n; a++) {
      this.numerofases = [...this.numerofases, 'Fecha ' + a];
    }
  }

  async pruebamensaje(num: number) {
    console.log('Numero es ', num);
    this.encuentro.numero = num;

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
      this.genee = [];
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

    this.grupoe1 = [];
    this.grupoe2 = [];
    this.grupoe3 = [];
    this.grupoe4 = [];
    this.grupoe5 = [];
    this.grupoe6 = [];
    this.grupoe7 = [];
    this.grupoe8 = [];
    this.grupoe9 = [];
    this.grupoe10 = [];

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
      this.genee = [];
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
      this.genevuelinit = [];
      this.genevuelf = [];
      this.genevuel = [];
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


  async anteriorrelampago() {

  if(this.infocampeonato.init !== this.titulo){
    if (this.numero >= 1) {
      this.numero=this.numero-1;
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
      }else if(this.numero === 5 ){
        this.titulo = 'Tercero y Cuarto';
        this.prueba('Tercero y Cuarto');
        this.pruebafina('Tercero y Cuarto');
        this.partidos_init('Tercero y Cuarto');
        this.partidos_ida_vuel_E('Tercero y Cuarto');
        this.partidos_ida_vuel_init('Tercero y Cuarto');
        this.partidos_ida_vuel_fina('Tercero y Cuarto');
        this.limpiargrupos();
      }else if(this.numero === 6){
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
      this.numero=this.numero+1;
      if (this.numero === 1) {
        this.titulo = 'Dieciseisavos';
        this.prueba('Dieciseisavos');
        this.pruebafina('Dieciseisavos');
        this.partidos_init('Dieciseisavos');
        this.partidos_ida_vuel_E('Dieciseisavos');
        this.partidos_ida_vuel_init('Dieciseisavos');
        this.partidos_ida_vuel_fina('Dieciseisavos');
        this.limpiargrupos();
      }else if (this.numero === 2) {
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

      }else if (this.numero === 5) {
        this.titulo = 'Tercero y Cuarto';
        this.prueba('Tercero y Cuarto');
        this.pruebafina('Tercero y Cuarto');
        this.partidos_init('Tercero y Cuarto');
        this.partidos_ida_vuel_E('Tercero y Cuarto');
        this.partidos_ida_vuel_init('Tercero y Cuarto');
        this.partidos_ida_vuel_fina('Tercero y Cuarto');
        this.limpiargrupos();
      }else if(this.numero === 6 ){
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

  async getPartidos() {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.getPartidos<Encuentro>(path).subscribe(res => {
      console.log(res.length);
      if (res.length) {
        this.antsig = true;
      } else {
        this.antsig = false;
      }

      // for (let a=0; a<=res.length;a++){
      //     this.encuentronuevo=res[a];
      //     this.guardarnuevo(this.encuentronuevo,this.encuentronuevo.uid);

      //   }
      this.encuentropri = res[0];


      if (this.encuentropri.fechae === 'ida' || this.encuentropri.fechae === 'vuelta' || this.encuentropri.fechae === 'unico') {
        this.titulo = this.encuentropri.tipo;
      } else {
        this.titulo = this.encuentropri.fechae;
      }
      this.numero = this.encuentropri.numero;
      // console.log('Numero es igual a '+this.numero);
      this.fase = this.encuentropri.fechae;

      if (this.fase === 'ida' || this.fase === 'vuelta' || this.fase === 'unico') {
        this.prueba(this.encuentropri.tipo);
        this.pruebafina(this.encuentropri.tipo);
        this.partidos_init(this.encuentropri.tipo);
        this.partidos_ida_vuel_E(this.encuentropri.tipo);
        this.partidos_ida_vuel_init(this.encuentropri.tipo);
        this.partidos_ida_vuel_fina(this.encuentropri.tipo);

      } else {
        this.genee = [];
        this.genef = [];
        this.geneinit = [];
        this.gruposfinalizados(this.fase);
        this.grupos(this.fase);
        this.partidos_init_fases(this.fase);
      }
    });
  }

  async prueba(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.getCollection<Encuentro>(path, 'tipo', '==', tipo, 'unico').subscribe(res => {
      this.genee = res;
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.gru1 = false;
      this.gru2 = false;
    });
  }
  async pruebafina(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.getCollectionfinalizados<Encuentro>(path, 'tipo', '==', tipo, 'unico').subscribe(res => {
      this.genef = res;
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.gru1 = false;
      this.gru2 = false;
    });
  }
  async partidos_init(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.getpartidos_init<Encuentro>(path, 'tipo', '==', tipo, 'unico').subscribe(res => {

      this.geneinit = res;
      this.grupoe1 = [];
      this.grupoe2 = [];
      this.grupof1 = [];
      this.grupof2 = [];
      this.grupoinit1 = [];
      this.gru1 = false;
      this.gru2 = false;


    });

  }

  async partidos_ida_vuel_E(tipo: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equiposInfo = this.firestoreService.get_partidos_ida_vuel_E<Encuentro>(path, 'tipo', '==', tipo, 'ida').subscribe(res => {
      this.geneida = res;
      this.grupoe1 = [];
      this.grupoe2 = [];
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
      this.grupoe1 = [];
      this.grupoe2 = [];
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
      this.grupoe1 = [];
      this.grupoe2 = [];
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
        this.grupoe1 = [];
        this.grupoe2 = [];
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
      this.grupoe1 = [];
      this.grupoe2 = [];
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
        this.grupoe1 = [];
        this.grupoe2 = [];
        this.grupof1 = [];
        this.grupof2 = [];
        if (res.length) {
          this.vuelta = true;
        }
        this.gru1 = false;
        this.gru2 = false;
      });

  }



  async grupos(fase: string) {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 1', fase).subscribe(res => {
      this.grupoe1 = res;
      if (res.length) {
        this.gru1 = true;
      } else {
        // this.gru1=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 2', fase).subscribe(res => {
      this.grupoe2 = res;
      if (res.length) {
        this.gru2 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 3', fase).subscribe(res => {
      this.grupoe3 = res;
      if (res.length) {
        this.gru3 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 4', fase).subscribe(res => {
      this.grupoe4 = res;
      if (res.length) {
        this.gru4 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 5', fase).subscribe(res => {
      this.grupoe5 = res;
      if (res.length) {
        this.gru5 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 6', fase).subscribe(res => {
      this.grupoe6 = res;
      if (res.length) {
        this.gru6 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 7', fase).subscribe(res => {
      this.grupoe7 = res;
      if (res.length) {
        this.gru7 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 8', fase).subscribe(res => {
      this.grupoe8 = res;
      if (res.length) {
        this.gru8 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 9', fase).subscribe(res => {
      this.grupoe9 = res;
      if (res.length) {
        this.gru9 = true;
      } else {
        // this.gru2=false;
      }
    });

    this.firestoreService.getCollectiongrupos<Encuentro>(path, 'grupo', '==', 'Grupo 10', fase).subscribe(res => {
      this.grupoe10 = res;
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

  setToday() {
    this.formatedString = format(parseISO(format(new Date(), 'yyy-MM-dd') + 'T09:00:00.000Z'), 'HH:mm, MMM d, yyy');
  }

  dateChanged(value) {
    this.dateValue = value;
    this.formatedString = format(parseISO(value), 'HH:mm, MMM d, yyy');
    this.showPicker = false;
    this.encuentro.fecha = value;
    console.log(value);
  }



  close() {
    this.datetime.cancel(true);
  }

  select() {
    this.datetime.confirm(true);
  }

  async restart() {

    this.encuentro = {
      uid: '',
      tipo: '',
      fechae: '',
      numero: 0,
      fecha: null,
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
      penale2: 0,
      statuspen: 'no',
      update: 'outdated',
      estadio: '',
      ciudad: '',
      esquemae1: '',
      esquemae2: '',
      typematch: ''
    };

  }


  async getEquiposG1() {
    const grupo = this.encuentro.grupo;
    this.team1 = [];
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Equipos';
    this.equiposInfo = this.firestoreService.getgrupos<Equipos>(path, 'grupo', '==', grupo).subscribe(res => {
      if (res.length) {
        this.team1 = res;
      }
    });
  }
  async getEquiposG2() {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Equipos';
    this.equiposInfo = this.firestoreService.getgrupos<Equipos>(path, 'grupo', '==', 'grupo2').subscribe(res => {
      if (res.length) {
        this.team2 = res;
      }
    });
  }

  async getEquiposG() {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Equipos';
    this.equiposInfo = this.firestoreService.getgrupos<Equipos>(path, 'grupo', '!=', 'Descenso').subscribe(res => {
      if (res.length) {
        this.teamg = res;
      }
    });
  }

  async getEquiposRelampago() {
    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Equipos';
    this.equiposInfo = this.firestoreService.getgrupos<Equipos>(path, 'grupo', '==', 'Relampago').subscribe(res => {
      if (res.length) {
        this.teamrela = res;
      }
    });
  }

  async getEquiposDes() {
    ; const path = 'Campeonatos/' + this.infocampeonato.uid + '/Equipos';
    this.equiposInfo = this.firestoreService.getgrupos<Equipos>(path, 'grupo', '==', 'Descenso').subscribe(res => {
      if (res.length) {
        this.teamd = res;
      }
    });
  }


  async completardatos(uid: string) {

    const path = 'Campeonatos/' + this.infocampeonato.uid + '/Equipos';
    const pathp = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
    this.equipo1Info = this.firestoreService.getgrupos<Equipos>(path, 'nombre', '==', this.encuentro.nombre_e1).subscribe(res => {
      if (res.length) {
        this.equipo1 = res[0];
        this.escudo1 = this.equipo1.escudo;
        this.uid1 = this.equipo1.uid;
        this.encuentro.escudo_e1 = this.escudo1;
        this.encuentro.uid_e1 = this.uid1;
        const data = {
          escudo_e1: this.escudo1,
          uid_e1: this.uid1,
          puntose1: this.equipo1.puntos,
          pje1: this.equipo1.p_j,
          pge1: this.equipo1.p_g,
          pee1: this.equipo1.p_e,
          ppe1: this.equipo1.p_e,
          gfe1: this.equipo1.g_f,
          gce1: this.equipo1.g_c,
          dge1: this.equipo1.d_g,
        };
        console.log(data, this.equipo1);

        this.firestoreService.actualizarpartido(data, pathp, uid).then(res => { });
        this.equipo1Info.unsubscribe();
      }
    });

    this.equipo2sInfo = this.firestoreService.getgrupos<Equipos>(path, 'nombre', '==', this.encuentro.nombre_e2).subscribe(res => {
      if (res.length) {
        this.equipo2 = res[0];
        // console.log(res[0]);
        // console.log(this.equipo2.escudo);
        this.escudo2 = this.equipo2.escudo;
        this.uid2 = this.equipo2.uid;
        this.encuentro.escudo_e2 = this.escudo2;
        this.encuentro.uid_e2 = this.uid2;
        const data = {
          escudo_e2: this.escudo2,
          uid_e2: this.uid2,
          puntose2: this.equipo2.puntos,
          pje2: this.equipo2.p_j,
          pge2: this.equipo2.p_g,
          pee2: this.equipo2.p_e,
          ppe2: this.equipo2.p_e,
          gfe2: this.equipo2.g_f,
          gce2: this.equipo2.g_c,
          dge2: this.equipo2.d_g,
        };
        console.log(data);
        this.firestoreService.actualizarpartido(data, pathp, uid).then(res => { });
        this.equipo2sInfo.unsubscribe();

      }
    });

    // this.equiposInfo.unsubscribe();
    console.log(this.encuentro);


  }

  async getMatch(equipo: Encuentro) {
    console.log('Click en getEquipo');
    console.log(equipo);
    this.firestoreService.setMatch(equipo);

  }

  async reset() {
    this.team1 = [];
    this.estado = false;
    this.descenso = false;
    this.grupo = false;
    this.grupo1 = false;
    this.grupo2 = false;
    this.fecha = false;
    this.gene = false;
    this.encuentro.nombre_e1 = '';
    this.encuentro.nombre_e2 = '';
    this.encuentro.fechae = '';
    this.encuentro.grupo = '';
    this.encuentro.tipo = '';

  }
  async saveMatch() {
    console.log(this.encuentro.fechae, this.encuentro.numero);
    this.encuentro.uid = this.firestoreService.getId();
    if (this.encuentro.tipo === '') {
      this.presentToast('Eliga el tipo de partido', 2000);
    } else {
      if (this.encuentro.nombre_e1 === '' || this.encuentro.nombre_e2 === '') {
        this.presentToast('Eliga los equipos', 2000);
      } else {
        if (this.encuentro.nombre_e1 === this.encuentro.nombre_e2) {
          this.presentToast('Los equipos son los mismos', 2000);
        } else {
          console.log(this.encuentro.nombre_e1 + ' ' + this.encuentro.nombre_e2);
          if (this.encuentro.tipo === 'Descenso') {
            this.encuentro.fechae = 'unico';
          }
          if (this.encuentro.tipo === 'Fase de grupos') {
            if (this.encuentro.fechae === '') {
              this.presentToast('Elija la fecha del encuentro', 2000);
            } else {
              this.encuentro.numero = parseInt(this.obtenernumofstring(this.encuentro.fechae));
            }
            const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
            this.firestoreService.createDoc(this.encuentro, path, this.encuentro.uid).then(res => {
              console.log('guardado con exito');
              this.presentLoading('Guardando partido', 1500);
              this.completardatos(this.encuentro.uid);
              this.encuentro = {
                uid: '',
                tipo: '',
                fechae: '',
                numero: 0,
                fecha: null,
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
                penale2: 0,
                statuspen: 'no',
                update: 'outdated',
                estadio: '',
                ciudad: '',
                esquemae1: '',
                esquemae2: '',
                typematch: ''
              };
              this.estado = false;
              this.grupo = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.fecha = false;
              this.gene = false;
              this.gru1 = false;
              this.gru2 = false;
              this.descenso = false;
              this.grupoe1 = [];
              this.grupoe2 = [];
              this.grupof1 = [];
              this.grupof2 = [];
              this.genef = [];
              this.genee = [];
              this.grupoinit1 = [];
              this.grupoinit2 = [];
              this.geneida = [];
              this.genevuel = [];
              this.geneidainit = [];
              this.geneidaf = [];
              this.genevuel = [];
              this.genevuelinit = [];
              this.genevuelf = [];
              this.reset();

            }).catch(error => {
              console.log(error);
            });

          } else if(this.infocampeonato.tipo === 'Relampago') {
            if (this.encuentro.fechae === '') {
              this.presentToast('Eliga tipo de encuentro', 2000);

            } else {
              this.setnumerrelampago(this.encuentro.tipo);
              const path = 'Campeonatos/' + this.infocampeonato.uid + '/Partidos';
              this.firestoreService.createDoc(this.encuentro, path, this.encuentro.uid).then(res => {
                console.log('guardado con exito');
                this.presentLoading('Guardando partido', 1500);
                this.completardatos(this.encuentro.uid);
                this.encuentro = {
                  uid: '',
                  tipo: '',
                  fechae: '',
                  numero: 0,
                  fecha: null,
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
                  penale2: 0,
                  statuspen: 'no',
                  update: 'outdated',
                  estadio: '',
                  ciudad: '',
                  esquemae1: '',
                  esquemae2: '',
                  typematch: ''
                };
                this.estado = false;
                this.grupo = false;
                this.grupo1 = false;
                this.grupo2 = false;
                this.fecha = false;
                this.gene = false;
                this.gru1 = false;
                this.gru2 = false;
                this.descenso = false;
                this.grupoe1 = [];
                this.grupoe2 = [];
                this.grupof1 = [];
                this.grupof2 = [];
                this.genef = [];
                this.genee = [];
                this.grupoinit1 = [];
                this.grupoinit2 = [];
                this.geneida = [];
                this.genevuel = [];
                this.geneidainit = [];
                this.geneidaf = [];
                this.genevuel = [];
                this.genevuelinit = [];
                this.genevuelf = [];
              }).catch(error => {
                console.log(error);
              });
            }
          }
        }
      }
    }
    this.getPartidos();
  }

  async setnumerrelampago(tipo:  string){
    if(tipo === 'Dieciseisavos'){
      this.encuentro.numero=1;
    }else if(tipo === 'Octavos'){
      this.encuentro.numero=2;
    }else if(tipo === 'Cuartos' ){
      this.encuentro.numero=3;
    }else if(tipo === 'Semifinal'){
      this.encuentro.numero=4;
    }else if(tipo === 'Tercer y Cuarto'){
      this.encuentro.numero=5;
    }else if(tipo === 'Final'){
      this.encuentro.numero=6;
    }

  }


  async newMatch() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tipo de partido: ',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Fase de grupos',
          value: 'Fase de grupos',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Descenso',
          value: 'Descenso'
        },
        {
          name: 'radio2',
          type: 'radio',
          cssClass: 'input',
          label: 'Cuartos de final',
          value: 'Cuartos de final'
        },
        {
          name: 'radio3',
          type: 'radio',
          cssClass: 'input',
          label: 'Semifinal',
          value: 'Semifinal'
        },
        {
          name: 'radio4',
          type: 'radio',
          cssClass: 'input',
          label: 'Tercero y Cuarto',
          value: 'Tercero y Cuarto'
        },
        {
          name: 'radio4',
          type: 'radio',
          cssClass: 'input',
          label: 'Final',
          value: 'Final'
        },
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
              this.encuentro.tipo = data;
              this.gene = false;
              this.descenso = false;
              this.grupo = true;
              this.fecha = true;
              this.grupo1 = true;
              this.encuentro.nombre_e1 = '';
              this.encuentro.nombre_e2 = '';
              this.getEquiposG();

            } if (data === 'Descenso') {
              this.encuentro.tipo = data;
              this.gene = false;
              this.grupo = false;
              this.fecha = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.descenso = true;
              this.encuentro.numero = this.infocampeonato.fases + 1;
              this.encuentro.nombre_e1 = '';
              this.encuentro.nombre_e2 = '';
              this.encuentro.fechae = '';
              this.encuentro.grupo = '';
              this.getEquiposDes();

            }
            if (data === 'Cuartos de final') {
              this.encuentro.tipo = data;
              this.descenso = false;
              this.grupo = false;
              this.fecha = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.gene = true;
              this.encuentro.numero = this.infocampeonato.fases + 2;
              this.encuentro.nombre_e1 = '';
              this.encuentro.nombre_e2 = '';
              this.encuentro.fechae = '';
              this.encuentro.grupo = '';
              this.getEquiposG();
            }
            if (data === 'Semifinal') {
              this.encuentro.tipo = data;
              this.descenso = false;
              this.gene = true;
              this.grupo = false;
              this.fecha = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.encuentro.numero = this.infocampeonato.fases + 3;
              this.encuentro.nombre_e1 = '';
              this.encuentro.nombre_e2 = '';
              this.encuentro.fechae = '';
              this.encuentro.grupo = '';
              this.getEquiposG();
            }
            if (data === 'Tercero y Cuarto') {

              this.encuentro.tipo = data;
              this.descenso = false;
              this.gene = true;
              this.grupo = false;
              this.fecha = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.encuentro.numero = this.infocampeonato.fases + 4;
              this.encuentro.nombre_e1 = '';
              this.encuentro.nombre_e2 = '';
              this.encuentro.fechae = '';
              this.encuentro.grupo = '';
              this.getEquiposG();

            } if (data === 'Final') {
              this.encuentro.tipo = data;
              this.descenso = false;
              this.gene = true;
              this.grupo = false;
              this.fecha = false;
              this.grupo1 = false;
              this.grupo2 = false;
              this.encuentro.numero = this.infocampeonato.fases + 5;
              this.encuentro.nombre_e1 = '';
              this.encuentro.nombre_e2 = '';
              this.encuentro.fechae = '';
              this.encuentro.grupo = '';
              this.getEquiposG();

            }
          }

        }
      ]
    });
    await alert.present();
  }



  async tipoinit() {
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
        },
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Semifinal',
          value: 'Semifinal',
          checked: false
        },
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Tercer y Cuarto',
          value: 'Tercer y Cuarto',
          checked: false
        },
        {
          name: 'radio1',
          type: 'radio',
          cssClass: 'input',
          label: 'Final',
          value: 'Final',
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
            if (data !== '') {
              this.relampago = true;
              this.encuentro.tipo = data;
            } else {
            }
          }
        }
      ]
    });
    await alert.present();
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
