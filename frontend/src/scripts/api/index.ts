/**
 * Copyright (c) ...
 * All rights reserved.
 */

import axios from 'axios';

const baseUrl = process.env.API_URL;

export function getMessage(): Promise<{ message: string }> {
  return axios.request({
    method: 'GET',
    url: `${baseUrl}/v1/message`,
  }).then((response) => response.data);
}

export function postMessage(message: string): Promise<{ message: string }> {
  return axios.request({
    method: 'POST',
    url: `${baseUrl}/v1/message`,
    data: { message },
  }).then((response) => response.data);
}
