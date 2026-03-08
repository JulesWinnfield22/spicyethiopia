import { generateEthiopianProduct } from '~/utils/fakeProductData';
import type { Product } from '../../store/productsStore';

/**
 * Fill a product form with fake data
 * This is useful for testing the form in development
 * @param formId The ID of the form to fill
 */
export function fillProductFormWithFakeData(formId: string = 'product-form'): void {
  if (!import.meta.env.DEV) return;
  
  const fakeProduct = generateEthiopianProduct();
  
  // Get all input, select, and textarea elements in the form
  const form = document.getElementById(formId);
  if (!form) {
    console.error(`Form with ID ${formId} not found`);
    return;
  }
  
  const inputs = form.querySelectorAll('input, select, textarea');
  
  // Map of field names to values from the fake product
  const fieldMap: Record<string, any> = {
    title: fakeProduct.name,
    description: fakeProduct.description,
    price: fakeProduct.price,
    weight: fakeProduct.weight?.replace(/[a-zA-Z]/g, ''), // Remove units
    weightUnit: fakeProduct.weight?.replace(/[0-9]/g, '').toUpperCase() || 'G',
    quantity: fakeProduct.quantity,
    status: fakeProduct.status,
    // Add more mappings as needed
  };
  
  // Fill each input with the corresponding value
  inputs.forEach((input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    const name = input.getAttribute('name');
    if (!name || !(name in fieldMap)) return;
    
    const value = fieldMap[name];
    if (value === undefined || value === null) return;
    
    // Set the value based on the input type
    if (input instanceof HTMLSelectElement) {
      // For select elements, find the option with the matching value
      const option = Array.from(input.options).find(opt => opt.value === value);
      if (option) {
        input.value = value;
        // Trigger change event
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    } else {
      // For input and textarea elements
      input.value = value;
      // Trigger input event
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  
  console.log('Form filled with fake data:', fakeProduct);
}

/**
 * Add a "Fill with Test Data" button to a form
 * This is useful for testing the form in development
 * @param formId The ID of the form to add the button to
 */
export function addTestDataButton(formId: string = 'product-form'): void {
  if (!import.meta.env.DEV) return;
  
  // Wait for the DOM to be ready
  window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById(formId);
    if (!form) {
      console.error(`Form with ID ${formId} not found`);
      return;
    }
    
    // Create the button
    const button = document.createElement('button');
    button.textContent = '🧪 Fill with Test Data';
    button.className = 'px-4 py-2 bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200 transition-colors';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.zIndex = '9999';
    
    // Add click event
    button.addEventListener('click', (e) => {
      e.preventDefault();
      fillProductFormWithFakeData(formId);
    });
    
    // Add to the document
    document.body.appendChild(button);
  });
}
