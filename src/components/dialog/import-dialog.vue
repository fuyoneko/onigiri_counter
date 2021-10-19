<template>
  <v-dialog v-model="dialog" max-width="420px">
    <v-card>
      <v-card-title class="text-h5">引き継ぎ</v-card-title>
      <v-card-text>
        他の同盟員が集計したおにぎりを引き継ぎます。
        <br />※実施すると、入力したおにぎりは上書きされます。
        <v-radio-group v-model="importCheck">
          <v-container>
            <v-row>
              <v-radio
                label="人数、おにぎりの数から引き継ぐ"
                color="indigo darken-3"
                :value="constants.IMPORT_FROM_TEXTAREA"
              ></v-radio>
            </v-row>
            <v-row justify="end">
              <v-col cols="4">
                <v-text-field
                  label="人数"
                  type="number"
                  ref="peopleInput"
                  v-model="importPeopleInput"
                  v-on:keydown.enter="importData"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="おにぎりの数"
                  type="number"
                  v-model="importRicecakeInput"
                  v-on:keydown.enter="importData"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">キャンセル</v-btn>
        <v-btn color="blue darken-1" text @click="importData" :disabled="!allowToImport">引き継ぐ</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Validator from "@/components/logic/validator.js";
import ViewControl from "@/components/logic/view_control.js";

export default {
  data() {
    const IMPORT_FROM_TEXTAREA = 1;
    return {
      // ダイアログの表示状態
      dialog: false,
      // ラジオボタンの選択状態
      importCheck: IMPORT_FROM_TEXTAREA,
      // 入力部品
      importPeopleInput: "",
      importRicecakeInput: "",
      constants: {
        // ラジオボタンの選択肢：人数、おにぎりの数から引き継ぐ
        IMPORT_FROM_TEXTAREA: IMPORT_FROM_TEXTAREA
      }
    };
  },
  computed: {
    /**
     * 人数、おにぎりの数から引き継ぐの入力チェック
     */
    allowToImport: function() {
      return [
        // 人数が正しい値であればTrue
        Validator.string.check.asDigit(this.importPeopleInput, {
          min: 1,
          max: 50,
          regex: Validator.string.regex.FORMAT_HALF_NUMBER
        }),
        // おにぎりが正しい値であればTrue
        Validator.string.check.asDigit(this.importRicecakeInput, {
          min: 1,
          max: 99999,
          regex: Validator.string.regex.FORMAT_HALF_NUMBER
        })
      ].every(value => value);
    }
  },
  watch: {
    /**
     * 変数の状態を画面に反映する
     */
    dialog(val) {
      val || this.closeDialog();
    }
  },
  methods: {
    /**
     * ダイアログを表示する
     */
    showDialog() {
      this.dialog = true;
      this.$nextTick(() => {
        // 人数の入力エリアにフォーカスをあてる
        ViewControl.focus.toInput(this.$refs.peopleInput);
      });
    },
    /**
     * ダイアログを閉じる
     */
    closeDialog() {
      this.dialog = false;
    },
    /**
     * 引き継ぐボタンを押下する
     */
    importData() {
      // 入力が有効であれば、画面に反映する
      if (this.allowToImport) {
        this.$emit("on-import-data", {
          membersCount: this.importPeopleInput,
          ricecakeCount: this.importRicecakeInput
        });
        // 入力欄を初期化する
        this.importPeopleInput = "";
        this.importRicecakeInput = "";
        // ダイアログを閉じる
        this.closeDialog();
      }
    }
  }
};
</script>

<style></style>
