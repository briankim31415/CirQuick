import ProjectDataOrchestrator from "../functions/ProjectDataOrchestrator";
import UserDataOrchestrator from "../functions/UserDataOrchestrator";
import { ProjectInterface } from "../models/ProjectModel";
import { HttpStatusCode } from "../utils/ErrorCodes";
import { Body, Controller, Post, Route, Get } from "tsoa";

@Route("project")
export class ProjectController extends Controller {

    @Post("create")
    public async createProject(@Body() body:{name:string, description:string, userId:string}):Promise<{projectId:string}|{error:string}>{
        if(!await UserDataOrchestrator.userExists(body.userId)){
            this.setStatus(HttpStatusCode.NOT_FOUND);
            return {error: "User does not exist"}
        }

        const res = await ProjectDataOrchestrator.create(body.name,body.description,body.userId);

        if(res[0]){
            await UserDataOrchestrator.addProjectToUser(body.userId,res[1],"admin");
            return {projectId:res[1]}
        } else {
            return {error:res[1]}
        }
    }

    @Get("{id}")
    public async getProject(id:string):Promise<ProjectInterface|null>{
        return ProjectDataOrchestrator.getProject(id);
    }

    @Post("addUser")
    public async addUserToProject(@Body() body:{userId:string, projectId:string}){
        await UserDataOrchestrator.addProjectToUser(body.userId,body.projectId,"member");
        await ProjectDataOrchestrator.addUser(body.userId,body.projectId);
    }
}