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
          Date
        </th>
        <th class="text-left">
          
        </th>
        <th class="text-left">
          Sender
        </th>
        <th class="text-left">
          Receiver
        </th>
        <th class="text-left">
          Operator
        </th>
        <th>
          
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in getAllTransactions()"
        :key="item.id"
      >
        <td>{{ item.id }}</td>
        <td>{{ formatDate(item.created_at) }}</td>
        <td>
          {{ item.nameTT }}
        </td>
        <td>{{ item.senderName }}</td>
        <td>{{ item.receiverName }}</td>
        <td>
          {{ item.bankerName }} (ID:{{ item.bankerNumber }})
        </td>
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
        },
        formatDate(d?: Date){
          return d?.toLocaleDateString();
        }
    }
}
</script>
