import ProjectDataOrchestrator from "../functions/ProjectDataOrchestrator";
import UserDataOrchestrator from "../functions/UserDataOrchestrator";
import { UserInterface } from "../models/UserModel";
import { Body, Controller, Post, Route, Get, Query } from "tsoa";

@Route("user")
export class UserController extends Controller {

    @Post()
    public async updateUser(@Body() body:Partial<UserInterface>):Promise<boolean>{
        throw new Error("Not Implemented")
    }

    @Get("projects")
    public async getUserProjects(@Query() userId:string):Promise<{projectId:string, role:string, name:string}[]>{
        const usersProjects = await UserDataOrchestrator.getProjectsUserIsPartOf(userId);
        const promises = usersProjects.map(async project => {
            return {
                ...project,
                name: await ProjectDataOrchestrator.getName(project.projectId)
            }
        });

        return Promise.all(promises);
    }
}