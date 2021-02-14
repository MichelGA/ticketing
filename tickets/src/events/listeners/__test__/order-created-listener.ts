import { OrderCreatedEvent, OrderStatus} from '@faymbl/common'
import {OrderCreatedListener} from '../order-created-listener'
import { natsWrapper} from '../../../nats-wrapper'
import { Message } from 'node-nats-streaming'
import mongoose from 'mongoose'
import {Ticket} from '../../../models/ticket'

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client)

  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: new mongoose.Types.ObjectId().toHexString(),
  })

  await ticket.save()

  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    version: 0,
    userId: new mongoose.Types.ObjectId().toHexString(),
    expiresAt: 'asdfasdfasdf',
    ticket: {
        id: ticket.id,
        price: 99
    }
  }

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  return {
    listener, ticket, data, msg
  }
}


it('update ticket when order is created', async()=> {
  const {listener, ticket, data, msg} = await setup()

  await listener.onMessage(data, msg)

  const updatedTicket = await Ticket.findById(ticket.id)

  expect(updatedTicket!.orderId).toEqual(data!.id)
})

it('asks the message', async()=>{
  const {listener, ticket, data, msg} = await setup()

  await listener.onMessage(data, msg)

  const updatedTicket = await Ticket.findById(ticket.id)

  expect(updatedTicket!.orderId).toEqual(data!.id)

  expect(msg.ack).toHaveBeenCalled()
})