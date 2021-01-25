import { Publisher, PaymentCreatedEvent, Subjects } from '@ecpticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
