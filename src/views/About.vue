<template>
<div>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    coupon
    <b-form-input
          id="input-1"
          v-model="form.UserId"
          required
          placeholder="Enter Twitter Token"
        ></b-form-input>
        <b-form-input
          id="input-2"
          v-model="form.Percent"
          required
          placeholder="Enter percent"
        ></b-form-input>
    <b-button @click="submit()" variant="success">登録</b-button>
    <div class="hidariyose">userlist</div>
    <b-table striped hover :items="items">
      </b-table>
    <div class="hidariyose">couponAll</div>
  </div>
  <div>
    <div v-for="(item,key) in cuopons" :key="key" >
      {{item}}
      </div>
    </div>
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
      cuopons: [

      ],
      form: {
        UserId: '',
        Percent: ''
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
      .get('/users/')
      .then(res => {
        this.items = res.data
        console.log('check', res)
      })
      .catch(err => {
        console.log('err', err)
      })
    axios
      .get('/couponAll/')
      .then(res => {
        this.cuopons = res.data
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
      const postData = { UserId: '', Percent: 0 }
      for (const key of Object.keys(this.form)) {
        let get = this.form[key]
        if (key === 'Percent' || key === 'UserId') {
          get = Number(this.form[key] || 5)
        }
        postData[key] = get
      }
      axios.post('/coupon', postData)
        .then((res) => {
          console.log('res', res)
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
