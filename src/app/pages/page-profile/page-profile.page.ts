import { Component } from '@angular/core';
@Component({ selector:'app-page-profile', templateUrl:'./page-profile.page.html', styleUrls:['./page-profile.page.scss'] })
export class PageProfilePage {
  dark = false;
  toggleTheme(): void { this.dark=!this.dark; document.body.classList.toggle('dark',this.dark); }
}
