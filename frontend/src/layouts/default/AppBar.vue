<template>
  <div class="app-banner-container">
    <span class="card-title">Bank APP</span>
    <div style="margin: 0 20px; display: inline-block !important;">
      {{ getCurrentRoute() }} Page
    </div>
    <div class="btn-tabs">
      <span>
        {{ getCurrentUser() == undefined ? '' : getCurrentUser().username }}
      </span>
    </div>
    <div class="btn-tabs">
      <span>
        {{ getCurrentUser() == undefined ? '' : getCurrentUser().first_name }}
      </span>
    </div>
    <div class="btn-tabs">
      <span>
        {{ getCurrentUser() == undefined ? '' : getCurrentUser().last_name }}
      </span>
    </div>
    <div style="float: right; display: inline-block;">
      <div v-for="tab in Tabs" class="btn-tabs">
        <v-btn
          size="small" 
          type="submit"
          variant="elevated"
          @click="goToPage(tab.pagePath)"
          v-if="isEnabled(tab.pageName)">
            {{ tab.label }}
        </v-btn>
      </div>
      <div class="btn-tabs">
        <v-btn
          size="small" 
          type="submit"
          variant="elevated"
          @click="logout"
          v-if="isEnabled('Login')">
            Log Out
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { EnvironmentVariable } from '../../../environment/environment.global';
export default {
  name:'AppBar',
  data: () => ({
    Tabs: [{
      pagePath: '/transactions',
      pageName: 'Transactions',
      label: 'Transactions'
    },{
      pagePath: '/addtransaction',
      pageName: 'AddTransaction',
      label: 'New Payment'
    },{
      pagePath: '/profile',
      pageName: 'Profile',
      label: 'Profile'
    }]
  }),
  methods:{
    goToPage(pagePath: string){
      this.$router.push({ path: pagePath });
    },
    isEnabled(pageName: string){
      return this.$route.name != "Login" && this.$route.name != pageName;
    },
    logout(){
      EnvironmentVariable.isClient = undefined;
      EnvironmentVariable.user = undefined;
      this.$router.push({ path: '/' });
    },
    getCurrentRoute(){
      return this.$route.name;
    },
    getCurrentUser(){
      return EnvironmentVariable.user
    }
  }
}
</script>
