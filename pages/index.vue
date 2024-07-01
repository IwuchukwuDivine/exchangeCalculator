<template>
  <v-app class="pa-4 w-100">
    <h2 class="text-center">Exchange Rate Calculator</h2>
    <v-card class="w-100 mt-8 rounded-0 border border-thin flat pa-5">
      <v-label style="color: gray; font-weight: 500; font-size: 18px;" class="">From</v-label>
      <div class="gap-0 d-flex align-center mb-4">
          <v-select variant="underlined" flat max-width="100" bg-color="transparent"
            :items="currencies"
            v-model="fromCurrency"
          >
          </v-select>
          <v-text-field variant="underlined" bg-color="transparent" class="flex-1" v-model="amount" placeholder="Enter currency"></v-text-field>
      </div>
      <v-label style="color: gray; font-weight: 500; font-size: 18px;" class="">To</v-label>
      <div class="d-flex align-center gap-0">
          <v-select variant="underlined" flat max-width="100" bg-color="transparent"
            :items="currencies"
            v-model="toCurrency"
          >
          </v-select>
          <v-text-field variant="underlined" bg-color="transparent" v-model="convertedAmt"></v-text-field>
      </div>
    </v-card>
    <p class="mt-4 font-weight-bold" v-if="amount && convertedAmt">{{ amount }} {{ fromCurrency }} equals {{ convertedAmt }} {{ toCurrency }}</p>
    <p v-if="error" style="color: red;">{{ error }}</p>
    <v-btn :disabled="status == 'pending'" @click="getRate()" class="mt-4 font-weight-bold" size="large" color="red">{{ status == 'pending' ? 'Converting' : 'Convert' }}</v-btn>
  </v-app>
</template>

<script setup>
const fromCurrency = ref("USD")
const amount = ref(null)
const conversionRate = ref(null)
const toCurrency = ref("EUR")
const config = useRuntimeConfig()

  const currencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 
  'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY', 'RUB', 'INR', 'BRL', 'ZAR'
];
const {data, error, execute, status} = await useFetch(() => {
  return `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency.value}&to_currency=${toCurrency.value}&apikey=${config.public.alphaKey}`
} ,
{
  immediate: false,
  transform: (data) => {
    conversionRate.value = Number(data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
  }
})
const convertedAmt = computed(() => {
  if (amount.value && conversionRate.value){
    return Number(amount.value * conversionRate.value)
  }
})
function getRate(){
  if (!fromCurrency.value || !toCurrency.value || !amount.value){
    return
  }
  execute()
}
</script>

<style>

</style>