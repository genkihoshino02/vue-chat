<template>
      <v-navigation-drawer
        v-model="drawer"
        app
      >
            <v-sheet
            color="grey lighten-4"
            class="pa-4"
            >
            <v-avatar color="indigo">
              <input type="file"
                     ref="fileInput"
                     accept="image/jpeg, image/jpg, image/png"
                     style="display: none;"
                     @change="updateIcon">
              <v-icon dark
                      @click="changeIcon"
                      v-if="!photoUrl">
                mdi-account-circle
              </v-icon>

              <img :src="photoUrl"
                  v-if="photoUrl">

            </v-avatar>

            <div class="username">{{auth && auth.displayName}}</div>
            </v-sheet>

            <v-divider></v-divider>

            <v-list>
            <v-list-item
                v-for="[icon, text, to] in links"
                :key="icon"
                :to="to"
                link
            >
                <v-list-item-icon>
                    <v-icon>{{ icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon color="blue">mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            </v-list>
      </v-navigation-drawer>
</template>

<script>
    import firebase from '@/firebase/firebase'
    export default {
      mounted() {
        this.auth = JSON.parse(sessionStorage.getItem('user'))
        this.photoUrl = this.auth.photoUrl
      },
      data: () => ({
          drawer: null,
          links: [
            ['mdi-inbox-arrow-down', 'Inbox', "/"],
            ['mdi-send', 'Send', "/about"],
            ['mdi-delete', 'Trash', "/about"],
            ['mdi-alert-octagon', 'Spam', "/about"],
          ],
          auth: null,
          photoUrl: ''
        }),
        methods: {
          logout() {
            firebase.auth()
              .signOut()
              .then(()=>{
                localStorage.message = "logout successfully"
                this.$router.push('/login')
              })
              .catch((error)=> {
                console.log(error)
              })
          },
          changeIcon() {
            this.$refs.fileInput.click()
          },
          updateIcon() {
            const user = this.getAuth()
            if(!user) {
              sessionStorage.removeItem('user')
              this.$router.push('/login')
            }

            const file = this.$refs.fileInput.files[0]
            const filePath = `/user/${file.name}`

            firebase.storage().ref()
              .child(filePath)
              .put(file)
              .then(async snapshot => {
                const photoUrl = await snapshot.ref.getDownloadURL()
                firebase.auth().onAuthStateChanged((user) => {
                  if(user) {
                    user.updateProfile( {
                      photoUrl: photoUrl
                    })

                  this.auth.photoUrl = photoUrl
                  sessionStorage.setItem('user', JSON.stringify(this.auth))
                  }
                })
              })
          },
          getAuth() {
            return firebase.auth().onAuthStateChanged((user)=>{
              return user
            })
          }
        }
  }
</script>