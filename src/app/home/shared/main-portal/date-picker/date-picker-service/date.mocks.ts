import { IDate } from './date-interface';

export const mockLongDate: Date = new Date(
    'Wed May 29 2019 08:25:21 GMT+0200 (South Africa Standard Time)'
);

export const mockLongDatePlus7DaysMinus3Hours: Date = new Date(
    'Wed Jun 05 2019 05:25:21 GMT+0200 (South Africa Standard Time)'
);

export const mockDatePackage: IDate = {
    id: 723,
    longDate: mockLongDate,
    nodeID: 'VGltZVN0YW1wVHlwZTo3MjM=',
    shift: 'Day',
    shortDate: '2019-05-29',
    time: 'Day',
    timeHalfStock: false,
    timeID: 'U3RvY2tUYWtpbmdUaW1lc1R5cGU6MTA=',
    week: 22,
    weekDay: 3,
    weekDayID: 'RGF5c09mVGhlV2Vla1R5cGU6Mw==',
    weekDayName: 'Wednesday',
    year: 2019
};
