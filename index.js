const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    n: 8,
    arr: [],
    cellSize: 40,
	queen: 0
  },
  methods: {
    generate() {
      this.initArr()
    },
    range(start, stop, step) {
      if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
      }

      if (typeof step == 'undefined') {
        step = 1;
      }

      if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
      }

      let result = [];
      for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
      }

      return result;
    },
    hit(i, j){
      if (this.arr[i][j] === 1) {
        this.arr[i][j] = 0
        this.removeThreat(i, j)
		this.queen--;
      } else if (this.arr[i][j] === 0) {
        this.arr[i][j] = 1
        this.putThreat(i, j)
		this.queen++;
      }

      Vue.set(this.arr, i, this.arr[i])
    },
    initArr(){
      this.arr = []
      for (let i=0;i<this.n;i++) {
        this.arr[i] = [];
        for (let j=0; j<this.n; j++) {
          this.arr[i][j] = 0 // No piece
        }
      }
	  this.queen = 0
    },
    putThreat (row, column) {
      for(let i=0; i<this.n; i++) {
        if (this.arr[row][i] === 0) { // If empty, put red
          this.arr[row][i] = 2
        } else if (this.arr[row][i] >= 2) { // If already red, increase
          this.arr[row][i]++
        }
      }

      for(let i=0; i<this.n; i++) {
        if (this.arr[i][column] === 0) { // If empty, put red
          this.arr[i][column] = 2
        } else if (this.arr[i][column] >= 2) { // If already red, increase
          this.arr[i][column]++
        }
      }

      for(let k=0; row+k < this.n && column+k < this.n; k++){
        if(this.arr[row+k][column+k] === 0 ){
          this.arr[row+k][column+k] = 2
        } else if (this.arr[row+k][column+k] >= 2) { // If already red, increase
          this.arr[row+k][column+k]++
        }
      }

      for(let k=0; row+k < this.n && column-k >= 0; k++){
        if(this.arr[row+k][column-k] === 0 ){
          this.arr[row+k][column-k] = 2
        } else if (this.arr[row+k][column-k] >= 2) { // If already red, increase
          this.arr[row+k][column-k]++
        }
      }

      for(let k=0; row-k >= 0 && column-k >= 0; k++){
        if(this.arr[row-k][column-k] === 0 ){
          this.arr[row-k][column-k] = 2
        } else if (this.arr[row-k][column-k] >= 2) { // If already red, increase
          this.arr[row-k][column-k]++
        }
      }

      for(let k=0; row-k >= 0 && column+k < this.n; k++){
        if(this.arr[row-k][column+k] === 0 ){
          this.arr[row-k][column+k] = 2
        } else if (this.arr[row-k][column+k] >= 2) { // If already red, increase
          this.arr[row-k][column+k]++
        }
      }
    },
    removeThreat (row, column) {
      for(let i=0; i<this.n; i++) {
        if (this.arr[row][i] >= 3) { // If already red and threatened by more than 2 queen, decrease
          this.arr[row][i]--
        } else if (this.arr[row][i] === 2) { // If threatened by one queen, put empty
          this.arr[row][i] = 0
        }
      }

      for(let i=0; i<this.n; i++) {
        if (this.arr[i][column] >= 3) { // If already red and threatened by more than 2 queen, decrease
          this.arr[i][column]--
        } else if (this.arr[i][column] === 2) { // If threatened by one queen, put empty
          this.arr[i][column] = 0
        }
      }

      for(let k=0; row+k < this.n && column+k < this.n; k++){
        if(this.arr[row+k][column+k] >= 3 ){
          this.arr[row+k][column+k]--
        } else if (this.arr[row+k][column+k] === 2) { // If already red, increase
          this.arr[row+k][column+k] = 0
        }
      }

      for(let k=0; row+k < this.n && column-k >= 0; k++){
        if(this.arr[row+k][column-k] >= 3 ){
          this.arr[row+k][column-k]--
        } else if (this.arr[row+k][column-k] === 2) { // If already red, increase
          this.arr[row+k][column-k] = 0
        }
      }

      for(let k=0; row-k >= 0 && column-k >= 0; k++){
        if(this.arr[row-k][column-k] >= 3 ){
          this.arr[row-k][column-k]--
        } else if (this.arr[row-k][column-k] === 2) { // If already red, increase
          this.arr[row-k][column-k] = 0
        }
      }

      for(let k=0; row-k >= 0 && column+k < this.n; k++){
        if(this.arr[row-k][column+k] >= 3 ){
          this.arr[row-k][column+k]--
        } else if (this.arr[row-k][column+k] === 2) { // If already red, increase
          this.arr[row-k][column+k] = 0
        }
      }
    }
  }
})
