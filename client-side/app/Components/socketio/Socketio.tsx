
import io,{Socket} from 'socket.io-client'
const socket:Socket=io('http://localhost:8081')
const SocketInit=()=>{
    return socket
}
export {SocketInit}