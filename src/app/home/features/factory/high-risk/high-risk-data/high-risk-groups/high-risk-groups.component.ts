import { Component, OnInit, Input } from '@angular/core';
import {Apollo, gql} from 'apollo-angular-boost';

@Component({
    selector: 'app-high-risk-groups',
    templateUrl: './high-risk-groups.component.html',
    styleUrls: ['./high-risk-groups.component.css']
})
export class HighRiskGroupsComponent implements OnInit {

    @Input() loadingListStock;
    allExpandState = false;
    data: {};

    constructor(private apollo: Apollo) {}

    ngOnInit() {
        console.log('I am here');
        this.apollo.query({query: gql`{
            allProducts{
              edges{
                node{
                  productid
                  proddescription
                  packageweight
                }
              }
            }
          }`}).subscribe(console.log);
        // this.apollo
        //   .watchQuery({
        //     query: gql`
        //     {
        //         allProducts{
        //           edges{
        //             node{
        //               productid
        //             }
        //           }
        //         }
        //       }
        //     `,
        //   })
        //   .valueChanges.subscribe(result => {
        //     this.data = result.data;
        //     console.log(this.data);
        //   });
      }
}
