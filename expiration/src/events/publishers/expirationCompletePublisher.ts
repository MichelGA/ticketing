import { Subjects, Publisher, ExpirationCompleteEvent} from '@faymbl/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
  readonly subject = Subjects.ExpirationComplete;

}