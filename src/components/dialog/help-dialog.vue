<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5 indigo darken-1 white--text"
        >ヘルプ</v-card-title
      >

      <v-tabs v-model="tabIndex" background-color="transparent" grow>
        <v-tab href="#tab-1">概要</v-tab>
        <v-tab href="#tab-2">使い方</v-tab>
        <v-tab href="#tab-3">操作方法</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabIndex">
        <v-tab-item value="tab-1">
          <v-card-text>
            <div class="text-h6 content-subtitle">概要</div>
            <div>
              「放置少女」ゲーム内コンテンツ「傾国の戦い」「群雄争覇」向けのアプリです。同盟員のおにぎり（※1）を計測、集計して、自同盟の持つ城拠点の防衛可能な時間を予測することができます。
            </div>
          </v-card-text>
          <v-card-text>
            <div class="text-h6 content-subtitle">利点</div>
            <div>
              紙も電卓も使わず、簡単に同盟員のおにぎりを計算・検算できます。
            </div>
            <div>
              計算結果をクリップボードにコピーして、素早く、簡単に同盟員に共有できます。
            </div>
          </v-card-text>
          <v-card-text>
            <div class="text-h6 content-subtitle">特徴</div>
            <div>
              データ管理、計算は端末内で行います。計算結果は第三者から見えません。
            </div>
          </v-card-text>
          <v-card-text>
            <div class="text-h6 content-subtitle">動作環境</div>
            <div>
              <v-chip class="ma-2">
                <v-icon>mdi-cellphone</v-icon>スマートフォン向けブラウザ
              </v-chip>
            </div>
            <div>
              <v-chip class="ma-2">
                <v-icon>mdi-tablet-android</v-icon>タブレット向けブラウザ
              </v-chip>
            </div>
            <div>
              <v-chip class="ma-2">
                <v-icon>mdi-laptop</v-icon>PC向けブラウザ
              </v-chip>
            </div>
            <div class="text-h6 content-subtitle">推奨環境</div>
            <div>
              <v-chip class="ma-2">
                <v-icon>mdi-apple-safari</v-icon>モバイルSafari
              </v-chip>
            </div>
            <div>
              <v-chip class="ma-2">
                <v-icon>mdi-google-chrome</v-icon>Chrome
              </v-chip>
            </div>
          </v-card-text>
          <v-card-text class="caption">
            <v-divider></v-divider>
            <div>
              ※1：プレイヤーの行動できる回数。登用した副将1人につき2回行動することができます。本アプリでは行動回数を「おにぎり」と表現します
            </div>
          </v-card-text>
        </v-tab-item>
        <v-tab-item value="tab-2">
          <v-card-text>
            <div class="text-h6 content-subtitle">まず何を準備したらいい？</div>
            <div>
              <div>1. 傾国・群雄の最低駐屯数をこのアプリに設定します</div>
              <div>
                <img
                  width="100%"
                  src="<%= BASE_URL %>images/help_check_required_count.png"
                />
              </div>
              <div>2. あとは入力するだけです！</div>
            </div>
            <div class="text-h6 content-subtitle">どう使うの？</div>
            <div>1. 傾国・群雄が始まったら、入力モードを合わせます</div>
            <div>
              2. 同盟チャットで同盟員からおにぎりの数（＝残り行動力）を聞きます
            </div>
            <div>
              <img
                width="100%"
                src="<%= BASE_URL %>images/help_check_remain_count.png"
              />
            </div>
            <div>3. おにぎりの数をアプリに入力、どんどん足していきます</div>
            <div>4. 「COPYボタン」をタップして、計算結果をコピーします</div>
            <div>5. 同盟チャットにペーストして、防衛できる時間を共有します</div>
            <div class="text-h6 content-subtitle">利用例</div>
            <div>
              <div>
                スマートフォンのアプリの切り替えで、手前にゲーム、後ろに電卓を表示します
              </div>
              <div>
                <img width="40%" src="<%= BASE_URL %>images/help_switch.png" />
              </div>
              <br />
              <div>
                ユニバーサルクリップボード（※クリップボードにコピーした内容を共有する機能）を使って、iPhoneにゲーム、別のiPhoneやMacに電卓を表示することもできます
              </div>
            </div>
            <div class="text-h6 content-subtitle">このアプリの機能</div>
            <div>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>合計数、参加人数の計算</v-list-item-title>
                  <v-list-item-subtitle
                    >入力したおにぎりの数から、合計と参加人数を計算します。</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>おにぎり数の一覧と訂正</v-list-item-title>
                  <v-list-item-subtitle
                    >誤ったおにぎりの数を訂正、削除することができます。</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>防衛時間の計算</v-list-item-title>
                  <v-list-item-subtitle
                    >入力したおにぎりの数から、それぞれの城の防衛可能な時間を計算します。</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>計算結果のコピー</v-list-item-title>
                  <v-list-item-subtitle
                    >同盟チャットに書き込めるよう、計算結果をクリップボードにコピーできます。</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-card-text>
        </v-tab-item>
        <v-tab-item value="tab-3">
          <v-card-text>
            <v-row justify="end">
              <v-col cols="auto">
                <span class="mr-6">画像サイズ</span>
                <v-btn-toggle v-model="imageSize" mandatory>
                  <v-btn small :value="0">標準</v-btn>
                  <v-btn small :value="1">拡大</v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <div class="text-h6 content-subtitle">おにぎりを集計する</div>
            <div>1. 「おにぎり入力欄」に数字を入力します</div>
            <div>
              <svg
                :width="displaySize(40, 70)"
                viewBox="0 0 321 87"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image href="<%= BASE_URL %>images/help_onigiri_input.png" />
                <rect
                  x="10"
                  y="10"
                  width="200"
                  height="70"
                  rx="10"
                  ry="10"
                  fill="none"
                  stroke="#EE0000"
                />
              </svg>
            </div>
            <div>2. エンターキー、または「おにぎり追加ボタン」を押下します</div>
            <div>
              <svg
                :width="displaySize(40, 70)"
                viewBox="0 0 304 90"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image
                  href="<%= BASE_URL %>images/help_onigiri_input_plus.png"
                />
                <rect
                  x="210"
                  y="25"
                  width="90"
                  height="55"
                  rx="10"
                  ry="10"
                  fill="none"
                  stroke="#EE0000"
                />
              </svg>
            </div>
            <div>3. 上部の計算結果が更新されます</div>
            <div>
              <img
                :width="displaySize(70, 90)"
                src="<%= BASE_URL %>images/help_onigiri_summary.png"
              />
            </div>
          </v-card-text>
          <v-card-text>
            <div class="text-h6 content-subtitle">集計結果を共有する</div>
            <div>1. 右上の「COPYボタン」を押下します</div>
            <div>
              <svg
                :width="displaySize(25, 60)"
                viewBox="0 0 205 71"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image href="<%= BASE_URL %>images/help_copy_button.png" />
                <rect
                  x="90"
                  y="2"
                  width="110"
                  height="55"
                  rx="10"
                  ry="10"
                  fill="none"
                  stroke="#EE0000"
                />
              </svg>
            </div>
            <div>2. 計算結果がクリップボードにコピーされます</div>
            <div>
              <img
                :width="displaySize(70, 90)"
                src="<%= BASE_URL %>images/help_snackbar.png"
              />
            </div>
            <div>3. 同盟チャットで「ペースト」します</div>
            <div>
              <img
                :width="displaySize(70, 90)"
                src="<%= BASE_URL %>images/help_paste.png"
              />
            </div>
          </v-card-text>
          <v-card-text>
            <div class="text-h6 content-subtitle">今の計算結果を消す</div>
            <div>1. ブラウザで「再読み込み」します</div>
            <div>
              <img
                :width="displaySize(30, 60)"
                src="<%= BASE_URL %>images/help_reload.png"
              />
            </div>
            <div>2. 計算結果が消えて、0に戻ります</div>
          </v-card-text>
          <v-card-text>
            <div class="text-h6 content-subtitle">入力間違いを訂正する</div>
            <div>1. 「編集ボタン」を押下します</div>
            <div>
              <img
                :width="displaySize(40, 70)"
                src="<%= BASE_URL %>images/help_edit_and_delete.png"
              />
            </div>
            <div>2. 数字を書き換えて更新します</div>
          </v-card-text>
          <v-card-text>
            <div class="text-h6 content-subtitle">
              誤って追加した計算結果を消す
            </div>
            <div>1. 「削除ボタン」を押下します</div>
            <div>
              <img
                :width="displaySize(40, 70)"
                src="<%= BASE_URL %>images/help_edit_and_delete.png"
              />
            </div>
            <div>2. 対象の入力データが削除されます</div>
          </v-card-text>
          <v-card-text>
            <div class="text-h6 content-subtitle">続きから計算する</div>
            <div>1. 「概要サマリ」を押下します</div>
            <div>
              <img
                :width="displaySize(70, 90)"
                src="<%= BASE_URL %>images/help_onigiri_summary.png"
              />
            </div>
            <div>2. 人数、おにぎりの数を入力して、続きから計算を始めます</div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <div class="text-h6 content-subtitle">城の防衛情報を表示する</div>
            <div>1. 「城情報スイッチ」をオンにします</div>
            <div>
              <img
                :width="displaySize(20, 40)"
                src="<%= BASE_URL %>images/help_castel_switch.png"
              />
            </div>
            <div>
              2.
              上部に城情報が表示され、クリップボードに登録されるようになります
            </div>
            <div>
              <img
                :width="displaySize(70, 90)"
                src="<%= BASE_URL %>images/help_castel_summary.png"
              />
            </div>
          </v-card-text>
          <v-card-text>
            <div class="text-h6 content-subtitle">駐屯情報を設定する</div>
            <div>1. 「城情報サマリ」を押下します</div>
            <div>
              <img
                :width="displaySize(70, 90)"
                src="<%= BASE_URL %>images/help_castel_summary.png"
              />
            </div>
            <div>
              2.
              「城情報設定画面」で、1分間に突破される駐屯枚数（※1）を設定します
            </div>
            <div>
              <img
                :width="displaySize(70, 90)"
                src="<%= BASE_URL %>images/help_keikoku_attack.png"
              />
            </div>
            <div>3. 駐屯しなければならない副将の数（※2）を設定します</div>
            <div>
              <img
                :width="displaySize(50, 70)"
                src="<%= BASE_URL %>images/help_defence_count.png"
              />
            </div>
          </v-card-text>
          <v-card-text>
            <div class="text-h6 content-subtitle">群雄、傾国を設定する</div>
            <div>1. 「入力モードタブ」を押下します</div>
            <div>
              <img
                :width="displaySize(70, 90)"
                src="<%= BASE_URL %>images/help_input_mode.png"
              />
            </div>
            <div>
              2. 傾国と群雄のそれぞれのモードに、別々の設定を保存できます
            </div>
          </v-card-text>
          <v-card-text class="caption">
            <v-divider></v-divider>
            <div>
              ※1：2秒で1駐屯減る場合は30、1.5秒で1駐屯減る場合は40になります。群雄30、傾国40などと言われていますが、実際の数字はサーバの重さによって変わりますので調整が必要です。
            </div>
            <div>※2：必要な駐屯数はサーバレベルによって変動します。</div>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog()">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      tabIndex: "tab-1",
      imageSize: 0,
    };
  },
  methods: {
    displaySize(valueA, valueB) {
      if (this.imageSize == 1) {
        return `${valueB}%`;
      }
      return `${valueA}%`;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.v-list-item__subtitle {
  white-space: normal !important;
}
.content-subtitle {
  color: rgb(49, 76, 77);
  border-bottom-color: cadetblue;
  border-bottom-style: solid;
  border-bottom-width: 2pt;
  margin-bottom: 12px;
  margin-top: 18px;
  width: 100%;
}
</style>
