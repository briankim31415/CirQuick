/*
 * cirquick
 * Backend for Cirquick
 *
 * OpenAPI spec version: 1.0.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.29
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from './ApiClient';
import {AnyOfinlineResponse200} from './model/AnyOfinlineResponse200';
import {AnyOfinlineResponse2001} from './model/AnyOfinlineResponse2001';
import {AnyOfinlineResponse2002} from './model/AnyOfinlineResponse2002';
import {CheckinoutCheckinBody} from './model/CheckinoutCheckinBody';
import {CheckinoutCheckoutBody} from './model/CheckinoutCheckoutBody';
import {EchoBody} from './model/EchoBody';
import {InlineResponse200} from './model/InlineResponse200';
import {InlineResponse2001} from './model/InlineResponse2001';
import {InlineResponse2002} from './model/InlineResponse2002';
import {InlineResponse2003} from './model/InlineResponse2003';
import {InlineResponse2004} from './model/InlineResponse2004';
import {InlineResponse2005} from './model/InlineResponse2005';
import {InlineResponse2006} from './model/InlineResponse2006';
import {PartialUserInterfaceProjectsJoined} from './model/PartialUserInterfaceProjectsJoined';
import {PartialUserInterfaceTransactions} from './model/PartialUserInterfaceTransactions';
import {PartialUserInterface_} from './model/PartialUserInterface_';
import {ProjectAddUserBody} from './model/ProjectAddUserBody';
import {ProjectCreateBody} from './model/ProjectCreateBody';
import {ProjectInterface} from './model/ProjectInterface';
import {ProjectInterfaceResources} from './model/ProjectInterfaceResources';
import {ProjectInterfaceTransactions} from './model/ProjectInterfaceTransactions';
import {ProjectInterfaceUsersCheckedOut} from './model/ProjectInterfaceUsersCheckedOut';
import {ResetBody} from './model/ResetBody';
import {ResourceInterface} from './model/ResourceInterface';
import {ResourceInterfaceTransactions} from './model/ResourceInterfaceTransactions';
import {SigninBody} from './model/SigninBody';
import {SignupBody} from './model/SignupBody';
import {DefaultApi} from './api/DefaultApi';

/**
* Backend_for_Cirquick.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var Cirquick = require('index'); // See note below*.
* var xxxSvc = new Cirquick.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new Cirquick.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new Cirquick.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new Cirquick.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 1.0.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The AnyOfinlineResponse200 model constructor.
     * @property {module:model/AnyOfinlineResponse200}
     */
    AnyOfinlineResponse200,

    /**
     * The AnyOfinlineResponse2001 model constructor.
     * @property {module:model/AnyOfinlineResponse2001}
     */
    AnyOfinlineResponse2001,

    /**
     * The AnyOfinlineResponse2002 model constructor.
     * @property {module:model/AnyOfinlineResponse2002}
     */
    AnyOfinlineResponse2002,

    /**
     * The CheckinoutCheckinBody model constructor.
     * @property {module:model/CheckinoutCheckinBody}
     */
    CheckinoutCheckinBody,

    /**
     * The CheckinoutCheckoutBody model constructor.
     * @property {module:model/CheckinoutCheckoutBody}
     */
    CheckinoutCheckoutBody,

    /**
     * The EchoBody model constructor.
     * @property {module:model/EchoBody}
     */
    EchoBody,

    /**
     * The InlineResponse200 model constructor.
     * @property {module:model/InlineResponse200}
     */
    InlineResponse200,

    /**
     * The InlineResponse2001 model constructor.
     * @property {module:model/InlineResponse2001}
     */
    InlineResponse2001,

    /**
     * The InlineResponse2002 model constructor.
     * @property {module:model/InlineResponse2002}
     */
    InlineResponse2002,

    /**
     * The InlineResponse2003 model constructor.
     * @property {module:model/InlineResponse2003}
     */
    InlineResponse2003,

    /**
     * The InlineResponse2004 model constructor.
     * @property {module:model/InlineResponse2004}
     */
    InlineResponse2004,

    /**
     * The InlineResponse2005 model constructor.
     * @property {module:model/InlineResponse2005}
     */
    InlineResponse2005,

    /**
     * The InlineResponse2006 model constructor.
     * @property {module:model/InlineResponse2006}
     */
    InlineResponse2006,

    /**
     * The PartialUserInterfaceProjectsJoined model constructor.
     * @property {module:model/PartialUserInterfaceProjectsJoined}
     */
    PartialUserInterfaceProjectsJoined,

    /**
     * The PartialUserInterfaceTransactions model constructor.
     * @property {module:model/PartialUserInterfaceTransactions}
     */
    PartialUserInterfaceTransactions,

    /**
     * The PartialUserInterface_ model constructor.
     * @property {module:model/PartialUserInterface_}
     */
    PartialUserInterface_,

    /**
     * The ProjectAddUserBody model constructor.
     * @property {module:model/ProjectAddUserBody}
     */
    ProjectAddUserBody,

    /**
     * The ProjectCreateBody model constructor.
     * @property {module:model/ProjectCreateBody}
     */
    ProjectCreateBody,

    /**
     * The ProjectInterface model constructor.
     * @property {module:model/ProjectInterface}
     */
    ProjectInterface,

    /**
     * The ProjectInterfaceResources model constructor.
     * @property {module:model/ProjectInterfaceResources}
     */
    ProjectInterfaceResources,

    /**
     * The ProjectInterfaceTransactions model constructor.
     * @property {module:model/ProjectInterfaceTransactions}
     */
    ProjectInterfaceTransactions,

    /**
     * The ProjectInterfaceUsersCheckedOut model constructor.
     * @property {module:model/ProjectInterfaceUsersCheckedOut}
     */
    ProjectInterfaceUsersCheckedOut,

    /**
     * The ResetBody model constructor.
     * @property {module:model/ResetBody}
     */
    ResetBody,

    /**
     * The ResourceInterface model constructor.
     * @property {module:model/ResourceInterface}
     */
    ResourceInterface,

    /**
     * The ResourceInterfaceTransactions model constructor.
     * @property {module:model/ResourceInterfaceTransactions}
     */
    ResourceInterfaceTransactions,

    /**
     * The SigninBody model constructor.
     * @property {module:model/SigninBody}
     */
    SigninBody,

    /**
     * The SignupBody model constructor.
     * @property {module:model/SignupBody}
     */
    SignupBody,

    /**
    * The DefaultApi service constructor.
    * @property {module:api/DefaultApi}
    */
    DefaultApi
};
