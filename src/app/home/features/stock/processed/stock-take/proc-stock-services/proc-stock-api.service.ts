import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToolboxGroupService } from '../../../../../shared/services/toolbox/toolbox-group.service';
import { IProcessedStock, IProcessedStockAmounts } from './processed-stock';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from 'src/app/home/core/urls.service';

@Injectable({
    providedIn: 'root'
})
export class ProcStockApiService {

    constructor(private apollo: Apollo,
        private toolboxGroup: ToolboxGroupService,
        private http: HttpClient,
        private urlService: UrlsService) { }

    enterAllProcessedProductsIntoDB(timeAndData) {
        return this.http.post<any>(this.urlService.enterProcessedStock, timeAndData);
    }

    enterNewContainerRankingsIntoDB(changedContainers) {
        return this.http.post<any>(this.urlService.enterProductAmountsUrl, changedContainers);
    }

    getGraphQLProcContainers(): Observable<any> {
        return this.apollo
            .watchQuery({
                // variables: { timeStampID: timeID, },
                query: gql`
                query {
                    listProductcontainers{
                      id
                      rowid
                      image{
                          imageName
                      }
                      containernameid{
                        containername
                      }
                      factoryRanking
                      productid{
                        brandImage{
                            imageName
                        }
                        productid
                        proddescription
                        productonhold
                        stocktakegroup{
                            ranking
                            batchname
                          }
                          batchgroup{
                            batchColor{
                              colorCode
                            }
                          }
                        brand{
                          brand
                          brandSmallImage
                        }
                        unitweight{
                          unitAmount
                          measuringUnit
                          unitColor{
                            colorCode
                          }
                          unitImage{
                            imageName
                          }
                        }
                      }
                      filterCatagory{
                        area
                        areaRanking
                      }
                      factoryCatagory{
                        area
                        areaRanking
                      }
                    }
                }
        `,
            })
            .valueChanges.pipe(map(result => this.consolidateGraphQLProcContainers(result.data['listProductcontainers'])));
    }

    private consolidateGraphQLProcContainers(data): IProcessedStock[] {
        const flattendData: any[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = <IProcessedStock>{};
            if (!data[array].productid.productonhold) {
                singleData.containerID = data[array].id;
                singleData.databaseID = data[array].rowid;
                singleData.factoryRanking = data[array].factoryRanking;
                singleData.productid = data[array].productid.productid;
                singleData.description = data[array].productid.proddescription;
                singleData.batchgroup = data[array].productid.stocktakegroup.batchname;
                singleData.batchcolor = data[array].productid.batchgroup.batchColor.colorCode;
                singleData.brandImage = data[array].productid.brandImage.imageName;
                singleData.container = data[array].image.imageName;
                singleData.unitweight = data[array].productid.unitweight.unitAmount;
                singleData.unitmeasurement = data[array].productid.unitweight.measuringUnit;
                singleData.unitcolor = data[array].productid.unitweight.unitImage.imageName;
                singleData.filter = data[array].filterCatagory.area;
                singleData.factoryFilter = data[array].factoryCatagory.area;
                singleData.factoryFilterRating = data[array].factoryCatagory.areaRanking;
                flattendData.push(singleData);
            }
        }
        const multiSorted = this.toolboxGroup.multiFieldSorting(flattendData, ['factoryFilterRating', 'factoryRanking']);
        // console.log('MultiField sorting: ', multiSorted);
        return multiSorted;
    }

    getGraphQLDateAmounts(timeStampID): Observable<IProcessedStockAmounts[]> {
        return this.apollo
            .watchQuery({
                variables: { timeStampID: timeStampID },
                query: gql`
                query timeAmount($timeStampID:ID) {
                    nodeTimestamp(id:$timeStampID){
                        edges{
                            node{
                              processedstockamountsSet{
                                edges{
                                  node{
                                    prodContainer{
                                    id
                                    rowid
                                    deleteContainerAmount
                                    }
                                    amount
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                `,
            })
            // tslint:disable-next-line
            .valueChanges.pipe(map(result => this.consolidateGraphQLDateAmounts(result.data['nodeTimestamp'].edges[0].node['processedstockamountsSet'].edges)));
    }

    private consolidateGraphQLDateAmounts(data): IProcessedStockAmounts[] {
        const flattendData: IProcessedStockAmounts[] = [];

        for (let array = 0; array < data.length; ++array) {
            const singleData = <IProcessedStockAmounts>{};
                singleData.amount = data[array].node.amount;
                singleData.containerID = data[array].node.prodContainer.id;
                singleData.databaseID = data[array].node.prodContainer.rowid;
                singleData.deleteAmount = data[array].node.prodContainer.deleteContainerAmount;
                flattendData.push(singleData);
        }
        return flattendData;
    }

    getGraphQLFactoryAreas(): Observable<any> {
        return this.apollo
            .watchQuery({
                // variables: { timeID: timeID },
                query: gql`
                query{
                    listFactoryareas{
                      area
                      areaRanking
                    }
                  }
                `,
            })
            .valueChanges.pipe(map(result => this.consolidateGraphQLFactoryAreas(result.data['listFactoryareas'])));
    }

    private consolidateGraphQLFactoryAreas(data) {
        const newArray = [];
        data.map(item => {
            const currentItem = {area: item.area, ranking: item.areaRanking};
            newArray.push(currentItem);
        });
        this.toolboxGroup.sorting(newArray, 'ranking');
        // console.log('Charlie: ', newArray);
        return newArray;
    }

    getGraphQLLatestAmountsPostedTimeStamp(): Observable<any> {
        return this.apollo
            .watchQuery({
                query: gql`
                query{
                    nodeSettingsdb{
                      edges{
                        node{
                          value2
                        }
                      }
                    }
                  }
                `,
            })
            .valueChanges.pipe(map(result => result.data['nodeSettingsdb'].edges[0].node.value2));
    }

}
