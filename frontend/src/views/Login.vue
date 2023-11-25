<template>
    <v-sheet class="pa-12" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field v-model="username" :readonly="loading" :rules="[required]" class="mb-2" clearable
                    label="Username"></v-text-field>
                <v-text-field v-model="password" type="password" :readonly="loading" :rules="[required]" clearable label="Password"
                    placeholder="Enter your password"></v-text-field>
                <br>
                <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit"
                    variant="elevated">
                    Sign In
                </v-btn>
            </v-form>
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
import { hostConfig } from '../../eviroment/environment.global';
export default {
    data: () => ({
        username: null,
        password: null,
        form: false,
        loading: false,
    }),
    methods: {
        onSubmit() {
            if (!this.form) return;
            this.loading = true;
            this.axios.post('login/post', { 
                    username: this.username,
                    password: this.password
                }, hostConfig).then((response) => {
                this.loading = false;
                console.log(response.data);
            });
        },
        required(v: any) {
            return !!v || 'Field is required'
        },
    },
}
</script>
