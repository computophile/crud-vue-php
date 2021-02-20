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
    addUser(){
        var formData = app.toFormData(app.newUser);
        axios.post("http://localhost/crud-vue-php/process.php?action=create", formData).
        then(function(response){
          //reinitializing the data
          newUser = {name: "", email: "", phone: ""};
          if (response.data.error){
            app.errorMsg = response.data.message;
          }
          else{
            app.successMsg = response.data.message;
            app.getAllUsers();
          }
        })
    },
    updateUser(){
      var formData = app.toFormData(app.newUser);
      axios.post("http://localhost/crud-vue-php/process.php?action=update", formData).
      then(function(response){
        app.currentUser = {};
        if (response.data.error){
          app.errorMsg = response.data.message;
        }
        else{
          app.successMsg = response.data.message;
          app.getAllUsers();
        }
      })
  },
    toFormData(obj){
      var fd = new FormData();
      for (var i in obj){
        console.log("Value for Console Data: ", i);
        fd.append(i, obj[i]);
      }
      return fd;
    }
  },
})