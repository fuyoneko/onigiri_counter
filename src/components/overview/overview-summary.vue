<template>
  <v-card
    class="mt-8 mb-2 ml-8 mr-8"
    style="width:100%; max-width:500px"
    @click.stop="onClickCard"
    ripple
  >
    <v-row class="pt-2 pl-8" style="width:100%; max-width:500px">
      <v-spacer></v-spacer>
      <v-subheader>クリックで引継ぎ</v-subheader>
      <v-icon>mdi-cog</v-icon>
    </v-row>
    <v-row class="pb-4 pl-8" style="width:100%; max-width:500px">
      <v-col class="d-flex justify-space-between">
        <div>
          参加：
          <v-chip color="gray">{{ count }}人</v-chip>
        </div>
        <div>
          合計：
          <v-chip color="gray">{{ total }}個</v-chip>
        </div>
        <div>
          平均：
          <v-chip color="gray">{{ average }}個</v-chip>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Validator from "@/components/logic/validator.js";

export default {
  computed: {
    /**
     * 員数を参照する
     */
    count: {
      get: function() {
        return this.$store.getters.count;
      }
    },
    /**
     * 合計値を参照する
     */
    total: {
      get: function() {
        return this.$store.getters.total;
      }
    },
    /**
     * 平均値を参照する
     */
    average: {
      get: function() {
        return this.$store.getters.average;
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
      return Validator.string.normalize.toZenkakuString(
        `${this.count}-${this.total}`
      );
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
