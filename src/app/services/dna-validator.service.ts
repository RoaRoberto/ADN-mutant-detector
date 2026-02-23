import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ADNValidatorService {

    /**
     * Detecta si un humano es mutante basándose en su secuencia de ADN.
     * Sabrás si es mutante si encuentras más de una secuencia de cuatro letras iguales,
     * de forma oblicua, horizontal o vertical.
     */
    isMutant(ADN: string[]): boolean {
        if (!this.isValidMatrix(ADN)) {
            throw new Error('La matriz de ADN no es válida (debe ser NxN y contener solo A, T, C, G).');
        }

        const n = ADN.length;
        let sequencesFound = 0;

        // Convertimos a matriz de caracteres para facilitar el acceso
        const matrix = ADN.map(row => row.toUpperCase().split(''));

        // 1. Horizontales
        for (let i = 0; i < n; i++) {
            for (let j = 0; j <= n - 4; j++) {
                if (this.checkLine(matrix[i][j], matrix[i][j + 1], matrix[i][j + 2], matrix[i][j + 3])) {
                    sequencesFound++;
                    if (sequencesFound > 1) return true;
                }
            }
        }

        // 2. Verticales
        for (let i = 0; i <= n - 4; i++) {
            for (let j = 0; j < n; j++) {
                if (this.checkLine(matrix[i][j], matrix[i + 1][j], matrix[i + 2][j], matrix[i + 3][j])) {
                    sequencesFound++;
                    if (sequencesFound > 1) return true;
                }
            }
        }

        // 3. Diagonales (Top-Left a Bottom-Right)
        for (let i = 0; i <= n - 4; i++) {
            for (let j = 0; j <= n - 4; j++) {
                if (this.checkLine(matrix[i][j], matrix[i + 1][j + 1], matrix[i + 2][j + 2], matrix[i + 3][j + 3])) {
                    sequencesFound++;
                    if (sequencesFound > 1) return true;
                }
            }
        }

        // 4. Diagonales (Top-Right a Bottom-Left)
        for (let i = 0; i <= n - 4; i++) {
            for (let j = 3; j < n; j++) {
                if (this.checkLine(matrix[i][j], matrix[i + 1][j - 1], matrix[i + 2][j - 2], matrix[i + 3][j - 3])) {
                    sequencesFound++;
                    if (sequencesFound > 1) return true;
                }
            }
        }

        return false;
    }

    private checkLine(a: string, b: string, c: string, d: string): boolean {
        return a === b && b === c && c === d;
    }

    private isValidMatrix(ADN: string[]): boolean {
        const n = ADN.length;
        if (n === 0) return false;

        for (const row of ADN) {
            if (row.length !== n) return false;
            if (!/^[ATCG]+$/i.test(row)) return false;
        }

        return true;
    }
}
