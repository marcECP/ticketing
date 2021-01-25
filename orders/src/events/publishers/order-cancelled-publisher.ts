import { Publisher, Subjects, OrderCancelledEvent } from '@ecpticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
