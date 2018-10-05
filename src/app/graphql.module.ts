import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { UrlsService } from './home/core/urls.service';

export function createApollo(httpLink: HttpLink, urlservice: UrlsService) {
    // tslint:disable-next-line
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNSwidXNlcm5hbWUiOiJhIiwiZXhwIjoxNTM2MjU0OTg2LCJlbWFpbCI6ImFAYS5jb20iLCJvcmlnX2lhdCI6MTUzNjI0NDE4Nn0.TkUwcKVw2RGE_KtZEKfiifcgZ2HF6phApPvjqmQZLJ0';
    const uri = urlservice.graphqlAddress; // <-- add the URL of the GraphQL server here

    // const auth = setContext((request, previousContext) => ({
    //     authorization: token
    //   }));

    // const uri = 'http://192.168.2.24:8000/graphql/'; // Main factory test server
    // const uri = 'http://127.0.0.1:8000/graphql/';    // Home
    // const uri = 'http://192.168.45.2:8000/graphql/';    // Development PC



    const auth = setContext((request, previousContext) => ({ authorization: token }));

    // const auth = setContext((_, { headers }) => {
    //     // get the authentication token from local storage if it exists
    //     // const token = localStorage.getItem('token');
    // tslint:disable-next-line
    //     const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNSwidXNlcm5hbWUiOiJhIiwiZXhwIjoxNTM2MjU0OTg2LCJlbWFpbCI6ImFAYS5jb20iLCJvcmlnX2lhdCI6MTUzNjI0NDE4Nn0.TkUwcKVw2RGE_KtZEKfiifcgZ2HF6phApPvjqmQZLJ0';
    //     console.log(token);
    //     // return the headers to the context so httpLink can read them
    //     // in this example we assume headers property exists
    //     // and it is an instance of HttpHeaders
    //     if (!token) {
    //         return {};
    //     } else {
    //         return {
    //             headers: {
    //                 Authorization: `JWT ${token}`
    //             }
    //         };
    //     }
    // });

    const http = httpLink.create({ uri });
    return {
        link: auth.concat(http),
        // link: httpLink.create({uri}),
        cache: new InMemoryCache(),
        connectToDevTools: true,
    };
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink, UrlsService],
        },
    ],
})
export class GraphQLModule {
}
