'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Products',
      [
        // Food category - 5 products
        {
          title: 'Pizza Margherita',
          description: 'Classic Italian pizza with tomato sauce and mozzarella',
          category: 'food',
          price: 12.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Burger Deluxe',
          description:
            'Juicy beef burger with fresh vegetables and special sauce',
          category: 'food',
          price: 8.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Sushi Roll Set',
          description: 'Fresh salmon and avocado sushi rolls with wasabi',
          category: 'food',
          price: 15.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Pasta Carbonara',
          description: 'Creamy pasta with bacon, eggs, and parmesan cheese',
          category: 'food',
          price: 11.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Caesar Salad',
          description:
            'Fresh romaine lettuce with caesar dressing and croutons',
          category: 'food',
          price: 9.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Clothes category - 5 products
        {
          title: 'Classic T-Shirt',
          description: 'Comfortable cotton t-shirt in various colors',
          category: 'clothes',
          price: 19.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Denim Jeans',
          description: 'High-quality denim jeans with perfect fit',
          category: 'clothes',
          price: 49.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Hoodie Sweatshirt',
          description: 'Warm and cozy hoodie for cold weather',
          category: 'clothes',
          price: 34.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Running Shoes',
          description: 'Lightweight running shoes with excellent cushioning',
          category: 'clothes',
          price: 79.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Winter Jacket',
          description: 'Warm winter jacket with waterproof material',
          category: 'clothes',
          price: 89.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Electronics category - 5 products
        {
          title: 'Gaming Laptop',
          description: 'High-performance laptop for gaming and work',
          category: 'electronics',
          price: 1299.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Smartphone Pro',
          description: 'Latest smartphone with advanced camera and features',
          category: 'electronics',
          price: 899.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Wireless Headphones',
          description:
            'Noise-cancelling wireless headphones with premium sound',
          category: 'electronics',
          price: 199.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: '4K Smart TV',
          description: '55-inch 4K smart TV with streaming capabilities',
          category: 'electronics',
          price: 599.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Gaming Console',
          description: 'Next-gen gaming console with wireless controller',
          category: 'electronics',
          price: 499.99,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
