import "@stdlib/deploy";

contract Strings with Deployable {
    init(){
        let s1: String = "hello world";
        let s2: String = "yes unicode no escaping /n";
        let i1: Int = -(12345);
        let i2: Int = 6780000000; // coins = ton('6.78')

        let s3: String = i1.toString();
        let s4: String = i1.toFloatString(3); // "-12.345"
        let s5: String = i2.toCoinsString(); // "6.78"

        // Все строки иммутабельны, поэтому соединяем их вот так:
        let sb: StringBuilder = beginString();
        sb.append(s1);
        sb.append(", your balance is: ");
        sb.append(s5);
        let s6: String = sb.toString();
    }
}
