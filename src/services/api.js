export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryProduct: '/products/:id',
  queryProductList: '/products',
  updateProduct: 'PATCH /products/:id',
  createProduct: 'POST /products',
  removeProduct: 'DELETE /products/:id',
  removeProductList: 'POST /products/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',

  queryCategoryList: '/categories',
  createCategory: 'POST /categories',
  queryCategory: '/categories/:id',
  updateCategory: 'PATCH /categories/:id',
  removeCategory: 'DELETE /categories/:id',

  queryBannerList: '/banners',
  createBanner: 'POST /banners',
  queryBanner: '/banners/:id',
  updateBanner: 'PATCH /banners/:id',
  removeBanner: 'DELETE /banners/:id',

  queryServiceList: '/services',
  createService: 'POST /services',
  queryService: '/services/:id',
  updateService: 'PATCH /services/:id',
  removeService: 'DELETE /services/:id',

  queryConstructionList: '/constructions',
  createConstruction: 'POST /constructions',
  queryConstruction: '/constructions/:id',
  updateConstruction: 'PATCH /constructions/:id',
  removeConstruction: 'DELETE /constructions/:id',

  queryInfoList: '/info',
  createInfo: 'POST /info',
  queryInfo: '/info/:id',
  updateInfo: 'PATCH /info/:id',
  removeInfo: 'DELETE /info/:id',
}
