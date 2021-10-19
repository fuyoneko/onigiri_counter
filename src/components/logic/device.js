/**
 * iOSの挙動が大きく異なるため、デバイスの判定ロジックを入れる
 */
class DeviceClass {
  // 定義外のデバイス
  ANY_DEVICE = 0;
  // iOSデバイス
  IOS_DEVICE = 1;

  /**
   * デバイスの種別を取得する
   */
  get type() {
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("iphone") != -1 || userAgent.indexOf("ipad") != -1) {
      return this.IOS_DEVICE;
    }
    return this.ANY_DEVICE;
  }

  /**
   * iOSデバイスか？
   */
  get isIOS() {
    return this.type == this.IOS_DEVICE;
  }
}

export default new DeviceClass();
