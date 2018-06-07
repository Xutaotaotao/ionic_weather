import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
// 引入WeatherProvider服务
import {WeatherProvider} from '../../providers/weather/weather';
// 引入数据存储
import {Storage} from '@ionic/storage'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // 定义控制器中需要用到的数据及类型
  weatherResult: any;
  weather: any
  weatherImg: string;
  location: {
    city: string,
  };

  // 使用构造注入的方式注入依赖对象
  constructor(
    public navCtrl: NavController,
    private weatherProvider: WeatherProvider,
    private storage: Storage
  ) {
  }

  // 初始化视图数据
  ionViewWillEnter() {
    // 获取本地储存的数据并根据城市名称初始化城市数据
    this.storage.get('location').then((val) => {
      // 如果本地储存的数据不为空
      if (val != null) {
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city: '北京',
        }
      }
      // 用天气服务获得当前城市的天气数据
      this.weatherProvider.getWeather(this.location.city)
        .subscribe(weatherResult => {
            this.weatherResult = weatherResult;
            // 天气对象
            this.weather = this.weatherResult.result;
            // 天气图片使用墨迹天气的链接拼接imgurl
            this.weatherImg = 'http://www.moji.com//templets/mojichina/images/weather/weather/w' + this.weather.img + ".png";
          }
        )
    })
  }
}
