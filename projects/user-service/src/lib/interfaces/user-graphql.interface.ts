import { IShiftsTypeEdges } from 'src/app/home/shared/main-portal/date-picker/date-picker-service/date-graphql.interface'

// ===============================================================================================================================================
//                                                              user
// ===============================================================================================================================================


export class IUserType {
    id: string
    password: string
    lastLogin: string
    isSuperuser: boolean // Designates that this user has all permissions without explicitly assigning them.
    username: string // Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
    firstName: string
    lastName: string
    email: string
    isStaff: boolean  // Designates whether the user can log into this admin site.
    isActive: boolean // Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
    dateJoined: string
    shiftsSet: IShiftsTypeEdges
    rowid: number
}

export class IUserTypeNodes {
    node: IUserType
}

export class IUserTypeEdges {
    edges: IUserTypeNodes[]
}

export class IUserTypeConnection {
    somethingElseHere: IUserTypeEdges
}