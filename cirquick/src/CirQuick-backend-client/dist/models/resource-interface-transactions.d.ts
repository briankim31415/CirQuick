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
/**
 *
 * @export
 * @interface ResourceInterfaceTransactions
 */
export interface ResourceInterfaceTransactions {
    /**
     *
     * @type {string}
     * @memberof ResourceInterfaceTransactions
     */
    projectId: any;
    /**
     *
     * @type {string}
     * @memberof ResourceInterfaceTransactions
     */
    userId: any;
    /**
     *
     * @type {number}
     * @memberof ResourceInterfaceTransactions
     */
    amount: any;
    /**
     *
     * @type {string}
     * @memberof ResourceInterfaceTransactions
     */
    action: ResourceInterfaceTransactionsActionEnum;
}
/**
    * @export
    * @enum {string}
    */
export declare enum ResourceInterfaceTransactionsActionEnum {
    Checkin = "checkin",
    Checkout = "checkout"
}
