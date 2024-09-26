import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private alertController: AlertController) {}

  years: number;
  months: number;
  size = "0";
  humanAgeYears = 0;
  humanAgeMonths = 0;

  calcular() {
    // fix values in case user didnt informed it
    if(!this.years) {
      this.years = 0;
    }

    if(!this.months || this.months > 12) {
      this.months = 0;
    }

    // growing factor for younger than 3 years
    const growingFactorA = [6.25, 5.25, 4.5];

    // growing factor for older than 3 years
    const growingFactorB = [4.3, 7.13, 8.37];

    // calc age in dog years
    const dogAge = this.years + this.months / 12;

    // arrange age in humans years
    const humanAge = dogAge < 3.0 
      ? dogAge * growingFactorA[this.size]
      : dogAge * growingFactorB[this.size] + growingFactorA[this.size];

    // get years
    this.humanAgeYears = Math.floor(humanAge);

    // get months in decimal format
    const humanAgeMonths = humanAge - this.humanAgeYears;

    // fix decimal to 12 months base
    this.humanAgeMonths = Math.floor(humanAgeMonths * 12 / .99);
  }

  async onInfoClick() {
    const alert = await this.alertController.create({
      header: '¿Como se determina la edad "humana" de mi perro?',
      message: `Según el Kennel Club del Reino Unido, las pautas generales para determinar la edad de un perro son las siguientes:
                Los primeros dos años de la vida de un perro pequeño equivalen aproximadamente a los 12,5 primeros años humanos, 10,5 para un perro mediano y nueve para los perros grandes.
                Luego, cada año adicional de vida del perro se multiplica por entre 4,3 y 13,4 años, según la raza, para calcular su edad humana.`,
      buttons: ['Cerrar'],
    });

    await alert.present();
  }
}
