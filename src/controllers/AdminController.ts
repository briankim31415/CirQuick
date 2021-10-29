import { Body, Controller, Post, Route, Security } from "tsoa";
import UserModel, {UserInterface} from "../models/UserModel";
import { v4 as uuidv4 } from 'uuid';
import { HttpStatusCode } from "../utils/ErrorCodes";
import bcrypt from "bcrypt";
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
  @Post("signin")
	public async signin(@Body() body: { username: string, password:string}): Promise<{ userId: string }|{error:any}> {
		try {
            const user = await UserModel.findOne({username: body.username});
            if(user){
              if(await bcrypt.compare(body.password,user.password)){
                return {userId:user.userId};
              }
              else{
                return {error:"password error"}; 
              }
            }
            else{
              return {error:"No account exists"};
            }
        } catch (error) {
            console.log(error);
            this.setStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
            return {error:error};
        }
	}
  @Post("reset")
	public async reset(@Body() body: { username: string, password:string, repassword:string}): Promise<{ userId: string }|{error:any}> {
		try {
            const query =UserModel.findOne({username: body.username});
            query.exec((err, data) => {
                if(!err){
                  if (body.repassword != body.password) {
                    return {error:"password not match"};
                  }
                  else{
                    UserModel.updateOne({ username: body.username }, { password: body.password });
                    return {username:body.username};
                  }
                }
                else{
                    return {error:"No account exists"};
                }
              });
        } catch (error) {
            console.log(error);
            this.setStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
            return {error:error};
        }
	}
}
