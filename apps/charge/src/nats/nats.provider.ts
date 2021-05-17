import { ClientProxyFactory } from '@nestjs/microservices';
import { NATS_CONF } from '../config';

export const NATS_PROVIDER = 'NATS_CLIEN:CHARGE';

export const NATS_CLIENT_PROVIDER = {
  provide: NATS_PROVIDER,
  useFactory: () => {
    return ClientProxyFactory.create(NATS_CONF);
  },
};
