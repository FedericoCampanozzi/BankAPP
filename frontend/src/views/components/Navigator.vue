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
    <div class="btn-tabs" style="margin-left: 5px;" v-if="!isClient && isClient != undefined">
      <font-awesome-icon :icon="'building-columns'" style="color: #000000;" size="2xl" />
    </div>
    <div style="float: right; display: inline-block;">
      <div v-for="tab in Tabs" class="btn-tabs">
        <router-link :to=tab.pagePath v-if="isEnabled(tab.pageName)">
          <v-btn size="small" type="submit" variant="elevated">
            <font-awesome-icon :icon=tab.icon style="color: #000000;" />
            <span style="padding-left: 5px;">{{ tab.label }}</span>
          </v-btn>
        </router-link>
      </div>
      <div class="btn-tabs">
        <router-link to="/" v-if="isEnabled('Login')">
          <v-btn size="small" type="submit" variant="elevated" @click="logout">
          <font-awesome-icon :icon="'right-from-bracket'" style="color: #000000;" />
          <span style="padding-left: 5px;">Log Out</span>
        </v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { EnvironmentVariable } from '../../../environment/environment.global';
export default {
  data: () => ({
    isClient: EnvironmentVariable.isClient,
    Tabs: [{
      pagePath: '/transactions',
      pageName: 'Transactions',
      label: 'Transactions',
      icon: 'coins'
    }, {
      pagePath: '/addtransaction',
      pageName: 'AddTransaction',
      label: 'New Payment',
      icon: 'wallet'
    }, {
      pagePath: '/profile',
      pageName: 'Profile',
      label: 'Profile',
      icon: 'user-pen'
    }]
  }),
  methods: {
    isEnabled(pageName: string) {
      return this.$route.name != "Login" && this.$route.name != "Default" && this.$route.name != pageName;
    },
    logout() {
      EnvironmentVariable.isClient = undefined;
      EnvironmentVariable.user = undefined;
    },
    getCurrentRoute() {
      return this.$route.name;
    },
    getCurrentUser() {
      return EnvironmentVariable.user
    }
  }
}
</script>