import ResourceModel,{ResourceInterface} from "src/models/ResourceModel";

export default class ResourceDataOrchestrator{
    static async getResourceData(hwSetId:string):Promise<ResourceInterface|null>{
        return await ResourceModel.findOne({hwSetId:hwSetId})??null;
    }
}