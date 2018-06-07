import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
// 引入数据存储
import {Storage} from '@ionic/storage';
import {HomePage} from '../home/home'

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  // 初始城市数据类型
  city: string;

  // 使用构造注入的方式注入依赖对象
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {
    // 获取本地储存的数据并根据城市名称初始化城市数据，和主页逻辑一样
    this.storage.get('location').then((val) => {
      if (val != null) {
        let location = JSON.parse(val);
        this.city = location.city;
      } else {
        this.city = "北京";
      }
    })
  }

  // 模板中form表单绑定的saveFrom方法
  saveFrom() {
    let location = {
      city: this.city,
    }
    // 保存输入框的数据到本地存储中
    this.storage.set('location', JSON.stringify(location));
    // 设置提交后返回主页
    this.navCtrl.push(HomePage)
  }
}
