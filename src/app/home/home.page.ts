import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}

  anios: number;
  meses: number;
  tamanoRaza;
  aniosPerro = 0;

  // java -XshowSettings:properties -version 2>&1 > /dev/null | grep 'java.home' 

  calcular() {
    const ed1 = [12.5, 10.5, 9.0];
    const ed2 = [5.27, 7.13, 8.37];
    const anios2 = this.anios + this.meses / 12;

    if (anios2 < 3.0) {
      this.aniosPerro = anios2 * ed1[this.tamanoRaza];
    } else {
      this.aniosPerro = anios2 * ed2[this.tamanoRaza];
    }
    return this.aniosPerro + ' años';
  }
}
