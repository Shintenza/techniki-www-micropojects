
class OnlineStore {
  // in the current state an order has the same ID as a product. 
  // if one client bought an item with ID1 and the another one decided to buy the same item, their orderds
  // have identical IDs. I decided to create this variable that is going contain not already used ID that is 
  // incremeted after beign assigned

  #nextOrderId = 0;

  constructor() {
    this.products = []; // lista dostępnych produktów
    this.orders = []; // lista zamówień
  }

  addProduct(id, name, price, stock) {
    const product = {
      id,
      name,
      price,
      stock
    };
    this.products.push(product);
  }

  placeOrder(productId, quantity, customer) {
    const product = this.products.find(p => p.id === productId);
    if (product && product.stock >= quantity) {
      const order = {
        id: this.#nextOrderId,
        productId,
        quantity,
        customer,
        status: 'Processing',
        total: product.price * quantity
      };
      this.#nextOrderId +=1;
      product.stock -= quantity; // zmniejszenie stanu magazynowego
      this.orders.push(order);
      return order;
    } else {
      throw new Error('Product is not available in the desired quantity.');
    }
  }

  cancelOrder(orderId) {
    const orderIndex = this.orders.findIndex(order => order.id === orderId);
    if (orderIndex > -1) {
      const order = this.orders[orderIndex];
      if (order.status === 'Processing') {
        order.status = 'Cancelled';
        // należy zwiększyć stan magazynowy produktu
        const product = this.products.find(p => p.id === order.productId);
        product.stock += order.quantity;
      } else {
        throw new Error('Order cannot be cancelled once it is beyond processing stage.');
      }
    } else {
      throw new Error('Order ID does not exist.');
    }
  }

  shipOrder(orderId) {
    const order = this.orders.find(order => order.id === orderId);
    if (order && order.status === 'Processing') {
      order.status = 'Shipped';
    } else if (order.status !== 'Processing') {
      throw new Error('Order is either already shipped or cancelled.');
    } else {
      throw new Error('Order ID does not exist.');
    }
  }

  restockProduct(productId, quantity) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.stock += quantity;
    } else {
      throw new Error('Product ID does not exist.');
    }
  }

  calculateTotalSales() {
    return this.orders.reduce((acc, order) => {
      if (order.status === 'Shipped') {
        return acc + order.total;
      }
      return acc;
    }, 0);
  }

  listProducts() {
    return this.products.map(p => `${p.name} - Price: ${p.price}, Stock: ${p.stock}`);
  }
}

const onlineStore = new OnlineStore();
onlineStore.addProduct(1, "Kości do gry", 69, 15);
onlineStore.addProduct(2, "Zestaw do pokera", 120, 6);
onlineStore.addProduct(3, "Karty do gry", 10, 210);

console.log("before placing any orders");
console.log(onlineStore.listProducts());

onlineStore.placeOrder(1, 5, "Sterfan Bathory");
onlineStore.placeOrder(1, 10, "Mariusz Kuternogi");
// onlineStore.placeOrder(1, 1, "Mariusz Rudobrody");

console.log("before canceling an order");
console.log(onlineStore);

onlineStore.cancelOrder(1)
console.log(onlineStore);

onlineStore.shipOrder(0);

console.log(`Total sales ${onlineStore.calculateTotalSales()}`);

onlineStore.restockProduct(1, 20);
console.log("after restock");
console.log(onlineStore.listProducts());

