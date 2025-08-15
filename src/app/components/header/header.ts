import { Component } from '@angular/core';
import { boxEtsyLogo } from '@ng-icons/boxicons/logos';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { faBrandFacebookF } from '@ng-icons/font-awesome/brands';
import { simpleInstagram } from '@ng-icons/simple-icons';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  imports: [NgIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  providers: [provideIcons({ faBrandFacebookF, simpleInstagram, boxEtsyLogo })],
})
export class Header {
  public etsyUrl = environment.etsyUrl;
  public instagramUrl = environment.instagramUrl;
  public facebookUrl = environment.facebookUrl;
}
