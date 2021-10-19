export default {
  /**
   * 攻城速度の基準値
   */
  CASTEL_ATTACK_BASEMENT_SPEED: "40",
  /**
   * 攻城速度
   */
  CASTEL_ATTACK_SELECTABLE_SPEED: [
    { value: "40", title: "1騎" },
    { value: "80", title: "2騎" },
    { value: "120", title: "3騎" },
    { value: "160", title: "4騎" },
  ],
  /**
   * 攻城速度のデフォルト設定値
   */
  CASTEL_ATTACK_SELECTED_DEFAULT: {
    KEIKOKU: {
      GOLD: "120",
      BLUE: "80",
      RED: "40",
    },
    GUNYU: {
      GOLD: "120",
      BLUE: "80",
      RED: "40",
    },
  },
  /**
   * 設定画面タブの定数
   */
  INPUT_MODE: {
    // 傾国の設定を実施
    KEIKOKU: "tab-keikoku",
    // 群雄の設定を実施
    GUNYU: "tab-gunyu",
  },
};
