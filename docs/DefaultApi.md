# Cirquick.DefaultApi

All URIs are relative to */*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addUserToProject**](DefaultApi.md#addUserToProject) | **POST** /project/addUser | 
[**checkinResource**](DefaultApi.md#checkinResource) | **POST** /checkinout/checkin | 
[**checkoutResource**](DefaultApi.md#checkoutResource) | **POST** /checkinout/checkout | 
[**createProject**](DefaultApi.md#createProject) | **POST** /project/create | 
[**exampleEcho**](DefaultApi.md#exampleEcho) | **POST** /echo | 
[**getProject**](DefaultApi.md#getProject) | **GET** /project/{id} | 
[**getResource**](DefaultApi.md#getResource) | **GET** /resource/{id} | 
[**getUserProjects**](DefaultApi.md#getUserProjects) | **GET** /user/projects | 
[**reset**](DefaultApi.md#reset) | **POST** /reset | 
[**signin**](DefaultApi.md#signin) | **POST** /signin | 
[**signup**](DefaultApi.md#signup) | **POST** /signup | 
[**updateUser**](DefaultApi.md#updateUser) | **POST** /user | 

<a name="addUserToProject"></a>
# **addUserToProject**
> addUserToProject(body)



### Example
```javascript
import {Cirquick} from 'cirquick';

let apiInstance = new Cirquick.DefaultApi();
let body = new Cirquick.ProjectAddUserBody(); // ProjectAddUserBody | 

apiInstance.addUserToProject(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ProjectAddUserBody**](ProjectAddUserBody.md)|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

<a name="checkinResource"></a>
# **checkinResource**
> InlineResponse2001 checkinResource(body)



### Example
```javascript
import {Cirquick} from 'cirquick';

let apiInstance = new Cirquick.DefaultApi();
let body = new Cirquick.CheckinoutCheckinBody(); // CheckinoutCheckinBody | 

apiInstance.checkinResource(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**CheckinoutCheckinBody**](CheckinoutCheckinBody.md)|  | 

### Return type

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="checkoutResource"></a>
# **checkoutResource**
> InlineResponse2001 checkoutResource(body)



### Example
```javascript
import {Cirquick} from 'cirquick';

let apiInstance = new Cirquick.DefaultApi();
let body = new Cirquick.CheckinoutCheckoutBody(); // CheckinoutCheckoutBody | 

apiInstance.checkoutResource(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**CheckinoutCheckoutBody**](CheckinoutCheckoutBody.md)|  | 

### Return type

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createProject"></a>
# **createProject**
> InlineResponse2002 createProject(body)



### Example
```javascript
import {Cirquick} from 'cirquick';

let apiInstance = new Cirquick.DefaultApi();
let body = new Cirquick.ProjectCreateBody(); // ProjectCreateBody | 

apiInstance.createProject(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ProjectCreateBody**](ProjectCreateBody.md)|  | 

### Return type

[**InlineResponse2002**](InlineResponse2002.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="exampleEcho"></a>
# **exampleEcho**
> InlineResponse2005 exampleEcho(body)



### Example
```javascript
import {Cirquick} from 'cirquick';
let defaultClient = Cirquick.ApiClient.instance;


let apiInstance = new Cirquick.DefaultApi();
let body = new Cirquick.EchoBody(); // EchoBody | 

apiInstance.exampleEcho(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**EchoBody**](EchoBody.md)|  | 

### Return type

[**InlineResponse2005**](InlineResponse2005.md)

### Authorization

[api_key](../README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getProject"></a>
# **getProject**
> InlineResponse2003 getProject(id)



### Example
```javascript
import {Cirquick} from 'cirquick';

let apiInstance = new Cirquick.DefaultApi();
let id = "id_example"; // String | 

apiInstance.getProject(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

[**InlineResponse2003**](InlineResponse2003.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getResource"></a>
# **getResource**
> InlineResponse2004 getResource(id)



### Example
```javascript
import {Cirquick} from 'cirquick';

let apiInstance = new Cirquick.DefaultApi();
let id = "id_example"; // String | 

apiInstance.getResource(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

[**InlineResponse2004**](InlineResponse2004.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getUserProjects"></a>
# **getUserProjects**
> [InlineResponse2006] getUserProjects(userId)



### Example
```javascript
import {Cirquick} from 'cirquick';

let apiInstance = new Cirquick.DefaultApi();
let userId = "userId_example"; // String | 

apiInstance.getUserProjects(userId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**|  | 

### Return type

[**[InlineResponse2006]**](InlineResponse2006.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="reset"></a>
# **reset**
> InlineResponse200 reset(body)



### Example
```javascript
import {Cirquick} from 'cirquick';

let apiInstance = new Cirquick.DefaultApi();
let body = new Cirquick.ResetBody(); // ResetBody | 

apiInstance.reset(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ResetBody**](ResetBody.md)|  | 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="signin"></a>
# **signin**
> InlineResponse200 signin(body)



### Example
```javascript
import {Cirquick} from 'cirquick';

let apiInstance = new Cirquick.DefaultApi();
let body = new Cirquick.SigninBody(); // SigninBody | 

apiInstance.signin(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**SigninBody**](SigninBody.md)|  | 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="signup"></a>
# **signup**
> InlineResponse200 signup(body)



### Example
```javascript
import {Cirquick} from 'cirquick';

let apiInstance = new Cirquick.DefaultApi();
let body = new Cirquick.SignupBody(); // SignupBody | 

apiInstance.signup(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**SignupBody**](SignupBody.md)|  | 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateUser"></a>
# **updateUser**
> &#x27;Boolean&#x27; updateUser(body)



### Example
```javascript
import {Cirquick} from 'cirquick';

let apiInstance = new Cirquick.DefaultApi();
let body = new Cirquick.PartialUserInterface_(); // PartialUserInterface_ | 

apiInstance.updateUser(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**PartialUserInterface_**](PartialUserInterface_.md)|  | 

### Return type

**&#x27;Boolean&#x27;**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

