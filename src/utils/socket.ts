import io from 'socket.io-client';
// import { SERVER } from './config';

const socket = io();
// const socket = io(SERVER || 'http://localhost:9999');

export default socket;
