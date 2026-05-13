import axios from "@/api/request";
import { adaptHotSnapshot, buildErrorHotData } from "@/utils/hot";

const HOT_PUBLIC_API_PREFIX =
  import.meta.env.VITE_HOT_API_PREFIX || "/openapi/api/public/hot";

const normalizeHotListOptions = (options = {}) => {
  if (typeof options === "boolean") {
    return {
      forceRefresh: options,
    };
  }

  return options;
};

/**
 * 获取热榜分类数据
 * @param {string} type 热榜分类名称
 * @param {object|boolean} options 请求配置
 * @param {boolean} options.forceRefresh 是否绕过后端缓存获取最新数据
 * @param {object} options.params 请求参数
 * @returns
 */
export const getHotLists = async (type, options = {}) => {
  try {
    const { forceRefresh = false, params = {} } =
      normalizeHotListOptions(options);
    const useServerCache = !forceRefresh;

    const response = await axios({
      method: "GET",
      url: `${HOT_PUBLIC_API_PREFIX}/${type}`,
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      params: {
        ...params,
        // 榜单是否使用缓存统一由接口层决定，避免调用方自行覆盖。
        cache: useServerCache,
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
