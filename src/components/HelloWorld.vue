<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h1 class="card-title">{{ this.details.msg }} <a href="#" @click="logout">Logout</a></h1>
            <div class="card-tools pull-right">
              <button class="btn btn-success" data-toggle="modal" data-target="#addNew" @click="openModalWindow">Add New
                <i class="fa fa-plus fa-fw"></i></button>
            </div>
          </div>

          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <tbody>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>

              <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td><div id="img">
                  <img v-if="product.image" :src="product.image" />
                </div></td>
                <td>{{ product.title }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.created_at }}</td>

                <td>
                  <a href="#" data-id="product.id" @click="editModalWindow(product)">
                    <i class="fa fa-edit blue"></i>
                  </a>
                  |
                  <a href="javascript:void(0)" @click="deleteProduct(product.id)">
                    <i class="fa fa-trash text-danger"></i>
                  </a>

                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="card-footer">

          </div>
        </div>

      </div>
    </div>
    <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">

            <h5 v-show="!editMode" class="modal-title" id="addNewLabel">Add New Product</h5>
            <h5 v-show="editMode" class="modal-title" id="addNewLabel">Update Product</h5>

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <form @submit.prevent="editMode ? updateProduct() : createProduct()">
            <div class="modal-body">
              <div class="form-group">
                <input v-model="form.title" type="text" name="title" required
                       placeholder="Enter product title"
                       class="form-control">
              </div>

              <div class="form-group">
                <input v-model="form.price" type="text" name="price"
                       placeholder="0.00"
                       class="form-control" required>
              </div>

              <div class="form-group">
               <textarea v-model="form.description" name="description"
                         placeholder="Write a product details"
                         class="form-control" required></textarea>
              </div>
              <div class="form-group">
                <input type="file" accept="image/*" v-on:change="onImageChange"/>
                <div id="preview_image" v-if="form.image">
                  <img  :src="form.image" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              <button v-show="editMode" type="submit" class="btn btn-primary">Update</button>
              <button v-show="!editMode" type="submit" class="btn btn-primary">Create</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {Form, HasError, AlertError} from 'vform'

axios.defaults.baseURL = 'http://vuejs_backend/api/'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

const token = localStorage.getItem("authToken")
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

export default {
  name: 'Home',
  data() {
    return {
      details: {
        msg: 'Welcome to dashboard',
        sms: null,
        picture: null
      },
      editMode: false,
      products: {},
      form: new Form({
        id: null,
        title: null,
        description: null,
        price: null,
        image: null
      })
    }
  },
  methods: {
    onImageChange(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length)
        return
      this.createImage(files[0])
    },
    createImage(file) {
      let reader = new FileReader()
      reader.onload = (e) => {
        this.form.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    loadProducts() {
      axios.get("homeApi", config).then(response => (this.products = response.data.data.getProducts))
    },
    openModalWindow() {
      this.editMode = false
      this.form.reset()
      $('#addNew').modal('show')
    },
    createProduct() {
      this.form.post('products', config)
        .then(() => {
          $('#addNew').modal('hide')
          this.loadProducts()
        })
        .catch(() => {
          this.loadProducts()
        })
    },
    editModalWindow(product) {
      this.form.clear()
      this.editMode = true
      this.form.reset()
      $('#addNew').modal('show')
      this.form.fill(product)
    },
    updateProduct() {
      this.form.put('products/' + this.form.id, config)
        .then(() => {
          this.loadProducts()
          $('#addNew').modal('hide')
        })
        .catch(() => {
        })
    },
    deleteProduct(id) {
      axios.delete('products/'+id, config).then(()=>{
        this.loadProducts()
      })
    },
    logout() {
      axios.post("logout", this.details, config).then(() => {
        localStorage.removeItem("authToken")
        this.$router.push({name: "Login"})
      })
    }
  },
  async created() {
    this.loadProducts()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
img{
  width: 80px;
  height: 80px;
}
</style>
