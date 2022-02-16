import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/authorization/roles.guard';
import { GetUser } from '../auth/get-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';
import { RoleEnum } from '../auth/authorization/role.enum';
import { Roles } from '../auth/authorization/roles.decorator';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ConfirmedOrderDto } from './dto/confirmed-Order.Dto';

// auth & authorization
@UseGuards(AuthGuard(), RolesGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  newOrder(
    @GetUser() id: string,
    @Body() createOrder: CreateOrderDto,
  ): Promise<Order> {
    return this.orderService.newOrder(id, createOrder);
  }

  @Get('/admin')
  @Roles(RoleEnum.admin)
  allOrders(): Promise<Order[]> {
    return this.orderService.allOrders();
  }

  @Get(':id')
  getSingleOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.getSingleOrder(id);
  }

  @Get()
  getAllOrderUser(@GetUser() id: string): Promise<Order[]> {
    return this.orderService.getAllOrderUser(id);
  }

  @Put()
  updateOrder(
    @GetUser() id: string,
    @Body() updateOrder: UpdateOrderDto,
  ): Promise<void> {
    return this.orderService.updateOrder(id, updateOrder);
  }

  @Delete(':id')
  deleteOrderProduct(@GetUser() id: string): Promise<void> {
    return this.orderService.deleteItems(id);
  }

  @Put('/confirmedOrder')
  confirmedOrder(
    @GetUser() id: string,
    @Body() confirmedDto: ConfirmedOrderDto,
  ) {
    return this.orderService.confirmedOrder(id, confirmedDto);
  }
}
