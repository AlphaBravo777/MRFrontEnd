import { TestBed, inject } from '@angular/core/testing';

import { DialogBoxService } from './dialog-box.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';


describe('DialogBoxService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule, RouterTestingModule ],
            providers: [
                DialogBoxService,
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialog, useValue: {} }
            ]
        });
    });

    it('should be created', inject(
        [DialogBoxService],
        (service: DialogBoxService) => {
            expect(service).toBeTruthy();
        }
    ));
});
