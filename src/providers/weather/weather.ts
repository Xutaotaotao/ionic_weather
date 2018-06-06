// 引入HttpClient, HttpHeaders
import { HttpClient, HttpHeaders } from '@angular/common/http';
// 使用 Injectable 装饰器
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherProvider {
  // 使用阿里云天气服务的API
  appCode  = 'APPCODE d55db95586584c248c45df45ad376272';//自己的appcode
  url = 'http://jisutqybmf.market.alicloudapi.com/weather/query';//Api的url
  // 检测运行应用时此服务是否调用
  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
  }
  // 获取天气数据的方法
  getWeather(city){
    return this.http.get(this.url,{
      // 头参数
      headers:new HttpHeaders().set('Authorization',this.appCode),
      // 匹配城市参数
      params:{'city':city}
    })
  }
}
