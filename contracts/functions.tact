import "@stdlib/deploy";

 fun global(a: Int, b: Int): Int {
    return (a + b);
}

// расширяемая функция
// не меняет старое значение

extends  fun mul(self: Int, b: Int): Int {
    return self * b;
}

// изменяет исходное значение
// extends mutates fun add(self: Int, b: Int) {
//     self = (self + b);
// }

// Функции, которые позволяют взаимодействовать на уровень ниже (funC)
// @name(store_uint)
// native storeUint(s: Builder, value: Int, bits: Int) : Builder;

contract Functions with Deployable {
    num: Int as uint32;
    init(){
        self.num = 4;
    }

    receive(){}

    receive("add"){
        // self.num.add(1); // 5
    }

    // bounced(){}

    get fun balance(): Int {
        return myBalance();
    }

     fun f1() {
        global(2, 5);
    }

    get fun mulResult(): Int {
        return self.num.mul(5); // 20 num=self в mul
    }
}
