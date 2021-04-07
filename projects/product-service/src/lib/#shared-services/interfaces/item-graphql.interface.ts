import { IProductContainerDetailTypeEdges, IProductContainerTypeEdges } from 'projects/production-service/src/lib/#shared-services/interfaces/production-graphql.interface'

// ===============================================================================================================================================
//                                                              packaging
// ===============================================================================================================================================

export class IPackagingType {
    id: string
    rowid: number
    packagingName: string // The final packaging that the unit/s are in now. Maybe a crate or box for groups or vacuum for a single packet
    weightOfPackaging: number  // This is used to calculate how much extra weight there is on a truck, besides the product. For instance if a truck have 200 crates, and it says here that a crate is 2kg, then the truck weighs 400kg more due to the packaging
}

export class IPackagingTypeNodes {
    node: IPackagingType
}

export class IPackagingTypeEdges {
    edges: IPackagingTypeNodes[]
}

export class IPackagingTypeConnection {
    somethingElseHere: IPackagingTypeEdges
}


// ===============================================================================================================================================
//                                                              measuringUnit
// ===============================================================================================================================================

export class MeasuringUnitType {
    id: string
    rowid: number
    unit: string // Any unit that a product or item can be measured in like g, kg, lt, ml, barrel, roll
    convertionToMainUnitAmount: number // What should this unit be multiplied with to make it the same value as if it was measured in its main unit, if there is no main unit, then this should just be 1
    mainUnit: MeasuringUnitType // What is the main unit that this unit will be converted to for measurements
}

export class IMeasuringUnitTypeNodes {
    node: MeasuringUnitType
}

export class IMeasuringUnitTypeEdges {
    edges: IMeasuringUnitTypeNodes[]
}

export class MeasuringUnitTypeConnection {
    nodeProdmsMeasuringUnit: IMeasuringUnitTypeEdges
}

// ===============================================================================================================================================
//                                                              itemPackaging
// ===============================================================================================================================================

export class IItemPackagingType {
    id: string
    itemid: IItemType // The item that this packaging information belongs to, this should be a o2o field cause each item can only have one packaging type
    unitPackagingid: IPackagingType // NewPackagingType! The unit packaging that the item is in: vacuum, bag
    shippingPackagingid: INewPackagingType // The outer shipping most packaging that the item is in: box, crate.
}

export class IItemPackagingTypeNodes {
    node: IItemPackagingType
}

export class IItemPackagingTypeEdges {
    edges: IItemPackagingTypeNodes[]
}

export class IItemPackagingTypeConnection {
    somethingElseHere: IItemPackagingTypeEdges
}

// ===============================================================================================================================================
//                                                              itemWeightOrSize
// ===============================================================================================================================================

export class IItemWeightOrSizeType {
    id: string
    rowid: number
    itemid: IItemType // The item that this weight or size belongs to, this should be a o2o field cause each item can only have one weigth
    weightOrSize: number // The official size of the item (can only containe numbers like 2, 1000, 0.5), and this can be weight, lenght or amounts, so size is the best description here
    weightOrSizeMeasuringUnitid: MeasuringUnitType // MeasuringUnitType Any unit that a product or item can be measured in like g, kg, lt, ml, barrel, roll
    itemShippingSize: number // The shipping size of the item (can only containe numbers like 2, 1000, 0.5), and this can be weight, lenght or amounts, so size is the best description here
    itemShippingSizeMeasurementid: MeasuringUnitType // MeasuringUnitType Any unit that a product or item can be measured in like g, kg, lt, ml, barrel, roll
    maxUnitsPerShippingUnit: number // How many units are there in the shipping packaging. There may be 10 vacuums in a crate, so if someone orders 13 vacuums, it means that 2 crates will be used. If there are always 14 units in a box, then this amount should just be 1 (Cause you can not order less than 1
}

export class IItemWeightOrSizeTypeNodes {
    node: IItemWeightOrSizeType
}

export class IItemWeightOrSizeTypeEdges {
    edges: IItemWeightOrSizeTypeNodes[]
}

export class IItemWeightOrSizeTypeConnection {
    somethingElseHere: IItemWeightOrSizeTypeEdges
}


// ===============================================================================================================================================
//                                                              item
// ===============================================================================================================================================

export class IItemType {
    id: string // The ID of the object.
    rowid: number // db id
    defaultItemName: string // The default name of the item that will show if an internal department name is not entered for the item
    description: string // The name or description of the item (Required)
    active: boolean // Is the item active at the moment or is it on hold? True = active, False = on_hold
    oldProductid: number // The old productid that the item might have had with the previous old productService
    itemvendor: IItemVendorType
    itempackaging: IItemPackagingType // ItemPackagingType
    itemweightorsize: IItemWeightOrSizeType // ItemWeightOrSizeType
    itembuildingblocksSet: [] 
    itempriceSet: []
    itemgroupingSet: IItemGroupingTypeEdges
    itemmodifieddetailSet: []
}

export class IItemTypeNodes {
    node: IItemType
}

export class IItemTypeEdges {
    edges: IItemTypeNodes[]
}

export class IItemTypeConnection {
    nodeProdmsItem: IItemTypeEdges
}

// ===============================================================================================================================================
//                                                              newPackaging
// ===============================================================================================================================================

export class INewPackagingType {
    id: string
    rowid: number
    packagingName: string // The final packaging that the unit/s are in now. Maybe a crate or box for groups or vacuum for a single packet
    weightOfPackaging: number  //  This is used to calculate how much extra weight there is on a truck, besides the product. For instance if a truck have 200 crates, and it says here that a crate is 2kg, then the truck weighs 400kg more due to the packaging
}

export class INewPackagingTypeNodes {
    node: INewPackagingType
}

export class INewPackagingTypeEdges {
    edges: INewPackagingTypeNodes[]
}

export class INewPackagingTypeConnection {
    nodeProdmsPackaging: INewPackagingTypeEdges
}

// ===============================================================================================================================================
//                                                              itemGrouping
// ===============================================================================================================================================

export class IItemGroupingType {
    id: string // The ID of the object.
    itemid: IItemType // ItemType The item which pertains to this group and department description
    departmentid: IDepartmentType // DepartmentType The department where this catagory shows up
    catagoryid: ICategoryType // CategoryType! The catagory where this group shows up
    groupid: IGroupType // GroupType! The group where this item shows up
    itemRanking: number // The ranking that this item has when listed compared to the other items in the group
    internalGroupItemName: string // The name of the item that will show in this department/group. This will over write item.defaultItemName
    rowid: number // db id
    containerDetailNode: IProductContainerDetailTypeEdges // ProductContainerDetailType
    containerNode: IIProductTableType
}

export class IItemGroupingTypeNodes {
    node: IItemGroupingType
}

export class IItemGroupingTypeEdges {
    edges: IItemGroupingTypeNodes[]
}

export class IItemGroupingTypeConnection {
    nodeProdmsItemGrouping: IItemGroupingTypeEdges
}

// ===============================================================================================================================================
//                                                              iproductTable
// ===============================================================================================================================================

export class IIProductTableType {
    id: string
    productid: number // The external productService productid
    productname: string // Name of the productname for the productid if available, to make things easier for lookup purposes (Not required)
    productcontainerSet: IProductContainerTypeEdges // The internal id of the product that goes into the container
    rowid: number
}

export class IIProductTableTypeNodes {
    node: IIProductTableType
}

export class IIProductTableTypeEdges {
    edges: IIProductTableTypeNodes[]
}

export class IIProductTableTypeConnection {
    somethingElseHere: IIProductTableTypeEdges
}

// ===============================================================================================================================================
//                                                              vendor
// ===============================================================================================================================================

export class IVendorType {
    vendorName: string  //  The name of the vendor that produced the item, or for who the item was produced
    description: string  // The description of the vendor
    rowid: number
}

export class IVendorTypeNodes {
    node: IVendorType
}

export class IVendorTypeEdges {
    edges: IVendorTypeNodes[]
}

export class IVendorTypeConnection {
    somethingElseHere: IVendorTypeEdges
}

// ===============================================================================================================================================
//                                                              itemVendor
// ===============================================================================================================================================

export class IItemVendorType {
    itemid: IItemType // The item that this vendor-item combination belongs to
    vendorid: IVendorType //  VendorType The id of the vendor that the item belongs to
    rowid: number
}

export class ItemVendorTypeNodes {
    node: IItemVendorType
}

export class ItemVendorTypeEdges {
    edges: ItemVendorTypeNodes[]
}

export class ItemVendorTypeConnection {
    nodeProdmsItemVendor: ItemVendorTypeEdges
}

// ===============================================================================================================================================
//                                                              department
// ===============================================================================================================================================

export class IDepartmentType {
    id: string
    rowid: number
    departmentName: string // The name of the department
    description: string // A description of the department, and why all the categories/units that are in this department, is in it
    rankingInDepartment: number // The ranking that this department has when listed compared to the other departments
    categorySet: ICategoryTypeEdges
}

export class IDepartmentTypeNodes {
    node: IDepartmentType
}

export class IDepartmentTypeEdges {
    edges: IDepartmentTypeNodes[]
}

export class IDepartmentTypeConnection {
    nodeProdmsDepartment: IDepartmentTypeEdges
}

// ===============================================================================================================================================
//                                                              category
// ===============================================================================================================================================

export class ICategoryType {
    id: string
    rowid: number
    categoryName: string //  The name of the category
    description: string  // A description of the category, and why all the groups/units that are in this category, is in it
    rankingInCategory: number // The ranking that this category has when listed compared to the other categories
    departmentid: IDepartmentType // The department where this catagory shows up
    groupSet: IGroupTypeEdges
}

export class ICategoryTypeNodes {
    node: ICategoryType
}

export class ICategoryTypeEdges {
    edges: ICategoryTypeNodes[]
}

export class ICategoryTypeConnection {
    nodeProdmsCategory: ICategoryTypeEdges
}

// ===============================================================================================================================================
//                                                              group
// ===============================================================================================================================================

export class IGroupType {
    id: string
    rowid: number
    groupName: string // The name of the group that this product can fall into
    rankingInGroup: number // The ranking that this group has when listed compared to the other groups
    description: string // A description of the group, and why all the units that are in this group, is in it
    categoryid: ICategoryType // The catagory where this group shows up
    itemgroupingSet : IItemGroupingTypeEdges  // The group where this item shows up
}

export class IGroupTypeNodes {
    node: IGroupType
}

export class IGroupTypeEdges {
    edges: IGroupTypeNodes[]
}

export class IGroupTypeConnection {
    nodeProdmsGroup: IGroupTypeEdges
}
