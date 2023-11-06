class OnlineStore {
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
        productId,
        quantity,
        customer,
        status: 'Processing',
        total: product.price * quantity
      };
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

