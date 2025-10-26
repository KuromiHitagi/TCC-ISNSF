import usersRota from './controller/userController.js'
import incRota from './controller/incController.js'

export default function Rotas(endpoint) {
    endpoint.use(usersRota)
    endpoint.use(incRota)
}
