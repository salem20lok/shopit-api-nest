import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-Product.Dto';
import { searchProductDto } from './dto/search-product.dto';
import { filterProductDto } from './dto/filter-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Get('filter')
  filterProduct(
    @Query() filterProductDto: filterProductDto,
  ): Promise<Product[]> {
    if (Object.keys(filterProductDto).length) {
      return this.ProductService.filterProduct(filterProductDto);
    } else return this.ProductService.getAllProduct();
  }

  @Get('search')
  searchProduct(
    @Query() searchProductDto: searchProductDto,
  ): Promise<Product[]> {
    if (Object.keys(searchProductDto).length) {
      return this.ProductService.searchProduct(searchProductDto);
    } else return this.ProductService.getAllProduct();
  }

  @Get()
  getAllProduct(): Promise<Product[]> {
    return this.ProductService.getAllProduct();
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.ProductService.getProductById(id);
  }

  @Post()
  newProduct(@Body() CreateProductDto: CreateProductDto): Promise<Product> {
    return this.ProductService.newProduct(CreateProductDto);
  }

  @Put(':id/newProduct')
  updateProduct(
    @Param('id') id: string,
    @Body() UpdateProductDto: UpdateProductDto,
  ): Promise<Product> {
    console.log(id, UpdateProductDto);
    return this.ProductService.UpdateProduct(id, UpdateProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<void> {
    return this.ProductService.deleteProduct(id);
  }
}
