import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private alertController: AlertController) {}

  years: number = 0;
  months: number = 0;
  size = '0';
  humanAgeYears = 0;
  humanAgeMonths = 0;

  calcular() {
    if (!this.years) {
      this.years = 0;
    }

    if (!this.months || this.months > 12) {
      this.months = 0;
    }

    // UK Kennel Club Rule:
    // First 2 years (factor per year):
    // Small: 12.5/2 = 6.25 per year, Medium: 10.5/2 = 5.25 per year, Large: 9/2 = 4.5 per year
    const growingFactorA = [6.25, 5.25, 4.5];

    // Each additional year after 2 (4.3 to 13.4 depending on breed):
    // Small dogs age slower, Large dogs age faster
    const growingFactorB = [4.3, 7.13, 8.37];

    const sizeIndex = Number(this.size);

    const dogAge = this.years + this.months / 12;

    // For dogs <= 2 years: multiply by growingFactorA
    // For dogs > 2 years: first 2 years (using growingFactorA) + remaining years (using growingFactorB)
    const humanAge =
      dogAge <= 2.0
        ? dogAge * growingFactorA[sizeIndex]
        : 2 * growingFactorA[sizeIndex] +
          (dogAge - 2) * growingFactorB[sizeIndex];

    // get years
    this.humanAgeYears = Math.floor(humanAge);

    // get months in decimal format
    const humanAgeMonths = humanAge - this.humanAgeYears;

    // fix decimal to 12 months base
    this.humanAgeMonths = Math.floor((humanAgeMonths * 12) / 0.99);
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
