<template>
  <v-dialog v-model="dialog" max-width="420px">
    <v-card>
      <v-tabs grow background-color="indigo lighten-5" slider-size="2" v-model="inputMode">
        <v-tabs-slider color="indigo"></v-tabs-slider>
        <v-tab :href="'#'+constants.INPUT_MODE_KEIKOKU" class="font-weight-black">傾国の駐屯数</v-tab>
        <v-tab :href="'#'+constants.INPUT_MODE_GUNYU" class="font-weight-black">群雄の駐屯数</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-items v-model="inputMode">
          <v-tab-item :value="constants.INPUT_MODE_KEIKOKU">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="傾国の突破速度（分速）" type="number" v-model="baseSpeedKeikoku"></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="auto">
                  <span class="mr-2">金城</span>
                  <v-btn-toggle v-model="goldBaseKeikoku" mandatory>
                    <v-btn
                      v-for="content in constants.CASTEL_ATTACK_SELECTABLE_SPEED"
                      :key="content.key"
                      :value="content.value"
                    >{{ content.title }}</v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="auto">
                  <span class="mr-2">青城</span>
                  <v-btn-toggle v-model="blueBaseKeikoku" mandatory>
                    <v-btn
                      v-for="content in constants.CASTEL_ATTACK_SELECTABLE_SPEED"
                      :key="content.key"
                      :value="content.value"
                    >{{ content.title }}</v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="auto">
                  <span class="mr-2">赤城</span>
                  <v-btn-toggle v-model="redBaseKeikoku" mandatory>
                    <v-btn
                      v-for="content in constants.CASTEL_ATTACK_SELECTABLE_SPEED"
                      :key="content.key"
                      :value="content.value"
                    >{{ content.title }}</v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item :value="constants.INPUT_MODE_GUNYU">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="群雄の突破速度（分速）" type="number" v-model="baseSpeedGunyu"></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="auto">
                  <span class="mr-2">金城</span>
                  <v-btn-toggle v-model="goldBaseGunyu" mandatory>
                    <v-btn
                      v-for="content in constants.CASTEL_ATTACK_SELECTABLE_SPEED"
                      :key="content.key"
                      :value="content.value"
                    >{{ content.title }}</v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="auto">
                  <span class="mr-2">青城</span>
                  <v-btn-toggle v-model="blueBaseGunyu" mandatory>
                    <v-btn
                      v-for="content in constants.CASTEL_ATTACK_SELECTABLE_SPEED"
                      :key="content.key"
                      :value="content.value"
                    >{{ content.title }}</v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="auto">
                  <span class="mr-2">赤城</span>
                  <v-btn-toggle v-model="redBaseGunyu" mandatory>
                    <v-btn
                      v-for="content in constants.CASTEL_ATTACK_SELECTABLE_SPEED"
                      :key="content.key"
                      :value="content.value"
                    >{{ content.title }}</v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">キャンセル</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="onClickApplyButton"
          :disabled="!allowToSetting"
        >反映する</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Validator from "@/components/logic/validator.js";
import Storage from "@/components/logic/storage.js";
import Environment from "@/environ.js";

export default {
  data: function() {
    return {
      dialog: false,
      constants: {
        // 攻城速度の選択
        CASTEL_ATTACK_SELECTABLE_SPEED:
          Environment.CASTEL_ATTACK_SELECTABLE_SPEED,
        // 入力モード：傾国
        INPUT_MODE_KEIKOKU: Environment.INPUT_MODE.KEIKOKU,
        // 入力モード：群雄
        INPUT_MODE_GUNYU: Environment.INPUT_MODE.GUNYU
      },
      // 各入力項目
      inputMode: `#${Environment.INPUT_MODE.KEIKOKU}`,
      goldBaseGunyu: "",
      blueBaseGunyu: "",
      redBaseGunyu: "",
      baseSpeedGunyu: "",
      goldBaseKeikoku: "",
      blueBaseKeikoku: "",
      redBaseKeikoku: "",
      baseSpeedKeikoku: ""
    };
  },
  /**
   * 変数の状態を画面に同期する
   */
  watch: {
    dialog(val) {
      val || this.closeDialog();
    }
  },
  computed: {
    /**
     * 人数、おにぎりの数から引き継ぐの入力チェック
     */
    allowToSetting: function() {
      return [
        // 傾国の攻城速度として有効な値であればTrue
        Validator.string.check.asDigit(this.baseSpeedKeikoku, {
          min: 1,
          max: 999,
          regex: Validator.string.regex.FORMAT_HALF_NUMBER
        }),
        // 群雄の攻城速度として有効な値であればTrue
        Validator.string.check.asDigit(this.baseSpeedGunyu, {
          min: 1,
          max: 999,
          regex: Validator.string.regex.FORMAT_HALF_NUMBER
        })
      ].every(value => value);
    }
  },
  methods: {
    /**
     * 値を永続化、共通ストアと同期する
     */
    syncParameter(storeKey, storageKey, value) {
      try {
        this.$store.commit(storeKey, value);
        Storage.putValueToLocalStorage(storageKey, value);
      } catch {
        void 0;
      }
    },
    /**
     * 値を共通ストアから読み出す
     */
    syncToRead() {
      // 入力モード
      this.inputMode = this.$store.getters.inputMode;
      // 群雄金城の最低駐屯設定
      this.goldBaseGunyu = this.$store.getters.goldGunyu;
      // 群雄青城の最低駐屯設定
      this.blueBaseGunyu = this.$store.getters.blueGunyu;
      // 群雄赤城の最低駐屯設定
      this.redBaseGunyu = this.$store.getters.redGunyu;
      // 群雄の攻城速度
      this.baseSpeedGunyu = this.$store.getters.basementGunyu;
      // 傾国金城の最低駐屯設定
      this.goldBaseKeikoku = this.$store.getters.goldKeikoku;
      // 傾国青城の最低駐屯設定
      this.blueBaseKeikoku = this.$store.getters.blueKeikoku;
      // 傾国赤城の最低駐屯設定
      this.redBaseKeikoku = this.$store.getters.redKeikoku;
      // 傾国の攻城速度
      this.baseSpeedKeikoku = this.$store.getters.basementKeikoku;
    },
    /**
     * 値を同期する
     */
    syncToWrite() {
      //値を同期する
      [
        // 群雄金城の最低駐屯設定
        ["setGoldGunyu", "gold_gunyu", this.goldBaseGunyu],
        // 群雄青城の最低駐屯設定
        ["setBlueGunyu", "blue_gunyu", this.blueBaseGunyu],
        // 群雄赤城の最低駐屯設定
        ["setRedGunyu", "red_gunyu", this.redBaseGunyu],
        // 群雄の攻城速度
        ["setBasementGunyu", "basement_gunyu", this.baseSpeedGunyu],
        // 傾国金城の最低駐屯設定
        ["setGoldKeikoku", "gold_keikoku", this.goldBaseKeikoku],
        // 傾国青城の最低駐屯設定
        ["setBlueKeikoku", "blue_keikoku", this.blueBaseKeikoku],
        // 傾国赤城の最低駐屯設定
        ["setRedKeikoku", "red_keikoku", this.redBaseKeikoku],
        // 傾国の攻城速度
        ["setBasementKeikoku", "basement_keikoku", this.baseSpeedKeikoku]
      ].forEach(parameter => {
        // parameter:0 store.jsのキー
        // parameter:1 localStorageのキー
        // parameter:2 同期する値
        this.syncParameter(parameter[0], parameter[1], parameter[2]);
      });
    },
    /**
     * ダイアログを開く
     */
    open: function() {
      // 画面の状態を初期化する
      this.syncToRead();
      // ダイアログを開く
      this.dialog = true;
    },
    /**
     * ダイアログを閉じる
     */
    closeDialog() {
      this.dialog = false;
    },
    /**
     * ダイアログを閉じる
     */
    onClickApplyButton() {
      if (this.allowToSetting) {
        // 入力モードの選択状態を反映する
        this.$store.commit("setInputMode", this.inputMode);
        // 値を永続化領域に保存する
        this.syncToWrite();
      }
      // ダイアログを閉じる
      this.closeDialog();
    }
  }
};
</script>

<style></style>
