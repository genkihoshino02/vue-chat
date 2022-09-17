<template>
      <v-navigation-drawer
        v-model="drawer"
        app
      >
            <v-sheet
            color="grey lighten-4"
            class="pa-4"
            >
            <v-avatar
                class="mb-4"
                color="grey darken-1"
                size="64"
            ></v-avatar>

            <div class="username">john@vuetifyjs.com</div>
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
    data: () => ({
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'Inbox', "/"],
        ['mdi-send', 'Send', "/about"],
        ['mdi-delete', 'Trash', "/about"],
        ['mdi-alert-octagon', 'Spam', "/about"],
      ],
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
      }
    }
  }
</script>