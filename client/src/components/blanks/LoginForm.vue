<template lang="pug">
	.b-login-form
		p.__header Admin panel
		.__field
			span.__label Email Address
			input.__input(
				v-model="emailInput"
				type="text"
				autocomplete="off"
			)
		.__field
			span.__label Password
			input.__input(
				v-model="passwordInput"
				type="password"
				autocomplete="off"
			)
		.__footer
			button.__button(
				v-on:click="login"
			) Sign in
			button.__button(
				v-on:click="registration"
			) Registration
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Action} from "@/decorators";
import {UserLoginUserAction, UserRegistrationUserAction} from "@/store/modules/user/actions";

@Component
export default class LoginForm extends Vue {
	@Action('user/loginUser') loginUser!: UserLoginUserAction
	@Action('user/registrationUser') registrationUser!: UserRegistrationUserAction
	
	emailInput = ''
	passwordInput = ''
	
	async login() {
		await this.loginUser({
			email: this.emailInput,
			password: this.passwordInput
		})
	}
	
	async registration() {
		await this.registrationUser({
			email: this.emailInput,
			password: this.passwordInput
		})
	}
}
</script>