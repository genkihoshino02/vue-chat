<template>
    <v-app>
        <div class="login-box">
            <v-card class="login-form">
                <v-card-title class="login-title">Login</v-card-title>
                <v-card-subtitle>Input your info</v-card-subtitle>
                <v-btn text color="light-blue" to = "signup">
                    Sign up here
                </v-btn>
                
                <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                >
            
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    type="password"
                    label="password"
                >
                </v-text-field>
            
                <v-btn
                color="success"
                class="login-btn"
                :disabled="isValid"
                @click="submit"
                >
                    LOGIN
                </v-btn>
                <v-btn>
                    CLEAR
                </v-btn>

                <v-alert
                    dense
                    type = "success"
                    class="success-message"
                    v-if="message"
                >
                    {{message}}
                </v-alert>

                <v-alert
                    dense
                    outlined
                    type="error"
                    v-if="errorMessage"
                    class="error-message"
                >
                    {{errorMessage}}
                </v-alert>
            </v-form>
            </v-card>
        </div>
    </v-app>
  </template>
  
  <script>
    import firebase from '@/firebase/firebase'

    export default {
      data: () => ({
        valid: true,
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: [
          v => !!v || 'password is required',
        ],
        message: "",
        errorMessage:""
      }),
      mounted() {
        if(localStorage.message) {
            this.message = localStorage.message
            localStorage.message = ''
        }
      },
      computed: {
        isValid() {
            return !this.valid;
        }
      },
      methods: {
        validate () {
          this.$refs.form.validate()
        },
        reset () {
          this.$refs.form.reset()
        },
        resetValidation () {
          this.$refs.form.resetValidation()
        },
        submit() {
            console.log('submit call')
            firebase.auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then((result) => {
                    console.log(result)

                    const auth = {
                        displayName: result.user.displayName,
                        email: result.user.email,
                        uid: result.user.uid,
                        refreshToken: result.user.refreshToken,
                        photoUrl: result.user.photoUrl
                    }

                    sessionStorage.setItem('user', JSON.stringify(auth))

                    this.$router.push('/')
                })
                .catch(() => {
                    this.errorMessage = 'failed to login'
                })
        }
      },
    }
  </script>

  <style scoped>
    .login-form {
        margin:120px;
        padding:60px;
        width: 80%;
    }
    .login-box {
        margin: 0px auto;
    }
    .login-title {
        display: inline-block;
    }
    .login-btn {
        margin-right: 20px;
    }
    .success-message {
        margin-top: 20px;
    }
    .error-message {
        margin-top: 20px;
    }
  </style>