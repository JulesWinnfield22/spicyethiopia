<template>
  <div class="space-y-4">
    <div class="flex justify-between">
      <div>
        <label class="text-sm">Lock</label>
        <select class="ml-2 p-1 border rounded text-sm">
          <option>All</option>
          <option>Manual</option>
          <option>Automatic</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search..."
        class="p-2 border rounded text-sm w-1/3"
      />
    </div>

    <table class="w-full text-sm border mt-4">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2">ID</th>
          <th class="px-4 py-2">Owner</th>
          <th class="px-4 py-2">Lock</th>
          <th class="px-4 py-2">Type</th>
          <th class="px-4 py-2">Users</th>
          <th class="px-4 py-2">Date</th>
          <th class="px-4 py-2">State</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id" class="text-center">
          <td class="px-4 py-2">{{ order.id }}</td>
          <td class="px-4 py-2">{{ order.owner }}</td>
          <td class="px-4 py-2">{{ order.lock }}</td>
          <td class="px-4 py-2">{{ order.type }}</td>
          <td class="px-4 py-2">{{ order.user }}</td>
          <td class="px-4 py-2">{{ order.date }}</td>
          <td class="px-4 py-2">
            <span :class="order.state === 'Active' ? 'text-green-600' : 'text-gray-400'">
              {{ order.state }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        { id: 12345, owner: 'Leia Madhuart', lock: 'Manual', type: 'Laptop', user: '👤 001', date: '21/09/23', state: 'Active' },
        { id: 97531, owner: 'Cecil White', lock: 'Automatic', type: 'Router', user: '👤 008', date: '10/03/2023', state: 'Inactive' },
        { id: 54321, owner: 'Terence Kosep', lock: 'Automatic', type: 'Desktop', user: '👤 002', date: '22/02/2024', state: 'Inactive' },
        { id: 67890, owner: 'Erin Freest', lock: 'Manual', type: 'Printer', user: '👤 003', date: '23/11/23', state: 'Active' },
      ],
    };
  },
};
</script>
