import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-Product.Dto';
import { searchProductDto } from './dto/search-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}

  async filterProduct(query): Promise<Product[]> {
    const filter = this.ProductModel.find(query);
    return filter;
  }

  async searchProduct(searchProductDto: searchProductDto): Promise<Product[]> {
    const { name } = searchProductDto;
    const product = await this.ProductModel.find({
      name: { $regex: `.*${name}.*` },
    });
    return product;
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const products = await this.ProductModel.findById(id);
      if (!products) {
        throw new NotFoundException(`id:${id} not found `);
      }
      return products;
    } catch (e) {
      throw new NotFoundException(`id:${id} not found `);
    }
  }

  async getAllProduct(): Promise<Product[]> {
    const products = await this.ProductModel.find();
    return products;
  }

  async newProduct(
    CreateProductDto: CreateProductDto,
    user: ObjectId,
  ): Promise<Product> {
    const found = await this.ProductModel.findOne({
      name: CreateProductDto.name,
      category: CreateProductDto.category,
    });

    if (found) {
      throw new NotFoundException(
        `this product: ${CreateProductDto.name} already exist `,
      );
    }

    const product = new this.ProductModel({
      name: CreateProductDto.name,
      price: CreateProductDto.price,
      description: CreateProductDto.description,
      rating: CreateProductDto.rating,
      images: CreateProductDto.images,
      category: CreateProductDto.category,
      stock: CreateProductDto.stock,
      numOfReviews: CreateProductDto.numOfReviews,
      Reviews: CreateProductDto.Reviews,
      user,
    });
    const res = await product.save();
    return res;
  }

  async UpdateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
    user: ObjectId,
  ): Promise<Product> {
    try {
      const found = await this.ProductModel.findById(id);
      if (!found) {
        throw new NotFoundException(`this product${id} not found `);
      }
      updateProductDto['user'] = user;
      await this.ProductModel.findByIdAndUpdate(id, updateProductDto);
      return await this.ProductModel.findById(id);
    } catch (e) {
      throw new NotFoundException(`this product id: ${id} not found `);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const found = await this.ProductModel.findById(id);
      if (!found) {
        throw new NotFoundException(`this product${id} not found `);
      }
      await this.ProductModel.findByIdAndRemove(id);
    } catch (e) {
      throw new NotFoundException(`this product${id} not found `);
    }
  }

  async getAllProductPagination(
    skip: number,
    query,
  ): Promise<{
    products: Product[];
    count: number;
  }> {
    const products = await this.ProductModel.find(query).skip(skip).limit(8);
    const count = await this.ProductModel.find(query).count();
    return { products, count };
  }

  async getCategories(): Promise<string[]> {
    const product = await this.ProductModel.find().distinct('category');
    return product;
  }
}
