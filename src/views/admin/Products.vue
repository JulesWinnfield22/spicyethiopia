<script lang="ts" setup>
import AdminDefaultPageWrapper from "@/components/AdminDefaultPageWrapper.vue";
import Button from "@/components/Button.vue";
import ProductStatusCell from "@/components/ProductStatusCell.vue";
import Table from "@/components/Table.vue";
import { ref } from "vue";
import Dropdown from "@/components/Dropdown.vue";
import DropdownParent from "@/composables/DropdownParent.vue";
import icons from "@/utils/icons";
import { openModal } from "@customizer/modal-x";
import { useProductsStore } from "@/features/admin/store/productsStore";
import SearchInput from "@/features/admin/components/SearchInput.vue";
import { toast } from "@/utils/utils";
import type { Product } from "@/features/admin/store/productsStore";
import { usePagination } from "@/composables/usePagination";
import { getProducts } from "@/features/admin/api/productApi";
import ProductImageCell from "@/features/admin/product/components/ProductImageCell.vue";

const searchQuery = ref("");
const activeFilter = ref("Available");

const PRODUCT_STATUS = ["Available", "Out of Stock", "Hidden", "All"];

// Initialize the products store
const productsStore = useProductsStore();

const pagination = usePagination({
  store: productsStore,
  cb: getProducts,
});
</script>

<template>
  <AdminDefaultPageWrapper>
    <template #actions>
      <div class="flex gap-2">
        <Button @click="$router.push('/admin/addProduct')" type="secondary">
          Add Product
        </Button>
      </div>
    </template>
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
      <SearchInput
        v-model="pagination.search.value"
        placeholder="Search Products"
        width="w-96"
      />
    </div>
    <Table
      :pending="pagination.pending.value"
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
          'stock',
          'weight',
          'price',
          'status',
        ],
      }"
      :data="productsStore.products"
      :cells="{
        images: ProductImageCell,
        weight: (weight: string, row: Product) => `${weight}${row.weightUnit}`,
        status: ProductStatusCell,
        stock: (_: any, row: Product) => `${row.quantity} Items`,
        price: (_: any, row: Product) => `${row.price}`,
        description: (_: any, row: Product) => row.description.substring(0, 50) + '...',
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
              },
              {
                name: 'Delete Product',
              },
            ]"
          />
        </Dropdown>
      </template>
    </Table>
  </AdminDefaultPageWrapper>
</template>
