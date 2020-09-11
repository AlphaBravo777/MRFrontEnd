export class IAxiomRequestReturn {
    data: {[key: string]: any};
    status: number;
    statusText: string;
    headers: {[key: string]: any};
    config: {[key: string]: any};
    request: {[key: string]: any};
}

export class IAxiomErrorReturn {
    response: IAxiomRequestReturn;
    config: {[key: string]: any};
    request: {[key: string]: any};
    isAxiosError: boolean;
    toJSON: Function;
}