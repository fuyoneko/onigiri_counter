<template>
  <v-dialog v-model="dialog" max-width="420px">
    <v-card>
      <v-card-title class="text-h5">削除しますか？</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog"
          >キャンセル</v-btn
        >
        <v-btn color="blue darken-1" text @click="clickedDelete">削除</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      // ダイアログの表示状態
      dialog: false,
    };
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
    },
    /**
     * ダイアログを閉じる
     */
    closeDialog() {
      this.dialog = false;
      this.$emit("on-closed-delete");
    },
    /**
     * 削除ボタンが押された
     */
    clickedDelete() {
      this.$emit("on-click-delete");
      this.closeDialog();
    },
  },
};
</script>

<style></style>
