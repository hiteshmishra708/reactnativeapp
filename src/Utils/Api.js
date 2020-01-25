/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import * as backendUrl from '../Resource/Constants';

export default axios.create({
  baseURL: backendUrl.SERVERBASEURL,
});
