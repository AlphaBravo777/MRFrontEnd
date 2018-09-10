import { Component, OnInit, Input } from '@angular/core';
import { Apollo, gql } from 'apollo-angular-boost';

@Component({
    selector: 'app-high-risk-groups',
    templateUrl: './high-risk-groups.component.html',
    styleUrls: ['./high-risk-groups.component.css']
})
export class HighRiskGroupsComponent implements OnInit {

    @Input() loadingListStock;
    allExpandState = false;
    data = <any>{};

    constructor(private apollo: Apollo) { }

    ngOnInit() {
        this.apollo
            .watchQuery({
                query: gql`
                {
                    allProducts {
                      edges {
                        node {
                          productid
                          proddescription
                          packageweight
                          batchgroup{
                            batchname
                          }
                        }
                      }
                    }
                  }
            `,
            })
            .valueChanges.subscribe(result => {
                this.data = result.data['allProducts'].edges;
                console.log(this.data);
            });
    }
}
