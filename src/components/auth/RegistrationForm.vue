<template>
  <div>
    <p>
      Please add your details to register your account. Already got a account?
      <router-link :to="{ name: 'Login' }">Click here</router-link>
      to login.
    </p>

    <form @submit.prevent="validate()" novalidate>
      {{ formError }}
      <Input
        type="email"
        label="Email"
        placeholder="e.g. niels@company.nl"
        v-model="email"
        :error="fieldErrors.email"
        v-on:blur="validateEmailAdress()"
      />

      <Input
        type="password"
        label="Password"
        placeholder="Your password"
        v-model="password"
        sublabel="Your password should be at least 6 characters long"
        :error="fieldErrors.password"
        v-on:blur="validatePassword()"
        @change="fieldErrors.password = ''"
      />

      <Button type="submit" size="lg" full-width>
        <Spinner v-if="accountSetup" />
        <span v-else> Create account</span>
      </Button>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

const fb = require("@/firebaseConfig.js");

export default {
  name: "RegistrationForm",
  components: {
    Spinner,
    Button,
    Input,
  },
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      email: "",
      password: "",
      accountSetup: false,
      formError: "",
      fieldErrors: {
        shopName: "",
        email: "",
        password: "",
      },
    };
  },
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    };
  },
  methods: {
    validatePassword() {
      if (!this.$v.password.minLength) {
        this.fieldErrors.password =
          "The password is not long enough, a minimum of 6 characters is required.";
        return false;
      }
    },

    validateEmailAdress() {
      const isEmailValid = this.$v.email.email;
      this.fieldErrors.email = !isEmailValid
        ? "This is not a valid email adress"
        : "";
    },

    validate() {
      if (this.$v.$invalid) {
        if (!this.$v.shopName.$required)
          this.fieldErrors.shopName = "Username can't be empty";
        if (!this.$v.email.$required)
          this.fieldErrors.email = "Email can't be empty";
        if (!this.$v.password.$required)
          this.fieldErrors.password = "Password can't be empty";
      } else {
        this.signUp();
      }
    },

    signUp() {
      this.accountSetup = true;

      fb.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          const { user } = response;

          if (user != null) {
            user
              .sendEmailVerification({
                url: `${process.env.VUE_APP_URL}/setup`,
                handleCodeInApp: false,
              })
              .then(() => {
                this.$emit("confirmation-email-sent");
              });
          }
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            this.error = error.message;
            this.email = "";
          } else {
            console.log(error);
          }
        });
    },
  },
};
</script>
