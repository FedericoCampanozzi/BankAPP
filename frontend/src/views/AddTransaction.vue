<template>
    <v-sheet class="pa-12" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-select
                    clearable
                    label="Tipo Transazione"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    variant="outlined"
                    ></v-select>

                    <v-select
                    clearable
                    label="Cliente"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    variant="outlined"
                    ></v-select>

                    <v-select
                    clearable
                    label="Ricevente"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    variant="outlined"
                    ></v-select>

                    <v-select
                    clearable
                    label="Select"
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    variant="outlined"
                    ></v-select>

                        <v-text-field v-model="password" type="number" :readonly="loading" :rules="[required_mm]"
                        label="Money"></v-text-field>

                        <v-select
                        clearable
                        label="Banker"
                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                        variant="outlined"
                        ></v-select>
                <br>
                <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit"
                    variant="elevated">
                    Pay
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
        required_mm(v: any) {
            if(! v) return !! v || 'Field is required'
            const n = parseFloat(v);
            return n > 0 || 'Insert positive number'
        },
    },
}
</script>
