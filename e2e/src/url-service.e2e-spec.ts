import axios from 'axios';
import { environment } from '../../src/environments/environment';
import { IAxiomRequestReturn } from './e2e.interfaces';

describe('Test response for all REST API endpoints', () => {

    let TOKEN = 'need token to be set';

    beforeAll(() => {
        const root = environment.root;
        axios.defaults.baseURL = root + environment.mrGatewayService;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    });

    beforeAll(async done => {
        // Get user token for authentication
        try {
            const res: IAxiomRequestReturn = await axios.post(environment.mrUserService + environment.loginUrl, {
                username: 'a',
                password: 'aaaaaaa1'
            });
            TOKEN = res.data.token;
            axios.defaults.headers.common['Authorization'] = 'JWT ' + res.data.token;
            done();
        } catch (error) {
            console.log('There was an error message = ', error);
        }
    });

    it('should verify gateway api rest endpoint for post: admin-page', async done => {

        const res: IAxiomRequestReturn = await axios.get(environment.adminUrl)

        expect(res.status).toEqual(200);
        expect(res.data).toBeDefined();
        done();
    });

    it('should verify gateway api rest endpoint for post: user-login', async done => {

        const res: IAxiomRequestReturn = await axios.post(environment.mrUserService + environment.loginUrl, {
            username: 'a',
            password: 'aaaaaaa1'
        });
        expect(res.status).toEqual(200);
        expect(res.data.token).toBeDefined();
        expect(res.data.user).toBeDefined();
        expect(res.data.groups).toBeDefined();
        done();
    });

    it('should verify gateway api rest endpoint for post: token-verify', async done => {
        const res: IAxiomRequestReturn = await axios.post(environment.mrUserService + environment.verifyTokenUrl, { 'token': TOKEN });
        expect(res.status).toBe(200);
        expect(res.data.token).toBeDefined();
        expect(res.data.user).toBeDefined();
        expect(res.data.groups).toBeDefined();
        done();
    });

    it('should verify gateway api rest endpoint for get: user-permissions', async done => {
        const res: IAxiomRequestReturn = await axios.get(environment.mrUserService + environment.permissionsUrl);
        expect(res.status).toBe(200);
        expect(res.data.id).toBeDefined();
        expect(res.data.groups).toBeDefined();
        done();
    });

    it('should get stockTakingTimes with get request', async done => {
        const res: any = await axios.get(environment.timeStampUrl + environment.getStockTimes);
        expect(res.status).toEqual(200);
        expect(res.data.length).toBeGreaterThan(0);
        done();
    });

});

// {
//     // `data` is the response that was provided by the server
//     data: {},

//     // `status` is the HTTP status code from the server response
//     status: 200,

//     // `statusText` is the HTTP status message from the server response
//     statusText: 'OK',

//     // `headers` the HTTP headers that the server responded with
//     // All header names are lower cased and can be accessed using the bracket notation.
//     // Example: `response.headers['content-type']`
//     headers: {},

//     // `config` is the config that was provided to `axios` for the request
//     config: {},

//     // `request` is the request that generated this response
//     // It is the last ClientRequest instance in node.js (in redirects)
//     // and an XMLHttpRequest instance in the browser
//     request: {}
// }


// The return data = {
//     status: 200,
//     statusText: 'OK',
//     headers:
//     {
//         server: 'gunicorn/20.0.4',
//         date: 'Wed, 09 Sep 2020 05:25:45 GMT',
//         connection: 'close',
//         'content-type': 'application/json',
//         vary: 'Accept, Origin',
//         allow: 'POST, OPTIONS',
//         'x-frame-options': 'DENY',
//         'content-length': '747',
//         'x-content-type-options': 'nosniff'
//     },
//     config:
//     {
//         url: 'user/login/',
//         method: 'post',
//         data: '{"username":"a","password":"aaaaaaa1"}',
//         headers:
//         {
//             Accept: 'application/json, text/plain, */*',
//             Authorization: 'JWT sldjghlsd',
//             'Content-Type': 'application/json;charset=utf-8',
//             'User-Agent': 'axios/0.20.0',
//             'Content-Length': 38
//         },
//         baseURL: 'http://192.168.45.30:8010/',
//         transformRequest: [[Function: transformRequest]],
//         transformResponse: [[Function: transformResponse]],
//         timeout: 0,
//         adapter: [Function: httpAdapter],
//         xsrfCookieName: 'XSRF-TOKEN',
//         xsrfHeaderName: 'X-XSRF-TOKEN',
//         maxContentLength: -1,
//         maxBodyLength: -1,
//         validateStatus: [Function: validateStatus]
//     },
//     request:
//         ClientRequest {
//     _events:
//     [Object: null prototype] {
//         socket: [Function],
//         abort: [Function],
//         aborted: [Function],
//         connect: [Function],
//         error: [Function],
//         timeout: [Function],
//         prefinish: [Function: requestOnPrefinish]
//     },
//     _eventsCount: 7,
//         _maxListeners: undefined,
//         output: [],
//         outputEncodings: [],
//         outputCallbacks: [],
//         outputSize: 0,
//         writable: true,
//         _last: true,
//         chunkedEncoding: false,
//         shouldKeepAlive: false,
//         useChunkedEncodingByDefault: true,
//         sendDate: false,
//         _removedConnection: false,
//         _removedContLen: false,
//         _removedTE: false,
//         _contentLength: null,
//         _hasBody: true,
//         _trailer: '',
//         finished: true,
//         _headerSent: true,
//         socket:
//     Socket {
//         connecting: false,
//         _hadError: false,
//         _handle: [TCP],
//         _parent: null,
//         _host: null,
//         _readableState: [ReadableState],
//         readable: true,
//         _events: [Object],
//         _eventsCount: 7,
//         _maxListeners: undefined,
//         _writableState: [WritableState],
//         writable: false,
//         allowHalfOpen: false,
//         _sockname: null,
//         _pendingData: null,
//         _pendingEncoding: '',
//         server: null,
//         _server: null,
//         parser: null,
//         _httpMessage: [Circular],
//         [Symbol(asyncId)]: 270,
//         [Symbol(lastWriteQueueSize)]: 0,
//         [Symbol(timeout)]: null,
//         [Symbol(kBytesRead)]: 0,
//         [Symbol(kBytesWritten)]: 0
//     },
//     connection:
//     Socket {
//         connecting: false,
//         _hadError: false,
//         _handle: [TCP],
//         _parent: null,
//         _host: null,
//         _readableState: [ReadableState],
//         readable: true,
//         _events: [Object],
//         _eventsCount: 7,
//         _maxListeners: undefined,
//         _writableState: [WritableState],
//         writable: false,
//         allowHalfOpen: false,
//         _sockname: null,
//         _pendingData: null,
//         _pendingEncoding: '',
//         server: null,
//         _server: null,
//         parser: null,
//         _httpMessage: [Circular],
//         [Symbol(asyncId)]: 270,
//         [Symbol(lastWriteQueueSize)]: 0,
//         [Symbol(timeout)]: null,
//         [Symbol(kBytesRead)]: 0,
//         [Symbol(kBytesWritten)]: 0
//     },
//     _header:
//     'POST /user/login/ HTTP/1.1\r\nAccept: application/json, text/plain, */*\r\nAuthorization:
//          JWT sldjghlsd\r\nContent-Type: application/json;charset=utf-8\r\nUser-Agent: axios/0.20.0\r\nContent-Length: 38\r\nHost:
//          192.168.45.30:8010\r\nConnection: close\r\n\r\n',
//         _onPendingData: [Function: noopPendingOutput],
//             agent:
//     Agent {
//         _events: [Object],
//         _eventsCount: 1,
//         _maxListeners: undefined,
//         defaultPort: 80,
//         protocol: 'http:',
//         options: [Object],
//         requests: { },
//         sockets: [Object],
//         freeSockets: { },
//         keepAliveMsecs: 1000,
//         keepAlive: false,
//         maxSockets: Infinity,
//         maxFreeSockets: 256
//     },
//     socketPath: undefined,
//         timeout: undefined,
//         method: 'POST',
//         path: '/user/login/',
//         _ended: true,
//         res:
//             IncomingMessage {
//             _readableState: [ReadableState],
//             readable: false,
//             _events: [Object],
//             _eventsCount: 3,
//             _maxListeners: undefined,
//             socket: [Socket],
//             connection: [Socket],
//             httpVersionMajor: 1,
//             httpVersionMinor: 1,
//             httpVersion: '1.1',
//             complete: true,
//             headers: [Object],
//             rawHeaders: [Array],
//             trailers: { },
//             rawTrailers: [],
//             aborted: false,
//             upgrade: false,
//             url: '',
//             method: null,
//             statusCode: 200,
//             statusMessage: 'OK',
//             client: [Socket],
//             _consuming: false,
//             _dumped: false,
//             req: [Circular],
//             responseUrl: 'http://192.168.45.30:8010/user/login/',
//             redirects: []
//     },
//     aborted: undefined,
//         timeoutCb: null,
//         upgradeOrConnect: false,
//         parser: null,
//         maxHeadersCount: null,
//         _redirectable:
//     Writable {
//         _writableState: [WritableState],
//         writable: true,
//         _events: [Object],
//         _eventsCount: 2,
//         _maxListeners: undefined,
//         _options: [Object],
//         _ended: true,
//         _ending: true,
//         _redirectCount: 0,
//         _redirects: [],
//         _requestBodyLength: 38,
//         _requestBodyBuffers: [],
//         _onNativeResponse: [Function],
//         _currentRequest: [Circular],
//         _currentUrl: 'http://192.168.45.30:8010/user/login/'
//     },
//     [Symbol(isCorked)]: false,
//         [Symbol(outHeadersKey)]:
//     [Object: null prototype] {
//         accept: [Array],
//             authorization: [Array],
//                 'content-type': [Array],
//                     'user-agent': [Array],
//                         'content-length': [Array],
//                             host: [Array]
//     }
// },
// data:
// {
//     token:
//     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.
//      eyJ1c2VyX2lkIjoxNSwidXNlcm5hbWUiOiJhIiwiZXhwIjoxNTk5NjcyMzQ0LCJlbWFpbCI6ImFAYS5jb20iLCJvcmlnX2lhdCI6MTU5OTYyOTE0NH0.Fu-_yiXA69iB6FaL1SxyytnN6DIM3ik1xOzeGP22xB8',
//     user: { id: 15, username: 'a', email: 'a@a.com' },
//     groups:
//     '[{"model": "auth.group", "pk": 1, "fields": {"name": "admin", "permissions": [1, 2, 3, 7, 8, 9, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 17, 18]}},
//      {"model": "auth.group", "pk": 2, "fields": {"name": "floor-supervisor", "permissions": [34, 58]}},
//      {"model": "auth.group", "pk": 3, "fields": {"name": "Lshape-leader", "permissions": []}},
//      {"model": "auth.group", "pk": 8, "fields": {"name": "admin-office", "permissions": []}}]'
// } }
