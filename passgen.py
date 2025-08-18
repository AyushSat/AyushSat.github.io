import hashlib

def sha256_hash(text: str) -> str:
    return hashlib.sha256(text.encode()).hexdigest()


if __name__ == "__main__":
    root_key = input("Enter root key: ")
    descriptor = input("Enter descriptor: ")
    print("Password is: ", sha256_hash(root_key + descriptor)[:10])
    
