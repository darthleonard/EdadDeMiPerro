import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}

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
    const growingFactorA = [12.5, 10.5, 9.0];

    // growing factor for older than 3 years
    const growingFactorB = [5.27, 7.13, 8.37];

    // calc age in dog years
    const dogAge = this.years + this.months / 12;

    // arrange age in humans years
    const humanAge = dogAge < 3.0 
      ? dogAge * growingFactorA[this.size]
      : dogAge * growingFactorB[this.size];

    // get years
    this.humanAgeYears = Math.floor(humanAge);

    // get months in decimal format
    const humanAgeMonths = humanAge - this.humanAgeYears;

    // fix decimal to 12 months base
    this.humanAgeMonths = Math.floor(humanAgeMonths * 12 / .99);
  }
}
