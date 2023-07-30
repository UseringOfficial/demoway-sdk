export const DOMAIN_MAIN = '//demoway.co';
const DOMAIN_STATIC = '//s.demoway.co';

const SERVICE_ENDPOINT_KEY = 'MIAOLU_SERVICE_ENDPOINT';
const INTERMEDIARY_ENDPOINT_KEY = 'MIAOLU_INTERMEDIARY_ENDPOINT';

export const INTERMEDIARY_ENDPOINT = localStorage.getItem(INTERMEDIARY_ENDPOINT_KEY) || `${DOMAIN_MAIN}/intermediary`;
export const SERVICE_ENDPOINT = localStorage.getItem(SERVICE_ENDPOINT_KEY) || `${DOMAIN_STATIC}/sdk-service`;

export const MAGIC = 'MIAOLU_INTERMEDIARY_INITIALIZE';
