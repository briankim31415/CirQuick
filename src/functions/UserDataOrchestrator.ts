import UserModel from "src/models/UserModel";

export default class UserDataOrchestrator{
    static async addProjectToUser(userId: string, projectId: string, role: "admin"|"member") {
        await UserModel.updateOne({userId:userId},{
            $push:{projectsJoined:{
                projectId:projectId,
                role:role
            }}
        });
    }

    static userExists(userId: string):Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    static async getProjectsUserIsPartOf(userId:string):Promise<{projectId:string, role:string}[]>{
        return (await UserModel.findOne({userId:userId})).projectsJoined
    }
}