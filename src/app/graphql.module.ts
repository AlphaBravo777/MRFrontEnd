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

    const auth = setContext((request, previousContext) => ({ authorization: token }));

    const defaultOptions = {
        watchQuery: {
          fetchPolicy: 'network-only',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
    };

    const http = httpLink.create({ uri });
    return {
        link: auth.concat(http),
        cache: new InMemoryCache(),
        connectToDevTools: true,
        defaultOptions: defaultOptions,
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
