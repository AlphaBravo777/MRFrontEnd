import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@ng-stack/forms';
import { IBlockDate, IDate, IDateShift, IDateTime, IWeekDay } from '../date-picker-service/date-interface';

@Injectable({
    providedIn: 'root'
})
export class DateFormService {

    blockDataForm: FormGroup<IBlockDate>
    fb = new FormBuilder();

    constructor() { }

    // year: [this.currentWorkingDate.year, [Validators.required, Validators.min(1990), , Validators.max(2050)]],
    // week: [this.currentWorkingDate.week, [Validators.required, Validators.min(1), , Validators.max(53)]],
    // weekDay: [this.currentWorkingDate.weekDay, Validators.required],
    // shift: [this.currentWorkingDate.shiftid, Validators.required],
    // time: [this.currentWorkingDate.timeid, Validators.required],

    createBlockDataForm(currentWorkingDate: IDate, weekDays: IWeekDay[], shifts: IDateShift[], stockTimes: IDateTime[]) {

        console.log('Week data = ', currentWorkingDate, weekDays)

        this.blockDataForm = this.fb.group<IBlockDate>({
            year: [currentWorkingDate.year, [Validators.required]],
            week:[currentWorkingDate.week, [Validators.required]],
            weekDay: this.createWeekDayGroup(weekDays, currentWorkingDate),
            shiftData: this.createShiftGroup(shifts, currentWorkingDate),
            timeData: this.createTimeGroup(stockTimes, currentWorkingDate),
        })
        return this.blockDataForm
    }

    private createWeekDayGroup(weekDays: IWeekDay[], currentWorkingDate: IDate): FormGroup<IWeekDay> {
        const weekDay: IWeekDay = weekDays.find(day => day.id === currentWorkingDate.weekDay)
        return this.fb.group<IWeekDay>({
            id: [weekDay.id, [Validators.required]],
            nodeID: [weekDay.nodeID, [Validators.required]],
            weekDayName: [weekDay.weekDayName, [Validators.required]],
            weekDayNumber: [weekDay.weekDayNumber, [Validators.required]],
            weekDayRanking: [weekDay.weekDayRanking, [Validators.required]],
        })
    }

    private createTimeGroup(stockTimes: IDateTime[], currentWorkingDate: IDate): FormGroup<IDateTime> {
        const dayTime: IDateTime = stockTimes.find(time => time.id === currentWorkingDate.timeid)
        return this.fb.group<IDateTime>({
            id: [dayTime.id, [Validators.required]],
            nodeID: [dayTime.nodeID, [Validators.required]],
            selectiveDelete: [dayTime.selectiveDelete, [Validators.required]],
            times: [dayTime.times, [Validators.required]],
        })
    }

    private createShiftGroup(shifts: IDateShift[], currentWorkingDate: IDate): FormGroup<IDateShift> {
        const dayShift: IDateShift = shifts.find(shift => shift.id === currentWorkingDate.shiftid)
        return this.fb.group<IDateShift>({
            id: [dayShift.id, [Validators.required]],
            nodeID: [dayShift.nodeID, [Validators.required]],
            shiftName: [dayShift.shiftName, [Validators.required]],
        })
    }

    changeStockTime(stockTimes: IDateTime[]) {
        const stockTime: IDateTime = stockTimes.find(time => time.id === this.blockDataForm.get('timeData').get('id').value)
        this.blockDataForm.get('timeData').setValue(stockTime)
    }

    changeWeekDay(weekDays: IWeekDay[]) {
        const weekDay: IWeekDay = weekDays.find(day => day.id === this.blockDataForm.get('weekDay').get('id').value)
        this.blockDataForm.get('weekDay').setValue(weekDay)
    }

    changeShift(weekDays: IDateShift[]) {
        const dayShift: IDateShift = weekDays.find(shift => shift.id === this.blockDataForm.get('shiftData').get('id').value)
        this.blockDataForm.get('shiftData').setValue(dayShift)
    }
}
