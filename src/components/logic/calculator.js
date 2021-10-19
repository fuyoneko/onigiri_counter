/**
 * 数値の計算ロジックを定義する
 */
class MathMethods {
  /**
   * 全ての値の合計を返す
   * @param {データの配列} dataList
   * @param {データから値を取得するメソッド} accessor
   */
  sum(dataList, accessor) {
    let result = 0;
    for (let data of dataList) {
      // 配列の各項目から値を取得、resultに追加する
      result += accessor(data);
    }
    return result;
  }

  /**
   * 値の平均を返す
   * @param {データの配列} dataList
   * @param {データから値を取得するメソッド} accessor
   */
  average(dataList, accessor) {
    const total = this.sum(dataList, accessor);
    return total / dataList.length;
  }

  /**
   * 防衛可能時間を返す
   * @param {データの配列} dataList
   * @param {データから値を取得するメソッド} accessor
   * @param {1分あたりの防衛に必要なおにぎりの数} baseNumber
   */
  castel(dataList, accessor, baseNumber) {
    const total = this.sum(dataList, accessor);
    return total / baseNumber;
  }
}

export default {
  math: new MathMethods(),
};
