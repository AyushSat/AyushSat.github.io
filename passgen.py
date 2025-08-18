import hashlib
import sys

def sha256_hash(text: str) -> str:
    return hashlib.sha256(text.encode()).hexdigest()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Usage: python {sys.argv[0]} <root_key> <descriptor>")
        sys.exit(1)

    root_key = sys.argv[1]
    descriptor = sys.argv[2]
    print("Password is:", sha256_hash(root_key + descriptor)[:10])