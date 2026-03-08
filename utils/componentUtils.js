/**
 * Utility functions for working with Vue components
 */

/**
 * Check if a value is a Vue component
 * Works in both development and production environments
 * 
 * @param {any} value - The value to check
 * @returns {boolean} - True if the value is a Vue component
 */
export function isVueComponent(value) {
  // Check if it's an object
  if (!value || typeof value !== 'object') {
    return false;
  }
  
  // Check for common Vue component properties
  return Boolean(
    // Vue 3 component options
    value.render || 
    value.setup || 
    value.template ||
    
    // Vue component with __file property (both Vue 2 and Vue 3)
    value.__file ||
    
    // For imported .vue files
    (value.name && /\.vue$/.test(value.name)) ||
    
    // For dynamically registered components
    value.component ||
    
    // For Vue 3 defineComponent
    (value.__name && value.__hmrId) ||
    
    // For Vue 3 defineAsyncComponent
    (typeof value === 'function' && value.name === 'defineAsyncComponent')
  );
}
