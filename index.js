const express = require('express')
const uuid = require('uuid')

const port = 6000
const app = express()
app.use(express.json())

const orders = []

app.get('/orders', (request, response) => {

    return response.json(orders)

})

app.post('/orders', (request, response) => {

    const { order, clienteName, price, status } = request.body

    const userOrders = { id: uuid.v4(), order, clienteName, price, status }

    orders.push(userOrders)

    return response.status(201).json(userOrders)
})

app.put('/orders/:id', (request, response) => {

    const { id } = request.params
    const { order, clienteName, price, status } = request.body

    const updateUser = { id, order, clienteName, price, status }

    const index = orders.findIndex(order => order.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "Order not found" })
    }

    orders[index] = updateUser

    return response.json(updateUser)
})

app.delete('/orders/:id', (request, response) => {
    const { id } = request.params

    const index = orders.findIndex(order => order.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "Order not found" })
    }

    orders.splice(index, 1)


    return response.status(204).json()
})

app.get('/orders/:id', (request, response) => {

    const { id } = request.params

    const index = orders.find(order => order.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "Order not found" })
    }





    return response.json(index)

})

app.patch('/orders/:id', (request, response) => {

    const { id } = request.params
    const order = orders.find(order => order.id === id)

    if (order < 0) {
        return response.status(404).json({ message: "Order not found" })
    }

    if(order.status === "Order In Preparation"){
        order.status = "Order ready to deliver!";
        
    }

    return response.json(order)

})


app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})