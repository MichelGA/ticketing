import { Publisher, OrderCancelledEvent, Subjects} from '@faymbl/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}

