import { Component, signal, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ADNValidatorService } from './services/dna-validator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private ADNService = inject(ADNValidatorService);

  ADNInput = signal('ATGCGA,CAGTGC,TTATGT,AGAAGG,CCCCTA,TCACTG');
  result = signal<boolean | null>(null);
  errorMessage = signal<string | null>(null);

  ADNMatrix = computed(() => {
    const input = this.ADNInput().trim();
    if (!input) return [];

    // Convertimos el input a un array de strings (filas)
    const lines = input.split(',')
      .map(s => s.trim().toUpperCase())
      .filter(s => s.length > 0);

    if (lines.length === 0) return [];
    return lines.map(line => line.split(''));
  });

  analyze() {
    this.errorMessage.set(null);
    this.result.set(null);

    const ADN = this.ADNInput().split(',')
      .map(s => s.trim().toUpperCase())
      .filter(s => s.length > 0);

    try {
      const isMutant = this.ADNService.isMutant(ADN);
      this.result.set(isMutant);
    } catch (e: any) {
      this.errorMessage.set(e.message);
    }
  }
}
