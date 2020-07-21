import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable({
    providedIn: 'root'
})
export class DynamicFormGraphqlStringsService {

    constructor() { }

    public MAIN_FORM_QUERY = gql`
    query FormComponents ($name:String) {
        nodeFormCoreMicroService (formName: $name) {
            edges{
                node{
                    formName
                    description
                    rowid
                    formcontrolbuilderSet{
                        edges{
                            node{
                                controlName
                                label
                                value
                                disabled
                                placeholder
                                ranking
                                controlType
                                control{
                                    controlName
                                    description
                                    rowid
                                }
                                formoptionsSet{
                                    edges{
                                        node{
                                            option
                                            rowid
                                        }
                                    }
                                }
                                icon{
                                    iconName
                                    description
                                    rowid
                                }
                                formvalidatorjunctionSet{
                                    edges{
                                        node{
                                            formValidatorid{
                                                validatorName
                                                value
                                                number
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    `;
}
