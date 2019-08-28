import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Apollo, gql } from 'apollo-angular-boost';
import { map, take } from 'rxjs/operators';
import { ToolboxGroupService } from 'src/app/home/shared/services/toolbox/toolbox-group.service';
import { IReadReport, IReadReportImages } from './read-report-interface';
import { UrlsService } from 'src/app/home/core/urls.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ReportReadApiService {

    constructor(
        private urlService: UrlsService,
        private http: HttpClient,
        private apollo: Apollo,
        private toolBox: ToolboxGroupService) { }

    private stockUrl = this.urlService.backendUrl + 'office/';

    deleteReportEntry(id) {
        const timeUrl = this.stockUrl + 'report/deleteReport/' + id;
        return this.http.delete<any>(timeUrl);
    }

    // downloadDailyReportFile(imageUrl: string): Observable<any> {
    //     const getReportImages = this.stockUrl + 'report/downloadImage/';
    //     return this.http.get(getReportImages);
    // }

    getDailyReportMessages(timeStampIDs): Observable<IReadReport[]> {
        console.log('Alpha = I am running daily report here with timesStampIDs', timeStampIDs);
        if (timeStampIDs.id === null) {
            console.log('There is no id');
            return of(null);
        } else {
            console.log('There was an id: ', timeStampIDs);
        return this.apollo
            .watchQuery({
                variables: { timeStampID: timeStampIDs.nodeID },
                query: gql`
                query SingeDaily($timeStampID:ID){
                    nodeDailyreport(timeStampID:$timeStampID){
                        edges{
                          node{
                            id
                            rowid
                            message
                            dateCreated
                            reply{
                                rowid
                              }
                            user{
                              rowid
                              id
                              firstName
                            }
                            messageLevel{
                              levelColor
                              levelName
                              levelRank
                            }
                            reportimagesSet{
                                edges{
                                  node{
                                    rowid
                                    id
                                    image
                                    name
                                  }
                                }
                            }
                          }
                        }
                      }
                    }
                `,
            })
            .valueChanges.pipe(
                // take(1),
                map(result => this.consolidateDailyReportMessages(result.data['nodeDailyreport'].edges)));
        }
    }

    private consolidateDailyReportMessages(data): IReadReport[] {
        console.log('Bravo consolidateDailyReportMessages = ', data);
        const flattendData: IReadReport[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = <IReadReport>{};
            singleData.rowid = data[array].node.rowid;
            singleData.messageID = data[array].node.id;
            singleData.dateCreated = new Date(Date.parse(data[array].node.dateCreated));
            // console.log(singleData.dateCreated.toLocaleTimeString('en-US', { hour12: false }));
            singleData.message = data[array].node.message;
            if (!data[array].node.reply) {
                singleData.reply = null;
            } else {
                singleData.reply = data[array].node.reply.rowid;
            }
            singleData.messageFlag = {
                levelName: data[array].node.messageLevel.levelName,
                levelColor: data[array].node.messageLevel.levelColor,
                levelRank: data[array].node.messageLevel.levelRank
            };
            singleData.userID = data[array].node.user.id;
            singleData.userid = data[array].node.user.rowid;
            singleData.userName = data[array].node.user.firstName;
            if (data[array].node.reportimagesSet.edges.length === 0) {
                singleData.images = null;
            } else {
                singleData.images = [];
                data[array].node.reportimagesSet.edges.map(image => {
                    const tempImage = <IReadReportImages>{};
                    tempImage.id = image.node.rowid;
                    tempImage.ID = image.node.id;
                    tempImage.image = this.urlService.backendUrl + 'media/' + image.node.image;
                    tempImage.name = image.node.name;
                    singleData.images.push(tempImage);
                });
            }
            flattendData.push(singleData);
        }
        console.log('Bravo(2) consolidateDailyReportMessages = ', flattendData);
        return this.toolBox.sorting(flattendData, 'rowid');
    }

    getMessageLevels(): Observable<any> {
        return this.apollo
            .watchQuery({
                variables: { report: true },
                query: gql`
                query MessageLevels($report:Boolean){
                    nodeMessagelevels(report:$report){
                        edges{
                          node{
                            levelName
                            levelColor
                            levelRank
                          }
                        }
                    }
                }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateMessageLevels(result.data['nodeMessagelevels'].edges)));
    }

    private consolidateMessageLevels(data) {
        const flattendData = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = { name: '', color: '', rank: '' };
            singleData.name = data[array].node.levelName;
            singleData.color = data[array].node.levelColor;
            singleData.rank = data[array].node.levelRank;
            flattendData.push(singleData);
        }
        return this.toolBox.sorting(flattendData, 'rank');
    }
}


