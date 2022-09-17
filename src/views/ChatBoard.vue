<template>
  <v-app id="inspire">
    <sidebar />
    <v-main>
      
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row>
          <v-col
            v-for="card in cards"
            :key="card"
            cols="12"
          >
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="(data, index) in messages">
                  <v-list-item
                    :key="index"
                  >
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-subtitle class="message">
                        {{ data.message }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider
                    v-if="index !== 6"
                    :key="`divider-${index}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-textarea
        v-model="body"
        name="mdi-comment"
        class="mx-2"
        label="send message"
        rows="3"
        auto-grow
      ></v-textarea>
      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
        @click="submit"
      >
      Send
      </v-btn>
      <v-btn
        @click="clear"
      >
        CLEAR
      </v-btn>
    </v-main>
  </v-app>
</template>

<script>
  import firebase from '@/firebase/firebase'
  import Sidebar from '@/components/layouts/Sidebar'

  export default {
    components: {
      Sidebar
    },
    async created() {
      this.user_id = this.$route.query.user_id;

      const chatRef = firebase.firestore().collection('chats')
      const snapshot = await chatRef.get();
      snapshot.forEach(doc => {
        this.messages.push(doc.data());
      })
    },
    data: () => ({
      messages:[],
      body: '',
      user_id: '',
      cards: ['Today'],
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'Inbox', "/"],
        ['mdi-send', 'Send', "/about"],
        ['mdi-delete', 'Trash', "/about"],
        ['mdi-alert-octagon', 'Spam', "/about"],
      ],
      // invalid: false
    }),
    computed: {
      invalid() {
        if (!this.body) {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      submit() {
        this.messages.unshift({message: this.body});
        this.body = '';
      },
      clear() {
        this.body = '';
      }
    },
  }
</script>

<style scoped>
  .message {
    text-align: left;
  }
</style>