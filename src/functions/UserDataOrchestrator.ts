import UserModel from "../models/UserModel";

export default class UserDataOrchestrator{
    static async addProjectToUser(userId: string, projectId: string, role: "admin"|"member") {
        await UserModel.updateOne({userId:userId},{
            $push:{projectsJoined:{
                projectId:projectId,
                role:role
            }}
        });
    }

    static async addTransactionToUser(userId: string,  action: "checkin" | "checkout", amount: number, hwSetId: string,hwSetName: string,projectId: string) {
        await UserModel.updateOne({userId:userId},{
            $push:{transactions:{
                action:action,
                amount:amount,
                hwSetId:hwSetId,
                hwSetName:hwSetName,
                projectId:projectId
            }}
        });
    }

    static async userExists(userId: string):Promise<boolean> {
        return (await UserModel.countDocuments({userId:userId})) > 0;
    }

    static async getProjectsUserIsPartOf(userId:string):Promise<{projectId:string, role:string}[]>{
        return (await UserModel.findOne({userId:userId})).projectsJoined
    }
}