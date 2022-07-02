<template lang="pug">
	.b-authorization
		.__loading(
			v-if="isLoading"
		) Загрузка...
		.__content(
			v-else
		)
			span.__header {{headerText}}
			login-form-component(
				v-if="!isAuth"
			)
			button.__users(
				v-on:click="hello"
			) Say Hello
			template(
				v-if="isAuth"
			)
				span.__activate {{activatedText}}
				button.__users(
					v-on:click="getUsers"
				) Get Users
				.__users-list
					.__users-item(
						v-for="user in users"
						:key="user.email"
					) {{user.email}}
				button.__logout(
					v-on:click="logoutUser"
				) Logout
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoginForm from "@/components/blanks/LoginForm.vue";
import {Action, Getter} from "@/decorators";
import {UserCheckAuthUserAction} from "@/store/modules/user/actions";
import {UserIsAuthGetter, UserUserGetter, UserUsersGetter} from "@/store/modules/user/getters";
import axios from "axios";
import {AuthResponse} from "@/js/types/AuthResponse";
import {API_URL} from "@/js/http";

@Component({
	components: {
		'login-form-component': LoginForm
	}
})
export default class Authorization extends Vue {
	@Action('user/checkAuthUser') checkAuthUser!: UserCheckAuthUserAction
	@Action('user/logoutUser') logoutUser!: UserCheckAuthUserAction
	@Action('user/getUsers') getUsers!: UserCheckAuthUserAction
	
	@Getter('user/isAuth') isAuth!: UserIsAuthGetter
	@Getter('user/user') user!: UserUserGetter
	@Getter('user/users') users!: UserUsersGetter
	
	isLoading = false
	
	get headerText() {
		return this.isAuth
			? `Пользователь с почтой ${this.user?.email} авторизован`
			: `Авторизуйтесь`
	}
	
	get activatedText() {
		return this.user?.isActivated
			? `Аккаунт подтвержден по почте`
			: `Подтвердите аккаунт`
	}
	
	async hello() {
		try {
			const resp = await axios.get<AuthResponse>(`${API_URL}/hello`, {withCredentials: true})
			console.log(resp)
			return resp
		} catch (e) {
			console.log(e)
		}
	}
	
	async mounted() {
		this.isLoading = true
		if(localStorage.getItem('token')) {
			await this.checkAuthUser()
		}
		this.isLoading = false
	}
}
</script>