class Customer {
    private name: string;
    private address: string;

    constructor (name: string,address: string){
        this.name = name;
        this.address = address;
    }
    public getInfo():String{
        return "Name: " + this.name + "\nAddress: "+ this.address;
    }
}
class Order{
    private customer: Customer;
    private orderDetails: OrderDetail[]=[];
    private payment: Payment=new Cash(0,0)
    private date: string;
    private status: string;

    constructor (customer: Customer,date: string,status: string){
        this.customer = customer;
        this.date = date;
        this.status = status;
    }
    public calcSubTotal(){
        let subtotal = 0;
        for(let i = 0; i<this.orderDetails.length;i++){ //array
            subtotal += this.orderDetails[i].calcSubtotal();
        }
        return subtotal;
    }
    public calcTax(){
        let vat = 0;
        for(let i = 0; i<this.orderDetails.length;i++){ //array
            vat += this.orderDetails[i].calcTax();
        }
        return vat;
    }
    public calcTotal(){
        return this.calcSubTotal() + this.calcTax();
    }
    public calcTotalweight(){
        let weight = 0;
        for(let i = 0; i<this.orderDetails.length;i++){ //array
            weight  += this.orderDetails[i].calcWegiht();
        }
        return weight;
    
    }
    public addOrderDetail (OrderDetail: OrderDetail){
        this.orderDetails.push(OrderDetail);
    }
    public payOrder(payment: Payment){
        this.payment=payment
    }
    public getPayment():Payment{
        return this.payment
    }
}
class OrderDetail{
    private item: Item;
    private quantity: number;
    private taxstatus: string;

    constructor (item: Item,quantity: number,taxstatus:string){
        this.item = item;
        this.quantity = quantity;
        this.taxstatus = taxstatus;
    }
    public calcSubtotal(){
        return this.quantity * this.item.getPriceForQuantity();  
    }
    public calcWegiht(){
        return this.quantity * this.item.getshippingweight();
    }
    public calcTax(): number {
    if (this.taxstatus === "not include") {
        return this.quantity * this.item.getTax();  
    }
    return 0;
}
}

class Item {
    private shippingWeight: any;
    private description: string;
    private price: number;

    constructor(shippingWeight: any,description: string,price: number) {
        this.shippingWeight= shippingWeight;
        this.description = description;
        this.price = price;

    }
    public getPriceForQuantity(){
        return this.price;
    }
        public getTax():number {
        return this.price * 0.07;
        }
        public getshippingweight():number{
            return this.shippingWeight
        }
        public intStock(){
        return true
        }
        public getInfo():String{
            return "Name: " + this.description + ", Price: " + this.price + " $, Weight: " + this.shippingWeight + " KG.";
        }
}
class Payment {
    private amount: number;

    constructor (amount: number){
        this.amount = amount
    }
    public getAmount():number{
        return this.amount;
    }
}

class Check extends Payment{ 
    private name : string;
    private bankID : string;

    constructor (name: string,bankID: string,amount: number)
    {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }   


    public authorized() {
        
    }
}
class Cash extends Payment{
    private cashTendered: number;

    constructor (cashTendered: number,amount: number){
        super(amount);
        this.cashTendered = cashTendered;
    }
    public getChange():number{
        return this.getAmount() - this.cashTendered  ;
    }
    public getCashTendered(): number{
        return this.cashTendered
    }
}
    class Credit extends Payment{
        private number: String;
        private type: String;
        private expDate: String

        constructor (number: String,type: String,amount: number,expDate: String){
            super(amount);
            this.number = number;
            this.type = type;
            this.expDate = expDate;    
        }
        public authorized(){
            
        }
    }

//create object
const customer1 = new Customer("Choke Dee","Nakhonprathom");
console.log(customer1.getInfo());

//Items
const item1 = new Item(1.5, "lotus's water",60);
console.log(item1.getInfo());

const item2 = new Item(0.05,"Lays",30)
console.log(item2.getInfo());


//order
const order1 = new Order(customer1, "16/12/2567","inprogress");

//orderdetail
const orderdetail1 = new OrderDetail(item1, 1,"not include")
const orderdetail2 = new OrderDetail(item2, 2,"not include")


//orderDetail => Order
order1.addOrderDetail(orderdetail1);
order1.addOrderDetail(orderdetail2);


const amount = order1.calcTotal();
//Payment
const cash = new Cash(amount, 1000);

order1.payOrder(cash);
console.log("Subtotal:"+ order1.calcSubTotal()+"$");
console.log("VAT "+ order1.calcTax()+"$");

console.log("Recieve: "+order1.getPayment().getAmount()+"$");

console.log("Total: "+ (order1.getPayment() as Cash).getCashTendered()+"$");
console.log("change: "+ (order1.getPayment() as Cash).getChange()
+"$");