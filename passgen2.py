import hashlib
import sys
import secrets

def generate_secure_password(root_key: str, descriptor: str, length: int = 16) -> str:
    # Character set including your requested special characters
    # We use a clean set to avoid confusing characters like l, 1, O, 0
    alphabet = "abcdefghjkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789@!#$%+/=~"
    
    salt = descriptor.encode('utf-8')
    
    # PBKDF2 remains the core for security
    derived_key = hashlib.pbkdf2_hmac(
        'sha256',
        root_key.encode('utf-8'),
        salt,
        iterations=600000, 
        dklen=64  # Increased length to ensure enough entropy for mapping
    )

    password = ""
    for i in range(length):
        index = derived_key[i] % len(alphabet)
        password += alphabet[index]

    return password

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Usage: python {sys.argv[0]} <root_key> <descriptor>")
        sys.exit(1)

    root_key = sys.argv[1]
    descriptor = sys.argv[2]
    
    password = generate_secure_password(root_key, descriptor)
    print("Password is:", password)