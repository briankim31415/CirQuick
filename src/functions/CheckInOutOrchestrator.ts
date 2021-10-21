import ResourceModel,{ResourceInterface} from "../models/ResourceModel";

export default class CheckInOutOrchestrator{
    static async updateResourceData(userId: string,  action: "checkin" | "checkout", amount: number,hwSetId:string,projectId:string):Promise<boolean>{
        const res = await ResourceModel.findOne({hwSetId: hwSetId});
        if(action=="checkin")
            amount=-amount;
        if(!res)
            return false;
        await res.updateOne({ availablity: res.availablity- amount},{
            $push:{transactions:{
                action:action,
                amount:amount,
                userId:userId,
                projectId:projectId
            }}
        });
        return true;
    }
}