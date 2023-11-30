<template>
    <v-sheet class="pa-12" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <div v-if="userNotFound" class="error-title py-4">
                User Not Found
            </div>
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field 
                    v-model="username" 
                    :readonly="loading" 
                    :rules="[required]" 
                    class="mb-2" 
                    clearable
                    label="Username" />
                <v-text-field 
                    v-model="password" 
                    type="password" 
                    :readonly="loading" 
                    :rules="[required]" 
                    clearable 
                    label="Password"/>
                <br>
                <v-btn
                    :disabled="!form" 
                    :loading="loading" 
                    block 
                    color="success"
                    size="large"
                    type="submit"
                    variant="elevated">
                        <font-awesome-icon :icon="'right-to-bracket'" style="color: #025f2c;" /> 
                        <span style="padding-left: 20px;">Sign In</span>
                </v-btn>
            </v-form>
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
import { EnvironmentVariable } from '../../environment/environment.global';
import axios from 'axios';

export default {
    data: () => ({
        username: null,
        password: null,
        form: false,
        loading: false,
        userNotFound: false
    }),
    methods: {
        onSubmit() {
            if (!this.form) return;
            this.loading = true;            
            axios.post('login/post', { 
                    Username: this.username,
                    Password: this.password
                }, EnvironmentVariable.host)
                .then((response) => {
                    this.loading = false;

                    const role = response.data['role'];
                    let user = undefined;
                    this.userNotFound = role == "NotFound";

                    if(role == "Client")        user = response.data['ifClient'];
                    else if(role == "Banker")   user = response.data['ifBanker'];
                    console.log("user = ", user);
                    console.log("role = ", role);

                    this.username = null;
                    this.password = null;

                    if(!this.userNotFound) {
                        EnvironmentVariable.user = user
                        EnvironmentVariable.isClient = role == "Client";
                        this.loadTransactionsComponent();
                    }
                }
            );
        },
        required(v: any) {
            this.userNotFound = false;
            return !!v || 'Field is required'
        },
        loadTransactionsComponent() {
            import('@/views/Transactions.vue').then(module => {
                this.$router.push({ path: '/transactions' });
            }).catch(error => {
                console.error('Failed to load TransactionsComponent:', error);
            });
        }
    },
}
</script>
