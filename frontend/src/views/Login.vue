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
                    <i class="fa-sharp fa-solid fa-right-to-bracket"></i> Sign In
                </v-btn>
            </v-form>
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
import { EnvironmentVariable } from '../../environment/environment.global';

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
            /*
            this.axios.post('login/post', { 
                    Username: this.username,
                    Password: this.password
                }, EnvironmentVariable.host).then((response) => {
                this.loading = false;
                EnvironmentVariable.user = response;
                console.log(response.data);
            });
            */
            setTimeout(() => {                
                this.loading = false;
                EnvironmentVariable.user = {
                    username : 'Fede_99',
                    first_name : 'Federico',
                    last_name : 'Campanozzi'
                };
                EnvironmentVariable.isClient = true;
                this.$router.push({ path: '/transactions' });
            }, 1000);
        },
        required(v: any) {
            return !!v || 'Field is required'
        },
    },
}
</script>
