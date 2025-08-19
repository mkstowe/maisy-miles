import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { simpleFacebook, simpleInstagram } from '@ng-icons/simple-icons';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  imports: [NgIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  providers: [provideIcons({ simpleInstagram, simpleFacebook })],
})
export class Header {
  public etsyUrl = environment.etsyUrl;
  public instagramUrl = environment.instagramUrl;
  public facebookUrl = environment.facebookUrl;
}
