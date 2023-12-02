import axios from 'axios';
import { EnvironmentVariable } from './environment.global';

const api = axios.create(EnvironmentVariable.host);

export default api;