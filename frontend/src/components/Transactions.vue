<template>
    <v-table
    fixed-header
    height="300px"
  >
    <thead>
      <tr>
        <th class="text-left">
          ID
        </th>
        <th class="text-left">
          Amount
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in getAllTransactions()"
        :key="item.id"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.amount }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
import { Transaction } from "../interfaces/Transaction"
export default {
    name: 'Transactions',/*
    data() {
        return {
          transactions: Transaction
        }
    },
    created() {
        this.getAllTransactions();
    },*/
    methods: {
        getAllTransactions() : Transaction[] {
            this.axios.get('transaction/get', {
              baseURL: 'http://localhost:8080/api/'
            })
                .then((response) => {
                    return response.data;
                });
                return []
        }
    }
}
</script>
