import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@ecpticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
