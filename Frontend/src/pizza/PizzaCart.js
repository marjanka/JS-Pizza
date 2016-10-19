/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var storage = require('./storage');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];
var saveCart = storage.get("cart");
if(saveCart){
    Cart=saveCart;
}

//HTML едемент куди будуть додаватися піци
var $cart = $("#all-orders");
var $summa = $(".sum-number");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
//if(pizza)
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
var index =Cart.indexOf(cart_item);
    if(index> -1){
        Cart.splice(index,1);
    }
    //Після видалення оновити відображення
    updateCart();
}

function cleanCart() {
    Cart=[];
    updateCart();

}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
$(".clear-order").click(cleanCart);
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);
        var price=cart_item.price;
        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            price+=cart_item.price;
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            cart_item.quantity -= 1;
            if(cart_item.quantity==0){
                removeFromCart(cart_item);
            }else {
            //Оновлюємо відображення
            updateCart();}
        });

        $node.find(".delete").click(function(){

            removeFromCart(cart_item);
        });

        $cart.append($node);
        $summa.append(price);
    }

    Cart.forEach(showOnePizzaInCart);
    storage.set("cart",Cart);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;