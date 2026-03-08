import { faker } from "@faker-js/faker";
import type { Product } from "~/features/admin/store/productsStore";

// Define product categories
const PRODUCT_CATEGORIES = [
  "Berbere",
  "Mitmita",
  "Shiro",
  "Korerima",
  "Tena Adam",
  "Niter Kibbeh",
  "Ethiopian Coffee",
  "Spice Blends",
  "Seasoning Mixes",
];

// Define product statuses
const PRODUCT_STATUSES = ["Available", "Out of Stock", "Hidden"];

// Define weight units
const WEIGHT_UNITS = ["g", "kg", "oz", "lb"];

/**
 * Generate a single fake product
 */
export function generateFakeProduct(): Product {
  const title = faker.commerce.productName();
  const description = faker.commerce.productDescription();
  const price = parseFloat(faker.commerce.price({ min: 5, max: 100 }));
  const discountedPrice = Math.random() > 0.7 ? price * 0.8 : 0.8;
  const sku = faker.string.alphanumeric(8).toUpperCase();
  const weightValue = faker.number.int({ min: 50, max: 2000 });
  const weightUnit = faker.helpers.arrayElement(WEIGHT_UNITS);
  const weight = `${weightValue}${weightUnit}`;
  const quantity = faker.number.int({ min: 0, max: 100 });
  const stock = quantity;
  const status = faker.helpers.arrayElement(PRODUCT_STATUSES);
  const category = faker.helpers.arrayElement(PRODUCT_CATEGORIES);

  // Generate random ingredients (3-6 items)
  const ingredientCount = faker.number.int({ min: 3, max: 6 });
  const ingredients = Array.from(
    { length: ingredientCount },
    () =>
      faker.commerce.productMaterial() +
      " " +
      faker.commerce.product().toLowerCase()
  );

  // Generate random instructions (2-4 items)
  const instructionCount = faker.number.int({ min: 2, max: 4 });
  const instructions = Array.from({ length: instructionCount }, () =>
    faker.lorem.sentence()
  );

  return {
    id: faker.string.uuid(),
    title,
    description,
    price,
    discountedPrice,
    weight,
    quantity,
    status,
    ingredients,
    instructions,
    images: [],
    discountPercentage: 0,
    isDiscounted: false,
    weightUnit: "g",
  };
}

/**
 * Generate multiple fake products
 * @param count Number of products to generate
 */
export function generateFakeProducts(count: number = 10): Product[] {
  return Array.from({ length: count }, generateFakeProduct);
}

/**
 * Generate Ethiopian-themed fake product
 */
export function generateEthiopianProduct(): Product {
  // Ethiopian spice and food names
  const ethiopianProductNames = [
    "Berbere Spice Mix",
    "Mitmita Hot Pepper",
    "Shiro Powder",
    "Korerima Ethiopian Cardamom",
    "Tena Adam Ethiopian Rue",
    "Niter Kibbeh Spiced Butter",
    "Yirgacheffe Coffee",
    "Sidamo Coffee Beans",
    "Doro Wat Spice Kit",
    "Tibs Seasoning",
    "Injera Flour Mix",
    "Awaze Paste",
    "Tikur Azmud Black Cumin",
    "Beso Ethiopian Barley Flour",
    "Telba Flaxseed",
  ];

  const title = faker.helpers.arrayElement(ethiopianProductNames);
  const category = title.includes("Coffee")
    ? "Ethiopian Coffee"
    : title.includes("Berbere")
    ? "Berbere"
    : title.includes("Mitmita")
    ? "Mitmita"
    : title.includes("Shiro")
    ? "Shiro"
    : faker.helpers.arrayElement(PRODUCT_CATEGORIES);

  // Ethiopian-themed descriptions
  const descriptions = [
    "Authentic Ethiopian spice blend, perfect for traditional dishes.",
    "Bring the rich flavors of Ethiopia to your kitchen with this premium quality product.",
    "Hand-selected and carefully processed following traditional Ethiopian methods.",
    "A staple in Ethiopian cuisine, this product adds depth and complexity to any dish.",
    "Sourced directly from Ethiopian farmers, supporting sustainable agriculture.",
    "Experience the unique taste of Ethiopia with this traditional seasoning.",
    "Crafted according to time-honored Ethiopian recipes passed down through generations.",
  ];

  const description = faker.helpers.arrayElement(descriptions);
  const price = parseFloat(faker.commerce.price({ min: 8, max: 35 }));
  const discountedPrice =
    Math.random() > 0.7 ? Math.round(price * 0.85 * 100) / 100 : undefined;
  const sku = `ETH-${faker.string.alphanumeric(6).toUpperCase()}`;

  // More realistic weight values for spices
  const weightOptions = ["100g", "250g", "500g", "1kg", "50g", "150g"];
  const weight = faker.helpers.arrayElement(weightOptions);

  const quantity = faker.number.int({ min: 0, max: 50 });
  const stock = quantity;
  const status =
    quantity === 0
      ? "Out of Stock"
      : faker.helpers.arrayElement(PRODUCT_STATUSES);

  // Ethiopian-themed ingredients
  const ethiopianIngredients = [
    "Dried chili peppers",
    "Garlic powder",
    "Ginger powder",
    "Fenugreek seeds",
    "Cardamom",
    "Coriander",
    "Cinnamon",
    "Allspice",
    "Cloves",
    "Black pepper",
    "Salt",
    "Ajwain",
    "Cumin",
    "Nutmeg",
    "Turmeric",
    "Paprika",
    "Onion powder",
  ];

  // Generate random ingredients (3-6 items)
  const ingredientCount = faker.number.int({ min: 3, max: 7 });
  const ingredients = faker.helpers.arrayElements(
    ethiopianIngredients,
    ingredientCount
  );

  // Ethiopian-themed instructions
  const ethiopianInstructions = [
    "Store in a cool, dry place away from direct sunlight.",
    "Add 1-2 tablespoons to stews or meat dishes for authentic Ethiopian flavor.",
    "Mix with oil to create a paste for marinating meats.",
    "Sprinkle lightly over vegetables before roasting for a spicy kick.",
    "Use as a rub for meats before grilling or roasting.",
    "Add to soups and stews during cooking for depth of flavor.",
    "Mix with butter and lemon juice for a delicious bread dip.",
    "Combine with yogurt for a flavorful sauce or dip.",
  ];

  // Generate random instructions (2-4 items)
  const instructionCount = faker.number.int({ min: 2, max: 4 });
  const instructions = faker.helpers.arrayElements(
    ethiopianInstructions,
    instructionCount
  );

  return {
    id: faker.string.uuid(),
    title,
    description,
    price,
    discountedPrice,
    weight,
    quantity,
    status,
    ingredients,
    instructions,
    images: [],
    discountPercentage: 0,
    isDiscounted: false,
    weightUnit: "g",
  };
}

/**
 * Generate multiple Ethiopian-themed fake products
 * @param count Number of products to generate
 */
export function generateEthiopianProducts(count: number = 10): Product[] {
  return Array.from({ length: count }, generateEthiopianProduct);
}

// Example usage:
// const singleProduct = generateFakeProduct();
// const tenProducts = generateFakeProducts(10);
// const ethiopianProduct = generateEthiopianProduct();
// const tenEthiopianProducts = generateEthiopianProducts(10);
