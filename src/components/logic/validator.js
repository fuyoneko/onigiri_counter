/**
 * 値の検証関数を定義する
 */
class StringValidator {
  /**
   * 文字列を数値として検証する
   * config : {
   *    regex: 正規表現
   *    min: 文字列を数値として読み込んだ時の値の下限
   *    max: 文字列を数値として読み込んだ時の値の上限
   * }
   * @param {検証する文字列} input
   * @param {検証設定} config
   */
  asDigit(input, config) {
    // 入力値が不正であれば処理をしない
    if (!input) return false;
    if (!config) return false;
    if (input.length == 0) {
      return false;
    }
    // 正規表現を満たしていなければfalseを返す
    if (!(config.regex && new RegExp(config.regex).test(input))) {
      return false;
    }
    // 値を数値として取得する
    try {
      let value = parseInt(input);
      // 下限に満たないのであればfalseを返す
      if (config.min && value < config.min) {
        return false;
      }
      // 上限を超えていればfalseを返す
      if (config.max && value > config.max) {
        return false;
      }
    } catch {
      // 数値として取得できないのならfalseを返す
      return false;
    }
    // すべてクリアしていればtrueを返す
    return true;
  }
}

/**
 * 値のフォーマットを検証する正規表現を定義する
 */
class RegexList {
  /**
   * 半角整数
   */
  FORMAT_HALF_NUMBER = /^[0-9]+$/;
}

/**
 * 文字列を正規化関数を定義する
 */
class StringNormalizer {
  /**
   * 数値を含む文字列を全角文字列に変換する
   * @param {変換する対象の文字列} input
   */
  toZenkakuString(input) {
    let detail = "";
    let mapping = {
      "-": "―",
      "0": "０",
      "1": "１",
      "2": "２",
      "3": "３",
      "4": "４",
      "5": "５",
      "6": "６",
      "7": "７",
      "8": "８",
      "9": "９",
    };
    // それぞれの文字を検証する
    for (let c of input) {
      if (c in mapping) {
        // もし全角に変換可能な文字であれば、全角に変換する
        detail += mapping[c];
      } else {
        // もし変換できない文字であればそのまま格納する
        detail += c;
      }
    }
    return detail;
  }

  /**
   * 数値文字列を正規化する
   * @param {数値文字列} input
   */
  asDigitString(input) {
    try {
      // 数値に変換、変換したものを再度文字列にする
      return `${parseInt(input)}`;
    } catch {
      // 解析できないのなら入力値をそのまま返す
      return input;
    }
  }
}

/**
 * 日時に対する正規化関数を定義する
 */
class DateNormalizer {
  /**
   * hh:mm:ss形式の文字列に変換する
   * @param {日時} date
   */
  toString(date) {
    return [date.getHours(), date.getMinutes(), date.getSeconds()]
      .map((value) => `000${value}`)
      .map((value) => value.substring(value.length - 2))
      .join(":");
  }
}

export default {
  string: {
    check: new StringValidator(),
    normalize: new StringNormalizer(),
    regex: new RegexList(),
  },
  date: {
    normalize: new DateNormalizer(),
  },
};
