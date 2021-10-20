<template>
  <div>
    <v-container>
      <!-- 概要エリア：合計 -->
      <v-row>
        <v-spacer></v-spacer>
        <overview-summary @on-click-card="openImportDialog" ref="exportSummaryCard"></overview-summary>
        <v-spacer></v-spacer>
      </v-row>
      <!-- 概要エリア：駐屯数 -->
      <v-row v-if="castel.display">
        <v-spacer></v-spacer>
        <overview-castel @on-click-card="openSettingdialog" ref="castelSummaryCard"></overview-castel>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-col cols="12"></v-col>
      </v-row>
    </v-container>
    <!-- 表 -->
    <v-data-table
      :headers="headers"
      :items="ricecakeList"
      sort-by="insertDate"
      sort-desc
      class="elevation-4 mb-8"
      :items-per-page="-1"
      hide-default-footer
      style="background-color: white"
    >
      <template v-slot:top>
        <v-toolbar flat style="background-color: white">
          <!-- 入力エリア -->
          <v-row class="pt-8" style="width:100%">
            <!-- 城情報サマリの表示スイッチ-->
            <v-col cols="4">
              <v-switch v-model="castel.display" label="城情報"></v-switch>
            </v-col>
            <!-- おにぎりの入力エリア -->
            <v-col cols="8">
              <div class="d-flex justify-end">
                <!-- おにぎりの編集テキストフィールド -->
                <v-text-field
                  label="おにぎりの数"
                  v-model="ricecakeInput"
                  ref="ricecakeInput"
                  class="pr-6"
                  type="number"
                  style="max-width: 160px"
                  :hint="hintMessage"
                  @focus="hintMessage='半角数字を入力'"
                  @blur="hintMessage='クリックして入力モード'"
                  persistent-hint
                  v-on:keydown.enter="registerItem"
                ></v-text-field>
                <!-- おにぎりの追加ボタン -->
                <v-btn
                  color="primary"
                  outlined
                  @click.stop="registerItem"
                  :disabled="!allowToAppend"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <!-- 訂正ダイアログ -->
          <edit-dialog
            ref="editDialog"
            :editedItem="editedItem"
            @on-edit-closed="onCloseEditDialog"
            @on-edit-save="onSaveEditDialog"
          ></edit-dialog>
          <!-- 駐屯数設定ダイアログ -->
          <settning-dialog ref="settingDialog"></settning-dialog>
          <!-- 引継ぎダイアログ -->
          <import-dialog ref="importDialog" @on-import-data="importData"></import-dialog>
          <!-- 削除ダイアログ -->
          <delete-dialog
            ref="dialogDelete"
            @on-click-delete="deleteItemConfirm"
            @on-closed-delete="onClosedDelete"
          ></delete-dialog>
        </v-toolbar>
      </template>
      <!-- 行右端の編集ボタン -->
      <template v-slot:item.actions="{ item }">
        <v-chip class="mr-2" color="primary" small outlined @click="editItem(item)">
          <v-icon small>mdi-pencil</v-icon>編集
        </v-chip>
        <v-chip color="red darken-1" small outlined @click="deleteItem(item)">
          <v-icon small>mdi-delete</v-icon>削除
        </v-chip>
      </template>
      <template v-slot:no-data>データがありません</template>
    </v-data-table>
    <!-- スナックバー -->
    <v-snackbar v-model="snackbar.display" timeout="1500">
      コピーしました
      <br />
      <span class="blue-grey--text">{{ snackbar.message }}</span>
    </v-snackbar>
  </div>
</template>

<script>
import Validator from "@/components/logic/validator.js";
import SettingDialog from "@/components/dialog/setting-dialog.vue";
import OverviewSummary from "@/components/overview/overview-summary.vue";
import OverviewCastel from "@/components/overview/overview-castel.vue";
import DeleteDialog from "@/components/dialog/delete-dialog.vue";
import ImportDialog from "@/components/dialog/import-dialog.vue";
import EditDialog from "@/components/dialog/edit-dialog.vue";
import ViewControl from "@/components/logic/view_control.js";

export default {
  components: {
    "settning-dialog": SettingDialog,
    "delete-dialog": DeleteDialog,
    "overview-summary": OverviewSummary,
    "overview-castel": OverviewCastel,
    "import-dialog": ImportDialog,
    "edit-dialog": EditDialog
  },
  data: () => {
    return {
      /** スナックバーの表示状態 */
      snackbar: {
        display: false,
        message: ""
      },
      /** 城情報スイッチの状態 */
      castel: {
        display: false
      },
      /** 表のヘッダ情報 */
      headers: [
        {
          text: "登録時間",
          align: "start",
          value: "insertDate"
        },
        { text: "おにぎりの数", value: "ricecake" },
        { text: "訂正", value: "actions", sortable: false }
      ],
      /** おにぎり入力欄 */
      ricecakeInput: "",
      /** 編集中のアイテム */
      editedIndex: -1,
      editedItem: {
        insertDate: "",
        ricecake: 0
      },
      /** デフォルトのアイテム */
      defaultItem: {
        insertDate: "",
        ricecake: 0
      },
      /** ヒントメッセージ */
      hintMessage: ""
    };
  },

  computed: {
    /**
     * おにぎりの一覧
     */
    ricecakeList: {
      get: function() {
        return this.$store.getters.ricecakeList;
      }
    },
    /**
     * 入力チェック：おにぎりの入力値が正しければTrue
     */
    allowToAppend: function() {
      return Validator.string.check.asDigit(this.ricecakeInput, {
        min: 1,
        max: 99999,
        regex: Validator.string.regex.FORMAT_HALF_NUMBER
      });
    }
  },

  /**
   * 初回表示
   */
  created() {
    this.initialize();
  },

  mounted() {
    this.$nextTick(() => {
      // おにぎりの入力エリアにフォーカスをあてる
      ViewControl.focus.toInput(this.$refs.ricecakeInput);
    });
  },

  methods: {
    /**
     * 初回表示
     */
    initialize() {
      this.$store.commit("clearRicecake");
    },

    /**
     * クリップボードの保存テキストを作成する
     */
    getClipboardText() {
      let contents_list = [];
      // サマリ情報を格納する
      contents_list.push(this.$refs.exportSummaryCard.getClipboardMessage());
      // 城情報を表示する：オンのとき
      if (this.castel.display) {
        // 防衛時間を格納する
        contents_list.push(this.$refs.castelSummaryCard.getClipboardMessage());
      }
      return contents_list.join(" ");
    },

    /**
     * スナックバーのメッセージを表示する
     */
    showSnackBar(message) {
      this.snackbar.display = true;
      this.snackbar.message = message;
    },

    /**
     * おにぎりを登録する
     */
    registerItem() {
      // 入力チェックで問題がなければ登録する
      if (this.allowToAppend) {
        const date = new Date();
        this.$store.commit("addRicecake", {
          date: date,
          insertDate: Validator.date.normalize.toString(date),
          ricecake: Validator.string.normalize.asDigitString(this.ricecakeInput)
        });
        // 入力欄を初期化する
        this.ricecakeInput = "";
      }
    },

    /**
     * 編集ダイアログを開く
     */
    openEditDialog() {
      this.$refs.editDialog.showDialog();
    },

    /**
     * 設定ダイアログを開く
     */
    openSettingdialog() {
      this.$refs.settingDialog.open();
    },

    /**
     * 引継ぎダイアログを開く
     */
    openImportDialog() {
      this.$refs.importDialog.showDialog();
    },

    /**
     * おにぎりを更新する
     */
    editItem(item) {
      this.editedIndex = this.ricecakeList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.openEditDialog();
    },

    /**
     * おにぎりを削除する
     */
    deleteItem(item) {
      this.editedIndex = this.ricecakeList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$refs.dialogDelete.showDialog();
    },

    /**
     * おにぎりの削除確認
     */
    deleteItemConfirm() {
      this.$store.commit("deleteRicecake", this.editedIndex);
    },

    /**
     * 引継ぎを実施する
     */
    importData(value) {
      // 既存の入力データを削除する
      this.$store.commit("clearRicecake");
      // ダミー情報を人数分追加する
      for (let i = 1; i < parseInt(value.membersCount); i++) {
        this.$store.commit("addRicecake", {
          date: Date.parse("1970-1-1"),
          insertDate: "-",
          ricecake: "0"
        });
      }
      // おにぎり情報を追加する
      this.ricecakeInput = value.ricecakeCount;
      this.registerItem();
      // 入力画面をクリアする
      this.ricecakeInput = "";
    },

    /**
     * 削除ダイアログを閉じた
     */
    onClosedDelete() {
      // 選択状態をクリアする
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    /**
     * 編集ダイアログを閉じた
     */
    onCloseEditDialog() {
      // 選択状態をクリアする
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    /**
     * 編集ダイアログで編集した
     */
    onSaveEditDialog() {
      if (this.editedIndex > -1) {
        // おにぎりを編集する
        this.$store.commit("assignRicecake", {
          index: this.editedIndex,
          item: this.editedItem
        });
      } else {
        // 異常系：編集するおにぎりがなかった場合は追加する
        this.$store.commit("addRicecake", this.editedItem);
      }
    }
  }
};
</script>

<style scoped>
</style>
