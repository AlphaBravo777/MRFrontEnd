import { IDate, datePackage_factory, IWeekDay } from './date-interface';

export class ITestInputs {
    testCase: string;
    actualValue: any;
    expectedValue: any;
}

export const mockLongDateGroup1: Date = new Date(
    'Wed May 29 2019 08:25:21 GMT+0200 (South Africa Standard Time)'
);

export const mockLongDatePlus7DaysMinus3Hours: Date = new Date(
    'Wed Jun 05 2019 05:25:21 GMT+0200 (South Africa Standard Time)'
);



function createMockdate(): IDate {
    const _mockDatePackage = datePackage_factory();
    _mockDatePackage.id = 723;
    _mockDatePackage.longDate = mockLongDateGroup1;
    _mockDatePackage.nodeID = 'VGltZVN0YW1wVHlwZTo3MjM=';
    _mockDatePackage.shift = 'Day';
    _mockDatePackage.shortDate = '2019-05-29';
    _mockDatePackage.time = 'Day';
    _mockDatePackage.timeHalfStock = false;
    _mockDatePackage.timeID = 'U3RvY2tUYWtpbmdUaW1lc1R5cGU6MTA=';
    _mockDatePackage.week = 22;
    _mockDatePackage.weekDay = 3;
    _mockDatePackage.weekDayID = 'RGF5c09mVGhlV2Vla1R5cGU6Mw==';
    _mockDatePackage.weekDayName = 'Wednesday';
    _mockDatePackage.year = 201;
    return _mockDatePackage;
}

export const mockDatePackage: IDate = createMockdate();

export class TestStandardInputsSuite {

    static emptyInput = '';
    static stringInput = 'testString';
    static numberInput = 42;
    static objectInput = {};
}

export class TestWeekDays {

    weekDayReturnData: IWeekDay[] = [
        {
        id: 1,
        nodeID: 'RGF5c09mVGhlV2Vla1R5cGU6MQ==',
        weekDayName: 'Monday',
        weekDayNumber: 1,
        weekDayRanking: 2,
        },
        {
        id: 2,
        nodeID: 'RGF5c09mVGhlV2Vla1R5cGU6Mg==',
        weekDayName: 'Tuesday',
        weekDayNumber: 2,
        weekDayRanking: 3,
        },
        {
        id: 3,
        nodeID: 'RGF5c09mVGhlV2Vla1R5cGU6Mw==',
        weekDayName: 'Wednesday',
        weekDayNumber: 3,
        weekDayRanking: 4,
        }
    ];
}

export class TestMockDateSuiteB {

    longDate1 = new Date('Wed May 29 2019 00:00:00 GMT+0200 (South Africa Standard Time)');
    shortDate1 = '2019-05-29';
    weekDayString1 = 'Wednesday';
    weekNumber1 = 22;
    increaseDays1 = 4;
    increaseDays1_longDate = new Date('Wed June 02 2019 00:00:00 GMT+0200 (South Africa Standard Time)');
    increaseDays2 = 8;
    increaseDays2_longDate = new Date('Wed June 06 2019 00:00:00 GMT+0200 (South Africa Standard Time)');
    decreaseDays1 = -10;
    decreaseDays1_longDate = new Date('Wed May 19 2019 00:00:00 GMT+0200 (South Africa Standard Time)');
    datePackage1: IDate = {
        id : null,
        nodeID : null,
        wholeDayID : null,
        wholeDayid : null,
        year : 2019,
        week : 22,
        weekDay : 3,
        weekDayID : null,
        weekDayName : null,
        weekDayRank : null,
        month : null,
        monthDay : null,
        shift : null,
        shiftid : null,
        shiftID : null,
        time : null,
        timeid : null,
        timeID : null,
        timeHalfStock : null,
        shortDate : null,
        longDate : null,
        timeStampID : null,
    };
    datePackage2: IDate = {
        id : null,
        nodeID : null,
        wholeDayID : null,
        wholeDayid : null,
        year : null,
        week : null,
        weekDay : null,
        weekDayID : null,
        weekDayName : null,
        weekDayRank : null,
        month : null,
        monthDay : null,
        shift : null,
        shiftid : null,
        shiftID : null,
        time : null,
        timeid : null,
        timeID : null,
        timeHalfStock : null,
        shortDate : null,
        longDate : null,
        timeStampID : null,
    };

}
