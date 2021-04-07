// ===============================================================================================================================================
//                                                              productTable
// ===============================================================================================================================================

export class IProductTableType {
    id: string
    rowid: number
    productid: number // The external productService productid
    productname: string // Name of the productname for the productid if available, to make things easier for lookup purposes (Not required)
    productcontainerSet: IProductContainerTypeEdges // The internal id of the product that goes into the container
}

export class IProductTableTypeNodes {
    node: IProductTableType
}

export class IProductTableTypeEdges {
    edges: IProductTableTypeNodes[]
}

export class IProductTableTypeConnection {
    nodeProdmsItemVendor: IProductTableTypeEdges
}
// ===============================================================================================================================================
//                                                              containerName
// ===============================================================================================================================================

export class IContainerNameType {
    id: string
    rowid: number
    containerName: string // The names of all of the containers that a product can come in like; red-crate, shallow-lug etc
    description: string // A description of what the container does and maybe how it looks
    containerRanking: number // The ranking that the containers have towards one another, which ones should show first etc it you rank them
    productcontainerSet: IProductContainerTypeEdges // The id of the type of container that the product comes in
}

export class IContainerNameTypeNodes {
    node: IContainerNameType
}

export class IContainerNameTypeEdges {
    edges: IContainerNameTypeNodes[]
}

export class IContainerNameTypeConnection {
    nodeProdmsItemVendor: IContainerNameTypeEdges
}

// ===============================================================================================================================================
//                                                              productContainer
// ===============================================================================================================================================

export class IProductContainerType {
    id: string 
    rowid: number
    containerNameid: IContainerNameType // The id of the type of container that the product comes in   
    internalProductid: IProductTableType // The internal id of the product that goes into the container
    productcontainergroupjunctionSet: IProductContainerGroupJunctionTypeEdges // The id of the productcontainer that this item belongs to
    productcontainerproductionareajunctionSet: IProductContainerProductionAreaJunctionTypeEdges// The product container id
}

export class IProductContainerTypeNodes {
    node: IProductContainerType
}

export class IProductContainerTypeEdges {
    edges: IProductContainerTypeNodes[]
}

export class IProductContainerTypeConnection {
    nodeProdmsItemVendor: IProductContainerTypeEdges
}

// ===============================================================================================================================================
//                                                              productContainerDetail
// ===============================================================================================================================================

export class IProductContainerDetailType {
    id: string
    rowid: number
    productContainerid: IProductContainerType // The id of the productContainer that needs to be used, each productContainer can only have one details record
    showBatches: boolean //  Does this container work with batches, or is it always just one total amount
    active: boolean // Is the container active at the moment or is it on hold? True = active, False = on_hold
    unitsPerProductContainer: number // The amount of smaller units that a container may contain
    productContainerWeight: number // The weight of a container when it is full, to better calculate weights for various processes
}

export class IProductContainerDetailTypeNodes {
    node: IProductContainerDetailType
}

export class IProductContainerDetailTypeEdges {
    edges: IProductContainerDetailTypeNodes[]
}

export class IProductContainerDetailTypeConnection {
    nodeProdmsItemVendor: IProductContainerDetailTypeEdges
}

// ===============================================================================================================================================
//                                                              productContainerGroupName
// ===============================================================================================================================================

export class IProductContainerGroupNameType {
    id: string
    rowid: number
    groupName: string // The names of all of groups that a container can belong to like: halfStockTake, quickStockTake
    description: string // Reason the group exists, and why a container might belong to the group like: "half stock take is when you do not want to count certain lines like the polonies"
    productcontainergroupjunctionSet: IProductContainerGroupJunctionTypeEdges // The id of the group that this container belongs to
}

export class IProductContainerGroupNameTypeNodes {
    node: IProductContainerGroupNameType
}

export class IProductContainerGroupNameTypeEdges {
    edges: IProductContainerGroupNameTypeNodes[]
}

export class IProductContainerGroupNameTypeConnection {
    nodeProdmsItemVendor: IProductContainerGroupNameTypeEdges
}

// ===============================================================================================================================================
//                                                              productContainerGroupJunction
// ===============================================================================================================================================

export class IProductContainerGroupJunctionType {
    id: string
    rowid: number
    productContainerid: IProductContainerType // The id of the productcontainer that this item belongs to
    productContainerGroupid: IProductContainerGroupNameType // The id of the group that this container belongs to
}

export class IProductContainerGroupJunctionTypeNodes {
    node: IProductContainerGroupJunctionType
}

export class IProductContainerGroupJunctionTypeEdges {
    edges: IProductContainerGroupJunctionTypeNodes[]
}

export class IProductContainerGroupJunctionTypeConnection {
    nodeProdmsItemVendor: IProductContainerGroupJunctionTypeEdges
}

// ===============================================================================================================================================
//                                                              productionArea
// ===============================================================================================================================================

export class IProductionAreaType {
    id: string 
    rowid: number
    productionAreaName: string
    ranking: number
    productcontainerproductionareajunctionSet: IProductContainerProductionAreaJunctionTypeEdges // Id of the production area where the container is situated
}

export class IProductionAreaTypeNodes {
    node: IProductionAreaType
}

export class IProductionAreaTypeEdges {
    edges: IProductionAreaTypeNodes[]
}

export class IProductionAreaTypeConnection {
    nodeProdmsItemVendor: IProductionAreaTypeEdges
}

// ===============================================================================================================================================
//                                                              productContainerProductionAreaJunction
// ===============================================================================================================================================

export class IProductContainerProductionAreaJunctionType {
    id: string
    rowid: number
    productContainerid: IProductContainerType // The product container id
    productionAreaid: IProductionAreaType // Id of the production area where the container is situated
    productionAreaRanking: number
}

export class IProductContainerProductionAreaJunctionTypeNodes {
    node: IProductContainerProductionAreaJunctionType
}

export class IProductContainerProductionAreaJunctionTypeEdges {
    edges: IProductContainerProductionAreaJunctionTypeNodes[]
}

export class IProductContainerProductionAreaJunctionTypeConnection {
    nodeProdmsItemVendor: IProductContainerProductionAreaJunctionTypeEdges
}
