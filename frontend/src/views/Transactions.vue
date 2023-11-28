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
        <th class="text-left">
          
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
        <td>
          <v-btn
          size="small" 
          type="submit"
          variant="elevated"
          @click="deleteTransaction">
            <font-awesome-icon :icon="['fas', 'trash']" style="color: #ff0000;" />
        </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
import { Transaction } from '@/interfaces/transaction.entity';
import { EnvironmentVariable } from '../../environment/environment.global'

export default {
    name: 'Transactions',
    methods: {
        getAllTransactions() : Transaction[] {
            const id = EnvironmentVariable.isClient ? EnvironmentVariable.user.id : -1;
            this.axios.get(`transaction/get/${id}`, EnvironmentVariable.host ).then((response) => { 
              console.log(response.data);
              return null; 
            });
          return []
        },
        deleteTransaction() {
          /* api delete here */
          this.getAllTransactions();
        }
    }
}
</script>
