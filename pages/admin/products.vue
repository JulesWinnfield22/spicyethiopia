<script lang="ts" setup>
import Button from "~/components/Button.vue";
import ProductStatusCell from "~/components/ProductStatusCell.vue";
import Table from "~/components/Table.vue";
import { ref } from "vue";
import Dropdown from "~/components/Dropdown.vue";
import DropdownParent from "~/composables/DropdownParent.vue";
import icons from "~/utils/icons";
import { openModal } from "@customizer/modal-x";
import { useProductsStore } from "~/features/admin/store/productsStore";
import SearchInput from "~/features/admin/components/SearchInput.vue";
import type { Product } from "~/features/admin/store/productsStore";
import { usePagination } from "~/composables/usePagination";
import { getProducts } from "~/features/admin/api/productApi";
import ProductImageCell from "~/features/admin/product/components/ProductImageCell.vue";
import ProductDataProvider from "~/features/public/components/ProductDataProvider.vue";
import Search from "~/components/Search.vue";

const searchQuery = ref("");
const activeFilter = ref("Available");

const PRODUCT_STATUS = ["Available", "Out of Stock", "Hidden", "All"];
</script>

<template>
  <Teleport to="#admin-actions" defer>
    <div class="flex gap-2">
      <Button @click="$router.push('/admin/addProduct')" type="secondary">
        Add Product
      </Button>
    </div>
  </Teleport>
  <ProductDataProvider v-slot="{ products, search, pending }">
    <div class="flex justify-between items-center">
      <div class="flex gap-2.5">
        <Button
          :type="activeFilter == f ? 'secondary' : 'edge'"
          v-for="f in PRODUCT_STATUS"
          :key="f"
          @click="activeFilter = f"
        >
          {{ f }}
        </Button>
      </div>
      <Search v-model="search.value" />
    </div>
    <Table
      :pending="pending.value"
      :headers="{
        head: [
          'Product Image',
          'Product ID',
          'Product Name',
          'Description',
          'Stock',
          'Weight',
          'Price',
          'Status',
          'Actions',
        ],
        row: [
          'images',
          'id',
          'title',
          'description',
          'quantity',
          'weight',
          'price',
          'status',
        ],
      }"
      :rows="products"
      :cells="{
        images: ProductImageCell,
        weight: (weight: string, row: Product) => `${weight}${row.weightUnit}`,
        status: ProductStatusCell,
        quantity: (_: any, row: Product) => `${row.quantity} Items`,
        price: (_: any, row: Product) => `${row?.discountedPrice || row.price}`,
        description: (_: any, row: Product) =>
          row.description.substring(0, 50) + '...',
      }"
    >
      <template #actions="{ row }">
        <Dropdown position="right-bottom" v-slot="{ open, toggle }">
          <button class="flex items-center gap-1" @click="() => toggle()">
            More
            <span>
              <i
                :class="
                  open ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'
                "
              ></i>
            </span>
          </button>
          <DropdownParent
            :items="[
              {
                name:
                  row.discountPercentage > 0
                    ? 'Remove Discount'
                    : 'Add Product Discount',
                icon: icons.discount,
                action: () =>
                  openModal(
                    row.discountPercentage > 0
                      ? 'RemoveProductDiscount'
                      : 'AddProductDiscount',
                    row,
                  ),
              },
              {
                name: 'Edit',
                icon: icons.brush,
                action: () => $router.push('/admin/product/edit/' + row.id),
              },
              {
                name:
                  row.status === 'Hidden' ? 'Make Available' : 'Hide from Shop',
                icon: row.status === 'Hidden' ? icons.eye : icons.eye_slash,
              },
              {
                name:
                  row.status === 'Out of Stock'
                    ? 'Make Available'
                    : 'Out of Stock',
                icon: icons.empty,
              },
              {
                icon: icons.trash1,
                name: 'Delete Product',
              },
            ]"
          />
        </Dropdown>
      </template>
    </Table>
  </ProductDataProvider>
</template>
