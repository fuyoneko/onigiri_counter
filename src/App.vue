<template>
  <v-app style="background: #eeeeee">
    <!-- アプリケーションのヘッダ -->
    <v-app-bar app color="primary" dark>
      <!-- ヘルプボタン -->
      <help-dialog></help-dialog>
      <!-- アプリタイトル -->
      <v-app-bar-title class="pa-4">おにぎり電卓</v-app-bar-title>
      <v-spacer></v-spacer>
      <!-- コピーボタン -->
      <v-btn
        color="indigo lighten-5"
        class="indigo--text"
        ref="copyButton"
        @click="copyToClipboard"
      >Copy</v-btn>
    </v-app-bar>
    <!-- メインのコンテンツ -->
    <v-main>
      <crud-row ref="crudRow"></crud-row>
    </v-main>
  </v-app>
</template>

<script>
import CrudRowTable from "@/components/crud-row.vue";
import HelpDialog from "@/components/dialog/help-dialog.vue";

export default {
  name: "App",

  components: {
    "crud-row": CrudRowTable,
    "help-dialog": HelpDialog
  },

  computed: {
    /**
     * クリップボードにコピーする文字列を取得する
     */
    clipboard: function() {
      // メイン画面が参照できるのなら、メイン画面から文字列を取得する
      if (this.$refs.crudRow) {
        return this.$refs.crudRow.getClipboardText();
      }
      return "";
    }
  },

  methods: {
    /**
     * イベント：クリップボードに文字列を保存する
     */
    copyToClipboard() {
      // クリップボードに保存する
      this.$copyText(this.clipboard, this.$refs.copyButton.$el);
      // スナックバーで通知する
      this.$refs.crudRow.showSnackBar(`"${this.clipboard}"`);
    }
  }
};
</script>
