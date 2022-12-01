module.exports = {
  productList: {
    query: `select t1.* , t2.path, t3.category1 ,t3.category2 , t3.category3  
    from dev.t_product t1, dev.t_image t2, dev.t_category t3
    where t1.id = t2.product_id  and t2.type =1 and t1.cateogry_id = t3.id ;`,
  },
  productDetail: {
    query: `select t1.* , t2.path, t3.category1 ,t3.category2 , t3.category3  from dev.t_product t1, dev.t_image t2, dev.t_category t3
    where t1.id = 1 and t1.id = t2.product_id and t2.type = 3 and t1.cateogry_id = t3.id;`,
  },
  productMainImages: {
    query: `
    select * from dev.t_image ti where product_id = 1 and type = 2;`,
  },
  productInsert: {
    query: `insert into dev.t_product (product_name, product_price, delivary_price, add_delivery_price, tags, outbound_days, seller_id, cateogry_id)
    values(?,?,?,?,?,?,?,?);`,
  },

  productInsertImage: {
    query: `insert into dev.t_image(product_id, type, path)
    values(?,?,?);`,
  },
};
