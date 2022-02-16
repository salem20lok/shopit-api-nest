import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from '../product/schemas/product.schema';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ConfirmedOrderDto } from './dto/confirmed-Order.Dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private OrderModel: Model<Order>,
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}

  async newOrder(id: string, createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      createOrderDto['user'] = id;
      const order = new this.OrderModel(createOrderDto);
      return await order.save();
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async getSingleOrder(id: string): Promise<Order> {
    try {
      const order = await this.OrderModel.findById(id).populate(
        'user',
        'email name',
      );
      if (!order) {
        throw new NotFoundException(`Order id : ${id} not found `);
      }
      return order;
    } catch (e) {
      throw new NotFoundException(`Order id : ${id} not found `);
    }
  }

  async getAllOrderUser(id: string): Promise<Order[]> {
    try {
      const order = await this.OrderModel.find({
        user: id,
        orderStatus: 'processing',
      });

      if (!order) {
        throw new NotFoundException(`Order id : ${id} Aucun order engistre`);
      }

      return order;
    } catch (e) {
      throw new NotFoundException(`Order id : ${id} not found `);
    }
  }

  async allOrders(): Promise<Order[]> {
    try {
      const order = await this.OrderModel.find();
      if (!order) {
        throw new NotFoundException(`Aucun order engistre`);
      }
      return order;
    } catch (e) {
      throw new NotFoundException(`Aucun order engistre`);
    }
  }

  async updateOrder(id: string, updateOrder: UpdateOrderDto): Promise<void> {
    await this.OrderModel.findOneAndUpdate(
      { user: id, orderStatus: 'processing' },
      updateOrder,
    );
  }

  async deleteItems(user: string): Promise<void> {
    await this.OrderModel.findOneAndDelete({ user, orderStatus: 'processing' });
  }

  async confirmedOrder(
    user: string,
    confirmedOrderDto: ConfirmedOrderDto,
  ): Promise<void> {
    const orderStatus = 'confirmed';
    const { shoppingInfo, paymentInfo } = confirmedOrderDto;
    await this.OrderModel.findOneAndUpdate(
      {
        user,
        orderStatus: 'processing',
      },
      { orderStatus, shoppingInfo, paymentInfo },
    ).then(async (e) => {
      e.orderItems.map(async (el) => {
        const product = await this.ProductModel.findById(el.product);
        product.stock = product.stock - Number(el.quantity);
        await product.save();
      });
    });
  }
}
