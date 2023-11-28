<template>
    <v-sheet class="pa-12" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <p class="card-title">
                    Add new Transaction
                </p>
                <hr>
                <v-select
                    clearable
                    label="Tipo Transazione"
                    :items="getAllTransactionType()"
                    variant="outlined"
                    item-title="name"
                    v-on:change="setUpSelects" />
                
                <v-select
                    clearable
                    label="Cliente"
                    :items="getAllClients()"
                    variant="outlined" />
                
                <v-select
                    clearable
                    label="Ricevente"
                    :items="getAllClients()"
                    variant="outlined" />
                
                <v-text-field 
                    v-model="password"
                    type="number"
                    step="0.1"
                    :readonly="loading" 
                    :rules="[required_mm]" 
                    label="Money" />
                
                <v-btn 
                    :disabled="!form" 
                    :loading="loading" 
                    block 
                    color="success" 
                    size="large" 
                    type="submit"
                    variant="elevated">
                        Pay
                </v-btn>
            </v-form>
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
import { TransactionType } from '@/interfaces/transactionType.entity';
import { EnvironmentVariable } from '../../environment/environment.global';
import { Client } from '@/interfaces/client.entity';
export default {
    data: () => ({
        username: null,
        password: null,
        form: false,
        loading: false,
        user: EnvironmentVariable.user
    }),
    methods: {
        onSubmit() {
            if (!this.form) return;
            this.loading = true;
            /*this.axios.post('login/post', { 
                    username: this.username,
                    password: this.password
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
        required_mm(v: any) {
            if(! v) return !! v || 'Field is required'
            const n = parseFloat(v);
            return n > 0 || 'Insert positive number'
        },
        getAllTransactionType() : TransactionType[] {
            this.axios.get('transaction-type/get/all', EnvironmentVariable.host ).then((response) => { return response.data; });
            return [];
        },
        getAllClients() : Client[] {
            this.axios.get('client/get/all', EnvironmentVariable.host ).then((response) => { return response.data; });
            return [];
        },
        setUpSelects() {
          
        }
    },
}
</script>
