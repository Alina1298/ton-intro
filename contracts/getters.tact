import "@stdlib/deploy";

// бесплатны (не требуют операцию за газ), т.к. майнер никак не обрабатывают эти вызовы
// вызывать их можем только вне блокчейна со стороны нашего клиента (приложение, сайт - offchain - за границами блокчейна)
// это значит, что смарт-контракт1 не может читать storage смарт-контракта2 через его getters
// единственный способ взаимодействовать между собой - отправлять друг другу сообщения (можно передавать любую инфу)
contract Getters with Deployable {
    count: Int as uint32;
    init(){
        self.count = 17;
    }

    get fun counter(): Int {
        return self.count;
    }

    get fun location(): Address {
        return myAddress();
    }

    get fun greeting(): String {
        return "hello world";
    }

    get fun sum(a: Int, b: Int): Int {
        return (a + b);
    }

    get fun and(a: Bool, b: Bool): Bool {
        return a && b;
    }

    get fun answer(a: Int): String {
        let sb: StringBuilder = beginString();
        sb.append("The meaning of life is ");
        sb.append(a.toString());
        return sb.toString();
    }
}
