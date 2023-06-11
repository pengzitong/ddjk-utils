# ddjk-utils 工具库

## cookie文档

### 用法

```javascript
import { AppCookieStorage } from "ddjk-utils-beta/dist/cookie";

/**
 * @namespace string 隔离cookie使用的命名空间
 * @maxlength number 最大存储的cookie长度，默认200
 */
Vue.prototype.$cookieHandler = new AppCookieStorage('app', 200);

// 组件内使用
this.$cookieHandler.setCookie('name', '张三', 24 * 60 * 60, 'jk.com')
```

### cookie api
* getCookie(key)
  * key: string, 从cookie中取值的键名 
* setCookie(key, value, maxAge, domain)
  * key: string, 需要往cookie中设置的键名
  * value: string, 需要往cookie中设置的键值
  * maxAge: number, 有效期，以秒为单位，如设置一天可以写成24 * 60 * 60
  * domain: string, cookie对应的域名
* removeCookie(key, domain)
  * key: string, 需要从cookie中删除的键名 

## storage文档

### 用法

```javascript
import { AppLocalStorage, AppSessionStorage } from "ddjk-utils-beta/dist/storage";
/**
 * @namespace string 隔离cookie使用的命名空间
 */
Vue.prototype.$localStorageHandler = new AppLocalStorage('app')

Vue.prototype.$sessionStorageHandler = new AppSessionStorage('app')

```

### storage api
* getItem(key)
  * key: string, 从storage中取值的键名 
* setItem(key, value)
  * key: string, 向storage中设置的键名 
  * value: string, 向storage中设置的键值
* removeItem(key)
  * key: string, 从storage删除的键名
* clear() 清除全部storage

## 推荐的使用范围

### cookie使用范围

* 建议非特殊情况下不通过cookie进行通信，特殊情况下如遇到必须使用cookie时，尽量减少cookie的存储长度。
* 目前项目中，除中台的后台管理系统，其他项目中均不使用cookie操作。

### storage的使用范围

#### 商城模块

* appId    app应用id，相当于appkey
* appMark
* jk-token
* refresh-token
* ut
* appUserSecret
* userInfo 幂健康用户信息
  * appId  app端侧id，e.g. 101 102 103 104
  * appIdType
  * avatar
  * isSkipToUploadPage
  * loginUserId
  * phone
  * registerStep
  * registerTime
  * userId
  * userName
* redirectUrl
* odyUserLoginInfo
  * odyUserId  欧电userId
  * ut
* thirdChannelInfo  渠道信息
  * channelCode  渠道code，e.g. "0001080003,0001080001"

#### 其他模块待补充
