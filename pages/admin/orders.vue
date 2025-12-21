<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Bestellingen</h1>
        <p class="text-gray-600">Beheer bestellingen en bekijk omzet</p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <span>+</span>
        Nieuwe bestelling
      </button>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-lg shadow p-4">
        <p class="text-sm text-gray-500">Vandaag</p>
        <p class="text-2xl font-bold text-gray-900">{{ stats?.ordersToday || 0 }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-4">
        <p class="text-sm text-gray-500">In afwachting</p>
        <p class="text-2xl font-bold" :class="stats?.pendingOrders > 0 ? 'text-yellow-600' : 'text-gray-900'">
          {{ stats?.pendingOrders || 0 }}
        </p>
      </div>
      <div class="bg-white rounded-lg shadow p-4">
        <p class="text-sm text-gray-500">Omzet vandaag</p>
        <p class="text-2xl font-bold text-green-600">€{{ formatPrice(stats?.revenueToday) }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-4">
        <p class="text-sm text-gray-500">Omzet deze maand</p>
        <p class="text-2xl font-bold text-green-600">€{{ formatPrice(stats?.revenueMonth) }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="flex gap-4">
        <select
          v-model="filters.status"
          @change="fetchOrders"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="all">Alle statussen</option>
          <option value="pending">In afwachting</option>
          <option value="completed">Voltooid</option>
          <option value="cancelled">Geannuleerd</option>
        </select>
        <select
          v-model="filters.paymentType"
          @change="fetchOrders"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="all">Alle betaalwijzen</option>
          <option value="cash">Contant</option>
          <option value="invoice">Factuur</option>
        </select>
        <input
          v-model="filters.search"
          @input="debouncedSearch"
          type="text"
          placeholder="Zoeken op naam, e-mail of bestelnummer..."
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="pending" class="flex justify-center py-12">
      <svg class="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Orders table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bestelnr</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Klant</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Totaal</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Betaalwijze</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acties</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-if="orders.length === 0">
            <td colspan="8" class="px-6 py-12 text-center text-gray-500">
              Geen bestellingen gevonden
            </td>
          </tr>
          <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
              {{ order.orderNumber }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ order.customerName }}</div>
              <div v-if="order.customerEmail" class="text-sm text-gray-500">{{ order.customerEmail }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ order.totalItems }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              €{{ formatPrice(order.totalAmount) }}
              <span v-if="parseFloat(order.discount || '0') > 0" class="text-xs text-green-600 block">
                -€{{ formatPrice(order.discount) }} korting
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ order.paymentType === 'cash' ? 'Contant' : 'Factuur' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                :class="getStatusClass(order.status)"
              >
                {{ getStatusLabel(order.status) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(order.createdAt) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
              <button
                @click="openDetailModal(order)"
                class="text-blue-600 hover:text-blue-800 mr-3"
              >
                Bekijken
              </button>
              <button
                v-if="order.status === 'pending'"
                @click="completeOrder(order)"
                class="text-green-600 hover:text-green-800 mr-3"
              >
                Voltooien
              </button>
              <button
                v-if="order.status === 'pending'"
                @click="cancelOrder(order)"
                class="text-red-600 hover:text-red-800"
              >
                Annuleren
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create Order Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50" @click="showCreateModal = false"></div>
        <div class="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-white px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Nieuwe bestelling</h2>
          </div>

          <form @submit.prevent="createOrder" class="p-6 space-y-6">
            <!-- Customer info -->
            <div class="space-y-4">
              <h3 class="font-medium text-gray-900">Klantgegevens</h3>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Naam <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="createForm.customerName"
                    type="text"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <input
                    v-model="createForm.customerEmail"
                    type="email"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Telefoon</label>
                  <input
                    v-model="createForm.customerPhone"
                    type="tel"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>

            <!-- Payment type -->
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Betaalwijze</h3>
              <div class="flex gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    v-model="createForm.paymentType"
                    value="cash"
                    class="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <span>Contant</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    v-model="createForm.paymentType"
                    value="invoice"
                    class="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <span>Factuur</span>
                </label>
              </div>
            </div>

            <!-- Order items -->
            <div>
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-medium text-gray-900">Artikelen</h3>
                <button
                  type="button"
                  @click="addItem"
                  class="text-sm text-green-600 hover:text-green-800"
                >
                  + Item toevoegen
                </button>
              </div>

              <div class="space-y-4">
                <div
                  v-for="(item, index) in createForm.items"
                  :key="index"
                  class="p-4 bg-gray-50 rounded-lg"
                >
                  <div class="grid grid-cols-12 gap-3">
                    <!-- Variety selection (spans more columns) -->
                    <div class="col-span-5">
                      <label class="block text-xs font-medium text-gray-500 mb-1">Variëteit</label>
                      <select
                        v-model="item.varietyId"
                        @change="onVarietyChange(index)"
                        class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Selecteer...</option>
                        <optgroup v-for="cat in stockData?.categories" :key="cat.id" :label="cat.name">
                          <option
                            v-for="variety in getVarietiesForCategory(cat.id)"
                            :key="variety.id"
                            :value="variety.id"
                          >
                            {{ variety.name }}
                          </option>
                        </optgroup>
                      </select>
                    </div>

                    <!-- Rootstock -->
                    <div class="col-span-2">
                      <label class="block text-xs font-medium text-gray-500 mb-1">Onderstam</label>
                      <select
                        v-model="item.rootstockId"
                        @change="onRootstockChange(index)"
                        :disabled="!item.varietyId"
                        class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                      >
                        <option value="">Selecteer...</option>
                        <option
                          v-for="rs in getRootstocksForVariety(item.varietyId)"
                          :key="rs.id"
                          :value="rs.id"
                        >
                          {{ rs.name }}
                        </option>
                      </select>
                    </div>

                    <!-- Size -->
                    <div class="col-span-2">
                      <label class="block text-xs font-medium text-gray-500 mb-1">Grootte</label>
                      <select
                        v-model="item.sizeId"
                        @change="onSizeChange(index)"
                        :disabled="!item.rootstockId"
                        class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                      >
                        <option value="">Selecteer...</option>
                        <option
                          v-for="size in getSizesForItem(item.varietyId, item.rootstockId)"
                          :key="size.id"
                          :value="size.id"
                        >
                          {{ size.name }} ({{ size.stock }})
                        </option>
                      </select>
                    </div>

                    <!-- Quantity -->
                    <div class="col-span-1">
                      <label class="block text-xs font-medium text-gray-500 mb-1">Aantal</label>
                      <input
                        v-model.number="item.quantity"
                        type="number"
                        min="1"
                        :max="getMaxQuantity(item)"
                        :disabled="!item.sizeId"
                        class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
                      />
                    </div>

                    <!-- Price display -->
                    <div class="col-span-1">
                      <label class="block text-xs font-medium text-gray-500 mb-1">Prijs</label>
                      <div class="px-3 py-2 text-sm font-medium text-gray-900">
                        €{{ formatPrice(getItemPrice(item)) }}
                      </div>
                    </div>

                    <!-- Remove button -->
                    <div class="col-span-1 flex items-end">
                      <button
                        v-if="createForm.items.length > 1"
                        type="button"
                        @click="removeItem(index)"
                        class="p-2 text-red-600 hover:text-red-800"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Opmerkingen</label>
              <textarea
                v-model="createForm.notes"
                rows="2"
                class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <!-- Discount -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Korting (€)</label>
              <input
                v-model.number="createForm.discount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                class="block w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <!-- Order summary -->
            <div class="bg-green-50 rounded-lg p-4 space-y-2">
              <div class="flex justify-between items-center text-sm text-gray-600">
                <span>Subtotaal ({{ totalItems }} items)</span>
                <span>€{{ formatPrice(orderTotal) }}</span>
              </div>
              <div v-if="createForm.discount > 0" class="flex justify-between items-center text-sm text-green-600">
                <span>Korting</span>
                <span>-€{{ formatPrice(createForm.discount) }}</span>
              </div>
              <div class="flex justify-between items-center pt-2 border-t border-green-200">
                <span class="font-medium text-gray-900">Totaal</span>
                <span class="text-xl font-bold text-green-700">€{{ formatPrice(finalTotal) }}</span>
              </div>
            </div>

            <div class="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="showCreateModal = false"
                class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Annuleren
              </button>
              <button
                type="submit"
                :disabled="isSaving || !canSubmit"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isSaving ? 'Bezig...' : 'Bestelling plaatsen' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="showDetailModal && selectedOrder" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50" @click="showDetailModal = false"></div>
        <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">{{ selectedOrder.orderNumber }}</h2>
              <p class="text-sm text-gray-500">{{ formatDate(selectedOrder.createdAt) }}</p>
            </div>
            <span
              class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
              :class="getStatusClass(selectedOrder.status)"
            >
              {{ getStatusLabel(selectedOrder.status) }}
            </span>
          </div>

          <div class="p-6 space-y-6">
            <!-- Customer info -->
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Klantgegevens</h3>
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="font-medium">{{ selectedOrder.customerName }}</p>
                <p v-if="selectedOrder.customerEmail" class="text-sm text-gray-600">{{ selectedOrder.customerEmail }}</p>
                <p v-if="selectedOrder.customerPhone" class="text-sm text-gray-600">{{ selectedOrder.customerPhone }}</p>
              </div>
            </div>

            <!-- Items -->
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Artikelen</h3>
              <div class="bg-gray-50 rounded-lg overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">Product</th>
                      <th class="px-4 py-2 text-right text-xs font-medium text-gray-500">Aantal</th>
                      <th class="px-4 py-2 text-right text-xs font-medium text-gray-500">Prijs</th>
                      <th class="px-4 py-2 text-right text-xs font-medium text-gray-500">Totaal</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="item in selectedOrder.items" :key="item.id">
                      <td class="px-4 py-3">
                        <div class="font-medium text-gray-900">{{ item.varietyName }}</div>
                        <div class="text-sm text-gray-500">{{ item.rootstockName }} - {{ item.sizeName }}</div>
                      </td>
                      <td class="px-4 py-3 text-right text-gray-500">{{ item.quantity }}</td>
                      <td class="px-4 py-3 text-right text-gray-500">€{{ formatPrice(item.unitPrice) }}</td>
                      <td class="px-4 py-3 text-right font-medium text-gray-900">€{{ formatPrice(item.lineTotal) }}</td>
                    </tr>
                  </tbody>
                  <tfoot class="bg-gray-100">
                    <tr>
                      <td colspan="3" class="px-4 py-2 text-right text-sm text-gray-600">Subtotaal</td>
                      <td class="px-4 py-2 text-right text-gray-600">€{{ formatPrice(selectedOrder.subtotal) }}</td>
                    </tr>
                    <tr v-if="parseFloat(selectedOrder.discount || '0') > 0">
                      <td colspan="3" class="px-4 py-2 text-right text-sm text-green-600">Korting</td>
                      <td class="px-4 py-2 text-right text-green-600">-€{{ formatPrice(selectedOrder.discount) }}</td>
                    </tr>
                    <tr>
                      <td colspan="3" class="px-4 py-3 text-right font-medium text-gray-900">Totaal</td>
                      <td class="px-4 py-3 text-right font-bold text-gray-900">€{{ formatPrice(selectedOrder.totalAmount) }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <!-- Payment & Notes -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h3 class="font-medium text-gray-900 mb-2">Betaalwijze</h3>
                <p class="text-gray-600">{{ selectedOrder.paymentType === 'cash' ? 'Contant' : 'Factuur' }}</p>
              </div>
              <div v-if="selectedOrder.notes">
                <h3 class="font-medium text-gray-900 mb-2">Opmerkingen</h3>
                <p class="text-gray-600">{{ selectedOrder.notes }}</p>
              </div>
            </div>

            <!-- Actions -->
            <div v-if="selectedOrder.status === 'pending'" class="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                @click="cancelOrder(selectedOrder); showDetailModal = false"
                class="px-4 py-2 text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
              >
                Annuleren
              </button>
              <button
                @click="openEditModal"
                class="px-4 py-2 text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
              >
                Bewerken
              </button>
              <button
                @click="completeOrder(selectedOrder); showDetailModal = false"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Voltooien
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Order Modal -->
    <div v-if="showEditModal && selectedOrder" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50" @click="showEditModal = false"></div>
        <div class="relative bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-white px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Bestelling bewerken</h2>
            <p class="text-sm text-gray-500">{{ selectedOrder.orderNumber }}</p>
          </div>

          <form @submit.prevent="updateOrder" class="p-6 space-y-6">
            <!-- Customer info -->
            <div class="space-y-4">
              <h3 class="font-medium text-gray-900">Klantgegevens</h3>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Naam <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="editForm.customerName"
                  type="text"
                  required
                  class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <input
                    v-model="editForm.customerEmail"
                    type="email"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Telefoon</label>
                  <input
                    v-model="editForm.customerPhone"
                    type="tel"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>

            <!-- Payment type -->
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Betaalwijze</h3>
              <div class="flex gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    v-model="editForm.paymentType"
                    value="cash"
                    class="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <span>Contant</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    v-model="editForm.paymentType"
                    value="invoice"
                    class="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <span>Factuur</span>
                </label>
              </div>
            </div>

            <!-- Discount -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Korting (€)</label>
              <input
                v-model.number="editForm.discount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                class="block w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <p v-if="selectedOrder" class="mt-2 text-sm text-gray-500">
                Subtotaal: €{{ formatPrice(selectedOrder.subtotal) }} |
                Nieuw totaal: €{{ formatPrice(Math.max(0, parseFloat(selectedOrder.subtotal || '0') - (editForm.discount || 0))) }}
              </p>
            </div>

            <!-- Notes -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Opmerkingen</label>
              <textarea
                v-model="editForm.notes"
                rows="3"
                class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div class="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="showEditModal = false"
                class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Annuleren
              </button>
              <button
                type="submit"
                :disabled="isSaving"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isSaving ? 'Bezig...' : 'Opslaan' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

interface OrderItem {
  id: number
  varietyName: string
  rootstockName: string
  sizeName: string
  quantity: number
  unitPrice: string
  lineTotal: string
}

interface Order {
  id: number
  orderNumber: string
  customerName: string
  customerEmail: string | null
  customerPhone: string | null
  status: 'pending' | 'completed' | 'cancelled'
  paymentType: 'cash' | 'invoice'
  subtotal: string
  discount: string | null
  totalAmount: string
  totalItems: number
  notes: string | null
  createdAt: string
  items?: OrderItem[]
}

interface StockItem {
  id: number
  variety: { id: number; name: string }
  rootstock: { id: number; name: string }
  size: { id: number; name: string }
  stockQuantity: number
  price: string | null
  category: { id: number; name: string }
}

interface CreateFormItem {
  varietyId: number | ''
  rootstockId: number | ''
  sizeId: number | ''
  quantity: number
}

const toast = useToast()

const filters = ref({
  status: 'all',
  paymentType: 'all',
  search: ''
})

const orders = ref<Order[]>([])
const pending = ref(true)
const stats = ref<any>(null)

const showCreateModal = ref(false)
const showDetailModal = ref(false)
const showEditModal = ref(false)
const selectedOrder = ref<Order | null>(null)
const isSaving = ref(false)

const editForm = ref({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  paymentType: 'cash' as 'cash' | 'invoice',
  discount: 0,
  notes: ''
})

const createForm = ref({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  paymentType: 'cash' as 'cash' | 'invoice',
  discount: 0,
  notes: '',
  items: [{ varietyId: '' as number | '', rootstockId: '' as number | '', sizeId: '' as number | '', quantity: 1 }] as CreateFormItem[]
})

// Fetch stock data for the create form
const { data: stockData, refresh: refreshStock } = await useFetch<{ stock: StockItem[]; categories: any[]; sizes: any[] }>('/api/admin/stock')

// Initial data fetch
async function fetchOrders() {
  pending.value = true
  try {
    const params = new URLSearchParams()
    if (filters.value.status !== 'all') params.set('status', filters.value.status)
    if (filters.value.paymentType !== 'all') params.set('paymentType', filters.value.paymentType)
    if (filters.value.search) params.set('search', filters.value.search)

    const data = await $fetch<{ orders: Order[] }>(`/api/admin/orders?${params}`)
    orders.value = data.orders
  } catch (error) {
    toast.add({ title: 'Kon bestellingen niet laden', color: 'red' })
  } finally {
    pending.value = false
  }
}

async function fetchStats() {
  try {
    stats.value = await $fetch('/api/admin/orders/stats')
  } catch (error) {
    console.error('Could not load stats', error)
  }
}

// Initial fetch
await fetchOrders()
await fetchStats()

// Debounced search
let searchTimeout: NodeJS.Timeout
function debouncedSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => fetchOrders(), 300)
}

// Helpers
function formatPrice(value: string | number | undefined | null): string {
  if (!value) return '0.00'
  const num = typeof value === 'string' ? parseFloat(value) : value
  return num.toFixed(2)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'In afwachting',
    completed: 'Voltooid',
    cancelled: 'Geannuleerd'
  }
  return labels[status] || status
}

function getStatusClass(status: string): string {
  const classes: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-gray-100 text-gray-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

// Stock data helpers
function getVarietiesForCategory(categoryId: number) {
  const stock = stockData.value?.stock || []
  const varietyMap = new Map<number, { id: number; name: string }>()

  for (const item of stock) {
    if (item.category.id === categoryId && item.stockQuantity && item.stockQuantity > 0) {
      varietyMap.set(item.variety.id, item.variety)
    }
  }

  return Array.from(varietyMap.values()).sort((a, b) => a.name.localeCompare(b.name))
}

function getRootstocksForVariety(varietyId: number | '') {
  if (!varietyId) return []
  const stock = stockData.value?.stock || []
  const rootstockMap = new Map<number, { id: number; name: string }>()

  for (const item of stock) {
    if (item.variety.id === varietyId && item.stockQuantity && item.stockQuantity > 0) {
      rootstockMap.set(item.rootstock.id, item.rootstock)
    }
  }

  return Array.from(rootstockMap.values())
}

function getSizesForItem(varietyId: number | '', rootstockId: number | '') {
  if (!varietyId || !rootstockId) return []
  const stock = stockData.value?.stock || []

  return stock
    .filter(item =>
      item.variety.id === varietyId &&
      item.rootstock.id === rootstockId &&
      item.stockQuantity && item.stockQuantity > 0
    )
    .map(item => ({
      id: item.size.id,
      name: item.size.name,
      stock: item.stockQuantity
    }))
}

function getStockItem(varietyId: number | '', rootstockId: number | '', sizeId: number | ''): StockItem | undefined {
  if (!varietyId || !rootstockId || !sizeId) return undefined
  const stock = stockData.value?.stock || []
  return stock.find(item =>
    item.variety.id === varietyId &&
    item.rootstock.id === rootstockId &&
    item.size.id === sizeId
  )
}

function getMaxQuantity(item: CreateFormItem): number {
  const stockItem = getStockItem(item.varietyId, item.rootstockId, item.sizeId)
  return stockItem?.stockQuantity || 1
}

function getItemPrice(item: CreateFormItem): number {
  const stockItem = getStockItem(item.varietyId, item.rootstockId, item.sizeId)
  if (!stockItem?.price) return 0
  return parseFloat(stockItem.price) * (item.quantity || 0)
}

// Cascading select handlers
function onVarietyChange(index: number) {
  const item = createForm.value.items[index]
  if (item) {
    item.rootstockId = ''
    item.sizeId = ''
  }
}

function onRootstockChange(index: number) {
  const item = createForm.value.items[index]
  if (item) {
    item.sizeId = ''
  }
}

function onSizeChange(index: number) {
  // Reset quantity if it exceeds available stock
  const item = createForm.value.items[index]
  if (item) {
    const max = getMaxQuantity(item)
    if (item.quantity > max) {
      item.quantity = max
    }
  }
}

// Item management
function addItem() {
  createForm.value.items.push({ varietyId: '', rootstockId: '', sizeId: '', quantity: 1 })
}

function removeItem(index: number) {
  createForm.value.items.splice(index, 1)
}

// Computed
const orderTotal = computed(() => {
  return createForm.value.items.reduce((sum, item) => sum + getItemPrice(item), 0)
})

const finalTotal = computed(() => {
  return Math.max(0, orderTotal.value - (createForm.value.discount || 0))
})

const totalItems = computed(() => {
  return createForm.value.items.reduce((sum, item) => {
    if (item.varietyId && item.rootstockId && item.sizeId) {
      return sum + (item.quantity || 0)
    }
    return sum
  }, 0)
})

const canSubmit = computed(() => {
  if (!createForm.value.customerName.trim()) return false
  if (createForm.value.items.length === 0) return false

  // At least one complete item
  return createForm.value.items.some(item =>
    item.varietyId && item.rootstockId && item.sizeId && item.quantity > 0
  )
})

// Modal handlers
function openCreateModal() {
  createForm.value = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    paymentType: 'cash',
    discount: 0,
    notes: '',
    items: [{ varietyId: '', rootstockId: '', sizeId: '', quantity: 1 }]
  }
  showCreateModal.value = true
}

async function openDetailModal(order: Order) {
  try {
    const fullOrder = await $fetch<Order>(`/api/admin/orders/${order.id}`)
    selectedOrder.value = fullOrder
    showDetailModal.value = true
  } catch (error) {
    toast.add({ title: 'Kon bestelling niet laden', color: 'red' })
  }
}

// Order actions
async function createOrder() {
  if (!canSubmit.value) return

  // Build items array for API
  const items = createForm.value.items
    .filter(item => item.varietyId && item.rootstockId && item.sizeId && item.quantity > 0)
    .map(item => {
      const stockItem = getStockItem(item.varietyId, item.rootstockId, item.sizeId)
      return {
        varietyStockId: stockItem!.id,
        quantity: item.quantity
      }
    })

  isSaving.value = true
  try {
    await $fetch('/api/admin/orders', {
      method: 'POST',
      body: {
        customerName: createForm.value.customerName,
        customerEmail: createForm.value.customerEmail || undefined,
        customerPhone: createForm.value.customerPhone || undefined,
        paymentType: createForm.value.paymentType,
        discount: createForm.value.discount || 0,
        notes: createForm.value.notes || undefined,
        items
      }
    })

    toast.add({ title: 'Bestelling aangemaakt', color: 'green' })
    showCreateModal.value = false
    await fetchOrders()
    await fetchStats()
    await refreshStock()
  } catch (error: any) {
    toast.add({ title: error.data?.message || 'Kon bestelling niet aanmaken', color: 'red' })
  } finally {
    isSaving.value = false
  }
}

async function completeOrder(order: Order) {
  if (!confirm(`Weet je zeker dat je bestelling ${order.orderNumber} wilt voltooien?`)) return

  try {
    await $fetch(`/api/admin/orders/${order.id}/complete`, { method: 'POST' })
    toast.add({ title: 'Bestelling voltooid', color: 'green' })
    await fetchOrders()
    await fetchStats()
  } catch (error: any) {
    toast.add({ title: error.data?.message || 'Kon bestelling niet voltooien', color: 'red' })
  }
}

async function cancelOrder(order: Order) {
  if (!confirm(`Weet je zeker dat je bestelling ${order.orderNumber} wilt annuleren? De voorraad wordt hersteld.`)) return

  try {
    await $fetch(`/api/admin/orders/${order.id}/cancel`, { method: 'POST' })
    toast.add({ title: 'Bestelling geannuleerd en voorraad hersteld', color: 'green' })
    await fetchOrders()
    await fetchStats()
    await refreshStock()
  } catch (error: any) {
    toast.add({ title: error.data?.message || 'Kon bestelling niet annuleren', color: 'red' })
  }
}

function openEditModal() {
  if (!selectedOrder.value) return

  editForm.value = {
    customerName: selectedOrder.value.customerName,
    customerEmail: selectedOrder.value.customerEmail || '',
    customerPhone: selectedOrder.value.customerPhone || '',
    paymentType: selectedOrder.value.paymentType,
    discount: parseFloat(selectedOrder.value.discount || '0'),
    notes: selectedOrder.value.notes || ''
  }
  showDetailModal.value = false
  showEditModal.value = true
}

async function updateOrder() {
  if (!selectedOrder.value) return
  if (!editForm.value.customerName.trim()) {
    toast.add({ title: 'Klantnaam is verplicht', color: 'red' })
    return
  }

  isSaving.value = true
  try {
    const result = await $fetch<{ order: Order }>(`/api/admin/orders/${selectedOrder.value.id}`, {
      method: 'PATCH',
      body: {
        customerName: editForm.value.customerName,
        customerEmail: editForm.value.customerEmail || undefined,
        customerPhone: editForm.value.customerPhone || undefined,
        paymentType: editForm.value.paymentType,
        discount: editForm.value.discount || 0,
        notes: editForm.value.notes || undefined
      }
    })

    toast.add({ title: 'Bestelling bijgewerkt', color: 'green' })
    showEditModal.value = false
    selectedOrder.value = result.order
    await fetchOrders()
    await fetchStats()
  } catch (error: any) {
    toast.add({ title: error.data?.message || 'Kon bestelling niet bijwerken', color: 'red' })
  } finally {
    isSaving.value = false
  }
}
</script>
