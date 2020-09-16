<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <b-form-input
          id="input-1"
          v-model="form.title"
          required
          placeholder="Enter title"
        ></b-form-input>
      <b-form-input
          id="input-1"
          v-model="form.author"
          required
          placeholder="Enter author"
        ></b-form-input>
      <b-form-input
          id="input-1"
          v-model="form.price"
          required
          placeholder="Enter price"
        ></b-form-input>
      <b-form-input
          id="input-1"
          v-model="form.uri"
          required
          placeholder="Enter uri"
        ></b-form-input>
        <b-form-input
          id="input-1"
          v-model="form.book_group_id"
          required
          placeholder="Enter book_group_id"
        ></b-form-input>
    <b-button @click="submit()" variant="success">登録</b-button>
    <div class="hidariyose">本list</div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' }
      ],
      form: {
        book_group_id: 0,
        title: '',
        author: '',
        price: '',
        uri: ''
      }
    }
  },
  mounted () {
    axios
      .get('/book/')
      .then(res => {
        this.items = res.data
        console.log('check', res)
      })
      .catch(err => {
        console.log('err', err)
      })
  },
  methods: {
    submit: function () {
      console.log('', this.form)
      const postData = { title: '', author: '', book_group_id: 0, price: 0, uri: '' }
      for (const key of Object.keys(this.form)) {
        let get = this.form[key]
        if (key === 'price' || key === 'book_group_id') {
          get = Number(this.form[key])
        }
        postData[key] = get
        axios.post('/book/regist', postData)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style scoped>
.hidariyose{
  text-align: left;
}
</style>
