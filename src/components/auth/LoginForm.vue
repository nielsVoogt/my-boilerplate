<template>
  <div>
    <AuthPanel v-if="!requestEmailValidation">
      <p>
        Use your credentials to log in or
        <router-link :to="{ name: 'Registration' }">click here</router-link>
        to create a new account!
      </p>

      <form @submit.prevent="validate()" novalidate>
        <small v-if="error">{{ error }}</small>
        <Input
          type="email"
          label="Email"
          placeholder="e.g. niels@company.nl"
          v-model:modelValue="email"
          :error="fieldErrors.email"
          @blur="validateEmailAdress()"
          @change="fieldErrors.email = ''"
        />

        <Input
          type="password"
          label="Password"
          placeholder="Your password"
          v-model:modelValue="password"
          :error="fieldErrors.password"
          @change="fieldErrors.password = ''"
        />

        <Button type="submit" size="lg" full-width>
          Login
        </Button>
      </form>

      <template v-slot:link>
        <router-link :to="{ name: 'ResetPassword' }">
          {{ $t("auth.forgotYourPassword") }}
        </router-link>
      </template>
    </AuthPanel>
    <AuthPanel v-else class="request-email-validation">
      <h2>You haven't validated your email yet</h2>
      <p>
        We've sent you a email that contains a link to confirm your email
        adress. You need to confirm your email adress to be able to log in
      </p>
      <Button size="lg" full-width @click="requestEmailValidation = false">
        Back to login
      </Button>
    </AuthPanel>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

import AuthPanel from "@/components/ui/AuthPanel";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default {
  name: "LoginForm",
  components: {
    Button,
    Input,
    AuthPanel,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
      formError: false,
      requestEmailValidation: false,
      fieldErrors: {
        email: "",
        password: "",
      },
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    ...mapActions(["logInAction"]),

    validateEmailAdress() {
      if (this.email !== "") {
        this.fieldErrors.email = this.v$.email.$invalid
          ? this.$t("auth.errors.invalidEmail")
          : "";
      }
    },

    validate() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        this.fieldErrors.email =
          this.email === "" ? this.$t("auth.errors.emptyEmail") : "";
        this.fieldErrors.password =
          this.password === "" ? this.$t("auth.errors.emptyPassword") : "";
        return;
      }
      this.login();
    },

    login() {
      this.logInAction({ email: this.email, password: this.password })
        .then(() => {
          this.$router.push({ name: "Reservations" });
        })
        .catch((error) => {
          // If there's a error we know this a resonse from firebase,
          // if not we are throwing the error itself, in this case
          // meaning the user has a unverified emailAdress.
          if (error) {
            this.formError = this.$t("auth.errors.emptyPassword");
            this.email = "";
            this.password = "";
          } else {
            this.requestEmailValidation = true;
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.request-email-validation {
  text-align: center;
  h2 {
    font-weight: 700;
    font-size: 1.25rem;
    margin-bottom: 1em;
  }

  p {
    margin-bottom: 2em;
  }
}
</style>
