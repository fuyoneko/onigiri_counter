<template>
  <v-dialog v-model="dialog" max-width="420px">
    <v-card>
      <v-card-title>
        <span class="text-h5">訂正しますか？</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.ricecake"
                ref="ricecakeEditInput"
                type="number"
                label="おにぎりの数"
                v-on:keydown.enter="save"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog"
          >キャンセル</v-btn
        >
        <v-btn color="blue darken-1" text @click="save" :disabled="!allowToEdit"
          >訂正</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Validator from "@/components/logic/validator.js";
import ViewControl from "@/components/logic/view_control.js";
export default {
  props: ["editedItem"],
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    /**
     * 入力チェック：おにぎりの数が正しいのであればTrue
     */
    allowToEdit: function() {
      // 入力が不正なら処理をしない
      if (this.editedItem == undefined) {
        return false;
      }
      return Validator.string.check.asDigit(this.editedItem.ricecake, {
        min: 1,
        max: 99999,
        regex: Validator.string.regex.FORMAT_HALF_NUMBER,
      });
    },
  },
  watch: {
    /**
     * 変数の状態を画面に反映する
     */
    dialog(val) {
      val || this.closeDialog();
    },
  },
  methods: {
    /**
     * ダイアログを開く
     */
    showDialog() {
      this.dialog = true;
      this.$nextTick(() => {
        // おにぎりの入力エリアにフォーカスをあてる
        ViewControl.focus.toInput(this.$refs.ricecakeEditInput);
      });
    },
    /**
     * ダイアログを閉じる
     */
    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        this.$emit("on-edit-closed");
      });
    },
    /**
     * 保存ボタンが押された
     */
    save() {
      if (this.allowToEdit) {
        this.$emit("on-edit-save");
        this.closeDialog();
      }
    },
  },
};
</script>

<style></style>
