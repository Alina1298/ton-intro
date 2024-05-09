import "@stdlib/deploy";

// инициализируются 1 раз и не могут быть изменены в дальнейшем
// вычисляется 1 раз в момент деплоя контракта
// не занимает storage
// константы являются частью кода
// константы можно объявлять глобально
const GlobalConst1: Int = 2000 + ton("1.25") + pow(10, 9);

contract Constants with Deployable {
    const ContractConst1: Int = 2000 + ton("1.25") + pow(10, 9);

    init() {
        
    }

    get fun sum(): Int {
        return self.ContractConst1 + GlobalConst1;
    }
}
