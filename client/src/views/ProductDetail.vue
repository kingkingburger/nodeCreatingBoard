<template>
  <main calss="mt-3">
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div
            id="carouselExampleIndicators"
            class="carousel carousel-dark slide"
            data-bs-ride="true"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div
                :class="`carousel-item ${i === 0 ? 'active' : ''}`"
                :key="i"
                v-for="(pimg, i) in productImage"
              >
                <img :src="pimg.path" class="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col-md-7">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                {{ productDetail.product_name }}
              </h5>
              <h5 class="card-title pt-3 pb-3 border-top">
                {{ getCurrencyFormat(productDetail.product_price) }} 원
              </h5>
              <p class="card-text pt-3 border-top">
                <span class="badge bg-dark me-1">{{
                  productDetail.category1
                }}</span>
                <span class="badge bg-dark me-1">{{
                  productDetail.category2
                }}</span>
                <span class="badge bg-dark">{{ productDetail.category3 }}</span>
              </p>
              <p class="card-text pb-3">
                배송비 {{ getCurrencyFormat(productDetail.delivary_price) }} |
                도서산관(제주도) 배송비 추가
                {{ getCurrencyFormat(productDetail.add_delivery_price) }} |
                택배배송 | {{ productDetail.outbound_days }} 일 이내 출고
              </p>
              <!-- 원래 p테그 안에 div 테그를 넣을 수 없다! -->
              <div class="card-text pt-3 border-top">
                <div class="row">
                  <div class="col-auto">
                    <label class="col-form-label"> 구매수량 </label>
                  </div>

                  <div class="col-auto">
                    <div class="input-group">
                      <span
                        class="input-group-text"
                        sylte="cusor:pointer;"
                        @click="calculatePrice(-1)"
                        >-</span
                      >
                      <input
                        type="text"
                        class="form-control"
                        style="width: 40px"
                        v-model="total"
                      />
                      <span
                        class="input-group-text"
                        sylte="cusor:pointer;"
                        @click="calculatePrice(1)"
                        >+</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="row pt-3 pb-3 border-top">
                <div class="col-6">
                  <h3>총 상품 금액</h3>
                </div>
                <div class="col-6" style="text-align: right">
                  <h3>{{ getCurrencyFormat(totalPrice) }}원</h3>
                </div>
              </div>
              <div
                class="row d-flex justify-content-between align-items-center"
              >
                <div class="col-6 d-grid p-1">
                  <button type="button" class="btn btn-lg btn-dark">
                    장바구니 담기
                  </button>
                </div>
                <div class="col-6 d-grid p-1">
                  <button type="button" class="btn btn-lg btn-danger">
                    주문하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <img :src="productDetail.path" class="img-fluid" />
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
      productImage: [],
      total: 1,
      totalPrice: 0,
    };
  },
  created() {
    //주소안에 있는 쿼리를 가져오는 방법
    //$route.query.쿼리이름 을 쓰면 된다.
    this.productId = this.$route.query.product_id;
    this.getProductDetail();
    this.getProductImage();
  },
  methods: {
    calculatePrice(cnt) {
      let total = this.total + cnt;
      if (total < 1) total = 1;
      this.total = total;
      this.totalPrice = this.productDetail.product_price * this.total;
    },

    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },

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
