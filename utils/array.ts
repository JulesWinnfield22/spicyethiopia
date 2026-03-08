/**
 * Groups an array of objects by a specified key or key selector function
 * 
 * @param array The array to group
 * @param keySelector A string key or function that returns the grouping key for each item
 * @returns An object where keys are the group values and values are arrays of items in that group
 * 
 * @example
 * // Group an array of users by their role
 * const usersByRole = groupBy(users, 'role');
 * 
 * @example
 * // Group products by price range using a function
 * const productsByPriceRange = groupBy(products, (product) => {
 *   if (product.price < 50) return 'budget';
 *   if (product.price < 100) return 'mid-range';
 *   return 'premium';
 * });
 */
export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  keySelector: ((item: T) => K) | keyof T
): Record<string, T[]> {
  return array.reduce((result: Record<string, T[]>, currentItem: T) => {
    // Determine the key for grouping
    const key = typeof keySelector === 'function'
      ? (keySelector as (item: T) => K)(currentItem)
      : String(currentItem[keySelector as keyof T]);
    
    // If this key doesn't exist in our result yet, create a new array
    if (!result[key as string]) {
      result[key as string] = [];
    }
    
    // Add the current item to the appropriate group
    result[key as string].push(currentItem);
    
    return result;
  }, {});
}

/**
 * Groups an array of objects by a specified key and returns an array of groups
 * with a specified structure
 * 
 * @param array The array to group
 * @param keySelector A string key or function that returns the grouping key for each item
 * @param resultMapper A function that transforms each group into the desired output format
 * @returns An array of grouped results after applying the resultMapper
 * 
 * @example
 * // Group products by category and count items in each category
 * const categoryCounts = groupByToArray(products, 'category', 
 *   (key, items) => ({ category: key, count: items.length })
 * );
 */
export function groupByToArray<T, K extends string | number | symbol, R>(
  array: T[],
  keySelector: ((item: T) => K) | keyof T,
  resultMapper: (key: string, items: T[]) => R
): R[] {
  const grouped = groupBy(array, keySelector);
  
  return Object.entries(grouped).map(
    ([key, items]) => resultMapper(key, items)
  );
}
