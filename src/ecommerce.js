"use strict";
class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
    getInfo() {
        return "Name: " + this.name + "\nAddress: " + this.address;
    }
}
class Order {
    constructor(customer, date, status) {
        this.orderDetails = [];
        this.payment = new Cash(0, 0);
        this.customer = customer;
        this.date = date;
        this.status = status;
    }
    calcSubTotal() {
        let subtotal = 0;
        for (let i = 0; i < this.orderDetails.length; i++) { //array
            subtotal += this.orderDetails[i].calcSubtotal();
        }
        return subtotal;
    }
    calcTax() {
        let vat = 0;
        for (let i = 0; i < this.orderDetails.length; i++) { //array
            vat += this.orderDetails[i].calcTax();
        }
        return vat;
    }
    calcTotal() {
        return this.calcSubTotal() + this.calcTax();
    }
    calcTotalweight() {
        let weight = 0;
        for (let i = 0; i < this.orderDetails.length; i++) { //array
            weight += this.orderDetails[i].calcWegiht();
        }
        return weight;
    }
    addOrderDetail(OrderDetail) {
        this.orderDetails.push(OrderDetail);
    }
    payOrder(payment) {
        this.payment = payment;
    }
    getPayment() {
        return this.payment;
    }
}
class OrderDetail {
    constructor(item, quantity, taxstatus) {
        this.item = item;
        this.quantity = quantity;
        this.taxstatus = taxstatus;
    }
    calcSubtotal() {
        return this.quantity * this.item.getPriceForQuantity();
    }
    calcWegiht() {
        return this.quantity * this.item.getshippingweight();
    }
    calcTax() {
        if (this.taxstatus === "not include") {
            return this.quantity * this.item.getTax();
        }
        return 0;
    }
}
class Item {
    constructor(shippingWeight, description, price) {
        this.shippingWeight = shippingWeight;
        this.description = description;
        this.price = price;
    }
    getPriceForQuantity() {
        return this.price;
    }
    getTax() {
        return this.price * 0.07;
    }
    getshippingweight() {
        return this.shippingWeight;
    }
    intStock() {
        return true;
    }
    getInfo() {
        return "Name: " + this.description + ", Price: " + this.price + " $, Weight: " + this.shippingWeight + " KG.";
    }
}
class Payment {
    constructor(amount) {
        this.amount = amount;
    }
    getAmount() {
        return this.amount;
    }
}
class Check extends Payment {
    constructor(name, bankID, amount) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }
    authorized() {
    }
}
class Cash extends Payment {
    constructor(cashTendered, amount) {
        super(amount);
        this.cashTendered = cashTendered;
    }
    getChange() {
        return this.getAmount() - this.cashTendered;
    }
    getCashTendered() {
        return this.cashTendered;
    }
}
class Credit extends Payment {
    constructor(number, type, amount, expDate) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
    authorized() {
    }
}
//create object
const customer1 = new Customer("Choke Dee", "Nakhonprathom");
console.log(customer1.getInfo());
//Items
const item1 = new Item(1.5, "lotus's water", 60);
console.log(item1.getInfo());
const item2 = new Item(0.05, "Lays", 30);
console.log(item2.getInfo());
//order
const order1 = new Order(customer1, "16/12/2567", "inprogress");
//orderdetail
const orderdetail1 = new OrderDetail(item1, 1, "not include");
const orderdetail2 = new OrderDetail(item2, 2, "not include");
//orderDetail => Order
order1.addOrderDetail(orderdetail1);
order1.addOrderDetail(orderdetail2);
const amount = order1.calcTotal();
//Payment
const cash = new Cash(amount, 1000);
order1.payOrder(cash);
console.log("Subtotal:" + order1.calcSubTotal() + "$");
console.log("VAT " + order1.calcTax() + "$");
console.log("Recieve: " + order1.getPayment().getAmount() + "$");
console.log("Total: " + order1.getPayment().getCashTendered() + "$");
console.log("change: " + order1.getPayment().getChange()
    + "$");
