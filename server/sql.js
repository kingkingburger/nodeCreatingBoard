module.exports = {
  productList: {
    query: `select t1.* , t2.path, t3.category1 ,t3.category2 , t3.category3  
    from dev.t_product t1, dev.t_image t2, dev.t_category t3 where t1.id = t2.product_id  and t2.type =1 and t1.category_id = t3.id ;`,
  },
  productList2: {
    query: `select t3.*, t4.path from 
    (select  t1.*, t2.category1, t2.category2, t2.category3  from dev.t_product t1, dev.t_category t2
    where t1.category_id = t2.id) t3
    left join (select * from dev.t_image where type = 1) t4
    on t3.id = t4.product_id;`,
  },

  productDetail: {
    query: `select t1.* , t2.path, t3.category1 ,t3.category2 , t3.category3  from dev.t_product t1, dev.t_image t2, dev.t_category t3 
    where t1.id = ? and t1.id = t2.product_id and t2.type = 3 and t1.category_id = t3.id;`,
  },
  productMainImages: {
    query: `select * from dev.t_image ti where product_id = 1 and type = 2;`,
  },
  //object로 쿼리가 오는데 set으로 하면 알아서 풀어준다.
  // field: value 형태가 그대로 들어간다.
  productInsert: {
    query: `insert into dev.t_product set ?;`,
  },
  imageList: {
    query: `select * from dev.t_image where product_id=?`,
  },
  productImageInsert: {
    query: `insert into dev.t_image set ?;`,
  },
  // 없으면 insert하고 없으면 update하라는 쿼리
  // set을 쓰면 key,value 형태로 insert할 수 있다.
  signUp: {
    query: `insert into dev.t_user set ? on DUPLICATE key update ?`,
  },
  productDelete: {
    query: `delete from dev.t_product where id=?`,
  },
  categoryList: {
    query: `select * from dev.t_category;`,
  },
};
