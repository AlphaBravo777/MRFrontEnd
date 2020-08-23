export class IPackaging {
    packagingid: number;
    packaging: string;
    weight: number;
}

export class IDepartment {
    departmentid: number;
    name: string;
    rankingInDepartment: number;
    categories: ICategory[];
}

export class ICategory {
    categoryid: number;
    name: string;
    rankingInCategory: number;
    groups: IGroup[];
}

export class IGroup {
    groupid: number;
    name: string;
    rankingInGroup: number;
}

export class IItemVendor {
    vendor: string;
    vendorid: number;
}

export class IMeasuringUnit {
    unitid: number;
    unit: string;
    convertionToMainUnitAmount: number;
    mianUnit: string;
    mainUnitid: number;
}
