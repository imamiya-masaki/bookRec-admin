<template>
  <div class="mobileShelf">
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import VueOnsen from 'vue-onsenui'

Vue.use(VueOnsen)
export default {
  name: 'mobileShelf',
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
      twitter_id: '',
      events: [],
      someData: [],
      input: "",
      cloudinary: {
        uploadPreset: 'dftaxtkz',
        apiKey: '762256589886267',
        cloudName: 'teamb'
      }
    }
  },
  created: function (){
    var self = this
        this.$http.get('http://localhost:8081/bookShelf', function (data, status, request) {
            for(var i = 0; i < data.length; i++){
                this.events.push(data[i]);
            }
        }).error(function (data, status, request) {
            // handle error
        })
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
