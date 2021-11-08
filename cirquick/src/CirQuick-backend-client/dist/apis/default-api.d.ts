/**
 * cirquick
 * Backend for Cirquick
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
import { RequestArgs, BaseAPI } from '../base';
import { CheckinoutCheckinBody } from '../models';
import { CheckinoutCheckoutBody } from '../models';
import { EchoBody } from '../models';
import { InlineResponse200 } from '../models';
import { InlineResponse2001 } from '../models';
import { InlineResponse2002 } from '../models';
import { InlineResponse2003 } from '../models';
import { InlineResponse2004 } from '../models';
import { InlineResponse2005 } from '../models';
import { InlineResponse2006 } from '../models';
import { PartialUserInterface_ } from '../models';
import { ProjectAddUserBody } from '../models';
import { ProjectCreateBody } from '../models';
import { ResetBody } from '../models';
import { SigninBody } from '../models';
import { SignupBody } from '../models';
/**
 * DefaultApi - axios parameter creator
 * @export
 */
export declare const DefaultApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     *
     * @param {ProjectAddUserBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addUserToProject: (body: ProjectAddUserBody, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @param {CheckinoutCheckinBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    checkinResource: (body: CheckinoutCheckinBody, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @param {CheckinoutCheckoutBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    checkoutResource: (body: CheckinoutCheckoutBody, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @param {ProjectCreateBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createProject: (body: ProjectCreateBody, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @param {EchoBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    exampleEcho: (body: EchoBody, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getProject: (id: string, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getResource: (id: string, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @param {string} userId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getUserProjects: (userId: string, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @param {ResetBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    reset: (body: ResetBody, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @param {SigninBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    signin: (body: SigninBody, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @param {SignupBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    signup: (body: SignupBody, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @param {PartialUserInterface_} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateUser: (body: PartialUserInterface_, options?: any) => Promise<RequestArgs>;
};
/**
 * DefaultApi - functional programming interface
 * @export
 */
export declare const DefaultApiFp: (configuration?: Configuration) => {
    /**
     *
     * @param {ProjectAddUserBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addUserToProject(body: ProjectAddUserBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    /**
     *
     * @param {CheckinoutCheckinBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    checkinResource(body: CheckinoutCheckinBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2001>>;
    /**
     *
     * @param {CheckinoutCheckoutBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    checkoutResource(body: CheckinoutCheckoutBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2001>>;
    /**
     *
     * @param {ProjectCreateBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createProject(body: ProjectCreateBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2002>>;
    /**
     *
     * @param {EchoBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    exampleEcho(body: EchoBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2005>>;
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getProject(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2003>>;
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getResource(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2004>>;
    /**
     *
     * @param {string} userId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getUserProjects(userId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<InlineResponse2006>>>;
    /**
     *
     * @param {ResetBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    reset(body: ResetBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse200>>;
    /**
     *
     * @param {SigninBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    signin(body: SigninBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse200>>;
    /**
     *
     * @param {SignupBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    signup(body: SignupBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse200>>;
    /**
     *
     * @param {PartialUserInterface_} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateUser(body: PartialUserInterface_, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<boolean>>;
};
/**
 * DefaultApi - factory interface
 * @export
 */
export declare const DefaultApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     *
     * @param {ProjectAddUserBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addUserToProject(body: ProjectAddUserBody, options?: any): AxiosPromise<void>;
    /**
     *
     * @param {CheckinoutCheckinBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    checkinResource(body: CheckinoutCheckinBody, options?: any): AxiosPromise<InlineResponse2001>;
    /**
     *
     * @param {CheckinoutCheckoutBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    checkoutResource(body: CheckinoutCheckoutBody, options?: any): AxiosPromise<InlineResponse2001>;
    /**
     *
     * @param {ProjectCreateBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createProject(body: ProjectCreateBody, options?: any): AxiosPromise<InlineResponse2002>;
    /**
     *
     * @param {EchoBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    exampleEcho(body: EchoBody, options?: any): AxiosPromise<InlineResponse2005>;
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getProject(id: string, options?: any): AxiosPromise<InlineResponse2003>;
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getResource(id: string, options?: any): AxiosPromise<InlineResponse2004>;
    /**
     *
     * @param {string} userId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getUserProjects(userId: string, options?: any): AxiosPromise<Array<InlineResponse2006>>;
    /**
     *
     * @param {ResetBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    reset(body: ResetBody, options?: any): AxiosPromise<InlineResponse200>;
    /**
     *
     * @param {SigninBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    signin(body: SigninBody, options?: any): AxiosPromise<InlineResponse200>;
    /**
     *
     * @param {SignupBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    signup(body: SignupBody, options?: any): AxiosPromise<InlineResponse200>;
    /**
     *
     * @param {PartialUserInterface_} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateUser(body: PartialUserInterface_, options?: any): AxiosPromise<boolean>;
};
/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export declare class DefaultApi extends BaseAPI {
    /**
     *
     * @param {ProjectAddUserBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    addUserToProject(body: ProjectAddUserBody, options?: any): Promise<import("axios").AxiosResponse<void>>;
    /**
     *
     * @param {CheckinoutCheckinBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    checkinResource(body: CheckinoutCheckinBody, options?: any): Promise<import("axios").AxiosResponse<InlineResponse2001>>;
    /**
     *
     * @param {CheckinoutCheckoutBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    checkoutResource(body: CheckinoutCheckoutBody, options?: any): Promise<import("axios").AxiosResponse<InlineResponse2001>>;
    /**
     *
     * @param {ProjectCreateBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    createProject(body: ProjectCreateBody, options?: any): Promise<import("axios").AxiosResponse<InlineResponse2002>>;
    /**
     *
     * @param {EchoBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    exampleEcho(body: EchoBody, options?: any): Promise<import("axios").AxiosResponse<InlineResponse2005>>;
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getProject(id: string, options?: any): Promise<import("axios").AxiosResponse<InlineResponse2003>>;
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getResource(id: string, options?: any): Promise<import("axios").AxiosResponse<InlineResponse2004>>;
    /**
     *
     * @param {string} userId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    getUserProjects(userId: string, options?: any): Promise<import("axios").AxiosResponse<InlineResponse2006[]>>;
    /**
     *
     * @param {ResetBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    reset(body: ResetBody, options?: any): Promise<import("axios").AxiosResponse<InlineResponse200>>;
    /**
     *
     * @param {SigninBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    signin(body: SigninBody, options?: any): Promise<import("axios").AxiosResponse<InlineResponse200>>;
    /**
     *
     * @param {SignupBody} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    signup(body: SignupBody, options?: any): Promise<import("axios").AxiosResponse<InlineResponse200>>;
    /**
     *
     * @param {PartialUserInterface_} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    updateUser(body: PartialUserInterface_, options?: any): Promise<import("axios").AxiosResponse<boolean>>;
}