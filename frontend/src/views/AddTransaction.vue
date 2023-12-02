<template>
    <Navigator />
    <v-sheet class="pa-12" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <p class="card-title">
                    Add new Transaction
                </p>
                <hr>
                <v-select
                    label="Tipo Transazione"
                    :items="transactionTypes"
                    variant="outlined"
                    item-title="TransactionType_name"
                    item-value="TransactionType_id"
                    v-model="sel_tt_id"
                    :rules="[required]" />
                
                <v-select
                    label="Cliente"
                    :items="clients"
                    item-title="Client_username"
                    item-value="Client_id"
                    v-model="sel_sender_id"
                    :rules="[required]" 
                    variant="outlined" />
                
                <v-select
                    clearable
                    label="Ricevente"
                    :items="clients"
                    item-title="Client_username"
                    item-value="Client_id"
                    v-if="show_receiver"
                    v-model="sel_receiver_id"
                    :rules="[required]" 
                    variant="outlined" />
                
                <v-text-field
                    v-model="amount"
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
import Navigator from './components/Navigator.vue';
import api from '../../environment/axios.global';

export default {
    data(): {
        sel_tt_id: number,
        sel_sender_id: number,
        sel_receiver_id: number,
        show_receiver: boolean,
        amount: number,
        loading: boolean,
        form: boolean,
        clients: Client[] ,
        transactionTypes: TransactionType[] 
    } {
      return {
            sel_tt_id: 1,
            sel_sender_id: 1,
            sel_receiver_id: 2,
            show_receiver: false,
            amount: 0,
            loading: false,
            form: false,
            clients: [],
            transactionTypes: []
        };
    },
    created() {
      this.getAllClients();
      this.getAllTransactionType();
    },
    watch:{
        sel_tt_id(newValue, oldValue){
            this.show_receiver = this.sel_tt_id == 3;
        },
        sel_receiver_id(newValue, oldValue){
            if(newValue == this.sel_sender_id){
                this.sel_receiver_id = oldValue;
            } 
        }
    },
    methods: {
        async onSubmit() {
            if (!this.form) return;
            this.loading = true;
            await api.post('transaction/post', {
                TransactionTypeID : this.sel_tt_id,
                Sender : this.sel_sender_id,
                Receiver : this.sel_receiver_id,
                Banker : EnvironmentVariable.user.id,
                Amount: this.amount,
                Role : EnvironmentVariable.role
            });
            this.loading = false;
            this.$router.push({ path: '/transactions' });
        },
        required(v: any) {
            return !!v || 'Field is required'
        },
        required_mm(v: any) {
            if(! v) return !! v || 'Field is required'
            const n = parseFloat(v);
            return n > 0 || 'Insert positive number'
        },
        async getAllTransactionType() {
            const response = await api.get('transaction-type/get/all');
            console.log("transactionTypes = ", response.data['transactionTypes']);
            this.transactionTypes = response.data['transactionTypes'];
        },
        async getAllClients() {
            const response = await api.get('client/get/all');
            console.log("clients = ", response.data['clients']);
            this.clients = response.data['clients'];
        }
    },
    components: { Navigator }
}
</script>
