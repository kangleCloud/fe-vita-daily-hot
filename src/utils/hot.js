const DEFAULT_ERROR_MESSAGE = "热榜加载失败，请稍后重试";

const buildBaseHotData = (hotItem = {}) => {
  const title = hotItem.label || hotItem.name || "未知榜单";
  const sourceCode = hotItem.sourceCode || hotItem.name || "";

  return {
    sourceCode,
    sourceName: title,
    title,
    subtitle: title,
    type: title,
    total: null,
    updateTime: null,
    stale: false,
    status: "empty",
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
    mobileUrl: url,
    hot: item.hotValue || "",
    desc: item.summary || "",
    cover: item.cover || "",
    publishedAt: item.publishedAt || null,
  };
};

export const buildUnsupportedHotData = (hotItem = {}) => {
  return {
    ...buildBaseHotData(hotItem),
    subtitle: "暂未接入",
    type: "暂未接入",
    status: "unsupported",
    message: "当前榜单暂未接入 be-vita 热榜服务",
  };
};

export const buildErrorHotData = (
  hotItem = {},
  message = DEFAULT_ERROR_MESSAGE
) => {
  return {
    ...buildBaseHotData(hotItem),
    subtitle: "加载失败",
    type: "加载失败",
    status: "error",
    message,
  };
};

export const adaptHotSnapshot = (hotItem = {}, response) => {
  if (!response?.success) {
    return buildErrorHotData(hotItem, response?.msg || DEFAULT_ERROR_MESSAGE);
  }

  if (!response?.content) {
    return buildErrorHotData(hotItem);
  }

  const { content } = response;
  const data = Array.isArray(content.items)
    ? content.items.map((item) => adaptHotItem(item))
    : [];
  const sourceName =
    content.sourceName || hotItem.label || hotItem.name || "未知榜单";
  const stale = Boolean(content.stale);
  const hasData = data.length > 0;

  return {
    ...buildBaseHotData(hotItem),
    sourceName,
    subtitle: sourceName,
    type: sourceName,
    total: `${data.length} 条`,
    updateTime: content.cachedAt || content.fetchedAt || null,
    stale,
    status: stale && hasData ? "stale" : hasData ? "supported" : "empty",
    message: hasData ? (stale ? "缓存较旧" : "") : "暂无数据",
    data,
  };
};

export const isRenderableHotData = (status) => {
  return status === "supported" || status === "stale";
};
