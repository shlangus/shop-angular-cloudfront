import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://hnzw72gn15.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://ebygl9njp0.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'http://shlangus-cart-api-dev.eu-west-1.elasticbeanstalk.com/api/profile/cart',
  },
  apiEndpointsEnabled: {
    product: false,
    order: false,
    import: true,
    bff: true,
    cart: false,
  },
};
