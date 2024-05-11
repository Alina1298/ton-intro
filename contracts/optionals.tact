import "@stdlib/deploy";
struct StrcOpts {
    num: Int?;
    bool: Bool?;
    address: Address?;
}
message MsgOpts {
    num: Int?;
    bool: Bool?;
    address: Address?;
    opts: StrcOpts?;
}

contract Optionals with Deployable {
    // опциональная переменная (значение || null)
    num: Int?;
    bool: Bool?;
    address: Address?;
    strc: StrcOpts?;

    // Если параметры выше опциональные, то в init их надо указать с ?
    init(a: Int?, b: Bool?, c: Address?){
        self.num = a;
        self.bool = b;
        self.address = c;
        self.strc = StrcOpts{num: null, bool: true, address: null};
    }

    receive(msg: MsgOpts){
        if (msg.num != null) {
            //msg.num!! - говорим компиллятору, что num не может быть null
            self.num = msg.num!!;
        }
    }

    get fun optInt(): Int? {
        return self.num;
    }

    get fun optIntVal(): Int {
        if (self.num != null) {
            return self.num!!;
        }

        return -1;
    }

    get fun optNested(): Int? {
        if (self.strc != null && (self.strc!!).num != null) {
            return (self.strc!!).num!!;
        }

        return null;
    }
}
