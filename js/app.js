var app = new Vue({

    el: '#app ',
    data: {
        data: [],
        exist: false,
        keyword: '',
        reverse: false,
        sortTitle: '',
        currPage: 1,
        OrderName: "name",
        Option: "asc",
        /* 目前頁數*/
        countOfPage: 10,
        /* 1 of 10 10個條目為一組 */

    },
    methods: {
        sort(by, option) {
            const vm = this;
            if (vm.OrderName == by) {
                if (vm.Option == "asc") {
                    vm.Option = "desc";
                } else if (vm.Option == "desc") {
                    vm.Option = "asc";
                }
            } else {
                vm.Option = option;
                vm.OrderName = by;
            }
            vm.reverse = !vm.reverse;
        },

        isExist(item) {
            // console.log(index.exist);
            console.log(item, this.data)
            item.exist = !item.exist;


        },
        setPage(index) {
            if (index <= 0 || index > this.totalPage) {
                return;
            }
            this.currPage = index;
        }
        // setPage(index) {
        //     //換頁
        //     if (index <= 0 || index > this.totalPage) {
        //         return;
        //     }
        //     this.currPage = index;

        // }

    },

    computed: {
        filteredRows() {
            let vm = this;
            // 因為 JavaScript 的 filter 有分大小寫，
            // toLowerCase()所以這裡將 keyword 與 item.name 通通轉小寫方便比對。
            if (vm.keyword.trim() !== '') {
                return vm.sortedRod.filter((item) => {
                    return item.name.toLowerCase().indexOf(vm.keyword.toLowerCase()) !== -1
                })
            } else {
                return vm.sortedRod
            };


        },
        pageStart() {
            //起始數字
            return (this.currPage - 1) * this.countOfPage;
        },
        totalPage() {
            return Math.ceil(this.filteredRows.length / this.countOfPage);
        },
        sortedRod() {
            return _.orderBy(this.data, this.OrderName, this.Option);
        }

        // pageStart() {
        //     //起始數字
        //     return (this.currPage - 1) * this.countOfPage;
        // },
        // totalPage: function() {
        //     //尾數
        //     //取整數 Math.ceil() 函式會回傳大於等於所給數字的最小整數。
        //     return parseInt(this.filteredRows.length / this.countOfPage);
        //     //全部數列長度 除以 10(想要10為一組)
        // }
    },
    created() {
        const vm = this;

        const api = "https://www.json-generator.com/api/json/get/cknklDscqG?indent=2";
        axios.get(api).then(res => {
            vm.data = res.data;

            let newobj = vm.data.map((item, index) => {
                // console.log(index)
                this.$set(item, 'exist', false)
                    // item.exist = false;
                return item;
            })


            console.log(vm.data);
        })
    }




})