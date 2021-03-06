import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular-boost';

@Injectable({
    providedIn: 'root'
})
export class DatePickerGraphqlStringService {

    constructor() { }

    GET_ALL_SHIFTS = gql`
    query Shifts {
        nodeShifts{
          edges{
            node{
              id
              shiftName
              rowid
            }
          }
        }
      }
    `;

    GET_ALL_STOCK_TAKING_TIMES = gql`
    query GetAllStockTakingTimes {
        nodeStocktakingtimes{
            edges{
                node{
                    id
                    times
                    selectiveDelete
                    rowid
                }
            }
        }
    }
    `;

    GET_ALL_DATE_IDS_FOR_WEEK_NO = gql`
    query getRoutesForWeekNr($weekNr:Int, $year:Int, $time:ID) {
        nodeTimestamp(week:$weekNr, year:$year, time:$time){
            edges{
                node{
                    rowid
                    weekDay{
                        weekDayNumber
                        weekDayNames
                        weekDayRanking
                    }
                }
            }
        }
    }`;

    GET_SINGLE_TIMESTAMP_DATA = gql`
    query NodeTimeStamp($year:Int, $week:Int, $weekDayID:ID, $timeID:ID, $shiftID:ID){
        nodeTimestamp(year:$year, week:$week, weekDay:$weekDayID, time:$timeID, shift:$shiftID) {
            edges{
                node{
                    id
                    rowid
                    year
                    week
                    shortDate
                    dateCreated
                    weekDay{
                        id
                        weekDayNames
                        weekDayNumber
                        weekDayRanking
                        rowid
                    }
                    time{
                        id
                        times
                        selectiveDelete
                        rowid
                    }
                    shift{
                        id
                        shiftName
                        rowid
                    }
                }
            }
        }
    }`;

    GET_SINGLE_STOCK_TAKING_TIME = gql`
    query StockTakingTimes($time:String){
        nodeStocktakingtimes(times:$time){
            edges{
                node{
                    id
                    rowid
                    times
                    selectiveDelete
                }
            }
        }
    }`;

    GET_WEEKDAY = gql`
    query weekDayID($weekday:Int){
        nodeDaysoftheweek(weekDayNumber:$weekday){
            edges{
                node{
                    id
                    weekDayNames
                }
            }
        }
    }`;

    GET_ALL_DAYS_OF_THE_WEEK_DATA = gql`
    query getAllDaysOfTheWeekData{
        nodeDaysoftheweek{
            edges{
                node{
                    id
                    weekDayNames
                    weekDayNumber
                    weekDayRanking
                    rowid
                }
            }
        }
    }`;

}
