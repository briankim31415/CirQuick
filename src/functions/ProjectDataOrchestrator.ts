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

    static async getProject(projectId:string):Promise<ProjectInterface|null>{
        return await ProjectModel.findOne({projectId:projectId})??null;
    }
    static async getName(projectId: string): Promise<string> {
        return ((await ProjectModel.findOne({projectId:projectId}))??{name:"Unknown"}).name;
    }
}