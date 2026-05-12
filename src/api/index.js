import axios from "@/api/request";
import {
  adaptHotSnapshot,
  buildErrorHotData,
  buildUnsupportedHotData,
} from "@/utils/hot";

const HOT_PUBLIC_API_PREFIX = "/openapi/api/public/hot";

export const getHotLists = async (hotItem) => {
  if (!hotItem) {
    return buildErrorHotData({}, "热榜配置不存在");
  }

  if (!hotItem.beEnabled) {
    return buildUnsupportedHotData(hotItem);
  }

  try {
    const response = await axios({
      method: "GET",
      url: `${HOT_PUBLIC_API_PREFIX}/${hotItem.sourceCode}`,
    });

    return adaptHotSnapshot(hotItem, response);
  } catch (error) {
    return buildErrorHotData(
      hotItem,
      error?.response?.data?.msg || "热榜加载失败，请稍后重试"
    );
  }
};
