import ProjectModel,{ProjectInterface} from "src/models/ProjectModel";
import { v4 as uuidv4 } from 'uuid';

export default class ProjectDataOrchestrator{
    static async addUser(userId: string, projectId: string) {
        await ProjectModel.updateOne({projectId:projectId},{
            $addToSet:{usersJoined:userId}
        });
    }
    
    static async create(name:string, description:string, userId:string):Promise<[boolean,string]>{
        if(await ProjectModel.findOne({name:name})??null != null){
            return [false, "Project with this name already exists"];
        }
        const project = new ProjectModel({
            name:name,
            description:description,
            admin:userId,
            usersJoined:[userId],
            projectId: uuidv4()
        });
        try {
            await project.save();
            return [true,project.projectId];
        } catch (error) {
            console.log(error);
            return [false, "Error creating a new project"];
        }
    }

    //TODO
    static async changeResourcesToProject(userId: string,action: "checkin" | "checkout", totalResources: number, amount: number, hwSetId: string,hwSetName: string,projectId: string):Promise<boolean> {
        const res=ProjectDataOrchestrator.getProject(projectId);
        if(res == null){
            return false;
        }else{
            if(action=="checkin"){
                amount=-amount;
            }
            await ProjectModel.updateOne({userId:userId},{currentResources:(await res).currentResources+amount},{
                $set:{"resources.$hwSetId":{
                    totalResources:totalResources,
                        $push:{usersCheckedOut:{
                                amount:amount,
                                checkedOutBy:userId
                            }}
                }}
            });
            return true;
        }
        
    }

    static async addTransactionToProject(userId: string,  action: "checkin" | "checkout", amount: number, hwSetId: string,hwSetName: string,projectId: string) {
        await ProjectModel.updateOne({userId:userId},{
            $push:{transactions:{
                action:action,
                amount:amount,
                hwSetId:hwSetId,
                hwSetName:hwSetName,
                projectId:projectId
            }}
        });
    }

    static async getProject(projectId:string):Promise<ProjectInterface|null>{
        return await ProjectModel.findOne({projectId:projectId})??null;
    }
    static async getName(projectId: string): Promise<string> {
        return ((await ProjectModel.findOne({projectId:projectId}))??{name:"Unknown"}).name;
    }
}