import ResourceDataOrchestrator from "src/functions/ResourceDataOrchestrator";
import { ResourceInterface } from "src/models/ResourceModel";
import { Body, Controller, Post, Route, Get, Query } from "tsoa";

@Route("resource")
export class ResourceController extends Controller {


    @Get("{id}")
    public async getResource(id:string):Promise<ResourceInterface|null>{
        return ResourceDataOrchestrator.getResourceData(id);
    }
}