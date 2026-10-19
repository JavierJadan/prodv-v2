import { Component, OnDestroy } from '@angular/core';
import { ThemeService } from './core/services/theme.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private readonly imageErrorHandler = (event: Event): void => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement)) { return; }
    image.hidden = true;
    image.parentElement?.classList.add('image-unavailable');
  };
  private readonly imageLoadHandler = (event: Event): void => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement)) { return; }
    image.hidden = false;
    image.parentElement?.classList.remove('image-unavailable');
  };

  constructor(private theme: ThemeService) {
    document.addEventListener('error', this.imageErrorHandler, true);
    document.addEventListener('load', this.imageLoadHandler, true);
  }

  ngOnDestroy(): void {
    document.removeEventListener('error', this.imageErrorHandler, true);
    document.removeEventListener('load', this.imageLoadHandler, true);
  }
}


