import Environment from "@/environ.js";

class LocalStrageController {
  /**
   * 永続化した傾国の最低駐屯騎数を取得する
   * @param {保存したキー} key
   * @param {値がない場合に返却するデフォルト値} defaultValue
   */
  getValueFromLocalStorage(key, defaultValue) {
    try {
      // 永続化した値を取得する
      let value = window.localStorage.getItem(key) || defaultValue;
      // 最低駐屯数として利用できる値の一覧を取る
      let allowValues = Environment.CASTEL_ATTACK_SELECTABLE_SPEED.map(
        (item) => item.value
      );
      if (allowValues.indexOf(value) != -1) {
        // もし最低駐屯数として利用できる値であれば、永続化領域の値を返す
        return value;
      }
    } catch {
      // 取得に失敗すればデフォルトを返す
      return defaultValue;
    }
    // 不正値が登録されていればデフォルトを返す
    return defaultValue;
  }

  /**
   * 永続化した値を取得する
   * @param {保存したキー} key
   * @param {値がない場合に返却するデフォルト値} defaultValue
   */
  getBasementFromLocalStorage(key, defaultValue) {
    try {
      // 永続化した値を取得する
      return window.localStorage.getItem(key) || defaultValue;
    } catch {
      // 取得に失敗すればデフォルトを返す
      return defaultValue;
    }
  }

  /**
   * 値を永続化する
   * @param {永続化のキー} key
   * @param {永続化する値} value
   */
  putValueToLocalStorage(key, value) {
    try {
      if ((value || "").length == 0) {
        return;
      }
      // ローカルストレージに保存する
      // もし保存に失敗したのであればログ出力する
      window.localStorage.setItem(key, value);
    } catch {
      console.log(`failed to save: ${key}`);
    }
  }
}

export default {
  controller: new LocalStrageController(),
};
