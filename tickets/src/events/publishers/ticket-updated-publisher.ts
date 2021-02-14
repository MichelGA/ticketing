import { Publisher, Subjects, TicketUpdateEvent} from '@faymbl/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdateEvent>{
  readonly subject = Subjects.TicketUpdated

}

