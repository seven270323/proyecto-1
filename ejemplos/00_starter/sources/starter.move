module cuenta::frontend {
    use std::string::{utf8, String};

    #[view]
    public fun hello_aptos() : String {
        utf8(b"Hello, World!")
    }
}