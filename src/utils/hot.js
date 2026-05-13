const DEFAULT_ERROR_MESSAGE = "热榜加载失败，请稍后重试";

const buildBaseHotData = (hotItem = {}) => {
  const title = hotItem.label || hotItem.name || "未知榜单";

  return {
    code: 200,
    title,
    sourceName: title,
    subtitle: title,
    type: title,
    total: null,
    updateTime: null,
    message: "",
    data: [],
  };
};

const adaptHotItem = (item = {}) => {
  const url = item.url || "";

  return {
    rank: item.rank ?? null,
    title: item.title || "",
    url,
    mobileUrl: item.mobileUrl || url,
    hot: item.hotValue || item.hot || "",
    desc: item.summary || item.desc || "",
    cover: item.cover || "",
    publishedAt: item.publishedAt || null,
  };
};

export const buildErrorHotData = (
  hotItem = {},
  message = DEFAULT_ERROR_MESSAGE
) => {
  return {
    ...buildBaseHotData(hotItem),
    code: 500,
    subtitle: "加载失败",
    type: "加载失败",
    message,
  };
};

export const adaptHotSnapshot = (type, response) => {
  if (!response?.success || !response?.content) {
    return buildErrorHotData({ name: type }, response?.msg || response?.message);
  }

  const { content } = response;
  const items = Array.isArray(content.items) ? content.items : [];
  const sourceName = content.sourceName || type || "未知榜单";
  const sourceType = content.sourceType || sourceName;

  return {
    ...buildBaseHotData({ name: type, label: sourceName }),
    code: 200,
    title: sourceName,
    sourceName,
    subtitle: sourceType,
    type: sourceType,
    total: `${items.length} 条`,
    updateTime: content.cachedAt || content.fetchedAt || null,
    message: items.length ? "" : "暂无数据",
    data: items.map((item) => adaptHotItem(item)),
  };
};
