<template>
    <v-app id="inspire">
      <Sidebar />
      <v-app-bar
        app
        shrink-on-scroll
      >
  
        <v-toolbar-title>Room List</v-toolbar-title>
        <CreateRoom />
        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
  
      <v-main>
        <v-container>
          <v-row>
            <v-col
              v-for="room in rooms"
              :key="room.id"
              cols="4"
            >
              <!-- <v-card height="200"></v-card> -->
              <router-link :to="{path:'/chat', query:{ room_id: room.id}}">
                 <v-avatar
                      color="grey lighten-2"
                      size="70"
                  >
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                      v-if="!room.thumbnailUrl"
                    >
                    <img
                      :src="room.thumbnailUrl"
                      alt="John"
                      v-if="room.thumbnailUrl"
                    >                   
                </v-avatar>
              </router-link>
  
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
    import firebase from '@/firebase/firebase'
    import Sidebar from '@/components/layouts/Sidebar'
    import CreateRoom from '@/components/modal/CreateRoom'
    export default {
      components: {
        Sidebar,
        CreateRoom
      },
      data: ()=> ({
        rooms: []
      }),
      mounted() {
        this.getRooms()
      },
      methods: {
        async getRooms() {
            this.rooms = []
            const roomRef = firebase.firestore().collection('rooms')
            const snapshot = await roomRef.get()
            console.log(snapshot)

            snapshot.forEach(doc => {
                this.rooms.push(doc.data())
            })
        }
      }
    }
  </script>
  