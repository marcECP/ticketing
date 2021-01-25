import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { OrderStatus } from '@ecpticketing/common';
import { stripe } from '../../stripe';

jest.mock('../../stripe.ts');

it('returns a 404 when purchasing a order that does not exists', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'wqerg',
      orderId: mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it('returns a 401 when purchasing an order that doesnt belong to the user', async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'asdfgd',
      orderId: order.id,
    })
    .expect(401);
});

it('returns a 400 when purchasing a cancelled order', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Candelled,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(userId))
    .send({
      orderId: order.id,
      token: 'asdfgh',
    })
    .expect(400);
});

// it.todo('returns a 201 with valid inputs', async () => {
//   const userId = mongoose.Types.ObjectId().toHexString();

//   const order = Order.build({
//     id: mongoose.Types.ObjectId().toHexString(),
//     userId,
//     version: 0,
//     price: 20,
//     status: OrderStatus.Created,
//   });
//   await order.save();

//   await request(app)
//     .post('/api/payments')
//     .set('Cookie', global.signin(userId))
//     .send({
//       token: 'tok_visa',
//       orderId: order.id,
//     })
//     .expect(201);

//   const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
//   expect(chargeOptions.source).toEqual('tok_visa');
//   expect(chargeOptions.amount).toEqual(20 * 100);
//   expect(chargeOptions.currency).toEqual('usd');
// });
