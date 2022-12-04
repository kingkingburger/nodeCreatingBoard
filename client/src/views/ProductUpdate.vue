<template>
  <main class="mt-3">
    <div class="container">
      <h2 class="text-center">제품 등록</h2>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품명</label>
        <div class="col-md-9">
          <input
            type="text"
            class="form-control"
            v-model="productDetail.product_name"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품가격</label>
        <div class="col-md-9">
          <div class="input-group mb-3">
            <input
              type="number"
              class="form-control"
              v-model="productDetail.product_price"
            />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">배송비</label>
        <div class="col-md-9">
          <div class="input-group mb-3">
            <input
              type="number"
              class="form-control"
              v-model="productDetail.delivary_price"
            />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">추가배송비(도서산간)</label>
        <div class="col-md-9">
          <div class="input-group mb-3">
            <input
              type="number"
              class="form-control"
              v-model="productDetail.add_delivery_price"
            />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품카테고리</label>
        <div class="col-md-9">
          <div class="row">
            <div class="col-auto">
              <select class="form-select">
                <option>전자제품</option>
              </select>
            </div>
            <div class="col-auto">
              <select class="form-select">
                <option>컴퓨터</option>
              </select>
            </div>
            <div class="col-auto">
              <select class="form-select">
                <option>악세사리</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">태그</label>
        <div class="col-md-9">
          <input
            type="text"
            class="form-control"
            v-model="productDetail.tags"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">출고일</label>
        <div class="col-md-9">
          <div class="input-group mb-3">
            <!-- input에 v-model을 넣어두면 기본값으로 되어있어진다! -->
            <input
              type="number"
              class="form-control"
              v-model="productDetail.tags"
            />
            <span class="input-group-text">일 이내 출고</span>
          </div>
        </div>
      </div>

      <div class="mb-3 row">
        <div class="col-6 d-grid p-1">
          <button type="button" class="btn btn-lg btn-dark">취소하기</button>
        </div>
        <div class="col-6 d-grid p-1">
          <button type="button" class="btn btn-lg btn-danger">저장하기</button>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      productId: 0,
      productDetail: {},
    };
  },
  computed: {
    //user라고 변수명을 선언한거랑 똑같다.
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    //주소안에 있는 쿼리를 가져오는 방법
    //$route.query.쿼리이름 을 쓰면 된다.
    this.productId = this.$route.query.product_id;
    this.getProductDetail();
    this.getProductImage();
  },
  mounted() {
    if (this.user.email === undefined) {
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    async getProductDetail() {
      //parameter 넘겨주는 방법
      //param :[] 형태로 넘겨준다.
      let productDetail = await this.$api("/api/productDetail", {
        param: [this.productId],
      });
      if (productDetail.length > 0) {
        this.productDetail = productDetail[0];
        this.totalPrice = this.productDetail.product_price * this.total;
      }
    },
    async getProductImage() {
      //parameter 넘겨주는 방법
      //param :[] 형태로 넘겨준다.
      this.productImage = await this.$api("/api/productMainImages", {
        param: [this.product_Id],
      });
    },
  },
};
</script>
