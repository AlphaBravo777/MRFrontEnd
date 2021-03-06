import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { IDeliveryRoutesTypeNodes, IRoute, IDeliveryRoutesTypeConnection } from './routes-interface';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RoutesSharedApiService {

    public GET_ROUTES_QUERY = gql`
        query getAllRoutes {
            nodeDeliveryroutes {
                edges {
                    node {
                        routeName
                        rowid
                    }
                }
            }
        }
    `;

    constructor(private apollo: Apollo) {}

    getAllRoutes(): Observable<IRoute[]> {
        return this.apollo
            .watchQuery<IDeliveryRoutesTypeConnection>({
                query: this.GET_ROUTES_QUERY
            })
            .valueChanges.pipe(
                map(result => this.consolidateRoutes(result.data.nodeDeliveryroutes.edges))
            );
    }

    private consolidateRoutes(data: IDeliveryRoutesTypeNodes[]): IRoute[] {
        const flattendData: IRoute[] = [];
        for (let array = 0; array < data.length; ++array) {
            const singleData: IRoute = { 
            routeName: data[array].node.routeName,
            routeid: data[array].node.rowid
            };
            flattendData.push(singleData);
        }
        return flattendData;
    }
}
