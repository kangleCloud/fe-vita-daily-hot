import { defineStore } from "pinia";

const buildDefaultNewsArr = () => [
  {
    label: "哔哩哔哩",
    name: "bilibili",
    sourceCode: "bilibili",
    beEnabled: true,
    order: 0,
    show: true,
  },
  {
    label: "微博",
    name: "weibo",
    sourceCode: "weibo",
    beEnabled: true,
    order: 1,
    show: true,
  },
  {
    label: "抖音",
    name: "douyin",
    sourceCode: "douyin",
    beEnabled: false,
    order: 2,
    show: true,
  },
  {
    label: "知乎",
    name: "zhihu",
    sourceCode: "zhihu",
    beEnabled: true,
    order: 3,
    show: true,
  },
  {
    label: "36氪",
    name: "36kr",
    sourceCode: "36kr",
    beEnabled: true,
    order: 4,
    show: true,
  },
  {
    label: "百度",
    name: "baidu",
    sourceCode: "baidu",
    beEnabled: true,
    order: 5,
    show: true,
  },
  {
    label: "少数派",
    name: "sspai",
    sourceCode: "sspai",
    beEnabled: true,
    order: 6,
    show: true,
  },
  {
    label: "IT之家",
    name: "ithome",
    sourceCode: "ithome",
    beEnabled: true,
    order: 7,
    show: true,
  },
  {
    label: "澎湃新闻",
    name: "thepaper",
    sourceCode: "thepaper",
    beEnabled: false,
    order: 8,
    show: true,
  },
  {
    label: "今日头条",
    name: "toutiao",
    sourceCode: "toutiao",
    beEnabled: false,
    order: 9,
    show: true,
  },
  {
    label: "百度贴吧",
    name: "tieba",
    sourceCode: "tieba",
    beEnabled: false,
    order: 10,
    show: true,
  },
  {
    label: "稀土掘金",
    name: "juejin",
    sourceCode: "juejin",
    beEnabled: true,
    order: 11,
    show: true,
  },
  {
    label: "腾讯新闻",
    name: "qq-news",
    sourceCode: "qq-news",
    beEnabled: false,
    order: 12,
    show: true,
  },
  {
    label: "豆瓣电影",
    name: "douban-movie",
    sourceCode: "douban-movie",
    beEnabled: false,
    order: 13,
    show: true,
  },
  {
    label: "原神",
    name: "genshin",
    sourceCode: "genshin",
    beEnabled: false,
    order: 14,
    show: true,
  },
  {
    label: "崩坏：星穹铁道",
    name: "starrail",
    sourceCode: "starrail",
    beEnabled: false,
    order: 16,
    show: true,
  },
  {
    label: "LOL",
    name: "lol",
    sourceCode: "lol",
    beEnabled: false,
    order: 15,
    show: true,
  },
  {
    label: "网易新闻",
    name: "netease-news",
    sourceCode: "netease-news",
    beEnabled: false,
    order: 17,
    show: true,
  },
  {
    label: "微信读书",
    name: "weread",
    sourceCode: "weread",
    beEnabled: false,
    order: 18,
    show: true,
  },
  {
    label: "豆瓣讨论小组",
    name: "douban-group",
    sourceCode: "douban-group",
    beEnabled: false,
    order: 19,
    show: true,
  },
  {
    label: "NGA",
    name: "ngabbs",
    sourceCode: "ngabbs",
    beEnabled: false,
    order: 20,
    show: true,
  },
  {
    label: "HelloGitHub",
    name: "hellogithub",
    sourceCode: "hellogithub",
    beEnabled: false,
    order: 21,
    show: true,
  },
  {
    label: "简书",
    name: "jianshu",
    sourceCode: "jianshu",
    beEnabled: false,
    order: 22,
    show: true,
  },
  {
    label: "知乎日报",
    name: "zhihu-daily",
    sourceCode: "zhihu-daily",
    beEnabled: false,
    order: 23,
    show: true,
  },
];

const cloneNewsItem = (item) => ({ ...item });

export const mainStore = defineStore("mainData", {
  state: () => {
    return {
      // 系统主题
      siteTheme: "light",
      siteThemeAuto: true,
      // 新闻类别
      defaultNewsArr: buildDefaultNewsArr(),
      newsArr: [],
      // 链接跳转方式
      linkOpenType: "open",
      // 页头固定
      headerFixed: true,
      // 时间数据
      timeData: null,
      // 字体大小
      listFontSize: 16,
    };
  },
  getters: {},
  actions: {
    // 更改系统主题
    setSiteTheme(val) {
      $message.info(`已切换至${val === "dark" ? "深色模式" : "浅色模式"}`, {
        showIcon: false,
      });
      this.siteTheme = val;
      this.siteThemeAuto = false;
    },
    // 检查更新
    checkNewsUpdate() {
      const mainData = JSON.parse(localStorage.getItem("mainData"));
      let updatedNum = 0;
      if (!mainData) return false;
      console.log("列表尝试更新", this.defaultNewsArr, this.newsArr);
      // 执行比较并迁移
      if (this.newsArr.length > 0) {
        const mergedNewsArr = this.defaultNewsArr.map((defaultItem) => {
          const currentItem = this.newsArr.find(
            (news) => news.name === defaultItem.name
          );

          if (!currentItem) {
            console.log("列表有更新：", defaultItem);
            updatedNum++;
            return cloneNewsItem(defaultItem);
          }

          if (
            currentItem.sourceCode !== defaultItem.sourceCode ||
            currentItem.beEnabled !== defaultItem.beEnabled
          ) {
            updatedNum++;
          }

          return {
            ...cloneNewsItem(defaultItem),
            ...currentItem,
            label: defaultItem.label,
            name: defaultItem.name,
            sourceCode: defaultItem.sourceCode,
            beEnabled: defaultItem.beEnabled,
            order:
              typeof currentItem.order === "number"
                ? currentItem.order
                : defaultItem.order,
            show:
              typeof currentItem.show === "boolean"
                ? currentItem.show
                : defaultItem.show,
          };
        });

        this.newsArr = mergedNewsArr;

        if (updatedNum) $message.success(`成功同步 ${updatedNum} 个榜单配置`);
      } else {
        console.log("列表无内容，写入默认");
        this.newsArr = this.defaultNewsArr.map((item) => cloneNewsItem(item));
      }
    },
  },
  persist: [
    {
      storage: localStorage,
      paths: [
        "siteTheme",
        "siteThemeAuto",
        "newsArr",
        "linkOpenType",
        "headerFixed",
        "listFontSize",
      ],
    },
  ],
});
