const {Product} = require('../db/models')

class ProductService {
  static async getAll(){
    return await Product.findAll();
  }
  static async getById(id){
    return await Product.findByPk(id)
  }
  static async create(data){
    return await Product.create(data)
  }
  static async update(id, data){
    const product = this.getById(id);
    if(product){
      product.title = data.title;
      product.description = data.description;
      product.category = data.category;
      product.price = data.price
    }
    return product
  }
  static async delete(id){
    const product = await this.getById(id);
    if(product){
      await product.destroy();
    }
    return product
  }
}
module.exports = ProductService