var app = new Vue({
  el: "#app",
  data: {
    errorMsg: "",
    successMsg: "",
    showAddModal: false,
    showEditModal: false,
    showDeleteModal: false,

    users: [],
    newUser: {name: "", email: "", phone: ""},
    currentUser: {}
  },
  mounted: function(){
    // when the app vue instance is created the mounted function will be exectud.
    this.getAllUsers();
  },
  methods: {
    getAllUsers(){
      axios.get("http://localhost/crud-vue-php/process.php?action=read").then(
        function(response){
          if(response.data.error){
            app.errorMsg = response.data.message;
          }
          else{
            app.users = response.data.users;
          }
        }
      )
    },

  },
})