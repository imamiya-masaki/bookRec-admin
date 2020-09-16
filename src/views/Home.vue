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
        <cld-context cloudName="teamb">
          <div>
           <cld-image publicId="sample" width="50" crop="scale" />
          </div>
        </cld-context>
        <input type="file" v-on:change="upload($event.target.files)" accept="image/*" />
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
      },
      cloudinary: {
        uploadPreset: 'dftaxtkz',
        apiKey: '762256589886267',
        cloudName: 'teamb'
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
  computed: {
    clUrl: function () {
      return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`
    }
  },
  methods: {
    submit: function () {
      console.log('', this.form)
      const postData = { title: '', author: '', book_group_id: 0, price: 0, uri: '' }
      for (const key of Object.keys(this.form)) {
        let get = this.form[key]
        if (key === 'price' || key === 'book_group_id') {
          get = Number(this.form[key] || 0)
        }
        postData[key] = get
      }
      axios.post('/book_regist', postData)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log('check', postData)
          console.log(err)
        })
    },
    upload: function (file) {
      const formData = new FormData()
      formData.append('file', file[0])
      formData.append('upload_preset', this.cloudinary.uploadPreset)
      formData.append('tags', 'gs-vue,gs-vue-uploaded')
      // For debug purpose only
      // Inspects the content of formData
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }
      // Execute api
      axios.post(this.clUrl, formData).then(res => {
        console.log('Success!!', res)
        this.form.uri = res.data.url
      })
    }
  }
}
</script>

<style scoped>
.hidariyose{
  text-align: left;
}
</style>
