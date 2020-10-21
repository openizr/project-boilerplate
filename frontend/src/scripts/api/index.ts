/**
 * Copyright (c) ...
 * All rights reserved.
 */

import axios from 'axios';

export default function getMessage(): Promise<{ message: string }> {
  return axios.request({
    method: 'GET',
    url: 'http://localhost:8081/v1/message',
  }).then((response) => response.data);
}
