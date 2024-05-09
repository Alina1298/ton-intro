import "@stdlib/deploy";

contract Addresses with Deployable {
    // 264-bit
    // хранение 1000 адресов = 0.189 TON в год
    a1: Address = address(""); // bouncable
    a2: Address = address(""); // non-bouncable
    a3: Address; // (workchain, address)

    a4: Address;
    a5: Address;
    a6: Address;
    init(){
        self.a3 = newAddress(0, ""); // (workchain, address)

        self.a4 = myAddress(); // получение адреса
        self.a5 = sender(); // получить адрес отправителя транзакции
        self.a6 = newAddress(0, 0);
    }

    receive(){
        self.a1 == self.a2; // true
        self.a2 == self.a3; // true
    }
}
