import { Body, Controller, Post, Route, Security } from "tsoa";
import UserModel, {UserInterface} from "../models/UserModel";
import { v4 as uuidv4 } from 'uuid';
import { HttpStatusCode } from "../utils/ErrorCodes";

@Route("/")
export class AdminController extends Controller {
	@Post("signup")
	public async signup(@Body() body: { username: string, password:string}): Promise<{ userId: string }|{error:any}> {
		try {
            const newUser = new UserModel({
                username:body.username,
                password:body.password,
                userId:uuidv4()
            });
            await newUser.save();

            return {userId:newUser.userId};
        } catch (error) {
            console.log(error);
            this.setStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
            return {error:error};
        }
	}
}
