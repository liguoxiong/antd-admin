export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryProduct: '/products/:id',
  queryProductList: '/products',
  updateProduct: 'PUT /products/:id',
  createProduct: 'POST /products',
  removeProduct: 'DELETE /products/:id',
  removeProductList: 'POST /products/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',

  queryCategoryList: '/categories',
  createCategory: 'POST /categories',
  queryCategory: '/categories/:id',
  updateCategory: 'PUT /categories/:id',
  removeCategory: 'DELETE /categories/:id',
}
