import axios from "@/api/request";
import { adaptHotSnapshot, buildErrorHotData } from "@/utils/hot";

const HOT_PUBLIC_API_PREFIX = "/openapi/api/public/hot";

/**
 * 获取热榜分类数据
 * @param {string} type 热榜分类名称
 * @param {boolean} isNew 是否拉取最新数据
 * @param {object} params 请求参数
 * @returns
 */
export const getHotLists = async (type, isNew = false, params) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${HOT_PUBLIC_API_PREFIX}/${type}`,
      params: {
        cache: !isNew,
        ...params,
      },
    });

    return adaptHotSnapshot(type, response);
  } catch (error) {
    return buildErrorHotData(
      { name: type },
      error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "请求失败，请稍后重试"
    );
  }
};
