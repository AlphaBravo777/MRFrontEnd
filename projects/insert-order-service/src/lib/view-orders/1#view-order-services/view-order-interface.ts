import { IRoute } from 'src/app/home/shared/services/routesServices/routes-interface';


export class IViewRoutesData extends IRoute {
    routeAmountTotal: number;
    routeAmountPercentage: string;
}
