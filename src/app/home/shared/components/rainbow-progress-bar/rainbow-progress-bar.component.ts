import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-rainbow-progress-bar',
    templateUrl: './rainbow-progress-bar.component.html',
    styleUrls: ['./rainbow-progress-bar.component.scss']
})
export class RainbowProgressBarComponent implements OnInit {

    @Input() amount;
    @Input() sizeStyle;

    constructor() { }

    ngOnInit() {
    }

    setStyles() {
        const styles = {
            'width': this.amount + '%',
        };
        return styles;
    }

    setStyleBack() {
        if (this.amount > 0) {
            const styles = { 'background': '#B9936F', }; return styles;
        } else if (this.amount < 40) {
            const styles = { 'background': 'orange', }; return styles;
        } else if (this.amount < 60) {
            const styles = { 'background': 'yellow', }; return styles;
        } else if (this.amount < 80) {
            const styles = { 'background': 'green', }; return styles;
        } else {
            const styles = { 'background': 'green', }; return styles;
        }
    }

}
