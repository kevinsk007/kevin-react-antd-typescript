import request from '../utils/request'
export default {
  // getProductList: `/mock/products/discounts.json`,
  getProductList: request.GET(`/mock/products/discounts.json`),
  // getProductList: `mock/products/discounts.json?rowIndex=0&pageSize=3`,
  // getProductDetail: id => `/mock/product_detail/${id}.json`,
  // getShopById: id => `/mock/shops/${id}.json`,
  // getPopularKeywords: () => '/mock/keywords/popular.json',
  // getRelatedKeywords: text => `/mock/keywords/related.json?keyword=${text}`,
  // getRelatedShops: keyword => `/mock/shops/related.json?keyword=${keyword}`,
}
