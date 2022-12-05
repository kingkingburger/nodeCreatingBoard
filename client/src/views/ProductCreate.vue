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
            v-model="product.product_name"
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
              v-model="product.product_price"
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
              v-model="product.delivary_price"
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
              v-model="product.add_delivery_price"
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
              <select
                class="form-select"
                v-model="cate1"
                @change="changeCategory1"
              >
                <option :value="cate" :key="i" v-for="(cate, i) in category1">
                  {{ cate }}
                </option>
              </select>
            </div>
            <div class="col-auto">
              <select
                class="form-select"
                v-model="cate2"
                @change="changeCategory2"
              >
                <option :value="cate" :key="i" v-for="(cate, i) in category2">
                  {{ cate }}
                </option>
              </select>
            </div>
            <div class="col-auto">
              <select class="form-select" v-model="cate3">
                <option :value="cate" :key="i" v-for="(cate, i) in category3">
                  {{ cate }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">태그</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="product.tags" />
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">출고일</label>
        <div class="col-md-9">
          <div class="input-group mb-3">
            <input
              type="number"
              class="form-control"
              v-model="product.outbound_days"
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
          <button
            type="button"
            class="btn btn-lg btn-danger"
            @click="productInsert"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      product: {
        product_name: "",
        product_price: 0,
        delivary_price: 0,
        add_delivery_price: 0,
        tags: "",
        outbound_days: "",
        seller_id: 1,
        category_id: 1,
      },
      categoryList: [],
      category1: [],
      category2: [],
      category3: [],
      cate1: "",
      cate2: "",
      cate3: "",
    };
  },
  computed: {
    //user라고 변수명을 선언한거랑 똑같다.
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.getCategoryList();
  },
  mounted() {
    if (this.user.email === undefined) {
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    productInsert() {
      if (this.product.product_name === "") {
        return this.$swal("제품명은 필수 입력값입니다.");
      }
      if (
        this.product.product_price === 0 ||
        this.product.product_price === ""
      ) {
        return this.$swal("제품가격을 입력하세요.");
      }
      if (
        this.product.delivary_price === 0 ||
        this.product.delivary_price === ""
      ) {
        return this.$swal("배송료을 입력하세요.");
      }
      if (
        this.product.outbound_days === 0 ||
        this.product.outbound_days === ""
      ) {
        return this.$swal("출고일을 입력하세요.");
      }

      this.product.category_id = this.categoryList.filter((c) => {
        return (
          c.category1 === this.cate1 &&
          c.category2 === this.cate2 &&
          c.category3 === this.cate3
        );
      })[0].id;

      //이쁜 alert창 (sweetalert2에서 가지고옴)
      //Swal 이라고 쓰지말고 vue에서는 this.$ 를 붙여야 한다.
      this.$swal
        .fire({
          title: "정말 등록하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: `생성`,
          cancelButtonText: `취소`,
        })
        .then(async (result) => {
          /* 확인을 눌렀을 때 동작하는 if문 */
          if (result.isConfirmed) {
            await this.$api("/api/productInsert", { param: [this.product] });
            this.$swal.fire("저장되었습니다!", "", "success");
            this.$router.push({ path: "sales" });
          }
        });
    },

    changeCategory1() {
      this.category3 = [];
      let categoryList = this.categoryList.filter((c) => {
        return c.category1 === this.cate1;
      });

      let oCategory2 = {};
      categoryList.forEach((item) => {
        oCategory2[item.category2] = item.id;
      });

      let category2 = [];
      for (let key in oCategory2) {
        category2.push(key);
      }
      this.category2 = category2;
    },

    changeCategory2() {
      let categoryList = this.categoryList.filter((c) => {
        return c.category1 === this.cate1 && c.category2 === this.cate2;
      });

      let oCategory3 = {};
      categoryList.forEach((item) => {
        oCategory3[item.category3] = item.id;
      });

      let category3 = [];
      for (let key in oCategory3) {
        category3.push(key);
      }
      this.category3 = category3;
    },

    changeCategory3() {},

    async getCategoryList() {
      let categoryList = await this.$api("/api/categoryList", {});
      this.categoryList = categoryList;

      let oCategory = {};
      categoryList.forEach((item) => {
        oCategory[item.category1] = item.id;
      });

      let category1 = [];
      for (let key in oCategory) {
        category1.push(key);
      }

      this.category1 = category1;

      let category2 = [];
      category2 = categoryList.filter((c) => {
        return c.category1 == category1[0];
      });

      let oCategory2 = {};
      category2.forEach((item) => {
        oCategory2[item.category2] = item.id;
      });

      category2 = [];
      for (let key in oCategory2) {
        category2.push(key);
      }
      this.category2 = category2;
    },
  },
};
</script>
