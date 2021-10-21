import ProjectDataOrchestrator from "../functions/ProjectDataOrchestrator";
import UserDataOrchestrator from "../functions/UserDataOrchestrator";
import CheckInOutOrchestrator from "../functions/CheckInOutOrchestrator";
import ResourceDataOrchestrator from "../functions/ResourceDataOrchestrator";
import { ProjectInterface } from "../models/ProjectModel";
import { HttpStatusCode } from "../utils/ErrorCodes";
import { Body, Controller, Post, Route, Get } from "tsoa";

@Route("checkinout")
export class CheckInOutController extends Controller {

    @Post("checkout")
    public async checkoutResource(@Body() body:{hwSetId:string,  amount:number, userId:string,projectId:string}):Promise<{hwSetId:string}|{error:string}>{
        if(!await UserDataOrchestrator.userExists(body.userId)){
            this.setStatus(HttpStatusCode.NOT_FOUND);
            return {error: "User does not exist"}
        }

        const res = await ResourceDataOrchestrator.getResourceData(body.hwSetId);

        if(res==null){
            this.setStatus(HttpStatusCode.NOT_FOUND);
            return {error: "hwSet does not exist"}
        }
        
        if(res.availablity<body.amount){
            this.setStatus(HttpStatusCode.BAD_REQUEST);
            return {error: "Request amount out of range"}
        }
        if(CheckInOutOrchestrator.updateResourceData(body.userId,"checkout",body.amount,body.hwSetId,body.projectId)){
            UserDataOrchestrator.addTransactionToUser(body.userId,"checkout",body.amount,body.hwSetId,res.hwSetName,body.projectId);
            ProjectDataOrchestrator.changeResourcesToProject(body.userId,"checkout",res.capacity,body.amount,body.hwSetId,res.hwSetName,body.projectId);
            ProjectDataOrchestrator.addTransactionToProject(body.userId,"checkout",body.amount,body.hwSetId,res.hwSetName,body.projectId);
            return {hwSetId:res.hwSetId}
        }else{
            return {error:"update Resource database failed"}
        }
    }

    @Post("checkin")
    public async checkinResource(@Body() body:{hwSetId:string,  amount:number, userId:string,projectId:string}):Promise<{hwSetId:string}|{error:string}>{
        if(!await UserDataOrchestrator.userExists(body.userId)){
            this.setStatus(HttpStatusCode.NOT_FOUND);
            return {error: "User does not exist"}
        }

        const res = await ResourceDataOrchestrator.getResourceData(body.hwSetId);

        if(res==null){
            this.setStatus(HttpStatusCode.NOT_FOUND);
            return {error: "hwSet does not exist"}
        }
        
        if(res.availablity<body.amount){
            this.setStatus(HttpStatusCode.BAD_REQUEST);
            return {error: "Request amount out of range"}
        }
        if(CheckInOutOrchestrator.updateResourceData(body.userId,"checkin",body.amount,body.hwSetId,body.projectId)){
            UserDataOrchestrator.addTransactionToUser(body.userId,"checkin",body.amount,body.hwSetId,res.hwSetName,body.projectId);
            ProjectDataOrchestrator.changeResourcesToProject(body.userId,"checkin",res.capacity,body.amount,body.hwSetId,res.hwSetName,body.projectId);
            ProjectDataOrchestrator.addTransactionToProject(body.userId,"checkin",body.amount,body.hwSetId,res.hwSetName,body.projectId);
            return {hwSetId:res.hwSetId}
        }else{
            return {error:"update Resource database failed"}
        }
    }
}