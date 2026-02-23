import { TestBed } from '@angular/core/testing';
import { ADNValidatorService } from './ADN-validator.service';

describe('ADNValidatorService', () => {
    let service: ADNValidatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ADNValidatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('isMutant', () => {
        it('should return true for the mutant example in the PDF', () => {
            const ADN = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
            expect(service.isMutant(ADN)).toBeTrue();
        });

        it('should return false for human ADN', () => {
            const ADN = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAAG", "CCACTA", "TCACTG"];
            expect(service.isMutant(ADN)).toBeFalse();
        });

        it('should detect horizontal sequences', () => {
            const ADN = ["AAAAAAA", "CAGTGC", "TTATGT", "AGAAAG", "CCACTA", "TCACTG", "TTTTTT"]; // AAAA and TTTT
            expect(service.isMutant(ADN)).toBeTrue();
        });

        it('should detect vertical sequences', () => {
            const ADN = [
                "ATGC",
                "ATGC",
                "ATGC",
                "ATGC"
            ]; // AAAA, TTTT, CCCC, GGGG
            expect(service.isMutant(ADN)).toBeTrue();
        });

        it('should detect diagonal sequences', () => {
            const ADN = [
                "ATGC",
                "CAGT",
                "TTAT",
                "AGAA"
            ]; // Diagonal AAAA
            // Let's make another sequence
            ADN[0] = "ATGC";
            ADN[1] = "GATG";
            ADN[2] = "GGAT";
            ADN[3] = "GGGA";
            // This has diagonal AAAA. Let's add another one.
            const ADNMutant = [
                "ATGCG",
                "GATGC",
                "GGATG",
                "GGGAT",
                "TTTTT" // Horizontal TTTTT
            ];
            expect(service.isMutant(ADNMutant)).toBeTrue();
        });

        it('should throw error for invalid matrix size', () => {
            const ADN = ["ATGC", "CAGT", "TTAT"];
            expect(() => service.isMutant(ADN)).toThrowError();
        });

        it('should throw error for invalid characters', () => {
            const ADN = ["ATGC", "CAGT", "TTAT", "XXXX"];
            expect(() => service.isMutant(ADN)).toThrowError();
        });
    });
});
