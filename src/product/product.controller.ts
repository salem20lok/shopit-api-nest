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
import { GetUser } from '../auth/get-user.decorator';
import { ObjectId } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/authorization/roles.decorator';
import { RoleEnum } from '../auth/authorization/role.enum';
import { RolesGuard } from '../auth/authorization/roles.guard';
import { PaginationProductDto } from './dto/pagination-product.dto';

@Controller('product')
// auth & authorization
//@UseGuards(RolesGuard)
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Get('filter')
  filterProduct(
    @Query() filterProductDto: filterProductDto,
  ): Promise<Product[]> {
    if (Object.keys(filterProductDto).length) {
      const { category, name, ratingInf, priceInf, priceSup, ratingSup } =
        filterProductDto;
      const query = {
        category: category,
        name: { $regex: `.*${name}.*` },
        rating: { $lte: ratingInf },
        price: { $lte: priceInf },
      };

      if (ratingSup) {
        delete query.rating.$lte;
        query.rating['$gte'] = ratingSup;
      }

      if (priceSup) {
        delete query.price.$lte;
        query.price['$gte'] = priceSup;
      }

      if (!name) {
        delete query.name;
      }

      if (!category) {
        delete query.category;
      }

      if (!ratingInf && !ratingSup) {
        delete query.rating;
      }
      if (!priceInf && !priceSup) {
        delete query.price;
      }

      return this.ProductService.filterProduct(query);
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

  @Get('pagination')
  getAllProductPagination(
    @Query() paginationDto: PaginationProductDto,
  ): Promise<{
    products: Product[];
    count: number;
  }> {
    const query = {
      name: { $regex: `.*${paginationDto.name}.*` },
    };

    if (!paginationDto.name) {
      delete query.name;
    }

    return this.ProductService.getAllProductPagination(
      paginationDto.skip,
      query,
    );
  }

  @Get('category')
  getCategories(): Promise<string[]> {
    return this.ProductService.getCategories();
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.ProductService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  // authorization
  @Roles(RoleEnum.admin)
  newProduct(
    @Body() CreateProductDto: CreateProductDto,
    @GetUser() user: ObjectId,
  ): Promise<Product> {
    console.log(user);
    return this.ProductService.newProduct(CreateProductDto, user);
  }

  @Put(':id/newProduct')
  @UseGuards(AuthGuard(), RolesGuard)
  // authorization
  @Roles(RoleEnum.admin)
  updateProduct(
    @Param('id') id: string,
    @Body() UpdateProductDto: UpdateProductDto,
    @GetUser() user: ObjectId,
  ): Promise<Product> {
    return this.ProductService.UpdateProduct(id, UpdateProductDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  // authorization
  @Roles(RoleEnum.admin)
  deleteProduct(@Param('id') id: string): Promise<void> {
    return this.ProductService.deleteProduct(id);
  }
}
