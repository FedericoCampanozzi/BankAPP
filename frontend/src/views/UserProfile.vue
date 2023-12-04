<template>
    <Navigator />
    <v-sheet class="pa-12" rounded v-if="balance != undefined">
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <div>
                <p>
                    <h1>Balance</h1>
                </p> 
                <span>{{ balance }}</span> &euro;
            </div>
        </v-card>
    </v-sheet>        
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
import axios from 'axios';
import { EnvironmentVariable } from '../../environment/environment.global';
import Navigator from './components/Navigator.vue';

export default {
    data: () => ({
        firstname: EnvironmentVariable.user.first_name,
        lastname: EnvironmentVariable.user.last_name,
        email: EnvironmentVariable.user.email,
        balance: 0,
        form: false,
        loading: false,
    }),
    created() {
        this.getBalance();
    },
    methods: {
        onSubmit() {
            if (!this.form) return;
            this.loading = true;
            EnvironmentVariable.user.first_name = this.firstname,
            EnvironmentVariable.user.last_name = this.lastname,
            EnvironmentVariable.user.email = this.email,
            axios.put('user/update', { 
                User: EnvironmentVariable.user, 
                IsClient : EnvironmentVariable.isClient
            }, EnvironmentVariable.host)
            .then((response) => {
                this.loading = false;
                this.loadTransactionsComponent();
            });
        },
        required(v: any) {
            return !!v || 'Field is required'
        },
        loadTransactionsComponent() {
            import('@/views/Transactions.vue').then(module => {
                this.$router.push({ path: '/transactions' });
            }).catch(error => {
                console.error('Failed to load TransactionsComponent:', error);
            });
        }
        getBalance(){
            
        }
    },
    components: { Navigator }
}
</script>
