<template>
  <main class="mt-3">
    <div class="container">
      <div class="float-end mb-1">
        <button type="button" class="btn btn-dark" @click="goToInsert">
          제품등록
        </button>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th></th>
            <th>제품명</th>
            <th>제품가격</th>
            <th>배송비</th>
            <th>추가 배송비</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr :key="i" v-for="(product, i) in productList">
            <td>
              <img :src="product.path" style="height: 50px; width: auto" />
            </td>
            <td>{{ product.product_name }}</td>
            <td>{{ product.product_price }}</td>
            <td>{{ product.delivary_price }}</td>
            <td>{{ product.add_delivery_price }}</td>
            <td>
              <button
                type="button"
                class="btn btn-info me-1"
                @click="goToImageInsert(product.id)"
              >
                사진등록
              </button>
              <button
                type="button"
                class="btn btn-warning me-1"
                @click="goToUpdate(product.id)"
              >
                수정
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteProduct(product.id)"
              >
                삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      productList: [],
    };
  },
  created() {
    this.getProductList();
  },
  methods: {
    async getProductList() {
      this.productList = await this.$api("/api/productList2", {});
    },
    goToInsert() {
      this.$router.push({ path: "/create" });
    },
    goToDetail(product_id) {
      //컴포넌트에서 라우터를 쓰는 방법
      // $router.push()로 path와 query를 넘겨준다.
      //path는 라우터 경로, query에는 넘길 데이터를 Object형태로 넘겨준다.
      this.$router.push({ path: "/detail", query: { product_id: product_id } });
    },
    goToUpdate(product_id) {
      this.$router.push({ path: "/update", query: { product_id: product_id } });
    },
    async deleteProduct(product_id) {
      //이쁜 alert창 (sweetalert2에서 가지고옴)
      //Swal 이라고 쓰지말고 vue에서는 this.$ 를 붙여야 한다.
      this.$swal
        .fire({
          title: "정말 삭제하시겠습니다?",
          showCancelButton: true,
          confirmButtonText: "삭제",
          cancelButtonText: `취소`,
        })
        .then(async (result) => {
          /* 확인을 눌렀을 때 동작하는 if문 */
          if (result.isConfirmed) {
            await this.$api("/api/productDelete", { param: [product_id] });
            this.getProductList();
            this.$swal.fire("삭제되었습니다!", "", "success");
          } else if (result.isDenied) {
            this.$swal.fire("Changes are not saved", "", "info");
          }
        });
    },
    goToImageInsert(id) {
      console.log(id);
      this.$router.push({
        path: "/image_insert",
        query: { product_id: id },
      });
    },
  },
};
</script>
