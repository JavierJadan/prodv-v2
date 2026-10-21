import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppData, Match } from '../models/app-data.models';
import { SportsDataService } from './sports-data.service';

@Injectable({ providedIn: 'root' })
export class MatchNavigationService {
  constructor(private router: Router, private toast: ToastController, private sports: SportsDataService) {}

  async open(data: AppData | undefined, match: Match): Promise<void> {
    if (this.sports.hasMatchDetail(data, match.id)) {
      await this.router.navigate(['/details', match.leagueId, match.id]);
      return;
    }
    const message = match.status === 'scheduled'
      ? 'La información del partido estará disponible cuando se publique o comience el encuentro.'
      : match.status === 'live'
        ? 'El detalle en vivo todavía se está preparando. Intenta nuevamente en unos minutos.'
        : 'El resultado está disponible, pero el detalle del partido todavía no ha sido publicado.';
    const notice = await this.toast.create({ message, duration: 3200, position: 'bottom', icon: 'information-circle-outline' });
    await notice.present();
  }
}
