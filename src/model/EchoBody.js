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
import {ApiClient} from '../ApiClient';

/**
 * The EchoBody model module.
 * @module model/EchoBody
 * @version 1.0.0
 */
export class EchoBody {
  /**
   * Constructs a new <code>EchoBody</code>.
   * @alias module:model/EchoBody
   * @class
   * @param toEcho {String} 
   */
  constructor(toEcho) {
    this.toEcho = toEcho;
  }

  /**
   * Constructs a <code>EchoBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/EchoBody} obj Optional instance to populate.
   * @return {module:model/EchoBody} The populated <code>EchoBody</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new EchoBody();
      if (data.hasOwnProperty('toEcho'))
        obj.toEcho = ApiClient.convertToType(data['toEcho'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} toEcho
 */
EchoBody.prototype.toEcho = undefined;

