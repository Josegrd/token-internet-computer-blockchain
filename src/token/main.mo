import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";


actor {
    var owner : Principal = Principal.fromText("jyfhm-ibr63-l7u3y-el6qm-hqkqo-b5yhh-q5iia-qacec-vl6gv-z4uf5-gqe");
    var totalSuply : Nat = 1000000000;
    var symbol : Text = "GARD";

    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    balances.put(owner, totalSuply);

    public query func balanceOf(who: Principal) : async Nat {
        
        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
        
        return balance;
    };

    public query func totalSupply() : async Nat {
        return totalSuply;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func payOut() : async Text {
        Debug.print(debug_show(msg.caller));
        if(balances.get(msg.caller) == null){
            let amount : Nat = 10000;
            balances.put(msg.caller, amount);
            return "Success!";
        }else{
            return "Already claimed!";
        };
        
    };
};