import { Publisher, Subjects, TicketUpdatedEvent } from '@ecpticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
