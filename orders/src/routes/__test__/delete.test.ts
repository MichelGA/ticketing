import request from 'supertest'
import {app} from '../../app'
import {Order, OrderStatus} from '../../models/order'
import {Ticket} from '../../models/ticket'
import mongoose from 'mongoose'

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title:  'concert',
    price: 20
  })
  await ticket.save()
  return ticket;
}


it('cancels the user order', async () => {

  const ticketOne = await buildTicket()

  const userOne = global.signin();

  const {body: orderOne} = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ticketId: ticketOne.id})
    .expect(201)

  const response = await request(app)
    .delete(`/api/orders/${orderOne.id}`)
    .set('Cookie', userOne)
    .send()
    .expect(204)

})