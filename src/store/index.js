import Vue from "vue";
import Vuex from "vuex";
import Calculator from "@/components/logic/calculator.js";
import Validator from "@/components/logic/validator.js";
import Environment from "@/environ.js";
import Storage from "@/components/logic/storage.js";

/**
 * 共通ストア：アプリケーション全体から参照するメモリ上の変数を定義する
 */
Vue.use(Vuex);

// 群雄金城の最低駐屯数の設定値を参照する
let goldGunyu = Storage.controller.getValueFromLocalStorage(
  "gold_gunyu",
  Environment.CASTEL_ATTACK_SELECTED_DEFAULT.GUNYU.GOLD
);
// 群雄青城の最低駐屯数の設定値を参照する
let blueGunyu = Storage.controller.getValueFromLocalStorage(
  "blue_gunyu",
  Environment.CASTEL_ATTACK_SELECTED_DEFAULT.GUNYU.BLUE
);
// 群雄赤城の最低駐屯数の設定値を参照する
let redGunyu = Storage.controller.getValueFromLocalStorage(
  "red_gunyu",
  Environment.CASTEL_ATTACK_SELECTED_DEFAULT.GUNYU.RED
);
// 群雄攻城速度の設定値を参照する
let basementGunyu = Storage.controller.getBasementFromLocalStorage(
  "basement_gunyu",
  Environment.CASTEL_ATTACK_BASEMENT_SPEED
);
// 傾国金城の最低駐屯数の設定値を参照する
let goldKeikoku = Storage.controller.getValueFromLocalStorage(
  "gold_keikoku",
  Environment.CASTEL_ATTACK_SELECTED_DEFAULT.KEIKOKU.GOLD
);
// 傾国青城の最低駐屯数の設定値を参照する
let blueKeikoku = Storage.controller.getValueFromLocalStorage(
  "blue_keikoku",
  Environment.CASTEL_ATTACK_SELECTED_DEFAULT.KEIKOKU.BLUE
);
// 傾国赤城の最低駐屯数の設定値を参照する
let redKeikoku = Storage.controller.getValueFromLocalStorage(
  "red_keikoku",
  Environment.CASTEL_ATTACK_SELECTED_DEFAULT.KEIKOKU.RED
);
// 傾国攻城速度を参照する
let basementKeikoku = Storage.controller.getBasementFromLocalStorage(
  "basement_keikoku",
  Environment.CASTEL_ATTACK_BASEMENT_SPEED
);

/**
 * 攻城速度を取得する
 * @param {設定された攻城速度} baseSpeed
 * @return {数値型の攻城速度}
 */
function getBaseSpeed(baseSpeed) {
  let defaultValue = parseInt(Environment.CASTEL_ATTACK_BASEMENT_SPEED);
  if (
    !Validator.string.check.asDigit(baseSpeed, {
      min: 1,
      max: 999,
      regex: Validator.string.regex.FORMAT_HALF_NUMBER,
    })
  ) {
    return defaultValue;
  }
  return parseInt(baseSpeed);
}

const store = new Vuex.Store({
  state: {
    // 入力モード：群雄、傾国
    inputMode: Environment.INPUT_MODE.KEIKOKU,
    // 金城設定値
    goldBase: {
      gunyu: goldGunyu,
      keikoku: goldKeikoku,
    },
    // 青城設定値
    blueBase: {
      gunyu: blueGunyu,
      keikoku: blueKeikoku,
    },
    // 赤城設定値
    redBase: {
      gunyu: redGunyu,
      keikoku: redKeikoku,
    },
    // 攻城速度
    baseSpeed: {
      gunyu: basementGunyu,
      keikoku: basementKeikoku,
    },
    // 入力されたおにぎりの一覧
    ricecake: [],
  },
  getters: {
    // 入力モード：群雄、傾国
    inputMode: function(state) {
      return state.inputMode;
    },
    // 群雄金城の最低駐屯数
    goldGunyu: function(state) {
      return state.goldBase.gunyu;
    },
    // 群雄青城の最低駐屯数
    blueGunyu: function(state) {
      return state.blueBase.gunyu;
    },
    // 群雄赤城の最低駐屯数
    redGunyu: function(state) {
      return state.redBase.gunyu;
    },
    // 群雄攻城速度
    basementGunyu: function(state) {
      return state.baseSpeed.gunyu;
    },
    // 傾国金城の最低駐屯数
    goldKeikoku: function(state) {
      return state.goldBase.keikoku;
    },
    // 傾国青城の最低駐屯数
    blueKeikoku: function(state) {
      return state.blueBase.keikoku;
    },
    // 傾国赤城の最低駐屯数
    redKeikoku: function(state) {
      return state.redBase.keikoku;
    },
    // 傾国攻城速度
    basementKeikoku: function(state) {
      return state.baseSpeed.keikoku;
    },
    // 現在の入力モードでの金城の最低駐屯数
    gold: function(state) {
      if (state.inputMode == Environment.INPUT_MODE.KEIKOKU) {
        return state.goldBase.keikoku;
      } else {
        return state.goldBase.gunyu;
      }
    },
    // 現在の入力モードでの青城の最低駐屯数
    blue: function(state) {
      if (state.inputMode == Environment.INPUT_MODE.KEIKOKU) {
        return state.blueBase.keikoku;
      } else {
        return state.blueBase.gunyu;
      }
    },
    // 現在の入力モードでの赤城の最低駐屯数
    red: function(state) {
      if (state.inputMode == Environment.INPUT_MODE.KEIKOKU) {
        return state.redBase.keikoku;
      } else {
        return state.redBase.gunyu;
      }
    },
    // 現在の入力モードでの攻城速度
    basement: function(state) {
      if (state.inputMode == Environment.INPUT_MODE.KEIKOKU) {
        return state.baseSpeed.keikoku;
      } else {
        return state.baseSpeed.gunyu;
      }
    },
    // おにぎり入力データの一覧
    ricecakeList: function(state) {
      return state.ricecake;
    },
    // おにぎりの員数
    count: function(state) {
      return state.ricecake.length;
    },
    // おにぎりの合計数
    total: function(state) {
      return Calculator.math.sum(state.ricecake, (item) =>
        parseInt(item.ricecake)
      );
    },
    // おにぎりの平均数
    average: function(state) {
      if (state.ricecake.length == 0) return 0;
      return Calculator.math
        .average(state.ricecake, (item) => parseInt(item.ricecake))
        .toFixed(0);
    },
    // 金城の防衛可能時間（単位：分）
    calstelGold: function(state, getters) {
      return Calculator.math
        .castel(
          state.ricecake,
          (item) => parseInt(item.ricecake),
          parseInt(getters.gold) *
            (getBaseSpeed(getters.basement) /
              (1.0 * parseInt(Environment.CASTEL_ATTACK_BASEMENT_SPEED)))
        )
        .toFixed(1);
    },
    // 青城の防衛可能時間（単位：分）
    calstelBlue: function(state, getters) {
      return Calculator.math
        .castel(
          state.ricecake,
          (item) => parseInt(item.ricecake),
          parseInt(getters.blue) *
            (getBaseSpeed(getters.basement) /
              (1.0 * parseInt(Environment.CASTEL_ATTACK_BASEMENT_SPEED)))
        )
        .toFixed(1);
    },
    // 赤城の防衛可能時間（単位：分）
    calstelRed: function(state, getters) {
      return Calculator.math
        .castel(
          state.ricecake,
          (item) => parseInt(item.ricecake),
          parseInt(getters.red) *
            (getBaseSpeed(getters.basement) /
              (1.0 * parseInt(Environment.CASTEL_ATTACK_BASEMENT_SPEED)))
        )
        .toFixed(1);
    },
  },
  mutations: {
    // 入力モード：群雄、傾国を設定する
    setInputMode: function(state, value) {
      state.inputMode = value;
    },
    // 群雄金城の最低駐屯数を設定する
    setGoldGunyu: function(state, value) {
      state.goldBase.gunyu = value;
    },
    // 群雄青城の最低駐屯数を設定する
    setBlueGunyu: function(state, value) {
      state.blueBase.gunyu = value;
    },
    // 群雄赤城の最低駐屯数を設定する
    setRedGunyu: function(state, value) {
      state.redBase.gunyu = value;
    },
    // 群雄の攻城速度を設定する
    setBasementGunyu: function(state, value) {
      state.baseSpeed.gunyu = value;
    },
    // 傾国金城の最低駐屯数を設定する
    setGoldKeikoku: function(state, value) {
      state.goldBase.keikoku = value;
    },
    // 傾国青城の最低駐屯数を設定する
    setBlueKeikoku: function(state, value) {
      state.blueBase.keikoku = value;
    },
    // 傾国赤城の最低駐屯数を設定する
    setRedKeikoku: function(state, value) {
      state.redBase.keikoku = value;
    },
    // 傾国の攻城速度を設定する
    setBasementKeikoku: function(state, value) {
      state.baseSpeed.keikoku = value;
    },
    // おにぎりの入力データをクリアする
    clearRicecake: function(state) {
      state.ricecake = [];
    },
    // おにぎりの入力データを追加する
    addRicecake: function(state, value) {
      state.ricecake.push(value);
    },
    // おにぎりの入力データを更新する
    assignRicecake: function(state, value) {
      Object.assign(state.ricecake[value.index], value.item);
    },
    // おにぎりの入力データを削除する
    deleteRicecake: function(state, index) {
      state.ricecake.splice(index, 1);
    },
  },
});

export default store;
