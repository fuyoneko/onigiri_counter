import Device from "@/components/logic/device.js";

class FocusControl {
  /**
   * テキストエリア（v-text-field）にフォーカスする
   * @param {v-text-fieldへの参照} input
   */
  toInput(input) {
    /**
     * すぐに呼ばれないよう0msの遅延を入れる
     * ※iOSはキーボードが表示されないためフォーカスさせない
     */
    if (!Device.isIOS) {
      setTimeout(() => {
        try {
          // フォーカスをあてる
          input.$refs.input.focus();
        } catch {
          void 0;
        }
      }, 0);
    }
  }
}

export default {
  focus: new FocusControl(),
};
