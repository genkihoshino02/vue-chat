<template>
    <v-app>
        <div class="login-box">
            <v-card class="login-form">
                <v-card-title class="login-title">SignUp</v-card-title>
                <v-card-subtitle>Input your info</v-card-subtitle>
                <v-btn text color="light-blue" to = "login">
                    Login here
                </v-btn>
                <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                >
                <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="name"
                    required
                ></v-text-field>           
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
                @click="submit"
                :disabled="isValid"
                >
                    SIGNUP
                </v-btn>
                <v-btn>
                    CLEAR
                </v-btn>

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
        name: '',
        nameRules: [
            v => !!v || 'name is required',
            v => (v && v.length <= 10) || 'name must be valid'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: [
          v => !!v || 'password is required',
        ],
        errorMessage: ''
      }),
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
            firebase.auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(async (result) => {
                console.log('success', result)
                await result.user.updateProfile(
                    {displayName: this.name}
                )

                localStorage.message = "created account successfully"

                this.$router.push('/login')

            })
            .catch(() => {
                this.errorMessage = "Failed to sign in"
            })
        }
      },
    }
  </script>

  <style scoped>
    .login-form {
        margin:150px;
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
    .error-message {
        margin-top: 20px;
    }
  </style>