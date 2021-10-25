import ResourceDataOrchestrator from "../functions/ResourceDataOrchestrator";
import ResourceModel, { ResourceInterface } from "../models/ResourceModel";
import { Body, Controller, Post, Route, Get, Query } from "tsoa";

@Route("resource")
export class ResourceController extends Controller {

    @Get("{id}")
    public async getResource(id:string):Promise<ResourceInterface|null>{
        return ResourceDataOrchestrator.getResourceData(id);
    }

    @Post("create")
    public async createResource(@Body() body:Partial<ResourceInterface>):Promise<boolean>{
        const res = new ResourceModel(body);
        await res.save();
        return true;
    }
}