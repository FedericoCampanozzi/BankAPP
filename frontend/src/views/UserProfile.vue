<template>
    <v-sheet class="pa-12" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field v-model="firstname" :readonly="loading" :rules="[required]" class="mb-2" clearable
                    label="First Name"></v-text-field>
                <v-text-field v-model="lastname" :readonly="loading" :rules="[required]" class="mb-2" clearable
                    label="Last Name"></v-text-field>
                <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable 
                    label="Email"></v-text-field>
                <br>
                <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit"
                    variant="elevated">
                    Save
                </v-btn>
            </v-form>
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
import { EnvironmentVariable } from '../../environment/environment.global';
export default {
    data: () => ({
        firstname: EnvironmentVariable.user.first_name,
        lastname: EnvironmentVariable.user.last_name,
        email: EnvironmentVariable.user.email,
        form: false,
        loading: false,
    }),
    methods: {
        onSubmit() {
            if (!this.form) return;
            this.loading = true;
            /*
            this.axios.post('login/post', { 
                    //username: this.email,
                    //password: this.password
                }, EnvironmentVariable.host).then((response) => {
                this.loading = false;
                console.log(response.data);
            });
            */           
            setTimeout(() => {
                this.loading = false;
                this.$router.push({ path: '/transactions' });
            }, 1000);
        },
        required(v: any) {
            return !!v || 'Field is required'
        },
    },
}
</script>
