<template>
  <Navigator />
  <v-table fixed-header height="300px" style="padding: 20px;">
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
        <th class="text-left">
          Amount
        </th>
        <th class="text-left">

        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in transactions" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ formatDate(item.created_at) }}</td>
        <td>
          <div v-if="item.tt_id == 1"><font-awesome-icon :icon="'down-long'" style="color: #03e76a;" /></div>
          <div v-if="item.tt_id == 2"><font-awesome-icon :icon="'up-long'" style="color: #8d6205;" /></div>
          <div v-if="item.tt_id == 3"><font-awesome-icon :icon="'arrows-rotate'" style="color: #e70303;" /></div>
        </td>
        <td>{{ item.sender }}</td>
        <td>{{ item.receiver }}</td>
        <td>
          <div v-if="item.banker != null">
            {{ item.banker }} (ID:{{ item.banker_employee_number }})
          </div>
        </td>
        <td>{{ item.amount }} &euro;</td>
        <td>
          <v-btn size="small" type="submit" variant="elevated" @click="deleteTransaction(item.id)">
            <font-awesome-icon :icon="'trash'" style="color: #e70303;" size="lg" />
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
import Navigator from './components/Navigator.vue';
import { Transaction } from '@/interfaces/transaction.entity';
import { EnvironmentVariable } from '../../environment/environment.global'
import axios from 'axios';

export default {
  name: 'Transactions',
  data(): { transactions: Transaction[] } {
    return {
      transactions: [],
    };
  },
  created() {
    this.getAllTransactions();
  },
  methods: {
    getAllTransactions() {
      const id = EnvironmentVariable.isClient ? EnvironmentVariable.user.id : -1;
      this.axios.get(`transaction/get/${id}`, EnvironmentVariable.host).then((response) => {
        console.log("transactions = ", response.data['transactions']);
        this.transactions = response.data['transactions'];
      });
    },
    deleteTransaction(id: number | undefined) {
      if (id != undefined) {
        axios.post(`transaction/delete`, { IdTransaction: id }, EnvironmentVariable.host)
          .then((response) => {
            console.log(`Removed transaction with id = ${id}`);
            this.getAllTransactions();
          });
      }
    },
    formatDate(d?: Date) {
      if (d == undefined || d == null) return "No Data";
      return new Date(d).toLocaleDateString();
    }
  },
  components: { Navigator }
}
</script>