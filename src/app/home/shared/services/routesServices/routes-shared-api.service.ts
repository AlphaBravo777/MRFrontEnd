import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';
import { Observable } from 'rxjs';
import { IRoute } from './routes-interface';
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
            .watchQuery({
                query: this.GET_ROUTES_QUERY
            })
            .valueChanges.pipe(
                map(result => this.consolidateRoutes(result.data['nodeDeliveryroutes'].edges))
            );
    }

    private consolidateRoutes(data): IRoute[] {
        const flattendData: IRoute[] = [];
        for (let array = 0; array < data.length; ++array) {
            const singleData: IRoute = { routeName: null, routeid: null };
            singleData.routeName = data[array].node.routeName;
            singleData.routeid = data[array].node.rowid;
            flattendData.push(singleData);
        }
        return flattendData;
    }
}
