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

    deleteReportEntry(id) {
        return this.http.delete<any>(this.urlService.deleteReportUrl + id);
    }

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
                            userNode{
                                firstName
                                rowid
                                id
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
            singleData.userID = data[array].node.userNode.id;
            singleData.userid = data[array].node.userNode.rowid;
            singleData.userName = data[array].node.userNode.firstName;
            if (data[array].node.reportimagesSet.edges.length === 0) {
                singleData.images = null;
            } else {
                singleData.images = [];
                data[array].node.reportimagesSet.edges.map(image => {
                    const tempImage = <IReadReportImages>{};
                    tempImage.id = image.node.rowid;
                    tempImage.ID = image.node.id;
                    tempImage.image = this.urlService.mediaUrl + image.node.image;
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
        if (data.length > 0) {
            for (let array = 0; array < data.length; ++array) {
                const singleData = { name: '', color: '', rank: '' };
                singleData.name = data[array].node.levelName;
                singleData.color = data[array].node.levelColor;
                singleData.rank = data[array].node.levelRank;
                flattendData.push(singleData);
            }
        }
        return this.toolBox.sorting(flattendData, 'rank');
    }
}


