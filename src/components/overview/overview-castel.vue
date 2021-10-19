<template>
  <v-card class="mb-2 ml-8 mr-8" style="width:100%; max-width:500px" @click.stop="onClickCard">
    <v-row class="pt-2 pl-8" style="width:100%; max-width:500px">
      <v-subheader class="indigo--text font-weight-black">{{inputModeTitle}}</v-subheader>
      <v-spacer></v-spacer>
      <v-subheader>クリックで設定</v-subheader>
      <v-icon>mdi-cog</v-icon>
    </v-row>
    <v-row class="pb-4 pl-8" style="width:100%; max-width:500px">
      <v-col class="d-flex justify-space-between">
        <div>
          金城：
          <v-chip color="gray">{{ calstelGold }}分</v-chip>
        </div>
        <div>
          青城：
          <v-chip color="gray">{{ calstelBlue }}分</v-chip>
        </div>
        <div>
          赤城：
          <v-chip color="gray">{{ calstelRed }}分</v-chip>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Environment from "@/environ.js";

export default {
  computed: {
    /**
     * 入力モードの表示名を参照する
     */
    inputModeTitle: {
      get: function() {
        if (this.inputStatus == Environment.INPUT_MODE.KEIKOKU) {
          return "傾国の争い";
        }
        if (this.inputStatus == Environment.INPUT_MODE.GUNYU) {
          return "群雄争覇";
        }
        return "-";
      }
    },
    /**
     * 入力モード（傾国、群雄）を参照する
     */
    inputStatus: {
      get: function() {
        return this.$store.getters.inputMode;
      }
    },
    /**
     * 金城の防衛可能時間を参照する
     */
    calstelGold: {
      get: function() {
        return this.$store.getters.calstelGold;
      }
    },
    /**
     * 青城の防衛可能時間を参照する
     */
    calstelBlue: {
      get: function() {
        return this.$store.getters.calstelBlue;
      }
    },
    /**
     * 赤城の防衛可能時間を参照する
     */
    calstelRed: {
      get: function() {
        return this.$store.getters.calstelRed;
      }
    }
  },
  methods: {
    /**
     * カードがクリックされた
     */
    onClickCard: function() {
      this.$emit("on-click-card");
    },
    /**
     * サマリ表示状態の時、クリップボードに表示するテキストを取得する
     */
    getClipboardMessage: function() {
      return `金城：${this.calstelGold}分 青城：${this.calstelBlue}分 赤城：${this.calstelRed}分`;
    }
  }
};
</script>

<!-- 押下後のハイライトは不要 -->
<style scoped>
.v-card--link:before {
  background: none !important;
}
</style>
