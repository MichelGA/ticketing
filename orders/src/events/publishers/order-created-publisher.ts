import { Publisher, OrderCreatedEvent, Subjects} from '@faymbl/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
  subject: Subjects.OrderCreated = Subjects.OrderCreated
}

