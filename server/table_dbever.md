#### ✡ -- dev.t_category definition

```sql
CREATE TABLE `t_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category1` varchar(100) DEFAULT NULL,
  `category2` varchar(100) DEFAULT NULL,
  `category3` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
```



#### 🔯 -- dev.t_image definition

```sql

CREATE TABLE `t_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `type` int(1) NOT NULL COMMENT '1-썸네일 2-제품이미지 3-제품상세이미지',
  `path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `t_image_FK` (`product_id`),
  CONSTRAINT `t_image_FK` FOREIGN KEY (`product_id`) REFERENCES `t_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
```





#### 🔯 -- dev.t_product definition

```sql
CREATE TABLE `t_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `product_price` int(11) NOT NULL DEFAULT 0,
  `delivary_price` int(11) NOT NULL,
  `add_delivery_price` int(11) NOT NULL DEFAULT 0,
  `tags` varchar(100) DEFAULT NULL,
  `outbound_days` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `seller_id` int(11) NOT NULL,
  `cateogry_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `t_product_FK_1` (`cateogry_id`),
  KEY `t_product_FK` (`seller_id`),
  CONSTRAINT `t_product_FK` FOREIGN KEY (`seller_id`) REFERENCES `t_seller` (`id`),
  CONSTRAINT `t_product_FK_1` FOREIGN KEY (`cateogry_id`) REFERENCES `t_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
```





#### 🔯 -- dev.t_seller definition

```sql

CREATE TABLE `t_seller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
```





#### 🔯-- dev.t_user definition

```sql
CREATE TABLE `t_user` (
  `email` varchar(50) NOT NULL,
  `type` varchar(100) NOT NULL DEFAULT '1' COMMENT '1-buyer 2-seller',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

